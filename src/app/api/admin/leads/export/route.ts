import { db } from "@/db";
import { leads } from "@/db/schema";
import { requireAdmin } from "@/lib/admin";
import { NextResponse } from "next/server";
import { desc } from "drizzle-orm";

/**
 * Lead names and emails come from a public, unauthenticated endpoint, and this
 * CSV gets opened in Excel/Sheets by an admin. A value starting with =, +, -,
 * @ or a control character is interpreted as a formula, which is a well-known
 * path to command execution on the admin's machine. Prefix those with a single
 * quote to neutralise them, then apply normal RFC 4180 quoting.
 */
function escapeCsvField(value: string): string {
  let safe = value.replace(/[\u0000-\u001F\u007F]/g, " ");

  if (/^[=+\-@]/.test(safe)) {
    safe = `'${safe}`;
  }

  if (/[",\n\r]/.test(safe)) {
    return `"${safe.replace(/"/g, '""')}"`;
  }

  return safe;
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

  const csv = [header.join(","), ...rows].join("\r\n");

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="leads-${Date.now()}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
