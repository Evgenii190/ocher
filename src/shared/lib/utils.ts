import { type ClassValue, clsx } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

const typographyTextSizes = [
  "display",
  "title",
  "subtitle",
  "body-lg",
  "body",
  "small",
  "micro",
  "table-page",
  "table-section",
] as const;

const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: [...typographyTextSizes],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
