import { db } from "@/db";
import { orgCodes, orgMemberships, enrollments } from "@/db/schema";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { z } from "zod";
import { orgRedeemRatelimit } from "@/lib/ratelimit";

const redeemSchema = z.object({
  code: z.string().trim().min(1).max(32),
});

class RouteError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { success } = await orgRedeemRatelimit.limit(userId);
  if (!success) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const parsed = redeemSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid code" }, { status: 400 });
  }

  const code = parsed.data.code.toUpperCase();

  try {
    await db.transaction(async (tx) => {
      // Row-level lock: blocks any other transaction from reading/writing
      // this same code row until this transaction commits or rolls back.
      const [codeRow] = await tx
        .select()
        .from(orgCodes)
        .where(eq(orgCodes.code, code))
        .for("update");

      if (!codeRow) throw new RouteError("Invalid code", 404);
      if (!codeRow.active) throw new RouteError("This code is no longer active", 403);
      if (codeRow.usesCount >= codeRow.maxUses) {
        throw new RouteError("This code has reached its limit", 403);
      }

      const [existing] = await tx
        .select()
        .from(orgMemberships)
        .where(eq(orgMemberships.userId, userId))
        .limit(1);

      if (existing && existing.status === "active") {
        throw new RouteError("You are already linked to an organization", 409);
      }

      await tx.insert(orgMemberships).values({
        userId,
        organizationId: codeRow.organizationId,
        status: "active",
      });

      await tx.insert(enrollments).values({
        userId,
        accessType: "org",
        contentPackage: "standard_v1",
      });

      const client = await clerkClient();
      await client.users.updateUserMetadata(userId, {
        publicMetadata: { enrolled: true },
      });

      await tx
        .update(orgCodes)
        .set({ usesCount: codeRow.usesCount + 1 })
        .where(eq(orgCodes.id, codeRow.id));
    });
  } catch (err) {
    if (err instanceof RouteError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    console.error("Org code redemption failed:", err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}