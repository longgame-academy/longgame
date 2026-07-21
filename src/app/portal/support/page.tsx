import { motion } from "framer-motion";

export default function SupportPage() {
  return (
    <div className="max-w-2xl">
      <h1 className="font-heading text-3xl font-bold mb-3">Support</h1>
      <p className="font-body text-text-body mb-8">
        Have a question about your account or the Parent Development System?
        We&apos;re here to help.
      </p>

      <a
        href="mailto:hello@longgameacademy.com"
        className="inline-flex items-center gap-2 bg-gold text-charcoal font-heading font-semibold px-8 py-3 rounded-full hover:bg-gold-light transition-colors"
      >
        hello@longgameacademy.com
      </a>
    </div>
  );
}


