import { stripe } from "@/lib/stripe";
import { db } from "@/db";
import { payments, enrollments } from "@/db/schema";
import { eq, inArray } from "drizzle-orm";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { sendWelcomeEmail } from "@/lib/emails/sendWelcomeEmail";
import { grantIndividualAccess, revokeUserAccess } from "@/lib/access";

const LOG = "[stripe-webhook]";

// async_payment_succeeded covers delayed payment methods, where
// checkout.session.completed fires first with payment_status "unpaid".
const GRANT_EVENTS: string[] = [
  "checkout.session.completed",
  "checkout.session.async_payment_succeeded",
];

const REVOKE_EVENTS: string[] = ["charge.refunded", "charge.dispute.created"];

// Stripe needs the raw body for signature verification, and retries on any
// non-2xx. Every step below is therefore idempotent: a retry must never
// double-grant, double-send email, or double-revoke.
export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.error(`${LOG} STRIPE_WEBHOOK_SECRET is not configured`);
    return NextResponse.json({ error: "Server misconfigured" }, { status: 500 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.error(`${LOG} signature verification failed:`, err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  try {
    if (GRANT_EVENTS.includes(event.type)) {
      return await handleGrant(event);
    }

    if (REVOKE_EVENTS.includes(event.type)) {
      return await handleRevoke(event);
    }

    return NextResponse.json({ ok: true, ignored: event.type });
  } catch (err) {
    // Genuine infrastructure failure — let Stripe retry.
    console.error(`${LOG} processing failed for event ${event.id} (${event.type}):`, err);
    return NextResponse.json({ error: "Processing failed" }, { status: 500 });
  }
}

async function handleGrant(event: Stripe.Event) {
  const session = event.data.object as Stripe.Checkout.Session;

  // Critical: `completed` does NOT mean paid. Without this check, any session
  // that reaches completion unpaid (delayed/failed payment methods) would be
  // granted full access for free.
  if (session.payment_status !== "paid") {
    console.warn(
      `${LOG} session ${session.id} is ${session.payment_status}, not granting access yet`
    );
    return NextResponse.json({ ok: true, pending: true });
  }

  const userId = session.client_reference_id;
  if (!userId) {
    // Nothing we can do with this one, but 400 would make Stripe retry
    // forever. Log loudly and accept it.
    console.error(`${LOG} missing client_reference_id, session:`, session.id);
    return NextResponse.json({ ok: true, unlinked: true });
  }

  // 1. Grant access first. If anything later fails and Stripe retries, the
  //    user is already enrolled rather than stuck having paid for nothing.
  await grantIndividualAccess(userId);

  // 2. Record the payment. The unique constraint on stripePaymentId makes this
  //    our idempotency marker: a returned row means this is the first time we
  //    have successfully processed this session.
  const inserted = await db
    .insert(payments)
    .values({
      userId,
      stripePaymentId: session.id,
      amount: session.amount_total ?? 0,
      status: "succeeded",
    })
    .onConflictDoNothing({ target: payments.stripePaymentId })
    .returning({ id: payments.id });

  const isFirstProcessing = inserted.length > 0;

  if (isFirstProcessing) {
    console.info(`${LOG} access granted to ${userId} for session ${session.id}`);
  }

  // 3. Email last, and never let a mail failure fail the webhook — that would
  //    trigger endless Stripe retries against already-granted access.
  if (isFirstProcessing) {
    const email = session.customer_details?.email;
    if (email) {
      try {
        await sendWelcomeEmail(email);
      } catch (err) {
        console.error(`${LOG} welcome email failed for session ${session.id}:`, err);
      }
    } else {
      console.error(`${LOG} no email on session, skipped welcome:`, session.id);
    }
  }

  return NextResponse.json({ ok: true, alreadyProcessed: !isFirstProcessing });
}

async function handleRevoke(event: Stripe.Event) {
  const context = describeRevocation(event);

  if (!context.shouldRevoke) {
    console.warn(`${LOG} ${context.reason} — no access change (event ${event.id})`);
    return NextResponse.json({ ok: true, revoked: false, reason: context.reason });
  }

  const payment = await findPaymentForCharge(context);

  if (!payment) {
    // Could be a payment made outside this app, or a session we never
    // recorded. Retrying will not help, so accept the event and log it.
    console.error(
      `${LOG} ${context.kind}: no matching payment record ` +
        `(payment_intent=${context.paymentIntentId ?? "none"}, charge=${context.chargeId ?? "none"}). ` +
        `MANUAL REVIEW REQUIRED — access was not revoked.`
    );
    return NextResponse.json({ ok: true, revoked: false, reason: "no_payment_record" });
  }

  // Idempotency marker: the payment row is flipped to "refunded" only after a
  // successful revoke, so a replayed event short-circuits here.
  if (payment.status === "refunded") {
    console.info(
      `${LOG} ${context.kind} for ${payment.userId} already processed (payment ${payment.stripePaymentId})`
    );
    return NextResponse.json({ ok: true, revoked: false, alreadyProcessed: true });
  }

  // An org-code enrollment is not what this charge paid for. Revoking it would
  // cut off a member whose access comes from their organization, so leave the
  // enrollment alone and only record the refund.
  const [enrollment] = await db
    .select({ accessType: enrollments.accessType })
    .from(enrollments)
    .where(eq(enrollments.userId, payment.userId))
    .limit(1);

  if (enrollment && enrollment.accessType !== "individual") {
    console.warn(
      `${LOG} ${context.kind} for ${payment.userId}: enrollment is "${enrollment.accessType}", ` +
        `not individual — leaving access in place and marking payment refunded only.`
    );
  } else {
    // revokeUserAccess is idempotent (delete + metadata write), so it is safe
    // to reach here again if we crash before marking the payment below.
    await revokeUserAccess(payment.userId);
    console.warn(
      `${LOG} ACCESS REVOKED for ${payment.userId} — ${context.kind} ` +
        `(payment ${payment.stripePaymentId}, amount ${payment.amount}, event ${event.id})`
    );
  }

  await db
    .update(payments)
    .set({ status: "refunded" })
    .where(eq(payments.id, payment.id));

  return NextResponse.json({ ok: true, revoked: true, userId: payment.userId });
}

type RevocationContext = {
  kind: string;
  chargeId: string | null;
  paymentIntentId: string | null;
  shouldRevoke: boolean;
  reason: string;
};

/**
 * charge.refunded delivers a Charge; charge.dispute.created delivers a Dispute.
 * Both expose the payment intent, which is how we get back to our own record.
 */
function describeRevocation(event: Stripe.Event): RevocationContext {
  if (event.type === "charge.refunded") {
    const charge = event.data.object as Stripe.Charge;

    return {
      kind: "refund",
      chargeId: charge.id,
      paymentIntentId: idOf(charge.payment_intent),
      // charge.refunded also fires for partial refunds (a goodwill discount,
      // say). Only a full refund should cost the customer their access.
      shouldRevoke: charge.refunded,
      reason: charge.refunded
        ? "full refund"
        : `partial refund (${charge.amount_refunded} of ${charge.amount})`,
    };
  }

  const dispute = event.data.object as Stripe.Dispute;

  return {
    kind: `dispute (${dispute.reason})`,
    chargeId: idOf(dispute.charge),
    paymentIntentId: idOf(dispute.payment_intent),
    shouldRevoke: true,
    reason: "dispute opened",
  };
}

function idOf(value: string | { id: string } | null | undefined): string | null {
  if (!value) return null;
  return typeof value === "string" ? value : value.id;
}

/**
 * payments.stripePaymentId holds the Checkout Session id, but refunds and
 * disputes only reference the payment intent, so resolve the session first.
 * The charge/intent ids are also tried directly as a defensive fallback.
 */
async function findPaymentForCharge(context: RevocationContext) {
  const candidates = new Set<string>();

  if (context.paymentIntentId) {
    candidates.add(context.paymentIntentId);

    try {
      const sessions = await stripe.checkout.sessions.list({
        payment_intent: context.paymentIntentId,
        limit: 10,
      });
      for (const session of sessions.data) {
        candidates.add(session.id);
      }
    } catch (err) {
      console.error(
        `${LOG} could not list sessions for payment_intent ${context.paymentIntentId}:`,
        err
      );
    }
  }

  if (context.chargeId) {
    candidates.add(context.chargeId);
  }

  if (candidates.size === 0) return null;

  const [payment] = await db
    .select()
    .from(payments)
    .where(inArray(payments.stripePaymentId, [...candidates]))
    .limit(1);

  return payment ?? null;
}
