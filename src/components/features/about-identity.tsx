"use client";

import { motion, useReducedMotion } from "framer-motion";

type AboutIdentityProps = {
  words: string[];
};

const LAYOUT_LINES = [
  { left: "I AM", right: "CREATIVE THINKER", indent: "pl-[5%]" },
  { left: "", right: "DREAMER", indent: "pl-[20%]" },
  { left: "", right: "OBSERVER", indent: "pl-[35%]" },
  { left: "PERFORMER", right: "", indent: "pl-[8%]" },
  { left: "", right: "MULTI-TASKER", indent: "pl-[28%]" },
  { left: "EXPERIMENTER", right: "", indent: "pl-[5%]" },
  { left: "AND", right: "BOUNDARY PUSHER", indent: "pl-[15%]" },
];

export function AboutIdentity({ words }: AboutIdentityProps) {
  const prefersReducedMotion = useReducedMotion();

  // Use DB words if available, otherwise use the default layout
  const lines = words.length > 0
    ? words.map((word, i) => ({
        text: word.toUpperCase(),
        indent: LAYOUT_LINES[i % LAYOUT_LINES.length]?.indent ?? "pl-[10%]",
      }))
    : LAYOUT_LINES.map((line) => ({
        text: [line.left, line.right].filter(Boolean).join("    "),
        indent: line.indent,
      }));

  return (
    <div className="bg-[var(--color-surface)] py-20 md:py-28 overflow-hidden">
      <div className="mx-auto w-full max-w-[var(--max-width)] px-[var(--space-page-x)]">
        <motion.p
          className="text-[10px] font-medium tracking-[0.2em] uppercase text-[var(--color-ink-muted)] text-center mb-10"
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
        >
          Driven by Curiosity
        </motion.p>

        <div className="space-y-1 md:space-y-2">
          {lines.map((line, i) => (
            <motion.div
              key={i}
              className={line.indent}
              initial={prefersReducedMotion ? {} : { opacity: 0, x: i % 2 === 0 ? -120 : 120 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.6,
                delay: 0.07 * i,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold uppercase tracking-tight text-[var(--color-ink)] leading-[1.05]">
                {line.text}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
