import { db } from "@/db";
import { leads } from "@/db/schema";
import { NextResponse } from "next/server";
import { z } from "zod";
import { addFreeGuideLead } from "@/lib/emails/addFreeGuideLead";

const leadSchema = z.object({
  firstName: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  consent: z.literal(true),
});

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid input" },
      { status: 400 }
    );
  }

  const { firstName, email } = parsed.data;

  await db.insert(leads).values({
    email: email.toLowerCase(),
    firstName,
    source: "free_guide",
    tag: "Free Guide Lead",
    delivered: false,
  });

  try {
    await addFreeGuideLead(email.toLowerCase(), firstName);
  } catch (err) {
    console.error("Mailerlite sync failed:", err);
  }

  return NextResponse.json({ ok: true });
}