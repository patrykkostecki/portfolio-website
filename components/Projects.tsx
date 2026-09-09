"use client";

import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { projects, type Project } from "@/data/projects";
import type { Messages } from "@/lib/i18n";
import { useLocale } from "@/lib/locale";
import { spotlight } from "@/lib/spotlight";

type ProjectsProps = {
  messages: Messages;
};

/** Card media: a browser window for web projects, a phone for mobile apps. */
export function CardMedia({ project }: { project: Project }) {
  if (project.phoneGallery) {
    return (
      <div
        className="absolute inset-0 flex items-end justify-center overflow-hidden"
        style={{
          background: `radial-gradient(circle at 50% 110%, ${project.accent}55, rgba(14,21,37,0.2) 60%), linear-gradient(160deg, #16203a, #0b1120)`,
        }}
      >
        <div className="relative w-[124px] translate-y-[14%] rounded-[1.6rem] border-[5px] border-[#0b1120] bg-[#0b1120] shadow-[0_24px_60px_rgba(0,0,0,0.55)] transition-transform duration-700 ease-out group-hover:-translate-y-[2%] sm:w-[136px]">
          <span className="absolute left-1/2 top-1.5 z-10 h-1 w-8 -translate-x-1/2 rounded-full bg-black/60" />
          <Image
            src={project.gallery[0]}
            alt={project.title}
            width={440}
            height={954}
            sizes="140px"
            className="h-auto w-full rounded-[1.25rem]"
          />
        </div>
        <Image
          src={project.cover}
          alt=""
          aria-hidden
          width={48}
          height={48}
          className="absolute left-4 bottom-4 rounded-xl shadow-[0_8px_24px_rgba(0,0,0,0.5)]"
        />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 flex flex-col bg-[#0b1120]">
      <div className="flex shrink-0 items-center gap-1.5 border-b border-white/5 bg-[#0e1525] px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-[#ff5f57]/80" />
        <span className="h-2 w-2 rounded-full bg-[#febc2e]/80" />
        <span className="h-2 w-2 rounded-full bg-[#28c840]/80" />
        <span className="ml-2 flex h-4 flex-1 items-center rounded-md bg-white/5 px-2 font-mono text-[9px] text-white/40">
          {project.link.href.replace(/^https?:\/\//, "")}
        </span>
      </div>
      <div className="relative flex-1 overflow-hidden">
        <Image
          src={project.cover}
          alt={project.title}
          fill
          sizes="(max-width: 1024px) 100vw, 33vw"
          className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.05]"
        />
      </div>
    </div>
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

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
                <div className="relative h-56 overflow-hidden rounded-[1.4rem] border border-white/5 sm:h-60">
                  <CardMedia project={project} />
                  <span className="absolute right-3 top-3 z-10 rounded-full bg-[rgba(10,15,30,0.75)] px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-[var(--sky)] backdrop-blur">
                    {project.tag[locale]}
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-t from-[rgba(10,15,30,0.55)] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <span className="absolute bottom-3 right-3 z-10 flex items-center gap-1 rounded-full bg-white/15 px-3.5 py-2 font-mono text-[11px] text-white backdrop-blur transition-all duration-500 sm:translate-y-2 sm:bg-white/10 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100">
                    {messages.projects.viewCase}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold transition-colors group-hover:text-[var(--sky)]">
                      {project.title}
                    </h3>
                    <ArrowUpRight className="h-4 w-4 shrink-0 text-[var(--text-dim)] transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[var(--sky)]" />
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--text-dim)]">{project.summary[locale]}</p>
                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {project.tech.slice(0, 3).map((tech) => (
                      <li key={tech} className="rounded-full bg-white/5 px-2.5 py-1 font-mono text-[10px] text-[var(--text-dim)]">
                        {tech}
                      </li>
                    ))}
                  </ul>
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
            {messages.projects.all}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
