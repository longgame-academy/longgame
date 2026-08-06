"use client";

import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Shield, Target, MessageCircle, Users, Handshake } from "lucide-react";

function Placeholder({ label, className = "" }: { label: string; className?: string }) {
  return (
    <div
      className={`bg-ink flex items-center justify-center text-cream/30 font-heading text-xs tracking-widest uppercase ${className}`}
    >
      {label}
    </div>
  );
}

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease: "easeOut" },
} as const;

const problems = [
  { title: "Playing Time & Role Conflict", problem: "A playing-time complaint lands on your desk before the coach even knows there's a concern.", helps: "Parents get a framework for knowing when a conversation is warranted—and how to have it with the coach, not about the coach." },
  { title: "Staff & Administrator Overload", problem: "Your staff spends hours managing parent conflict that has nothing to do with coaching.", helps: "When parents share the same philosophy your organization does, staff spend less time refereeing and more time developing athletes." },
  { title: "Pressure Following Athletes Home", problem: "What happens in the car ride home undoes what happened at practice.", helps: "Parents get the exact language for the fifteen minutes after a hard game—so home reinforces what you're building, not undermines it." },
  { title: "Sideline & Spectator Behaviour", problem: "One parent's behaviour at a game becomes everyone's problem, including yours.", helps: "A shared standard for how parents show up—modelled and taught, not just posted on a sign." },
  { title: "Misaligned Expectations", problem: "Time, fees, travel, and training create expectations your organization never actually promised.", helps: "Parents get a realistic picture of development early, so expectations are set before they become conflict." },
  { title: "Burnout & Athlete Retention", problem: "A kid who wanted this at nine doesn't want it at thirteen—and you lose a family.", helps: "Parents learn to read the signs early and respond in ways that keep kids in the game instead of pushing them out." },
];

const proactiveBoxes = [
  { icon: Shield, title: "Prepare Parents", body: "Set the tone before the season starts, not after the first conflict." },
  { icon: Target, title: "Align Expectations", body: "Give families a realistic picture of development, time, and role." },
  { icon: MessageCircle, title: "Support the Moment", body: "Give parents the exact words when a hard moment actually happens." },
];

const portalBenefits = [
  { title: "Parent Development System", body: "Twelve practical modules covering the moments that matter most." },
  { title: "Field Guides", body: "In-depth guidance parents can return to all season long." },
  { title: "Practical Tools and Scripts", body: "Exact language for hard conversations, not general advice." },
  { title: "Question-Based Navigation", body: "Parents find help by situation, not by table of contents." },
];

const alignmentPoints = [
  { label: "Coach-Parent Alignment", body: "A shared framework so coaches and parents are working from the same expectations.", inDev: true },
  { label: "Parent Behaviour Standard", body: "A clear, positive standard for how parents show up—not just a list of rules.", inDev: true },
  { label: "Preseason Pathways", body: "Set families up before the season starts, not after the first issue.", inDev: false },
  { label: "Organization Visibility", body: "See engagement across your families at a glance.", inDev: false },
];

const outcomes = [
  { title: "Fewer Preventable Conflicts", body: "Issues get addressed before they escalate." },
  { title: "Better Support for Coaches", body: "Less time managing parents, more time developing athletes." },
  { title: "Healthier Athlete Experiences", body: "Kids play in an environment built for them to thrive." },
  { title: "Stronger Organizational Trust", body: "Families who feel supported become families who stay." },
];

const evidence = [
  { figure: "70%", body: "of kids quit organized sports by age 13, most because the experience stopped being fun, not because of talent.", support: "Every family that leaves is a family your organization worked to earn.", source: "Aspen Institute / Project Play" },
  { figure: "46%", body: "of youth coaches have experienced verbal harassment — 56% of those say it came from parents of athletes.", support: "Coaches who feel supported by parents stay longer.", source: "U.S. Center for SafeSport, National Coaches Survey (Jan. 2026)" },
  { figure: "80%", body: "of young officials quit within their first two years — more than 75% cite adult behaviour as the primary reason.", support: "How parents show up shapes whether officials, volunteers, and coaches want to come back.", source: "National Association of Sports Officials (NASO) survey, cited via the Ohio High School Athletic Association" },
];

const launchSteps = [
  { step: "01", title: "Plan", body: "Configure your organization's launch." },
  { step: "02", title: "Invite", body: "Send secure access to every family." },
  { step: "03", title: "Begin", body: "Parents start the Parent Academy at their own pace." },
  { step: "04", title: "View Engagement", body: "See activation and completion at a glance." },
];

const includes = [
  { title: "Parent Academy", body: "A complete parent development system featuring twelve practical modules." },
  { title: "Long Game Parent Portal", body: "A secure hub where parents access the Parent Academy, practical tools, and ongoing content built for your organization." },
  { title: "Practical Parent Tools", body: "Conversation guides, reflection exercises, and printable worksheets parents can apply immediately." },
  { title: "Organization Launch Kit", body: "Everything required for a successful rollout—onboarding materials, communication resources, and implementation support." },
  { title: "A Branded Experience", body: "Your organization's logo on onboarding materials, welcome resources, and parent communications." },
  { title: "An Ongoing Partnership", body: "New Parent Portal content, seasonal learning, webinars, and practical tools that keep families engaged year-round." },
];

export default function OrganizationsPage() {
  return (
    <main className="flex flex-col min-h-screen bg-background text-charcoal">
      <Nav />

      {/* SECTION 1: HERO */}
      <section className="bg-background py-16 md:py-24 min-h-[680px] flex items-center">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: "easeOut" }}>
            <p className="font-heading text-teal text-[13px] font-semibold tracking-widest uppercase eyebrow">
              Parent Development for Youth Sports Organizations
            </p>
            <h1 className="font-heading text-4xl md:text-5xl font-bold leading-tight mb-6 max-w-[580px]">
              Develop Better Sports Parents. Build a Stronger Organization.
            </h1>
            <p className="font-body text-lg text-text-body mb-3 max-w-[500px]">
              Long Game gives parents practical guidance for pressure, playing
              time, communication, confidence, and setbacks—before those
              moments become problems for the athlete, coach, or organization.
            </p>
            <p className="font-body text-sm text-text-muted mb-8">
              A short discovery call is all it takes to see if it&apos;s the right fit.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-teal text-cream font-heading font-semibold px-8 py-3 rounded-lg hover:bg-teal/90 transition-colors"
              >
                Book a Demo &rarr;
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 border border-charcoal/20 text-charcoal font-heading font-semibold px-8 py-3 rounded-lg hover:border-teal hover:text-teal transition-colors"
              >
                Download Organization Overview
              </Link>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }} className="relative">
            <Placeholder label="Documentary Photo" className="aspect-[4/5] rounded-lg" />
            <div className="absolute -bottom-6 -left-6 w-[140px] md:w-[180px] rounded-2xl overflow-hidden shadow-2xl border-4 border-cream bg-ink">
              <img src="/org-family-access.png" alt="Parent Portal preview" className="w-full h-auto" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: THE MISSING PART OF ATHLETE DEVELOPMENT */}
      <section className="max-w-3xl mx-auto w-full px-6 py-20 md:py-28 text-center">
        <motion.div {...fadeUp}>
          <h2 className="font-heading text-3xl md:text-4xl font-bold leading-tight mb-8">
            Most organizations develop the athlete.
            <br />
            <span className="text-teal">Very few help develop the parent.</span>
          </h2>
          <div className="font-body text-text-body leading-relaxed space-y-4 max-w-xl mx-auto text-left md:text-center">
            <p>Every organization invests in developing athletes.</p>
            <p>
              They hire coaches. Build facilities. Create development programs.
              Work hard to provide the best possible experience for their
              families.
            </p>
            <p>
              Yet the single greatest influence on an athlete&apos;s development
              often receives the least guidance. Their parents.
            </p>
            <p>
              Long Game partners with organizations to equip parents with
              practical tools, communication frameworks, and real-world
              guidance that strengthens families, empowers coaches, and
              creates a healthier youth sports environment.
            </p>
            <p className="font-semibold text-charcoal">
              Because stronger parents help build stronger athletes. And
              stronger athletes help build stronger organizations.
            </p>
          </div>
        </motion.div>
        <motion.div {...fadeUp} className="mt-16">
          <Placeholder label="Documentary Photo — Parent, Coach, Athlete" className="aspect-[21/9] rounded-lg" />
        </motion.div>
      </section>

      {/* SECTION 3: PROBLEMS ORGANIZATIONS ARE ALREADY MANAGING */}
      <section className="bg-ink py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6">
          <motion.h2 {...fadeUp} className="font-heading text-3xl md:text-4xl font-bold text-cream text-center mb-14">
            Problems Organizations Are Already Managing
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-6">
            {problems.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.06 }}
                className="rounded-2xl p-7 flex flex-col"
                style={{ backgroundColor: "#1A1E1C", border: "1px solid rgba(255,255,255,.08)" }}
              >
                <h3 className="font-heading text-lg font-bold text-cream mb-2">{p.title}</h3>
                <p className="font-body text-sm mb-3" style={{ color: "#C9CFCC" }}>{p.problem}</p>
                <div className="w-6 h-0.5 bg-teal mb-3" />
                <p className="font-body text-sm" style={{ color: "#C9CFCC" }}>{p.helps}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: A PROACTIVE APPROACH */}
      <section className="max-w-6xl mx-auto w-full px-6 py-20 md:py-28">
        <motion.h2 {...fadeUp} className="font-heading text-3xl md:text-4xl font-bold text-center mb-14">
          Do not wait until there is a parent problem.
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {proactiveBoxes.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.08 }}
              className="bg-cream border border-border-grey rounded-2xl p-6"
            >
              <b.icon
                className="w-7 h-7 text-teal mb-3"
                strokeWidth={1.5}
                aria-hidden="true"
              />
              <h3 className="font-heading text-lg font-bold mb-2">{b.title}</h3>
              <p className="font-body text-sm text-text-body leading-relaxed">{b.body}</p>
            </motion.div>
          ))}
        </div>
        <motion.p {...fadeUp} className="font-body italic text-lg md:text-xl text-center max-w-2xl mx-auto mt-12" style={{ color: "#005548" }}>
          &ldquo;A code of conduct tells parents what not to do. Long Game teaches
          them what to do instead.&rdquo;
        </motion.p>
        <motion.div {...fadeUp} className="max-w-sm mx-auto mt-14">
          <img
            src="/org-family-access.png"
            alt="Parent situation-select and recommended-resource flow"
            className="w-full h-auto rounded-2xl shadow-2xl"
          />
        </motion.div>
      </section>

      {/* SECTION 5: PARENT PORTAL PRODUCT SECTION */}
      <section className="py-20 md:py-28" style={{ backgroundColor: "#F1F3F2" }}>
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-5 gap-12 items-center">
          <motion.div {...fadeUp} className="md:col-span-2">
            <p className="font-heading text-teal text-[13px] font-semibold tracking-widest uppercase eyebrow">
              The Parent Portal
            </p>
            <h2 className="font-heading text-2xl md:text-3xl font-bold leading-tight mb-8">
              Everything a parent needs, organized the way they&apos;ll actually use it.
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {portalBenefits.map((b) => (
                <div key={b.title} className="bg-cream border border-border-grey rounded-2xl p-5">
                  <h3 className="font-heading text-base font-bold mb-1">{b.title}</h3>
                  <p className="font-body text-[13px] text-text-body leading-relaxed">{b.body}</p>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.15 }} className="md:col-span-3 relative">
            <img
              src="/org-family-access.png"
              alt="Parent Portal dashboard"
              className="w-full max-w-[360px] mx-auto rounded-2xl shadow-2xl"
            />
          </motion.div>
        </div>
      </section>

      {/* SECTION 6: ORGANIZATION-WIDE ALIGNMENT */}
      <section className="max-w-6xl mx-auto w-full px-6 py-20 md:py-28 grid md:grid-cols-5 gap-12 items-center">
        <motion.div {...fadeUp} className="md:col-span-3 relative">
          <img
            src="/org-admin-dashboard.png"
            alt="Organization admin dashboard"
            className="w-full h-auto rounded-lg shadow-xl"
          />
        </motion.div>
        <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.15 }} className="md:col-span-2">
          <Users
            className="w-7 h-7 text-teal mb-3"
            strokeWidth={1.5}
            aria-hidden="true"
          />
          <p className="font-heading text-teal text-[13px] font-semibold tracking-widest uppercase eyebrow">
            Organization-Wide Alignment
          </p>
          <h2 className="font-heading text-2xl md:text-3xl font-bold leading-tight mb-8">
            Give your coaches and your families the same playbook.
          </h2>
          <div className="border-t border-border-grey">
            {alignmentPoints.map((v) => (
              <div key={v.label} className="border-b border-border-grey py-5">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <p className="font-heading text-base font-bold">{v.label}</p>
                  {v.inDev && (
                    <span className="font-heading text-[10px] uppercase tracking-wide text-text-muted bg-background rounded-full px-2.5 py-0.5">
                      In Development
                    </span>
                  )}
                </div>
                <p className="font-body text-sm text-text-body leading-relaxed">{v.body}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* SECTION 7: ORGANIZATION OUTCOMES — given its own tinted band and
          larger type so it reads as a deliberate section rather than stray
          text floating between the two richer sections around it. */}
      <section className="bg-cream py-20 md:py-28">
        <div className="max-w-6xl mx-auto w-full px-6">
          <motion.p {...fadeUp} className="font-heading text-teal text-[13px] font-semibold tracking-widest uppercase eyebrow text-center">
            The Result
          </motion.p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12">
            {outcomes.map((o, i) => (
              <motion.div
                key={o.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.06 }}
                className="text-center"
              >
                <h3 className="font-heading text-xl md:text-2xl font-bold mb-2 leading-tight">{o.title}</h3>
                <p className="font-body text-base text-text-body leading-relaxed">{o.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 8: EVIDENCE */}
      <section className="py-20 md:py-28" style={{ backgroundColor: "#E8EFF0" }}>
        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-3 gap-6">
          {evidence.map((e, i) => (
            <motion.div
              key={e.figure + i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.08 }}
              className="bg-cream border border-border-grey rounded-2xl p-8"
            >
              <p className="font-heading text-4xl font-bold mb-3">{e.figure}</p>
              <p className="font-body text-sm text-text-body leading-relaxed mb-4">{e.body}</p>
              <p className="font-body text-sm text-teal font-semibold mb-4">{e.support}</p>
              <p className="font-heading text-[11px] uppercase tracking-wide text-text-muted">Source: {e.source}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SECTION 9: SIMPLE TO LAUNCH */}
      <section className="py-20 md:py-28" style={{ backgroundColor: "#F1F3F2" }}>
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <motion.div {...fadeUp}>
            <p className="font-heading text-teal text-[13px] font-semibold tracking-widest uppercase eyebrow">
              Simple to Launch
            </p>
            <h2 className="font-heading text-2xl md:text-3xl font-bold leading-tight mb-10">
              Up and running without adding work to your season.
            </h2>
            <div className="space-y-7">
              {launchSteps.map((s) => (
                <div key={s.step} className="flex items-start gap-4">
                  <span className="step-number text-lg leading-tight">
                    {s.step}
                  </span>
                  <div>
                    <p className="font-heading text-base font-bold mb-1">{s.title}</p>
                    <p className="font-body text-sm text-text-body leading-relaxed">{s.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.15 }}>
            <img
              src="/org-admin-phones.png"
              alt="Organization launch dashboard"
              className="w-full max-w-md mx-auto rounded-lg shadow-xl"
            />
          </motion.div>
        </div>
      </section>

      {/* SECTION 10: PARTNERSHIP INCLUDES */}
      <section className="bg-background py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-5 gap-12 items-center">
          <motion.div {...fadeUp} className="md:col-span-3">
            <img
              src="/long-game-experience.png"
              alt="Long Game partnership ecosystem"
              className="w-full h-auto rounded-lg"
            />
          </motion.div>
          <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.15 }} className="md:col-span-2">
            <Handshake
              className="w-7 h-7 text-teal mb-3"
              strokeWidth={1.5}
              aria-hidden="true"
            />
            <p className="font-heading text-teal text-[13px] font-semibold tracking-widest uppercase eyebrow">
              Your Partnership Includes
            </p>
            <h2 className="font-heading text-2xl md:text-3xl font-bold leading-tight mb-8">
              A complete parent-development ecosystem, not a one-time resource.
            </h2>
            <div className="border-t border-border-grey">
              {includes.map((item, i) => (
                <div key={item.title} className="border-b border-border-grey py-5">
                  <p className={i === 0 ? "font-heading text-lg font-bold mb-1" : "font-heading text-base font-bold mb-1"}>{item.title}</p>
                  <p className="font-body text-sm text-text-body leading-relaxed">{item.body}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 11: TAILORED PARTNERSHIP */}
      <section className="py-20 md:py-28 text-center" style={{ backgroundColor: "#F1F3F2" }}>
        <motion.div {...fadeUp} className="max-w-xl mx-auto px-6">
          <p className="font-heading text-teal text-[13px] font-semibold tracking-widest uppercase eyebrow">
            Organization Partnership
          </p>
          <h2 className="font-heading text-3xl font-bold leading-tight mb-4">
            One annual partnership. Support for every family.
          </h2>
          <p className="font-body text-text-body leading-relaxed mb-8">
            Pricing is tailored to the size and needs of your organization.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-charcoal text-cream font-heading font-semibold px-8 py-3.5 rounded-lg hover:bg-ink transition-colors"
          >
            Request Organization Pricing &rarr;
          </Link>
        </motion.div>
      </section>

      {/* SECTION 12: FINAL CTA
          Sits directly above the (also dark) footer "Stay Connected" block, so
          the bottom padding is trimmed and a hairline divider marks the seam —
          the two read as one continuous dark section rather than two boxes. */}
      <section className="bg-ink pt-20 md:pt-28 pb-16 md:pb-20 text-center border-b border-cream/10">
        <motion.div {...fadeUp} className="max-w-2xl mx-auto px-6">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-cream mb-6">
            Let&apos;s Build Something Better Together.
          </h2>
          <p className="font-body text-cream/70 leading-relaxed mb-10">
            Discover how Long Game can help your organization build stronger
            families, empower coaches, and create a healthier youth sports
            culture. We&apos;ll walk you through the partnership and help you
            determine if it&apos;s the right fit.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-cream text-ink font-heading font-semibold px-8 py-3 rounded-lg hover:bg-cream/90 transition-colors"
            >
              Book a Demo &rarr;
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 border border-cream/30 text-cream font-heading font-semibold px-8 py-3 rounded-lg hover:border-teal hover:text-teal transition-colors"
            >
              Download Organization Overview
            </Link>
          </div>
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}
