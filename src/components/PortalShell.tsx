"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { UserButton } from "@clerk/nextjs";

export function PortalShell({
  children,
  orgName,
}: {
  children: React.ReactNode;
  orgName: string | null;
}) {
  return (
    <div className="min-h-screen bg-cream text-charcoal">
      <motion.header
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="bg-ink text-cream"
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/portal" className="font-heading font-bold tracking-wide">
            LONG GAME
          </Link>
          <nav className="hidden md:flex items-center gap-6 font-heading text-sm">
            <Link href="/portal" className="hover:text-gold transition-colors">
              Dashboard
            </Link>
            <Link href="/portal/modules" className="hover:text-gold transition-colors">
              Modules
            </Link>
            <Link href="/portal/field-guides" className="hover:text-gold transition-colors">
              Field Guides
            </Link>
            <Link href="/portal/tools" className="hover:text-gold transition-colors">
              Tools
            </Link>
            <Link href="/portal/account" className="hover:text-gold transition-colors">
              Account
            </Link>
            <Link href="/portal/support" className="hover:text-gold transition-colors">
              Support
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            {orgName && (
              <span className="hidden md:inline font-heading text-xs text-gold">
                {orgName}
              </span>
            )}
            <UserButton />
          </div>
        </div>
      </motion.header>

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="max-w-6xl mx-auto px-6 py-10"
      >
        {children}
      </motion.main>
    </div>
  );
}