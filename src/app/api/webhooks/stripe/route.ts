import { stripe } from "@/lib/stripe";
import { db } from "@/db";
import { payments, enrollments } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { sendWelcomeEmail } from "@/lib/emails/sendWelcomeEmail";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const userId = session.client_reference_id;

    if (!userId) {
      console.error("Webhook missing client_reference_id, session:", session.id);
      return NextResponse.json({ error: "Missing user reference" }, { status: 400 });
    }

    // Idempotency guard — Stripe can send the same event more than once.
    const [existingPayment] = await db
      .select()
      .from(payments)
      .where(eq(payments.stripePaymentId, session.id))
      .limit(1);

    if (existingPayment) {
      return NextResponse.json({ ok: true, alreadyProcessed: true });
    }

    await db.insert(payments).values({
      userId,
      stripePaymentId: session.id,
      amount: session.amount_total ?? 0,
      status: "succeeded",
    });

    const [existingEnrollment] = await db
      .select()
      .from(enrollments)
      .where(eq(enrollments.userId, userId))
      .limit(1);

    if (!existingEnrollment) {
      await db.insert(enrollments).values({
        userId,
        accessType: "individual",
        contentPackage: "standard_v1",
      });
    }

    const email = session.customer_details?.email;
    if (email) {
      await sendWelcomeEmail(email);
    } else {
      console.error("No email on session, skipped welcome email:", session.id);
    }
  }

  return NextResponse.json({ ok: true });
}