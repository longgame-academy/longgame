# Long Game Academy

A custom-built platform for parent development in youth sports. Members get access to a structured learning system, downloadable resources, and practical tools — delivered through a private portal.

## Tech Stack

- **Framework:** Next.js (App Router, TypeScript)
- **Styling:** Tailwind CSS v4
- **Database:** Neon (Postgres) + Drizzle ORM
- **Auth:** Clerk
- **Payments:** Stripe (Checkout + Webhooks)
- **Transactional Email:** Resend
- **Marketing Email:** MailerLite
- **Hosting:** Vercel
- **Animation:** Framer Motion

## Features

- Public marketing pages (Home, Parent Academy, Organizations, Free Guide, Our Story, FAQ, Contact)
- Gated parent portal with modules, field guides, and downloadable tools
- Stripe checkout with webhook-driven enrollment (server is the source of truth, not client redirects)
- Organization codes with role-based access, redeemed inside a locked DB transaction to prevent race conditions
- Admin dashboard for managing organizations, users, content, and leads
- Free Guide lead capture with automated email delivery via MailerLite
- Every access check runs server-side — no content route is reachable by a guessable or public URL

## Getting Started

### Prerequisites

- Node.js 18+
- A Neon Postgres database
- Accounts for Clerk, Stripe, Resend, and MailerLite

### Installation

```bash
git clone https://github.com/YOUR_USERNAME/longgame-academy.git
cd longgame-academy
npm install
```

### Environment Variables

Create a `.env` file in the project root:

DATABASE_URL=
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_STRIPE_PRICE_ID=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_SITE_URL=
RESEND_API_KEY=
MAILERLITE_API_KEY=
MAILERLITE_FREE_GUIDE_GROUP_ID=

### Database Setup

```bash
npx drizzle-kit generate
npx drizzle-kit migrate
```

### Run Locally

```bash
npm run dev
```

App runs at `http://localhost:3000`.

### Stripe Webhook (local testing)

```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

## Project Structure

src/
├── app/
│ ├── (public pages)/ # Home, Parent Academy, Free Guide, etc.
│ ├── admin/ # Admin dashboard, gated by requireAdmin()
│ ├── portal/ # Member portal, gated by enrollment check
│ └── api/ # Route handlers (checkout, webhooks, admin, leads)
├── components/ # Shared UI components
├── db/
│ └── schema.ts # Drizzle schema definitions
└── lib/ # Auth helpers, Stripe client, email senders

## Access Control

- All content and admin routes are protected server-side, never trusted from the client.
- Field Guide and Tool downloads are never served from public or predictable URLs — every request re-checks access before returning a file.
- Individual access and organization access are tracked and enforced separately.
- Org code redemption runs inside a database transaction with row locking to prevent duplicate/concurrent use.

## Deployment

Hosted on Vercel. Add all environment variables in the Vercel project settings, and register a separate production Stripe webhook endpoint (distinct from the local development one).

## License

Private and proprietary. All rights reserved.