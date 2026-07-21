"use client";

import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import FreeGuideForm from "@/components/FreeGuideForm";
import { motion } from "framer-motion";

export default function FreeGuidePage() {
  return (
    <main className="flex flex-col min-h-screen bg-background text-charcoal">
      <Nav />

      <section className="max-w-6xl mx-auto w-full px-6 py-20 md:py-24 grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <p className="font-heading text-gold text-sm font-semibold tracking-widest uppercase mb-4">
            Free Resource
          </p>
          <h1 className="font-heading text-4xl md:text-5xl font-bold leading-tight mb-6">
            Start with the Free Guide.
          </h1>
          <p className="font-body text-lg text-charcoal/70 mb-8">
            A short, practical introduction to the Long Game philosophy &mdash;
            built to help you show up for your athlete with more patience and
            perspective, starting today.
          </p>
          <ul className="space-y-3 font-body text-charcoal/70">
            <li className="flex items-start gap-3">
              <span className="text-gold mt-1">✓</span>
              Delivered straight to your inbox
            </li>
            <li className="flex items-start gap-3">
              <span className="text-gold mt-1">✓</span>
              No cost, no obligation
            </li>
            <li className="flex items-start gap-3">
              <span className="text-gold mt-1">✓</span>
              Unsubscribe anytime
            </li>
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
        >
          <FreeGuideForm />
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}