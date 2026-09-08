import en from "@/messages/en.json";
import pl from "@/messages/pl.json";

export const locales = ["pl", "en"] as const;
export type Locale = (typeof locales)[number];

export const messages = {
  pl,
  en,
} as const;

export type Messages = (typeof messages)[Locale];

export function getInitialLocale(): Locale {
  return "pl";
}
