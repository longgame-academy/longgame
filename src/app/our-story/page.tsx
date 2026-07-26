"use client";

import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7, ease: "easeOut" },
} as const;

const startedSeeing = [
  {
    title: "Confidence Was Becoming Fragile",
    body: "Many young athletes began believing their worth depended on their performance instead of their growth.",
  },
  {
    title: "Parents Were Carrying More Than Ever",
    body: "Parents wanted to help. But many weren't sure what to say after the difficult games, the setbacks, or the moments when confidence disappeared.",
  },
  {
    title: "Coaches Needed Partners",
    body: "The best coaches develop athletes. The best parents reinforce everything that happens away from the field.",
  },
  {
    title: "The Relationship Was Being Tested",
    body: "The pressure to perform was beginning to overshadow the reason families fell in love with sports in the first place.",
  },
];

const beliefs = [
  {
    title: "Relationships Matter More Than Results",
    body: "Strong relationships create athletes who stay in the game longer.",
  },
  {
    title: "Confidence Is Built Through Everyday Conversations",
    body: "The words parents choose shape how athletes see themselves.",
  },
  {
    title: "Hard Work Should Never Be Optional",
    body: "Growth comes from discipline, effort, accountability, and showing up when it's difficult.",
  },
  {
    title: "Adversity Is Part of Development",
    body: "The goal isn't to remove hard moments. It's to help athletes learn how to respond to them.",
  },
  {
    title: "Character Lasts Longer Than Trophies",
    body: "Wins fade. Who an athlete becomes lasts forever.",
  },
  {
    title: "The Game Will End. The Relationship Won't.",
    body: "The greatest legacy isn't a championship. It's the relationship that remains long after sport is over.",
  },
];

export default function OurStoryPage() {
  return (
    <main className="flex flex-col min-h-screen bg-white text-charcoal">
      <Nav />

      {/* SECTION 1: HERO */}
      <section className="bg-white w-full">
        <div className="max-w-6xl mx-auto w-full px-6 py-20 md:py-28 grid md:grid-cols-[11fr_9fr] gap-12 items-center">
          <motion.div {...fadeUp}>
            <p className="font-heading text-teal text-xs font-semibold tracking-widest uppercase mb-4">
              Our Story
            </p>
            <h1 className="font-heading text-4xl md:text-5xl font-bold leading-tight mb-6">
              Why Long Game Exists
            </h1>
            <div className="font-body text-lg text-text-body leading-relaxed space-y-4 mb-8">
              <p>Every season tells a different story.</p>
              <p>Some end with championships.</p>
              <p>Others end with disappointment.</p>
              <p>
                But long after the final score is forgotten, one thing
                remains.
              </p>
              <p>The relationship between a parent and their athlete.</p>
              <p className="font-semibold text-charcoal">
                That&apos;s what Long Game exists to protect.
              </p>
            </div>
            <Link
              href="/parent-academy"
              className="inline-block bg-charcoal text-white font-heading font-semibold px-8 py-4 rounded-lg hover:bg-charcoal/90 transition-colors"
            >
              Explore the Parent Academy
            </Link>
          </motion.div>

          <motion.div
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.15 }}
            className="rounded-2xl overflow-hidden"
          >
            <img
              src="/our-story-bench.jpg"
              alt="Father and son sitting on a bench"
              className="w-full h-auto aspect-[4/3] object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: YOUTH SPORTS HAS CHANGED */}
      <section className="bg-white w-full">
        <div className="max-w-[700px] mx-auto w-full px-6 py-20 md:py-28 text-center">
          <motion.div {...fadeUp}>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-8">
              Youth Sports Has Changed
            </h2>
            <div className="font-body text-lg text-text-body leading-relaxed space-y-4">
              <p>
                Today&apos;s sports families are navigating more than
                practices and games.
              </p>
              <p>They&apos;re navigating pressure.</p>
              <p>Comparison.</p>
              <p>Recruiting.</p>
              <p>Playing time.</p>
              <p>Confidence.</p>
              <p>Burnout.</p>
              <p>
                Parents are expected to know exactly what to say in every
                difficult moment, yet very few are ever shown how.
              </p>
              <p>Athletes have coaches.</p>
              <p>Parents rarely do.</p>
              <p className="font-semibold text-charcoal">
                Long Game was created to change that.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 3: WHAT WE STARTED SEEING */}
      <section className="bg-white w-full">
        <div className="max-w-6xl mx-auto w-full px-6 py-20 md:py-28">
          <motion.h2
            {...fadeUp}
            className="font-heading text-3xl md:text-4xl font-bold text-center mb-16"
          >
            What We Started Seeing
          </motion.h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {startedSeeing.map((c, i) => (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.1 }}
                className="bg-background border border-border-grey rounded-2xl p-8 shadow-[0_4px_16px_rgba(18,21,20,0.08)]"
              >
                <h3 className="font-heading text-lg font-semibold mb-3">{c.title}</h3>
                <p className="font-body text-sm text-text-body leading-relaxed">{c.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: THE HARDEST MOMENTS */}
      <section className="bg-white w-full">
        <div className="max-w-6xl mx-auto w-full px-6 pt-20 md:pt-28">
          <motion.div {...fadeUp} className="rounded-2xl overflow-hidden mb-16">
            <img
              src="/our-story-alone.jpg"
              alt="Athlete walking alone off the field"
              className="w-full h-auto max-h-[560px] object-cover"
            />
          </motion.div>
        </div>
        <div className="max-w-3xl mx-auto w-full px-6 pb-20 md:pb-28 text-center">
          <motion.div {...fadeUp}>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-8">
              The Hardest Moments Usually Happen When Nobody Is Watching
            </h2>
            <div className="font-body text-lg text-text-body leading-relaxed space-y-4">
              <p>Sometimes confidence doesn&apos;t disappear during the game.</p>
              <p>It disappears afterwards.</p>
              <p>On the walk back to the car.</p>
              <p>During the drive home.</p>
              <p>Late at night when nobody else sees the disappointment.</p>
              <p>Those are the moments that shape athletes.</p>
              <p>And those are the moments parents remember forever.</p>
              <p className="font-semibold text-charcoal">
                Long Game exists for those moments.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 5: WHAT WE BELIEVE */}
      <section className="bg-ink w-full">
        <div className="max-w-6xl mx-auto w-full px-6 py-20 md:py-28">
          <motion.h2
            {...fadeUp}
            className="font-heading text-3xl md:text-4xl font-bold text-center text-cream mb-16"
          >
            What We Believe
          </motion.h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {beliefs.map((b, i) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.1 }}
                className="border border-cream/15 rounded-2xl p-8"
              >
                <h3 className="font-heading text-lg font-semibold text-cream mb-3">{b.title}</h3>
                <p className="font-body text-sm text-cream/70 leading-relaxed">{b.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: HIGH STANDARDS + STRONG SUPPORT */}
      <section className="bg-white w-full">
        <div className="max-w-3xl mx-auto w-full px-6 py-20 md:py-28 text-center">
          <motion.div {...fadeUp}>
            <h2 className="font-heading text-3xl md:text-5xl font-bold mb-8 leading-tight">
              We Believe Great Athletes Need Both High Standards and Strong Support.
            </h2>
            <div className="font-body text-xl text-charcoal/80 leading-relaxed space-y-4">
              <p>Long Game isn&apos;t about lowering expectations.</p>
              <p>
                It&apos;s about helping parents raise athletes who embrace
                hard work, respond to adversity, compete with confidence,
                and keep growing through every challenge.
              </p>
              <p>Because resilience isn&apos;t built by avoiding difficult moments.</p>
              <p>It&apos;s built by learning how to move through them.</p>
              <p className="font-heading font-semibold text-teal">That&apos;s the Long Game.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 7: FINAL CTA */}
      <section className="bg-white w-full">
        <div className="max-w-3xl mx-auto w-full px-6 pb-20 md:pb-28 text-center">
          <motion.div {...fadeUp}>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
              Ready to Start Your Long Game?
            </h2>
            <p className="font-body text-lg text-text-body leading-relaxed mb-10 max-w-2xl mx-auto">
              Inside the Parent Academy you&apos;ll learn practical
              strategies for handling the conversations, setbacks,
              pressures, and everyday moments that shape an athlete far
              beyond the game itself. Because the goal isn&apos;t simply to
              help your child perform better. It&apos;s to help them love
              the journey, believe in themselves, and know your support
              never depends on the scoreboard.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/parent-academy"
                className="inline-block bg-charcoal text-white font-heading font-semibold px-8 py-4 rounded-lg hover:bg-charcoal/90 transition-colors"
              >
                Explore the Parent Academy
              </Link>
              <Link
                href="/free-guide"
                className="inline-block border border-charcoal/20 text-charcoal font-heading font-semibold px-8 py-4 rounded-lg hover:border-teal hover:text-teal transition-colors"
              >
                Download the Free Guide
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}