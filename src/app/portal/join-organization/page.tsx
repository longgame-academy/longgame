"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function JoinOrganizationPage() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setError("");

    const res = await fetch("/api/org/redeem", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code }),
    });

    const data = await res.json();

    if (!res.ok) {
      setStatus("error");
      setError(data.error || "Something went wrong");
      return;
    }

    router.push("/portal");
    router.refresh();
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="max-w-md mx-auto"
    >
      <h1 className="font-heading text-3xl font-bold mb-3">
        Join Your Organization
      </h1>
      <p className="font-body text-text-body mb-8">
        Enter the code your organization shared with you to unlock your
        access.
      </p>

      <form
        onSubmit={handleSubmit}
        className="bg-cream/60 border border-border-grey rounded-2xl p-6 shadow-[0_4px_16px_rgba(18,21,20,0.08)]"
      >
        <label className="block font-heading text-sm font-medium mb-2">
          Organization Code
        </label>
        <input
          required
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase())}
          placeholder="XXXXXXXX"
          className="w-full border border-charcoal/20 rounded-lg px-4 py-3 font-heading tracking-widest text-center bg-cream mb-4"
        />

        {status === "error" && (
          <p className="text-red-600 text-sm font-body mb-4 text-center">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full bg-gold text-charcoal font-heading font-semibold px-6 py-3 rounded-full hover:bg-gold-light transition-colors disabled:opacity-60"
        >
          {status === "loading" ? "Verifying..." : "Unlock Access"}
        </button>
      </form>
    </motion.div>
  );
}


