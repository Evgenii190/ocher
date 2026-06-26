"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Container } from "@/shared/components/container";
import { getServiceContentSectionId } from "@/shared/lib/services.shared";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import { gapContent } from "@/shared/ui/spacing";
import {
  headingAppearance,
  textBodyLg,
  typeDisplay,
} from "@/shared/ui/typography";
import { TopBar } from "@/widgets/top-bar/root";

type ServiceHeroSectionProps = {
  slug: string;
  title: string;
  description: string;
  backgroundUrl: string;
  backgroundAlt: string;
};

export function ServiceHeroSection({
  slug,
  title,
  description,
  backgroundUrl,
  backgroundAlt,
}: ServiceHeroSectionProps) {
  const t = useTranslations("services");
  const tCommon = useTranslations("common");

  const scrollToContent = () => {
    document.getElementById(getServiceContentSectionId(slug))?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className="relative min-h-[clamp(32rem,55vw,48rem)] pb-[clamp(8rem,14vw+3rem,16rem)]">
      <Image
        src={backgroundUrl}
        alt={backgroundAlt}
        fill
        sizes="100vw"
        className="object-cover -z-10"
        priority
      />

      <Container className="flex min-h-[clamp(22rem,45vw,36rem)] flex-col">
        <TopBar
          variant="white"
          breadcrumbs={[
            { label: t("breadcrumb"), href: "/services" },
            { label: title },
          ]}
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
          onClick={scrollToContent}
          className={cn(
            "mt-heading mb-[clamp(2.5rem,5vw+1rem,6rem)] h-16 w-full max-w-[20.625rem]",
            headingAppearance,
            textBodyLg,
            "font-semibold text-white",
          )}
        >
          {tCommon("readMore")}
        </Button>
      </Container>
    </div>
  );
}
