import { db } from "@/db";
import { organizations } from "@/db/schema";
import { requireAdmin } from "@/lib/admin";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { z } from "zod";

const updateSchema = z.object({
  status: z.enum(["pending", "verified", "rejected"]),
});

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const check = await requireAdmin();
  if (!check.ok) {
    return NextResponse.json({ error: "Forbidden" }, { status: check.status });
  }

  const { id } = await params;
  const orgId = Number(id);
  if (!Number.isInteger(orgId)) {
    return NextResponse.json({ error: "Invalid organization id" }, { status: 400 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const parsed = updateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  const [org] = await db
    .update(organizations)
    .set({ status: parsed.data.status })
    .where(eq(organizations.id, orgId))
    .returning();

  if (!org) {
    return NextResponse.json({ error: "Organization not found" }, { status: 404 });
  }

  return NextResponse.json({ organization: org });
}