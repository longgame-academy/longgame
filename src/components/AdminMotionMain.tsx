"use client";

import { motion } from "framer-motion";

export function AdminMotionMain({ children }: { children: React.ReactNode }) {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="max-w-7xl mx-auto px-6 py-10"
    >
      {children}
    </motion.main>
  );
}
