"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Plus, X } from "lucide-react";

const quizData = [
  {
    id: "tough-game",
    label: "After the tough game",
    sub: "The drive home was quiet and you're not sure you said the right thing.",
    photo: "/moment-tough-game.jpg",
    alt: "Athlete sitting alone on a bench after a game",
    story:
      "Most parents fill the silence in the car. It feels supportive. It rarely is. The instinct to say something useful is exactly what turns a fifteen-minute drive into the moment an athlete remembers years later — for the wrong reasons. There's a window where that conversation actually helps. It isn't in the car.",
    bridge: "The Parent Academy walks you through exactly where that window is.",
    ctaLabel: "See what's inside →",
  },
  {
    id: "confidence-disappeared",
    label: "Confidence disappeared",
    sub: "The kid who used to play free now plays scared.",
    photo: "/moment-confidence.jpg",
    alt: "Young athlete pausing mid-swing in a batting cage",
    story:
      "An athlete who used to play free starts playing not to fail. It happens on good teams, to good athletes, without warning. The typical response — more reps, a pep talk, a hard conversation about effort — usually makes it worse. What rebuilds confidence looks almost nothing like what most parents try first.",
    bridge: "The Parent Academy shows you what actually rebuilds it.",
    ctaLabel: "See what's inside →",
  },
  {
    id: "wants-to-quit",
    label: "They said they want to quit",
    sub: "You don't know if this is a bad week talking, or something real.",
    photo: "/moment-quit.jpg",
    alt: "Athlete sitting alone in an empty arena after a game",
    story:
      "This sentence triggers panic in almost every sports parent. The problem isn't the reaction — it's that a bad week and a real decision sound identical in the moment. Getting that distinction wrong in either direction costs something.",
    bridge: "The Parent Academy gives you a reliable way to tell them apart.",
    ctaLabel: "See what's inside →",
  },
  {
    id: "coach-situation",
    label: "The coach situation is hard",
    sub: "You're trying to figure out if this is worth a conversation, or worth letting go.",
    photo: "/moment-coaches.jpg",
    alt: "Parent watching practice from the sideline",
    story:
      "Every competitive season produces at least one moment like this — playing time, communication, tone — where a parent has to decide whether to speak up or stand down. Most get the call wrong, in both directions, more often than they realize.",
    bridge: "The Parent Academy gives you the framework for reading it correctly.",
    ctaLabel: "See what's inside →",
  },
  {
    id: "bleeding-into-home",
    label: "It's bleeding into home",
    sub: "Sport used to be the thing your family enjoyed together.",
    photo: "/moment-home.jpg",
    alt: "Family sitting quietly together in the kitchen",
    story:
      "Family tension around sport rarely arrives as one event. It builds — one tense car ride at a time — until a season everyone used to enjoy starts to feel like something to survive.",
    bridge:
      "The Parent Academy shows you the pattern families catch early — before it costs something bigger.",
    ctaLabel: "See what's inside →",
  },
] as const;

declare global {
  interface Window {
    analytics?: { track?: (event: string, props: Record<string, unknown>) => void };
  }
}

function track(event: string, branch_id: string) {
  if (typeof window !== "undefined") {
    window.analytics?.track?.(event, { branch_id });
  }
}

export default function QuizSection() {
  const [openId, setOpenId] = useState<string | null>(null);
  const reduceMotion = useReducedMotion();

  const toggle = (id: string) => {
    const next = openId === id ? null : id;
    setOpenId(next);
    if (next) track("quiz_card_opened", next);
  };

  const scrollToPricing = (id: string) => {
    track("quiz_cta_clicked", id);
    document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="quiz-section" className="bg-cream py-20 md:py-32">
      <div className="max-w-2xl mx-auto px-6 text-center mb-12">
        <p className="font-heading text-teal text-sm font-semibold tracking-widest uppercase eyebrow">
          Find Your Moment
        </p>
        <h2 className="font-heading text-3xl md:text-4xl font-bold mb-3">
          What&apos;s going on for you two right now?
        </h2>
        <p className="font-body text-text-body leading-relaxed">
          Pick the one that&apos;s closest to tonight.
        </p>
      </div>

      <div className="max-w-3xl mx-auto px-6 grid grid-cols-2 gap-4">
        {quizData.map((item, i) => {
          const isOpen = openId === item.id;
          const isLastOdd = i === quizData.length - 1 && quizData.length % 2 === 1;
          return (
            <div
              key={item.id}
              className={`rounded-sm border overflow-hidden transition-colors ${
                isOpen || isLastOdd ? "col-span-2" : ""
              } ${
                isOpen ? "border-teal shadow-[0_4px_20px_rgba(20,24,26,0.08)]" : "border-border-grey"
              }`}
            >
              <button
                type="button"
                onClick={() => toggle(item.id)}
                aria-expanded={isOpen}
                aria-controls={`quiz-panel-${item.id}`}
                className="relative w-full h-[230px] block text-left"
              >
                <img
                  src={item.photo}
                  alt={item.alt}
                  className="w-full h-full object-cover grayscale contrast-[1.05]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent flex items-end p-5">
                  <div>
                    <span className="block font-heading font-semibold text-lg text-cream mb-1">
                      {item.label}
                    </span>
                    <span className="block font-body text-sm text-cream/80 leading-snug">
                      {item.sub}
                    </span>
                  </div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => toggle(item.id)}
                aria-expanded={isOpen}
                aria-controls={`quiz-panel-${item.id}`}
                className="w-full flex items-center justify-center gap-2 py-3 bg-cream font-heading text-sm font-semibold text-charcoal"
              >
                {isOpen ? "Close" : "See what this means"}
                {isOpen ? <X size={16} className="text-teal" /> : <Plus size={16} className="text-teal" />}
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={`quiz-panel-${item.id}`}
                    initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
                    transition={{ duration: reduceMotion ? 0 : 0.3, ease: "easeInOut" } as const}
                    className="overflow-hidden bg-cream"
                  >
                    <div
                      className="px-5 pb-6 pt-1"
                      ref={(el) => {
                        if (el && isOpen) el.focus();
                      }}
                      tabIndex={-1}
                    >
                      <p className="font-body text-sm text-text-body leading-relaxed">
                        {item.story}
                      </p>
                      <div className="flex flex-wrap items-center gap-3 mt-4 pt-3 border-t border-dashed border-border-grey">
                        <p className="font-body italic text-sm text-teal flex-1 min-w-[180px]">
                          {item.bridge}
                        </p>
                        <button
                          type="button"
                          onClick={() => scrollToPricing(item.id)}
                          className="font-heading text-sm font-semibold text-charcoal border-b border-teal pb-0.5 whitespace-nowrap"
                        >
                          {item.ctaLabel}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}