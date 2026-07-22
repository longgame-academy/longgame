import { auth, currentUser } from "@clerk/nextjs/server";
import { stripe } from "@/lib/stripe";
import { checkoutRatelimit } from "@/lib/ratelimit";
import { NextResponse } from "next/server";

export async function POST() {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { success } = await checkoutRatelimit.limit(userId);
  if (!success) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  const user = await currentUser();
  const email = user?.emailAddresses[0]?.emailAddress;

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [
      {
        price: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID!,
        quantity: 1,
      },
    ],
    allow_promotion_codes: true,
    customer_email: email,
    // Stripe's source-of-truth link back to this specific user —
    // read in the webhook handler, never trust client-supplied user id.
    client_reference_id: userId,
    success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/success`,
    cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/parent-academy`,
  });

  return NextResponse.json({ url: session.url });
}
