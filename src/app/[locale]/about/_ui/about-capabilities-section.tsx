import { getTranslations } from "next-intl/server";
import { ServiceCard } from "@/app/[locale]/services/_ui/service-card";
import type { ServiceView } from "@/shared/lib/services.shared";
import { cn } from "@/shared/lib/utils";
import { gapHeading } from "@/shared/ui/spacing";
import { textBodyLg, typeTitle } from "@/shared/ui/typography";

type AboutCapabilitiesSectionProps = {
  services: ServiceView[];
};

export async function AboutCapabilitiesSection({
  services,
}: AboutCapabilitiesSectionProps) {
  const t = await getTranslations("about.capabilities");

  if (services.length === 0) {
    return null;
  }

  return (
    <section
      aria-labelledby="about-capabilities-heading"
      className={cn("flex flex-col", gapHeading)}
    >
      <div className="flex flex-col gap-4">
        <h2 id="about-capabilities-heading" className={typeTitle}>
          {t("title")}
        </h2>
        <p className={cn(textBodyLg, "font-light text-foreground")}>
          {t("subtitle")}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {services.map((service, index) => (
          <ServiceCard key={service.slug} item={service} index={index} />
        ))}
      </div>
    </section>
  );
}
