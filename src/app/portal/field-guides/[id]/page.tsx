import { auth } from "@clerk/nextjs/server";
import { redirect, notFound } from "next/navigation";
import { db } from "@/db";
import { content } from "@/db/schema";
import { eq } from "drizzle-orm";
import { getUserAccessType } from "@/lib/access";

export default async function FieldGuideDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const accessType = await getUserAccessType(userId);
  if (!accessType) redirect("/parent-academy");

  const { id } = await params;
  const guideId = Number(id);
  if (!Number.isInteger(guideId)) notFound();

  const [item] = await db
    .select()
    .from(content)
    .where(eq(content.id, guideId))
    .limit(1);

  if (!item || item.type !== "field_guide") notFound();

  const allowed =
    item.visibility === "both" ||
    (item.visibility === "individual" && accessType === "individual") ||
    (item.visibility === "org" && accessType === "org");

  if (!allowed) notFound();

  return (
    <div className="max-w-3xl">
      <h1 className="font-heading text-3xl font-bold mb-6">{item.title}</h1>
      <div className="font-body text-lg text-charcoal/80 leading-relaxed whitespace-pre-wrap">
        {item.body || "Content coming soon."}
      </div>
    </div>
  );
}
