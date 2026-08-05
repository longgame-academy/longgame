/**
 * Conversion events for the checkout funnel.
 *
 * Deliberately thin: it forwards to whatever analytics layer is present on the
 * page and does nothing if none is. Checkout must never break because an
 * analytics script failed to load or was blocked.
 *
 * Never pass card data, payment credentials, or personal information beyond
 * what an event genuinely needs. Email in particular is captured server-side
 * against the order — it does not belong in a client-side event.
 */

export type CheckoutEvent =
  | "checkout_viewed"
  | "checkout_email_captured"
  | "checkout_wallet_available"
  | "checkout_applepay_selected"
  | "checkout_card_selected"
  | "checkout_payment_failed"
  | "checkout_payment_succeeded"
  | "checkout_abandoned";

type EventProps = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

export function track(event: CheckoutEvent, props: EventProps = {}): void {
  if (typeof window === "undefined") return;

  try {
    window.dataLayer = window.dataLayer ?? [];
    window.dataLayer.push({ event, ...props });
  } catch {
    // Analytics is never allowed to interrupt a purchase.
  }
}
