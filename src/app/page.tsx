"use client";

import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Shield, MessageCircle, TrendingUp, Heart, Star } from "lucide-react";

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

const philosophyCards = [
  {
    title: "Hard Work Matters",
    body: "Confidence is built through preparation and doing hard things—not comfort.",
    emphasized: true,
  },
  {
    title: "Failure Is Part of Growth",
    body: "Failure is one of sport's greatest teachers, not something to rescue athletes from.",
    emphasized: true,
  },
  {
    title: "Relationships Build Better Competitors",
    body: "Athletes compete with more freedom when support doesn't depend on the scoreboard.",
    emphasized: false,
  },
  {
    title: "Character Is the Real Win",
    body: "If sport doesn't build resilient, confident people, it's missed its purpose.",
    emphasized: false,
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

export default function Home() {
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
                Explore Long Game &rarr;
              </Link>
              <Link
                href="/organizations"
                className="inline-flex items-center gap-2 border border-cream/30 text-cream font-heading font-semibold text-[15px] px-6 py-3.5 rounded-lg hover:border-teal hover:text-teal transition-colors"
              >
                For Organizations &rarr;
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 1B: TRUST BANNER */}
      <section className="bg-cream py-16 md:py-20">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <motion.h2 {...fadeUp} className="font-heading text-2xl md:text-3xl font-bold mb-3">
            Trusted by leaders in sport.
          </motion.h2>
          <motion.p
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.05 }}
            className="font-body text-text-body mb-12 max-w-md mx-auto"
          >
            Experienced coaches, scouts and leaders who understand what
            matters most.
          </motion.p>
          <div className="grid grid-cols-3 gap-6 md:gap-10">
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

      {/* SECTION 2: YOUTH SPORTS HAVE CHANGED */}
      <section className="max-w-7xl mx-auto w-full px-6 py-16 md:py-24 grid md:grid-cols-5 gap-12 items-center">
        <motion.div {...fadeUp} className="md:col-span-3">
          <img src="/youth-sports-changed.jpg" alt="Youth sports have changed" className="w-full h-auto aspect-[4/3] object-cover rounded-lg" />
        </motion.div>
        <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.15 }}>
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6 leading-tight">
            Youth sports have changed.
            <br />
            So has the experience of raising an athlete.
          </h2>
          <div className="font-body text-text-body leading-relaxed">
            <p className="mb-4">
              The pressure has followed families home—into the car ride, the dinner table, conversations no one expected to have.
            </p>
            <p className="font-semibold text-charcoal">That&apos;s why Long Game exists.</p>
          </div>
        </motion.div>
      </section>

      {/* SECTION 2.5: OUR PHILOSOPHY */}
      <section className="bg-white w-full">
        <div className="max-w-7xl mx-auto w-full px-6 py-16 md:py-24">
          <div className="grid md:grid-cols-5 gap-12 items-center mb-16">
            <motion.div {...fadeUp} className="md:col-span-3">
              <p className="font-heading text-teal text-sm font-semibold tracking-widest uppercase mb-4">
                Our Philosophy
              </p>
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6 leading-tight">
                We don&apos;t believe in lowering the standard.
                <br />
                We believe in changing how parents help young athletes rise to it.
              </h2>
              <p className="font-body text-text-body leading-relaxed">
                Long Game isn&apos;t about making sports easier—it&apos;s about helping parents become the steady presence that supports young athletes through hard work, failure, and pressure.
              </p>
            </motion.div>
            <motion.div
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: 0.15 }}
              className="md:col-span-2"
            >
              <img
                src="/philosophy-image.jpg"
                alt="Athlete reflecting after training"
                className="w-full h-auto aspect-[4/5] object-cover rounded-2xl"
              />
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {philosophyCards.map((c, i) => (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.1 }}
                className={
                  c.emphasized
                    ? "border-2 border-teal/25 rounded-2xl p-10 bg-teal/[0.03]"
                    : "border border-border-grey rounded-2xl p-8 shadow-[0_4px_16px_rgba(18,21,20,0.08)]"
                }
              >
                <h3 className="font-heading text-lg font-semibold mb-3">{c.title}</h3>
                <p className="font-body text-sm text-text-body leading-relaxed">{c.body}</p>
              </motion.div>
            ))}
          </div>

          <motion.div {...fadeUp} className="text-center max-w-2xl mx-auto">
            <p className="font-heading text-xl md:text-2xl font-semibold mb-4 leading-snug">
              We don&apos;t teach parents to lower expectations.
              <br />
              We teach them how to raise athletes who can meet them.
            </p>
            <p className="font-body text-text-body leading-relaxed">
              Long Game combines high standards with practical guidance,
              helping parents raise confident competitors while protecting
              the relationship that lasts long after the final game.
            </p>
          </motion.div>
        </div>
      </section>

      {/* SECTION 3: THE LONG GAME APPROACH */}
      <section className="bg-cream pt-16 pb-8 md:pt-24 md:pb-12">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div {...fadeUp}>
            <p className="font-heading text-teal text-sm font-semibold tracking-widest uppercase mb-4">
              The Long Game Approach
            </p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
              A different way to support sports families.
            </h2>
            <p className="font-body text-text-body leading-relaxed max-w-2xl mx-auto mb-16">
              Practical guidance for the moments that matter most—difficult conversations, quiet pressure, disappearing confidence—so families can raise confident athletes without losing the relationship.
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
      
      {/* SECTION 4: SUPPORT FOR THE MOMENTS THAT MATTER MOST */}
      <section className="max-w-5xl mx-auto w-full px-6 py-16 md:py-24">
        <motion.div {...fadeUp} className="text-center mb-16">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-3">
            Support for the moments that matter most.
          </h2>
          <p className="font-heading text-teal text-sm font-semibold tracking-widest uppercase mb-6">
            Real-life moments, not modules.
          </p>
          <p className="font-body text-text-body leading-relaxed max-w-2xl mx-auto">
            Not another course—practical guidance for the actual moments: the bad game, the quiet car ride, the coach conversation you&apos;re not sure how to handle.
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
          <p className="font-body text-text-body leading-relaxed max-w-2xl mx-auto mb-12">
            Real life doesn&apos;t come one lesson at a time. Long Game helps you find the right guidance—in seconds.
          </p>
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
      <section className="bg-ink text-cream py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div {...fadeUp} className="text-center mb-14">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Choose the path that&apos;s right for you.
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
          <div className="font-body text-text-body leading-relaxed mb-8">
            <p className="mb-4">
              Long Game wasn&apos;t built in a boardroom—it came from years coaching young athletes and walking alongside sports families through the same conversations, again and again.
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

      {/* SECTION 8: FINAL IMAGE + PRICING */}
      <section className="max-w-6xl mx-auto w-full px-6 pt-10 pb-10">
        <motion.div {...fadeUp}>
          <img
            src="/final-cta-photo.jpg"
            alt="Father and son walking off the field together"
            className="w-full h-auto max-h-[500px] object-cover object-top rounded-2xl"
          />
        </motion.div>
      </section>

      <section className="w-full py-4 md:py-8">
        <div className="max-w-6xl mx-auto px-5 md:px-6">
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
                  "Fillable worksheets & reflection pages",
                  "Practical scripts for difficult conversations",
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

      <Footer />
    </main>
  );
}















