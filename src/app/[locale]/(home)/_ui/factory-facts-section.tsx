import { getTranslations } from "next-intl/server";
import { cn } from "@/shared/lib/utils";
import { gapHeading } from "@/shared/ui/spacing";
import { typeTitle } from "@/shared/ui/typography";
import { FactoryFactsSlider } from "./factory-facts-slider";

export async function FactoryFactsSection() {
  const t = await getTranslations("home.factoryFacts");

  return (
    <div className={cn("flex flex-col", gapHeading)}>
      <h2 className={typeTitle}>{t("title")}</h2>
      <FactoryFactsSlider />
    </div>
  );
}
