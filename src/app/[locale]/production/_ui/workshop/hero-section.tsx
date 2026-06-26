"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Container } from "@/shared/components/container";
import { cn } from "@/shared/lib/utils";
import type { WorkshopPageSlug } from "@/shared/lib/workshops.shared";
import { Button } from "@/shared/ui/button";
import { gapContent } from "@/shared/ui/spacing";
import {
  headingAppearance,
  textBodyLg,
  typeDisplay,
} from "@/shared/ui/typography";
import { TopBar } from "@/widgets/top-bar/root";
import { getAboutSectionId } from "./data";
import { getWorkshopHeroStats } from "./hero-stats";
import { HeroStatsSlider } from "./hero-stats-slider";

type HeroSectionProps = {
  slug: WorkshopPageSlug;
  title: string;
  shortTitle: string;
  description: string;
  backgroundUrl?: string | null;
};

export function HeroSection({
  slug,
  title,
  shortTitle,
  description,
  backgroundUrl,
}: HeroSectionProps) {
  const t = useTranslations("production");
  const tCommon = useTranslations("common");

  const scrollToAbout = () => {
    document.getElementById(getAboutSectionId(slug))?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const heroStats = getWorkshopHeroStats(slug, (key) => t(key));

  return (
    <div className="relative min-h-[32rem]">
      {backgroundUrl ? (
        <Image
          src={backgroundUrl}
          alt={title}
          fill
          sizes="100vw"
          className="object-cover -z-10"
          priority
        />
      ) : (
        <div aria-hidden className="absolute inset-0 -z-10 bg-neutral-900" />
      )}
      <Container>
        <TopBar
          variant="white"
          breadcrumbs={[{ label: t("breadcrumb") }, { label: shortTitle }]}
        />

        <div className={cn("mt-22 flex flex-col", gapContent)}>
          <h1
            className={cn(
              typeDisplay,
              "max-w-[45rem] text-white leading-normal",
            )}
          >
            {title}
          </h1>
          {description ? (
            <p className={cn("max-w-[45rem] text-white", textBodyLg)}>
              {description}
            </p>
          ) : null}
        </div>

        <Button
          type="button"
          onClick={scrollToAbout}
          className={cn(
            "mt-heading h-16 w-full max-w-[20.625rem]",
            headingAppearance,
            textBodyLg,
            "font-semibold text-white",
          )}
        >
          {tCommon("readMoreAboutWorkshop")}
        </Button>

        {heroStats.length > 0 ? <HeroStatsSlider items={heroStats} /> : null}
      </Container>
    </div>
  );
}
