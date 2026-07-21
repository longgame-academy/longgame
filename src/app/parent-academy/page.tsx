"use client";

import Link from "next/link";
import Nav from "@/components/Nav";
import { CheckoutButton } from "@/components/CheckoutButton";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

export default function ParentAcademyPage() {
  return (
    <main className="flex flex-col min-h-screen bg-background text-charcoal">
      <Nav />

      {/* HERO */}
      <section className="max-w-5xl mx-auto w-full px-6 py-20 md:py-24 text-center">
        <p className="font-heading text-gold text-sm font-semibold tracking-widest uppercase mb-4">
          Parent Development System
        </p>
        <h1 className="font-heading text-4xl md:text-5xl font-bold leading-tight mb-6">
          Twelve modules. One relationship
          <br className="hidden md:block" /> that lasts beyond the game.
        </h1>
        <p className="font-body text-lg text-charcoal/70 max-w-2xl mx-auto mb-10">
          A practical, video-guided system built to help sports parents show
          up with more confidence, patience, and perspective &mdash; season
          after season.
        </p>
        <CheckoutButton className="inline-flex items-center gap-2 bg-gold text-charcoal font-heading font-semibold px-8 py-3 rounded-full hover:bg-gold-light transition-colors" />
      </section>

      {/* WHAT'S INCLUDED */}
      <section className="max-w-6xl mx-auto w-full px-6 py-16">
        <h2 className="font-heading text-2xl md:text-3xl font-bold text-center mb-12">
          What&apos;s Included
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "12 Core Modules",
              body: "Sequential, video-guided lessons covering confidence, communication, identity, and the pressures of modern youth sports.",
            },
            {
              title: "Field Guides",
              body: "Focused, secure reference material to revisit before big moments &mdash; tryouts, tough conversations, and setbacks.",
            },
            {
              title: "Practical Tools",
              body: "Downloadable worksheets and conversation starters you can bring straight into everyday life with your athlete.",
            },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.1 }}
              className="bg-cream border border-charcoal/10 rounded-2xl p-8"
            >
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

      {/* TESTIMONIALS */}
      <section className="bg-ink text-cream py-20">
        <div className="max-w-5xl mx-auto px-6">
          <p className="font-heading text-gold text-sm font-semibold tracking-widest uppercase text-center mb-4">
            Trusted by Leaders in Sport
          </p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-14">
            Proven. Respected. Recommended.
          </h2>

          <div className="space-y-12">
            {[
              {
                quote:
                  "The Long Game Parent Development System is an outstanding resource for parents navigating youth sports. It helps families focus on what truly matters.",
                name: "Doug Ouilette",
                role: "Vice President, Ancaster Baseball · U18 WOW Factor Head Coach",
              },
              {
                quote:
                  "Long Game gives parents practical guidance to help their children build confidence, enjoy the journey, and grow as people.",
                name: "Jay Wells",
                role: "18-Year NHL Veteran · 1994 Stanley Cup Champion",
              },
              {
                quote:
                  "It captures the realities of today's youth sports environment while giving families guidance that lasts beyond the season.",
                name: "Allan Ross",
                role: "35-Year MLB Scout · Pirates, Angels, Diamondbacks",
              },
            ].map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.12 }}
                className="border-l-2 border-gold pl-6"
              >
                <p className="font-body italic text-lg text-cream/90 mb-4 leading-relaxed">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <p className="font-heading font-semibold text-sm">{t.name}</p>
                <p className="font-heading text-xs text-gold tracking-wide">
                  {t.role}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="max-w-5xl mx-auto w-full px-6 py-20 text-center">
        <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
          Ready to change how you show up?
        </h2>
        <CheckoutButton className="inline-flex items-center gap-2 bg-gold text-charcoal font-heading font-semibold px-8 py-3 rounded-full hover:bg-gold-light transition-colors" />
      </section>

      <Footer />
    </main>
  );
}
