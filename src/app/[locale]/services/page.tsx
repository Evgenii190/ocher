import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { getServicesPage } from "@/shared/lib/get-services-page";
import { ServicesView } from "./_ui/services-view";

type ServicesPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: ServicesPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  const tServices = await getTranslations({ locale, namespace: "services" });
  const { pageTitle } = await getServicesPage(locale);
  const title = pageTitle || tServices("breadcrumb");

  return {
    title: t("services.title", { title }),
    description: t("services.description"),
  };
}

export default async function ServicesPage({ params }: ServicesPageProps) {
  const { locale } = await params;
  const t = await getTranslations("services");
  const page = await getServicesPage(locale);
  const pageTitle = page.pageTitle || t("breadcrumb");
  const cardsSectionTitle = page.cardsSectionTitle || t("breadcrumb");

  return (
    <main>
      <ServicesView
        pageTitle={pageTitle}
        cardsSectionTitle={cardsSectionTitle}
        services={page.services}
        bottomContent={page.bottomContent}
      />
    </main>
  );
}
