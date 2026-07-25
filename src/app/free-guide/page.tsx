"use client";

import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import FreeGuideForm from "@/components/FreeGuideForm";
import { motion } from "framer-motion";
import { MessageCircle, Brain, Heart, Check } from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7, ease: "easeOut" },
} as const;

const features = [
  {
    title: "Better Conversations",
    body: "Learn exactly what to say—and what not to say—after every game.",
    icon: MessageCircle,
  },
  {
    title: "Build Confidence",
    body: "Simple conversations that strengthen confidence instead of pressure.",
    icon: Brain,
  },
  {
    title: "Protect Your Relationship",
    body: "Because long after the game ends, your relationship is what matters most.",
    icon: Heart,
  },
];

const checklist = [
  "Why the first five minutes matter",
  "What to say after a difficult game",
  "What to say after a great game",
  "Questions that build confidence",
  "Questions to avoid",
  "The Glovebox Card",
  "Practical conversations you can use immediately",
];

export default function FreeGuidePage() {
  return (
    <main className="flex flex-col min-h-screen bg-white text-charcoal">
      <Nav />

      {/* SECTION 1 - HERO */}
      <section className="bg-cream w-full">
        <div className="max-w-4xl mx-auto w-full px-6 py-20 md:py-28 text-center">
          <motion.div {...fadeUp}>
            <p className="font-heading text-teal text-sm font-semibold tracking-widest uppercase mb-4">
              Free Guide
            </p>
            <h1 className="font-heading text-4xl md:text-5xl font-bold leading-tight mb-6">
              The Car Ride Home
            </h1>
            <p className="font-body text-lg text-text-body mb-8">
              One conversation can shape an athlete for years.
            </p>
            <a
              href="#download"
              className="inline-block bg-charcoal text-white font-heading font-semibold px-8 py-4 rounded-lg hover:bg-charcoal/90 transition-colors"
            >
              Download the Free Guide
            </a>
          </motion.div>

          <motion.div
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.15 }}
            className="mt-16 max-w-4xl mx-auto w-[90%]"
          >
            <img
              src="/free-guide-mockup.jpg"
              alt="The Car Ride Home guide, cover and interior pages"
              className="w-full h-auto"
            />
          </motion.div>
        </div>
      </section>

      {/* SECTION 2 - WHAT YOU'LL LEARN */}
      <section className="bg-white w-full">
        <div className="max-w-5xl mx-auto w-full px-6 py-20 md:py-28">
          <motion.h2 {...fadeUp} className="font-heading text-3xl md:text-4xl font-bold text-center mb-14">
            What You&apos;ll Learn
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.1 }}
                className="bg-cream border border-border-grey rounded-2xl p-8 shadow-[0_4px_16px_rgba(18,21,20,0.08)]"
              >
                <div className="w-14 h-14 rounded-2xl bg-teal/10 flex items-center justify-center mb-4">
                  <f.icon className="w-7 h-7 text-teal" strokeWidth={1.5} />
                </div>
                <h3 className="font-heading text-lg font-semibold mb-3">{f.title}</h3>
                <p className="font-body text-sm text-text-body leading-relaxed">{f.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3 - INSIDE THE GUIDE */}
      <section className="bg-cream w-full">
        <div className="max-w-2xl mx-auto w-full px-6 py-20 md:py-28">
          <motion.h2 {...fadeUp} className="font-heading text-3xl md:text-4xl font-bold text-center mb-12">
            Inside the Guide
          </motion.h2>
          <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.1 }} className="space-y-4">
            {checklist.map((item) => (
              <div key={item} className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-teal/10 flex items-center justify-center flex-shrink-0">
                  <Check className="w-4 h-4 text-teal" strokeWidth={2.5} />
                </span>
                <p className="font-body text-text-body">{item}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SECTION 4 - LARGE QUOTE */}
      <section className="bg-white w-full">
        <div className="max-w-3xl mx-auto w-full px-6 py-24 md:py-32 text-center">
          <motion.p {...fadeUp} className="font-heading text-3xl md:text-5xl font-bold leading-tight">
            The game will end.
            <br />
            The relationship won&apos;t.
          </motion.p>
        </div>
      </section>

      {/* SECTION 5 - DOWNLOAD */}
      <section id="download" className="bg-cream w-full">
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

          <p className="font-body text-sm text-charcoal/50 mt-8 mb-16">
            We respect your inbox. No spam. Just practical resources and
            occasional updates from Long Game.
          </p>

          <motion.div
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.15 }}
            className="max-w-md mx-auto w-[65%]"
          >
            <img
              src="/free-guide-cover.jpg"
              alt="The Car Ride Home — Free Guide for Sports Parents"
              className="w-full h-auto rounded-2xl"
            />
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
