"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="mt-auto bg-ink text-cream"
    >
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-2 md:grid-cols-4 gap-10">
        <div>
          <p className="font-heading text-gold text-xs font-semibold tracking-widest uppercase border border-gold rounded-full px-3 py-1 inline-block mb-5">
            Explore
          </p>
          <ul className="space-y-3 font-body text-sm">
            <li><Link href="/parent-academy" className="hover:text-gold transition-colors">Parent Academy</Link></li>
            <li><Link href="/organizations" className="hover:text-gold transition-colors">Organizations</Link></li>
            <li><Link href="/our-story" className="hover:text-gold transition-colors">The Book</Link></li>
            <li><Link href="/our-story" className="hover:text-gold transition-colors">About</Link></li>
            <li><Link href="/contact" className="hover:text-gold transition-colors">Contact</Link></li>
          </ul>
        </div>

        <div>
          <p className="font-heading text-gold text-xs font-semibold tracking-widest uppercase border border-gold rounded-full px-3 py-1 inline-block mb-5">
            Resources
          </p>
          <ul className="space-y-3 font-body text-sm">
            <li><Link href="/free-guide" className="hover:text-gold transition-colors">Free Guide</Link></li>
            <li><Link href="/faq" className="hover:text-gold transition-colors">FAQ</Link></li>
            <li><Link href="/privacy" className="hover:text-gold transition-colors">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-gold transition-colors">Terms of Service</Link></li>
            <li><Link href="/cookies" className="hover:text-gold transition-colors">Cookie Policy</Link></li>
            <li><Link href="/disclaimer" className="hover:text-gold transition-colors">Disclaimer</Link></li>
          </ul>
        </div>

        <div>
          <p className="font-heading text-gold text-xs font-semibold tracking-widest uppercase border border-gold rounded-full px-3 py-1 inline-block mb-5">
            Connect
          </p>
          <div className="flex gap-3">
            <span className="w-9 h-9 rounded-full bg-cream text-ink flex items-center justify-center text-sm">IG</span>
            <span className="w-9 h-9 rounded-full bg-cream text-ink flex items-center justify-center text-sm">FB</span>
            <span className="w-9 h-9 rounded-full bg-cream text-ink flex items-center justify-center text-sm">in</span>
            <span className="w-9 h-9 rounded-full bg-cream text-ink flex items-center justify-center text-sm">@</span>
          </div>
        </div>

        <div>
          <p className="font-heading text-gold text-xs font-semibold tracking-widest uppercase border border-gold rounded-full px-3 py-1 inline-block mb-5">
            Long Game
          </p>
          <p className="font-body text-sm text-cream/70">
            Helping families build stronger relationships through youth
            sports.
          </p>
        </div>
      </div>

      <div className="border-t border-cream/10">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-body text-cream/60">
          <p>© 2026 Long Game. All Rights Reserved.</p>
          <img src="/logo-white.png" alt="Long Game" className="h-8 w-auto mx-auto" />
          <p>Designed with the long game in mind.</p>
        </div>
      </div>
    </motion.footer>
  );
}