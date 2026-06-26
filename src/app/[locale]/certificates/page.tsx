import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { getCertificates } from "@/shared/lib/get-certificates";
import { CertificatesView } from "./_ui/certificates-view";

type CertificatesPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: CertificatesPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: t("certificates.title"),
    description: t("certificates.description"),
  };
}

export default async function CertificatesPage({
  params,
}: CertificatesPageProps) {
  const { locale } = await params;
  const items = await getCertificates(locale);

  return (
    <main>
      <CertificatesView items={items} />
    </main>
  );
}
