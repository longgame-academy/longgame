import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().min(1),
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string().min(1),
  CLERK_SECRET_KEY: z.string().min(1),
  NEXT_PUBLIC_STRIPE_PRICE_ID: z.string().startsWith("price_"),
  STRIPE_SECRET_KEY: z.string().min(1),
  // Needed by the on-site checkout to mount Stripe Elements.
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string().startsWith("pk_"),
  STRIPE_WEBHOOK_SECRET: z.string().startsWith("whsec_"),
  // Off unless explicitly enabled. See lib/tax.ts — this is a switch, not a
  // permanent assumption that tax is zero.
  STRIPE_TAX_ENABLED: z.enum(["true", "false"]).optional(),
  NEXT_PUBLIC_SITE_URL: z.string().url(),
  RESEND_API_KEY: z.string().min(1),
  MAILERLITE_API_KEY: z.string().min(1),
  MAILERLITE_FREE_GUIDE_GROUP_ID: z.string().min(1),
  UPSTASH_REDIS_REST_URL: z.string().url(),
  UPSTASH_REDIS_REST_TOKEN: z.string().min(1),
});

export const env = envSchema.parse(process.env);
