import { NextResponse } from "next/server";
import { z } from "zod";
import { and, eq } from "drizzle-orm";
import { stripe } from "@/lib/stripe";
import { db } from "@/db";
import { payments } from "@/db/schema";
import { getLibraryAccess } from "@/lib/orders";
import { confirmationRatelimit } from "@/lib/ratelimit";

const querySchema = z.object({
  payment_intent: z.string().trim().min(1).max(255),
  payment_intent_client_secret: z.string().trim().min(1).max(255),
});

/**
 * Tells the success page whether the webhook has finished granting access.
 *
 * This reports state; it never creates an order or an entitlement. If the
 * webhook has not landed yet the page keeps polling, and access still arrives
 * whether or not the browser is still open.
 *
 * The client secret is required and checked against the PaymentIntent, so
 * knowing an intent id alone is not enough to read someone's order.
 */
export async function GET(req: Request) {
  const url = new URL(req.url);

  const parsed = querySchema.safeParse({
    payment_intent: url.searchParams.get("payment_intent") ?? "",
    payment_intent_client_secret:
      url.searchParams.get("payment_intent_client_secret") ?? "",
  });

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const { success } = await confirmationRatelimit.limit(
    `confirmation:${parsed.data.payment_intent}`
  );
  if (!success) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  let intent;
  try {
    intent = await stripe.paymentIntents.retrieve(parsed.data.payment_intent);
  } catch {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  // Proves the caller is the browser that created this payment.
  if (intent.client_secret !== parsed.data.payment_intent_client_secret) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  if (intent.status !== "succeeded") {
    return NextResponse.json({ status: intent.status, ready: false });
  }

  // The order row is written by the webhook, so its presence is what confirms
  // access has actually been granted.
  const [order] = await db
    .select({
      orderNumber: payments.orderNumber,
      userId: payments.userId,
      amount: payments.amount,
      currency: payments.currency,
      email: payments.email,
    })
    .from(payments)
    .where(
      and(
        eq(payments.stripePaymentId, intent.id),
        eq(payments.status, "succeeded")
      )
    )
    .limit(1);

  if (!order) {
    return NextResponse.json({ status: "succeeded", ready: false });
  }

  const library = await getLibraryAccess(order.userId);

  return NextResponse.json({
    status: "succeeded",
    ready: true,
    orderNumber: order.orderNumber,
    amount: order.amount,
    currency: order.currency,
    email: order.email,
    libraryExpiresAt: library.expiresAt?.toISOString() ?? null,
  });
}
