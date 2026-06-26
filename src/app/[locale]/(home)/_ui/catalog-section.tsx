import { getTranslations } from "next-intl/server";
import { ProductCategoryCardItem } from "@/app/[locale]/products/_ui/product-category-card";
import { productCategoryCards } from "@/shared/catalog/static-categories";

export async function CatalogSection() {
  const t = await getTranslations("staticCategories");

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-3.5">
      {productCategoryCards.map((card) => (
        <ProductCategoryCardItem
          key={card.slug}
          card={{ ...card, title: t(`${card.slug}.title`) }}
        />
      ))}
    </div>
  );
}
