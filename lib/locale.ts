"use client";

import { useEffect, useSyncExternalStore } from "react";

import { messages, type Locale } from "@/lib/i18n";

const KEY = "pk-locale";
const EVENT = "pk:locale";

/** Persist + broadcast a locale change so every component stays in sync. */
export function setLocale(locale: Locale) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, locale);
  window.dispatchEvent(new CustomEvent<Locale>(EVENT, { detail: locale }));
}

function subscribe(onChange: () => void) {
  window.addEventListener(EVENT, onChange);
  window.addEventListener("storage", onChange); // other tabs
  return () => {
    window.removeEventListener(EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

function getSnapshot(): Locale {
  try {
    return window.localStorage.getItem(KEY) === "en" ? "en" : "pl";
  } catch {
    return "pl";
  }
}

const getServerSnapshot = (): Locale => "pl";

/**
 * Shared locale state backed by localStorage. The server (and hydration)
 * snapshot is always "pl"; React re-renders with the stored value right after
 * hydration, so there is no mismatch and no setState-in-effect.
 */
export function useLocale() {
  const locale = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return { locale, dict: messages[locale], setLocale };
}
