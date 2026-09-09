"use client";

import { motion } from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";

import { Magnetic } from "@/components/motion/Magnetic";
import { Words } from "@/components/motion/Words";
import { Showcase } from "@/components/Showcase";
import type { Messages } from "@/lib/i18n";

type HeroProps = {
  messages: Messages;
};

export function Hero({ messages }: HeroProps) {
  const title2Words = messages.hero.title2.split(" ");

  return (
    <section id="top" className="relative px-4 pt-32 pb-16 sm:px-6 sm:pt-40 lg:min-h-svh lg:pb-24">
      <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
        <div className="relative">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="eyebrow inline-flex items-center gap-2.5"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#3ad08f] opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#3ad08f]" />
            </span>
            {messages.hero.available}
          </motion.p>

          <h1 className="display mt-7 text-[2.9rem] font-extrabold sm:text-6xl lg:text-[4.6rem] xl:text-[5.2rem]">
            <Words text={messages.hero.title1} className="block" />
            <Words text={messages.hero.title2} delay={0.25} highlight={title2Words.length - 1} className="block text-white" />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 max-w-lg text-base leading-relaxed text-[var(--text-dim)] sm:text-lg"
          >
            {messages.hero.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <Magnetic>
              <a href="#contact" className="btn-primary px-7 py-4 text-sm">
                {messages.hero.ctaPrimary}
                <ArrowRight className="h-4 w-4" />
              </a>
            </Magnetic>
            <a href="#services" className="btn-ghost px-6 py-4 text-sm">
              {messages.hero.ctaSecondary}
            </a>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="mt-8 font-mono text-[11px] text-[var(--text-dim)]/80"
          >
            {messages.hero.note}
          </motion.p>
        </div>

        <div className="relative">
          <Showcase />
        </div>
      </div>

      <motion.a
        href="#services"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        aria-label="Scroll"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-white/40 transition hover:text-white lg:flex"
      >
        scroll
        <ArrowDown className="h-3.5 w-3.5 animate-bounce" />
      </motion.a>
    </section>
  );
}
