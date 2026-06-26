export const locales = ["ru", "en", "zh"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "ru";

export const localeLabels: Record<Locale, string> = {
  ru: "Русский",
  en: "English",
  zh: "中文",
};

export const payloadLocalization = {
  locales: locales.map((code) => ({
    label: localeLabels[code],
    code,
  })),
  defaultLocale,
  fallback: true,
} as const;
