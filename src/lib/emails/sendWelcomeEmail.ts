import { resend } from "@/lib/resend";

export async function sendWelcomeEmail(to: string) {
  await resend.emails.send({
    from: "Long Game Academy <onboarding@longgameacademy.com>",
    to,
    subject: "You're in — welcome to Long Game Academy",
    html: `
      <div style="font-family: Lora, serif; background: #F7F1E8; padding: 32px; color: #1A1A1A;">
        <h1 style="font-family: Poppins, sans-serif; color: #0D0D0D;">Welcome to Long Game Academy</h1>
        <p>Your payment went through and your portal access is live.</p>
        <p>
          <a href="${process.env.NEXT_PUBLIC_SITE_URL}/portal" style="color: #C9962E;">
            Go to your portal →
          </a>
        </p>
      </div>
    `,
  });
}