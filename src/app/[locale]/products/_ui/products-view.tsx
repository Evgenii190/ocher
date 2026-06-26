import { getTranslations } from "next-intl/server";
import { productCategoryCards } from "@/shared/catalog/static-categories";
import { Container } from "@/shared/components/container";
import { cn } from "@/shared/lib/utils";
import { gapHeading, gapSection } from "@/shared/ui/spacing";
import { TopBar } from "@/widgets/top-bar/root";
import { ProductCategoryCardItem } from "./product-category-card";
import { ProductsDescription } from "./products-description";

export async function ProductsView() {
  const t = await getTranslations("products");
  const tCategories = await getTranslations("staticCategories");

  return (
    <Container className={cn("flex flex-col", gapSection)}>
      <div className={cn("flex flex-col", gapHeading)}>
        <TopBar variant="black" breadcrumbs={[{ label: t("breadcrumb") }]} />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-3.5">
        {productCategoryCards.map((card) => (
          <ProductCategoryCardItem
            key={card.slug}
            card={{ ...card, title: tCategories(`${card.slug}.title`) }}
          />
        ))}
      </div>

      <ProductsDescription />
    </Container>
  );
}
