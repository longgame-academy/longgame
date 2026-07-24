"use client";

import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import FreeGuideForm from "@/components/FreeGuideForm";
import { motion } from "framer-motion";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7, ease: "easeOut" },
} as const;

export default function FreeGuidePage() {
  return (
    <main className="flex flex-col min-h-screen bg-white text-charcoal">
      <Nav />

      {/* SECTION 1 - HERO */}
      <section className="bg-cream w-full">
        <div className="max-w-6xl mx-auto w-full px-6 py-20 md:py-28 grid md:grid-cols-2 gap-12 items-center">
          <motion.div {...fadeUp}>
            <h1 className="font-heading text-4xl md:text-5xl font-bold leading-tight mb-6">
              The Car Ride Home
            </h1>
            <p className="font-body text-lg text-text-body mb-4">
              One of the most important conversations in youth sports doesn&apos;t
              happen during the game.
            </p>
            <p className="font-body text-lg text-text-body mb-4">
              It happens on the drive home.
            </p>
            <p className="font-body text-lg text-text-body mb-8">
              Download this free guide and discover simple ways to make those
              conversations more meaningful&mdash;for both you and your athlete.
            </p>
            <a
              href="#download"
              className="inline-block bg-charcoal text-white font-heading font-semibold px-8 py-4 rounded-lg hover:bg-charcoal/90 transition-colors"
            >
              Download Your Free Guide
            </a>
          </motion.div>

          <motion.div
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.15 }}
            className="aspect-[3/4] max-w-sm mx-auto w-full rounded-2xl border border-charcoal/15 bg-white flex items-center justify-center"
          >
            <span className="font-heading text-sm tracking-widest uppercase text-charcoal/40">
              Guide Cover Placeholder
            </span>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2 - WHAT'S INSIDE */}
      <section className="bg-white w-full">
        <div className="max-w-6xl mx-auto w-full px-6 py-20 md:py-28 grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            {...fadeUp}
            className="aspect-[4/3] rounded-2xl border border-charcoal/15 bg-cream flex items-center justify-center order-2 md:order-1"
          >
            <span className="font-heading text-sm tracking-widest uppercase text-charcoal/40">
              Guide Image Placeholder
            </span>
          </motion.div>

          <motion.div {...fadeUp} className="order-1 md:order-2">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
              What&apos;s Inside
            </h2>
            <p className="font-body text-lg text-text-body mb-4">
              Inside this guide you&apos;ll discover practical ideas for
              navigating the conversations that happen after great games,
              difficult games, disappointing performances, and everything in
              between.
            </p>
            <p className="font-body text-lg text-text-body">
              You&apos;ll also learn simple questions that build confidence,
              what to avoid saying in emotional moments, and why the car ride
              home can shape an athlete long after the final whistle.
            </p>
          </motion.div>
        </div>
      </section>

      {/* SECTION 3 - GUIDE PREVIEW */}
      <section className="bg-cream w-full">
        <div className="max-w-6xl mx-auto w-full px-6 py-20 md:py-28">
          <motion.div {...fadeUp} className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              A Preview Inside
            </h2>
            <p className="font-body text-lg text-text-body">
              Professionally designed.
              <br />
              Immediately practical.
              <br />
              Ready to use today.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((n) => (
              <motion.div
                key={n}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: n * 0.08 }}
                className="aspect-[3/4] rounded-xl border border-charcoal/15 bg-white flex items-center justify-center"
              >
                <span className="font-heading text-xs tracking-widest uppercase text-charcoal/40">
                  Page {n}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4 - DOWNLOAD */}
      <section id="download" className="bg-white w-full">
        <div className="max-w-2xl mx-auto w-full px-6 py-20 md:py-28 text-center">
          <motion.div {...fadeUp}>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Ready to Read?
            </h2>
            <p className="font-body text-lg text-text-body mb-10">
              Enter your email below and we&apos;ll send The Car Ride Home
              directly to your inbox.
            </p>
          </motion.div>

          <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.1 }}>
            <FreeGuideForm />
          </motion.div>

          <p className="font-body text-sm text-charcoal/50 mt-8">
            We respect your inbox. No spam. Just practical resources and
            occasional updates from Long Game.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}




