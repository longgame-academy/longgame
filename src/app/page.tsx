"use client";

import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Shield, MessageCircle, TrendingUp, Heart } from "lucide-react";

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
    body: "Helping athletes develop confidence that lasts longer than a great game or a winning season.",
    icon: Shield,
  },
  {
    title: "Strengthen Communication",
    body: "Creating better conversations before practice, after games, and in the moments that matter most.",
    icon: MessageCircle,
  },
  {
    title: "Develop Resilience",
    body: "Helping families navigate setbacks, mistakes, pressure, and adversity with perspective and purpose.",
    icon: TrendingUp,
  },
  {
    title: "Protect the Relationship",
    body: "Because one day the games will end, but your relationship with your athlete is just getting started.",
    icon: Heart,
  },
];

const moments = [
  {
    title: "After the Tough Game",
    body: "Knowing what to say when emotions are high, and what to leave for another day.",
    image: "/moment-tough-game.jpg",
  },
  {
    title: "When Confidence Disappears",
    body: "Helping athletes rebuild belief without adding more pressure.",
    image: "/moment-confidence.jpg",
  },
  {
    title: "When Your Athlete Wants to Quit",
    body: "Separating a difficult day from a decision they may remember for years.",
    image: "/moment-quit.jpg",
  },
  {
    title: "When Dealing with Coaches Becomes Difficult",
    body: "Responding with perspective instead of emotion.",
    image: "/moment-coaches.jpg",
  },
  {
    title: "When Sports Start Affecting Life at Home",
    body: "Keeping your family connected, even during the hardest seasons.",
    image: "/moment-home.jpg",
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
    quote: "Every parent involved in youth sports should read this.",
    name: "Jay Wells",
    role: "Stanley Cup Champion",
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
      "The Long Game Parent Development System is an outstanding resource for parents navigating youth sports. It helps families focus on what truly matters—confidence, communication, development, and the relationship that lasts beyond the game.",
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

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen bg-background text-charcoal">
      <Nav />

      {/* SECTION 1: HERO */}
      <section className="relative min-h-[90vh] flex items-center bg-ink text-cream overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ duration: 2, ease: "easeOut", delay: 0.8 }}
          className="absolute inset-0"
        >
          <img
            src="/hero-mobile.jpg"
            alt="Father and son walking off the field"
            className="absolute inset-0 w-full h-full object-cover object-[center_30%] md:hidden"
          />
          <img
            src="/hero-desktop.jpg"
            alt="Young athlete sitting alone reflecting after a game"
            className="absolute inset-0 w-full h-full object-cover object-[center_30%] hidden md:block"
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
            <h1 className="font-heading text-4xl md:text-6xl font-bold leading-tight mb-6">
              The journey matters.
              <br />
              So does the relationship waiting at the end of it.
            </h1>
            <p className="font-body text-lg text-cream/80 leading-relaxed mb-10">
              Practical guidance for sports parents who want to build confident
              athletes and stronger relationships.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/parent-academy"
                className="inline-flex items-center gap-2 bg-cream text-ink font-heading font-semibold px-6 py-3 rounded-lg hover:bg-cream/90 transition-colors"
              >
                Explore Long Game
              </Link>
              <Link
                href="/organizations"
                className="inline-flex items-center gap-2 border border-cream/30 text-cream font-heading font-semibold px-6 py-3 rounded-lg hover:border-teal hover:text-teal transition-colors"
              >
                For Organizations
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: YOUTH SPORTS HAVE CHANGED */}
      <section className="max-w-7xl mx-auto w-full px-6 py-20 md:py-28 grid md:grid-cols-5 gap-12 items-center">
        <motion.div {...fadeUp} className="md:col-span-3">
          <img src="/youth-sports-changed.jpg" alt="Youth sports have changed" className="w-full h-auto aspect-[4/3] object-cover rounded-lg" />
        </motion.div>
        <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.15 }}>
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6 leading-tight">
            Youth sports have changed.
            <br />
            So has the experience of raising an athlete.
          </h2>
          <div className="font-body text-text-body leading-relaxed space-y-4">
            <p>
              Somewhere along the way, youth sports became more than practices and
              weekend games.
            </p>
            <p>
              The pressure found its way into the car ride home, the dinner table,
              and conversations families never expected to have.
            </p>
            <p>
              Most parents aren&apos;t looking for perfection. They&apos;re simply
              trying to do what&apos;s best for the child they love.
            </p>
            <p className="font-semibold text-charcoal">That&apos;s why Long Game exists.</p>
          </div>
        </motion.div>
      </section>

      {/* SECTION 3: THE LONG GAME APPROACH */}
      <section className="bg-cream py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div {...fadeUp}>
            <p className="font-heading text-teal text-sm font-semibold tracking-widest uppercase mb-4">
              The Long Game Approach
            </p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
              A different way to support sports families.
            </h2>
            <p className="font-body text-text-body leading-relaxed max-w-2xl mx-auto mb-16">
              Long Game was created to help sports parents navigate the moments
              that matter most. The conversations after difficult games. The
              pressure that quietly builds over time. The confidence that can
              disappear overnight. The challenge of encouraging without pushing.
              Through practical tools, guided lessons, and real-world experience,
              Long Game helps families raise confident athletes while protecting
              the relationship that matters most.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-6 text-left max-w-3xl mx-auto">
            {pillars.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.1 }}
                className="bg-background border border-border-grey rounded-2xl p-8 shadow-[0_4px_16px_rgba(18,21,20,0.08)]"
              >
                <div className="w-14 h-14 rounded-2xl bg-teal/10 flex items-center justify-center mb-4">
                  <p.icon className="w-7 h-7 text-teal" strokeWidth={1.5} />
                </div>
                <h3 className="font-heading text-lg font-semibold mb-3">{p.title}</h3>
                <p className="font-body text-sm text-text-body leading-relaxed">{p.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3.5: THE REALITY PARENTS ARE FACING */}
      <section className="py-20 md:py-28" style={{ backgroundColor: "#F1F3F2" }}>
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
      
      {/* SECTION 4: SUPPORT FOR THE MOMENTS THAT MATTER MOST */}
      <section className="max-w-5xl mx-auto w-full px-6 py-20 md:py-28">
        <motion.div {...fadeUp} className="text-center mb-16">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-3">
            Support for the moments that matter most.
          </h2>
          <p className="font-heading text-teal text-sm font-semibold tracking-widest uppercase mb-6">
            Real-life moments, not modules.
          </p>
          <p className="font-body text-text-body leading-relaxed max-w-2xl mx-auto">
            Parents do not wake up thinking they need another course. They think
            about the game that went badly, the confidence that disappeared, the
            car ride that felt too quiet, the coach conversation they are not sure
            how to handle, and the child they are trying to support without making
            the pressure worse. Long Game gives parents practical guidance for
            those moments, so they can respond with more confidence, more
            perspective, and more connection.
          </p>
        </motion.div>
        <div className="space-y-16">
          {moments.map((m, i) => (
            <motion.div
              key={m.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className={`grid md:grid-cols-2 gap-8 items-center ${
                i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
              }`}
            >
              {m.image ? (
                <img
                  src={m.image}
                  alt={m.title}
                  className={`w-full object-cover rounded-lg ${i % 2 === 0 ? "aspect-[4/5]" : "aspect-[3/4]"} md:aspect-auto md:h-auto`}
                />
              ) : (
                <Placeholder
                  label="Documentary Photo"
                  className={`rounded-lg ${i % 2 === 0 ? "aspect-[4/3]" : "aspect-[3/4]"}`}
                />
              )}
              <div>
                <h3 className="font-heading text-xl font-semibold mb-3">{m.title}</h3>
                <p className="font-body text-text-body leading-relaxed">{m.body}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SECTION 4.5: THE LONG GAME EXPERIENCE */}
      <section className="max-w-4xl mx-auto w-full px-6 pt-4 pb-20 md:pt-6 md:pb-28 text-center">
        <motion.div {...fadeUp}>
          <p className="font-heading text-teal text-sm font-semibold tracking-widest uppercase mb-4">
            The Long Game Experience
          </p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
            Guidance built around real life.
          </h2>
          <div className="font-body text-text-body leading-relaxed space-y-4 max-w-2xl mx-auto mb-12">
            <p>Parents don&apos;t experience youth sports one lesson at a time.</p>
            <p>
              They experience difficult conversations, confidence struggles,
              slumps, and moments when they aren&apos;t sure what to do next.
            </p>
            <p>Long Game helps you find the right guidance—in seconds.</p>
          </div>
        </motion.div>
        <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.15 }}>
          <img
            src="/long-game-experience.png"
            alt="Long Game guidance flow on mobile"
            className="w-full max-w-sm mx-auto h-auto"
          />
        </motion.div>
      </section>

      {/* SECTION 5: CHOOSE THE PATH THAT'S RIGHT FOR YOU */}
      <section className="bg-ink text-cream py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div {...fadeUp} className="text-center mb-14">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Choose the path that&apos;s right for you.
            </h2>
            <p className="font-body text-cream/70 max-w-xl mx-auto leading-relaxed">
              Every family enters the Long Game journey from a different place.
              Some parents are ready for deeper guidance. Some organizations want
              to support every family in their program. Some people want to begin
              with the book. Start where it makes the most sense.
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

      {/* SECTION 6A: WHAT PARENTS ARE SAYING */}
      <section className="max-w-4xl mx-auto w-full px-6 py-20 md:py-28">
        <motion.h2 {...fadeUp} className="font-heading text-3xl md:text-4xl font-bold text-center mb-16">
          What Parents Are Saying
        </motion.h2>
        <div className="space-y-14">
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
              <p className="font-heading font-semibold text-sm">{q.name}</p>
              <p className="font-heading text-xs text-teal tracking-wide">{q.role}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SECTION 6B: TRUSTED BY LEADERS IN SPORT */}
      <section className="bg-cream py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6">
          <motion.h2 {...fadeUp} className="font-heading text-3xl md:text-4xl font-bold text-center mb-16">
            Trusted by leaders in sport.
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-10">
            {leaders.map((l, i) => (
              <motion.div
                key={l.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.1 }}
                className="text-center"
              >
                {l.photo ? (
                  <img
                    src={l.photo}
                    alt={l.name}
                    className="w-24 h-24 rounded-full mx-auto mb-6 object-cover object-top"
                  />
                ) : (
                  <Placeholder label="Headshot" className="w-24 h-24 rounded-full mx-auto mb-6" />
                )}
                <p className="font-body italic text-charcoal/80 leading-relaxed mb-5">
                  &ldquo;{l.quote}&rdquo;
                </p>
                <p className="font-heading font-semibold text-sm">{l.name}</p>
                <p className="font-heading text-xs text-teal tracking-wide">{l.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7: BUILT FROM EXPERIENCE. CREATED WITH PURPOSE. */}
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
          <div className="font-body text-text-body leading-relaxed space-y-4 mb-8">
            <p>Long Game wasn&apos;t built in a boardroom.</p>
            <p>
              It was built over years of coaching young athletes, walking
              alongside sports families, and seeing the same conversations happen
              again and again.
            </p>
            <p>
              It came from watching parents do their very best in a youth sports
              environment that has become more demanding than ever before.
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

      {/* SECTION 8: FINAL CTA */}
      <section className="max-w-4xl mx-auto w-full px-6 pt-20 pb-0 text-center">
        <motion.div {...fadeUp}>
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4 leading-tight">
            Ready to Take the Next Step?
          </h2>
          <p className="font-body text-text-body leading-relaxed mb-8 max-w-2xl mx-auto">
            Whether you&apos;re looking for practical guidance today or a
            complete parent development system, Long Game is here to help you
            support your athlete through every stage of the journey.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/parent-academy"
              className="inline-flex items-center gap-2 bg-ink text-cream font-heading font-semibold px-6 py-3 rounded-lg hover:bg-charcoal transition-colors"
            >
              Explore the Parent Academy
            </Link>
            <Link
              href="/free-guide"
              className="inline-flex items-center gap-2 border border-charcoal/20 text-charcoal font-heading font-semibold px-6 py-3 rounded-lg hover:border-teal hover:text-teal transition-colors"
            >
              Start With the Free Guide
            </Link>
          </div>
        </motion.div>
      </section>

      <section className="max-w-6xl mx-auto w-full px-6 pt-14 pb-20">
        <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.15 }}>
          <img
            src="/final-cta-photo.jpg"
            alt="Coach and young athlete walking off the field together"
            className="w-full h-auto max-h-[500px] object-cover object-top rounded-lg"
          />
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}















