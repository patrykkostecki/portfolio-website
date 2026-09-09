"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

import { Reveal } from "@/components/motion/Reveal";
import { SectionHead } from "@/components/SectionHead";
import { projects, type Project } from "@/data/projects";
import type { Messages } from "@/lib/i18n";
import { useLocale } from "@/lib/locale";

type ProjectsProps = {
  messages: Messages;
};

/** Media block: a browser window for web projects, a phone composition for apps. */
export function CardMedia({ project, priority = false }: { project: Project; priority?: boolean }) {
  if (project.phoneGallery) {
    return (
      <div
        className="absolute inset-0 flex items-end justify-center gap-4 overflow-hidden px-6"
        style={{ background: `radial-gradient(ellipse at 50% 120%, ${project.accent}66, transparent 60%), #0b1120` }}
      >
        {project.gallery.slice(0, 3).map((src, i) => (
          <div
            key={src}
            className={`relative w-[27%] max-w-[150px] overflow-hidden rounded-[1.4rem] border-[4px] border-[#0b1120] bg-[#0b1120] shadow-[0_24px_60px_rgba(0,0,0,0.55)] transition-transform duration-700 ease-out ${
              i === 1 ? "translate-y-[8%] group-hover:translate-y-[2%]" : "translate-y-[22%] group-hover:translate-y-[16%]"
            }`}
          >
            <Image src={src} alt={`${project.title} ${i + 1}`} width={440} height={954} sizes="150px" priority={priority && i === 1} className="h-auto w-full rounded-[1rem]" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="absolute inset-0 flex flex-col bg-[#0b1120]">
      <div className="flex shrink-0 items-center gap-1.5 border-b border-white/5 px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-white/15" />
        <span className="h-2 w-2 rounded-full bg-white/15" />
        <span className="h-2 w-2 rounded-full bg-white/15" />
        <span className="ml-2 flex h-4 flex-1 items-center rounded bg-white/5 px-2 font-mono text-[9px] text-white/40">
          {project.link.href.replace(/^https?:\/\//, "")}
        </span>
      </div>
      <div className="relative flex-1 overflow-hidden">
        <Image
          src={project.cover}
          alt={project.title}
          fill
          sizes="(max-width: 1024px) 100vw, 640px"
          priority={priority}
          className="object-cover object-top transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
        />
      </div>
    </div>
  );
}

function FeatureRow({ project, index, messages }: { project: Project; index: number; messages: Messages }) {
  const { locale } = useLocale();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [36, -36]);
  const flip = index % 2 === 1;

  return (
    <div ref={ref} id={`project-${project.slug}`} className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
      <Reveal className={`lg:col-span-7 ${flip ? "lg:order-2" : ""}`}>
        <Link href={`/projekty/${project.slug}`} aria-label={project.title} className="group block">
          <motion.div style={{ y }} className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/10 shadow-[0_24px_60px_rgba(0,0,0,0.4)]">
            <CardMedia project={project} priority={index === 0} />
          </motion.div>
        </Link>
      </Reveal>

      <Reveal delay={0.1} className={`lg:col-span-5 ${flip ? "lg:order-1 lg:pr-6" : "lg:pl-6"}`}>
        <p className="eyebrow flex items-center gap-3">
          <span className="text-white/40">{String(index + 1).padStart(2, "0")}</span>
          <span>{project.tag[locale]}</span>
          <span className="text-white/30">·</span>
          <span className="text-[var(--text-dim)]">{project.year}</span>
        </p>
        <h3 className="display mt-5 text-3xl font-extrabold sm:text-4xl">
          <Link href={`/projekty/${project.slug}`} className="group inline-flex items-start gap-2 transition-colors hover:text-[var(--sky)]">
            {project.title}
            <ArrowUpRight className="mt-1.5 h-5 w-5 shrink-0 text-white/40 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-[var(--sky)]" />
          </Link>
        </h3>
        <p className="mt-5 max-w-md leading-relaxed text-[var(--text-dim)]">{project.summary[locale]}</p>
        <p className="mt-6 font-mono text-[11px] uppercase tracking-widest text-white/45">{project.tech.join("  ·  ")}</p>
        <Link href={`/projekty/${project.slug}`} className="link-line mt-8 inline-block text-sm font-medium text-white">
          {messages.projects.viewCase}
        </Link>
      </Reveal>
    </div>
  );
}

export function Projects({ messages }: ProjectsProps) {
  return (
    <section id="projects" className="relative scroll-mt-28 px-4 py-28 sm:px-6 sm:py-36">
      <div className="mx-auto max-w-6xl">
        <SectionHead index="02" eyebrow={messages.projects.eyebrow} title={messages.projects.title} />

        <div className="mt-20 flex flex-col gap-24 sm:gap-32">
          {projects.map((project, index) => (
            <FeatureRow key={project.slug} project={project} index={index} messages={messages} />
          ))}
        </div>

        <Reveal className="mt-24 flex justify-center">
          <Link href="/projekty" className="btn-ghost px-7 py-4 text-sm">
            {messages.projects.all}
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
