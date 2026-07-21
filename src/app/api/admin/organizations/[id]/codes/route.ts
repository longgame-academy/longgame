import { db } from "@/db";
import { orgCodes, organizations } from "@/db/schema";
import { requireAdmin } from "@/lib/admin";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { z } from "zod";
import { nanoid } from "nanoid";

const createCodeSchema = z.object({
  maxUses: z.number().int().min(1).max(10000),
});

export async function GET(
  _req: Request,
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

  const codes = await db
    .select()
    .from(orgCodes)
    .where(eq(orgCodes.organizationId, orgId));

  return NextResponse.json({ codes });
}

export async function POST(
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

  const [org] = await db
    .select()
    .from(organizations)
    .where(eq(organizations.id, orgId))
    .limit(1);

  if (!org) {
    return NextResponse.json({ error: "Organization not found" }, { status: 404 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const parsed = createCodeSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  // Generate a short, unambiguous, uppercase code (nanoid alphabet default
  // includes similar-looking chars, so we use a custom safe alphabet).
  const code = generateCode();

  const [orgCode] = await db
    .insert(orgCodes)
    .values({
      organizationId: orgId,
      code,
      maxUses: parsed.data.maxUses,
      usesCount: 0,
      active: true,
    })
    .returning();

  return NextResponse.json({ code: orgCode });
}

function generateCode(): string {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // no I, O, 0, 1
  const id = Array.from({ length: 8 }, () =>
    alphabet[Math.floor(Math.random() * alphabet.length)]
  ).join("");
  return id;
}