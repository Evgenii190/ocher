import type { CSSProperties } from "react";
import { defaultColors } from "@payloadcms/richtext-lexical";

type RichTextStateValues = {
  [stateValue: string]: {
    css: Record<string, string | undefined>;
    label: string;
  };
};

/** Корпоративный primary — совпадает с --primary в globals.css */
const corporatePrimary = "oklch(0.5976 0.1909 26.91)";
const corporatePrimarySoft = "oklch(0.5976 0.1909 26.91 / 0.12)";
const corporateMuted = "oklch(0.6211 0.019 229.2)";
const corporateMutedSoft = "oklch(0.6211 0.019 229.2 / 0.14)";

/** Цвета текста: корпоративные + стандартная палитра Payload */
export const richTextColorState: RichTextStateValues = {
  "text-primary": {
    label: "Корпоративный",
    css: { color: corporatePrimary },
  },
  "text-muted": {
    label: "Серый",
    css: { color: corporateMuted },
  },
  "text-red": { label: "Красный", css: defaultColors.text["text-red"].css },
  "text-orange": {
    label: "Оранжевый",
    css: defaultColors.text["text-orange"].css,
  },
  "text-yellow": {
    label: "Жёлтый",
    css: defaultColors.text["text-yellow"].css,
  },
  "text-green": { label: "Зелёный", css: defaultColors.text["text-green"].css },
  "text-blue": { label: "Синий", css: defaultColors.text["text-blue"].css },
  "text-purple": {
    label: "Фиолетовый",
    css: defaultColors.text["text-purple"].css,
  },
  "text-pink": { label: "Розовый", css: defaultColors.text["text-pink"].css },
};

/** Подсветка фона текста: корпоративная + стандартная палитра */
export const richTextBackgroundState: RichTextStateValues = {
  "bg-primary-soft": {
    label: "Корпоративная подсветка",
    css: {
      "background-color": corporatePrimarySoft,
      padding: "0.05em 0.25em",
      "border-radius": "0.25rem",
    },
  },
  "bg-muted-soft": {
    label: "Серая подсветка",
    css: {
      "background-color": corporateMutedSoft,
      padding: "0.05em 0.25em",
      "border-radius": "0.25rem",
    },
  },
  "bg-red": {
    label: "Красный фон",
    css: defaultColors.background["bg-red"].css,
  },
  "bg-orange": {
    label: "Оранжевый фон",
    css: defaultColors.background["bg-orange"].css,
  },
  "bg-yellow": {
    label: "Жёлтый фон",
    css: defaultColors.background["bg-yellow"].css,
  },
  "bg-green": {
    label: "Зелёный фон",
    css: defaultColors.background["bg-green"].css,
  },
  "bg-blue": {
    label: "Синий фон",
    css: defaultColors.background["bg-blue"].css,
  },
  "bg-purple": {
    label: "Фиолетовый фон",
    css: defaultColors.background["bg-purple"].css,
  },
  "bg-pink": {
    label: "Розовый фон",
    css: defaultColors.background["bg-pink"].css,
  },
};

/** Конфиг TextStateFeature для редактора Payload */
export const richTextEditorState = {
  color: richTextColorState,
  background: richTextBackgroundState,
} as const;

export const richTextCalloutVariantOptions = [
  { label: "Корпоративный", value: "primary" },
  { label: "Нейтральный", value: "neutral" },
  { label: "Серый", value: "muted" },
  { label: "Синий", value: "blue" },
  { label: "Зелёный", value: "green" },
] as const;

export type RichTextCalloutVariant =
  (typeof richTextCalloutVariantOptions)[number]["value"];

const calloutClassNames: Record<RichTextCalloutVariant, string> = {
  primary: "border-primary/30 bg-primary/8 text-foreground",
  neutral: "border-border bg-muted/10 text-foreground",
  muted: "border-muted/30 bg-muted/14 text-foreground",
  blue: "border-blue-500/25 bg-blue-500/10 text-foreground",
  green: "border-green-600/25 bg-green-600/10 text-foreground",
};

export function getRichTextCalloutClassName(
  variant: RichTextCalloutVariant | null | undefined,
): string {
  return calloutClassNames[variant ?? "neutral"];
}

type SerializedTextWithState = {
  $?: Record<string, string | undefined>;
  [key: string]: unknown;
};

/** Стили из TextStateFeature для фронтенд-рендера */
export function getRichTextStateStyles(
  node: SerializedTextWithState,
): CSSProperties | null {
  const styles: Record<string, string> = {};
  const rawState = node.$ ?? {};

  for (const [stateKey, stateValues] of Object.entries(richTextEditorState)) {
    const value =
      (rawState[stateKey] as string | undefined) ??
      (node[stateKey] as string | undefined);
    if (!value) {
      continue;
    }

    const entry = stateValues[value];
    if (entry?.css) {
      for (const [property, cssValue] of Object.entries(entry.css)) {
        if (typeof cssValue === "string") {
          styles[property] = cssValue;
        }
      }
    }
  }

  return Object.keys(styles).length > 0 ? (styles as CSSProperties) : null;
}
