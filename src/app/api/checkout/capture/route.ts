import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { z } from "zod";
import { checkoutRatelimit } from "@/lib/ratelimit";
import { recordAbandonedCheckout } from "@/lib/abandoned";

// Deliberately email-only. Recovery must not depend on having a name.
const bodySchema = z.object({
  email: z.string().trim().toLowerCase().email().max(255),
  firstName: z.string().trim().max(255).optional().or(z.literal("")),
});

/**
 * Records the email entered at the top of checkout, before any card details.
 *
 * This creates no order and no entitlement — it only marks that someone
 * started. If they go on to pay, the webhook stamps them recovered and they
 * drop out of the sequence.
 */
export async function POST(req: Request) {
  const requestHeaders = await headers();
  const ip =
    requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    requestHeaders.get("x-real-ip") ||
    "anonymous";

  const { success } = await checkoutRatelimit.limit(`capture:${ip}`);
  if (!success) {
    // Silently accepted: a rate limit here must never surface as an error in
    // the middle of someone filling in the form.
    return NextResponse.json({ ok: true });
  }

  let parsed: z.infer<typeof bodySchema>;
  try {
    parsed = bodySchema.parse(await req.json());
  } catch {
    return NextResponse.json({ ok: true });
  }

  await recordAbandonedCheckout({
    email: parsed.email,
    firstName: parsed.firstName || null,
  });

  return NextResponse.json({ ok: true });
}
