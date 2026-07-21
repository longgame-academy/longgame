"use client";

import { useState } from "react";
import Link from "next/link";
import Nav from "@/components/Nav";
import { CheckoutButton } from "@/components/CheckoutButton";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";

function Placeholder({ label, className = "" }: { label: string; className?: string }) {
  return (
    <div
      className={`bg-ink flex items-center justify-center text-cream/30 font-heading text-xs tracking-widest uppercase ${className}`}
    >
      {label}
    </div>
  );
}

const modules = [
  {
    title: "Module 1 — The Car Ride Home",
    body: "The ride home is often the most emotional part of youth sports. Learn simple conversation frameworks that help your athlete feel supported after great games, difficult losses, mistakes, and disappointment, while protecting confidence and strengthening your relationship.",
  },
  {
    title: "Module 2 — Confidence",
    body: "Confidence isn't built by praise alone. Discover what truly creates lasting confidence, the subtle ways parents unknowingly chip away at it, and practical strategies that help athletes believe in themselves through every stage of development.",
  },
  {
    title: "Module 3 — Pressure Without Realizing It",
    body: "Most parents never intend to create pressure, but it happens every day. Learn to recognize hidden sources of pressure and create an environment where your athlete feels supported, not burdened by expectations.",
  },
  {
    title: "Module 4 — The Mental Game",
    body: "Learn practical ways to help your athlete develop resilience, focus, emotional control, and a stronger mindset.",
  },
  {
    title: "Module 5 — Development Over Exposure",
    body: "Learn how to focus on long-term development instead of chasing showcases, rankings, and short-term opportunities.",
  },
  {
    title: "Module 6 — Communication",
    body: "Practical communication strategies that build trust, reduce conflict, and strengthen your relationship.",
  },
  {
    title: "Module 7 — Failure & Resilience",
    body: "Help your athlete respond to setbacks in ways that build resilience and long-term confidence.",
  },
  {
    title: "Module 8 — The Athlete Lifestyle",
    body: "Discover how sleep, nutrition, recovery, routines, and healthy habits influence performance and well-being.",
  },
  {
    title: "Module 9 — Coaches, Teams & Politics",
    body: "Navigate playing time, difficult coaches, and team politics while protecting your athlete's growth.",
  },
  {
    title: "Module 10 — Identity Beyond Sport",
    body: "Help your athlete build an identity that extends beyond performance and sport.",
  },
  {
    title: "Module 11 — Burnout",
    body: "Recognize the warning signs of burnout and create an environment that keeps sport enjoyable.",
  },
  {
    title: "Module 12 — Playing the Long Game",
    body: "Bring everything together with a clear vision for becoming the steady influence your athlete needs.",
  },
];

const faqs = [
  {
    q: "Who is the Parent Academy designed for?",
    a: "The Parent Academy was created for parents of athletes of all ages and across all sports. Whether your child is just beginning or competing at a high level, the principles inside are designed to help you navigate the challenges of youth sports.",
  },
  {
    q: "Is the Parent Academy for all sports?",
    a: "Yes. While many stories come from baseball, the principles apply across every youth sport. Confidence, communication, pressure, setbacks, motivation, burnout, and protecting the parent-athlete relationship are universal.",
  },
  {
    q: "How do I access the Parent Academy?",
    a: "You'll receive immediate access through your secure online account after purchase.",
  },
  {
    q: "Can I print the Parent Guide?",
    a: "Yes. The Parent Guide is provided as a fillable PDF that can also be printed.",
  },
  {
    q: "Is this a subscription?",
    a: "No. Your initial purchase is a one-time payment that gives you permanent access to the Parent Academy you purchase today. Future resources or programs may be offered separately.",
  },
  {
    q: "Will new content be added?",
    a: "Yes. As new resources are created, you'll be notified by email. Some future content may be offered separately or through membership options.",
  },
  {
    q: "What if I'm not satisfied?",
    a: "Contact us within 30 days of purchase for a full refund.",
  },
  {
    q: "Do I have to complete the Parent Academy in order?",
    a: "No. The Parent Academy is designed to be practical, not prescriptive. While each module builds on the last, you can start wherever your family needs the most support right now. Whether you're navigating confidence, communication, pressure, or the car ride home, simply begin there and come back to the other modules when you're ready.",
  },
];

function Accordion({
  items,
  openIndex,
  setOpenIndex,
}: {
  items: { title?: string; q?: string; body?: string; a?: string }[];
  openIndex: number | null;
  setOpenIndex: (i: number | null) => void;
}) {
  return (
    <div className="space-y-3">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={i} className="border border-border-grey rounded-2xl overflow-hidden bg-cream shadow-[0_4px_16px_rgba(18,21,20,0.08)]">
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="w-full text-left px-6 py-5 flex justify-between items-center gap-4"
            >
              <span className="font-heading font-semibold text-base">
                {item.title || item.q}
              </span>
              <span
                className={`font-heading text-teal text-xl transition-transform ${
                  isOpen ? "rotate-45" : ""
                }`}
              >
                +
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="overflow-hidden"
                >
                  <p className="font-body text-sm text-text-body leading-relaxed px-6 pb-6">
                    {item.body || item.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

export default function ParentAcademyPage() {
  const [openModule, setOpenModule] = useState<number | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main className="flex flex-col min-h-screen bg-background text-charcoal">
      <Nav />

      {/* SECTION 1: HERO */}
      <section className="bg-cream py-20 md:py-24">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: "easeOut" }}>
            <h1 className="font-heading text-4xl md:text-5xl font-bold leading-tight mb-6">
              Become the parent your athlete will remember.
            </h1>
            <p className="font-body text-lg text-text-body mb-10">
              The Parent Academy is a practical parent development system that
              helps families confidently navigate every stage of the youth sports
              journey.
            </p>
            <div className="flex flex-wrap gap-4">
              <CheckoutButton className="inline-flex items-center gap-2 bg-teal text-charcoal font-heading font-semibold px-8 py-3 rounded-full hover:bg-teal-dark transition-colors" />
              <a
                href="#modules"
                className="inline-flex items-center gap-2 border border-charcoal/20 text-charcoal font-heading font-semibold px-8 py-3 rounded-full hover:border-teal hover:text-teal transition-colors"
              >
                Preview Course Pages
              </a>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}>
            <div className="relative w-full max-w-sm mx-auto aspect-[4/5] rounded-lg overflow-hidden shadow-2xl rotate-2 bg-ink flex flex-col items-center justify-center text-cream p-8">
              <p className="font-heading font-bold text-2xl tracking-wide mb-2">LONG GAME</p>
              <p className="font-heading text-xs tracking-widest text-cream/60 mb-6">PARENT ACADEMY</p>
              <span className="font-heading text-xs tracking-widest border border-teal text-teal rounded-full px-4 py-1">
                12 MODULES
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: EXPLORE THE PARENT ACADEMY */}
      <section id="modules" className="max-w-3xl mx-auto w-full px-6 py-20">
        <h2 className="font-heading text-2xl md:text-3xl font-bold text-center mb-12">
          Explore the Parent Academy
        </h2>
        <Accordion items={modules} openIndex={openModule} setOpenIndex={setOpenModule} />
      </section>

      {/* SECTION 3: SEE WHAT'S INSIDE */}
      <section className="bg-ink py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-cream text-center mb-12">
            See what&apos;s inside.
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[1, 2, 3, 4, 5].map((n) => (
              <Placeholder key={n} label={`Page ${n}`} className="aspect-[3/4] rounded-lg" />
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: ENROLL */}
      <section className="max-w-lg mx-auto w-full px-6 py-20 text-center">
        <div className="bg-cream border border-border-grey rounded-2xl p-10 shadow-[0_6px_20px_rgba(18,21,20,0.10)]">
          <p className="font-heading text-teal text-sm font-semibold tracking-widest uppercase mb-2">
            Parent Academy
          </p>
          <p className="font-heading text-4xl font-bold mb-4">$147 USD</p>
          <p className="font-body text-sm text-text-body mb-8">
            One-time payment. Permanent access to the Parent Academy included
            with your purchase.
          </p>
          <CheckoutButton className="inline-flex items-center gap-2 bg-teal text-charcoal font-heading font-semibold px-8 py-3 rounded-full hover:bg-teal-dark transition-colors w-full justify-center" />
        </div>
      </section>

      {/* SECTION 5: FAQ */}
      <section className="max-w-3xl mx-auto w-full px-6 py-20">
        <h2 className="font-heading text-2xl md:text-3xl font-bold text-center mb-12">
          Common Questions
        </h2>
        <Accordion items={faqs} openIndex={openFaq} setOpenIndex={setOpenFaq} />
      </section>

      <Footer />
    </main>
  );
}




