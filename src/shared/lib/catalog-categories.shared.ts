/** Подкатегория для слайдера каталога на главной. */
export type CatalogSubcategorySlideItem = {
  id: string;
  slug: string;
  title: string;
  imageUrl: string | null;
  imageAlt: string;
};

/** Группа подкатегорий по родительской категории каталога. */
export type CatalogParentGroup = {
  id: string;
  slug: string;
  title: string;
  subcategories: CatalogSubcategorySlideItem[];
};
