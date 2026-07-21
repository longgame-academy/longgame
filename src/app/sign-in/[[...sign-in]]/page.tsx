"use client";

import { SignIn } from "@clerk/nextjs";
import { motion } from "framer-motion";

export default function Page() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex min-h-screen items-center justify-center bg-background"
    >
      <SignIn />
    </motion.div>
  );
}