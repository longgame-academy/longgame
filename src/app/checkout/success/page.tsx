"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function CheckoutSuccessPage() {
  const router = useRouter();
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let attempts = 0;
    let timer: ReturnType<typeof setTimeout>;
    let cancelled = false;
    const maxAttempts = 15;

    const poll = async () => {
      if (cancelled) return;

      try {
        const res = await fetch("/api/checkout/status", { cache: "no-store" });
        const data = res.ok ? await res.json() : {};

        if (cancelled) return;

        if (data.enrolled) {
          router.push("/portal");
          return;
        }
      } catch {
        // A transient network error used to reject inside this async loop and
        // leave the user on "Confirming your payment..." forever. Fall through
        // to the retry instead.
      }

      attempts++;
      if (attempts >= maxAttempts) {
        setFailed(true);
        return;
      }

      // Back off so a slow webhook doesn't get hammered with 1s polls.
      timer = setTimeout(poll, Math.min(1000 * attempts, 4000));
    };

    poll();

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center font-body">
        {failed ? (
          <>
            <p className="text-charcoal mb-2">
              Still finalizing your access — this can take a minute.
            </p>
            <button
              onClick={() => router.push("/portal")}
              className="mt-4 inline-flex items-center gap-2 bg-ink text-cream font-heading font-semibold px-6 py-3 rounded-full hover:bg-charcoal transition-colors"
            >
              Try the Portal Now
            </button>
          </>
        ) : (
          <p className="text-charcoal">Confirming your payment...</p>
        )}
      </div>
    </div>
  );
}
