import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { content } from "@/db/schema";
import { and, eq, inArray, or } from "drizzle-orm";
import { getUserAccessType } from "@/lib/access";
import Link from "next/link";

export default async function ModulesPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const accessType = await getUserAccessType(userId);
  if (!accessType) redirect("/parent-academy");

  const visibleValues =
    accessType === "individual"
      ? (["individual", "both"] as const)
      : (["org", "both"] as const);

  const modules = await db
    .select()
    .from(content)
    .where(
      and(eq(content.type, "module"), inArray(content.visibility, [...visibleValues]))
    )
    .orderBy(content.order);

  return (
    <div>
      <h1 className="font-heading text-3xl font-bold mb-8">
        Parent Development System
      </h1>

      {modules.length === 0 ? (
        <p className="font-body text-charcoal/60">
          Modules will appear here once published.
        </p>
      ) : (
        <div className="space-y-3">
          {modules.map((m, i) => (
            <Link
              key={m.id}
              href={`/portal/modules/${m.id}`}
              className="flex items-center justify-between bg-cream/60 border border-charcoal/10 rounded-2xl p-5 hover:border-gold transition-colors"
            >
              <div className="flex items-center gap-4">
                <span className="font-heading text-gold text-lg font-bold w-8">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-heading font-semibold">{m.title}</span>
              </div>
              <span className="text-gold">→</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}