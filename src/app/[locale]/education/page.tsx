import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { getEducationDisclosure } from "@/shared/lib/get-education-disclosure";
import { EducationView } from "./_ui/education-view";

type EducationPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: EducationPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: t("education.title"),
    description: t("education.description"),
  };
}

export default async function EducationPage({
  params,
}: EducationPageProps) {
  const { locale } = await params;
  const tNav = await getTranslations("nav.companySections");
  const { pageTitle: rawTitle, rows } = await getEducationDisclosure(locale);
  const pageTitle = rawTitle || tNav("education");

  return (
    <main>
      <EducationView pageTitle={pageTitle} rows={rows} />
    </main>
  );
}
