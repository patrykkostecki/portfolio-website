"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getProject, projects } from "@/data/projects";
import { useLocale } from "@/lib/locale";
import { spotlight } from "@/lib/spotlight";

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
});

export function ProjectDetail({ slug }: { slug: string }) {
  const { locale } = useLocale();
  const project = getProject(slug);
  if (!project) return notFound();

  const idx = projects.findIndex((p) => p.slug === slug);
  const next = projects[(idx + 1) % projects.length];

  return (
    <article className="px-4 pt-32 pb-10">
      <div className="mx-auto max-w-5xl">
        {/* back */}
        <motion.div {...fade()}>
          <Link
            href="/projekty"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[var(--text-dim)] transition hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            {locale === "pl" ? "Wszystkie realizacje" : "All work"}
          </Link>
        </motion.div>

        {/* hero */}
        <div className="mt-8 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <motion.div {...fade(0.05)}>
            <span
              className="inline-block rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-widest"
              style={{ background: `${project.accent}22`, color: project.accent }}
            >
              {project.tag[locale]}
            </span>
            <h1 className="mt-5 font-[family-name:var(--font-display)] text-4xl font-extrabold tracking-tight sm:text-6xl">
              {project.title}
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-[var(--text-dim)] sm:text-lg">
              {project.intro[locale]}
            </p>
            <a
              href={project.link.href}
              target="_blank"
              rel="noreferrer"
              className="btn-grad mt-8 inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-white"
            >
              {project.link.label[locale]}
              <ExternalLink className="h-4 w-4" />
            </a>
          </motion.div>

          {/* meta card */}
          <motion.div {...fade(0.12)} onMouseMove={spotlight} className="glass spot h-fit rounded-[1.75rem] p-6">
            <dl className="flex flex-col gap-4">
              {[
                { k: locale === "pl" ? "Klient" : "Client", v: project.client[locale] },
                { k: locale === "pl" ? "Rola" : "Role", v: project.role[locale] },
                { k: locale === "pl" ? "Rok" : "Year", v: project.year },
              ].map((row) => (
                <div key={row.k} className="flex flex-col gap-1 border-b border-white/5 pb-3 last:border-0 last:pb-0">
                  <dt className="font-mono text-[10px] uppercase tracking-widest text-[var(--sky)]">{row.k}</dt>
                  <dd className="text-sm text-white">{row.v}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-5 flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span key={t} className="rounded-full bg-white/5 px-3 py-1 font-mono text-[10px] text-[var(--text-dim)]">
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* gallery */}
        <motion.div {...fade(0.05)} className="mt-16">
          {project.phoneGallery ? (
            <div className="flex flex-wrap justify-center gap-6">
              {project.gallery.map((src, i) => (
                <motion.div
                  key={src}
                  {...fade(i * 0.08)}
                  className="relative w-[180px] overflow-hidden rounded-[2rem] border-[6px] border-[#0b1120] bg-[#0b1120] shadow-[0_20px_60px_rgba(0,0,0,0.5)] sm:w-[220px]"
                >
                  <Image
                    src={src}
                    alt={`${project.title} ${i + 1}`}
                    width={440}
                    height={954}
                    className="h-auto w-full"
                    style={{ boxShadow: `inset 0 0 40px ${project.accent}22` }}
                  />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className={`grid gap-5 ${project.gallery.length > 1 ? "sm:grid-cols-2" : ""}`}>
              {project.gallery.map((src, i) => (
                <motion.div
                  key={src}
                  {...fade(i * 0.08)}
                  onMouseMove={spotlight}
                  className="spot group relative overflow-hidden rounded-[1.75rem] border border-white/10"
                >
                  <Image
                    src={src}
                    alt={`${project.title} ${i + 1}`}
                    width={1280}
                    height={800}
                    className="h-auto w-full transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* sections */}
        <div className="mt-20 flex flex-col gap-14">
          {project.sections.map((section, i) => (
            <motion.section key={section.heading[locale]} {...fade(0.04)} className="grid gap-5 sm:grid-cols-[auto_1fr] sm:gap-10">
              <div className="flex items-start gap-3 sm:flex-col">
                <span className="grad-text font-[family-name:var(--font-display)] text-3xl font-extrabold">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <div>
                <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold">{section.heading[locale]}</h2>
                <p className="mt-3 max-w-2xl leading-relaxed text-[var(--text-dim)]">{section.body[locale]}</p>
                {section.points && (
                  <ul className="mt-5 flex flex-col gap-2.5">
                    {section.points[locale].map((point) => (
                      <li key={point} className="flex items-start gap-3 text-sm text-[var(--text-200,#d5dcea)]">
                        <span
                          className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
                          style={{ background: `${project.accent}22` }}
                        >
                          <Check className="h-3 w-3" style={{ color: project.accent }} />
                        </span>
                        <span className="text-[var(--text-dim)]">{point}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </motion.section>
          ))}
        </div>

        {/* footer nav */}
        <motion.div
          {...fade()}
          onMouseMove={spotlight}
          className="glass-deep spot mt-20 flex flex-col items-center justify-between gap-6 rounded-[2rem] p-8 text-center sm:flex-row sm:text-left"
        >
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-[var(--sky)]">
              {locale === "pl" ? "Masz podobny pomysł?" : "Got a similar idea?"}
            </p>
            <p className="mt-2 font-[family-name:var(--font-display)] text-xl font-bold">
              {locale === "pl" ? "Zbudujmy to razem." : "Let's build it together."}
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href={`/projekty/${next.slug}`}
              className="glass glass-hover inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm text-white"
            >
              {locale === "pl" ? "Następny projekt" : "Next project"}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/#contact" className="btn-grad inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white">
              {locale === "pl" ? "Napisz do mnie" : "Write to me"}
            </Link>
          </div>
        </motion.div>
      </div>
    </article>
  );
}
