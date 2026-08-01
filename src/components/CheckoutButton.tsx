"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export function CheckoutButton({ className }: { className?: string }) {
  const { isSignedIn } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [enrolled, setEnrolled] = useState(false);
  const [checked, setChecked] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isSignedIn) {
      setChecked(true);
      return;
    }
    fetch("/api/checkout/status")
      .then((res) => res.json())
      .then((data) => setEnrolled(!!data.enrolled))
      .catch(() => {})
      .finally(() => setChecked(true));
  }, [isSignedIn]);

  async function handleClick() {
    if (enrolled) {
      router.push("/portal");
      return;
    }

    if (!isSignedIn) {
      router.push("/sign-up");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/checkout", { method: "POST" });
      const data = await res.json().catch(() => ({}));

      if (res.ok && data.url) {
        window.location.href = data.url;
        return;
      }

      // Previously any non-200 (rate limit, Stripe outage) just reset the
      // button, so the user clicked into silence on the one path that earns
      // revenue.
      setError(
        res.status === 429
          ? "Too many attempts. Please wait a moment and try again."
          : "We couldn't start checkout. Please try again."
      );
    } catch {
      setError("We couldn't start checkout. Please check your connection.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button
        onClick={handleClick}
        disabled={loading || !checked}
        className={className}
      >
        {loading ? "Redirecting..." : enrolled ? "Go to Portal →" : "Enroll in the Parent Academy →"}
      </button>
      {error && (
        <p className="font-body text-sm text-red-600 mt-3" role="alert">
          {error}
        </p>
      )}
    </>
  );
}