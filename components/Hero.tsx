"use client";

import { motion } from "framer-motion";
import { ArrowDown, ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { Magnetic } from "@/components/motion/Magnetic";
import { Words } from "@/components/motion/Words";
import { Showcase } from "@/components/Showcase";
import { projects } from "@/data/projects";
import type { Messages } from "@/lib/i18n";
import { useLocale } from "@/lib/locale";

type HeroProps = {
  messages: Messages;
};

export function Hero({ messages }: HeroProps) {
  const { locale } = useLocale();
  const [active, setActive] = useState<number | null>(null);
  const title2Words = messages.hero.title2.split(" ");

  return (
    <section id="top" className="relative flex flex-col px-4 pt-32 sm:px-6 sm:pt-40 lg:min-h-svh lg:pt-0">
      <div className="mx-auto grid w-full max-w-6xl flex-1 items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:pt-24 xl:max-w-7xl">
        <div className="relative">
          <h1 className="display text-[2.9rem] font-extrabold sm:text-6xl lg:text-[4.6rem] xl:text-[5.4rem] 2xl:text-[6rem]">
            <Words text={messages.hero.title1} className="block" />
            <Words text={messages.hero.title2} delay={0.25} highlight={title2Words.length - 1} className="block text-white" />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 max-w-lg text-base leading-relaxed text-[var(--text-dim)] sm:text-lg xl:max-w-xl xl:text-xl"
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
          <Showcase active={active} />
        </div>
      </div>

      {/* bottom strip: the three pieces of work in the stack — hover to bring one forward */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto mt-20 w-full max-w-6xl border-t border-[var(--line)] lg:mt-0 xl:max-w-7xl"
        onMouseLeave={() => setActive(null)}
      >
        <div className="grid sm:grid-cols-3 lg:grid-cols-[1fr_1fr_1fr_auto]">
          {projects.map((project, index) => (
            <Link
              key={project.slug}
              href={`/projekty/${project.slug}`}
              onMouseEnter={() => setActive(index)}
              onFocus={() => setActive(index)}
              onBlur={() => setActive(null)}
              className={`group flex items-center justify-between gap-4 border-b border-[var(--line)] py-5 pr-6 transition-colors sm:border-b-0 sm:border-r ${
                active === index ? "text-white" : active === null ? "text-white/85" : "text-white/40"
              }`}
            >
              <span className="flex items-baseline gap-4">
                <span className="font-mono text-[10px] text-white/35">{String(index + 1).padStart(2, "0")}</span>
                <span>
                  <span className="display block text-lg font-bold">{project.title}</span>
                  <span className="mt-0.5 block font-mono text-[10px] uppercase tracking-widest text-[var(--text-dim)]">
                    {project.tag[locale]} · {project.year}
                  </span>
                </span>
              </span>
              <ArrowUpRight className="h-4 w-4 shrink-0 text-white/30 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[var(--sky)]" />
            </Link>
          ))}
          <a
            href="#services"
            aria-label="Scroll"
            className="hidden items-center gap-2 py-5 pl-8 font-mono text-[10px] uppercase tracking-widest text-white/40 transition hover:text-white lg:flex"
          >
            scroll
            <ArrowDown className="h-3.5 w-3.5 animate-bounce" />
          </a>
        </div>
      </motion.div>
    </section>
  );
}
