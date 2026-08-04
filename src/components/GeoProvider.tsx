"use client";

import { createContext, useContext } from "react";

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

export type Pricing = {
  country: string | null;
  isCanada: boolean;
  /** Bare figure, e.g. "$119" — pair with `currency` when both are shown. */
  amount: string;
  currency: "CAD" | "USD";
  /** Figure and currency together, e.g. "$119 CAD" — for inline copy. */
  display: string;
};

/**
 * Canada is priced in CAD; the US, everywhere else, and any request we can't
 * geolocate all fall back to USD.
 */
export function usePricing(): Pricing {
  const country = useContext(CountryContext);
  const isCanada = country === "CA";

  return {
    country,
    isCanada,
    amount: isCanada ? "$119" : "$97",
    currency: isCanada ? "CAD" : "USD",
    display: isCanada ? "$119 CAD" : "$97 USD",
  };
}
