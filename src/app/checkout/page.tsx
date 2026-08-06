import { headers } from "next/headers";
import type { Metadata } from "next";
import { pricingForCountry } from "@/lib/pricing";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";

export const metadata: Metadata = {
  title: "Checkout — The Parent Academy | Long Game",
  description:
    "Complete your one-time Parent Academy purchase. No subscription, no automatic renewal.",
  robots: { index: false, follow: false },
};

/**
 * Prices the page on the server from the same country signal the marketing
 * pages use, so the visitor arrives at checkout seeing exactly the figure they
 * were quoted. The client is handed the resolved plan and never picks one.
 */
export default async function CheckoutPage() {
  const country = (await headers()).get("x-vercel-ip-country");
  const plan = pricingForCountry(country);

  return (
    <main className="min-h-screen bg-white">
      <CheckoutForm
        currency={plan.currency}
        productAmount={plan.amountCents}
        priceLabel={plan.display}
      />
    </main>
  );
}
