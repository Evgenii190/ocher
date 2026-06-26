import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { CartView } from "./_ui/cart-view";

type CartPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: CartPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: t("cart.title"),
    description: t("cart.description"),
  };
}

export default function CartPage() {
  return (
    <main>
      <CartView />
    </main>
  );
}
