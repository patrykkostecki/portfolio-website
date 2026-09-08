"use client";

import { useEffect, useState } from "react";

import { messages, type Locale } from "@/lib/i18n";

const KEY = "pk-locale";
const EVENT = "pk:locale";

/** Persist + broadcast a locale change so every component stays in sync. */
export function setLocale(locale: Locale) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, locale);
  window.dispatchEvent(new CustomEvent<Locale>(EVENT, { detail: locale }));
}

/**
 * Shared locale state backed by localStorage. Renders "pl" on the server and
 * the first client paint (avoids hydration mismatch), then syncs to the stored
 * value. A custom event keeps every mounted component in lockstep.
 */
export function useLocale() {
  const [locale, setLocaleState] = useState<Locale>("pl");

  useEffect(() => {
    const stored = window.localStorage.getItem(KEY);
    if (stored === "en" || stored === "pl") setLocaleState(stored);

    const onChange = (event: Event) => setLocaleState((event as CustomEvent<Locale>).detail);
    window.addEventListener(EVENT, onChange);
    return () => window.removeEventListener(EVENT, onChange);
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return { locale, dict: messages[locale], setLocale };
}
