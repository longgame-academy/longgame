import { requireAdmin } from "@/lib/admin";
import { grantIndividualAccess, revokeUserAccess } from "@/lib/access";
import { NextResponse } from "next/server";
import { z } from "zod";

const grantSchema = z.object({
  action: z.enum(["grant", "revoke"]),
});

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const check = await requireAdmin();
  if (!check.ok) {
    return NextResponse.json({ error: "Forbidden" }, { status: check.status });
  }

  const { id: targetUserId } = await params;
  if (!targetUserId || !/^user_[A-Za-z0-9]+$/.test(targetUserId)) {
    return NextResponse.json({ error: "Invalid user id" }, { status: 400 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const parsed = grantSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  const enrolled = parsed.data.action === "grant";

  try {
    // Shared with the Stripe webhook's refund/dispute path so the two
    // revocation routes cannot drift apart.
    if (enrolled) {
      await grantIndividualAccess(targetUserId);
    } else {
      await revokeUserAccess(targetUserId);
    }

    console.info(
      `[admin] access ${enrolled ? "granted" : "revoked"} for ${targetUserId} by ${check.userId}`
    );
  } catch (err) {
    console.error("Failed to update access for user:", targetUserId, err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
