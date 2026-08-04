"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Star, GraduationCap, BookOpen } from "lucide-react";
import QuizSection from "@/components/QuizSection";
import { usePricing } from "@/components/GeoProvider";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease: "easeOut" },
} as const;

function Placeholder({ label, className = "" }: { label: string; className?: string }) {
  return (
    <div
      className={`bg-ink flex items-center justify-center text-cream/30 font-heading text-xs tracking-widest uppercase ${className}`}
    >
      {label}
    </div>
  );
}



const parentQuotes = [
  {
    quote:
      "This changed the way we talked after games. Our son became more confident, but more importantly, our relationship became stronger.",
    name: "Sarah M.",
    role: "Baseball Mom",
  },
  {
    quote:
      "I thought this was going to help my daughter. I didn't realize how much it would help me.",
    name: "Jennifer R.",
    role: "Hockey Mom",
  },
  {
    quote:
      "Practical guidance for the conversations and challenges every sports family faces. I only wish this had been available twenty years ago.",
    name: "Jim Kean",
    role: "Parent of Two Division I Athletes, Educator",
  },
  {
    quote:
      "Long Game was a game changer for our family. It challenged me to reflect on the kind of sports parent I wanted to be, and it helped save my relationship with my son. Every parent should go through it.",
    name: "Brian Creslink",
    role: "AAA Hickey Parent",
  },
];

const leaders = [
  {
    quote:
      "The Long Game Parent Development System is an outstanding resource for parents navigating youth sports. It helps families focus on what truly matters.",
    name: "Jay Wells",
    role: "18-Year NHL Veteran, 1994 Stanley Cup Champion",
    photo: "/team/jay-wells.jpg",
  },
  {
    quote:
      "It captures the realities of today's youth sports environment while giving families guidance that lasts beyond the season.",
    name: "Allan Ross",
    role: "Former Major League Baseball Scout",
    photo: "/team/allan-ross.jpg",
  },
  {
    quote:
      "It gives families a shared language for confidence, communication, and the relationship that lasts beyond the game.",
    name: "Doug Ouilette",
    role: "Vice President, Ancaster Baseball, U18 Wow Factor Head Coach",
    photo: "/team/doug-ouilette.jpg",
  },
];

const stats = [
  {
    stat: "70%",
    headline: "Children quit organized sports by age 13.",
    source: "Source: Aspen Institute / SFIA",
  },
  {
    stat: "#1",
    headline: 'Reason kids quit: "It stopped being fun."',
    source: "Source: Aspen Institute / Project Play",
  },
  {
    stat: "80%+",
    headline: "Parents believe they're being supportive.",
    source: "Source: Harvard Youth Sports Survey",
  },
];

const academyRows = [
  {
    term: "12 guided modules",
    detail: "Learn how to handle the moments sports parents face most.",
  },
  {
    term: "Real-world scripts",
    detail: "Simple language to keep close when conversations get hard.",
  },
  {
    term: "Worksheets & reflection",
    detail: "Turn what you learn into changes you can actually use.",
  },
  {
    term: "Glove Box Cards",
    detail: "Keep the most important reminders close when you need them.",
  },
];

const systemRows = [
  {
    term: "Common mistakes",
    detail: "See what can unintentionally make things harder.",
  },
  {
    term: "Better responses",
    detail: "Learn a more helpful way to respond.",
  },
  {
    term: "Try saying",
    detail: "Get practical words for difficult moments.",
  },
  {
    term: "Put it into practice",
    detail: "Use reflections and five-minute actions to make it stick.",
  },
];

const faqs = [
  {
    q: "Who is the Parent Academy designed for?",
    a: "The Parent Academy is for parents of athletes roughly ages 8–18, across all sports and competitive levels. The principles are universal — confidence, pressure, communication, setbacks, motivation, identity, burnout, and protecting the parent–athlete relationship.",
  },
  {
    q: "Is the Parent Academy for all sports?",
    a: "Yes. The challenges parents face in youth sports go far beyond any one game. Confidence, pressure, communication, setbacks, playing time, motivation and the parent–athlete relationship show up across every sport.",
  },
  {
    q: "How do I access the Parent Academy?",
    a: "After you purchase, you'll receive immediate access to the complete 12-module Parent Academy through your online account. You can work through it at your own pace on your phone, tablet or computer.",
  },
  {
    q: "Can I download or print the Parent Academy?",
    a: "The Parent Academy is designed to be accessed through your online account and cannot be downloaded as a complete course. Certain practical resources — including worksheets, reflection pages, checklists, cheat sheets and Glove Box Cards — can be downloaded or printed for personal use.",
  },
  {
    q: "Is this a subscription?",
    a: "No. It's a one-time purchase with no automatic renewal. Your purchase includes the complete Parent Academy plus 12 months of bonus access to the Long Game Library.",
  },
  {
    q: "Will new content be added?",
    a: "Yes. Your purchase includes the complete Parent Academy plus 12 months of access to our growing library of Field Guides, Practical Tools and select new resources added during your access period. There is no automatic renewal.",
  },
  {
    q: "What if I'm not satisfied?",
    a: "Your purchase is backed by our 14-Day Satisfaction Guarantee. You may request a full refund within 14 days of purchase, provided you have not consumed more than 25% of the Parent Development System.",
  },
  {
    q: "Do I have to complete the Parent Academy in order?",
    a: "No. You can work through all 12 modules in order or go directly to the topic you need right now. The Parent Academy is designed to work both ways.",
  },
];

/**
 * Text-only feature list: a term and one supporting line per row, separated by
 * hairline rules. Deliberately no icons or cards — typography and the dividers
 * carry the structure.
 */
function FeatureRows({ rows }: { rows: { term: string; detail: string }[] }) {
  return (
    <dl className="mt-10 border-t border-border-grey">
      {rows.map((row) => (
        <div key={row.term} className="border-b border-border-grey py-5">
          <dt className="font-heading text-base font-semibold text-charcoal mb-1.5">
            {row.term}
          </dt>
          <dd className="font-body text-sm text-text-body leading-relaxed">
            {row.detail}
          </dd>
        </div>
      ))}
    </dl>
  );
}

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

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const reduceMotion = useReducedMotion();
  const pricing = usePricing();

  return (
    <main className="flex flex-col min-h-screen bg-background text-charcoal">
      <Nav />

      {/* SECTION 1: HERO */}
      <section className="relative min-h-[90vh] flex items-center bg-ink text-cream overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.9 }}
          transition={{ duration: 2, ease: "easeOut", delay: 0.8 }}
          className="absolute inset-0"
        >
          <img
            src="/hero-mobile.jpg"
            alt="Young athlete reflecting alone on the stairs after practice"
            className="absolute inset-0 w-full h-full object-cover object-[center_15%] md:hidden"
          />
          <img
            src="/hero-desktop.jpg"
            alt="Young athlete reflecting alone on the stairs after practice"
            className="absolute inset-0 w-full h-full object-cover object-[center_15%] hidden md:block"
          />
        </motion.div>
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-ink/0 via-ink/70 to-background pointer-events-none" />
        <div className="relative max-w-7xl mx-auto w-full px-6 py-24">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut", delay: 2.2 }}
            className="max-w-xl"
          >
            <h1 className="hero-title font-heading mb-5">
              The journey matters.
              <br />
              So does the relationship waiting at the end of it.
            </h1>
            <p className="body-large font-body text-cream/80 mb-8">
              Practical guidance for sports parents who want to build confident
              athletes and stronger relationships.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/parent-academy"
                className="inline-flex items-center gap-2 bg-cream text-ink font-heading font-semibold text-[15px] px-6 py-3.5 rounded-lg hover:bg-cream/90 transition-colors"
              >
                Get the Parent Academy &rarr;
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      

      {/* SECTION 1B: TRUST BAR */}
      <section className="bg-background py-6 md:py-8 border-b border-border-grey">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="font-heading text-sm md:text-base font-medium text-charcoal">
            Trusted by parents and organizations across North America.
          </p>
        </div>
      </section>

      {/* SECTION 2: YOUTH SPORTS HAVE CHANGED */}
      <section className="max-w-7xl mx-auto w-full px-6 py-20 md:py-32 grid md:grid-cols-5 gap-12 md:gap-16 items-center">
        <motion.div {...fadeUp} className="md:col-span-3">
          <img src="/athlete-reflection.jpg" alt="Young athlete reflecting quietly in the locker room" className="w-full h-auto aspect-[4/3] object-cover rounded-lg" />
        </motion.div>
        <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.15 }}>
          <p className="font-heading text-teal text-sm font-semibold tracking-widest uppercase mb-4">
            Why Long Game Exists
          </p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6 leading-tight">
            Somewhere along the way, sport got heavier than it needed to be.
          </h2>
          <div className="font-body text-text-body leading-relaxed mb-6">
            <p className="mb-4">
              The game has changed since many of us played. Today&apos;s
              athletes carry pressure from every direction&mdash;parents,
              coaches, teammates, social media&mdash;and it follows them
              from the field to the car ride home to the quiet moments
              after.
            </p>
            <p className="mb-4">
              Most parents aren&apos;t looking for perfection. They&apos;re
              trying to help their child navigate a world of youth sports
              that looks nothing like the one they grew up in&mdash;without
              a roadmap for how.
            </p>
            <p className="font-semibold text-charcoal">
              That&apos;s what Long Game provides.
            </p>
          </div>
          <a         
            href="#quiz-section"
            className="font-heading text-sm font-semibold text-teal hover:underline"
          >
            See how it works &rarr;
          </a>
        </motion.div>
      </section>

      {/* SECTION 3: THE PARENT ACADEMY — copy left, product visual right */}
      <section className="max-w-6xl mx-auto w-full px-6 py-20 md:py-32">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          <motion.div {...fadeUp}>
            <GraduationCap
              className="w-7 h-7 text-teal mb-3"
              strokeWidth={1.5}
              aria-hidden="true"
            />
            <p className="font-heading text-teal text-sm font-semibold tracking-widest uppercase mb-4">
              The Parent Academy
            </p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6 leading-tight max-w-[440px]">
              A better way to parent through sports.
            </h2>
            <p className="font-body text-text-body leading-relaxed max-w-[480px] mb-4">
              Most parents want to help. The hard part is knowing what actually
              helps when confidence drops, pressure builds, failure hits, or
              sport starts affecting your relationship. The right guidance can
              change how those moments unfold.
            </p>
            <p className="font-body text-text-body leading-relaxed max-w-[480px]">
              <span className="font-semibold text-charcoal">
                This isn&apos;t about lowering expectations or making sport easier.
              </span>{" "}
              Kids still need standards, accountability, work ethic and
              challenge. It&apos;s about knowing how to push in ways that build
              confidence, resilience and a strong competitor &mdash; without
              damaging their relationship with the game or with you.
            </p>
            <FeatureRows rows={academyRows} />
          </motion.div>
          <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.15 }}>
            <div className="relative w-full aspect-[4/5] rounded-lg overflow-hidden">
              <Image
                src="/parent-portal-dashboard.png"
                alt="The Parent Portal home screen on a phone, asking what you need help with right now and listing situations such as a lost confidence, playing time, and a tense car ride home"
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-contain"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 4: THE QUIZ — FIND YOUR MOMENT */}
      <QuizSection />

      {/* SECTION 5: INSIDE THE SYSTEM — reader visual left on desktop, copy
          first on mobile (the visual is ordered ahead of it only at md+). */}
      <section className="max-w-6xl mx-auto w-full px-6 py-20 md:py-32">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          <motion.div {...fadeUp}>
            <BookOpen
              className="w-7 h-7 text-teal mb-3"
              strokeWidth={1.5}
              aria-hidden="true"
            />
            <p className="font-heading text-teal text-sm font-semibold tracking-widest uppercase mb-4">
              Inside the System
            </p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6 leading-tight max-w-[440px]">
              Practical guidance you can actually use.
            </h2>
            <p className="font-body text-text-body leading-relaxed max-w-[480px]">
              Understanding what&apos;s happening is only the beginning. Each
              module helps you avoid common mistakes, know what to say, and put
              what you&apos;ve learned into practice.
            </p>
            <FeatureRows rows={systemRows} />
          </motion.div>
          <motion.div
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.15 }}
            className="md:order-first"
          >
            <div className="relative w-full aspect-[4/5] rounded-lg overflow-hidden">
              <Image
                src="/module-reader.png"
                alt="A Parent Academy module open on a phone, showing the common mistake, a better response, a suggested line to try saying, and a reflection prompt"
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-contain"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 6: THE SIGNATURE IDEA — THE LONG GAME PRINCIPLE */}
      <section className="bg-ink text-cream py-20 md:py-32">
        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <motion.div {...fadeUp}>
            <img
              src="/youth-sports-changed.jpg"
              alt="Quiet car ride at dusk"
              className="w-full h-auto aspect-[4/3] object-cover rounded-lg grayscale contrast-[1.05]"
            />
          </motion.div>
          <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.15 }}>
            <h2 className="font-heading text-2xl md:text-3xl font-bold mb-2">
              The Long Game Principle&trade;
            </h2>
            <p className="font-heading text-5xl md:text-6xl font-bold text-teal mb-6">
              Fifteen minutes.
            </p>
            <p className="font-body text-cream/80 leading-relaxed mb-6">
              That&apos;s usually all it is. But what happens in that window
              after a hard game shapes how an athlete relates to failure, to
              sport, and to you—more than almost anything that happens on the
              field.
            </p>
            <p className="font-body text-cream/80 leading-relaxed mb-8">
              Long Game gives you a system for those fifteen minutes, and
              every other moment like them.
            </p>
            <a            
              href="#quiz-section"
              className="font-heading text-sm font-semibold text-teal hover:underline"
            >
              See what&apos;s inside the Academy &rarr;
            </a>
          </motion.div>
        </div>
      </section>

      {/* SECTION 7: PROOF (merged, one heading) */}
      <section className="bg-cream py-20 md:py-32">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <motion.h2 {...fadeUp} className="font-heading text-3xl md:text-4xl font-bold mb-3">
            What Parents Are Saying
          </motion.h2>
          <motion.p
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.05 }}
            className="font-body text-text-body mb-16 max-w-md mx-auto"
          >
            Trusted by sports parents &mdash; and the coaches, scouts, and leaders who know what matters most.
          </motion.p>
          <div className="grid md:grid-cols-2 gap-5 max-w-4xl mx-auto">
            {parentQuotes.map((q, i) => (
              <motion.figure
                key={q.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.1 }}
                className="bg-background border border-border-grey rounded-2xl p-7 md:p-8 text-left flex flex-col"
              >
                <div className="flex gap-1 mb-4" aria-label="Rated 5 out of 5">
                  {[...Array(5)].map((_, idx) => (
                    <Star key={idx} className="w-4 h-4 text-teal fill-teal" aria-hidden="true" />
                  ))}
                </div>
                <blockquote className="font-body italic text-base md:text-lg leading-relaxed mb-6 flex-1">
                  &ldquo;{q.quote}&rdquo;
                </blockquote>
                <figcaption className="border-t border-border-grey pt-4">
                  <p className="font-heading font-semibold text-sm">{q.name}</p>
                  <p className="font-body text-[13px] text-text-muted leading-snug">{q.role}</p>
                </figcaption>
              </motion.figure>
            ))}
          </div>

          {/* Endorsements — visually separated from the parent quotes above so
              "who stands behind this" doesn't blend into "what parents say". */}
          <div className="pt-16 mt-16 border-t border-border-grey max-w-4xl mx-auto">
            <motion.p {...fadeUp} className="font-heading text-teal text-[13px] font-semibold tracking-widest uppercase mb-3">
              Recognized By
            </motion.p>
            <motion.h3
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: 0.05 }}
              className="font-heading text-2xl md:text-3xl font-bold leading-tight mb-10 max-w-2xl mx-auto"
            >
              Coaches, scouts, and leaders who&apos;ve spent their careers around athletes.
            </motion.h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {leaders.map((l, i) => (
                <motion.div
                  key={l.name}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.4, ease: "easeOut", delay: i * 0.08 }}
                  className="bg-background border border-border-grey rounded-2xl p-7 text-center flex flex-col items-center"
                >
                  <div className="mb-4">
                    {l.photo ? (
                      <img
                        src={l.photo}
                        alt={l.name}
                        className="w-20 h-20 rounded-full object-cover object-top"
                      />
                    ) : (
                      <Placeholder label="Headshot" className="w-20 h-20 rounded-full" />
                    )}
                  </div>
                  <p className="font-heading text-base font-bold mb-1">{l.name}</p>
                  <p className="font-body text-[13px] text-text-muted leading-snug">{l.role}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8: THE REALITY PARENTS ARE FACING — moved below the proof
          section. Three figures, one line each, sourced. Nothing else. */}
      <section className="py-20 md:py-32" style={{ backgroundColor: "#F1F3F2" }}>
        <div className="max-w-6xl mx-auto px-6">
          <motion.h2 {...fadeUp} className="font-heading text-3xl md:text-4xl font-bold text-center mb-14">
            The Reality Parents Are Facing
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {stats.map((s, i) => (
              <motion.div
                key={s.stat}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.1 }}
                className="bg-ink rounded-[28px] p-10 md:p-12"
              >
                <p className="font-heading text-5xl md:text-6xl font-bold text-teal mb-5">{s.stat}</p>
                <h3 className="font-heading text-lg font-semibold text-cream mb-6 leading-snug">{s.headline}</h3>
                <p className="font-heading text-xs text-teal tracking-wide">{s.source}</p>
              </motion.div>
            ))}
          </div>
          <motion.div {...fadeUp} className="text-center">
            <Link href="/research-evidence" className="font-heading text-sm font-semibold text-teal hover:underline">
              Here&apos;s what the research shows. &rarr;
            </Link>
          </motion.div>
        </div>
      </section>

      <section id="pricing" className="w-full py-20 md:py-32">
        <div className="max-w-lg mx-auto px-6">
          <motion.div {...fadeUp} className="hidden md:block mb-8">
            <img
              src="/parent-portal-phone.png"
              alt="Parent Academy on mobile"
              className="w-full h-auto max-w-[280px] mx-auto"
            />
          </motion.div>
          <motion.div
            {...fadeUp}
            className="bg-ink text-cream rounded-[24px] max-w-[520px] mx-auto p-6 md:p-8"
          >
            <p className="font-heading text-teal text-[11px] font-semibold tracking-widest uppercase mb-3">
              The Parent Academy
            </p>
            <h2 className="font-heading text-2xl md:text-3xl font-bold mb-3 leading-tight">
              Everything You Need to Parent the Long Game
            </h2>
            <p className="font-body text-sm text-cream/70 leading-relaxed mb-6">
              Practical guidance for sports parents who want to build
              confident, resilient athletes while protecting the
              relationship that matters most.
            </p>

            <div className="flex items-end gap-2 mb-1">
              <span className="font-heading text-4xl font-bold">{pricing.amount}</span>
              <span className="font-heading text-xs text-cream/60 mb-1.5">
                {pricing.currency}
              </span>
            </div>
            <p className="font-heading text-teal text-[11px] font-semibold tracking-widest uppercase mb-1">
              Founding Price
            </p>
            <p className="font-body text-xs text-cream/60 mb-6">
              One-time payment &middot; Regular price{" "}
              <span className="line-through">{pricing.regular}</span>
            </p>

            <Link
              href="/parent-academy"
              className="flex items-center justify-center gap-2 bg-cream text-ink font-heading font-semibold text-sm px-6 py-3 rounded-lg hover:bg-cream/90 transition-colors mb-3"
            >
              Get the Parent Academy &rarr;
            </Link>
            <Link
              href="/parent-academy"
              className="block text-center font-heading text-xs font-semibold text-teal hover:underline mb-6"
            >
              See Everything Included &rarr;
            </Link>

            <div className="border-t border-cream/10 pt-2 mb-6">
              <p className="font-heading text-teal text-[11px] font-semibold tracking-widest uppercase mb-2">
                Included
              </p>
              <ul className="font-body text-sm space-y-0">
                {[
                  "12 practical parent-development modules",
                  "165+ pages of proven guidance",
                  "Fillable worksheets & reflection pages",
                  "Confidence, pressure & resilience strategies",
                  "Practical scripts for difficult conversations",
                  "Immediate access on all devices",
                  "Works for all sports and competitive levels",
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
                12 Months of Long Game Library Access
              </p>
              <p className="font-body text-xs text-cream/60 leading-relaxed mb-4">
                Field Guides, Practical Tools and select new resources to help
                with the moments that come next.
              </p>
              <p className="font-heading text-sm font-semibold mb-1">
                Long Game Glove Box Cards
              </p>
              <p className="font-body text-xs text-cream/60 leading-relaxed">
                Quick reminders and conversation starters for the moments
                that matter most.
              </p>
            </div>

            <p className="font-body text-xs text-cream/60 border-t border-cream/10 pt-4 mb-4">
              Designed for parents of athletes ages 8&ndash;18 across every
              competitive sport.
            </p>

            <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-[11px] font-body text-cream/60 mb-2">
              <span className="flex items-center gap-1.5"><span className="text-teal">&#10003;</span> Secure Checkout</span>
              <span className="flex items-center gap-1.5"><span className="text-teal">&#10003;</span> Instant Access</span>
              <span className="flex items-center gap-1.5"><span className="text-teal">&#10003;</span> One-Time Purchase</span>
            </div>
            <p className="text-[11px] font-body text-cream/60 mb-6">
              14-Day Satisfaction Guarantee &mdash; Full refund available within
              14 days, provided no more than 25% of the Parent Development
              System has been consumed. If more than 25% of the content has
              been completed, no refund will be issued.
            </p>

            <div className="border-t border-cream/10 pt-6 flex flex-wrap justify-center items-center gap-3">
              <span className="border border-cream/20 rounded-lg px-4 py-2.5 font-heading font-bold italic text-[#1A1F71] text-sm bg-white">
                VISA
              </span>
              <span className="bg-[#1A1A1A] rounded-lg px-4 py-2.5 flex items-center">
                <span className="w-4 h-4 rounded-full bg-[#EB001B]" />
                <span className="w-4 h-4 rounded-full bg-[#F79E1B] -ml-2" />
              </span>
              <span className="bg-[#1F72CD] text-white rounded-lg px-4 py-2.5 font-heading font-bold text-sm">
                AMEX
              </span>
              <span className="bg-[#635BFF] text-white rounded-lg px-4 py-2.5 font-heading font-bold text-sm">
                stripe
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 10A: FAQ */}
      <section className="max-w-3xl mx-auto w-full px-6 py-20 md:py-32">
        <h2 className="font-heading text-2xl md:text-3xl font-bold text-center mb-12">
          Common Questions
        </h2>
        <Accordion items={faqs} openIndex={openFaq} setOpenIndex={setOpenFaq} />
      </section>

      {/* SECTION 10B: BUILT FROM EXPERIENCE. CREATED WITH PURPOSE. */}
      <section className="max-w-6xl mx-auto w-full px-6 py-20 md:py-32 grid md:grid-cols-2 gap-14 md:gap-16 items-center">
        <motion.div {...fadeUp}>
          <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
            <Image
              src="/our-story-documentary.jpg"
              alt="A coach's notebook, pen and whistle resting on a courtside bench at night, with players and parents gathered out of focus in the background"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </motion.div>
        <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.15 }}>
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6 leading-tight">
            Built from experience.
            <br />
            Created with purpose.
          </h2>
          <div className="font-body text-text-body leading-relaxed mb-8">
            <p className="mb-4">
              Long Game wasn&apos;t built in a boardroom&mdash;it came from years coaching young athletes and walking alongside sports families through the same conversations, again and again.
            </p>
            <p className="font-semibold text-charcoal">
              Long Game exists because families deserve support too.
            </p>
          </div>
          <p className="font-heading font-semibold">Shawn Dixon</p>
          <p className="font-body text-sm text-text-muted mb-8">
            Coach &middot; Parent &middot; Author
            <br />
            Author of <span className="italic">Raising an Athlete: Built for the Long Game</span>
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 border-t border-border-grey pt-8">
            <div>
              <p className="font-heading text-sm font-semibold mb-1">
                Amazon #1 Best Selling Author
              </p>
              <p className="font-body text-xs text-text-muted">
                Raising an Athlete: Built for the Long Game.
              </p>
            </div>
            <div>
              <p className="font-heading text-sm font-semibold mb-1">Built for Sports Families</p>
              <p className="font-body text-xs text-text-muted">
                Created to support parents, athletes, teams, and organizations
                through every stage of the journey.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* SECTION: FINAL CLOSE */}
      <section className="max-w-6xl mx-auto w-full px-6 pt-20 pb-20 md:pt-32 md:pb-28">
        <motion.h2 {...fadeUp} className="font-heading text-3xl md:text-4xl font-bold text-center mb-10 leading-tight">
          The Game Will End.
          <br />
          The Relationship Won&apos;t.
        </motion.h2>
        <motion.div {...fadeUp}>
          <img
            src="/duffel-bag-stadium.jpg"
            alt="Duffel bag left on a wet stadium parking lot at night"
            className="w-full h-auto max-w-3xl mx-auto rounded-2xl"
          />
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}















