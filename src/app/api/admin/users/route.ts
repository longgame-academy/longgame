import { db } from "@/db";
import { enrollments, orgMemberships, organizations, payments } from "@/db/schema";
import { requireAdmin } from "@/lib/admin";
import { NextResponse } from "next/server";
import { clerkClient } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

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

      return {
        id: u.id,
        email: u.emailAddresses[0]?.emailAddress || "",
        firstName: u.firstName,
        lastName: u.lastName,
        accessType: enrollment?.accessType || null,
        orgName: membership?.orgName || null,
        createdAt: u.createdAt,
      };
    })
  );

  return NextResponse.json({ users });
}
