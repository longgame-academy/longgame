/**
 * The single source of truth for what the Parent Academy costs.
 *
 * The marketing pages, the checkout page and the PaymentIntent all resolve
 * their figures from here, which is what keeps the price the visitor was shown
 * identical to the one they are charged. The server never accepts an amount
 * from the browser — it re-resolves it from the request's country.
 */

export type Currency = "USD" | "CAD";

export type PricingPlan = {
  currency: Currency;
  /** Amount in the smallest currency unit, which is what Stripe charges. */
  amountCents: number;
  /** Bare figure, e.g. "$119" — pair with `currency` when both are shown. */
  amount: string;
  /** Figure and currency together, e.g. "$119 CAD" — for inline copy. */
  display: string;
  /** Pre-discount figure shown struck through beside `amount`. */
  regular: string;
  /** Exact total with cents, e.g. "$119.00 CAD" — for the order summary. */
  total: string;
};

const USD: PricingPlan = {
  currency: "USD",
  amountCents: 9700,
  amount: "$97",
  display: "$97 USD",
  regular: "$147",
  total: "$97.00 USD",
};

const CAD: PricingPlan = {
  currency: "CAD",
  amountCents: 11900,
  amount: "$119",
  display: "$119 CAD",
  regular: "$179",
  total: "$119.00 CAD",
};

/**
 * Canada is priced in CAD; the US, everywhere else, and any request we cannot
 * geolocate all fall back to USD.
 */
export function pricingForCountry(country: string | null | undefined): PricingPlan {
  return country === "CA" ? CAD : USD;
}

/**
 * Resolves a currency back to its plan, for cases where the currency is already
 * settled — reading an existing order, say — and must not be re-derived from
 * geography.
 */
export function pricingForCurrency(currency: string | null | undefined): PricingPlan {
  return currency?.toUpperCase() === "CAD" ? CAD : USD;
}

/** Formats cents for display, e.g. (11900, "CAD") -> "$119.00 CAD". */
export function formatAmount(cents: number, currency: string): string {
  return `$${(cents / 100).toFixed(2)} ${currency.toUpperCase()}`;
}
