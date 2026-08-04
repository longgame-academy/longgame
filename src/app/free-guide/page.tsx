"use client";

import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import FreeGuideForm from "@/components/FreeGuideForm";
import { motion } from "framer-motion";
import { MessageCircle, Brain, Heart } from "lucide-react";

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
              className="inline-block bg-teal text-white font-heading font-semibold px-8 py-4 rounded-lg hover:bg-[#005548] transition-colors"
            >
              Download the Free Guide &rarr;
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
                <f.icon
                  className="w-7 h-7 text-teal mb-4"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                <h3 className="font-heading text-lg font-semibold mb-3">{f.title}</h3>
                <p className="font-body text-sm text-text-body leading-relaxed">{f.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3 - FREE GUIDE CARD (Parent Academy Pricing Card Style) */}
      <section className="w-full py-16 md:py-20">
        <div className="max-w-lg mx-auto px-6">
          <motion.div
            {...fadeUp}
            className="bg-ink text-cream rounded-[24px] p-6 md:p-8"
          >
            <p className="font-heading text-teal text-[11px] font-semibold tracking-widest uppercase mb-3">
              Free Parent Guide
            </p>
            <h2 className="font-heading text-2xl md:text-3xl font-bold mb-3 leading-tight">
              Everything You Need for the Car Ride Home
            </h2>
            <p className="font-body text-sm text-cream/70 leading-relaxed mb-6">
              One conversation after the game can shape your athlete&apos;s
              confidence for years. Learn exactly what to say, what to
              avoid, and how to turn every drive home into an opportunity
              to strengthen your relationship.
            </p>

            <div className="flex items-end gap-2 mb-1">
              <span className="font-heading text-4xl font-bold">Free</span>
            </div>
            <p className="font-body text-xs text-cream/60 mb-6">
              No cost &middot; Instant PDF download
            </p>

            <a
              href="#download"
              className="flex items-center justify-center gap-2 bg-teal text-white font-heading font-semibold text-sm px-6 py-3 rounded-lg hover:bg-[#005548] transition-colors mb-3"
            >
              Get the Free Guide &rarr;
            </a>
            <a
              href="#download"
              className="block text-center font-heading text-xs font-semibold text-teal hover:underline mb-6"
            >
              See Everything Included &rarr;
            </a>

            <div className="border-t border-cream/10 pt-2 mb-6">
              <p className="font-heading text-teal text-[11px] font-semibold tracking-widest uppercase mb-2">
                Inside the Guide
              </p>
              <ul className="font-body text-sm space-y-0">
                {[
                  "Why the first five minutes matter most",
                  "Exactly what to say after great games and difficult games",
                  "Questions that build confidence—and the ones to avoid",
                  "Practical conversation scripts you can use immediately",
                  "How to respond when your athlete is frustrated, quiet, or discouraged",
                  "A simple framework that protects confidence and your relationship",
                  "Works for every sport and every competitive level",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2.5 py-2 border-b border-cream/10 last:border-0"
                  >
                    <span className="text-teal">&#10003;</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-cream/10 pt-4 mb-6">
              <p className="font-heading text-teal text-[11px] font-semibold tracking-widest uppercase mb-2">
                Bonus
              </p>
              <p className="font-heading text-sm font-semibold mb-1">
                Printable Glove Box Card
              </p>
              <p className="font-body text-xs text-cream/60 leading-relaxed">
                Keep the most important reminders in your vehicle so
                you&apos;ll always know what to say when emotions are high.
              </p>
            </div>

            <p className="font-body text-xs text-cream/60 border-t border-cream/10 pt-4">
              20&ndash;25 minute read &middot; Instant PDF download &middot;
              Practical conversations you can use after your very next game
            </p>
          </motion.div>
        </div>
      </section>

      {/* SECTION 4 - LARGE QUOTE */}
      <section className="bg-white w-full">
        <div className="max-w-3xl mx-auto w-full px-6 py-14 md:py-24 text-center">
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
