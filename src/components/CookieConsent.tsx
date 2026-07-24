"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("lg-cookie-consent");
    if (!consent) setVisible(true);
  }, []);

  function accept() {
    localStorage.setItem("lg-cookie-consent", "accepted");
    setVisible(false);
  }

  function decline() {
    localStorage.setItem("lg-cookie-consent", "declined");
    setVisible(false);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed bottom-0 inset-x-0 z-50 bg-charcoal text-cream border-t border-border-grey"
        >
          <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col md:flex-row items-center gap-4 justify-between">
            <p className="font-body text-sm text-cream/80 leading-relaxed">
              We use cookies to improve your experience and understand how our site is used. See our{" "}
              <Link href="/cookies" className="underline hover:text-teal">
                Cookie Policy
              </Link>{" "}
              for details.
            </p>
            <div className="flex gap-3 shrink-0">
              <button
                onClick={decline}
                className="font-heading text-sm font-semibold border border-cream/30 text-cream px-5 py-2 rounded-lg hover:border-teal hover:text-teal transition-colors"
              >
                Decline
              </button>
              <button
                onClick={accept}
                className="font-heading text-sm font-semibold bg-cream text-ink px-5 py-2 rounded-lg hover:bg-cream/90 transition-colors"
              >
                Accept
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}


