import { getTranslations } from "next-intl/server";
import { cn } from "@/shared/lib/utils";
import { gapContent } from "@/shared/ui/spacing";
import { textBodyLg, textSubtitle } from "@/shared/ui/typography";

const sectionKeys = ["oilfield", "metalwork", "formwork"] as const;

export async function ProductsDescription() {
  const t = await getTranslations("products");

  return (
    <div className={cn("flex max-w-[85.125rem] flex-col", gapContent)}>
      <p className={cn(textBodyLg, "text-foreground")}>{t("intro")}</p>

      {sectionKeys.map((key) => {
        const items = t.raw(`sections.${key}.items`) as string[];

        return (
          <section key={key} className={cn("flex flex-col", gapContent)}>
            <h2
              className={cn(
                textSubtitle,
                "font-heading font-semibold tracking-[-5%] text-balance text-foreground",
              )}
            >
              {t(`sections.${key}.title`)}
            </h2>
            {t.has(`sections.${key}.lead`) ? (
              <p className={cn(textBodyLg, "text-foreground")}>
                {t(`sections.${key}.lead`)}
              </p>
            ) : null}
            <ul
              className={cn(
                textBodyLg,
                "flex list-disc flex-col gap-2 pl-5 text-foreground marker:text-foreground",
              )}
            >
              {items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        );
      })}

      <p className={cn(textBodyLg, "text-foreground")}>{t("outro")}</p>
    </div>
  );
}
