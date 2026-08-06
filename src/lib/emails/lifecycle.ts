import { resend } from "@/lib/resend";
import { SUPPORT_EMAIL } from "@/lib/legal";
import { formatExpiryDate } from "@/lib/orders";

const FROM = "Long Game Academy <onboarding@longgameacademy.com>";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function siteUrl(path = ""): string {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://longgameacademy.com";
  return `${base.replace(/\/+$/, "")}${path}`;
}

function shell(body: string): string {
  return `
    <div style="font-family: Lora, serif; background: #F7F1E8; padding: 32px; color: #1A1A1A;">
      ${body}
      <p style="font-size: 13px; color: #5D6562;">
        Questions? Contact us at
        <a href="mailto:${SUPPORT_EMAIL}" style="color: #C9962E;">${SUPPORT_EMAIL}</a>.
      </p>
    </div>
  `;
}

/**
 * A voluntary nudge that the Library bonus is ending, sent 30, 14 and 7 days
 * out. It offers another year; it never charges, and there is no subscription
 * to cancel. No renewal price is quoted, because none has been set.
 */
export async function sendRenewalReminderEmail(params: {
  to: string;
  expiresAt: Date;
  daysRemaining: number;
}) {
  const expiry = formatExpiryDate(params.expiresAt);

  await resend.emails.send({
    from: FROM,
    to: params.to,
    subject: `Your Long Game Library access ends in ${params.daysRemaining} days`,
    html: shell(`
      <h1 style="font-family: Poppins, sans-serif; color: #0D0D0D;">
        Your bonus Library access is ending
      </h1>

      <p>
        Your 12 months of bonus Long Game Library access run through
        <strong>${escapeHtml(expiry)}</strong> &mdash; about
        ${params.daysRemaining} days from now.
      </p>

      <p>
        <strong>Your Parent Academy is not affected.</strong> All 12 modules are
        yours and do not expire. This is only about the bonus Library of Field
        Guides and Practical Tools.
      </p>

      <p>
        <strong>Nothing will be charged.</strong> There is no subscription and no
        automatic renewal, so there is nothing to cancel and no payment will be
        taken. If you would like another year of Library access, you can choose
        to add one &mdash; just reply to this email and we will help.
      </p>

      <p>
        <a href="${siteUrl("/portal")}" style="color: #C9962E;">
          Open your Parent Academy &rarr;
        </a>
      </p>
    `),
  });
}

/**
 * Recovery for someone who entered their email at checkout and did not finish.
 *
 * Written to read naturally without a first name, because a name is never
 * required to start recovery.
 */
export async function sendAbandonedCheckoutEmail(params: { to: string }) {
  await resend.emails.send({
    from: FROM,
    to: params.to,
    subject: "You left something behind at Long Game",
    html: shell(`
      <h1 style="font-family: Poppins, sans-serif; color: #0D0D0D;">
        Still thinking it over?
      </h1>

      <p>
        You started signing up for the Parent Academy but didn't finish. Your
        place isn't reserved, but picking up where you left off only takes a
        minute.
      </p>

      <p>
        The Parent Academy is a one-time purchase &mdash; 12 modules, plus 12
        months of bonus Long Game Library access and the Glove Box Cards. No
        subscription and no automatic renewal.
      </p>

      <p>
        <a href="${siteUrl("/checkout")}" style="color: #C9962E;">
          Finish your purchase &rarr;
        </a>
      </p>

      <p style="font-size: 13px; color: #5D6562;">
        Not interested? You can ignore this email and we won't send another
        about it.
      </p>
    `),
  });
}
