import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { getProcurement } from "@/shared/lib/get-procurement";
import { ProcurementView } from "./_ui/procurement-view";

type ProcurementPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: ProcurementPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  const tNav = await getTranslations({
    locale,
    namespace: "nav.companySections",
  });
  const { pageTitle } = await getProcurement(locale);
  const title = pageTitle || tNav("procurement.title");

  return {
    title: t("procurement.title", { title }),
    description: t("procurement.description"),
  };
}

export default async function ProcurementPage({ params }: ProcurementPageProps) {
  const { locale } = await params;
  const tNav = await getTranslations("nav.companySections");
  const { pageTitle: rawTitle, rows } = await getProcurement(locale);
  const pageTitle = rawTitle || tNav("procurement.title");

  return (
    <main>
      <ProcurementView pageTitle={pageTitle} rows={rows} />
    </main>
  );
}
