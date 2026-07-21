"use client";

import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

const faqs = [
  {
    q: "What is the Long Game Parent Development System?",
    a: "A 12-module, video-guided course built to help sports parents show up with more confidence, patience, and perspective throughout their child's athletic journey.",
  },
  {
    q: "How do I access the content after purchasing?",
    a: "You'll create an account immediately after checkout and get instant access to your portal, where all modules, Field Guides, and Tools are available.",
  },
  {
    q: "My organization gave me a code — how do I use it?",
    a: "Sign up for an account and enter your organization's code during registration. This links your account to your organization's access at no additional cost.",
  },
  {
    q: "Can I access this on my phone?",
    a: "Yes — the portal is fully accessible on mobile, tablet, and desktop.",
  },
  {
    q: "Do I get lifetime access?",
    a: "[Placeholder — Shawn to confirm access duration policy.]",
  },
];

export default function FaqPage() {
  return (
    <main className="flex flex-col min-h-screen bg-background text-charcoal">
      <Nav />
      <section className="max-w-3xl mx-auto w-full px-6 py-20">
        <h1 className="font-heading text-4xl font-bold mb-12 text-center">
          Frequently Asked Questions
        </h1>
        <div className="space-y-6">
          {faqs.map((item, i) => (
            <motion.div
              key={item.q}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, ease: "easeOut", delay: i * 0.06 }}
              className="bg-white/60 border border-charcoal/10 rounded-2xl p-6"
            >
              <h3 className="font-heading text-lg font-semibold mb-2">
                {item.q}
              </h3>
              <p className="font-body text-charcoal/70 leading-relaxed">
                {item.a}
              </p>
            </motion.div>
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
}