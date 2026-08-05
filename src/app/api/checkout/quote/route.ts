import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { z } from "zod";
import { checkoutRatelimit } from "@/lib/ratelimit";
import { pricingForCountry } from "@/lib/pricing";
import { calculateTax } from "@/lib/tax";

const bodySchema = z.object({
  billingCountry: z.string().trim().length(2).toUpperCase(),
  billingState: z.string().trim().max(64).optional().or(z.literal("")),
  billingPostalCode: z.string().trim().max(32).optional().or(z.literal("")),
});

/**
 * Prices the order for a billing location, with no side effects.
 *
 * The checkout page calls this as soon as the billing location is known, so any
 * applicable tax appears in the order summary and in the pay button before the
 * customer commits. Tax is never added after the total has been shown.
 */
export async function POST(req: Request) {
  const requestHeaders = await headers();
  const ip =
    requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    requestHeaders.get("x-real-ip") ||
    "anonymous";

  const { success } = await checkoutRatelimit.limit(`quote:${ip}`);
  if (!success) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  let parsed: z.infer<typeof bodySchema>;
  try {
    parsed = bodySchema.parse(await req.json());
  } catch {
    return NextResponse.json({ error: "Invalid billing location" }, { status: 400 });
  }

  // Same input the marketing pages priced from, so the currency cannot change
  // because of what was chosen in the billing form.
  const plan = pricingForCountry(requestHeaders.get("x-vercel-ip-country"));

  const tax = await calculateTax({
    amount: plan.amountCents,
    currency: plan.currency,
    address: {
      country: parsed.billingCountry,
      postalCode: parsed.billingPostalCode || null,
      state: parsed.billingState || null,
    },
  });

  return NextResponse.json({
    currency: plan.currency,
    productAmount: plan.amountCents,
    taxAmount: tax.taxAmount,
    taxLabel: tax.label,
    totalAmount: tax.totalAmount,
  });
}
