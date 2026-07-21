import { db } from "@/db";
import { orgCodes } from "@/db/schema";
import { requireAdmin } from "@/lib/admin";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { z } from "zod";

const updateSchema = z.object({
  active: z.boolean(),
});

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ codeId: string }> }
) {
  const check = await requireAdmin();
  if (!check.ok) {
    return NextResponse.json({ error: "Forbidden" }, { status: check.status });
  }

  const { codeId } = await params;
  const id = Number(codeId);
  if (!Number.isInteger(id)) {
    return NextResponse.json({ error: "Invalid code id" }, { status: 400 });
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

  const [orgCode] = await db
    .update(orgCodes)
    .set({ active: parsed.data.active })
    .where(eq(orgCodes.id, id))
    .returning();

  if (!orgCode) {
    return NextResponse.json({ error: "Code not found" }, { status: 404 });
  }

  return NextResponse.json({ code: orgCode });
}
