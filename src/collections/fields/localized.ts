import type { Field, RichTextField, TextareaField, TextField } from "payload";

/** Маркер локализованного поля для Payload CMS. */
export const localized = { localized: true as const };

export function localizedText(overrides: Omit<TextField, "type">): TextField {
  return { type: "text", ...localized, ...overrides } as TextField;
}

export function localizedTextarea(
  overrides: Omit<TextareaField, "type">,
): TextareaField {
  return { type: "textarea", ...localized, ...overrides };
}

export function localizedRichText(
  overrides: Omit<RichTextField, "type">,
): RichTextField {
  return { type: "richText", ...localized, ...overrides };
}

/** Локализованное text-поле внутри array/group (без type в overrides). */
export function localizedArrayText(
  overrides: Omit<TextField, "type" | "localized">,
): TextField {
  return localizedText(overrides);
}
