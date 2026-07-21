import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { content } from "@/db/schema";
import { and, eq, inArray } from "drizzle-orm";
import { getUserAccessType } from "@/lib/access";
import Link from "next/link";

export default async function FieldGuidesPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const accessType = await getUserAccessType(userId);
  if (!accessType) redirect("/parent-academy");

  const visibleValues =
    accessType === "individual"
      ? (["individual", "both"] as const)
      : (["org", "both"] as const);

  const guides = await db
    .select()
    .from(content)
    .where(
      and(
        eq(content.type, "field_guide"),
        inArray(content.visibility, [...visibleValues])
      )
    )
    .orderBy(content.order);

  return (
    <div>
      <h1 className="font-heading text-3xl font-bold mb-8">Field Guides</h1>

      {guides.length === 0 ? (
        <p className="font-body text-text-muted">
          Field Guides will appear here once published.
        </p>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {guides.map((g) => (
            <Link
              key={g.id}
              href={`/portal/field-guides/${g.id}`}
              className="bg-cream/60 border border-border-grey rounded-2xl p-6 hover:border-gold transition-colors shadow-[0_4px_16px_rgba(18,21,20,0.08)] hover:shadow-[0_8px_24px_rgba(18,21,20,0.12)]"
            >
              <h3 className="font-heading font-semibold">{g.title}</h3>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}


