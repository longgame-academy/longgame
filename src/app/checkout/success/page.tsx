"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function CheckoutSuccessPage() {
  const router = useRouter();
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let attempts = 0;
    const maxAttempts = 10;

    const poll = async () => {
      const res = await fetch("/api/checkout/status");
      const data = await res.json();

      if (data.enrolled) {
        router.push("/portal");
        return;
      }

      attempts++;
      if (attempts >= maxAttempts) {
        setFailed(true);
        return;
      }

      setTimeout(poll, 1000);
    };

    poll();
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-cream">
      <div className="text-center font-body">
        {failed ? (
          <>
            <p className="text-charcoal mb-2">
              Still finalizing your access — this can take a minute.
            </p>
            <button
              onClick={() => router.push("/portal")}
              className="text-gold underline"
            >
              Try the portal now
            </button>
          </>
        ) : (
          <p className="text-charcoal">Confirming your payment...</p>
        )}
      </div>
    </div>
  );
}