# Long Game Academy

Next.js platform for Long Game (longgameacademy.com) — parent-development content, org access codes, Stripe checkout, admin dashboard.

## Stack
Next.js (App Router) - Drizzle ORM - Neon (Postgres, serverless) - Clerk (auth) - Stripe (payments) - Resend (transactional email) - Mailerlite (lead capture) - Upstash Redis (rate limiting) - Vercel Blob (file storage)

## Setup
1. `npm install`
2. Copy `.env.example` to `.env.local` and fill in values
3. `npx drizzle-kit generate` then `npx drizzle-kit migrate`
4. `npm run dev`

Note: local `npm run build` can fail on Google Fonts network errors — not a code issue. Push and let Vercel build.

## DB changes
Edit `src/db/schema.ts`, then:
npx drizzle-kit generate
npx drizzle-kit migrate

## Structure
- `src/app` - routes (public site, `/admin`, `/portal`, `/api`)
- `src/components` - shared UI
- `src/lib` - server utilities (auth, rate limiting, email, Stripe)
- `src/db` - Drizzle schema + client

## Access model
- `/admin/*` - gated server-side via `requireAdmin()` in `src/lib/admin.ts`
- `/portal/*` - gated via Clerk auth + enrollment check in `src/app/portal/layout.tsx`
- Org code redemption uses a DB transaction with row-level locking (`src/app/api/org/redeem/route.ts`)
- Stripe webhook is signature-verified and idempotent (`src/app/api/webhooks/stripe/route.ts`)
