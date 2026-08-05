import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { z } from "zod";
import { stripe } from "@/lib/stripe";
import { checkoutRatelimit } from "@/lib/ratelimit";
import { pricingForCountry } from "@/lib/pricing";
import { calculateTax } from "@/lib/tax";
import { recordAbandonedCheckout } from "@/lib/abandoned";

const LOG = "[checkout-intent]";

// Billing location only — enough for payment verification and applicable tax,
// and nothing more. No street address, city or phone.
const bodySchema = z.object({
  email: z.string().trim().toLowerCase().email().max(255),
  firstName: z.string().trim().max(255).optional().or(z.literal("")),
  lastName: z.string().trim().max(255).optional().or(z.literal("")),
  billingCountry: z.string().trim().length(2).toUpperCase(),
  billingState: z.string().trim().max(64).optional().or(z.literal("")),
  billingPostalCode: z.string().trim().max(32).optional().or(z.literal("")),
});

/**
 * Creates the PaymentIntent the checkout page confirms against.
 *
 * The amount is never taken from the browser. It is re-resolved here from the
 * request's country, which is the same input the marketing pages priced from,
 * so what the visitor was shown is what they are charged.
 *
 * This grants nothing. Access comes only from the webhook, after Stripe
 * confirms the payment succeeded.
 */
export async function POST(req: Request) {
  const requestHeaders = await headers();

  const ip =
    requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    requestHeaders.get("x-real-ip") ||
    "anonymous";

  const { success } = await checkoutRatelimit.limit(`intent:${ip}`);
  if (!success) {
    return NextResponse.json(
      { error: "Too many attempts. Please wait a moment and try again." },
      { status: 429 }
    );
  }

  let parsed: z.infer<typeof bodySchema>;
  try {
    parsed = bodySchema.parse(await req.json());
  } catch {
    return NextResponse.json(
      { error: "Please check the details you entered." },
      { status: 400 }
    );
  }

  // Geolocation, not the form, decides currency. A visitor priced in CAD stays
  // in CAD even if they select a different billing country.
  const country = requestHeaders.get("x-vercel-ip-country");
  const plan = pricingForCountry(country);

  try {
    const tax = await calculateTax({
      amount: plan.amountCents,
      currency: plan.currency,
      address: {
        country: parsed.billingCountry,
        postalCode: parsed.billingPostalCode || null,
        state: parsed.billingState || null,
      },
    });

    const customer = await findOrCreateCustomer({
      email: parsed.email,
      firstName: parsed.firstName || null,
      lastName: parsed.lastName || null,
    });

    const intent = await stripe.paymentIntents.create({
      amount: tax.totalAmount,
      currency: plan.currency.toLowerCase(),
      customer,
      receipt_email: parsed.email,
      // Deliberately a one-off charge. No subscription, no saved mandate, and
      // nothing that could produce an automatic renewal.
      setup_future_usage: undefined,
      automatic_payment_methods: { enabled: true },
      description: "The Parent Academy — one-time purchase",
      // The webhook is the source of truth and reads everything it needs from
      // here, so access does not depend on the browser coming back.
      metadata: {
        product: "parent_academy",
        email: parsed.email,
        firstName: parsed.firstName || "",
        lastName: parsed.lastName || "",
        productAmount: String(plan.amountCents),
        taxAmount: String(tax.taxAmount),
        currency: plan.currency,
        taxCalculationId: tax.calculationId ?? "",
        billingCountry: parsed.billingCountry,
      },
    });

    // Email captured before payment. This records intent to buy only — never an
    // order and never an entitlement.
    await recordAbandonedCheckout({
      email: parsed.email,
      firstName: parsed.firstName || null,
      amount: tax.totalAmount,
      currency: plan.currency,
      stripePaymentIntentId: intent.id,
    });

    return NextResponse.json({
      clientSecret: intent.client_secret,
      currency: plan.currency,
      productAmount: plan.amountCents,
      taxAmount: tax.taxAmount,
      taxLabel: tax.label,
      totalAmount: tax.totalAmount,
    });
  } catch (err) {
    console.error(`${LOG} could not create payment intent:`, err);
    return NextResponse.json(
      { error: "We couldn't start checkout. Please try again." },
      { status: 500 }
    );
  }
}

/**
 * Reuses the Stripe customer for a returning email so one person does not
 * accumulate customer records across purchases or retries.
 */
async function findOrCreateCustomer(params: {
  email: string;
  firstName: string | null;
  lastName: string | null;
}): Promise<string> {
  const existing = await stripe.customers.list({ email: params.email, limit: 1 });
  if (existing.data.length > 0) return existing.data[0].id;

  const name = [params.firstName, params.lastName].filter(Boolean).join(" ");

  const created = await stripe.customers.create({
    email: params.email,
    name: name || undefined,
  });

  return created.id;
}
