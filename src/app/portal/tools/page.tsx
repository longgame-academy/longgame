import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { content } from "@/db/schema";
import { and, eq, inArray } from "drizzle-orm";
import { getUserAccessType } from "@/lib/access";

export default async function ToolsPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const accessType = await getUserAccessType(userId);
  if (!accessType) redirect("/parent-academy");

  const visibleValues =
    accessType === "individual"
      ? (["individual", "both"] as const)
      : (["org", "both"] as const);

  const tools = await db
    .select()
    .from(content)
    .where(
      and(eq(content.type, "tool"), inArray(content.visibility, [...visibleValues]))
    )
    .orderBy(content.order);

  return (
    <div>
      <h1 className="font-heading text-3xl font-bold mb-8">
        Practical Tools
      </h1>

      {tools.length === 0 ? (
        <p className="font-body text-text-muted">
          Tools will appear here once published.
        </p>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {tools.map((t) => (
            <div
              key={t.id}
              className="bg-cream/60 border border-border-grey rounded-2xl p-6 shadow-[0_4px_16px_rgba(18,21,20,0.08)]"
            >
              <h3 className="font-heading font-semibold mb-2">{t.title}</h3>
              {t.downloadable ? (
                <a
                  href={`/api/portal/tools/${t.id}/download`}
                  className="font-heading text-sm text-gold hover:underline"
                >
                  Download â†’
                </a>
              ) : (
                <p className="font-body text-sm text-charcoal/50">
                  View only
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


