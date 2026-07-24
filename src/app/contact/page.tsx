"use client";

import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

export default function ContactPage() {
  return (
    <main className="flex flex-col min-h-screen bg-background text-charcoal">
      <Nav />
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-2xl mx-auto w-full px-6 py-20 text-center"
      >
        <h1 className="font-heading text-4xl font-bold mb-6">Get in Touch</h1>
        <p className="font-body text-lg text-text-body mb-10">
          Have a question about the Parent Academy or want to bring Long Game
          to your organization? Reach out below.
        </p>
        <a
          href="mailto:hello@longgameacademy.com"
          className="inline-flex items-center gap-2 bg-ink text-cream font-heading font-semibold px-8 py-3 rounded-lg hover:bg-charcoal transition-colors"
        >
          hello@longgameacademy.com
        </a>
      </motion.section>
      <Footer />
    </main>
  );
}




