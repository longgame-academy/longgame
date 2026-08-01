import { resend } from "@/lib/resend";

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
