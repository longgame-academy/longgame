"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Car, Compass, Signpost, Speaker, Home } from "lucide-react";

const quizData = [
  {
    id: "tough-game",
    label: "After the tough game",
    sub: "The drive home was quiet and you're not sure you said the right thing.",
    icon: Car,
    story:
      "Most parents fill the silence in the car. It feels supportive. It rarely is. The instinct to say something useful is exactly what turns a fifteen-minute drive into the moment an athlete remembers years later — for the wrong reasons. There's a window where that conversation actually helps. It isn't in the car.",
    bridge: "The Parent Academy walks you through exactly where that window is.",
    ctaLabel: "See what's inside →",
  },
  {
    id: "confidence-disappeared",
    label: "Confidence disappeared",
    sub: "The kid who used to play free now plays scared.",
    icon: Compass,
    story:
      "An athlete who used to play free starts playing not to fail. It happens on good teams, to good athletes, without warning. The typical response — more reps, a pep talk, a hard conversation about effort — usually makes it worse. What rebuilds confidence looks almost nothing like what most parents try first.",
    bridge: "The Parent Academy shows you what actually rebuilds it.",
    ctaLabel: "See what's inside →",
  },
  {
    id: "wants-to-quit",
    label: "They said they want to quit",
    sub: "You don't know if this is a bad week talking, or something real.",
    icon: Signpost,
    story:
      "This sentence triggers panic in almost every sports parent. The problem isn't the reaction — it's that a bad week and a real decision sound identical in the moment. Getting that distinction wrong in either direction costs something.",
    bridge: "The Parent Academy gives you a reliable way to tell them apart.",
    ctaLabel: "See what's inside →",
  },
  {
    id: "coach-situation",
    label: "The coach situation is hard",
    sub: "You're trying to figure out if this is worth a conversation, or worth letting go.",
    icon: Speaker,
    story:
      "Every competitive season produces at least one moment like this — playing time, communication, tone — where a parent has to decide whether to speak up or stand down. Most get the call wrong, in both directions, more often than they realize.",
    bridge: "The Parent Academy gives you the framework for reading it correctly.",
    ctaLabel: "See what's inside →",
  },
  {
    id: "bleeding-into-home",
    label: "It's bleeding into home",
    sub: "Sport used to be the thing your family enjoyed together.",
    icon: Home,
    story:
      "Family tension around sport rarely arrives as one event. It builds — one tense car ride at a time — until a season everyone used to enjoy starts to feel like something to survive.",
    bridge:
      "The Parent Academy shows you the pattern families catch early — before it costs something bigger.",
    ctaLabel: "See what's inside →",
  },
] as const;

function track(event: string, branch_id: string) {
  if (typeof window !== "undefined") {
    (window as any).analytics?.track?.(event, { branch_id });
  }
}

export default function QuizSection() {
  const [openId, setOpenId] = useState<string | null>(null);

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
    <section className="bg-cream py-16 md:py-24">
      <div className="max-w-2xl mx-auto px-6 text-center mb-14">
        <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Find Your Moment</h2>
        <p className="font-body text-text-body leading-relaxed">
          What's going on right now?
          <br />
          Pick the one that's closest to tonight.
        </p>
      </div>

      <div className="max-w-2xl mx-auto px-6 space-y-3">
        {quizData.map((item) => {
          const Icon = item.icon;
          const isOpen = openId === item.id;
          return (
            <div
              key={item.id}
              className={`rounded-2xl border transition-colors ${
                isOpen ? "border-teal bg-cream" : "border-border-grey bg-background"
              }`}
            >
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`quiz-panel-${item.id}`}
                onClick={() => toggle(item.id)}
                className="w-full flex items-center gap-4 p-5 text-left"
              >
                <span
                  className={`flex items-center justify-center w-11 h-11 rounded-full border shrink-0 ${
                    isOpen ? "border-teal text-teal" : "border-border-grey text-charcoal"
                  }`}
                >
                  <Icon size={18} strokeWidth={1.5} />
                </span>
                <span>
                  <span className="block font-heading font-semibold text-sm">{item.label}</span>
                  <span className="block font-body text-sm text-text-muted mt-0.5">
                    {item.sub}
                  </span>
                </span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={`quiz-panel-${item.id}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" } as const}
                    className="overflow-hidden"
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
                      <p className="font-body italic text-sm text-teal mt-4">{item.bridge}</p>
                      <button
                        type="button"
                        onClick={() => scrollToPricing(item.id)}
                        className="mt-4 font-heading text-sm font-semibold text-teal hover:underline"
                      >
                        {item.ctaLabel}
                      </button>
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