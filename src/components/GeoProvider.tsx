"use client";

import { createContext, useContext } from "react";
import { pricingForCountry } from "@/lib/pricing";

/**
 * Two-digit ISO country code for the current request, resolved server-side in
 * the root layout. `null` whenever we can't place the visitor.
 */
const CountryContext = createContext<string | null>(null);

export function GeoProvider({
  country,
  children,
}: {
  country: string | null;
  children: React.ReactNode;
}) {
  return <CountryContext.Provider value={country}>{children}</CountryContext.Provider>;
}

export type Pricing = ReturnType<typeof usePricing>;

/**
 * Reads the visitor's country from context and resolves it through the shared
 * pricing table, so the figures on the marketing pages are the same ones
 * checkout and the PaymentIntent use.
 */
export function usePricing() {
  const country = useContext(CountryContext);
  const plan = pricingForCountry(country);

  return {
    ...plan,
    country,
    isCanada: plan.currency === "CAD",
  };
}

/** The country resolved for this request, for callers that need it directly. */
export function useCountry(): string | null {
  return useContext(CountryContext);
}
