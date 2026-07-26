"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";

const columns = [
  {
    heading: "Parent Academy",
    links: [
      { label: "Parent Academy", href: "/parent-academy" },
      { label: "Organizations", href: "/organizations" },
      { label: "Our Story", href: "/our-story" },
      { label: "The Book", href: "/our-story" },
      { label: "Free Guide", href: "/free-guide" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Research & Evidence", href: "/research-evidence" },
      { label: "FAQ", href: "/faq" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    heading: "Partner With Us",
    links: [
      { label: "Become a Long Game Partner", href: "/contact" },
      { label: "Speaking & Workshops", href: "/contact" },
      { label: "Organization Licensing", href: "/contact" },
    ],
  },
  {
    heading: "More",
    links: [
      { label: "Gift the Parent Academy", href: "/contact" },
      { label: "Leave a Review", href: "/contact" },
    ],
  },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "footer" }),
      });
      if (!res.ok) throw new Error();
      setStatus("done");
      setEmail("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="mt-auto bg-ink text-cream"
    >
      <div className="max-w-4xl mx-auto px-6 pt-16 pb-10 text-center">
        <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Stay Connected</h2>
        <p className="font-body text-cream/70 leading-relaxed mb-8 max-w-xl mx-auto">
          Get practical advice, new resources, research, and parenting
          insights delivered a few times each month. No spam. Just helpful
          guidance for sports families.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email Address"
            className="flex-1 bg-transparent border border-cream/30 rounded-lg px-5 py-3 font-body text-sm text-cream placeholder:text-cream/40 focus:outline-none focus:border-teal"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="bg-cream text-ink font-heading font-semibold px-6 py-3 rounded-lg hover:bg-cream/90 transition-colors disabled:opacity-60"
          >
            {status === "loading" ? "Sending..." : status === "done" ? "Thank You" : "Stay Connected"}
          </button>
        </form>
      </div>

      <div className="border-t border-cream/10">
        <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-2 md:grid-cols-4 gap-10">
          {columns.map((col) => (
            <div key={col.heading}>
              <p className="font-heading text-xs font-semibold tracking-widest uppercase text-cream/50 mb-5">
                {col.heading}
              </p>
              <ul className="space-y-3 font-body text-sm">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="hover:text-teal transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-10 flex gap-3">
        <a href="#" aria-label="Instagram" className="w-9 h-9 rounded-full border border-cream/20 flex items-center justify-center hover:border-teal hover:text-teal transition-colors">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
            <rect x="2" y="2" width="20" height="20" rx="5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
          </svg>
        </a>
        <a href="#" aria-label="Facebook" className="w-9 h-9 rounded-full border border-cream/20 flex items-center justify-center hover:border-teal hover:text-teal transition-colors">
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
            <path d="M13.5 21v-8h2.7l.4-3.2h-3.1V7.7c0-.9.3-1.6 1.6-1.6h1.7V3.2C15.9 3.1 14.9 3 13.7 3c-2.5 0-4.2 1.5-4.2 4.3v2.5H6.8v3.2h2.7v8h4z" />
          </svg>
        </a>
        <a href="#" aria-label="LinkedIn" className="w-9 h-9 rounded-full border border-cream/20 flex items-center justify-center hover:border-teal hover:text-teal transition-colors">
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
            <path d="M6.5 8.5H3V21h3.5V8.5zM4.75 7A2 2 0 1 0 4.75 3a2 2 0 0 0 0 4zM21 21v-6.9c0-3.7-2-5.4-4.6-5.4-2.1 0-3.1 1.2-3.6 2v-1.7H9.3c.05 1 0 12 0 12h3.5v-6.7c0-.36.03-.72.13-1 .29-.72.95-1.47 2.05-1.47 1.45 0 2.02 1.1 2.02 2.72V21H21z" />
          </svg>
        </a>
      </div>

      <div className="border-t border-cream/10">
        <div className="max-w-4xl mx-auto px-6 py-12 flex flex-col items-center text-center gap-4">
          <img src="/logo-white.png" alt="Long Game" className="h-14 w-auto" />
          <p className="font-heading font-semibold text-lg leading-snug">
            The Game Will End.
            <br />
            The Relationship Won&apos;t.
          </p>
          <p className="font-body text-xs text-cream/50">
            © 2026 Long Game Academy. All Rights Reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-[11px] font-body text-cream/40">
            <Link href="/privacy" className="hover:text-cream/70 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-cream/70 transition-colors">Terms of Service</Link>
            <Link href="/cookies" className="hover:text-cream/70 transition-colors">Cookie Policy</Link>
            <Link href="/disclaimer" className="hover:text-cream/70 transition-colors">Disclaimer</Link>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}