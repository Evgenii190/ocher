"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Container } from "@/shared/components/container";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import { gapContent } from "@/shared/ui/spacing";
import {
  headingAppearance,
  textBodyLg,
  typeDisplay,
} from "@/shared/ui/typography";
import { TopBar } from "@/widgets/top-bar/root";
import heroBg from "../_assets/about-hero.png";
import { ABOUT_CONTENT_SECTION_ID, aboutHeroStats } from "./about-data";
import { AboutHeroStatsSlider } from "./about-hero-stats-slider";

export function AboutHeroSection() {
  const t = useTranslations("about");
  const tFacts = useTranslations("home.factoryFacts.items");
  const tCommon = useTranslations("common");

  const scrollToContent = () => {
    document.getElementById(ABOUT_CONTENT_SECTION_ID)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const heroStats = aboutHeroStats.map((item) => ({
    ...item,
    title: tFacts(`${item.key}.title`),
    description: tFacts(`${item.key}.description`),
  }));

  return (
    <div className="relative min-h-[clamp(32rem,55vw,48rem)]">
      <Image
        src={heroBg}
        alt={t("hero.bgAlt")}
        fill
        sizes="100vw"
        className="object-cover -z-10"
        priority
      />

      <Container className="flex min-h-[clamp(32rem,55vw,48rem)] flex-col pb-6 lg:pb-8">
        <TopBar variant="white" breadcrumbs={[{ label: t("breadcrumb") }]} />

        <div className={cn("mt-22 flex flex-col", gapContent)}>
          <h1
            className={cn(
              typeDisplay,
              headingAppearance,
              "max-w-[45rem] text-white leading-normal",
            )}
          >
            {t("hero.title")}
          </h1>
          <p className={cn("max-w-[31.25rem] text-white", textBodyLg)}>
            {t("hero.tagline")}
          </p>
        </div>

        <Button
          type="button"
          onClick={scrollToContent}
          className={cn(
            "mt-heading h-16 w-full max-w-[20.625rem]",
            headingAppearance,
            textBodyLg,
            "font-semibold text-white",
          )}
        >
          {tCommon("readMore")}
        </Button>

        <div className="mt-auto w-full pt-8 lg:pt-10">
          <AboutHeroStatsSlider items={heroStats} />
        </div>
      </Container>
    </div>
  );
}
