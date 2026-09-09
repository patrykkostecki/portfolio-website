"use client";

import { motion } from "framer-motion";
import { Gamepad2, Globe, Smartphone } from "lucide-react";

import type { Messages } from "@/lib/i18n";

type HeroProps = {
  messages: Messages;
};

export function Hero({ messages }: HeroProps) {
  return (
    <section id="top" className="relative flex min-h-svh items-center justify-center px-4 pt-28 pb-16">
      {/* floating glass chips — visible on every screen size */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="glass animate-floaty absolute left-4 top-[15%] -rotate-6 rounded-2xl p-3 shadow-[0_0_40px_rgba(56,182,255,0.15)] sm:left-[10%] sm:top-[24%] lg:left-[12%] lg:top-[28%] lg:rounded-3xl lg:p-5"
        >
          <Globe className="h-5 w-5 text-[var(--sky)] lg:h-8 lg:w-8" strokeWidth={1.5} />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="glass animate-floaty-slow absolute right-4 top-[13%] rotate-6 rounded-2xl p-3 shadow-[0_0_40px_rgba(136,33,153,0.18)] sm:right-[10%] sm:top-[21%] lg:right-[13%] lg:top-[24%] lg:rounded-3xl lg:p-5"
        >
          <Gamepad2 className="h-5 w-5 text-[#b25fd1] lg:h-8 lg:w-8" strokeWidth={1.5} />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="glass animate-floaty absolute bottom-[12%] right-6 -rotate-3 rounded-2xl p-3 shadow-[0_0_40px_rgba(28,97,214,0.2)] sm:bottom-[18%] sm:right-[16%] lg:bottom-[20%] lg:right-[20%] lg:rounded-3xl lg:p-5"
        >
          <Smartphone className="h-5 w-5 text-[#6fa9ff] lg:h-8 lg:w-8" strokeWidth={1.5} />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.95, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="glass animate-floaty-slow absolute bottom-[16%] left-5 rotate-3 rounded-2xl p-3 shadow-[0_0_40px_rgba(99,100,199,0.2)] sm:bottom-[24%] sm:left-[14%] lg:bottom-[26%] lg:left-[17%] lg:rounded-3xl lg:p-4"
        >
          <span className="grad-text font-mono text-sm font-semibold lg:text-base">{"</>"}</span>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center text-center"
      >
        <span className="glass mb-7 inline-flex items-center gap-2 rounded-full px-4 py-2 font-mono text-[11px] uppercase tracking-widest text-[var(--text-dim)]">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#3ad08f] opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#3ad08f]" />
          </span>
          {messages.hero.available}
        </span>

        <h1 className="font-[family-name:var(--font-display)] text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-7xl">
          {messages.hero.title1}
          <br />
          <span className="grad-text grad-text-anim">{messages.hero.title2}</span>
        </h1>

        <p className="mt-7 max-w-xl text-base leading-relaxed text-[var(--text-dim)] sm:text-lg">
          {messages.hero.subtitle}
        </p>

        <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row">
          <a href="#contact" className="btn-grad rounded-full px-8 py-4 text-base font-semibold text-white">
            {messages.hero.ctaPrimary}
          </a>
          <a
            href="#services"
            className="glass glass-hover rounded-full px-8 py-4 text-base font-semibold text-white"
          >
            {messages.hero.ctaSecondary}
          </a>
        </div>

        <p className="mt-6 font-mono text-xs text-[var(--text-dim)]/80">{messages.hero.note}</p>
      </motion.div>

      {/* scroll hint */}
      <motion.a
        href="#services"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        aria-label="Scroll"
      >
        <span className="flex h-10 w-6 items-start justify-center rounded-full border border-white/15 p-1.5">
          <span className="h-2 w-1 animate-bounce rounded-full bg-[var(--sky)]" />
        </span>
      </motion.a>
    </section>
  );
}
