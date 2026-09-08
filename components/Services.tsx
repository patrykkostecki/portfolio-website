"use client";

import { motion } from "framer-motion";
import { Gamepad2, ShieldCheck } from "lucide-react";

import type { Messages } from "@/lib/i18n";
import { spotlight } from "@/lib/spotlight";

type ServicesProps = {
  messages: Messages;
};

/* ---------- interactive card visuals ---------- */

function VisualWebsite() {
  return (
    <div className="flex h-full w-full items-center justify-center p-6">
      <div className="w-full max-w-[230px] rounded-xl border border-white/10 bg-[#0b1120]/80 transition-all duration-500 group-hover:-translate-y-1.5 group-hover:border-[rgba(56,182,255,0.45)] group-hover:shadow-[0_0_36px_rgba(56,182,255,0.25)]">
        <div className="flex items-center gap-1.5 border-b border-white/5 px-3 py-2.5">
          <span className="h-1.5 w-1.5 rounded-full bg-[#ff5f57]/80" />
          <span className="h-1.5 w-1.5 rounded-full bg-[#febc2e]/80" />
          <span className="h-1.5 w-1.5 rounded-full bg-[#28c840]/80" />
          <span className="ml-2 h-2 flex-1 rounded-full bg-white/5" />
        </div>
        <div className="space-y-2 p-3.5">
          <div className="v-headline h-2.5 rounded-full" />
          <div className="h-2 w-3/4 rounded-full bg-white/[0.07]" />
          <div className="h-2 w-1/2 rounded-full bg-white/[0.07]" />
          <div className="v-btn mt-3 h-6 w-20 rounded-lg" />
        </div>
      </div>
    </div>
  );
}

function VisualApp() {
  return (
    <div className="flex h-full w-full items-center justify-center p-5">
      <div className="relative h-[136px] w-[72px] rounded-2xl border border-white/10 bg-[#0b1120]/80 p-1.5 transition-all duration-500 group-hover:-translate-y-1.5 group-hover:border-[rgba(99,100,199,0.5)] group-hover:shadow-[0_0_36px_rgba(99,100,199,0.3)]">
        <div className="relative h-full overflow-hidden rounded-[0.65rem] bg-gradient-to-b from-white/[0.06] to-transparent">
          <span className="absolute left-1/2 top-1.5 h-1 w-6 -translate-x-1/2 rounded-full bg-white/15" />
          {/* notification slides in */}
          <span className="v-notif absolute left-1.5 right-1.5 flex h-5 items-center gap-1 rounded-md bg-[rgba(56,182,255,0.25)] px-1.5 backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--sky)]" />
            <span className="h-1 flex-1 rounded-full bg-white/30" />
          </span>
          {/* app grid */}
          <div className="absolute inset-x-2 bottom-7 grid grid-cols-3 gap-1.5">
            {Array.from({ length: 6 }).map((_, i) => (
              <span
                key={i}
                style={{ animationDelay: `${i * 0.3}s` }}
                className="v-tile aspect-square rounded-[0.3rem]"
              />
            ))}
          </div>
          <span className="absolute bottom-2 left-1/2 h-1 w-8 -translate-x-1/2 rounded-full bg-white/15" />
        </div>
      </div>
    </div>
  );
}

function VisualGame() {
  return (
    <div className="relative flex h-full w-full items-center justify-center">
      <Gamepad2 className="v-pad h-20 w-20" strokeWidth={1.2} />
      <span
        className="v-sym absolute right-[24%] top-[22%] font-[family-name:var(--font-display)] text-lg font-bold text-[#b25fd1]"
        style={{ animationDelay: "0.2s" }}
      >
        ▲
      </span>
      <span
        className="v-sym absolute right-[16%] top-[42%] font-[family-name:var(--font-display)] text-lg font-bold text-[var(--sky)]"
        style={{ animationDelay: "0.55s" }}
      >
        ●
      </span>
      <span
        className="v-sym absolute left-[20%] top-[30%] font-[family-name:var(--font-display)] text-lg font-bold text-[#6fa9ff]"
        style={{ animationDelay: "0.9s" }}
      >
        ✕
      </span>
      <span
        className="v-sym absolute bottom-[24%] left-[30%] h-1.5 w-1.5 rounded-full bg-[var(--sky)]"
        style={{ animationDelay: "1.2s" }}
      />
    </div>
  );
}

function VisualCare() {
  return (
    <div className="relative flex h-full w-full items-center justify-center">
      <span className="v-ring absolute rounded-full border border-[rgba(56,182,255,0.4)]" />
      <span className="v-ring absolute rounded-full border border-[rgba(58,208,143,0.35)]" style={{ animationDelay: "1.3s" }} />
      <ShieldCheck className="v-shield h-16 w-16 transition-transform duration-500 group-hover:scale-110" strokeWidth={1.2} />
    </div>
  );
}

const visuals = [VisualWebsite, VisualApp, VisualGame, VisualCare];

export function Services({ messages }: ServicesProps) {
  return (
    <section id="services" className="relative scroll-mt-28 px-4 py-28">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--sky)]">
            {messages.services.eyebrow}
          </span>
          <h2 className="mt-4 font-[family-name:var(--font-display)] text-3xl font-bold sm:text-4xl">
            {messages.services.title}
          </h2>
          <p className="mt-4 text-[var(--text-dim)]">{messages.services.subtitle}</p>
        </motion.div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {messages.services.cards.map((card, index) => {
            const Visual = visuals[index] ?? VisualWebsite;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: (index % 2) * 0.1, ease: [0.22, 1, 0.36, 1] }}
                onMouseMove={spotlight}
                className="glass glass-hover spot group overflow-hidden rounded-[2rem] p-3"
              >
                <div className="h-48 overflow-hidden rounded-[1.4rem] bg-gradient-to-br from-[rgba(56,182,255,0.08)] via-[rgba(99,100,199,0.06)] to-[rgba(136,33,153,0.08)]">
                  <Visual />
                </div>
                <div className="p-5">
                  <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold">{card.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--text-dim)]">{card.text}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* steps */}
        <div className="mt-28">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="text-center font-[family-name:var(--font-display)] text-2xl font-bold sm:text-3xl"
          >
            {messages.steps.title}
          </motion.h3>
          <div className="relative mt-12 grid gap-6 sm:grid-cols-3">
            <span className="absolute left-[16%] right-[16%] top-10 hidden h-px bg-gradient-to-r from-[rgba(56,182,255,0.4)] via-[rgba(99,100,199,0.4)] to-[rgba(136,33,153,0.4)] sm:block" />
            {messages.steps.items.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
                onMouseMove={spotlight}
                className="glass-deep glass-hover spot relative rounded-[2rem] p-7 text-center sm:text-left"
              >
                <span className="grad-border relative z-10 mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--navy-2)] font-[family-name:var(--font-display)] text-lg font-extrabold text-white sm:mx-0">
                  {index + 1}
                </span>
                <h4 className="mt-5 font-[family-name:var(--font-display)] text-base font-semibold">{step.title}</h4>
                <p className="mt-2 text-sm leading-relaxed text-[var(--text-dim)]">{step.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
