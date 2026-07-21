import { auth } from "@clerk/nextjs/server";
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
  const { userId, sessionClaims } = await auth();
  if (!userId) redirect("/sign-in");

  const cachedEnrolled = (sessionClaims?.publicMetadata as { enrolled?: boolean } | undefined)?.enrolled;

  let enrollment = null;
  if (cachedEnrolled) {
    enrollment = true;
  } else {
    const [row] = await db
      .select()
      .from(enrollments)
      .where(eq(enrollments.userId, userId))
      .limit(1);
    enrollment = row ?? null;
  }

  const [membership] = await db
    .select({ orgName: organizations.name })
    .from(orgMemberships)
    .innerJoin(organizations, eq(orgMemberships.organizationId, organizations.id))
    .where(eq(orgMemberships.userId, userId))
    .limit(1);

  if (!enrollment) {
    redirect("/parent-academy");
  }

  return (
    <PortalShell orgName={membership?.orgName || null}>{children}</PortalShell>
  );
}
