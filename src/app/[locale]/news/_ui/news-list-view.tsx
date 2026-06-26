import { getTranslations } from "next-intl/server";
import { Container } from "@/shared/components/container";
import type { NewsCategoryItem, NewsItem } from "@/shared/lib/news.shared";
import { cn } from "@/shared/lib/utils";
import { gapHeading } from "@/shared/ui/spacing";
import { typeTitle } from "@/shared/ui/typography";
import { TopBar } from "@/widgets/top-bar/root";
import { NewsCategoryNav } from "./news-category-nav";
import { NewsGridWithMore } from "./news-grid-with-more";

type NewsListViewProps = {
  categories: NewsCategoryItem[];
  initialItems: NewsItem[];
  initialHasMore: boolean;
  activeCategorySlug?: string;
};

export async function NewsListView({
  categories,
  initialItems,
  initialHasMore,
  activeCategorySlug,
}: NewsListViewProps) {
  const t = await getTranslations("news");

  return (
    <Container className={cn("flex flex-col", gapHeading, "pb-section")}>
      <TopBar variant="black" breadcrumbs={[{ label: t("breadcrumb") }]} />

      <div className="flex flex-col">
        <div className={cn("flex flex-col", gapHeading)}>
          <h1 className={typeTitle}>{t("title")}</h1>
          <NewsCategoryNav
            categories={categories}
            activeCategorySlug={activeCategorySlug}
          />
        </div>

        <div className="mt-[25px]">
          <NewsGridWithMore
            key={activeCategorySlug ?? "all"}
            initialItems={initialItems}
            initialHasMore={initialHasMore}
            categorySlug={activeCategorySlug}
          />
        </div>
      </div>
    </Container>
  );
}
