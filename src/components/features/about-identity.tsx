"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

type AboutIdentityProps = {
  words: string[];
};

const DEFAULT_WORDS = [
  "CREATIVE THINKER",
  "DREAMER",
  "OBSERVER",
  "PERFORMER",
  "MULTI-TASKER",
  "EXPERIMENTER",
  "BOUNDARY PUSHER",
];

const CYCLE_INTERVAL = 2400;

export function AboutIdentity({ words }: AboutIdentityProps) {
  const prefersReducedMotion = useReducedMotion();
  const displayWords = words.length > 0 ? words.map((w) => w.toUpperCase()) : DEFAULT_WORDS;
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % displayWords.length);
    }, CYCLE_INTERVAL);
    return () => clearInterval(timer);
  }, [displayWords.length, prefersReducedMotion]);

  return (
    <div className="bg-[var(--color-surface)] py-24 md:py-32 overflow-hidden">
      <div className="mx-auto w-full max-w-[var(--max-width)] px-[var(--space-page-x)]">
        <motion.p
          className="text-[10px] font-medium tracking-[0.2em] uppercase text-[var(--color-ink-muted)] text-center mb-3"
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
        >
          Driven by Curiosity
        </motion.p>

        <motion.p
          className="text-[10px] font-medium tracking-[0.2em] uppercase text-[var(--color-ink-muted)] text-center mb-6"
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          I Am
        </motion.p>

        <div className="relative flex items-center justify-center min-h-[1.2em]" style={{ minHeight: "clamp(2.5rem, 8vw, 6rem)" }}>
          <AnimatePresence mode="wait">
            <motion.span
              key={currentIndex}
              className="absolute text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold uppercase tracking-tight text-[var(--color-ink)] leading-[1.05] text-center"
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={prefersReducedMotion ? {} : { opacity: 0, y: -30 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              {displayWords[currentIndex]}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
