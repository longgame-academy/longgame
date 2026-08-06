import { resend } from "@/lib/resend";
import { formatAmount } from "@/lib/pricing";
import { formatExpiryDate } from "@/lib/orders";
import { GUARANTEE_SENTENCE, SUPPORT_EMAIL } from "@/lib/legal";

const FROM = "Long Game Academy <onboarding@longgameacademy.com>";

/** Anything interpolated into email HTML must be escaped. */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function portalUrl(): string {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://longgameacademy.com";
  return `${base.replace(/\/+$/, "")}/portal`;
}

function shell(intro: string): string {
  return `
      <div style="font-family: Lora, serif; background: #F7F1E8; padding: 32px; color: #1A1A1A;">
        <h1 style="font-family: Poppins, sans-serif; color: #0D0D0D;">Welcome to Long Game Academy</h1>
        <p>${intro}</p>
        <p>
          <a href="${portalUrl()}" style="color: #C9962E;">
            Go to your portal &rarr;
          </a>
        </p>
      </div>
    `;
}

/**
 * The receipt and welcome email for a completed Parent Academy purchase.
 *
 * Carries what the customer needs and what a receipt has to state: the amount
 * and currency paid, the Long Game order number, how to get into the Academy,
 * the exact date the Library bonus runs through, and an unambiguous statement
 * that nothing renews automatically.
 */
export async function sendPurchaseReceiptEmail(params: {
  to: string;
  orderNumber: string;
  amount: number;
  currency: string;
  libraryExpiresAt: Date;
}) {
  const total = formatAmount(params.amount, params.currency);
  const expiry = formatExpiryDate(params.libraryExpiresAt);

  await resend.emails.send({
    from: FROM,
    to: params.to,
    subject: `Your Parent Academy access — order ${escapeHtml(params.orderNumber)}`,
    html: `
      <div style="font-family: Lora, serif; background: #F7F1E8; padding: 32px; color: #1A1A1A;">
        <h1 style="font-family: Poppins, sans-serif; color: #0D0D0D;">Welcome to the Parent Academy</h1>

        <p>Your payment went through and your access is live.</p>

        <p>
          <strong>Order:</strong> ${escapeHtml(params.orderNumber)}<br>
          <strong>Total paid:</strong> ${escapeHtml(total)}
        </p>

        <p>
          <a href="${portalUrl()}" style="color: #C9962E;">
            Go to the Parent Academy &rarr;
          </a><br>
          Sign in with this email address to open all 12 modules.
        </p>

        <p>
          <strong>Bonus: Long Game Library</strong><br>
          Your 12 months of bonus Library access runs through
          <strong>${escapeHtml(expiry)}</strong>. Every Field Guide, Practical
          Tool and new parent resource added before then is included at no
          additional cost.
        </p>

        <p>
          <strong>This was a one-time payment.</strong> There is no subscription,
          no automatic renewal and no recurring charge. Nothing will be charged
          to you again.
        </p>

        <p>
          14-Day Satisfaction Guarantee &mdash; ${escapeHtml(GUARANTEE_SENTENCE)}
        </p>

        <p>
          Questions? Reply to this email or contact us at
          <a href="mailto:${SUPPORT_EMAIL}" style="color: #C9962E;">${SUPPORT_EMAIL}</a>.
        </p>
      </div>
    `,
  });
}

export async function sendWelcomeEmail(to: string) {
  await resend.emails.send({
    from: FROM,
    to,
    subject: "You're in — welcome to Long Game Academy",
    html: shell("Your payment went through and your portal access is live."),
  });
}

export async function sendOrgWelcomeEmail(to: string, orgName: string) {
  await resend.emails.send({
    from: FROM,
    to,
    subject: "You're in — welcome to Long Game Academy",
    html: shell(
      `You've joined ${escapeHtml(orgName)} on Long Game Academy and your portal access is live.`
    ),
  });
}
