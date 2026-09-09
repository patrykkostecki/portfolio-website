"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useState } from "react";

import { Reveal } from "@/components/motion/Reveal";
import { SectionHead } from "@/components/SectionHead";
import type { Messages } from "@/lib/i18n";

type FaqProps = {
  messages: Messages;
};

export function Faq({ messages }: FaqProps) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="relative px-4 py-28 sm:px-6 sm:py-36">
      <div className="mx-auto max-w-6xl">
        <SectionHead index="04" eyebrow={messages.faq.eyebrow} title={messages.faq.title} />

        <div className="mt-12 md:ml-[calc(10rem+2.5rem)]">
          {messages.faq.items.map((item, index) => {
            const isOpen = open === index;
            return (
              <Reveal key={item.q} delay={index * 0.05} y={12} className="border-t border-[var(--line)] last:border-b">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  className="group flex w-full items-center justify-between gap-6 py-6 text-left"
                >
                  <span className="flex items-baseline gap-5">
                    <span className="font-mono text-[11px] text-white/35">{String(index + 1).padStart(2, "0")}</span>
                    <span className={`display text-xl font-bold transition-colors sm:text-2xl ${isOpen ? "text-white" : "text-white/80 group-hover:text-white"}`}>
                      {item.q}
                    </span>
                  </span>
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[var(--line-strong)] transition-all duration-300 ${
                      isOpen ? "rotate-45 bg-[var(--sky)] text-[var(--navy)]" : "group-hover:border-white/40"
                    }`}
                  >
                    <Plus className="h-4 w-4" />
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-2xl pb-7 pl-[2.6rem] leading-relaxed text-[var(--text-dim)]">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
