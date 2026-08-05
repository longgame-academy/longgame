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
        <div className="max-w-4xl mx-auto w-full px-6 py-20 md:py-28 text-center">
          <motion.div {...fadeUp}>
            <p className="font-heading text-teal text-sm font-semibold tracking-widest uppercase eyebrow">
              Free Guide for Sports Parents
            </p>
            <h1 className="font-heading text-4xl md:text-5xl font-bold leading-tight mb-6">
              Not sure what to say after the game?
            </h1>
            <p className="font-body text-lg text-text-body mb-8">
              The Car Ride Home gives you practical words for the moments when
              your athlete is disappointed, frustrated, quiet&mdash;or simply
              not ready to talk.
            </p>
            <a
              href="#download"
              className="inline-block bg-teal text-white font-heading font-semibold px-8 py-4 rounded-lg hover:bg-[#005548] transition-colors"
            >
              Get the Free Guide &rarr;
            </a>
            <p className="font-body text-sm text-text-muted mt-4">
              Free &bull; Instant PDF &bull; 20&ndash;25 minute read
            </p>
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

      {/* SECTION 2 - THE MOMENT AFTER THE GAME — plain text, no cards or icons */}
      <section className="bg-white w-full">
        <div className="max-w-3xl mx-auto w-full px-6 py-20 md:py-28 text-center">
          <motion.div {...fadeUp}>
            <p className="font-heading text-teal text-sm font-semibold tracking-widest uppercase eyebrow">
              The Moment After the Game
            </p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold leading-tight mb-6">
              The game is over. The emotions aren&apos;t.
            </h2>
            <p className="font-body text-lg text-text-body leading-relaxed">
              You want to help. But in those first few minutes, it can be hard
              to know whether to talk, encourage, ask questions&mdash;or say
              nothing at all. This guide shows you how to handle that moment
              without turning the ride home into another performance review.
            </p>
          </motion.div>
        </div>
      </section>

      {/* SECTION 3 - FREE GUIDE CARD (Parent Academy Pricing Card Style) */}
      <section className="w-full py-20 md:py-28">
        <div className="max-w-lg mx-auto px-6">
          <motion.div
            {...fadeUp}
            className="bg-ink text-cream rounded-[24px] p-6 md:p-8"
          >
            <p className="font-heading text-teal text-[11px] font-semibold tracking-widest uppercase eyebrow">
              The Car Ride Home
            </p>
            <h2 className="font-heading text-2xl md:text-3xl font-bold mb-3 leading-tight">
              A practical guide for what happens after the game.
            </h2>
            <p className="font-body text-sm text-cream/70 leading-relaxed mb-6">
              Know what to say, what to avoid, and how to respond when emotions
              are still high.
            </p>

            <div className="flex items-end gap-2 mb-1">
              <span className="font-heading text-4xl font-bold">FREE</span>
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
                  "Why the first five minutes matter",
                  "What to say after good games and difficult ones",
                  "Questions that help—and the ones that can feel like pressure",
                  "How to respond when your athlete is frustrated, quiet, or discouraged",
                  "Practical words and scripts you can use immediately",
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
                Keep the most useful reminders with you for the moments when
                you&apos;re not sure what to say.
              </p>
            </div>

            <p className="font-body text-xs text-cream/60 border-t border-cream/10 pt-4">
              20&ndash;25 minute read &middot; Instant PDF download &middot;
              Practical conversations you can use after your very next game
            </p>
          </motion.div>
        </div>
      </section>

      {/* SECTION 3B - AFTER YOU READ IT — plain text, no cards or icons */}
      <section className="bg-white w-full">
        <div className="max-w-3xl mx-auto w-full px-6 py-20 md:py-28 text-center">
          <motion.div {...fadeUp}>
            <p className="font-heading text-teal text-sm font-semibold tracking-widest uppercase eyebrow">
              After You Read It
            </p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold leading-tight mb-6">
              You&apos;ll know what to do.
            </h2>
            <p className="font-body text-lg text-text-body leading-relaxed">
              You&apos;ll have a simple approach for the first few minutes after
              the game, better questions for when they&apos;re ready to talk,
              and practical words for the moments when they&apos;re not.
            </p>
          </motion.div>
        </div>
      </section>

      {/* SECTION 4 - LARGE QUOTE */}
      <section className="bg-white w-full">
        <div className="max-w-3xl mx-auto w-full px-6 py-20 md:py-28 text-center">
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
            <p className="font-heading text-teal text-sm font-semibold tracking-widest uppercase eyebrow">
              Free Download
            </p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Make the next ride home different.
            </h2>
            <p className="font-body text-lg text-text-body mb-10">
              You don&apos;t need the perfect words. You just need a better way
              to handle the moment.
            </p>
          </motion.div>

          <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.1 }}>
            <FreeGuideForm />
          </motion.div>

          <p className="font-body text-sm text-text-muted mt-4">
            Free &bull; Instant access &bull; No credit card required
          </p>

          <p className="font-body text-sm text-charcoal/50 mt-6 mb-16">
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
