"use client";

import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Heart, MessageCircle, Flame, Compass } from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7, ease: "easeOut" },
} as const;



const beliefs = [
  {
    title: "Relationships Matter More Than Results",
    body: "Strong relationships create athletes who stay in the game longer.",
    icon: Heart,
  },
  {
    title: "Confidence Is Built Through Everyday Conversations",
    body: "The words parents choose shape how athletes see themselves.",
    icon: MessageCircle,
  },
  {
    title: "Hard Work Should Never Be Optional",
    body: "Growth comes from discipline, effort, accountability, and showing up when it's difficult.",
    icon: Flame,
  },
  {
    title: "Adversity Is Part of Development",
    body: "The goal isn't to remove hard moments. It's to help athletes learn how to respond to them.",
    icon: Compass,
  },
];

export default function OurStoryPage() {
  return (
    <main className="flex flex-col min-h-screen bg-white text-charcoal">
      <Nav />

      {/* SECTION 1: HERO */}
      <section className="bg-white w-full">
        <div className="max-w-6xl mx-auto w-full px-6 py-20 md:py-28 grid md:grid-cols-[11fr_9fr] gap-12 items-center">
          <motion.div {...fadeUp} className="text-left">
            <p className="font-heading text-teal text-xs font-semibold tracking-widest uppercase mb-4">
              Our Story
            </p>
            <h1 className="font-heading text-4xl md:text-5xl font-bold leading-tight mb-6">
              Why Long Game Exists
            </h1>
            <div className="font-body text-lg text-text-body leading-relaxed space-y-4 mb-8">
              <p>
                Every season tells a different story. Some end with
                championships. Others end with disappointment.
              </p>
              <p>
                But long after the final score is forgotten, one thing
                remains&mdash;the relationship between a parent and their
                athlete.
              </p>
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

      {/* SECTION 3: WHO'S BEHIND LONG GAME */}
      <section className="bg-background w-full">
        <div className="max-w-3xl mx-auto w-full px-6 py-20 md:py-28">
          <motion.div {...fadeUp} className="text-left">
            <p className="font-heading text-teal text-xs font-semibold tracking-widest uppercase mb-4">
              The People Behind Long Game
            </p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6 leading-tight">
              Long Game is built by coaches, parents, and people who&apos;ve
              spent their careers around athletes&mdash;not one voice, one
              season, or one sport.
            </h2>
            <div className="font-body text-lg text-text-body leading-relaxed space-y-4">
              <p>
                We&apos;ve sat through the quiet car rides home. We&apos;ve
                had the hard conversations with coaches. We&apos;ve watched
                a kid lose their confidence, and worked to help them find it
                again.
              </p>
              <p>That&apos;s not a tagline. It&apos;s who&apos;s actually building this.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 4: THE HARDEST MOMENTS */}
      <section className="bg-white w-full">
        <div className="max-w-3xl mx-auto w-full px-6 py-20 md:py-28 text-left">
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
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {beliefs.map((b, i) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.1 }}
                className="border border-cream/15 rounded-2xl p-8"
              >
                <b.icon
                  className="w-7 h-7 text-teal mb-4"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                <h3 className="font-heading text-lg font-semibold text-cream mb-3">{b.title}</h3>
                <p className="font-body text-sm text-cream/70 leading-relaxed">{b.body}</p>
              </motion.div>
            ))}
          </div>
          <motion.p {...fadeUp} className="font-heading font-semibold text-teal text-center mt-14">
            That&apos;s the Long Game.
          </motion.p>
        </div>
      </section>

      {/* SECTION 7: FINAL CTA */}
      <section className="bg-white w-full">
        <div className="max-w-3xl mx-auto w-full px-6 pt-20 md:pt-28 pb-20 md:pb-28 text-center">
          <motion.div {...fadeUp}>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
              Ready to Start Your Long Game?
            </h2>
            <p className="font-body text-lg text-text-body leading-relaxed mb-10 max-w-2xl mx-auto text-left">
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