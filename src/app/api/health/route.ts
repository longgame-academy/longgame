import { db } from "@/db";
import { organizations } from "@/db/schema";
import { NextResponse } from "next/server";

export async function GET() {
  const rows = await db.select().from(organizations).limit(1);
  return NextResponse.json({ ok: true, rows });
}