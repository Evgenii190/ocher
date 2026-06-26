/** Фиксированная структура корневых категорий каталога. Единый источник для seed и UI. */

export type StaticSubcategory = {
  title: string;
  slug: string;
};

export type StaticCategory = {
  title: string;
  slug: string;
  subcategories: StaticSubcategory[];
};

export const staticCatalogCategories: StaticCategory[] = [
  {
    title: "Нефтепромысловое оборудование",
    slug: "oilfield",
    subcategories: [
      { title: "Штанги насосные", slug: "pump-rods" },
      { title: "Штоки полированные", slug: "polished-rods" },
      {
        title: "Муфты штанг насосных и штоков полированных",
        slug: "rod-couplings",
      },
      { title: "Центраторы", slug: "centralizers" },
      { title: "Штанговращатели ШВР", slug: "rod-rotators" },
      { title: "Сальники устьевые", slug: "wellhead-seals" },
      { title: "Зажимы полированных штоков", slug: "polished-rod-clamps" },
      { title: "Автосцепы", slug: "auto-couplers" },
      { title: "Штанги насосные шарнирные", slug: "hinged-pump-rods" },
      {
        title: "Муфты для насосно-компрессорных труб",
        slug: "tubing-couplings",
      },
      { title: "Кожухи защиты кабеля (протекторы)", slug: "cable-protectors" },
    ],
  },
  {
    title: "Металлоконструкции",
    slug: "metalwork",
    subcategories: [
      { title: "Сваи", slug: "piles" },
      {
        title: "Металлоконструкции зданий и сооружений",
        slug: "building-structures",
      },
      {
        title: "Металлоконструкции ростверков, балок, фундаментов",
        slug: "foundation-structures",
      },
      { title: "Емкости и резервуары", slug: "tanks" },
      { title: "Опоры трубопровода", slug: "pipeline-supports" },
      {
        title: "Опоры для строительства и реконструкции автодорог",
        slug: "road-supports",
      },
      {
        title: "Колодцы канализационные различного назначения",
        slug: "sewer-wells",
      },
      { title: "Градирни", slug: "cooling-towers" },
    ],
  },
  {
    title: "Строительные конструкции",
    slug: "construction",
    subcategories: [
      { title: "Замок клиновой", slug: "wedge-lock" },
      { title: "Винт стяжной для опалубки", slug: "tie-screw" },
      { title: "Анкер торцевой", slug: "end-anchor" },
      { title: "Гайка стяжная трёхрожковая", slug: "three-wing-nut" },
      { title: "Унивилка", slug: "univilka" },
      { title: "Подкос двухуровневый", slug: "two-level-brace" },
      { title: "Замок реечный выравнивающий", slug: "rack-lock" },
      { title: "Щит угловой распалубочный", slug: "corner-panel" },
      { title: "Угол нулевой", slug: "zero-corner" },
      { title: "Захват монтажный", slug: "mounting-grip" },
      { title: "Балка выравнивающая", slug: "leveling-beam" },
      { title: "Тренога", slug: "tripod" },
      { title: "Стойка", slug: "prop" },
      { title: "Подмости ПН-6", slug: "scaffold-pn6" },
    ],
  },
  {
    title: "Калиброванный прокат",
    slug: "calibrated",
    subcategories: [
      { title: "Круглый калиброванный прокат", slug: "round-calibrated" },
    ],
  },
];

export type ProductCategoryCard = {
  title: string;
  slug: string;
  imageSrc: string;
  subcategorySlugs: string[];
};

/** Карточки страницы «Продукция» — статика, без запросов в CMS. */
export const productCategoryCards: ProductCategoryCard[] =
  staticCatalogCategories.map((category) => ({
    title: category.title,
    slug: category.slug,
    imageSrc: `/products/${category.slug}.png`,
    subcategorySlugs: category.subcategories.map((sub) => sub.slug),
  }));

/** Найти категорию по slug. */
export function findCategoryBySlug(slug: string): StaticCategory | undefined {
  return staticCatalogCategories.find((cat) => cat.slug === slug);
}

/** Найти подкатегорию по slug (возвращает подкатегорию и родительскую категорию). */
export function findSubcategoryBySlug(
  slug: string,
): { subcategory: StaticSubcategory; category: StaticCategory } | undefined {
  for (const category of staticCatalogCategories) {
    const subcategory = category.subcategories.find((sub) => sub.slug === slug);
    if (subcategory) {
      return { subcategory, category };
    }
  }
  return undefined;
}

/** Все слаги категорий верхнего уровня. */
export const categorySlugSet = new Set(
  staticCatalogCategories.map((cat) => cat.slug),
);

/** Все слаги подкатегорий. */
export const subcategorySlugSet = new Set(
  staticCatalogCategories.flatMap((cat) =>
    cat.subcategories.map((sub) => sub.slug),
  ),
);
