import { db } from "@/db";
import { organizations } from "@/db/schema";
import { requireAdmin } from "@/lib/admin";
import { NextResponse } from "next/server";
import { z } from "zod";
import { desc } from "drizzle-orm";

const createOrgSchema = z.object({
  name: z.string().trim().min(1).max(255),
  contactName: z.string().trim().max(255).optional(),
  contactEmail: z.string().trim().email().max(255).optional(),
});

export async function GET() {
  const check = await requireAdmin();
  if (!check.ok) {
    return NextResponse.json({ error: "Forbidden" }, { status: check.status });
  }

  const orgs = await db
    .select()
    .from(organizations)
    .orderBy(desc(organizations.createdAt));

  return NextResponse.json({ organizations: orgs });
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

  const parsed = createOrgSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  const [org] = await db
    .insert(organizations)
    .values({
      name: parsed.data.name,
      contactName: parsed.data.contactName,
      contactEmail: parsed.data.contactEmail,
      status: "pending",
    })
    .returning();

  return NextResponse.json({ organization: org });
}
