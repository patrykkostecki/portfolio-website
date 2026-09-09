"use client";

import { Github, Linkedin, MapPin } from "lucide-react";
import Image from "next/image";

import { Counter } from "@/components/motion/Counter";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHead } from "@/components/SectionHead";
import { experience, profile, skills } from "@/data/profile";
import type { Messages } from "@/lib/i18n";

type AboutProps = {
  messages: Messages;
};

export function About({ messages }: AboutProps) {
  const t = messages.about;

  return (
    <section id="about" className="relative scroll-mt-28 px-4 py-28 sm:px-6 sm:py-36">
      <div className="mx-auto max-w-6xl">
        <SectionHead index="03" eyebrow={t.eyebrow} title={t.title} subtitle={t.lead} />

        <div className="mt-16 grid gap-6 lg:grid-cols-12">
          {/* portrait + stats */}
          <Reveal className="lg:col-span-5">
            <div className="glass rounded-2xl p-6 sm:p-8">
              <div className="flex items-center gap-5">
                <span className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl border border-white/10">
                  <Image src="/pkdev-avatar.png" alt={profile.name} width={80} height={80} className="h-full w-full object-cover" />
                </span>
                <div className="min-w-0">
                  <p className="display text-2xl font-bold">{profile.name}</p>
                  <p className="mt-1 text-sm text-[var(--text-dim)]">{profile.title}</p>
                  <p className="mt-2 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-white/50">
                    <MapPin className="h-3.5 w-3.5 text-[var(--sky)]" />
                    {profile.location}
                  </p>
                </div>
              </div>


              <dl className="mt-8 grid grid-cols-3 divide-x divide-[var(--line)] border-y border-[var(--line)] py-6">
                {t.stats.map((stat) => (
                  <div key={stat.label} className="px-3 first:pl-0 last:pr-0">
                    <dt className="sr-only">{stat.label}</dt>
                    <dd className="display text-3xl font-extrabold sm:text-4xl">
                      <Counter value={stat.value} />
                    </dd>
                    <dd className="mt-1.5 text-[11px] leading-tight text-[var(--text-dim)]">{stat.label}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-7 flex gap-3">
                <a href={profile.github} target="_blank" rel="noreferrer" className="btn-ghost flex-1 justify-center px-4 py-3 text-sm">
                  <Github className="h-4 w-4" />
                  GitHub
                </a>
                <a href={profile.linkedin} target="_blank" rel="noreferrer" className="btn-ghost flex-1 justify-center px-4 py-3 text-sm">
                  <Linkedin className="h-4 w-4" />
                  LinkedIn
                </a>
              </div>
            </div>
          </Reveal>

          {/* experience + skills */}
          <div className="flex flex-col gap-6 lg:col-span-7">
            <Reveal delay={0.08} className="glass rounded-2xl p-6 sm:p-8">
              <h3 className="eyebrow">{t.experienceTitle}</h3>
              <ol className="mt-6 flex flex-col">
                {[...experience].reverse().map((item, index, all) => {
                  const info = t.experience[item.id];
                  const period = item.period.replace(/present/i, t.present);
                  const isLast = index === all.length - 1;
                  return (
                    <li key={item.id} className="relative grid grid-cols-[auto_1fr] gap-x-5">
                      <span className="flex flex-col items-center">
                        <span className={`mt-2 h-2 w-2 rounded-full ${index === 0 ? "bg-[var(--sky)]" : "bg-white/25"}`} />
                        {!isLast && <span className="w-px flex-1 bg-[var(--line)]" />}
                      </span>
                      <div className={isLast ? "" : "pb-7"}>
                        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                          <p className="display text-lg font-bold">
                            {item.company}
                            <span className="font-sans text-sm font-normal text-[var(--text-dim)]"> — {info.role}</span>
                          </p>
                          <p className="font-mono text-[10px] uppercase tracking-widest text-white/45">{period}</p>
                        </div>
                        <p className="mt-2 text-sm leading-relaxed text-[var(--text-dim)]">{info.text}</p>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </Reveal>

            <Reveal delay={0.14} className="glass rounded-2xl p-6 sm:p-8">
              <h3 className="eyebrow">{t.skillsTitle}</h3>
              <div className="mt-6 flex flex-col divide-y divide-[var(--line)]">
                {skills.map((category) => (
                  <div key={category.id} className="grid gap-2 py-3 first:pt-0 last:pb-0 sm:grid-cols-[8rem_1fr] sm:items-baseline">
                    <p className="font-mono text-[10px] uppercase tracking-widest text-white/45">{t.skillCategories[category.id]}</p>
                    <ul className="flex flex-wrap gap-x-4 gap-y-1.5">
                      {category.items.map((skill) => (
                        <li key={skill.id} className="text-sm text-white/85 transition-colors hover:text-[var(--sky)]">
                          {skill.label}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
