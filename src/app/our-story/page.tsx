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

export default function OurStoryPage() {
  return (
    <main className="flex flex-col min-h-screen bg-white text-charcoal">
      <Nav />

      {/* SECTION 1 - HERO */}
      <section className="bg-white w-full">
        <div className="max-w-6xl mx-auto w-full px-6 py-20 md:py-28 grid md:grid-cols-2 gap-12 items-center">
          <motion.div {...fadeUp}>
            <h1 className="font-heading text-4xl md:text-5xl font-bold leading-tight mb-6">
              Why Long Game Exists
            </h1>
            <p className="font-body text-lg text-text-body mb-4">
              Long Game wasn&apos;t built to sell a course.
            </p>
            <p className="font-body text-lg text-text-body mb-4">
              It was built to solve a problem.
            </p>
            <p className="font-body text-lg text-text-body mb-4">
              Years spent coaching young athletes. Years navigating youth
              sports as a parent. And one ordinary car ride that changed how
              I saw it all.
            </p>
            <p className="font-body text-lg text-text-body mb-4">
              I realized the biggest influence on a young athlete often
              isn&apos;t the coach.
            </p>
            <p className="font-body text-lg text-text-body mb-8">
              It&apos;s the parent beside them on the drive home.
            </p>
            <Link
              href="/parent-academy"
              className="inline-block bg-charcoal text-white font-heading font-semibold px-8 py-4 rounded-full hover:bg-charcoal/90 transition-colors"
            >
              Explore the Parent Academy
            </Link>
          </motion.div>

          <motion.div
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.15 }}
            className="aspect-[4/3] rounded-2xl bg-ink flex items-center justify-center"
          >
            <span className="font-heading text-sm tracking-widest uppercase text-cream/40">
              Photo Placeholder
            </span>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2 - THREE WORDS I'LL NEVER FORGET */}
      <section className="bg-cream w-full">
        <div className="max-w-6xl mx-auto w-full px-6 py-20 md:py-28 grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            {...fadeUp}
            className="aspect-[4/3] rounded-2xl bg-ink flex items-center justify-center"
          >
            <span className="font-heading text-sm tracking-widest uppercase text-cream/40">
              Photo Placeholder
            </span>
          </motion.div>

          <motion.div {...fadeUp} className="max-w-md">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
              Three Words I&apos;ll Never Forget
            </h2>
            <div className="font-body text-lg text-charcoal/80 leading-relaxed space-y-4">
              <p>Coh was twelve.</p>
              <p>Cold spring night.</p>
              <p>Three strikeouts.</p>
              <p>We got in the truck. Heater blasting. Silence.</p>
              <p>Finally I said,</p>
              <p className="italic">&ldquo;You&apos;ve got to want it more than that.&rdquo;</p>
              <p>He stared out the window.</p>
              <p>Then quietly said,</p>
              <p className="italic">&ldquo;I am trying, Dad.&rdquo;</p>
              <p>Those three words changed me.</p>
              <p>Years of coaching had taught me a great deal about athletes.</p>
              <p>
                Those three words taught me something even more important.
              </p>
              <p>That truck is where Long Game truly began.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 3 - YEARS OF COACHING CHANGED HOW I SAW THE GAME */}
      <section className="bg-white w-full">
        <div className="max-w-6xl mx-auto w-full px-6 py-20 md:py-28 grid md:grid-cols-2 gap-12 items-center">
          <motion.div {...fadeUp} className="order-2 md:order-1">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
              Years of Coaching Changed How I Saw the Game
            </h2>
            <div className="font-body text-lg text-text-body leading-relaxed space-y-4">
              <p>Years of coaching taught me to recognize patterns.</p>
              <p>Talented athletes losing confidence.</p>
              <p>
                Parents trying their best but unknowingly adding pressure.
              </p>
              <p>Kids who didn&apos;t need another coach.</p>
              <p>They needed a safe place to fail.</p>
              <p>Coaching taught me what athletes needed.</p>
              <p>Parenting taught me why it mattered.</p>
            </div>
          </motion.div>

          <motion.div
            {...fadeUp}
            className="aspect-[4/3] rounded-2xl bg-ink flex items-center justify-center order-1 md:order-2"
          >
            <span className="font-heading text-sm tracking-widest uppercase text-cream/40">
              Photo Placeholder
            </span>
          </motion.div>
        </div>
      </section>

      {/* SECTION 4 - I NEEDED TO UNDERSTAND WHY */}
      <section className="bg-cream w-full">
        <div className="max-w-3xl mx-auto w-full px-6 py-20 md:py-28 text-center">
          <motion.div {...fadeUp}>
            <h2 className="font-heading text-3xl md:text-5xl font-bold mb-8">
              I Needed to Understand Why
            </h2>
            <div className="font-body text-xl text-charcoal/80 leading-relaxed space-y-4">
              <p>That moment didn&apos;t convince me I had the answers.</p>
              <p>It convinced me I had more to learn.</p>
              <p>
                I immersed myself in confidence, communication, sports
                psychology, resilience, and athlete development.
              </p>
              <p>One truth kept emerging.</p>
              <p>We spend countless hours developing athletes.</p>
              <p>Almost none helping parents develop alongside them.</p>
              <p>That gap became impossible to ignore.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 5 - WHAT WE BELIEVE */}
      <section className="bg-ink w-full">
        <div className="max-w-3xl mx-auto w-full px-6 py-20 md:py-28 text-center">
          <motion.div {...fadeUp}>
            <h2 className="font-heading text-3xl md:text-5xl font-bold mb-8 text-cream">
              What We Believe
            </h2>
            <div className="font-body text-xl text-cream/80 leading-relaxed space-y-4 mb-10">
              <p>
                Long Game exists to help parents become the steady voice
                their athletes need most.
              </p>
              <p>Not because parents don&apos;t care.</p>
              <p>
                Because no one teaches them how to navigate the emotional
                side of youth sports.
              </p>
              <p>We believe sport should build people, not just players.</p>
              <p>The game will end.</p>
              <p>The relationship won&apos;t.</p>
              <p className="font-heading font-semibold text-teal">
                That&apos;s the Long Game.
              </p>
            </div>
            <Link
              href="/parent-academy"
              className="inline-block bg-teal text-charcoal font-heading font-semibold px-8 py-4 rounded-full hover:bg-teal-dark transition-colors"
            >
              Explore the Parent Academy
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}




