"use client";

import { Github, Linkedin, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { profile } from "@/data/profile";
import { useLocale } from "@/lib/locale";

export function Footer() {
  const { dict } = useLocale();
  const pathname = usePathname();
  const isHome = pathname === "/";
  const base = isHome ? "" : "/";

  const links = [
    { href: `${base}#services`, label: dict.nav.services },
    { href: "/projekty", label: dict.nav.projects },
    { href: `${base}#about`, label: dict.nav.about },
    { href: `${base}#contact`, label: dict.nav.contact },
  ];

  return (
    <footer className="relative mt-12 px-4 pb-10 pt-16">
      <span className="absolute inset-x-0 top-0 mx-auto block h-px max-w-6xl bg-gradient-to-r from-transparent via-[rgba(99,100,199,0.5)] to-transparent" />

      <div className="mx-auto grid max-w-6xl gap-12 sm:grid-cols-[1.6fr_1fr_1.2fr]">
        <div>
          <Image src="/pkdev-logo.svg" alt="pk.dev" width={120} height={50} className="h-9 w-auto" />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-[var(--text-dim)]">{dict.footer.tagline}</p>
          <div className="mt-6 flex gap-3">
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="glass glass-hover flex h-10 w-10 items-center justify-center rounded-full text-[var(--text-dim)] hover:text-white"
            >
              <Github className="h-4.5 w-4.5" />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="glass glass-hover flex h-10 w-10 items-center justify-center rounded-full text-[var(--text-dim)] hover:text-white"
            >
              <Linkedin className="h-4.5 w-4.5" />
            </a>
            <a
              href={`mailto:${profile.email}`}
              aria-label="E-mail"
              className="glass glass-hover flex h-10 w-10 items-center justify-center rounded-full text-[var(--text-dim)] hover:text-white"
            >
              <Mail className="h-4.5 w-4.5" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--sky)]">{dict.footer.linksTitle}</h4>
          <ul className="mt-5 space-y-3">
            {links.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm text-[var(--text-dim)] transition hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--sky)]">{dict.footer.contactTitle}</h4>
          <a
            href={`mailto:${profile.email}`}
            className="mt-5 inline-block font-mono text-sm text-white transition hover:text-[var(--sky)]"
          >
            {profile.email}
          </a>
          <p className="mt-3 text-sm leading-relaxed text-[var(--text-dim)]">{dict.footer.note}</p>
        </div>
      </div>

      <div className="mx-auto mt-14 flex max-w-6xl flex-col items-center justify-between gap-3 border-t border-white/5 pt-6 sm:flex-row">
        <p className="font-mono text-xs text-[var(--text-dim)]/60">
          © {new Date().getFullYear()} {profile.name} · {dict.footer.rights}
        </p>
        <p className="font-mono text-xs text-[var(--text-dim)]/40">Next.js · Vercel</p>
      </div>
    </footer>
  );
}
