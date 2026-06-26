import { Container } from "@/shared/components/container";
import { getCatalogSubcategoryGroups } from "@/shared/lib/get-catalog-categories";
import { getHomePageAboutContent } from "@/shared/lib/get-home-page";
import { getNewsCategories, getNewsPage } from "@/shared/lib/get-news";
import { NEWS_PAGE_SIZE } from "@/shared/lib/news.shared";
import { cn } from "@/shared/lib/utils";
import { gapSection, ptSection } from "@/shared/ui/spacing";
import { AboutSection } from "./_ui/about-section";
import { CatalogSection } from "./_ui/catalog-section";
import { CatalogSubcategoriesSection } from "./_ui/catalog-subcategories-section";
import { DeliveryGeographySection } from "./_ui/delivery-geography-section";
import { FactoryFactsSection } from "./_ui/factory-facts-section";
import { HeroSection } from "./_ui/hero-section";
import { PartnersSection } from "./_ui/partners-section";
import { PressCenterSection } from "./_ui/press-center-section";

type HomePageProps = {
  params: Promise<{ locale: string }>;
};

export default async function Home({ params }: HomePageProps) {
  const { locale } = await params;
  const [aboutContent, newsPage, newsCategories, catalogGroups] =
    await Promise.all([
      getHomePageAboutContent(locale),
      getNewsPage({ locale, page: 1, limit: NEWS_PAGE_SIZE }),
      getNewsCategories(locale),
      getCatalogSubcategoryGroups(locale),
    ]);

  return (
    <main>
      <div className="relative z-10">
        <HeroSection />
      </div>
      <Container
        className={cn("relative z-10 flex flex-col", ptSection, gapSection)}
      >
        <FactoryFactsSection />
        <CatalogSection />
        <PartnersSection />
        <DeliveryGeographySection />
        <PressCenterSection
          initialItems={newsPage.items}
          initialHasMore={newsPage.hasMore}
          categories={newsCategories}
        />
        <CatalogSubcategoriesSection groups={catalogGroups} />
        <AboutSection content={aboutContent} />
      </Container>
    </main>
  );
}
