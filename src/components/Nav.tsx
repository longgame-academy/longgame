"use client";

import Link from "next/link";
import { useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
  useReducedMotion,
} from "framer-motion";
import { Show, UserButton } from "@clerk/nextjs";

/** Scrolled past roughly the header's own height before it starts hiding. */
const HIDE_AFTER = 120;

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    // The mobile menu lives inside the header, so it can never slide away
    // underneath an open menu. Reduced motion keeps the header pinned instead.
    if (open || reduceMotion) {
      setHidden(false);
      return;
    }

    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > HIDE_AFTER) setHidden(true);
    else if (latest < previous) setHidden(false);
  });

  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: hidden ? "-100%" : 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      // bg-inherit picks up whichever background the page's <main> sets, so
      // pinning the header doesn't change how it looks on any page.
      className="sticky top-0 z-50 w-full bg-inherit border-b border-border-grey"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-5">
        <Link href="/" className="flex items-center">
          <img src="/logo-black.png" alt="Long Game" className="h-8 w-auto" />
        </Link>
        <nav className="hidden md:flex items-center gap-8 font-heading text-sm font-medium">
          <Link href="/parent-academy" className="hover:text-teal transition-colors">
            Parent Academy
          </Link>
          <Link href="/organizations" className="hover:text-teal transition-colors">
            Organizations
          </Link>
          <Link href="/free-guide" className="hover:text-teal transition-colors">
            Free Guide
          </Link>
          <Link href="/our-story" className="hover:text-teal transition-colors">
            Our Story
          </Link>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <Show when="signed-out">
            <Link
              href="/sign-in"
              className="font-heading text-sm font-semibold border border-charcoal px-5 py-2 rounded-lg hover:bg-charcoal hover:text-cream transition-colors"
            >
              Sign In
            </Link>
          </Show>
          <Show when="signed-in">
            <UserButton />
          </Show>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-charcoal transition-transform ${open ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-6 h-0.5 bg-charcoal transition-opacity ${open ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-0.5 bg-charcoal transition-transform ${open ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="md:hidden overflow-hidden border-t border-border-grey"
          >
            <div className="flex flex-col gap-1 px-6 py-4 font-heading text-sm font-medium">
              <Link href="/parent-academy" onClick={() => setOpen(false)} className="py-3 hover:text-teal transition-colors">
                Parent Academy
              </Link>
              <Link href="/organizations" onClick={() => setOpen(false)} className="py-3 hover:text-teal transition-colors">
                Organizations
              </Link>
              <Link href="/free-guide" onClick={() => setOpen(false)} className="py-3 hover:text-teal transition-colors">
                Free Guide
              </Link>
              <Link href="/our-story" onClick={() => setOpen(false)} className="py-3 hover:text-teal transition-colors">
                Our Story
              </Link>
              <Show when="signed-out">
                <Link
                  href="/sign-in"
                  onClick={() => setOpen(false)}
                  className="mt-2 text-center border border-charcoal px-5 py-3 rounded-lg hover:bg-charcoal hover:text-cream transition-colors"                >
                  Sign In
                </Link>
              </Show>
              <Show when="signed-in">
                <div className="pt-2">
                  <UserButton />
                </div>
              </Show>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}



