import { db } from "@/db";
import { content } from "@/db/schema";
import { requireAdmin } from "@/lib/admin";
import { NextResponse } from "next/server";
import { z } from "zod";
import { desc } from "drizzle-orm";

const createContentSchema = z.object({
  type: z.enum(["module", "field_guide", "tool"]),
  title: z.string().trim().min(1).max(255),
  body: z.string().trim().max(50000).optional(),
  assetRef: z.string().trim().max(1000).optional(),
  visibility: z.enum(["individual", "org", "both", "neither"]),
  downloadable: z.boolean().optional(),
  order: z.number().int().min(0).optional(),
});

export async function GET() {
  const check = await requireAdmin();
  if (!check.ok) {
    return NextResponse.json({ error: "Forbidden" }, { status: check.status });
  }

  const items = await db.select().from(content).orderBy(desc(content.createdAt));
  return NextResponse.json({ content: items });
}

export async function POST(req: Request) {
  const check = await requireAdmin();
  if (!check.ok) {
    return NextResponse.json({ error: "Forbidden" }, { status: check.status });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const parsed = createContentSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  const [item] = await db
    .insert(content)
    .values({
      type: parsed.data.type,
      title: parsed.data.title,
      body: parsed.data.body,
      assetRef: parsed.data.assetRef,
      visibility: parsed.data.visibility,
      downloadable: parsed.data.downloadable ?? false,
      order: parsed.data.order ?? 0,
    })
    .returning();

  return NextResponse.json({ content: item });
}