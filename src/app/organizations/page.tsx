"use client";

import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

export default function OrganizationsPage() {
  return (
    <main className="flex flex-col min-h-screen bg-cream text-charcoal">
      <Nav />

      {/* HERO */}
      <section className="max-w-5xl mx-auto w-full px-6 py-20 md:py-24 text-center">
        <p className="font-heading text-gold text-sm font-semibold tracking-widest uppercase mb-4">
          For Clubs, Leagues & Associations
        </p>
        <h1 className="font-heading text-4xl md:text-5xl font-bold leading-tight mb-6">
          Give every family in your
          <br className="hidden md:block" /> organization the Long Game.
        </h1>
        <p className="font-body text-lg text-charcoal/70 max-w-2xl mx-auto mb-10">
          Partner with Long Game to bring the Parent Development System to
          your entire organization &mdash; one registration code, full access
          for every parent.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 bg-gold text-charcoal font-heading font-semibold px-8 py-3 rounded-full hover:bg-gold-light transition-colors"
        >
          Request Organization Access
          <span aria-hidden>→</span>
        </Link>
      </section>

      {/* HOW IT WORKS */}
      <section className="max-w-6xl mx-auto w-full px-6 py-16">
        <h2 className="font-heading text-2xl md:text-3xl font-bold text-center mb-12">
          How It Works
        </h2>
        <div className="grid md:grid-cols-4 gap-8">
          {[
            {
              step: "01",
              title: "Apply",
              body: "Submit your organization for approval directly with our team.",
            },
            {
              step: "02",
              title: "Get Your Code",
              body: "Once verified, you receive a unique registration code for your families.",
            },
            {
              step: "03",
              title: "Share It",
              body: "Distribute the code to parents through your usual communication channels.",
            },
            {
              step: "04",
              title: "Parents Enroll",
              body: "Parents sign up, enter the code, and get instant access to the full system.",
            },
          ].map((item, i) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.1 }}
              className="text-center md:text-left"
            >
              <p className="font-heading text-gold text-3xl font-bold mb-3">
                {item.step}
              </p>
              <h3 className="font-heading text-lg font-semibold mb-2">
                {item.title}
              </h3>
              <p className="font-body text-sm text-charcoal/70 leading-relaxed">
                {item.body}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* WHAT'S INCLUDED */}
      <section className="bg-white/60 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-center mb-12">
            What Your Families Get
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Full Parent Development System",
                body: "All 12 modules, unlocked for every parent registered under your organization.",
              },
              {
                title: "Field Guides & Tools",
                body: "The same practical resources available to individual purchasers, included at no extra cost.",
              },
              {
                title: "Admin Visibility",
                body: "Your organization admin can see registration usage and manage your access code anytime.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="border border-charcoal/10 rounded-2xl p-8 bg-cream"
              >
                <h3 className="font-heading text-xl font-semibold mb-3">
                  {item.title}
                </h3>
                <p className="font-body text-charcoal/70 leading-relaxed">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIAL STRIP */}
      <section className="bg-ink text-cream py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="font-body italic text-xl md:text-2xl text-cream/90 mb-6 leading-relaxed">
            &ldquo;The Long Game Parent Development System is an outstanding
            resource for parents navigating youth sports. It helps families
            focus on what truly matters.&rdquo;
          </p>
          <p className="font-heading font-semibold text-sm">Doug Ouilette</p>
          <p className="font-heading text-xs text-gold tracking-wide">
            Vice President, Ancaster Baseball · U18 WOW Factor Head Coach
          </p>
        </div>
      </section>

      {/* ALREADY HAVE A CODE */}
      <section className="max-w-3xl mx-auto w-full px-6 py-16 text-center">
        <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4">
          Already have an organization code?
        </h2>
        <p className="font-body text-charcoal/70 mb-8">
          Enter your code during sign up to link your account to your
          organization&apos;s access.
        </p>
        <Link
          href="/sign-up"
          className="inline-flex items-center gap-2 border border-charcoal text-charcoal font-heading font-semibold px-8 py-3 rounded-full hover:bg-charcoal hover:text-cream transition-colors"
        >
          Sign Up With Your Code
          <span aria-hidden>→</span>
        </Link>
      </section>

      <Footer />
    </main>
  );
}