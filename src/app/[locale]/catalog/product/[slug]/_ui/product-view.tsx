import { getTranslations } from "next-intl/server";
import { Container } from "@/shared/components/container";
import { cn } from "@/shared/lib/utils";
import { gapContent } from "@/shared/ui/spacing";
import { typeTitle } from "@/shared/ui/typography";
import { TopBar } from "@/widgets/top-bar/root";
import { catalogQueryToSearchParams } from "../../../_lib/search-params";
import type { ProductDetail } from "../../../_ui/types";
import { ProductGallery } from "./product-gallery";
import { ProductInfo } from "./product-info";
import { ProductPromoCards } from "./product-promo-cards";
import { ProductSpecTablesSection } from "./product-spec-tables-section";
import { ProductToolbar } from "./product-toolbar";

type ProductViewProps = {
  product: ProductDetail;
};

export async function ProductView({ product }: ProductViewProps) {
  const t = await getTranslations();

  const categoryHref = product.categorySlug
    ? `/catalog?${catalogQueryToSearchParams({
        q: "",
        categories: [product.categorySlug],
        availability: [],
        numberFilters: {},
        textFilters: {},
        sort: "popularity",
        page: 1,
      }).toString()}`
    : "/catalog";

  const breadcrumbs = [
    { label: t("catalog.title"), href: "/catalog" },
    ...(product.categoryLabel
      ? [{ label: product.categoryLabel, href: categoryHref }]
      : []),
    { label: product.title },
  ];

  return (
    <Container className={cn("flex flex-col pb-section", gapContent)}>
      <TopBar variant="black" breadcrumbs={breadcrumbs} />

      <h1 className={typeTitle}>{product.title}</h1>

      <ProductToolbar />

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,771fr)_minmax(0,614fr)] xl:items-start">
        <div className="flex flex-col gap-4">
          <ProductGallery title={product.title} images={product.images} />
          <ProductPromoCards />
        </div>
        <ProductInfo product={product} />
      </div>

      <ProductSpecTablesSection tables={product.specTables} />
    </Container>
  );
}
