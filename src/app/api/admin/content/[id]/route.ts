import { db } from "@/db";
import { content } from "@/db/schema";
import { requireAdmin } from "@/lib/admin";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { z } from "zod";

const updateSchema = z.object({
  title: z.string().trim().min(1).max(255).optional(),
  body: z.string().trim().max(50000).optional(),
  assetRef: z.string().trim().max(1000).optional(),
  visibility: z.enum(["individual", "org", "both", "neither"]).optional(),
  downloadable: z.boolean().optional(),
  order: z.number().int().min(0).optional(),
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
  const contentId = Number(id);
  if (!Number.isInteger(contentId)) {
    return NextResponse.json({ error: "Invalid content id" }, { status: 400 });
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

  const [item] = await db
    .update(content)
    .set(parsed.data)
    .where(eq(content.id, contentId))
    .returning();

  if (!item) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ content: item });
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const check = await requireAdmin();
  if (!check.ok) {
    return NextResponse.json({ error: "Forbidden" }, { status: check.status });
  }

  const { id } = await params;
  const contentId = Number(id);
  if (!Number.isInteger(contentId)) {
    return NextResponse.json({ error: "Invalid content id" }, { status: 400 });
  }

  await db.delete(content).where(eq(content.id, contentId));
  return NextResponse.json({ ok: true });
}