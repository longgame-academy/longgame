import { db } from "@/db";
import { enrollments } from "@/db/schema";
import { eq } from "drizzle-orm";

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
