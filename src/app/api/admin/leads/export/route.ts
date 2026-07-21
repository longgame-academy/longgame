import { db } from "@/db";
import { leads } from "@/db/schema";
import { requireAdmin } from "@/lib/admin";
import { NextResponse } from "next/server";
import { desc } from "drizzle-orm";

function escapeCsvField(value: string): string {
  if (value.includes(",") || value.includes('"') || value.includes("\n")) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

export async function GET() {
  const check = await requireAdmin();
  if (!check.ok) {
    return NextResponse.json({ error: "Forbidden" }, { status: check.status });
  }

  const allLeads = await db.select().from(leads).orderBy(desc(leads.createdAt));

  const header = ["First Name", "Email", "Source", "Tag", "Delivered", "Created At"];
  const rows = allLeads.map((l) =>
    [
      l.firstName || "",
      l.email,
      l.source,
      l.tag,
      l.delivered ? "Yes" : "No",
      new Date(l.createdAt).toISOString(),
    ]
      .map(escapeCsvField)
      .join(",")
  );

  const csv = [header.join(","), ...rows].join("\n");

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": `attachment; filename="leads-${Date.now()}.csv"`,
    },
  });
}