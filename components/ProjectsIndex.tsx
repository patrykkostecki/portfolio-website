"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { CardMedia } from "@/components/Projects";
import { projects } from "@/data/projects";
import { useLocale } from "@/lib/locale";
import { spotlight } from "@/lib/spotlight";

export function ProjectsIndex() {
  const { locale } = useLocale();

  return (
    <section className="px-4 pt-32 pb-10">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl"
        >
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--sky)]">
            {locale === "pl" ? "Realizacje" : "Work"}
          </span>
          <h1 className="mt-4 font-[family-name:var(--font-display)] text-4xl font-extrabold tracking-tight sm:text-6xl">
            {locale === "pl" ? "Zrealizowane projekty" : "Completed projects"}
          </h1>
          <p className="mt-5 text-base leading-relaxed text-[var(--text-dim)] sm:text-lg">
            {locale === "pl"
              ? "Strona, aplikacja i gra — trzy różne światy, jeden wykonawca. Kliknij projekt, żeby zobaczyć, jak powstał."
              : "A website, an app and a game — three different worlds, one maker. Click a project to see how it was made."}
          </p>
        </motion.div>

        <div className="mt-14 flex flex-col gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 + index * 0.08, ease: [0.22, 1, 0.36, 1] }}
              onMouseMove={spotlight}
              className="glass glass-hover spot group overflow-hidden rounded-[2rem] p-3"
            >
              <Link
                href={`/projekty/${project.slug}`}
                className="grid gap-5 sm:grid-cols-[300px_1fr] sm:items-stretch"
                aria-label={project.title}
              >
                <div className="relative h-52 overflow-hidden rounded-[1.5rem] sm:h-full">
                  <CardMedia slug={project.slug} cover={project.cover} accent={project.accent} />
                  <span className="absolute left-3 top-3 z-10 rounded-full bg-[rgba(10,15,30,0.75)] px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-[var(--sky)] backdrop-blur">
                    {project.tag[locale]}
                  </span>
                </div>
                <div className="flex flex-col justify-center p-4 sm:p-6">
                  <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-widest text-[var(--text-dim)]">
                    <span>{project.year}</span>
                    <span className="h-1 w-1 rounded-full bg-[var(--text-dim)]/50" />
                    <span>{project.client[locale]}</span>
                  </div>
                  <h2 className="mt-2 font-[family-name:var(--font-display)] text-2xl font-bold transition-colors group-hover:text-[var(--sky)]">
                    {project.title}
                  </h2>
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-[var(--text-dim)]">
                    {project.summary[locale]}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--sky)]">
                    {locale === "pl" ? "Zobacz case study" : "View case study"}
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
