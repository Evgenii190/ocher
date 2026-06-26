import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { ProductsView } from "./_ui/products-view";

type ProductsPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: ProductsPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: t("products.title"),
    description: t("products.description"),
  };
}

export default function ProductsPage() {
  return (
    <main>
      <ProductsView />
    </main>
  );
}
