import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { cn } from "@/shared/lib/utils";
import { gapContent, gapHeading } from "@/shared/ui/spacing";
import { textBodyLg } from "@/shared/ui/typography";
import introPhoto from "../_assets/intro-photo-632318.png";

export async function AboutIntroSection() {
  const t = await getTranslations("about.intro");

  return (
    <section className={cn("flex flex-col", gapHeading)}>
      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-2 lg:gap-12">
        <div className={cn("flex flex-col", gapContent)}>
          <div className="relative aspect-[682/381] w-full overflow-hidden shadow-[0_20px_13px_rgba(0,4,34,0.07)]">
            <Image
              src={introPhoto}
              alt={t("imageAlt")}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          <p className={cn(textBodyLg, "font-light text-foreground")}>
            <strong className="font-semibold">{t("leadBefore")}</strong>
            {t("leadAfter")}
          </p>
        </div>

        <div className={cn("flex flex-col", gapContent)}>
          <p className={cn(textBodyLg, "font-light text-foreground")}>
            {t("column2")}
          </p>
          <p className={cn(textBodyLg, "font-light text-foreground")}>
            {t("column3")}
          </p>
        </div>
      </div>
    </section>
  );
}
