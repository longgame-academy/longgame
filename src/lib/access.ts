import { db } from "@/db";
import { enrollments } from "@/db/schema";
import { eq } from "drizzle-orm";
import { clerkClient } from "@clerk/nextjs/server";

export async function getUserAccessType(
  userId: string
): Promise<"individual" | "org" | null> {
  const [enrollment] = await db
    .select()
    .from(enrollments)
    .where(eq(enrollments.userId, userId))
    .limit(1);

  return enrollment?.accessType ?? null;
}

/**
 * Single definition of "this user has access", used by the admin grant flow and
 * the Stripe webhook. Both are idempotent: the enrollments insert is a no-op on
 * conflict, and writing the same Clerk metadata twice is harmless.
 *
 * publicMetadata.enrolled is a denormalised mirror of the enrollments table for
 * client-side UI. The enrollments row is the authority — always write both.
 */
export async function grantIndividualAccess(userId: string): Promise<void> {
  await db
    .insert(enrollments)
    .values({
      userId,
      accessType: "individual",
      contentPackage: "standard_v1",
    })
    .onConflictDoNothing({ target: enrollments.userId });

  const client = await clerkClient();
  await client.users.updateUserMetadata(userId, {
    publicMetadata: { enrolled: true },
  });
}

export async function revokeUserAccess(userId: string): Promise<void> {
  await db.delete(enrollments).where(eq(enrollments.userId, userId));

  const client = await clerkClient();
  await client.users.updateUserMetadata(userId, {
    publicMetadata: { enrolled: false },
  });
}
