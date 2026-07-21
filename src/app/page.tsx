"use client";

import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

const stats = [
  { value: "12", label: "Core Modules" },
  { value: "1,000+", label: "Parents Reached" },
  { value: "35+", label: "Years Combined Coaching Experience" },
  { value: "4.9", label: "Average Rating" },
];

const pillars = [
  {
    label: "The System",
    title: "12 Core Modules",
    body: "Sequential, video-guided lessons built around confidence, communication, and identity through the pressures of modern youth sports.",
  },
  {
    label: "The Reference",
    title: "Field Guides",
    body: "Focused material to revisit before big moments, tryouts, tough conversations, and setbacks.",
  },
  {
    label: "The Practice",
    title: "Practical Tools",
    body: "Downloadable worksheets and conversation starters you bring straight into everyday life with your athlete.",
  },
];

const faqPreview = [
  {
    q: "How do I access the content after purchasing?",
    a: "You get instant access to your portal right after checkout, every module, Field Guide, and Tool included.",
  },
  {
    q: "Can I access this on my phone?",
    a: "Yes, the portal works fully on mobile, tablet, and desktop.",
  },
  {
    q: "My organization gave me a code, how do I use it?",
    a: "Enter it during sign up. It links your account to your organization's access at no extra cost.",
  },
];

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen bg-background text-charcoal">
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
              className="inline-flex items-center gap-2 border border-charcoal/20 text-charcoal font-heading font-semibold px-6 py-3 rounded-full hover:border-gold hover:text-gold transition-colors"
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

      {/* STATS BAR */}
      <section className="bg-ink text-cream py-14">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.08 }}
              className="text-center md:text-left"
            >
              <p className="font-heading text-4xl md:text-5xl font-bold text-gold mb-1">
                {s.value}
              </p>
              <p className="font-body text-sm text-cream/70">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* WHAT'S INSIDE */}
      <section className="max-w-6xl mx-auto w-full px-6 py-20 md:py-24">
        <div className="text-center mb-14">
          <p className="font-heading text-gold text-sm font-semibold tracking-widest uppercase mb-4">
            What&apos;s Inside
          </p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold">
            One system. Built for the long run.
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {pillars.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.1 }}
              className="bg-cream border border-charcoal/10 rounded-2xl p-8"
            >
              <p className="font-heading text-gold text-xs font-semibold tracking-widest uppercase mb-4">
                {item.label}
              </p>
              <h3 className="font-heading text-xl font-semibold mb-3">
                {item.title}
              </h3>
              <p className="font-body text-charcoal/70 leading-relaxed">
                {item.body}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* TESTIMONIAL STRIP */}
      <section className="bg-ink text-cream py-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <p className="font-body italic text-xl md:text-2xl text-cream/90 mb-6 leading-relaxed">
              &ldquo;The Long Game Parent Development System is an outstanding
              resource for parents navigating youth sports. It helps families
              focus on what truly matters.&rdquo;
            </p>
            <p className="font-heading font-semibold text-sm">Doug Ouilette</p>
            <p className="font-heading text-xs text-gold tracking-wide">
              Vice President, Ancaster Baseball · U18 WOW Factor Head Coach
            </p>
          </motion.div>
        </div>
      </section>

      {/* ORGANIZATIONS TEASER */}
      <section className="max-w-6xl mx-auto w-full px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="bg-cream border border-charcoal/10 rounded-2xl p-10 md:p-14 grid md:grid-cols-2 gap-8 items-center"
        >
          <div>
            <p className="font-heading text-gold text-sm font-semibold tracking-widest uppercase mb-4">
              For Clubs & Leagues
            </p>
            <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4">
              Bring Long Game to your entire organization.
            </h2>
            <p className="font-body text-charcoal/70 leading-relaxed">
              One registration code, full access for every parent in your
              program.
            </p>
          </div>
          <div className="md:text-right">
            <Link
              href="/organizations"
              className="inline-flex items-center gap-2 bg-charcoal text-cream font-heading font-semibold px-8 py-3 rounded-full hover:bg-charcoal/80 transition-colors"
            >
              Learn More
              <span aria-hidden>→</span>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* FAQ PREVIEW */}
      <section className="max-w-3xl mx-auto w-full px-6 py-20">
        <h2 className="font-heading text-2xl md:text-3xl font-bold text-center mb-12">
          Common Questions
        </h2>
        <div className="space-y-4">
          {faqPreview.map((item, i) => (
            <motion.div
              key={item.q}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, ease: "easeOut", delay: i * 0.08 }}
              className="bg-cream border border-charcoal/10 rounded-2xl p-6"
            >
              <h3 className="font-heading text-base font-semibold mb-2">
                {item.q}
              </h3>
              <p className="font-body text-sm text-charcoal/70 leading-relaxed">
                {item.a}
              </p>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link
            href="/faq"
            className="font-heading text-sm font-semibold text-gold hover:underline"
          >
            See all questions →
          </Link>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-ink text-cream py-20 text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
            Ready to change how you show up?
          </h2>
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