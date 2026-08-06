"use client";

import { useState } from "react";
import Nav from "@/components/Nav";
import { CheckoutButton } from "@/components/CheckoutButton";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star, Car, Sparkles, Users, MessageCircle, Compass, Fuel,
  BookOpen, Wrench, CalendarDays,
} from "lucide-react";
import { usePricing } from "@/components/GeoProvider";
import { GUARANTEE_FULL, GUARANTEE_LIBRARY_NOTE, GUARANTEE_TITLE } from "@/lib/legal";

function Placeholder({ label, className = "" }: { label: string; className?: string }) {
  return (
    <div
      className={`bg-ink flex items-center justify-center text-cream/30 font-heading text-xs tracking-widest uppercase ${className}`}
    >
      {label}
    </div>
  );
}

const modules = [
  {
    title: "Module 1 — The Car Ride Home",
    body: "The ride home is often the most emotional part of youth sports. Learn simple conversation frameworks that help your athlete feel supported after great games, difficult losses, mistakes, and disappointment, while protecting confidence and strengthening your relationship.",
  },
  {
    title: "Module 2 — Confidence",
    body: "Confidence isn't built by praise alone. Discover what truly creates lasting confidence, the subtle ways parents unknowingly chip away at it, and practical strategies that help athletes believe in themselves through every stage of development.",
  },
  {
    title: "Module 3 — Pressure Without Realizing It",
    body: "Most parents never intend to create pressure, but it happens every day. Learn to recognize hidden sources of pressure and create an environment where your athlete feels supported, not burdened by expectations.",
  },
  {
    title: "Module 4 — The Mental Game",
    body: "Learn practical ways to help your athlete develop resilience, focus, emotional control, and a stronger mindset.",
  },
  {
    title: "Module 5 — Development Over Exposure",
    body: "Learn how to focus on long-term development instead of chasing showcases, rankings, and short-term opportunities.",
  },
  {
    title: "Module 6 — Communication",
    body: "Practical communication strategies that build trust, reduce conflict, and strengthen your relationship.",
  },
  {
    title: "Module 7 — Failure & Resilience",
    body: "Help your athlete respond to setbacks in ways that build resilience and long-term confidence.",
  },
  {
    title: "Module 8 — The Athlete Lifestyle",
    body: "Discover how sleep, nutrition, recovery, routines, and healthy habits influence performance and well-being.",
  },
  {
    title: "Module 9 — Coaches, Teams & Politics",
    body: "Navigate playing time, difficult coaches, and team politics while protecting your athlete's growth.",
  },
  {
    title: "Module 10 — Identity Beyond Sport",
    body: "Help your athlete build an identity that extends beyond performance and sport.",
  },
  {
    title: "Module 11 — Burnout",
    body: "Recognize the warning signs of burnout and create an environment that keeps sport enjoyable.",
  },
  {
    title: "Module 12 — Playing the Long Game",
    body: "Bring everything together with a clear vision for becoming the steady influence your athlete needs.",
  },
];

const painPoints = [
  { icon: Car, title: "The Car Ride Home", quote: "The drive home says more than the game did.", body: "Long Game gives you the exact words for those first fifteen minutes.", module: 1 },
  { icon: Sparkles, title: "Confidence", quote: "The kid who used to play free now plays scared.", body: "A system for rebuilding belief without forcing it.", module: 2 },
  { icon: Users, title: "Playing Time", quote: "You don't know if this is worth a conversation.", body: "A clear-headed way to know when to speak up and when to let it sit.", module: 5 },
  { icon: MessageCircle, title: "Coach Communication", quote: "You're trying to figure out what's worth raising.", body: "Scripts and timing for the conversations that actually help.", module: 9 },
  { icon: Compass, title: "Failure & Setbacks", quote: "A slump isn't a crisis. It can feel like one.", body: "How to stay steady when your athlete goes cold.", module: 7 },
  { icon: Fuel, title: "Burnout", quote: "They said they want to quit.", body: "How to tell a bad week from something real—and what to do either way.", module: 11 },
];

const fieldGuides = [
  "Social Media & Your Athlete",
  "The Recruiting Reality",
  "When Sports Start Taking Over Family Life",
  "And more…",
];

const practicalTools = [
  "Season Planner",
  "Tournament Weekend Planner",
  "Parent–Athlete Check-In",
  "Decision Worksheets",
  "And more…",
];

const quickNav = [
  { label: "Confidence", module: 2 },
  { label: "Car Ride Home", module: 1 },
  { label: "Playing Time", module: 5 },
  { label: "Coach Communication", module: 9 },
  { label: "Burnout", module: 11 },
  { label: "Wanting to Quit", module: 11 },
];

const benefits = [
  { title: "Know what to focus on", body: "Straight guidance for exactly what you're facing right now." },
  { title: "Find the right support fast", body: "Search by situation, not by chapter number." },
  { title: "Keep going at your own pace", body: "No deadlines. No modules you're not ready for yet." },
];

const whatYouGet = [
  { title: "The Car Ride Home", body: "Exact scripts for the fifteen minutes that matter most.", image: "/long-game-experience.png" },
  { title: "Reflection Workbook", body: "Fillable worksheets that turn a hard game into a real conversation.", image: "/org-family-access.png" },
  { title: "The 12 Modules", body: "Twelve structured modules, one for every stage of the season.", image: "/org-admin-phones.png" },
  { title: "Glove Box Cards", body: "Quick reminders for the moments that happen fast.", image: "/org-admin-phones.png" },
];

const endorsers = [
  { name: "Jay Wells", role: "18-Year NHL Veteran, 1994 Stanley Cup Champion", photo: "/team/jay-wells.jpg" },
  { name: "Allan Ross", role: "Former Major League Baseball Scout", photo: "/team/allan-ross.jpg" },
  { name: "Doug Ouilette", role: "Vice President, Ancaster Baseball", photo: "/team/doug-ouilette.jpg" },
];

const academyTestimonials = [
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

/**
 * The opening question quotes the price, so it has to follow the visitor's
 * region the same way the pricing card does — "$97" in the US and everywhere
 * else, "$119 CAD" in Canada.
 */
function buildFaqs(priceLabel: string) {
  return [
    {
      q: `What exactly do I get for ${priceLabel}?`,
      a: "You get the complete 12-module Parent Academy, including lessons, scripts, reflection exercises, worksheets, cheat sheets and practical action steps. Your purchase also includes 12 months of bonus access to the Long Game Library, with Field Guides, Practical Tools and select new resources.",
    },
    {
      q: "Do I have to go in order, or can I jump to what I need right now?",
      a: "You can do either. Work through the full system in order, or jump directly to the module that fits what your family is dealing with right now.",
    },
    {
      q: "How long does a module actually take?",
      a: "Most modules are designed to be practical and easy to work through at your own pace. You don't need hours at a time — read when you have time, come back when you need it, and focus on the ideas that matter most to your family.",
    },
    {
      q: "Is this only for certain sports?",
      a: "No. The Parent Academy is designed for sports parents across different sports and competitive levels. The situations may look different, but confidence, pressure, communication, setbacks, motivation and the parent–athlete relationship are universal.",
    },
    {
      q: "What if it doesn't help my family?",
      a: `Your purchase is protected by our ${GUARANTEE_TITLE}. If it isn't right for your family: ${GUARANTEE_FULL} ${GUARANTEE_LIBRARY_NOTE}`,
    },
    {
      q: "Will I be able to use this on my phone?",
      a: "Yes. The Parent Academy and Long Game Library are designed to work across phone, tablet and computer, so you can access them wherever you need them.",
    },
    {
      q: "Is this a one-time purchase or a subscription?",
      a: "It's a one-time purchase. There are no monthly payments and no automatic renewal. Your purchase includes the complete Parent Academy plus 12 months of bonus Long Game Library access.",
    },
  ];
}

function Accordion({
  items,
  openIndex,
  setOpenIndex,
  idPrefix,
}: {
  items: { title?: string; q?: string; body?: string; a?: string }[];
  openIndex: number | null;
  setOpenIndex: (i: number | null) => void;
  idPrefix?: string;
}) {
  return (
    <div className="space-y-3">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div
            key={i}
            id={idPrefix ? `${idPrefix}-${i + 1}` : undefined}
            className="border border-border-grey rounded-2xl overflow-hidden bg-cream shadow-[0_4px_16px_rgba(18,21,20,0.08)] scroll-mt-24"
          >
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className={`w-full text-left px-6 flex justify-between items-center gap-4 ${idPrefix ? "py-5" : "py-3.5"}`}
            >
              <span className="flex items-center gap-3">
                {idPrefix && (
                  <span className="step-number text-sm">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                )}
                <span className="font-heading font-semibold text-base">
                  {item.title || item.q}
                </span>
              </span>
              <span
                className={`font-heading text-teal text-xl transition-transform shrink-0 ${
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

/* The guarantee has to read identically wherever it appears, so it comes from
   the shared constant rather than being restated here. */
const GUARANTEE_COPY = `${GUARANTEE_TITLE} — ${GUARANTEE_FULL}`;

function PricingCard() {
  const pricing = usePricing();

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-ink text-cream rounded-[28px] max-w-[920px] mx-auto p-6 sm:p-8 md:p-14 grid md:grid-cols-2 gap-8 md:gap-14"
    >
      <div>
        <p className="font-heading text-teal text-[13px] font-semibold tracking-widest uppercase eyebrow">
          Long Game &middot; Parent Academy &middot; 12 Modules
        </p>
        <div className="flex items-end gap-2 mb-1">
          <span className="font-heading text-4xl md:text-5xl font-bold">
            {pricing.amount}
          </span>
          <span className="font-heading text-xs text-cream/60 mb-1.5">
            {pricing.currency}
          </span>
        </div>
        <p className="font-heading text-teal text-sm font-bold mb-1">
          Founding Price
        </p>
        <p className="font-body text-xs text-cream/60 mb-6">
          One-time payment &middot; Regular price{" "}
          <span className="line-through">{pricing.regular}</span>
        </p>

        <CheckoutButton className="flex items-center justify-center gap-2 bg-cream text-ink font-heading font-semibold text-sm px-6 py-3.5 rounded-lg hover:bg-cream/90 transition-colors mb-1 w-full" />
        {/* Kept as a plain link, but with enough vertical padding to be a
            comfortable tap target on mobile. */}
        <a
          href="#modules"
          className="block text-center font-heading text-xs font-semibold text-teal hover:underline py-2.5"
        >
          See Everything Included &rarr;
        </a>

        <div className="border border-cream/10 bg-cream/5 rounded-2xl p-5 mt-5">
          <p className="font-heading text-sm font-semibold mb-1">
            Bonus: 12 Months of Long Game Library Access
          </p>
          <p className="font-body text-xs text-cream/60 leading-relaxed mb-4">
            Field Guides, Practical Tools and select new resources to help with
            the moments that come next.
          </p>
          <p className="font-heading text-sm font-semibold mb-1">
            Bonus: Long Game Glove Box Cards
          </p>
          <p className="font-body text-xs text-cream/60 leading-relaxed">
            Quick reminders and conversation starters for the moments
            that matter most.
          </p>
        </div>
      </div>

      <div className="border-t md:border-t-0 md:border-l border-cream/10 pt-8 md:pt-0 md:pl-14">
        <p className="font-heading text-teal text-[11px] font-semibold tracking-widest uppercase mb-3">
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
        <p className="font-body text-xs text-cream/60 border-t border-cream/10 pt-4 mt-4">
          Designed for parents of athletes ages 8&ndash;18 across every
          competitive sport.
        </p>
        <p className="font-body text-xs text-cream/60 border-t border-cream/10 pt-4 mt-4">
          {GUARANTEE_COPY}
        </p>
      </div>
    </motion.div>
  );
}

export default function ParentAcademyPage() {
  const [openModule, setOpenModule] = useState<number | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const pricing = usePricing();
  const faqs = buildFaqs(pricing.isCanada ? pricing.display : pricing.amount);

  return (
    <main className="flex flex-col min-h-screen bg-background text-charcoal">
      <Nav />

      {/* SECTION 1: HERO */}
      <section className="bg-background py-20 md:py-28 min-h-[720px] flex items-center">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: "easeOut" }}>
            <p className="font-heading text-teal text-[13px] font-semibold tracking-widest uppercase eyebrow">
              The Parent Academy
            </p>
            <h1 className="font-heading text-4xl md:text-5xl font-bold leading-tight mb-6 max-w-[560px]">
              Become the parent your athlete will remember.
            </h1>
            <p className="font-body text-lg text-text-body mb-3 max-w-[480px]">
              Twelve modules. Real scripts. The exact system for the moments
              you&apos;re not sure how to handle.
            </p>
            <p className="font-body text-sm text-text-muted mb-10">
              Trusted by parents and organizations across North America.
            </p>
            <div className="flex flex-wrap gap-3">
              <CheckoutButton className="inline-flex items-center gap-2 bg-teal text-cream font-heading font-semibold px-8 py-3 rounded-lg hover:bg-teal/90 transition-colors" />
              <a
                href="#modules"
                className="inline-flex items-center gap-2 border border-charcoal/20 text-charcoal font-heading font-semibold px-8 py-3 rounded-lg hover:border-teal hover:text-teal transition-colors"
              >
                Preview Course Pages &rarr;
              </a>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}>
            <div className="relative w-full max-w-sm mx-auto aspect-[4/5] rounded-lg overflow-hidden shadow-2xl rotate-2 bg-ink flex flex-col items-center justify-center text-cream p-8">
              <p className="font-heading font-bold text-2xl tracking-wide mb-2">LONG GAME</p>
              <p className="font-heading text-xs tracking-widest text-cream/60 mb-6">PARENT ACADEMY</p>
              <span className="font-heading text-xs tracking-widest border border-teal text-teal rounded-full px-4 py-1">
                12 MODULES
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: RECOGNITION */}
      <section className="py-20 md:py-28" style={{ backgroundColor: "#F1F3F2" }}>
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold leading-tight mb-3">
            You care deeply. That does not make the hard moments easier.
          </h2>
          <p className="font-body text-text-muted">
            Here&apos;s where Long Game actually helps.
          </p>
        </div>
      </section>

      {/* SECTION 3: PARENT PAIN POINTS */}
      <section className="max-w-6xl mx-auto w-full px-6 py-20 md:py-28">
        <div className="grid md:grid-cols-2 gap-6">
          {painPoints.map((p) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="bg-cream border border-border-grey rounded-2xl p-7 flex flex-col"
            >
              <p.icon
                className="w-7 h-7 text-teal mb-4"
                strokeWidth={1.5}
                aria-hidden="true"
              />
              <h3 className="font-heading text-xl font-bold mb-2">{p.title}</h3>
              <p className="font-body text-sm text-text-body leading-relaxed mb-2">&ldquo;{p.quote}&rdquo;</p>
              <p className="font-body text-sm text-text-muted leading-relaxed mb-5 flex-1">{p.body}</p>
              <a
                href={`#module-${p.module}`}
                className="self-end font-heading text-sm font-semibold text-teal hover:underline"
              >
                &rarr; Module {p.module}
              </a>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SECTION 4: SUPPORT FOR EVERY MOMENT */}
      <section className="max-w-6xl mx-auto w-full px-6 py-20 md:py-28 grid md:grid-cols-2 gap-12 items-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.6, ease: "easeOut" }}>
          <p className="font-heading text-teal text-sm font-semibold tracking-widest uppercase eyebrow">
            Support for Every Moment
          </p>
          <div className="border-t border-border-grey">
            {benefits.map((b) => (
              <div key={b.title} className="border-b border-border-grey py-5">
                <h3 className="font-heading text-lg font-bold mb-1">{b.title}</h3>
                <p className="font-body text-sm text-text-body leading-relaxed">{b.body}</p>
              </div>
            ))}
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}>
          <img
            src="/parent-portal-phone.png"
            alt="Parent Academy dashboard showing progress"
            className="w-full h-auto max-w-[340px] mx-auto"
            style={{ filter: "drop-shadow(0 24px 48px rgba(18,21,20,.12))" }}
          />
        </motion.div>
      </section>

      {/* SECTION 5: PRICING BOX */}
      <section id="pricing-top" className="w-full px-6 py-20 md:py-28">
        <PricingCard />
        <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-1.5 text-[13px] font-body text-text-muted mt-6">
          <span className="flex items-center gap-1.5"><span className="text-teal">&#10003;</span> Secure Checkout</span>
          <span className="flex items-center gap-1.5"><span className="text-teal">&#10003;</span> Instant Access</span>
          <span className="flex items-center gap-1.5"><span className="text-teal">&#10003;</span> One-Time Purchase</span>
        </div>
      </section>

      {/* SECTION 6: WHAT YOU GET */}
      <section className="max-w-6xl mx-auto w-full px-6 py-20 md:py-28">
        <div className="border-t border-border-grey">
          {whatYouGet.map((band, i) => (
            <motion.div
              key={band.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className={`border-b border-border-grey flex flex-col md:flex-row items-center gap-6 md:gap-10 py-8 ${
                i % 2 === 1 ? "md:flex-row-reverse" : ""
              }`}
            >
              <div className="md:w-[40%]">
                <h3 className="font-heading text-2xl font-bold mb-2">{band.title}</h3>
                <p className="font-body text-sm text-text-body leading-relaxed">{band.body}</p>
              </div>
              <img
                src={band.image}
                alt={band.title}
                className="md:w-[60%] w-full h-[160px] md:h-[170px] object-cover rounded-lg"
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* SECTION 7: EXPLORE THE PARENT ACADEMY */}
      <section id="modules" className="max-w-3xl mx-auto w-full px-6 py-20 md:py-28">
        <h2 className="font-heading text-2xl md:text-3xl font-bold text-center mb-6">
          Explore the Parent Academy
        </h2>
        <p className="font-body text-text-body leading-relaxed text-center max-w-2xl mx-auto mb-10">
          The Long Game Parent Academy gives sports parents practical guidance
          for the situations they face throughout their athlete&apos;s journey.
          Inside you&apos;ll find 12 practical modules filled with real
          conversations, proven strategies, and tools you can immediately put
          into practice.
        </p>

        <p className="font-heading text-sm font-semibold text-center mb-3">
          Not sure where to start?
        </p>
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {quickNav.map((c) => (
            <a
              key={c.label}
              href={`#module-${c.module}`}
              className="inline-flex items-center border border-border-grey rounded-full px-4 h-10 font-heading text-[13px] text-charcoal hover:border-teal hover:text-teal hover:bg-background transition-colors"
            >
              {c.label}
            </a>
          ))}
        </div>

        <Accordion items={modules} openIndex={openModule} setOpenIndex={setOpenModule} idPrefix="module" />
      </section>

      {/* SECTION 5 REPEAT: LIGHTWEIGHT PRICING BAR */}
      <section id="pricing" className="w-full px-6 py-20 md:py-28">
        <div className="bg-ink text-cream rounded-2xl max-w-3xl mx-auto px-6 py-5 md:px-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-heading text-base md:text-lg font-semibold">
            {pricing.display} &middot; Founding Price
          </p>
          <CheckoutButton className="inline-flex items-center gap-2 bg-cream text-ink font-heading font-semibold text-sm px-6 py-3 rounded-lg hover:bg-cream/90 transition-colors whitespace-nowrap" />
        </div>
      </section>

      {/* SECTION 7B: BONUS WITH YOUR PURCHASE — the 12-month Long Game Library
          bonus, sitting between the pricing bar and the product preview.
          This is a bonus included with a one-time purchase, not a subscription. */}
      <section className="max-w-6xl mx-auto w-full px-6 py-20 md:py-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <p className="font-heading text-teal text-[13px] font-semibold tracking-widest uppercase eyebrow">
            Bonus With Your Parent Academy Purchase
          </p>
          <h2 className="font-heading text-2xl md:text-3xl font-bold leading-tight mb-4">
            Your Parent Academy goes beyond the 12 modules.
          </h2>
          <p className="font-body text-text-body leading-relaxed mb-4">
            When you purchase the Parent Academy, you&apos;ll also receive 12
            months of free access to all additional content in the Long Game
            Parent Portal.
          </p>
          <p className="font-body text-text-body leading-relaxed">
            That means every new Field Guide, Practical Tool and parent resource
            we add during those 12 months is included at no additional cost.
          </p>
          <p className="inline-block bg-cream border border-border-grey rounded-lg px-4 py-2.5 font-heading text-[12px] font-semibold text-teal-dark mt-6">
            One-time purchase &middot; No subscription &middot; No automatic renewal
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              icon: BookOpen,
              label: "Field Guides",
              body: "Deeper guidance for challenges today's sports families face.",
              items: fieldGuides,
            },
            {
              icon: Wrench,
              label: "Practical Tools",
              body: "Simple resources designed to actually be used.",
              items: practicalTools,
            },
          ].map((col, i) => (
            <motion.div
              key={col.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.08 }}
              className="bg-cream border border-border-grey rounded-2xl p-7 md:p-8"
            >
              <col.icon
                className="w-7 h-7 text-teal mb-4"
                strokeWidth={1.5}
                aria-hidden="true"
              />
              <h3 className="font-heading text-[13px] font-semibold tracking-widest uppercase text-charcoal mb-2">
                {col.label}
              </h3>
              <p className="font-body text-sm text-text-body leading-relaxed mb-5">
                {col.body}
              </p>
              <ul className="font-body text-sm text-text-body space-y-0">
                {col.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 py-2 border-b border-border-grey last:border-0"
                  >
                    <span className="text-teal">&#10003;</span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex items-start justify-center gap-2.5 font-body text-sm text-text-muted text-center mt-10"
        >
          <CalendarDays
            className="w-5 h-5 text-teal shrink-0"
            strokeWidth={1.5}
            aria-hidden="true"
          />
          New resources added during your 12-month bonus access period are
          included at no additional cost.
        </motion.p>
      </section>

      {/* SECTION 8: SEE WHAT'S INSIDE */}
      <section className="bg-ink py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-cream text-center mb-12">
            See what&apos;s inside.
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {["Opening", "Common Mistake", "Better Response", "Exact Script", "Reflection"].map((label, i) => (
              <Placeholder key={label} label={`Page ${i + 1}: ${label}`} className="aspect-[4/5] rounded-lg border-4 border-cream/10" />
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 9A: ENDORSEMENTS — who stands behind this */}
      <section className="bg-background py-20 md:py-28">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="font-heading text-teal text-[13px] font-semibold tracking-widest uppercase eyebrow">
              Recognized By
            </p>
            <h2 className="font-heading text-2xl md:text-3xl font-bold leading-tight max-w-2xl mx-auto">
              Coaches, scouts, and leaders who&apos;ve spent their careers around athletes.
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {endorsers.map((e, i) => (
              <motion.div
                key={e.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.08 }}
                className="bg-cream border border-border-grey rounded-2xl p-7 text-center flex flex-col items-center"
              >
                <div className="mb-4">
                  <img
                    src={e.photo}
                    alt={e.name}
                    className="w-20 h-20 rounded-full object-cover object-top"
                  />
                </div>
                <p className="font-heading text-base font-bold mb-1">{e.name}</p>
                <p className="font-body text-[13px] text-text-muted leading-snug">{e.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 9B: PARENT TESTIMONIALS — what families say */}
      <section className="py-20 md:py-28" style={{ backgroundColor: "#F1F3F2" }}>
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="font-heading text-teal text-[13px] font-semibold tracking-widest uppercase eyebrow">
              From Parents
            </p>
            <h2 className="font-heading text-2xl md:text-3xl font-bold leading-tight">
              What families say after going through it.
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {academyTestimonials.map((t, i) => (
              <motion.figure
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.08 }}
                className="bg-background border border-border-grey rounded-2xl p-7 md:p-8 text-left flex flex-col"
              >
                <div className="flex gap-1 mb-4" aria-label="Rated 5 out of 5">
                  {[...Array(5)].map((_, idx) => (
                    <Star key={idx} className="w-4 h-4 text-teal fill-teal" aria-hidden="true" />
                  ))}
                </div>
                <blockquote className="font-body italic text-base md:text-lg text-charcoal leading-relaxed mb-6 flex-1">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="border-t border-border-grey pt-4">
                  <p className="font-heading text-sm font-bold">{t.name}</p>
                  <p className="font-body text-[13px] text-text-muted leading-snug">{t.role}</p>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 10: FINAL CTA */}
      <section className="bg-ink py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.6, ease: "easeOut" }} className="text-center md:text-left">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-cream mb-4">
              The Game Will End.
              <br />
              The Relationship Won&apos;t.
            </h2>
            <p className="font-body text-cream/70 max-w-md mx-auto md:mx-0 mb-8" style={{ color: "#C9CFCC" }}>
              Get instant access today. Fifteen minutes at a time, this is how
              you show up for the long game.
            </p>
            <CheckoutButton className="inline-flex items-center gap-2 bg-cream text-ink font-heading font-semibold px-8 py-3.5 rounded-lg hover:bg-cream/90 transition-colors" />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }} className="hidden md:block">
            <div className="relative w-full max-w-[280px] mx-auto aspect-[4/5] rounded-lg overflow-hidden shadow-2xl rotate-2 bg-charcoal flex flex-col items-center justify-center text-cream p-8 opacity-90">
              <p className="font-heading font-bold text-xl tracking-wide mb-2">LONG GAME</p>
              <p className="font-heading text-xs tracking-widest text-cream/60">PARENT ACADEMY</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto w-full px-6 py-20 md:py-28">
        <h2 className="font-heading text-2xl md:text-3xl font-bold text-center mb-12">
          Common Questions
        </h2>
        <Accordion items={faqs} openIndex={openFaq} setOpenIndex={setOpenFaq} />
      </section>

      <Footer />
    </main>
  );
}
