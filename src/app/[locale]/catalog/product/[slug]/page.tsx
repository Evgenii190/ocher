import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { getProductBySlug } from "./_lib/get-product";
import { ProductView } from "./_ui/product-view";

type ProductPageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const product = await getProductBySlug(slug, locale);
  const t = await getTranslations({ locale, namespace: "metadata" });

  if (!product) {
    return { title: t("product.notFound") };
  }

  return {
    title: t("product.itemTitle", { title: product.title }),
    description:
      product.description ??
      t("product.buyDescription", { title: product.title }),
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { locale, slug } = await params;
  const product = await getProductBySlug(slug, locale);

  if (!product) {
    notFound();
  }

  return (
    <main>
      <ProductView product={product} />
    </main>
  );
}
