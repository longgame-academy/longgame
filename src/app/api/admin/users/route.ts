import { db } from "@/db";
import { enrollments, orgMemberships, organizations, payments } from "@/db/schema";
import { requireAdmin } from "@/lib/admin";
import { NextResponse } from "next/server";
import { clerkClient } from "@clerk/nextjs/server";
import { desc, eq } from "drizzle-orm";
import { getLibraryAccess } from "@/lib/orders";

export async function GET(req: Request) {
  const check = await requireAdmin();
  if (!check.ok) {
    return NextResponse.json({ error: "Forbidden" }, { status: check.status });
  }

  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q")?.trim() || "";

  const client = await clerkClient();
  const userList = await client.users.getUserList({
    query: query || undefined,
    limit: 50,
  });

  const users = await Promise.all(
    userList.data.map(async (u) => {
      const [enrollment] = await db
        .select()
        .from(enrollments)
        .where(eq(enrollments.userId, u.id))
        .limit(1);

      const [membership] = await db
        .select({
          orgName: organizations.name,
        })
        .from(orgMemberships)
        .innerJoin(organizations, eq(orgMemberships.organizationId, organizations.id))
        .where(eq(orgMemberships.userId, u.id))
        .limit(1);

      // Library status and its exact expiry, so support can answer "when does
      // my access end" without opening Stripe or the database.
      const library = await getLibraryAccess(u.id);

      // Most recent order, so a refund or a support lookup starts from the
      // Long Game order number rather than a Clerk id.
      const [order] = await db
        .select({
          orderNumber: payments.orderNumber,
          status: payments.status,
          amount: payments.amount,
          currency: payments.currency,
          amountRefunded: payments.amountRefunded,
          stripePaymentIntentId: payments.stripePaymentIntentId,
          createdAt: payments.createdAt,
        })
        .from(payments)
        .where(eq(payments.userId, u.id))
        .orderBy(desc(payments.createdAt))
        .limit(1);

      return {
        id: u.id,
        email: u.emailAddresses[0]?.emailAddress || "",
        firstName: u.firstName,
        lastName: u.lastName,
        accessType: enrollment?.accessType || null,
        orgName: membership?.orgName || null,
        createdAt: u.createdAt,
        libraryStatus: library.status,
        libraryExpiresAt: library.expiresAt?.toISOString() ?? null,
        latestOrder: order
          ? {
              orderNumber: order.orderNumber,
              status: order.status,
              amount: order.amount,
              currency: order.currency,
              amountRefunded: order.amountRefunded,
              stripePaymentIntentId: order.stripePaymentIntentId,
              createdAt: order.createdAt.toISOString(),
            }
          : null,
      };
    })
  );

  return NextResponse.json({ users });
}
