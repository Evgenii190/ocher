import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { HistoryView } from "./_ui/history-view";

type HistoryPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: HistoryPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: t("history.title"),
    description: t("history.description"),
  };
}

export default function HistoryPage() {
  return (
    <main>
      <HistoryView />
    </main>
  );
}
