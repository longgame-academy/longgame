"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  ExpressCheckoutElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { formatAmount } from "@/lib/pricing";
import { COUNTRIES, PRIORITY_COUNTRIES } from "@/lib/countries";
import {
  GUARANTEE_SENTENCE,
  GUARANTEE_TITLE,
  NO_RENEWAL_LINE,
  SUPPORT_EMAIL,
} from "@/lib/legal";
import { track } from "@/lib/analytics";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

type Props = {
  currency: string;
  productAmount: number;
  priceLabel: string;
};

export function CheckoutForm(props: Props) {
  // Deferred intent: Elements mounts against the amount, and the PaymentIntent
  // is created at submit, once we know the email and billing location. That is
  // what lets email be captured before any card details are collected.
  const options = useMemo(
    () => ({
      mode: "payment" as const,
      amount: props.productAmount,
      currency: props.currency.toLowerCase(),
      appearance: {
        variables: {
          colorPrimary: "#128F78",
          colorText: "#121514",
          colorDanger: "#B42318",
          borderRadius: "9px",
          fontFamily: "Satoshi, Arial, sans-serif",
        },
      },
    }),
    [props.productAmount, props.currency]
  );

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutInner {...props} />
    </Elements>
  );
}

type Quote = {
  productAmount: number;
  taxAmount: number;
  taxLabel: string | null;
  totalAmount: number;
};

function CheckoutInner({ currency, productAmount, priceLabel }: Props) {
  const stripe = useStripe();
  const elements = useElements();

  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [billingCountry, setBillingCountry] = useState("");
  const [billingState, setBillingState] = useState("");
  const [billingPostalCode, setBillingPostalCode] = useState("");

  const [quote, setQuote] = useState<Quote>({
    productAmount,
    taxAmount: 0,
    taxLabel: null,
    totalAmount: productAmount,
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [walletAvailable, setWalletAvailable] = useState(false);

  const capturedEmail = useRef<string | null>(null);
  const viewTracked = useRef(false);

  if (!viewTracked.current) {
    viewTracked.current = true;
    track("checkout_viewed", { currency });
  }

  /**
   * Records the email as soon as it is a valid address and the field is left,
   * so someone who stops here is recoverable. Fires once per address.
   */
  const captureEmail = useCallback(
    (value: string) => {
      const trimmed = value.trim().toLowerCase();
      if (!trimmed || !trimmed.includes("@") || capturedEmail.current === trimmed) {
        return;
      }
      capturedEmail.current = trimmed;
      track("checkout_email_captured");

      void fetch("/api/checkout/capture", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed, firstName: firstName.trim() }),
      }).catch(() => {
        // Recovery capture is best-effort and must never interrupt checkout.
      });
    },
    [firstName]
  );

  /**
   * Re-prices for the billing location so any tax is in the summary and on the
   * pay button before the customer commits to it.
   */
  const refreshQuote = useCallback(async () => {
    if (billingCountry.length !== 2) return;

    try {
      const res = await fetch("/api/checkout/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          billingCountry,
          billingState,
          billingPostalCode,
        }),
      });
      if (!res.ok) return;

      const data = (await res.json()) as Quote;
      setQuote(data);
      elements?.update({ amount: data.totalAmount });
    } catch {
      // Keep the untaxed total on the screen rather than blanking the summary.
    }
  }, [billingCountry, billingState, billingPostalCode, elements]);

  /**
   * The one path both Apple Pay and card go through, so a wallet purchase and a
   * card purchase produce identical orders. Creates the PaymentIntent, then
   * confirms it. Access is granted by the webhook, never here.
   */
  async function pay(details: {
    email: string;
    firstName: string;
    lastName: string;
    billingCountry: string;
    billingState: string;
    billingPostalCode: string;
    // Not collected on the card path by design. A wallet returns them, so they
    // are passed through when it does rather than being discarded.
    billingLine1?: string;
    billingLine2?: string;
    billingCity?: string;
    isWallet: boolean;
  }) {
    if (!stripe || !elements) return;

    setSubmitting(true);
    setError(null);

    try {
      const { error: submitError } = await elements.submit();
      if (submitError) {
        setError(submitError.message ?? "Please check your payment details.");
        track("checkout_payment_failed", { reason: "validation" });
        return;
      }

      const res = await fetch("/api/checkout/intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: details.email,
          firstName: details.firstName,
          lastName: details.lastName,
          billingCountry: details.billingCountry,
          billingState: details.billingState,
          billingPostalCode: details.billingPostalCode,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data.clientSecret) {
        setError(data.error ?? "We couldn't start checkout. Please try again.");
        track("checkout_payment_failed", { reason: "intent" });
        return;
      }

      // The card element is told not to collect name, email or address, so
      // those are supplied here from the fields above — which is what lets
      // email sit before the card form rather than inside it.
      //
      // Every address subfield must be present as a string. Opting out of
      // collection with `fields.billingDetails.address: "never"` makes Stripe
      // require the whole address here, and an `undefined` value counts as not
      // passed — which is an IntegrationError at confirm time, not a silent
      // omission. The fields this form deliberately does not ask for are sent
      // as empty strings, which Stripe accepts as "not collected".
      const { error: confirmError } = await stripe.confirmPayment({
        elements,
        clientSecret: data.clientSecret,
        confirmParams: {
          return_url: `${window.location.origin}/checkout/success`,
          receipt_email: details.email,
          payment_method_data: {
            billing_details: {
              name: `${details.firstName} ${details.lastName}`.trim() || undefined,
              email: details.email,
              address: {
                country: details.billingCountry,
                state: details.billingState,
                postal_code: details.billingPostalCode,
                line1: details.billingLine1 ?? "",
                line2: details.billingLine2 ?? "",
                city: details.billingCity ?? "",
              },
            },
          },
        },
      });

      // Reaching here means the payment did not complete — a success redirects.
      if (confirmError) {
        setError(
          confirmError.message ??
            "Your payment could not be completed. Please try again."
        );
        track("checkout_payment_failed", {
          reason: confirmError.code ?? "confirm",
        });
      }
    } catch {
      setError("Something went wrong. Please try again.");
      track("checkout_payment_failed", { reason: "exception" });
    } finally {
      setSubmitting(false);
    }
  }

  const canSubmit =
    !!stripe &&
    !submitting &&
    email.trim().includes("@") &&
    firstName.trim().length > 0 &&
    lastName.trim().length > 0 &&
    billingCountry.length === 2;

  return (
    <div className="w-full max-w-[430px] mx-auto px-[18px] pt-[18px] pb-10">
      {/* 1. Small Long Game logo, top-left, on white. */}
      <header className="h-[38px] flex items-center mb-4">
        <Link href="/parent-academy">
          <img src="/logo-black.png" alt="Long Game" className="h-7 w-auto" />
        </Link>
      </header>

      {/* 2. Product summary. */}
      <section className="bg-white border border-border-grey rounded-2xl shadow-[0_5px_18px_rgba(18,21,20,0.07)] p-4 mb-3">
        <div className="flex justify-between items-start gap-3">
          <div>
            <p className="font-heading text-[10px] font-extrabold tracking-[0.11em] text-teal-dark mb-1.5">
              THE PARENT ACADEMY
            </p>
            <h1 className="font-heading text-[23px] font-semibold leading-[1.08] tracking-tight mb-1">
              The Parent Academy
            </h1>
            <p className="font-body text-xs text-text-body">One-time purchase</p>
          </div>
          <p className="font-heading text-[19px] font-extrabold whitespace-nowrap">
            {priceLabel}
          </p>
        </div>

        <div className="border-t border-border-grey mt-3 pt-3 font-body text-[12.5px] leading-[1.55]">
          <p>&#10003; Complete 12-Module Parent Academy</p>
          <p className="font-semibold text-teal-dark">
            &#10003; BONUS: 12 Months of Long Game Library Access
          </p>
          <p>&#10003; Long Game Glove Box Cards</p>
        </div>

        <p className="mt-2.5 px-2.5 py-2.5 rounded-lg bg-cream font-heading text-[11.5px] font-bold text-teal-dark">
          {NO_RENEWAL_LINE}
        </p>
      </section>

      {/* 3. Apple Pay, high on the page. Renders only when the device and
             browser actually support a wallet; otherwise nothing is shown and
             the card form simply follows the summary with no gap. */}
      <div className={walletAvailable ? "mb-2.5" : ""}>
        <ExpressCheckoutElement
          options={{
            emailRequired: true,
            billingAddressRequired: true,
            buttonHeight: 52,
          }}
          onReady={({ availablePaymentMethods }) => {
            const available = !!availablePaymentMethods;
            setWalletAvailable(available);
            if (available) track("checkout_wallet_available");
          }}
          onConfirm={async (event) => {
            track("checkout_applepay_selected");
            const address = event.billingDetails?.address;
            const name = event.billingDetails?.name ?? "";
            const [walletFirst, ...walletRest] = name.trim().split(" ");

            await pay({
              email: event.billingDetails?.email ?? email,
              firstName: firstName || walletFirst || "",
              lastName: lastName || walletRest.join(" ") || "",
              billingCountry: address?.country ?? billingCountry,
              billingState: address?.state ?? billingState,
              billingPostalCode: address?.postal_code ?? billingPostalCode,
              billingLine1: address?.line1 ?? "",
              billingLine2: address?.line2 ?? "",
              billingCity: address?.city ?? "",
              isWallet: true,
            });
          }}
        />
      </div>

      {/* 4. Divider. */}
      {walletAvailable && (
        <div className="flex items-center gap-2.5 text-text-muted font-body text-[11px] mb-3">
          <span className="h-px bg-border-grey flex-1" />
          OR PAY WITH CARD
          <span className="h-px bg-border-grey flex-1" />
        </div>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          track("checkout_card_selected");
          void pay({
            email,
            firstName,
            lastName,
            billingCountry,
            billingState,
            billingPostalCode,
            isWallet: false,
          });
        }}
      >
        {/* 5 & 6. Email before any card details, then name. */}
        <section className="bg-white border border-border-grey rounded-2xl shadow-[0_5px_18px_rgba(18,21,20,0.07)] p-4 mb-3">
          <p className="font-heading text-[11px] font-extrabold tracking-[0.08em] mb-3">
            YOUR INFORMATION
          </p>

          <label htmlFor="email" className="block font-heading text-xs font-bold mb-1.5">
            Email address
          </label>
          <input
            id="email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={(e) => captureEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full h-[47px] border border-[#D5DAD7] rounded-[9px] px-3 font-body text-sm mb-1.5 focus:outline-none focus:border-teal"
          />
          <p className="font-body text-[10.5px] text-text-muted leading-snug mb-3">
            Used for your receipt, account access and important purchase-related
            emails.
          </p>

          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <label htmlFor="firstName" className="block font-heading text-xs font-bold mb-1.5">
                First name
              </label>
              <input
                id="firstName"
                required
                autoComplete="given-name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First name"
                className="w-full h-[47px] border border-[#D5DAD7] rounded-[9px] px-3 font-body text-sm focus:outline-none focus:border-teal"
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block font-heading text-xs font-bold mb-1.5">
                Last name
              </label>
              <input
                id="lastName"
                required
                autoComplete="family-name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last name"
                className="w-full h-[47px] border border-[#D5DAD7] rounded-[9px] px-3 font-body text-sm focus:outline-none focus:border-teal"
              />
            </div>
          </div>
        </section>

        {/* 7. Stripe-hosted card fields. Card data never touches our servers. */}
        <section className="bg-white border border-border-grey rounded-2xl shadow-[0_5px_18px_rgba(18,21,20,0.07)] p-4 mb-3">
          <p className="font-heading text-[11px] font-extrabold tracking-[0.08em] mb-3">
            CARD INFORMATION
          </p>
          <PaymentElement
            options={{
              layout: "tabs",
              // Name, email and billing address are collected in the fields
              // above, so the card section stays just the card.
              fields: {
                billingDetails: {
                  name: "never",
                  email: "never",
                  address: "never",
                },
              },
            }}
          />
        </section>

        {/* Billing location — only what payment verification and tax need. */}
        <section className="bg-white border border-border-grey rounded-2xl shadow-[0_5px_18px_rgba(18,21,20,0.07)] p-4 mb-3">
          <p className="font-heading text-[11px] font-extrabold tracking-[0.08em] mb-3">
            BILLING LOCATION
          </p>

          <label htmlFor="country" className="block font-heading text-xs font-bold mb-1.5">
            Country
          </label>
          <select
            id="country"
            required
            value={billingCountry}
            onChange={(e) => setBillingCountry(e.target.value)}
            onBlur={refreshQuote}
            className="w-full h-[47px] border border-[#D5DAD7] rounded-[9px] px-3 font-body text-sm mb-3 bg-white focus:outline-none focus:border-teal"
          >
            {/* Every value is a real ISO 3166-1 alpha-2 code, because this is
                sent to Stripe verbatim as billing_details.address.country. The
                six selling countries stay at the top; the full list replaces
                the old "Other" option, which Stripe rejected outright. */}
            <option value="">Select country</option>
            <optgroup label="Common">
              {PRIORITY_COUNTRIES.map((country) => (
                <option key={`priority-${country.code}`} value={country.code}>
                  {country.name}
                </option>
              ))}
            </optgroup>
            <optgroup label="All countries">
              {COUNTRIES.map((country) => (
                <option key={country.code} value={country.code}>
                  {country.name}
                </option>
              ))}
            </optgroup>
          </select>

          <label htmlFor="state" className="block font-heading text-xs font-bold mb-1.5">
            Province / State
          </label>
          <input
            id="state"
            value={billingState}
            onChange={(e) => setBillingState(e.target.value)}
            onBlur={refreshQuote}
            placeholder="Province / State"
            className="w-full h-[47px] border border-[#D5DAD7] rounded-[9px] px-3 font-body text-sm mb-3 focus:outline-none focus:border-teal"
          />

          <label htmlFor="postal" className="block font-heading text-xs font-bold mb-1.5">
            Postal / ZIP Code
          </label>
          <input
            id="postal"
            value={billingPostalCode}
            onChange={(e) => setBillingPostalCode(e.target.value)}
            onBlur={refreshQuote}
            placeholder="Postal / ZIP Code"
            className="w-full h-[47px] border border-[#D5DAD7] rounded-[9px] px-3 font-body text-sm mb-1.5 focus:outline-none focus:border-teal"
          />
          <p className="font-body text-[10.5px] text-text-muted leading-snug">
            Used for payment verification and applicable tax. No street address,
            city or phone unless required.
          </p>
        </section>

        {/* 8 & 9. Order summary and the primary CTA. */}
        <section className="bg-white border border-border-grey rounded-2xl shadow-[0_5px_18px_rgba(18,21,20,0.07)] p-4">
          <p className="font-heading text-[11px] font-extrabold tracking-[0.08em] mb-3">
            ORDER SUMMARY
          </p>

          <div className="flex justify-between font-body text-[12.5px] py-1.5">
            <span>The Parent Academy</span>
            <strong>{formatAmount(quote.productAmount, currency)}</strong>
          </div>

          {/* Only rendered when tax is actually being collected. There is no
              zero row and no "calculated when required" placeholder. */}
          {quote.taxAmount > 0 && (
            <div className="flex justify-between font-body text-[12.5px] py-1.5">
              <span>{quote.taxLabel ?? "Tax"}</span>
              <strong>{formatAmount(quote.taxAmount, currency)}</strong>
            </div>
          )}

          <div className="flex justify-between border-t border-border-grey mt-1.5 pt-3 font-heading text-base font-extrabold">
            <span>Total</span>
            <span>{formatAmount(quote.totalAmount, currency)}</span>
          </div>

          {error && (
            <p
              role="alert"
              className="font-body text-[12.5px] text-[#B42318] bg-[#FEF3F2] border border-[#FDA29B] rounded-lg px-3 py-2.5 mt-3"
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={!canSubmit}
            className="w-full h-[51px] rounded-[10px] bg-teal text-white font-heading font-extrabold text-[15px] mt-3 hover:bg-teal-dark transition-colors disabled:opacity-60"
          >
            {submitting
              ? "Processing…"
              : `Complete Purchase — ${formatAmount(quote.totalAmount, currency)}`}
          </button>

          <p className="text-center font-body text-[10.5px] text-text-muted leading-relaxed mt-3.5">
            Secure payment powered by Stripe
            <br />
            One-time payment &middot; No automatic renewal
          </p>
        </section>
      </form>

      {/* 10. Trust and guarantee. */}
      <section className="bg-cream border border-border-grey rounded-[13px] p-3.5 mt-3">
        <p className="font-heading text-xs font-bold text-teal-dark">
          {GUARANTEE_TITLE.toUpperCase()}
        </p>
        <p className="font-body text-[10.8px] text-text-body leading-snug mt-1">
          {GUARANTEE_SENTENCE}
        </p>
      </section>

      <div className="text-center font-body text-[10.5px] text-text-muted leading-relaxed mt-3.5">
        <p>Secure checkout &middot; Immediate access</p>
        <p>
          Questions?{" "}
          <a href={`mailto:${SUPPORT_EMAIL}`} className="text-teal-dark underline">
            {SUPPORT_EMAIL}
          </a>
        </p>
        <p className="mt-1.5">
          <Link href="/terms" className="underline hover:text-charcoal">
            Terms
          </Link>
          {" · "}
          <Link href="/privacy" className="underline hover:text-charcoal">
            Privacy Policy
          </Link>
          {" · "}
          <Link href="/terms#refunds" className="underline hover:text-charcoal">
            Refund &amp; Guarantee Terms
          </Link>
        </p>
      </div>
    </div>
  );
}
