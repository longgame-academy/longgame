import { db } from "@/db";
import { leads } from "@/db/schema";
import { NextResponse } from "next/server";
import { z } from "zod";
import { addFreeGuideLead } from "@/lib/emails/addFreeGuideLead";
import { leadsRatelimit } from "@/lib/ratelimit";

// Two callers: the free-guide form (name + explicit consent) and the footer
// newsletter box (email only). The footer previously posted {email, source}
// against a schema demanding firstName and consent, so every newsletter
// signup on the site 400'd silently.
const leadSchema = z.object({
  firstName: z.string().trim().min(1).max(100).optional(),
  email: z.string().trim().email().max(255),
  // Kept mandatory on both paths so there is always a server-side record that
  // the user opted in.
  consent: z.literal(true),
  source: z.enum(["free_guide", "footer"]).optional(),
});

export async function POST(req: Request) {
  // x-forwarded-for is a comma-separated chain; only the first entry is the
  // client as seen by the edge. Using the whole string lets a caller vary a
  // downstream hop to mint unlimited rate-limit buckets.
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip")?.trim() ||
    "unknown";
  const { success } = await leadsRatelimit.limit(ip);
  if (!success) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

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
  const normalisedEmail = email.toLowerCase();
  const isFooter = parsed.data.source === "footer";

  try {
    await db.insert(leads).values({
      email: normalisedEmail,
      firstName,
      // `source` is a DB enum with only "free_guide"; the footer is tracked via
      // the tag until a migration adds a "newsletter" enum value.
      source: "free_guide",
      tag: isFooter ? "Newsletter Signup" : "Free Guide Lead",
      delivered: false,
    });
  } catch (err) {
    console.error("Lead insert failed:", err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }

  try {
    await addFreeGuideLead(normalisedEmail, firstName ?? "");
  } catch (err) {
    console.error("Mailerlite sync failed:", err);
  }

  return NextResponse.json({ ok: true });
}
