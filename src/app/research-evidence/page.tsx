"use client";

import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease: "easeOut" },
} as const;

const findings = [
  {
    title: "70% of Children Quit Organized Sports by Age 13",
    body: [
      "One of the most widely shared statistics in youth sports is that approximately 70% of children stop playing organized sports by age 13. While every athlete has their own reasons for leaving, research points to common themes including declining enjoyment, growing pressure, burnout, and negative sporting experiences.",
      "This does not mean competitive sports are the problem. It shows that the environment surrounding young athletes matters. When parents, coaches, and organizations create positive experiences, children are more likely to remain involved, continue developing, and enjoy sports for years to come.",
    ],
    resource: "Resource: Aspen Institute — State of Play; Sports & Fitness Industry Association",
  },
  {
    title: "Kids Don't Usually Quit Because They Aren't Good Enough",
    body: [
      "Youth sports research repeatedly shows that many young athletes do not leave because they lack ability. They leave because the experience stops being enjoyable.",
      "Fun, belonging, friendships, improvement, and feeling supported consistently rank among the strongest reasons children continue participating. As pressure increases and enjoyment decreases, motivation can begin to disappear.",
      "Parents can support development and healthy competition without unintentionally removing the joy that makes young athletes want to keep playing.",
    ],
    resource: "Resource: Aspen Institute Project Play; Sports & Fitness Industry Association",
  },
  {
    title: "Confidence Is Built Through Everyday Experiences",
    body: [
      "Confidence is not something that can simply be given to an athlete before a game.",
      "Sport psychology research suggests that confidence develops gradually through learning, overcoming challenges, receiving support, and recognizing progress over time.",
      "Conversations after practices and games, responses to mistakes, and opportunities for athletes to solve problems independently can all influence how they see themselves.",
    ],
    resource: "Resource: Self-Determination Theory — Deci and Ryan; Achievement Goal Theory; sport psychology research",
  },
  {
    title: "Burnout Often Happens Slowly",
    body: [
      "Burnout rarely appears overnight.",
      "It can develop gradually through constant competition, year-round schedules, increasing expectations, limited recovery, and the feeling that an athlete must always perform.",
      "Many young athletes continue showing up long after they have stopped enjoying the experience. By the time they say they want to quit, the emotional exhaustion may have been building for months or even years.",
      "Recognizing the warning signs early can help families protect an athlete's performance, enjoyment, and overall well-being.",
    ],
    resource: "Resource: American Academy of Pediatrics; Aspen Institute",
  },
  {
    title: "Parents Have More Influence Than They Realize",
    body: [
      "Research consistently shows that parents play an important role in a young athlete's experience.",
      "Conversations at home, reactions after games, expectations around performance, and daily emotional support can all influence confidence, motivation, and enjoyment.",
      "Parents cannot control every coach, roster decision, opportunity, or game result.",
      "They can control the environment they create around their athlete every day.",
    ],
    resource: "Resource: Aspen Institute Project Play; youth sport psychology research",
  },
];

export default function ResearchEvidencePage() {
  return (
    <main className="flex flex-col min-h-screen bg-background text-charcoal">
      <Nav />

      {/* SECTION 1: HERO */}
      <section className="bg-cream py-20 md:py-28">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.div {...fadeUp}>
            <p
              className="font-heading text-xs font-semibold uppercase mb-4"
              style={{ letterSpacing: "0.18em", color: "#858C89" }}
            >
              Research &amp; Evidence
            </p>
            <h1 className="font-heading text-3xl md:text-4xl font-bold mb-6 leading-tight">
              What the Research Says About Youth Sports
            </h1>
            <div className="font-body text-text-body leading-relaxed space-y-4 text-left md:text-center">
              <p>
                Youth sports can provide young athletes with confidence,
                friendships, life lessons, and experiences that stay with them
                for years.
              </p>
              <p>
                They can also bring pressure, burnout, declining enjoyment,
                and difficult moments for athletes and their families.
              </p>
              <p>
                The research and articles below help explain some of the
                challenges facing young athletes today.
              </p>
              <p>
                We&apos;ve summarized the key ideas in clear, practical
                language so parents can understand the findings without
                leaving the Long Game website.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: FINDINGS */}
      <section className="max-w-3xl mx-auto w-full px-6 py-20 md:py-28">
        <div className="space-y-16">
          {findings.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.05 }}
              className="border-b border-border-grey pb-16 last:border-0"
            >
              <h2 className="font-heading text-2xl font-bold mb-4 leading-snug">
                {f.title}
              </h2>
              <div className="font-body text-text-body leading-relaxed space-y-4 mb-5">
                {f.body.map((p, j) => (
                  <p key={j}>{p}</p>
                ))}
              </div>
              <p className="font-heading text-xs italic text-teal tracking-wide">
                {f.resource}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SECTION 3: WHY LONG GAME EXISTS */}
      <section className="bg-ink text-cream py-20 md:py-28">
        <div className="max-w-3xl mx-auto px-6">
          <motion.div {...fadeUp}>
            <p className="font-heading text-teal text-sm font-semibold tracking-widest uppercase mb-6">
              Why Long Game Exists
            </p>
            <div className="font-body text-cream/80 leading-relaxed space-y-4">
              <p>
                These findings reflect many of the challenges I have seen
                firsthand—as a coach and as a parent raising athletes.
              </p>
              <p>I have seen how quickly confidence can change.</p>
              <p>
                I have seen how pressure can enter a relationship without a
                parent ever intending it.
              </p>
              <p>
                I have seen how much the conversations after practices,
                games, mistakes, and disappointments matter.
              </p>
              <p>
                Parents care deeply about their athletes. But during the
                hardest moments, knowing what to say or do is not always
                easy.
              </p>
              <p className="font-semibold text-cream">
                That is why I created Long Game.
              </p>
              <p>
                To give sports parents practical guidance for the real
                situations families face.
              </p>
              <p>
                To help parents support confidence, development, and
                resilience without losing sight of the relationship behind it
                all.
              </p>
              <p>Because every season eventually ends.</p>
              <p className="font-semibold text-cream">
                The relationship does not.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 4: READY TO TAKE THE NEXT STEP */}
      <section className="max-w-3xl mx-auto w-full px-6 py-20 md:py-28 text-center">
        <motion.div {...fadeUp}>
          <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4">
            Ready to Take the Next Step?
          </h2>
          <p className="font-body text-text-body leading-relaxed mb-8 max-w-xl mx-auto">
            Explore practical guidance created to help you support your
            athlete through the moments that matter most.
          </p>
          <Link
            href="/parent-academy"
            className="inline-flex items-center gap-2 bg-ink text-cream font-heading font-semibold px-8 py-3 rounded-lg hover:bg-charcoal transition-colors"
          >
            Explore the Parent Academy
          </Link>
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}