"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Show, UserButton } from "@clerk/nextjs";

export default function Nav() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full border-b border-charcoal/10"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-5">
        <Link href="/" className="font-heading font-bold text-xl tracking-wide">
          LONG GAME
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
    </motion.header>
  );
}