import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { getAboutPage } from "@/shared/lib/get-about-page";
import { getCatalogSubcategoryGroups } from "@/shared/lib/get-catalog-categories";
import { getServicesPage } from "@/shared/lib/get-services-page";
import { AboutView } from "./_ui/about-view";

type AboutPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: AboutPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  const tAbout = await getTranslations({ locale, namespace: "about" });

  return {
    title: t("about.title", { title: tAbout("breadcrumb") }),
    description: t("about.description"),
  };
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params;

  const [page, servicesPage, catalogGroups] = await Promise.all([
    getAboutPage(locale),
    getServicesPage(locale),
    getCatalogSubcategoryGroups(locale),
  ]);

  return (
    <AboutView
      services={servicesPage.services}
      catalogGroups={catalogGroups}
      bottomContent={page.bottomContent}
    />
  );
}
