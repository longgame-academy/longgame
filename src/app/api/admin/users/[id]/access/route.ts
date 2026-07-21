import { db } from "@/db";
import { enrollments } from "@/db/schema";
import { requireAdmin } from "@/lib/admin";
import { eq } from "drizzle-orm";
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

  if (parsed.data.action === "grant") {
    const [existing] = await db
      .select()
      .from(enrollments)
      .where(eq(enrollments.userId, targetUserId))
      .limit(1);

    if (!existing) {
      await db.insert(enrollments).values({
        userId: targetUserId,
        accessType: "individual",
        contentPackage: "standard_v1",
      });
    }
  } else {
    await db.delete(enrollments).where(eq(enrollments.userId, targetUserId));
  }

  return NextResponse.json({ ok: true });
}
