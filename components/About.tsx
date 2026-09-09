"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, MapPin } from "lucide-react";
import Image from "next/image";

import { experience, profile, skills } from "@/data/profile";
import type { Messages } from "@/lib/i18n";
import { spotlight } from "@/lib/spotlight";

type AboutProps = {
  messages: Messages;
};

const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
});

export function About({ messages }: AboutProps) {
  const t = messages.about;

  return (
    <section id="about" className="relative scroll-mt-28 px-4 py-28">
      <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)] lg:gap-8">
        {/* profile card */}
        <motion.div
          {...reveal()}
          onMouseMove={spotlight}
          className="glass-deep spot flex flex-col rounded-[2rem] p-7 sm:p-8"
        >
          <div className="flex items-center gap-5">
            <span className="grad-border relative h-20 w-20 shrink-0 overflow-hidden rounded-3xl">
              <Image src="/pkdev-avatar.png" alt={profile.name} width={80} height={80} className="h-full w-full object-cover" />
            </span>
            <div className="min-w-0">
              <p className="font-[family-name:var(--font-display)] text-xl font-bold">{profile.name}</p>
              <p className="mt-1 text-sm text-[var(--text-dim)]">{profile.title}</p>
              <p className="mt-2 flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-widest text-[var(--text-dim)]/80">
                <MapPin className="h-3.5 w-3.5 text-[var(--sky)]" />
                {profile.location}
              </p>
            </div>
          </div>

          <dl className="mt-8 grid grid-cols-3 gap-3">
            {t.stats.map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-white/5 bg-white/[0.03] px-3 py-4 text-center">
                <dt className="sr-only">{stat.label}</dt>
                <dd className="grad-text font-[family-name:var(--font-display)] text-2xl font-extrabold sm:text-3xl">{stat.value}</dd>
                <dd className="mt-1 text-[11px] leading-tight text-[var(--text-dim)]">{stat.label}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-auto flex gap-3 pt-8">
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="glass glass-hover inline-flex flex-1 items-center justify-center gap-2 rounded-full px-4 py-3 text-sm text-[var(--text-dim)] hover:text-white"
            >
              <Github className="h-4 w-4" />
              GitHub
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="glass glass-hover inline-flex flex-1 items-center justify-center gap-2 rounded-full px-4 py-3 text-sm text-[var(--text-dim)] hover:text-white"
            >
              <Linkedin className="h-4 w-4" />
              LinkedIn
            </a>
          </div>
        </motion.div>

        {/* story + experience + skills */}
        <div className="flex flex-col gap-6">
          <motion.div {...reveal(0.05)}>
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--sky)]">{t.eyebrow}</span>
            <h2 className="mt-4 font-[family-name:var(--font-display)] text-3xl font-bold sm:text-4xl">{t.title}</h2>
            <p className="mt-5 text-base leading-relaxed text-white/90 sm:text-lg">{t.lead}</p>
            <p className="mt-4 leading-relaxed text-[var(--text-dim)]">{t.body}</p>
          </motion.div>

          <motion.div {...reveal(0.1)} onMouseMove={spotlight} className="glass spot rounded-[2rem] p-6 sm:p-7">
            <h3 className="font-mono text-[11px] uppercase tracking-[0.25em] text-[var(--sky)]">{t.experienceTitle}</h3>
            <ol className="mt-5 flex flex-col">
              {[...experience].reverse().map((item, index, all) => {
                const info = t.experience[item.id];
                const period = item.period.replace(/present/i, t.present);
                const isLast = index === all.length - 1;
                return (
                  <li key={item.id} className="relative grid grid-cols-[auto_1fr] gap-x-4">
                    <span className="flex flex-col items-center">
                      <span
                        className={`mt-1.5 h-2.5 w-2.5 rounded-full ${index === 0 ? "bg-[var(--sky)] shadow-[0_0_12px_rgba(56,182,255,0.8)]" : "bg-white/25"}`}
                      />
                      {!isLast && <span className="w-px flex-1 bg-gradient-to-b from-white/20 to-transparent" />}
                    </span>
                    <div className={isLast ? "" : "pb-6"}>
                      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                        <p className="font-[family-name:var(--font-display)] text-base font-semibold">
                          {item.company}
                          <span className="text-[var(--text-dim)]"> · {info.role}</span>
                        </p>
                        <p className="font-mono text-[11px] uppercase tracking-widest text-[var(--text-dim)]/80">{period}</p>
                      </div>
                      <p className="mt-1.5 text-sm leading-relaxed text-[var(--text-dim)]">{info.text}</p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </motion.div>

          <motion.div {...reveal(0.15)} onMouseMove={spotlight} className="glass spot rounded-[2rem] p-6 sm:p-7">
            <h3 className="font-mono text-[11px] uppercase tracking-[0.25em] text-[var(--sky)]">{t.skillsTitle}</h3>
            <div className="mt-5 flex flex-col gap-4">
              {skills.map((category) => (
                <div key={category.id} className="grid gap-2 sm:grid-cols-[7.5rem_1fr] sm:items-baseline">
                  <p className="text-xs font-medium text-[var(--text-dim)]">{t.skillCategories[category.id]}</p>
                  <ul className="flex flex-wrap gap-2">
                    {category.items.map((skill) => (
                      <li
                        key={skill.id}
                        className="rounded-full border border-white/8 bg-white/[0.04] px-3 py-1 font-mono text-[11px] text-white/85 transition-colors hover:border-[rgba(56,182,255,0.4)] hover:text-white"
                      >
                        {skill.label}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
