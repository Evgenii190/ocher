import { defaultLocale, locales, type Locale } from "@/i18n/locales";

export function toPayloadLocale(locale: string): Locale {
  if (locales.includes(locale as Locale)) {
    return locale as Locale;
  }
  return defaultLocale;
}

export function payloadLocaleOptions(locale: string) {
  return {
    locale: toPayloadLocale(locale),
    fallbackLocale: defaultLocale,
  } as const;
}
