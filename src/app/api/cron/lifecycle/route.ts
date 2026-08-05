import { NextResponse } from "next/server";
import { and, eq, isNotNull, isNull, lte } from "drizzle-orm";
import { db } from "@/db";
import { entitlements, payments, renewalReminders } from "@/db/schema";
import { sendRenewalReminderEmail, sendAbandonedCheckoutEmail } from "@/lib/emails/lifecycle";
import { findRecoverableCheckouts, markRecoveryEmailSent } from "@/lib/abandoned";

const LOG = "[cron-lifecycle]";

/**
 * Sends the scheduled lifecycle emails: renewal reminders that are due, and
 * abandoned-checkout recovery.
 *
 * Nothing here charges anyone or changes an entitlement. Reminders are marked
 * sent before dispatch is considered complete, so a re-run of the job cannot
 * send the same reminder twice.
 *
 * Intended to be called once a day by a scheduler. Protected by a shared
 * secret, since it sends mail.
 */
export async function POST(req: Request) {
  const secret = process.env.CRON_SECRET;
  const provided = req.headers.get("authorization")?.replace(/^Bearer\s+/i, "");

  if (!secret || provided !== secret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const remindersSent = await sendDueRenewalReminders();
  const recoverySent = await sendAbandonedCheckoutRecovery();

  return NextResponse.json({ ok: true, remindersSent, recoverySent });
}

async function sendDueRenewalReminders(): Promise<number> {
  const now = new Date();

  const due = await db
    .select({
      id: renewalReminders.id,
      offsetDays: renewalReminders.offsetDays,
      userId: renewalReminders.userId,
      expiresAt: entitlements.expiresAt,
      email: payments.email,
    })
    .from(renewalReminders)
    .innerJoin(entitlements, eq(renewalReminders.entitlementId, entitlements.id))
    .leftJoin(payments, eq(entitlements.orderId, payments.id))
    .where(
      and(
        isNull(renewalReminders.sentAt),
        lte(renewalReminders.scheduledFor, now),
        // A refund expires the entitlement and clears its reminders, so anything
        // still unsent here belongs to a live entitlement.
        isNotNull(entitlements.expiresAt)
      )
    );

  let sent = 0;

  for (const reminder of due) {
    if (!reminder.email || !reminder.expiresAt) {
      // Nothing to send to. Mark it so the job does not keep re-reading it.
      await db
        .update(renewalReminders)
        .set({ sentAt: now })
        .where(eq(renewalReminders.id, reminder.id));
      continue;
    }

    // Claimed before sending: if the send throws, the reminder is not retried
    // and the customer cannot be mailed the same notice twice.
    const claimed = await db
      .update(renewalReminders)
      .set({ sentAt: now })
      .where(
        and(eq(renewalReminders.id, reminder.id), isNull(renewalReminders.sentAt))
      )
      .returning({ id: renewalReminders.id });

    if (claimed.length === 0) continue;

    try {
      await sendRenewalReminderEmail({
        to: reminder.email,
        expiresAt: reminder.expiresAt,
        daysRemaining: reminder.offsetDays,
      });
      sent++;
    } catch (err) {
      console.error(`${LOG} renewal reminder ${reminder.id} failed to send:`, err);
    }
  }

  return sent;
}

async function sendAbandonedCheckoutRecovery(): Promise<number> {
  // Anyone who has since purchased carries recoveredAt and is excluded by the
  // query itself, so a completed purchaser is never contacted.
  const pending = await findRecoverableCheckouts(60);

  let sent = 0;

  for (const checkout of pending) {
    try {
      await markRecoveryEmailSent(checkout.id);
      await sendAbandonedCheckoutEmail({ to: checkout.email });
      sent++;
    } catch (err) {
      console.error(`${LOG} recovery email ${checkout.id} failed to send:`, err);
    }
  }

  return sent;
}
