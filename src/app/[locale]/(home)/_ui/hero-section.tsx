import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
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
import heroBg from "../_assets/p1.png";
import { HeroFactorySlider } from "./hero-factory-slider";

export async function HeroSection() {
  const t = await getTranslations("home.hero");
  const tCommon = await getTranslations("common");

  return (
    <div className="relative">
      <Image
        src={heroBg}
        alt={t("bgAlt")}
        fill
        sizes="100vw"
        className="object-cover -z-10"
      />
      <Container>
        <TopBar variant="white" />
        <div className={cn("flex flex-col", gapContent)}>
          <h1
            className={cn(
              typeDisplay,
              "mt-22 max-w-[720px] text-white leading-normal",
            )}
          >
            {t("titleMobileLine1")}{" "}
            <span className="sm:hidden">
              {t("titleMobileLine2")}
              <br />
              {t("titleMobileLine3")}
            </span>
            <span className="hidden sm:inline">{t("titleDesktop")}</span>{" "}
            {t("titleSuffix")}
          </h1>
          <p className={cn("text-white", textBodyLg)}>{t("tagline")}</p>
        </div>
        <Button className="max-w-[310px] h-16 w-full mt-heading" asChild>
          <Link
            href="/catalog"
            className={cn(
              headingAppearance,
              textBodyLg,
              "text-foreground font-semibold",
            )}
          >
            {tCommon("goToCatalog")}
          </Link>
        </Button>
        <HeroFactorySlider />
      </Container>
    </div>
  );
}
