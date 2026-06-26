import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { getLaborProtectionDocuments } from "@/shared/lib/get-labor-protection";
import { LaborProtectionView } from "./_ui/labor-protection-view";

type LaborProtectionPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: LaborProtectionPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: t("laborProtection.title"),
    description: t("laborProtection.description"),
  };
}

export default async function LaborProtectionPage({
  params,
}: LaborProtectionPageProps) {
  const { locale } = await params;
  const documents = await getLaborProtectionDocuments(locale);

  return (
    <main>
      <LaborProtectionView documents={documents} />
    </main>
  );
}
