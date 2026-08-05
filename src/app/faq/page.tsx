"use client";

import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import {
  GUARANTEE_FULL,
  GUARANTEE_LIBRARY_NOTE,
  GUARANTEE_TITLE,
  SUPPORT_EMAIL,
} from "@/lib/legal";

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
    q: "How long do I have access?",
    a: "Your one-time purchase includes the complete Parent Academy plus 12 months of access to the Long Game Library — Field Guides, Practical Tools, and select new resources added during that period. There is no lifetime access and no automatic renewal.",
  },
  {
    q: "Is this a subscription? Will I be charged again?",
    a: "No. The Parent Academy is a one-time payment. There is no subscription, no automatic renewal and no recurring charge, so there is nothing to cancel. The 12 months of Long Game Library access is a bonus included with that purchase; when it ends, nothing is charged to extend it.",
  },
  {
    q: "What if I'm not satisfied?",
    a: `Your purchase is backed by our ${GUARANTEE_TITLE}. ${GUARANTEE_FULL} ${GUARANTEE_LIBRARY_NOTE} To request a refund, contact us at ${SUPPORT_EMAIL} within the 14-day window.`,
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
              className="bg-cream/60 border border-border-grey rounded-2xl p-6 shadow-[0_4px_16px_rgba(18,21,20,0.08)]"
            >
              <h3 className="font-heading text-lg font-semibold mb-2">
                {item.q}
              </h3>
              <p className="font-body text-text-body leading-relaxed">
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




