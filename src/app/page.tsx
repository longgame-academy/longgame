"use client";

import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen bg-cream text-charcoal">
      <Nav />

      {/* HERO */}
      <section className="max-w-7xl mx-auto w-full px-6 py-20 md:py-28 grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <p className="font-heading text-gold text-sm font-semibold tracking-widest uppercase mb-4">
            For Sports Parents
          </p>
          <h1 className="font-heading text-4xl md:text-6xl font-bold leading-tight mb-6">
            The game will end.
            <br />
            The relationship won&apos;t.
          </h1>
          <p className="font-body text-lg text-charcoal/70 max-w-md mb-10">
            A simple reminder that the moments you create today will last far
            longer than the final score.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/parent-academy"
              className="inline-flex items-center gap-2 bg-gold text-charcoal font-heading font-semibold px-6 py-3 rounded-full hover:bg-gold-light transition-colors"
            >
              Explore the Parent Academy
              <span aria-hidden>→</span>
            </Link>
            <Link
              href="/free-guide"
              className="inline-flex items-center gap-2 border border-gold text-charcoal font-heading font-semibold px-6 py-3 rounded-full hover:bg-gold/10 transition-colors"
            >
              Start With the Free Guide
              <span aria-hidden>→</span>
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
          className="relative flex justify-center md:justify-end"
        >
          <div className="relative w-full max-w-sm aspect-[4/5] rounded-lg overflow-hidden shadow-2xl rotate-2 bg-ink flex flex-col items-center justify-center text-cream p-8">
            <p className="font-heading font-bold text-2xl tracking-wide mb-2">LONG GAME</p>
            <p className="font-heading text-xs tracking-widest text-cream/60 mb-1">THE GAME WILL END.</p>
            <p className="font-heading text-xs tracking-widest text-cream/60 mb-6">THE RELATIONSHIP WON&apos;T.</p>
            <span className="font-heading text-xs tracking-widest border border-gold text-gold rounded-full px-4 py-1">
              PARENT GUIDE
            </span>
          </div>
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}