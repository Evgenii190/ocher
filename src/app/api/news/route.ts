import { hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import { queryNewsPage } from "@/shared/lib/news-fetch";
import { NEWS_PAGE_SIZE } from "@/shared/lib/news.shared";

export const dynamic = "force-dynamic";

function resolveLocale(searchParams: URLSearchParams): string {
  const locale = searchParams.get("locale");
  if (locale && hasLocale(routing.locales, locale)) {
    return locale;
  }
  return routing.defaultLocale;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const locale = resolveLocale(searchParams);
  const page = Number.parseInt(searchParams.get("page") ?? "1", 10);
  const limit = Number.parseInt(
    searchParams.get("limit") ?? String(NEWS_PAGE_SIZE),
    10,
  );
  const categorySlug = searchParams.get("category") ?? undefined;

  const result = await queryNewsPage({
    page: Number.isFinite(page) ? page : 1,
    limit: Number.isFinite(limit) ? limit : NEWS_PAGE_SIZE,
    categorySlug: categorySlug || undefined,
    locale,
  });

  return Response.json(result);
}
