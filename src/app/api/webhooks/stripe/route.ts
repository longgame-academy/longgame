import { stripe } from "@/lib/stripe";
import { db } from "@/db";
import { payments, enrollments } from "@/db/schema";
import { eq, inArray } from "drizzle-orm";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { sendWelcomeEmail, sendPurchaseReceiptEmail } from "@/lib/emails/sendWelcomeEmail";
import { grantIndividualAccess, revokeUserAccess } from "@/lib/access";
import {
  findOrCreateClerkUser,
  grantPurchaseEntitlements,
  recordPaidOrder,
  revokePurchaseEntitlements,
  suppressAbandonedCheckout,
} from "@/lib/orders";

const LOG = "[stripe-webhook]";

// async_payment_succeeded covers delayed payment methods, where
// checkout.session.completed fires first with payment_status "unpaid".
const GRANT_EVENTS: string[] = [
  "checkout.session.completed",
  "checkout.session.async_payment_succeeded",
];

// On-site checkout confirms a PaymentIntent rather than a hosted session.
// Apple Pay and card both land here, so both produce the same order record.
const INTENT_EVENT = "payment_intent.succeeded";

const FAILURE_EVENTS: string[] = ["payment_intent.payment_failed"];

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
    if (event.type === INTENT_EVENT) {
      return await handleIntentSucceeded(event);
    }

    if (GRANT_EVENTS.includes(event.type)) {
      return await handleGrant(event);
    }

    if (FAILURE_EVENTS.includes(event.type)) {
      return handleFailure(event);
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

/**
 * The only path that grants access for on-site checkout.
 *
 * Every step is idempotent, so a Stripe retry re-runs this safely: the order
 * insert conflicts on the PaymentIntent id, the entitlement inserts conflict on
 * (user, kind), and the reminders conflict on (entitlement, offset). The email
 * is the one non-idempotent action, so it is sent only on first processing.
 *
 * Nothing here depends on the browser. Closing the tab the instant the payment
 * clears still results in full access.
 */
async function handleIntentSucceeded(event: Stripe.Event) {
  const intent = event.data.object as Stripe.PaymentIntent;

  if (intent.status !== "succeeded") {
    console.warn(`${LOG} intent ${intent.id} is ${intent.status}, not granting`);
    return NextResponse.json({ ok: true, pending: true });
  }

  // Only our own checkout should grant the Academy. Anything else that happens
  // to hit this account is recorded by Stripe but not entitled here.
  if (intent.metadata?.product !== "parent_academy") {
    return NextResponse.json({ ok: true, ignored: "not_parent_academy" });
  }

  const email = intent.metadata?.email || intent.receipt_email;
  if (!email) {
    // Retrying will not conjure an email. Accept the event and flag it, rather
    // than leaving Stripe to retry forever.
    console.error(
      `${LOG} intent ${intent.id} has no email — MANUAL REVIEW REQUIRED, access not granted`
    );
    return NextResponse.json({ ok: true, unlinked: true });
  }

  const firstName = intent.metadata?.firstName || null;
  const lastName = intent.metadata?.lastName || null;

  // Resolved by email, so a returning customer keeps their existing account.
  const userId = await findOrCreateClerkUser({ email, firstName, lastName });

  // Taken from Stripe rather than the clock, so a retry computes the same
  // Library expiry the customer was originally told.
  const purchasedAt = new Date(intent.created * 1000);

  const order = await recordPaidOrder({
    userId,
    stripePaymentId: intent.id,
    stripePaymentIntentId: intent.id,
    stripeCustomerId: typeof intent.customer === "string" ? intent.customer : null,
    email,
    firstName,
    lastName,
    amount: intent.amount_received || intent.amount,
    currency: intent.currency,
    taxAmount: Number(intent.metadata?.taxAmount ?? 0) || 0,
  });

  const { libraryExpiresAt } = await grantPurchaseEntitlements({
    userId,
    orderId: order.id,
    purchasedAt,
  });

  // They bought — take them out of the recovery sequence.
  await suppressAbandonedCheckout(email);

  if (order.isFirstProcessing) {
    console.info(
      `${LOG} order ${order.orderNumber} granted to ${userId} (intent ${intent.id})`
    );

    // The order number only exists once the order is recorded, so write it back
    // onto the intent. Without it the trail is one-way: Admin can reach Stripe,
    // but a customer quoting "order LG-XXXXXXXX" cannot be found in the Stripe
    // dashboard, which is exactly the moment support needs to issue a refund.
    try {
      await stripe.paymentIntents.update(intent.id, {
        metadata: { ...intent.metadata, orderNumber: order.orderNumber },
      });
    } catch (err) {
      console.error(`${LOG} could not tag intent ${intent.id} with its order number:`, err);
    }

    try {
      await sendPurchaseReceiptEmail({
        to: email,
        orderNumber: order.orderNumber,
        amount: intent.amount_received || intent.amount,
        currency: intent.currency,
        libraryExpiresAt,
      });
    } catch (err) {
      // A mail failure must not fail the webhook — that would have Stripe
      // retrying against access that is already granted.
      console.error(`${LOG} receipt email failed for order ${order.orderNumber}:`, err);
    }
  }

  return NextResponse.json({
    ok: true,
    orderNumber: order.orderNumber,
    alreadyProcessed: !order.isFirstProcessing,
  });
}

/**
 * A declined or failed payment is recorded in the log and grants nothing. The
 * customer sees a retryable error in the browser from the confirm call itself.
 */
function handleFailure(event: Stripe.Event) {
  const intent = event.data.object as Stripe.PaymentIntent;

  console.warn(
    `${LOG} payment failed for intent ${intent.id} ` +
      `(${intent.last_payment_error?.code ?? "unknown"}: ` +
      `${intent.last_payment_error?.message ?? "no message"}) — no access granted`
  );

  return NextResponse.json({ ok: true, granted: false });
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
    // A partial refund leaves access in place, but the order still has to
    // reflect it so admin and support see what was actually returned.
    const partial = await findPaymentForCharge(context);

    if (partial && partial.status !== "refunded") {
      await db
        .update(payments)
        .set({
          status: "partially_refunded",
          amountRefunded: context.amountRefunded ?? 0,
          updatedAt: new Date(),
        })
        .where(eq(payments.id, partial.id));
    }

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
    // Ends the Library bonus too, without deleting the entitlement history.
    await revokePurchaseEntitlements(payment.userId);
    console.warn(
      `${LOG} ACCESS REVOKED for ${payment.userId} — ${context.kind} ` +
        `(payment ${payment.stripePaymentId}, amount ${payment.amount}, event ${event.id})`
    );
  }

  await db
    .update(payments)
    .set({
      status: "refunded",
      amountRefunded: context.amountRefunded ?? payment.amount,
      updatedAt: new Date(),
    })
    .where(eq(payments.id, payment.id));

  return NextResponse.json({ ok: true, revoked: true, userId: payment.userId });
}

type RevocationContext = {
  kind: string;
  /** Cents returned so far, so a partial refund is visible in the order. */
  amountRefunded: number | null;
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
      amountRefunded: charge.amount_refunded,
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
    amountRefunded: dispute.amount,
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
