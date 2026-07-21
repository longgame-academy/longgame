"use client";

import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

export default function OurStoryPage() {
  return (
    <main className="flex flex-col min-h-screen bg-cream text-charcoal">
      <Nav />

      <section className="max-w-4xl mx-auto w-full px-6 py-20 md:py-24">
        <p className="font-heading text-gold text-sm font-semibold tracking-widest uppercase mb-4 text-center">
          Our Story
        </p>
        <h1 className="font-heading text-4xl md:text-5xl font-bold leading-tight mb-10 text-center">
          Why Long Game Exists
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="bg-ink text-cream rounded-2xl aspect-[16/9] flex items-center justify-center mb-14"
        >
          <p className="font-heading text-cream/40 text-sm tracking-widest uppercase">
            Photo Placeholder
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          className="font-body text-lg text-charcoal/80 leading-relaxed space-y-6 max-w-2xl mx-auto"
        >
          <p>
            Youth sports today looks nothing like it did a generation ago.
            The pressure is higher, the pathways are more competitive, and
            the noise around every game is louder than ever.
          </p>
          <p>
            Long Game was built for the parents standing on the sideline of
            all of it &mdash; not to make them better coaches, but to help
            them stay present as parents, no matter what the scoreboard
            says.
          </p>
          <p>
            Every module, every resource, every tool in this system exists
            for one reason: the game will end, but the relationship
            doesn&apos;t have to.
          </p>
        </motion.div>

        <div className="text-center mt-14">
          <Link
            href="/parent-academy"
            className="inline-flex items-center gap-2 bg-gold text-charcoal font-heading font-semibold px-8 py-3 rounded-full hover:bg-gold-light transition-colors"
          >
            Explore the Parent Academy
            <span aria-hidden>→</span>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}