"use client";

import { ArrowUpRight } from "lucide-react";
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
  const social = [
    { href: profile.github, label: "GitHub" },
    { href: profile.linkedin, label: "LinkedIn" },
    { href: `mailto:${profile.email}`, label: "E-mail" },
  ];

  return (
    <footer id="footer" className="relative overflow-hidden border-t border-[var(--line)] px-4 pt-16 sm:px-6">
      <div className="mx-auto grid max-w-6xl gap-12 sm:grid-cols-3">
        <div>
          <p className="max-w-xs text-sm leading-relaxed text-[var(--text-dim)]">{dict.footer.tagline}</p>
        </div>
        <div>
          <h4 className="eyebrow">{dict.footer.linksTitle}</h4>
          <ul className="mt-5 space-y-2.5">
            {links.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="link-line text-sm text-[var(--text-dim)] hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="eyebrow">{dict.footer.contactTitle}</h4>
          <ul className="mt-5 space-y-2.5">
            {social.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="link-line inline-flex items-center gap-1 text-sm text-[var(--text-dim)] hover:text-white"
                >
                  {item.label}
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-sm text-[var(--text-dim)]">{dict.footer.note}</p>
        </div>
      </div>


      <div className="mx-auto mt-14 flex max-w-6xl flex-col items-start justify-between gap-2 border-t border-[var(--line)] py-6 pr-16 font-mono text-[11px] text-[var(--text-dim)]/60 sm:flex-row sm:pr-0">
        <p>
          © {new Date().getFullYear()} {profile.name} · {dict.footer.rights}
        </p>
        <p>Next.js · Vercel</p>
      </div>
    </footer>
  );
}
