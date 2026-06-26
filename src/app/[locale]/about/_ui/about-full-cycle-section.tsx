import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { cn } from "@/shared/lib/utils";
import { gapContent, gapHeading } from "@/shared/ui/spacing";
import { textBodyLg, typeSubtitle } from "@/shared/ui/typography";
import fullCyclePhoto from "../_assets/full-cycle.png";
import { ABOUT_CONTENT_SECTION_ID } from "./about-data";

export async function AboutFullCycleSection() {
  const t = await getTranslations("about.fullCycle");

  return (
    <section
      id={ABOUT_CONTENT_SECTION_ID}
      aria-labelledby="about-full-cycle-heading"
      className={cn("flex scroll-mt-24 flex-col", gapHeading)}
    >
      <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12">
        <div className={cn("flex flex-col", gapContent)}>
          <h2 id="about-full-cycle-heading" className={typeSubtitle}>
            {t("title")}
          </h2>
          <div
            className={cn(
              textBodyLg,
              "flex flex-col gap-6 font-light text-foreground",
            )}
          >
            {t("paragraph")
              .split("\n\n")
              .map((paragraph) => (
                <p key={paragraph.slice(0, 32)}>{paragraph}</p>
              ))}
          </div>
        </div>

        <div className="relative aspect-[718/488] w-full overflow-hidden shadow-[0_20px_13px_rgba(0,4,34,0.07)]">
          <Image
            src={fullCyclePhoto}
            alt={t("imageAlt")}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
