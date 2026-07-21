import { auth } from "@clerk/nextjs/server";
import { db } from "@/db";
import { enrollments } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ enrolled: false }, { status: 401 });

  const [enrollment] = await db
    .select()
    .from(enrollments)
    .where(eq(enrollments.userId, userId))
    .limit(1);

  return NextResponse.json({ enrolled: !!enrollment });
}
