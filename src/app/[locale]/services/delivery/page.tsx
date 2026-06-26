import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { DeliveryView } from "./_ui/delivery-view";

type DeliveryPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: DeliveryPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: t("services.delivery.title"),
    description: t("services.delivery.description"),
  };
}

export default function DeliveryPage() {
  return (
    <main>
      <DeliveryView />
    </main>
  );
}
