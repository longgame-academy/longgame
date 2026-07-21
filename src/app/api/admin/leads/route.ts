import { db } from "@/db";
import { leads } from "@/db/schema";
import { requireAdmin } from "@/lib/admin";
import { NextResponse } from "next/server";
import { desc } from "drizzle-orm";

export async function GET() {
  const check = await requireAdmin();
  if (!check.ok) {
    return NextResponse.json({ error: "Forbidden" }, { status: check.status });
  }

  const allLeads = await db.select().from(leads).orderBy(desc(leads.createdAt));
  return NextResponse.json({ leads: allLeads });
}