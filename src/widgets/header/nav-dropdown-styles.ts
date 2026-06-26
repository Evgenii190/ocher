import { cn } from "@/shared/lib/utils";

/** hero — белый текст (главная); solid — тёмный текст (внутренние страницы) */
export type NavDropdownPanelTone = "hero" | "solid";

export function navDropdownPanelClassName(tone: NavDropdownPanelTone) {
  return cn(
    "px-10 pt-10 pb-20 shadow-[0px_8px_24px_0px_#00042224,0px_4px_12px_0px_#00042212] motion-safe:animate-in motion-safe:fade-in-0 motion-safe:slide-in-from-top-2 motion-safe:duration-300 motion-reduce:animate-none",
    tone === "hero"
      ? "bg-white/10 backdrop-blur-[44px]"
      : "bg-white/60 backdrop-blur-[80px]",
  );
}

export function navDropdownOnDarkSurface(
  isDesktop: boolean,
  tone: NavDropdownPanelTone,
) {
  return isDesktop && tone === "hero";
}
