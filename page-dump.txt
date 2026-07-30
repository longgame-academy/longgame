"use client";

import { useState } from "react";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Shield, MessageCircle, TrendingUp, Heart, Star } from "lucide-react";
import QuizSection from "@/components/QuizSection";

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

const pillars = [
  {
    title: "Build Confidence",
    hard: "Confidence isn't built by comfort. It's earned through hard work, real failure, and wins nobody handed them.",
    helps: "Long Game shows you when to step back and when to push.",
    icon: Shield,
  },
  {
    title: "Strengthen Communication",
    hard: "That inner voice isn't theirs alone. It's built from every car ride, every sideline comment, every word you've ever said.",
    helps: "Long Game gives you the scripts for the conversations that shape it.",
    icon: MessageCircle,
  },
  {
    title: "Develop Resilience",
    hard: "Failure isn't the opposite of development. It's development. That's sport — not a setback.",
    helps: "Long Game gives you the process — feel it, reflect on it, learn from it.",
    icon: TrendingUp,
  },
  {
    title: "Protect the Relationship",
    hard: "What's left after the games end isn't the scoreboard. It's whatever relationship you actually built along the way.",
    helps: "Long Game helps you build it while there's still time.",
    icon: Heart,
  },
];

const pathways = [
  {
    label: "FOR PARENTS",
    body: "A parent development system designed to help you navigate confidence, pressure, communication, setbacks, and the moments that shape your athlete's experience.",
    button: "Explore the Parent System",
    href: "/parent-academy",
  },
  {
    label: "FOR ORGANIZATIONS",
    body: "A way for clubs, teams, and associations to support families with a shared language, practical tools, and a healthier parent experience.",
    button: "Organization Solutions",
    href: "/organizations",
  },
  {
    label: "START WITH THE BOOK",
    body: "Begin with Raising an Athlete: Built for the Long Game, the book that introduced the Long Game philosophy to sports families.",
    button: "Discover the Book",
    href: "/our-story",
  },
];

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
    body: "Most don't leave because they aren't talented. They leave because the experience stopped being fun.",
    source: "Source: Aspen Institute / SFIA",
  },
  {
    stat: "#1",
    headline: 'Reason kids quit sports: "It stopped being fun."',
    body: "Pressure, adult expectations, and burnout consistently rank among the biggest reasons children walk away.",
    source: "Source: Aspen Institute / Project Play",
  },
  {
    stat: "80%+",
    headline: "Parents believe they're being supportive.",
    body: "Many athletes experience the same behaviours as pressure. Perception matters more than intention.",
    source: "Source: Harvard Youth Sports Survey",
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

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const reduceMotion = useReducedMotion();

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
            alt="Father and son walking off the field"
            className="absolute inset-0 w-full h-full object-cover object-[center_15%] md:hidden"
          />
          <img
            src="/hero-desktop.jpg"
            alt="Young athlete sitting alone reflecting after a game"
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
      <section className="max-w-7xl mx-auto w-full px-6 py-16 md:py-24 grid md:grid-cols-5 gap-12 items-center">
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
              The pressure found its way into the car ride home, the dinner
              table, and conversations families never expected to have. Most
              parents aren&apos;t looking for perfection. They&apos;re trying
              to do right by the child they love—without a system for how.
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

      {/* SECTION 4: THE QUIZ — FIND YOUR MOMENT (moved up) */}
      <QuizSection />

      {/* SECTION 3.5: THE REALITY PARENTS ARE FACING */}
      <section className="pt-4 pb-16 md:pt-8 md:pb-24" style={{ backgroundColor: "#F1F3F2" }}>
        <div className="max-w-6xl mx-auto px-6">
          <motion.h2 {...fadeUp} className="font-heading text-3xl md:text-4xl font-bold text-center mb-10">
            The Reality Parents Are Facing
          </motion.h2>
          <motion.div
            {...fadeUp}
            className="bg-background border border-border-grey rounded-2xl p-8 md:p-10 mb-10"
          >
            <p
              className="font-heading text-xs font-semibold uppercase mb-4"
              style={{ letterSpacing: "0.18em", color: "#858C89" }}
            >
              Research &amp; Evidence
            </p>
            <h3 className="font-heading text-xl font-semibold mb-3 leading-snug">
              The challenges facing sports families are well documented.
            </h3>
            <p className="font-body text-text-body leading-relaxed mb-6">
              These findings help explain why young athletes lose confidence,
              experience burnout, and walk away from the game.
            </p>
            <Link href="/research-evidence" className="font-heading text-sm font-semibold text-teal hover:underline">
              Here&apos;s what the research shows. &rarr;
            </Link>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {stats.map((s, i) => (
              <motion.div
                key={s.stat}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.1 }}
                className="bg-ink rounded-[28px] p-10 md:p-12"
              >
                <p className="font-heading text-5xl md:text-6xl font-bold text-teal mb-6">{s.stat}</p>
                <h3 className="font-heading text-lg font-semibold text-cream mb-3 leading-snug">{s.headline}</h3>
                <p className="font-body text-sm leading-relaxed mb-6" style={{ color: "#B8BDBD" }}>
                  {s.body}
                </p>
                <p className="font-heading text-xs text-teal tracking-wide">{s.source}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* SECTION 2.5: WHAT WE BELIEVE (rebuilt, moved down) */}
      <section className="bg-white w-full">
        <div className="max-w-7xl mx-auto w-full px-6 py-16 md:py-24">
          <motion.div {...fadeUp} className="text-center max-w-2xl mx-auto mb-16">
            <p className="font-heading text-teal text-sm font-semibold tracking-widest uppercase mb-4">
              Our Philosophy
            </p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6 leading-tight">
              We don&apos;t believe in lowering the standard.
              <br />
              We believe in changing how parents help young athletes rise to it.
            </h2>
            <p className="font-body text-text-body leading-relaxed">
              Long Game isn&apos;t about making sports easier &mdash; it&apos;s about helping
              you guide your athlete through the hard parts, not around them.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-5 max-w-3xl mx-auto">
            {pillars.map((p, i) => (
              <motion.div
                key={p.title}
                initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, ease: "easeOut", delay: reduceMotion ? 0 : i * 0.09 }}
                className="bg-white border border-border-grey rounded-md p-7 text-left transition-colors hover:border-teal hover:shadow-[0_4px_16px_rgba(18,21,20,0.08)]"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-full bg-background flex items-center justify-center shrink-0">
                    <p.icon className="w-4 h-4 text-teal" strokeWidth={2} aria-hidden="true" />
                  </div>
                  <h3 className="font-heading text-lg font-semibold">{p.title}</h3>
                </div>
                <p className="font-body italic text-sm text-charcoal/70 leading-relaxed mb-3">
                  {p.hard}
                </p>
                <motion.div
                  initial={reduceMotion ? false : { scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.4, ease: "easeOut", delay: reduceMotion ? 0 : i * 0.09 + 0.15 }}
                  className="w-7 h-0.5 bg-teal origin-left mb-3"
                />
                <p className="font-heading font-bold text-charcoal leading-snug">
                  <span className="text-teal">&rarr;</span> {p.helps}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: THE SIGNATURE IDEA — THE LONG GAME PRINCIPLE */}
      <section className="bg-ink text-cream py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
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

      {/* SECTION 5: PROOF (merged, one heading) */}
      <section className="bg-cream py-16 md:py-24">
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
          <div className="space-y-14 max-w-4xl mx-auto">
            {parentQuotes.map((q, i) => (
              <motion.div
                key={q.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.1 }}
                className="text-center border-b border-border-grey pb-14 last:border-0"
              >
                <p className="font-body italic text-xl md:text-2xl leading-relaxed mb-5">
                  &ldquo;{q.quote}&rdquo;
                </p>
                <div className="flex justify-center gap-1 mb-4">
                  {[...Array(5)].map((_, idx) => (
                    <Star key={idx} className="w-4 h-4 text-teal fill-teal" />
                  ))}
                </div>
                <p className="font-heading font-semibold text-sm">{q.name}</p>
                <p className="font-heading text-xs text-teal tracking-wide">{q.role}</p>
              </motion.div>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-6 md:gap-10 pt-14 mt-14 border-t border-border-grey max-w-3xl mx-auto">
            {leaders.map((l, i) => (
              <motion.div
                key={l.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, ease: "easeOut", delay: i * 0.08 }}
                className="text-center"
              >
                {l.photo ? (
                  <img
                    src={l.photo}
                    alt={l.name}
                    className="w-20 h-20 md:w-24 md:h-24 rounded-full mx-auto mb-4 object-cover object-top"
                  />
                ) : (
                  <Placeholder label="Headshot" className="w-20 h-20 md:w-24 md:h-24 rounded-full mx-auto mb-4" />
                )}
                <p className="font-heading font-semibold text-sm">{l.name}</p>
                <p className="font-heading text-xs text-teal tracking-wide leading-snug">{l.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 8: WHAT'S INSIDE */}
      <section className="bg-cream py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div {...fadeUp} className="text-center mb-14">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              What&apos;s Inside
            </h2>
            <p className="font-body text-text-body max-w-xl mx-auto leading-relaxed">
              A look at the system, on the device you&apos;ll actually use it on.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { label: "Module Library", image: "/long-game-experience.png" },
              { label: "Worksheets", image: "/org-family-access.png" },
              { label: "Glove Box Cards", image: "/org-admin-phones.png" },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.12 }}
                className="text-center"
              >
                <div className="h-[340px] flex items-center justify-center mb-4">
                  <img
                    src={item.image}
                    alt={item.label}
                    className="max-h-full max-w-full w-auto h-auto object-contain mx-auto"
                  />
                </div>
                <p className="font-heading text-sm font-semibold text-charcoal">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="w-full py-4 md:py-8">
        <div className="max-w-lg mx-auto px-5 md:px-6">
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
              <span className="font-heading text-4xl font-bold">$97</span>
              <span className="font-heading text-xs text-cream/60 mb-1.5">USD</span>
            </div>
            <p className="font-heading text-teal text-[11px] font-semibold tracking-widest uppercase mb-1">
              Founding Member Price
            </p>
            <p className="font-body text-xs text-cream/60 mb-6">
              One-time payment &middot; Regular price{" "}
              <span className="line-through">$147</span>
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
                  "Lifetime access & future updates",
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

            <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-[11px] font-body text-cream/60">
              <span className="flex items-center gap-1.5"><span className="text-teal">&#10003;</span> Secure Checkout</span>
              <span className="flex items-center gap-1.5"><span className="text-teal">&#10003;</span> Instant Access</span>
              <span className="flex items-center gap-1.5"><span className="text-teal">&#10003;</span> One-Time Purchase</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION: BUILT FOR THE LONG GAME (TRUST/PAYMENT BADGES) */}
      <section className="bg-background py-16 md:py-20">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <motion.h2 {...fadeUp} className="font-heading text-3xl md:text-4xl font-bold mb-4">
            Built for the Long Game
          </motion.h2>
          <motion.div {...fadeUp} className="w-12 h-0.5 bg-teal mx-auto mb-8" />
          <motion.p {...fadeUp} className="font-body text-text-body leading-relaxed mb-10">
            You&apos;re making an investment in the relationship that matters
            most. Get instant access today, and if you&apos;re not completely
            satisfied within 30 days, we&apos;ll make it right.
          </motion.p>
          <motion.div {...fadeUp} className="flex flex-wrap justify-center items-center gap-4">
            <span className="border border-border-grey rounded-lg px-5 py-3 font-heading font-bold italic text-[#1A1F71] text-sm bg-white">
              VISA
            </span>
            <span className="bg-[#1A1A1A] rounded-lg px-5 py-3 flex items-center">
              <span className="w-4 h-4 rounded-full bg-[#EB001B]" />
              <span className="w-4 h-4 rounded-full bg-[#F79E1B] -ml-2" />
            </span>
            <span className="bg-[#1F72CD] text-white rounded-lg px-5 py-3 font-heading font-bold text-sm">
              AMEX
            </span>
            <span className="bg-[#635BFF] text-white rounded-lg px-5 py-3 font-heading font-bold text-sm">
              stripe
            </span>
          </motion.div>
        </div>
      </section>

      {/* SECTION: OTHER PATHS (DEMOTED PATHWAYS) */}
      <section className="bg-ink text-cream py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div {...fadeUp} className="text-center mb-14">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Other paths.
            </h2>
            <p className="font-body text-cream/70 max-w-xl mx-auto leading-relaxed">
              Every family enters from a different place. Start where it makes the most sense.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {pathways.map((p, i) => (
              <motion.div
                key={p.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.12 }}
                className="border border-cream/15 rounded-2xl p-8 flex flex-col shadow-[0_4px_16px_rgba(18,21,20,0.08)]"
              >
                <p className="font-heading text-teal text-xs font-semibold tracking-widest uppercase mb-4">
                  {p.label}
                </p>
                <p className="font-body text-cream/80 leading-relaxed mb-8 flex-1">{p.body}</p>
                <Link
                  href={p.href}
                  className="font-heading text-sm font-semibold text-teal hover:underline"
                >
                  {p.button} &rarr;
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6.5: FAQ (moved here) */}
      <section className="max-w-3xl mx-auto w-full px-6 py-20">
        <h2 className="font-heading text-2xl md:text-3xl font-bold text-center mb-12">
          Common Questions
        </h2>
        <Accordion items={faqs} openIndex={openFaq} setOpenIndex={setOpenFaq} />
      </section>

      {/* SECTION 7: BUILT FROM EXPERIENCE. CREATED WITH PURPOSE. (moved here) */}
      <section className="max-w-6xl mx-auto w-full px-6 py-20 md:py-28 grid md:grid-cols-2 gap-14 items-center">
        <motion.div {...fadeUp}>
          <Placeholder label="Documentary Photo" className="aspect-[4/3] rounded-lg" />
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
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 border-t border-border-grey pt-8">
            <div>
              <p className="font-heading text-sm font-semibold mb-1">Years of Coaching</p>
              <p className="font-body text-xs text-text-muted">
                Helping young athletes and sports families navigate the youth
                sports journey.
              </p>
            </div>
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
      <section className="max-w-6xl mx-auto w-full px-6 pt-16 pb-16 md:pt-20 md:pb-20">
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















