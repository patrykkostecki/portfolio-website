"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useState } from "react";

import type { Messages } from "@/lib/i18n";
import { spotlight } from "@/lib/spotlight";

type FaqProps = {
  messages: Messages;
};

export function Faq({ messages }: FaqProps) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="relative px-4 py-12">
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--sky)]">
            {messages.faq.eyebrow}
          </span>
          <h2 className="mt-4 font-[family-name:var(--font-display)] text-3xl font-bold sm:text-4xl">
            {messages.faq.title}
          </h2>
        </motion.div>

        <div className="mt-10 flex flex-col gap-3">
          {messages.faq.items.map((item, index) => {
            const isOpen = open === index;
            return (
              <motion.div
                key={item.q}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
                onMouseMove={spotlight}
                className={`glass spot overflow-hidden rounded-[1.5rem] transition-colors duration-300 ${
                  isOpen ? "border-[rgba(56,182,255,0.3)]" : ""
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : index)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-[family-name:var(--font-display)] text-base font-semibold">{item.q}</span>
                  <span
                    className={`grad-border flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/5 transition-transform duration-300 ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  >
                    <Plus className="h-4 w-4 text-[var(--sky)]" />
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <p className="px-6 pb-6 text-sm leading-relaxed text-[var(--text-dim)]">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
