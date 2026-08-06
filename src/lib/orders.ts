import { customAlphabet } from "nanoid";
import { clerkClient } from "@clerk/nextjs/server";
import { and, eq, isNull } from "drizzle-orm";
import { db } from "@/db";
import {
  abandonedCheckouts,
  entitlements,
  payments,
  renewalReminders,
} from "@/db/schema";
import { grantIndividualAccess } from "@/lib/access";

const LOG = "[orders]";

/** How long the Library bonus runs for. One place, so it cannot drift. */
export const LIBRARY_BONUS_MONTHS = 12;

/** Voluntary renewal nudges, in days before Library expiry. Never a charge. */
export const RENEWAL_REMINDER_DAYS = [30, 14, 7] as const;

// No look-alike characters, so an order number read off an email over the
// phone to support cannot be mistyped.
const orderId = customAlphabet("ABCDEFGHJKLMNPQRSTUVWXYZ23456789", 8);

export function generateOrderNumber(): string {
  return `LG-${orderId()}`;
}

/** Adds whole months, clamping to the last valid day of the target month. */
export function addMonths(from: Date, months: number): Date {
  const result = new Date(from.getTime());
  const targetMonth = result.getMonth() + months;
  result.setMonth(targetMonth);
  // Feb 29 + 12 months would otherwise roll into March.
  if (result.getMonth() !== ((targetMonth % 12) + 12) % 12) {
    result.setDate(0);
  }
  return result;
}

export function libraryExpiryFrom(startsAt: Date): Date {
  return addMonths(startsAt, LIBRARY_BONUS_MONTHS);
}

/**
 * Finds the Clerk account for this email, or creates one.
 *
 * Purchases are guest checkout, so the account is resolved here rather than
 * being known up front. Matching on email first is what stops a returning
 * customer ending up with a second account.
 */
export async function findOrCreateClerkUser(params: {
  email: string;
  firstName?: string | null;
  lastName?: string | null;
}): Promise<string> {
  const email = params.email.trim().toLowerCase();
  const client = await clerkClient();

  const existing = await client.users.getUserList({
    emailAddress: [email],
    limit: 1,
  });

  if (existing.data.length > 0) {
    return existing.data[0].id;
  }

  const created = await client.users.createUser({
    emailAddress: [email],
    firstName: params.firstName || undefined,
    lastName: params.lastName || undefined,
    // The customer sets a password (or uses an email code) when they first
    // sign in from the welcome email. We never handle one at checkout.
    skipPasswordRequirement: true,
  });

  console.info(`${LOG} created Clerk user ${created.id} for a new purchaser`);
  return created.id;
}

export type RecordOrderInput = {
  userId: string;
  /** Idempotency key. The PaymentIntent id for on-site checkout. */
  stripePaymentId: string;
  stripePaymentIntentId?: string | null;
  stripeCheckoutSessionId?: string | null;
  stripeCustomerId?: string | null;
  email: string;
  firstName?: string | null;
  lastName?: string | null;
  amount: number;
  currency: string;
  taxAmount?: number;
};

export type RecordedOrder = {
  id: number;
  orderNumber: string;
  /** False when a Stripe retry re-delivered an event we already handled. */
  isFirstProcessing: boolean;
};

/**
 * Writes the paid order, exactly once.
 *
 * The unique constraint on stripePaymentId is the idempotency marker: a
 * retried webhook conflicts instead of inserting, and we read back the row we
 * already wrote. Nothing here grants access — that is
 * `grantPurchaseEntitlements`, which is separately idempotent.
 */
export async function recordPaidOrder(
  input: RecordOrderInput
): Promise<RecordedOrder> {
  const inserted = await db
    .insert(payments)
    .values({
      userId: input.userId,
      stripePaymentId: input.stripePaymentId,
      stripePaymentIntentId: input.stripePaymentIntentId ?? input.stripePaymentId,
      stripeCheckoutSessionId: input.stripeCheckoutSessionId ?? null,
      stripeCustomerId: input.stripeCustomerId ?? null,
      orderNumber: generateOrderNumber(),
      email: input.email.trim().toLowerCase(),
      firstName: input.firstName ?? null,
      lastName: input.lastName ?? null,
      amount: input.amount,
      currency: input.currency.toUpperCase(),
      taxAmount: input.taxAmount ?? 0,
      status: "succeeded",
      updatedAt: new Date(),
    })
    .onConflictDoNothing({ target: payments.stripePaymentId })
    .returning({ id: payments.id, orderNumber: payments.orderNumber });

  if (inserted.length > 0) {
    return {
      id: inserted[0].id,
      orderNumber: inserted[0].orderNumber ?? "",
      isFirstProcessing: true,
    };
  }

  const [existing] = await db
    .select({ id: payments.id, orderNumber: payments.orderNumber })
    .from(payments)
    .where(eq(payments.stripePaymentId, input.stripePaymentId))
    .limit(1);

  return {
    id: existing.id,
    orderNumber: existing.orderNumber ?? "",
    isFirstProcessing: false,
  };
}

export type GrantedEntitlements = {
  /** Exact date the Library bonus runs through. Shown to the customer. */
  libraryExpiresAt: Date;
};

/**
 * Grants everything a successful purchase buys:
 *   - the complete 12-module Parent Academy, which does not expire
 *   - the 12-month Library bonus, starting at the purchase timestamp
 *   - the voluntary 30/14/7-day renewal reminders
 *
 * Every write is a no-op on conflict, so a Stripe retry cannot produce a second
 * entitlement or a duplicate reminder.
 */
export async function grantPurchaseEntitlements(params: {
  userId: string;
  orderId: number;
  purchasedAt: Date;
}): Promise<GrantedEntitlements> {
  const { userId, orderId, purchasedAt } = params;

  // Parent Academy access still flows through enrollments, which every
  // existing access check reads. Idempotent already.
  await grantIndividualAccess(userId);

  await db
    .insert(entitlements)
    .values({
      userId,
      kind: "parent_academy",
      source: "purchase",
      orderId,
      startsAt: purchasedAt,
      expiresAt: null, // the purchased product does not expire
      updatedAt: new Date(),
    })
    .onConflictDoNothing({
      target: [entitlements.userId, entitlements.kind],
    });

  const libraryExpiresAt = libraryExpiryFrom(purchasedAt);

  const libraryRows = await db
    .insert(entitlements)
    .values({
      userId,
      kind: "library",
      source: "purchase",
      orderId,
      startsAt: purchasedAt,
      expiresAt: libraryExpiresAt,
      updatedAt: new Date(),
    })
    .onConflictDoNothing({
      target: [entitlements.userId, entitlements.kind],
    })
    .returning({ id: entitlements.id, expiresAt: entitlements.expiresAt });

  // On a retry the insert is a no-op, so read back the entitlement that is
  // actually stored — its expiry, not a freshly computed one, is the date the
  // customer was told.
  const library =
    libraryRows[0] ??
    (
      await db
        .select({ id: entitlements.id, expiresAt: entitlements.expiresAt })
        .from(entitlements)
        .where(
          and(eq(entitlements.userId, userId), eq(entitlements.kind, "library"))
        )
        .limit(1)
    )[0];

  const storedExpiry = library?.expiresAt ?? libraryExpiresAt;

  if (library) {
    await scheduleRenewalReminders({
      userId,
      entitlementId: library.id,
      expiresAt: storedExpiry,
    });
  }

  return { libraryExpiresAt: storedExpiry };
}

/**
 * Books the voluntary renewal nudges. These offer another year; they never
 * charge, and no Stripe subscription exists to renew.
 */
export async function scheduleRenewalReminders(params: {
  userId: string;
  entitlementId: number;
  expiresAt: Date;
}): Promise<void> {
  const rows = RENEWAL_REMINDER_DAYS.map((offsetDays) => ({
    userId: params.userId,
    entitlementId: params.entitlementId,
    offsetDays,
    scheduledFor: new Date(
      params.expiresAt.getTime() - offsetDays * 24 * 60 * 60 * 1000
    ),
  }));

  await db
    .insert(renewalReminders)
    .values(rows)
    .onConflictDoNothing({
      target: [renewalReminders.entitlementId, renewalReminders.offsetDays],
    });
}

export type LibraryAccess = {
  status: "active" | "expired" | "none";
  startsAt: Date | null;
  expiresAt: Date | null;
};

/**
 * The Library bonus state for one user. Expiry is evaluated from the stored
 * date at read time, which is what makes the lock automatic — nothing has to
 * run on a schedule, and no order history is touched when it lapses.
 */
export async function getLibraryAccess(userId: string): Promise<LibraryAccess> {
  const [row] = await db
    .select({
      startsAt: entitlements.startsAt,
      expiresAt: entitlements.expiresAt,
    })
    .from(entitlements)
    .where(
      and(eq(entitlements.userId, userId), eq(entitlements.kind, "library"))
    )
    .limit(1);

  if (!row) return { status: "none", startsAt: null, expiresAt: null };

  const active = !row.expiresAt || row.expiresAt.getTime() > Date.now();

  return {
    status: active ? "active" : "expired",
    startsAt: row.startsAt,
    expiresAt: row.expiresAt,
  };
}

/** True when the user's Library bonus is currently active. */
export async function hasLibraryAccess(userId: string): Promise<boolean> {
  const access = await getLibraryAccess(userId);
  return access.status === "active";
}

/**
 * Ends a user's purchased entitlements after a refund or dispute.
 *
 * The rows are expired rather than deleted, so the order and entitlement
 * history stays intact and auditable — support can still see what was bought,
 * when, and when it ended. Idempotent: re-running just rewrites the same dates.
 */
export async function revokePurchaseEntitlements(userId: string): Promise<void> {
  const now = new Date();

  await db
    .update(entitlements)
    .set({ expiresAt: now, updatedAt: now })
    .where(eq(entitlements.userId, userId));

  // Nothing further should be sent about a purchase that was refunded.
  await db
    .update(renewalReminders)
    .set({ sentAt: now })
    .where(and(eq(renewalReminders.userId, userId), isNull(renewalReminders.sentAt)));
}

/**
 * Takes a purchaser out of the abandoned-checkout sequence. Safe to call for an
 * email that was never recorded as abandoned.
 */
export async function suppressAbandonedCheckout(email: string): Promise<void> {
  await db
    .update(abandonedCheckouts)
    .set({ recoveredAt: new Date(), updatedAt: new Date() })
    .where(
      and(
        eq(abandonedCheckouts.email, email.trim().toLowerCase()),
        isNull(abandonedCheckouts.recoveredAt)
      )
    );
}

/** Formats an expiry for customer-facing copy, e.g. "5 August 2027". */
export function formatExpiryDate(date: Date): string {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}
