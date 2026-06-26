import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { getSiteContacts } from "@/shared/lib/get-site-contacts";
import { SafetyHotlineView } from "./_ui/safety-hotline-view";

type SafetyHotlinePageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: SafetyHotlinePageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: t("safetyHotline.title"),
    description: t("safetyHotline.description"),
  };
}

export default async function SafetyHotlinePage() {
  const contacts = await getSiteContacts();

  return (
    <main>
      <SafetyHotlineView contacts={contacts} />
    </main>
  );
}
