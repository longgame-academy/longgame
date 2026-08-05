"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { formatAmount } from "@/lib/pricing";
import { NO_RENEWAL_LINE, SUPPORT_EMAIL } from "@/lib/legal";
import { track } from "@/lib/analytics";

type Confirmation = {
  ready: boolean;
  status?: string;
  orderNumber?: string;
  amount?: number;
  currency?: string;
  email?: string;
  libraryExpiresAt?: string | null;
};

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={<Waiting />}>
      <SuccessInner />
    </Suspense>
  );
}

/**
 * Reports what the webhook has already done. This page never grants anything —
 * if the customer closes the tab the moment they pay, the webhook still lands
 * and their access is identical.
 */
function SuccessInner() {
  const params = useSearchParams();
  const intentId = params.get("payment_intent");
  const clientSecret = params.get("payment_intent_client_secret");

  const [confirmation, setConfirmation] = useState<Confirmation | null>(null);
  const [slow, setSlow] = useState(false);
  const tracked = useRef(false);

  useEffect(() => {
    if (!intentId || !clientSecret) {
      setSlow(true);
      return;
    }

    let cancelled = false;
    let timer: ReturnType<typeof setTimeout>;
    let attempts = 0;
    const maxAttempts = 15;

    const poll = async () => {
      if (cancelled) return;

      try {
        const res = await fetch(
          `/api/checkout/confirmation?payment_intent=${encodeURIComponent(intentId)}` +
            `&payment_intent_client_secret=${encodeURIComponent(clientSecret)}`,
          { cache: "no-store" }
        );
        const data: Confirmation = res.ok ? await res.json() : { ready: false };

        if (cancelled) return;

        if (data.ready) {
          setConfirmation(data);
          if (!tracked.current) {
            tracked.current = true;
            track("checkout_payment_succeeded", { currency: data.currency });
          }
          return;
        }
      } catch {
        // Fall through to the retry rather than stalling on a network blip.
      }

      attempts++;
      if (attempts >= maxAttempts) {
        setSlow(true);
        return;
      }
      timer = setTimeout(poll, Math.min(1000 * attempts, 4000));
    };

    void poll();

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [intentId, clientSecret]);

  if (!confirmation) return <Waiting slow={slow} />;

  const expiry = confirmation.libraryExpiresAt
    ? new Intl.DateTimeFormat("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: "UTC",
      }).format(new Date(confirmation.libraryExpiresAt))
    : null;

  return (
    <main className="min-h-screen bg-white">
      <div className="w-full max-w-[430px] mx-auto px-[18px] pt-[18px] pb-12">
        <header className="h-[38px] flex items-center mb-4">
          <img src="/logo-black.png" alt="Long Game" className="h-7 w-auto" />
        </header>

        <section className="bg-white border border-border-grey rounded-2xl shadow-[0_5px_18px_rgba(18,21,20,0.07)] p-5 mb-3">
          <p className="font-heading text-[10px] font-extrabold tracking-[0.11em] text-teal-dark mb-1.5">
            PURCHASE CONFIRMED
          </p>
          <h1 className="font-heading text-[23px] font-semibold leading-[1.08] tracking-tight mb-2">
            Your Parent Academy is ready.
          </h1>
          <p className="font-body text-[13px] text-text-body leading-relaxed">
            All 12 modules are unlocked. Sign in with
            {confirmation.email ? ` ${confirmation.email}` : " your email address"}{" "}
            to start whenever you&apos;re ready.
          </p>

          {confirmation.orderNumber && (
            <p className="font-body text-xs text-text-muted mt-3">
              Order {confirmation.orderNumber}
              {confirmation.amount && confirmation.currency
                ? ` · ${formatAmount(confirmation.amount, confirmation.currency)}`
                : ""}
            </p>
          )}

          <Link
            href="/portal"
            className="flex items-center justify-center w-full h-[51px] rounded-[10px] bg-teal text-white font-heading font-extrabold text-[15px] mt-4 hover:bg-teal-dark transition-colors"
          >
            Go to the Parent Academy &rarr;
          </Link>
        </section>

        <section className="bg-cream border border-border-grey rounded-2xl p-4 mb-3">
          <p className="font-heading text-xs font-bold text-teal-dark mb-1">
            BONUS: 12 MONTHS OF LONG GAME LIBRARY ACCESS
          </p>
          {expiry ? (
            <p className="font-body text-[12.5px] text-text-body leading-relaxed">
              Your bonus Library access runs through{" "}
              <strong className="text-charcoal">{expiry}</strong>. Every Field
              Guide, Practical Tool and new parent resource added before then is
              included at no additional cost.
            </p>
          ) : (
            <p className="font-body text-[12.5px] text-text-body leading-relaxed">
              Your 12 months of bonus Library access have started. The exact date
              it runs through is in your receipt email.
            </p>
          )}
        </section>

        <section className="bg-white border border-border-grey rounded-2xl p-4">
          <p className="font-heading text-[12px] font-bold text-charcoal mb-1">
            {NO_RENEWAL_LINE}
          </p>
          <p className="font-body text-[11.5px] text-text-body leading-relaxed">
            This was a one-time payment. You will not be charged again, and
            nothing renews automatically.
          </p>
        </section>

        <p className="text-center font-body text-[10.5px] text-text-muted leading-relaxed mt-3.5">
          A receipt is on its way to your inbox.
          <br />
          Questions?{" "}
          <a href={`mailto:${SUPPORT_EMAIL}`} className="text-teal-dark underline">
            {SUPPORT_EMAIL}
          </a>
        </p>
      </div>
    </main>
  );
}

function Waiting({ slow = false }: { slow?: boolean }) {
  return (
    <main className="min-h-screen flex items-center justify-center bg-white px-6">
      <div className="text-center font-body max-w-sm">
        {slow ? (
          <>
            <p className="text-charcoal mb-2">
              Your payment went through. We&apos;re still finalising your access
              &mdash; this can take a minute, and nothing further is needed from
              you.
            </p>
            <p className="font-body text-[12.5px] text-text-muted mb-5">
              Your receipt email will confirm everything. If it hasn&apos;t
              arrived shortly, contact {SUPPORT_EMAIL}.
            </p>
            <Link
              href="/portal"
              className="inline-flex items-center gap-2 bg-ink text-cream font-heading font-semibold px-6 py-3 rounded-lg hover:bg-charcoal transition-colors"
            >
              Go to the Parent Academy &rarr;
            </Link>
          </>
        ) : (
          <p className="text-charcoal">Confirming your payment&hellip;</p>
        )}
      </div>
    </main>
  );
}
