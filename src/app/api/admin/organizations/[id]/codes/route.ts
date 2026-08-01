import { db } from "@/db";
import { orgCodes, organizations } from "@/db/schema";
import { requireAdmin } from "@/lib/admin";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { z } from "zod";
import { randomBytes } from "crypto";

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

  // `code` is unique in the schema, so a collision would otherwise surface as
  // a 500. Retry a few times before giving up.
  for (let attempt = 0; attempt < 5; attempt++) {
    try {
      const [orgCode] = await db
        .insert(orgCodes)
        .values({
          organizationId: orgId,
          code: generateCode(),
          maxUses: parsed.data.maxUses,
          usesCount: 0,
          active: true,
        })
        .returning();

      return NextResponse.json({ code: orgCode });
    } catch (err) {
      const isCollision =
        err instanceof Error && /unique|duplicate key/i.test(err.message);
      if (!isCollision) {
        console.error("Failed to create org code:", err);
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
      }
    }
  }

  console.error("Exhausted org code generation attempts for org:", orgId);
  return NextResponse.json({ error: "Could not generate a code" }, { status: 500 });
}

/**
 * These codes grant paid product access, so they are security tokens and must
 * be generated with a CSPRNG — Math.random() is predictable from a handful of
 * observed outputs. Rejection sampling keeps the alphabet uniform.
 */
function generateCode(): string {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // no I, O, 0, 1 — 32 chars
  const length = 10;
  const out: string[] = [];

  while (out.length < length) {
    const bytes = randomBytes(length * 2);
    for (const byte of bytes) {
      if (out.length === length) break;
      // 256 is an exact multiple of 32, so masking is already uniform.
      out.push(alphabet[byte % alphabet.length]);
    }
  }

  return out.join("");
}
