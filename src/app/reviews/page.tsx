"use client";

import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { ALL_REVIEWS } from "@/lib/reviews";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease: "easeOut" },
} as const;

export default function ReviewsPage() {
  return (
    <main className="flex flex-col min-h-screen bg-background text-charcoal">
      <Nav />

      <section className="bg-cream py-20 md:py-28">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.p
            {...fadeUp}
            className="font-heading text-teal text-[13px] font-semibold tracking-widest uppercase eyebrow"
          >
            Parent Reviews
          </motion.p>
          <motion.h1
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.05 }}
            className="font-heading text-3xl md:text-4xl font-bold leading-tight mb-4"
          >
            What parents are saying about Long Game.
          </motion.h1>
          <motion.p
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.1 }}
            className="font-body text-text-body leading-relaxed max-w-xl mx-auto"
          >
            Real feedback from parents and coaches who have experienced the
            principles behind Long Game.
          </motion.p>
        </div>
      </section>

      {/* The reviews read as quotes, not as marketplace listings: no dates,
          no counts — just the words and who said them. Keyed by index because
          several reviewers share a name. */}
      <section className="py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-5 md:gap-6">
            {ALL_REVIEWS.map((review, i) => (
              <motion.figure
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.5,
                  ease: "easeOut",
                  // Stagger by row rather than by card, so the delay stays
                  // short on mobile where the cards are a single column.
                  delay: (i % 2) * 0.08,
                }}
                className="bg-cream border border-border-grey rounded-2xl p-7 md:p-8 text-left flex flex-col"
              >
                <div className="flex gap-1 mb-4" aria-label="Rated 5 out of 5">
                  {[...Array(5)].map((_, idx) => (
                    <Star key={idx} className="w-4 h-4 text-teal fill-teal" aria-hidden="true" />
                  ))}
                </div>
                {review.title && (
                  <p className="font-heading text-base font-bold leading-snug mb-3">
                    {review.title}
                  </p>
                )}
                <blockquote className="font-body italic text-base md:text-lg leading-relaxed mb-6 flex-1">
                  &ldquo;{review.quote}&rdquo;
                </blockquote>
                <figcaption className="border-t border-border-grey pt-4">
                  <p className="font-heading font-semibold text-sm">
                    {review.name}
                  </p>
                </figcaption>
              </motion.figure>
            ))}
          </div>

          <motion.div {...fadeUp} className="text-center mt-14 md:mt-16">
            <Link
              href="/parent-academy"
              className="font-heading text-sm font-semibold text-teal hover:underline"
            >
              See what&apos;s inside the Parent Academy &rarr;
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
