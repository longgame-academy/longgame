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

  function handleClick() {
    if (enrolled) {
      router.push("/portal");
      return;
    }

    // Checkout is guest checkout: email and name are collected on the page
    // itself and the account is created or linked from the paid order. Sending
    // people to sign up first only added a step before the purchase.
    setLoading(true);
    router.push("/checkout");
  }

  return (
    <button
      onClick={handleClick}
      disabled={loading || !checked}
      className={className}
    >
      {loading ? "Redirecting..." : enrolled ? "Go to Portal →" : "Enroll in the Parent Academy →"}
    </button>
  );
}