"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { useLocale } from "@/lib/locale";

const SECTIONS = ["services", "projects", "about", "contact"] as const;

export function Navbar() {
  const { locale, dict, setLocale } = useLocale();
  const pathname = usePathname();
  const isHome = pathname === "/";

  const [active, setActive] = useState<string>("services");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!isHome) return;
    const els = SECTIONS.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(visible.target.id);
      },
      { threshold: [0.2, 0.5, 0.75], rootMargin: "-20% 0px -40% 0px" }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [isHome]);

  const links = [
    { id: "services", label: dict.nav.services },
    { id: "projects", label: dict.nav.projects },
    { id: "about", label: dict.nav.about },
    { id: "contact", label: dict.nav.contact },
  ];

  const hrefFor = (id: string) => (isHome ? `#${id}` : `/#${id}`);

  return (
    <header className="fixed inset-x-0 top-4 z-50 px-4 sm:px-6">
      <nav
        className={`glass mx-auto grid w-full max-w-6xl grid-cols-[1fr_auto] items-center gap-2 rounded-full transition-all duration-500 sm:grid-cols-[1fr_auto_1fr] ${
          scrolled ? "py-1.5 pl-5 pr-1.5 shadow-[0_12px_40px_rgba(0,0,0,0.45)]" : "py-2 pl-6 pr-2"
        }`}
      >
        <Link href="/" className="group flex shrink-0 items-center justify-self-start" aria-label="pk.dev — start">
          <Image
            src="/pkdev-logo.svg"
            alt="pk.dev"
            width={92}
            height={38}
            priority
            className="h-7 w-auto transition-transform duration-300 group-hover:scale-105"
          />
        </Link>

        <div className="hidden items-center justify-center gap-1 sm:flex">
          {links.map((link) => {
            const isActive = isHome && active === link.id;
            return (
              <a
                key={link.id}
                href={hrefFor(link.id)}
                className={`relative rounded-full px-4 py-2 text-sm transition-colors ${
                  isActive ? "text-white" : "text-[var(--text-dim)] hover:text-white"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-white/10"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                {link.label}
              </a>
            );
          })}
        </div>

        <div className="flex items-center gap-1 justify-self-end">
          <button
            type="button"
            onClick={() => setLocale(locale === "pl" ? "en" : "pl")}
            className="rounded-full px-3 py-2 font-mono text-xs uppercase tracking-widest text-[var(--text-dim)] transition hover:bg-white/5 hover:text-white"
            aria-label="Change language"
          >
            {locale === "pl" ? "EN" : "PL"}
          </button>
          <a
            href={isHome ? "#contact" : "/#contact"}
            className="btn-grad rounded-full px-4 py-2.5 text-sm font-semibold text-white sm:px-5"
          >
            {dict.nav.cta}
          </a>
        </div>
      </nav>
    </header>
  );
}
