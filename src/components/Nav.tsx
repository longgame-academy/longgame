"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Show, UserButton } from "@clerk/nextjs";

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full border-b border-charcoal/10"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-5">
        <Link href="/" className="flex items-center">
          <img src="/logo-black.png" alt="Long Game" className="h-16 w-auto" />
        </Link>
        <nav className="hidden md:flex items-center gap-8 font-heading text-sm font-medium">
          <Link href="/parent-academy" className="hover:text-gold transition-colors">
            Parent Academy
          </Link>
          <Link href="/organizations" className="hover:text-gold transition-colors">
            Organizations
          </Link>
          <Link href="/free-guide" className="hover:text-gold transition-colors">
            Free Guide
          </Link>
          <Link href="/our-story" className="hover:text-gold transition-colors">
            Our Story
          </Link>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <Show when="signed-out">
            <Link
              href="/sign-in"
              className="font-heading text-sm font-semibold border border-charcoal px-5 py-2 rounded-full hover:bg-charcoal hover:text-cream transition-colors"
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
            className="md:hidden overflow-hidden border-t border-charcoal/10"
          >
            <div className="flex flex-col gap-1 px-6 py-4 font-heading text-sm font-medium">
              <Link href="/parent-academy" onClick={() => setOpen(false)} className="py-3 hover:text-gold transition-colors">
                Parent Academy
              </Link>
              <Link href="/organizations" onClick={() => setOpen(false)} className="py-3 hover:text-gold transition-colors">
                Organizations
              </Link>
              <Link href="/free-guide" onClick={() => setOpen(false)} className="py-3 hover:text-gold transition-colors">
                Free Guide
              </Link>
              <Link href="/our-story" onClick={() => setOpen(false)} className="py-3 hover:text-gold transition-colors">
                Our Story
              </Link>
              <Show when="signed-out">
                <Link
                  href="/sign-in"
                  onClick={() => setOpen(false)}
                  className="mt-2 text-center border border-charcoal px-5 py-3 rounded-full hover:bg-charcoal hover:text-cream transition-colors"
                >
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

