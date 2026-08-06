import { and, eq, isNull, lt } from "drizzle-orm";
import { db } from "@/db";
import { abandonedCheckouts } from "@/db/schema";

const LOG = "[abandoned-checkout]";

/**
 * Records that someone entered their email at checkout but has not paid.
 *
 * This is not an order and carries no entitlement. One open row per email: a
 * customer who retries twice is one abandoned checkout, not two.
 *
 * A name is never required — recovery copy is written so it reads naturally
 * without one.
 */
export async function recordAbandonedCheckout(params: {
  email: string;
  firstName?: string | null;
  amount?: number | null;
  currency?: string | null;
  stripePaymentIntentId?: string | null;
}): Promise<void> {
  const email = params.email.trim().toLowerCase();

  try {
    await db
      .insert(abandonedCheckouts)
      .values({
        email,
        firstName: params.firstName ?? null,
        amount: params.amount ?? null,
        currency: params.currency ?? null,
        stripePaymentIntentId: params.stripePaymentIntentId ?? null,
        updatedAt: new Date(),
      })
      .onConflictDoUpdate({
        target: abandonedCheckouts.email,
        set: {
          firstName: params.firstName ?? null,
          amount: params.amount ?? null,
          currency: params.currency ?? null,
          stripePaymentIntentId: params.stripePaymentIntentId ?? null,
          updatedAt: new Date(),
        },
        // A customer who already bought must not be dragged back into the
        // sequence by a later visit to the checkout page.
        setWhere: isNull(abandonedCheckouts.recoveredAt),
      });
  } catch (err) {
    // Capturing this is a marketing nicety. It must never be able to stop
    // someone from paying.
    console.error(`${LOG} could not record capture:`, err);
  }
}

/**
 * Open abandoned checkouts old enough to contact, excluding anyone who has
 * since purchased and anyone already emailed.
 */
export async function findRecoverableCheckouts(olderThanMinutes = 60) {
  const cutoff = new Date(Date.now() - olderThanMinutes * 60 * 1000);

  return db
    .select({
      id: abandonedCheckouts.id,
      email: abandonedCheckouts.email,
      firstName: abandonedCheckouts.firstName,
      createdAt: abandonedCheckouts.createdAt,
    })
    .from(abandonedCheckouts)
    .where(
      and(
        isNull(abandonedCheckouts.recoveredAt),
        isNull(abandonedCheckouts.lastEmailedAt),
        lt(abandonedCheckouts.createdAt, cutoff)
      )
    );
}

export async function markRecoveryEmailSent(id: number): Promise<void> {
  await db
    .update(abandonedCheckouts)
    .set({ lastEmailedAt: new Date(), updatedAt: new Date() })
    .where(eq(abandonedCheckouts.id, id));
}
