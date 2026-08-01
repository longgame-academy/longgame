import { auth } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { enrollments, orgMemberships, organizations } from "@/db/schema";
import { eq } from "drizzle-orm";
import { PortalShell } from "@/components/PortalShell";

export default async function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  // The enrollments table is the only authority on access. publicMetadata is a
  // session-token claim that goes stale for up to a token lifetime after a
  // revoke or refund, so it must not be used to short-circuit this check —
  // it previously let a revoked user keep the portal. This is one indexed
  // lookup, which is cheap enough not to warrant caching around.
  const [enrollment] = await db
    .select({ id: enrollments.id })
    .from(enrollments)
    .where(eq(enrollments.userId, userId))
    .limit(1);

  // Org members arrive with no enrollment — redeeming their code is what
  // creates one. Gating this page behind enrollment made the org flow a
  // dead end: the only page that could grant access was itself unreachable.
  const pathname = (await headers()).get("x-pathname") ?? "";
  const isRedemptionPage = pathname.startsWith("/portal/join-organization");

  if (!enrollment && !isRedemptionPage) {
    redirect("/parent-academy");
  }

  const [membership] = await db
    .select({ orgName: organizations.name })
    .from(orgMemberships)
    .innerJoin(organizations, eq(orgMemberships.organizationId, organizations.id))
    .where(eq(orgMemberships.userId, userId))
    .limit(1);

  return (
    <PortalShell orgName={membership?.orgName || null}>{children}</PortalShell>
  );
}
