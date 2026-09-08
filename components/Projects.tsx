"use client";

import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { projects } from "@/data/projects";
import type { Messages } from "@/lib/i18n";
import { useLocale } from "@/lib/locale";
import { spotlight } from "@/lib/spotlight";

type ProjectsProps = {
  messages: Messages;
};

export function CardMedia({ slug, cover, accent }: { slug: string; cover: string; accent: string }) {
  if (slug === "marsapp") {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(circle_at_50%_120%,rgba(196,75,42,0.4),rgba(14,21,37,0.2)_60%),linear-gradient(160deg,#16203a,#0b1120)]">
        <Image
          src={cover}
          alt={slug}
          width={108}
          height={108}
          className="rounded-[1.6rem] shadow-[0_16px_48px_rgba(0,0,0,0.5)] transition-all duration-700 ease-out group-hover:-translate-y-1.5 group-hover:scale-110"
          style={{ boxShadow: `0 16px 48px ${accent}55` }}
        />
        <span className="absolute bottom-4 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-widest text-white/50">
          App Store
        </span>
      </div>
    );
  }
  return (
    <Image
      src={cover}
      alt={slug}
      fill
      sizes="(max-width: 1024px) 100vw, 33vw"
      className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.06]"
    />
  );
}

export function Projects({ messages }: ProjectsProps) {
  const { locale } = useLocale();

  return (
    <section id="projects" className="relative scroll-mt-28 px-4 py-28">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--sky)]">
            {messages.projects.eyebrow}
          </span>
          <h2 className="mt-4 font-[family-name:var(--font-display)] text-3xl font-bold sm:text-4xl">
            {messages.projects.title}
          </h2>
          <p className="mt-4 text-[var(--text-dim)]">{messages.projects.subtitle}</p>
        </motion.div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {projects.map((project, index) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              onMouseMove={spotlight}
              className="glass glass-hover spot group relative flex flex-col overflow-hidden rounded-[2rem] p-3"
            >
              <Link href={`/projekty/${project.slug}`} className="flex flex-1 flex-col" aria-label={project.title}>
                <div className="relative h-48 overflow-hidden rounded-[1.4rem]">
                  <CardMedia slug={project.slug} cover={project.cover} accent={project.accent} />
                  <span className="absolute left-3 top-3 z-10 rounded-full bg-[rgba(10,15,30,0.75)] px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-[var(--sky)] backdrop-blur">
                    {project.tag[locale]}
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-t from-[rgba(10,15,30,0.55)] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <span className="absolute bottom-3 right-3 flex items-center gap-1 rounded-full bg-white/15 px-3.5 py-2 font-mono text-[11px] text-white backdrop-blur transition-all duration-500 sm:translate-y-2 sm:bg-white/10 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100">
                    {locale === "pl" ? "Zobacz case study" : "View case study"}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-center justify-between">
                    <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold transition-colors group-hover:text-[var(--sky)]">
                      {project.title}
                    </h3>
                    <ArrowUpRight className="h-4 w-4 text-[var(--text-dim)] transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[var(--sky)]" />
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--text-dim)]">{project.summary[locale]}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5 }}
          className="mt-12 flex justify-center"
        >
          <Link
            href="/projekty"
            className="glass glass-hover inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-white"
          >
            {locale === "pl" ? "Zobacz wszystkie realizacje" : "See all work"}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
