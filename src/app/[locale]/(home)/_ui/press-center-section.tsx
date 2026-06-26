import { getTranslations } from "next-intl/server";
import { NewsCategoryNav } from "@/app/[locale]/news/_ui/news-category-nav";
import { NewsGridWithMore } from "@/app/[locale]/news/_ui/news-grid-with-more";
import { Link } from "@/i18n/navigation";
import type { NewsCategoryItem, NewsItem } from "@/shared/lib/news.shared";
import { newsIndexHref } from "@/shared/lib/news.shared";
import { cn } from "@/shared/lib/utils";
import { buttonVariants } from "@/shared/ui/button";
import { gapHeading } from "@/shared/ui/spacing";
import {
  headingAppearance,
  textSmall,
  typeTitle,
} from "@/shared/ui/typography";

type PressCenterSectionProps = {
  initialItems: NewsItem[];
  initialHasMore: boolean;
  categories: NewsCategoryItem[];
};

export async function PressCenterSection({
  initialItems,
  initialHasMore,
  categories,
}: PressCenterSectionProps) {
  const t = await getTranslations("home.pressCenter");

  return (
    <div className={cn("flex flex-col", gapHeading)}>
      <div className="flex flex-wrap items-center justify-between gap-5">
        <h2 className={typeTitle}>{t("title")}</h2>
        <Link
          href={newsIndexHref()}
          className={cn(
            buttonVariants({ variant: "inverse" }),
            headingAppearance,
            textSmall,
            "h-auto border-2 border-primary px-6 py-3 font-semibold",
          )}
        >
          {t("allNews")}
        </Link>
      </div>

      <NewsCategoryNav categories={categories} />

      <NewsGridWithMore
        initialItems={initialItems}
        initialHasMore={initialHasMore}
      />
    </div>
  );
}
