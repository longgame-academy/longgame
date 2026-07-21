"use client";

import { useState } from "react";

export default function FreeGuideForm() {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">(
    "idle"
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, email, consent }),
      });

      if (!res.ok) throw new Error();
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="bg-white/70 border border-gold rounded-2xl p-8 text-center">
        <h3 className="font-heading text-xl font-semibold mb-2">
          Check your inbox
        </h3>
        <p className="font-body text-charcoal/70">
          Your Free Guide is on its way to {email}.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white/70 border border-charcoal/10 rounded-2xl p-8 max-w-md mx-auto"
    >
      <div className="mb-5">
        <label className="block font-heading text-sm font-medium mb-2">
          First Name
        </label>
        <input
          type="text"
          required
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="w-full border border-charcoal/20 rounded-lg px-4 py-3 font-body bg-cream focus:outline-none focus:border-gold"
          placeholder="Your first name"
        />
      </div>

      <div className="mb-5">
        <label className="block font-heading text-sm font-medium mb-2">
          Email
        </label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-charcoal/20 rounded-lg px-4 py-3 font-body bg-cream focus:outline-none focus:border-gold"
          placeholder="you@example.com"
        />
      </div>

      <label className="flex items-start gap-3 mb-6 cursor-pointer">
        <input
          type="checkbox"
          required
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-1"
        />
        <span className="font-body text-sm text-charcoal/70">
          I agree to receive the Free Guide and occasional emails from Long
          Game. Unsubscribe anytime.
        </span>
      </label>

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full bg-gold text-charcoal font-heading font-semibold px-6 py-3 rounded-full hover:bg-gold-light transition-colors disabled:opacity-60"
      >
        {status === "loading" ? "Sending..." : "Send Me the Free Guide"}
      </button>

      {status === "error" && (
        <p className="text-red-600 text-sm font-body mt-4 text-center">
          Something went wrong. Please try again.
        </p>
      )}
    </form>
  );
}