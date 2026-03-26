"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

type AboutIdentityProps = {
  words: string[];
};

export function AboutIdentity({ words }: AboutIdentityProps) {
  const [index, setIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <div className="bg-[var(--color-ink)] text-white py-24 md:py-32">
      <div className="mx-auto w-full max-w-[var(--max-width)] px-[var(--space-page-x)] text-center">
        <p className="text-[10px] font-medium tracking-[0.2em] uppercase text-white/40 mb-6">I Am</p>
        <div className="h-20 md:h-28 flex items-center justify-center overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.span
              key={words[index]}
              className="heading-display block"
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={prefersReducedMotion ? {} : { opacity: 0, y: -30 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              {words[index]}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
