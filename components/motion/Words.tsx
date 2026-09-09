"use client";

import { motion } from "framer-motion";

type WordsProps = {
  text: string;
  /** seconds before the first word starts */
  delay?: number;
  /** render inline instead of block */
  className?: string;
  /** index of a word to wrap with the highlight slot */
  highlight?: number;
  /** delay before the underline draws */
  underlineDelay?: number;
};

/** Headline reveal: each word slides up out of its own clip box. */
export function Words({ text, delay = 0, className, highlight, underlineDelay = 0.9 }: WordsProps) {
  const words = text.split(" ");
  return (
    <span className={className}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
          <motion.span
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            transition={{ delay: delay + i * 0.07, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="inline-block"
          >
            {i === highlight ? (
              <span className="relative inline-block">
                {word}
                <motion.svg
                  viewBox="0 0 200 14"
                  preserveAspectRatio="none"
                  aria-hidden
                  className="absolute -bottom-[0.08em] left-0 h-[0.28em] w-full"
                >
                  <motion.path
                    d="M3 9 C 40 3, 90 12, 130 6 S 185 4, 197 8"
                    fill="none"
                    stroke="var(--sky)"
                    strokeWidth="4"
                    strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ delay: underlineDelay, duration: 0.7, ease: "easeOut" }}
                  />
                </motion.svg>
              </span>
            ) : (
              word
            )}
          </motion.span>
          {i < words.length - 1 ? " " : null}
        </span>
      ))}
    </span>
  );
}
