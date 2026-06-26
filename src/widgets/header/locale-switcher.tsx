"use client";

import { useLocale, useTranslations } from "next-intl";
import { RiGlobalLine } from "react-icons/ri";
import { usePathname, useRouter } from "@/i18n/navigation";
import { type Locale, routing } from "@/i18n/routing";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import {
  headingAppearance,
  textMicro,
  textSmall,
} from "@/shared/ui/typography";

const localeCodes: Record<Locale, string> = {
  ru: "RU",
  en: "EN",
  zh: "中文",
};

const mobileActionCardClass =
  "w-full rounded-lg border border-[#BFBFBF] bg-muted/5 shadow-none";

type LocaleSwitcherProps = {
  className?: string;
  variant?: "icon" | "block";
};

export function LocaleSwitcher({
  className,
  variant = "icon",
}: LocaleSwitcherProps) {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("localeSwitcher");
  const tNav = useTranslations("nav.mobileMenu");

  const switchLocale = (next: Locale) => {
    router.replace(pathname, { locale: next });
  };

  if (variant === "block") {
    return (
      <div className={cn(mobileActionCardClass, "px-4 py-3", className)}>
        <div className="flex items-center gap-3">
          <span
            className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground"
          >
            <RiGlobalLine size={18} />
          </span>
          <span className="flex min-w-0 flex-1 flex-col gap-0.5 text-left">
            <span
              className={cn(headingAppearance, textMicro, "text-foreground")}
            >
              {tNav("languageTitle")}
            </span>
            <span className={cn(textSmall, "font-normal text-muted-foreground")}>
              {t(locale)}
            </span>
          </span>
        </div>

        <div className="mt-3 flex gap-2">
          {routing.locales.map((loc) => {
            const isActive = locale === loc;

            return (
              <button
                key={loc}
                type="button"
                onClick={() => switchLocale(loc)}
                aria-label={t(loc)}
                aria-current={isActive ? "true" : undefined}
                className={cn(
                  "flex min-w-0 flex-1 flex-col items-center gap-0.5 rounded-md border px-2 py-2 transition-all active:scale-[0.98]",
                  isActive
                    ? "border-primary bg-primary text-primary-foreground shadow-sm"
                    : "border-transparent bg-muted/10 text-foreground hover:border-primary/30 hover:bg-primary/5",
                )}
              >
                <span
                  className={cn(
                    headingAppearance,
                    textMicro,
                    isActive ? "text-primary-foreground" : "text-primary",
                  )}
                >
                  {localeCodes[loc]}
                </span>
                <span
                  className={cn(
                    textMicro,
                    "font-normal leading-tight",
                    isActive
                      ? "text-primary-foreground/90"
                      : "text-muted-foreground",
                  )}
                >
                  {t(loc)}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          size="icon"
          aria-label={t("ariaLabel")}
          className={cn(
            "transition-all duration-200 active:scale-95",
            "data-[state=open]:bg-primary/90",
            "[&_svg]:transition-transform hover:[&_svg]:scale-110 data-[state=open]:[&_svg]:scale-110",
            className,
          )}
        >
          <RiGlobalLine size={20} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[11.5rem]">
        <DropdownMenuLabel className={textSmall}>
          {t("label")}
        </DropdownMenuLabel>
        <DropdownMenuRadioGroup
          value={locale}
          onValueChange={(next) => {
            router.replace(pathname, { locale: next as Locale });
          }}
        >
          {routing.locales.map((loc) => (
            <DropdownMenuRadioItem key={loc} value={loc}>
              <span className="flex items-center gap-3">
                <span
                  className={cn(
                    headingAppearance,
                    textMicro,
                    "w-8 shrink-0 uppercase tracking-wide opacity-60",
                  )}
                >
                  {localeCodes[loc]}
                </span>
                <span className={textSmall}>{t(loc)}</span>
              </span>
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
