"use client";

import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Users, Megaphone, TrendingUp, Heart, Award, Repeat } from "lucide-react";

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

const benefits = [
  {
    title: "Stronger Parent Culture",
    body: "Equip parents with practical tools that encourage healthier communication, realistic expectations, and a more positive youth sports environment.",
    result: "Parents become partners in development rather than adding unnecessary pressure.",
    icon: Users,
  },
  {
    title: "Better Coach Support",
    body: "When parents understand the Long Game philosophy, coaches spend less time managing conflict and more time developing athletes.",
    result: "Coaches feel more supported, valued, and effective.",
    icon: Megaphone,
  },
  {
    title: "Stronger Family Experience",
    body: "Equip parents with practical guidance they can apply during the moments that matter most, creating a more positive experience for everyone involved.",
    result: "Families feel more connected to your organization and more confident throughout their youth sports journey.",
    icon: Heart,
  },
  {
    title: "Healthier Athlete Development",
    body: "When parents and coaches share the same philosophy, athletes experience greater consistency, healthier communication, and stronger long-term development.",
    result: "Athletes develop in an environment where confidence, resilience, and character can thrive.",
    icon: TrendingUp,
  },
  {
    title: "Stronger Organization Reputation",
    body: "Organizations that invest in families stand apart. Supporting parents demonstrates a commitment that extends beyond wins, losses, and championships.",
    result: "Build a reputation families trust and proudly recommend.",
    icon: Award,
  },
  {
    title: "An Ongoing Partnership",
    body: "Your partnership continues well beyond launch through ongoing Parent Portal content, seasonal learning opportunities, and practical tools designed to keep families engaged throughout the year.",
    result: "Continued value for your organization and every family you serve.",
    icon: Repeat,
  },
];

const steps = [
  {
    step: "01",
    title: "Schedule a Discovery Call",
    body: "We'll learn about your organization, answer your questions, and determine whether Long Game is the right fit for your families.",
  },
  {
    step: "02",
    title: "Launch Your Partnership",
    body: "We'll guide your organization through a simple implementation process and provide everything required for a successful launch.",
  },
  {
    step: "03",
    title: "Families Receive Access",
    body: "Parents within your organization receive exclusive, secure access to the Long Game Parent Portal, where they'll find the Parent Academy, practical tools, printable resources, and ongoing content designed to support them throughout the youth sports journey.",
  },
  {
    step: "04",
    title: "Year-Round Parent Support",
    body: "Your partnership extends well beyond launch. Families continue receiving new Parent Portal content, seasonal learning opportunities, practical tools, webinars, and ongoing guidance designed to support them throughout every stage of the youth sports journey.",
  },
];

const includes = [
  {
    title: "Parent Academy",
    body: "A complete parent development system featuring twelve practical modules that help families navigate the most important moments in youth sports.",
  },
  {
    title: "Long Game Parent Portal",
    body: "A secure online hub where parents access the Parent Academy, practical tools, seasonal learning, and exclusive content designed specifically for your organization.",
  },
  {
    title: "Practical Parent Tools",
    body: "Conversation guides, reflection exercises, printable worksheets, and practical frameworks parents can apply immediately.",
  },
  {
    title: "Organization Launch Kit",
    body: "Everything required for a successful rollout, including onboarding materials, communication resources, and implementation support.",
  },
  {
    title: "A Branded Experience",
    body: "Every Long Game partnership includes a customized welcome experience featuring your organization's logo on onboarding materials, welcome resources, and parent communications, creating a seamless experience that feels like an extension of your organization from day one.",
  },
  {
    title: "An Ongoing Partnership",
    body: "Long Game continues providing new Parent Portal content, seasonal learning opportunities, webinars, and practical tools that keep families engaged throughout the year.",
  },
];

export default function OrganizationsPage() {
  return (
    <main className="flex flex-col min-h-screen bg-background text-charcoal">
      <Nav />

      {/* SECTION 1: HERO */}
      <section className="bg-cream py-20 md:py-24">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: "easeOut" }}>
            <h1 className="font-heading text-4xl md:text-5xl font-bold leading-tight mb-6">
              Build Stronger Families. Strengthen Your Organization.
            </h1>
            <p className="font-body text-lg text-text-body mb-10">
              Long Game partners with youth sports organizations to equip parents
              with the guidance, practical tools, and ongoing support they need,
              strengthening families, empowering coaches, and creating a
              healthier youth sports experience.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-ink text-cream font-heading font-semibold px-8 py-3 rounded-lg hover:bg-charcoal transition-colors"
              >
                Schedule a Discovery Call
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 border border-charcoal/20 text-charcoal font-heading font-semibold px-8 py-3 rounded-lg hover:border-teal hover:text-teal transition-colors"
              >
                Download Organization Overview
              </Link>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}>
            <Placeholder label="Documentary Photo" className="aspect-[4/5] rounded-lg" />
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: POSITIONING */}
      <section className="max-w-5xl mx-auto w-full px-6 py-20 md:py-28">
        <motion.div {...fadeUp} className="grid md:grid-cols-2 gap-12 items-start">
          <h2 className="font-heading text-3xl md:text-4xl font-bold leading-tight">
            Most organizations develop the athlete.
            <br />
            <span className="text-teal">Very few help develop the parent.</span>
          </h2>
          <div className="font-body text-text-body leading-relaxed space-y-4">
            <p>Every organization invests in developing athletes.</p>
            <p>
              They hire coaches. Build facilities. Create development programs.
              Work hard to provide the best possible experience for their
              families.
            </p>
            <p>
              Yet the single greatest influence on an athlete&apos;s development
              often receives the least guidance.
            </p>
            <p className="font-semibold text-charcoal">Their parents.</p>
            <p>
              Long Game partners with organizations to equip parents with
              practical tools, communication frameworks, and real-world guidance
              that strengthens families, empowers coaches, and creates a
              healthier youth sports environment.
            </p>
            <p className="font-semibold text-charcoal">
              Because stronger parents help build stronger athletes.
              <br />
              And stronger athletes help build stronger organizations.
            </p>
          </div>
        </motion.div>
      </section>

      {/* SECTION 3: WHY ORGANIZATIONS PARTNER WITH LONG GAME */}
      <section className="bg-ink py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div {...fadeUp} className="text-center mb-14">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-cream mb-4">
              Why Organizations Partner with Long Game
            </h2>
            <p className="font-body text-cream/70 max-w-2xl mx-auto leading-relaxed">
              When parents, coaches, and organizations share the same philosophy,
              everyone benefits. Long Game helps create a healthier culture that
              supports athlete development both in competition and at home.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {benefits.map((b, i) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.08 }}
                className="bg-cream rounded-2xl p-8 flex flex-col shadow-[0_4px_16px_rgba(18,21,20,0.08)]"
              >
                <b.icon className="w-8 h-8 text-teal mb-4" strokeWidth={1.5} />
                <h3 className="font-heading text-lg font-semibold mb-3">{b.title}</h3>
                <p className="font-body text-sm text-text-body leading-relaxed mb-4 flex-1">
                  {b.body}
                </p>
                <p className="font-body text-sm font-semibold text-teal">{b.result}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3B: FAMILY ACCESS / PARENT PORTAL */}
      <section className="bg-[#E8EFF0] py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <motion.div {...fadeUp}>
            <h2 className="font-heading text-3xl md:text-4xl font-bold leading-tight mb-6">
              Give every family access to the right support.
            </h2>
            <p className="font-body text-text-body leading-relaxed">
              When an organization partners with Long Game, families receive
              access to the Parent Academy, situation-based guidance, Field
              Guides, and Practical Tools — all in one structured
              parent-development portal.
            </p>
          </motion.div>
          <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.15 }}>
            <img
              src="/org-family-access.png"
              alt="Welcome, Brantford Minor Baseball families — Parent Portal"
              className="w-full h-auto rounded-lg"
            />
          </motion.div>
        </div>
      </section>

      {/* SECTION 3C: ORGANIZATION ADMIN / DASHBOARD */}
      <section className="bg-cream py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <motion.div {...fadeUp} className="md:order-1">
            <img
              src="/org-admin-dashboard.png"
              alt="Brantford Minor Baseball Admin dashboard"
              className="w-full h-auto rounded-lg"
            />
          </motion.div>
          <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.15 }} className="md:order-2">
            <h2 className="font-heading text-3xl md:text-4xl font-bold leading-tight mb-6">
              Simple for your organization to launch and manage.
            </h2>
            <p className="font-body text-text-body leading-relaxed">
              Long Game gives organizations a simple way to roll out parent
              access, manage invitations, monitor activation, and provide
              structured support to families through one central portal.
            </p>
          </motion.div>
        </div>
      </section>



      {/* SECTION 4: HOW THE PARTNERSHIP WORKS */}
      <section className="bg-cream py-20 md:py-28">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div {...fadeUp} className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              A Simple Partnership. A Lasting Impact.
            </h2>
            <p className="font-body text-text-body max-w-2xl mx-auto leading-relaxed">
              Getting started with Long Game is simple. We guide the
              implementation so your organization can remain focused on
              developing athletes while we help equip the parents who influence
              them most.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-4 gap-8">
            {steps.map((s, i) => (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.1 }}
              >
                <p className="font-heading text-teal text-3xl font-bold mb-3">{s.step}</p>
                <h3 className="font-heading text-lg font-semibold mb-2">{s.title}</h3>
                <p className="font-body text-sm text-text-body leading-relaxed">{s.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: YOUR LONG GAME PARTNERSHIP INCLUDES */}
      <section className="bg-background py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div {...fadeUp} className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Your Long Game Partnership Includes
            </h2>
            <p className="font-body text-text-body max-w-2xl mx-auto leading-relaxed">
              Every Long Game Partnership includes a complete parent development
              ecosystem designed to strengthen your organization and equip the
              families you serve.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {includes.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.08 }}
                className="bg-cream border border-border-grey rounded-2xl p-8 shadow-[0_4px_16px_rgba(18,21,20,0.08)]"
              >
                <h3 className="font-heading text-lg font-semibold mb-3">{item.title}</h3>
                <p className="font-body text-sm text-text-body leading-relaxed">{item.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: FINAL CTA */}
      <section className="bg-ink py-20 md:py-28 text-center">
        <motion.div {...fadeUp} className="max-w-2xl mx-auto px-6">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-cream mb-6">
            Let&apos;s Build Something Better Together.
          </h2>
          <p className="font-body text-cream/70 leading-relaxed mb-10">
            Discover how Long Game can help your organization build stronger
            families, empower coaches, and create a healthier youth sports
            culture. We&apos;ll walk you through the partnership, answer your
            questions, and help you determine whether Long Game is the right fit
            for your organization.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-cream text-ink font-heading font-semibold px-8 py-3 rounded-lg hover:bg-cream/90 transition-colors"
            >
              Schedule a Discovery Call
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





