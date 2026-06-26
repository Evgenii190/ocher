import type { SerializedEditorState } from "lexical";
import {
  DEFAULT_WORKSHOP_SECTION_ORDER,
  type WorkshopSectionId,
} from "./workshop-sections.shared";
import { WORKSHOP_PAGE_SLUGS, type WorkshopPageSlug } from "./workshops.shared";

export type WorkshopAdvantage = {
  title: string;
  description: string;
};

export type WorkshopEquipmentView = {
  title: string;
  titleFull: string;
  description: string;
  descriptionLong: string;
  imageUrl: string;
  imageAlt: string;
  features: string[];
  specs: { label: string; value: string }[];
};

export type WorkshopStockItemView = {
  title: string;
  value: string;
  imageUrl: string;
  imageAlt: string;
};

export type WorkshopStockSectionView = {
  title: string;
  items: WorkshopStockItemView[];
};

export type WorkshopPageView = {
  slug: WorkshopPageSlug;
  title: string;
  shortTitle: string;
  heroDescription: string;
  heroBackgroundUrl: string | null;
  sectionOrder: WorkshopSectionId[];
  aboutContent: SerializedEditorState | null;
  stockSection: WorkshopStockSectionView | null;
  advantageBlocks: WorkshopAdvantage[];
  equipment: WorkshopEquipmentView[];
};

export { DEFAULT_WORKSHOP_SECTION_ORDER };

export const DEFAULT_WORKSHOP_ADVANTAGES: Record<
  WorkshopPageSlug,
  WorkshopAdvantage[]
> = {
  [WORKSHOP_PAGE_SLUGS.METAL_STRUCTURES]: [
    {
      title: "Передовое оснащение",
      description:
        "Лазерная и плазменная резка, гибка и вальцовка с ЧПУ — детали высокой точности без лишней ручной обработки.",
    },
    {
      title: "Коррозионностойкая продукция",
      description:
        "Дробеструйная подготовка и нанесение покрытий установками безвоздушного распыления.",
    },
    {
      title: "Неразрушающий контроль",
      description:
        "Аттестованное оборудование и специалисты для контроля сварных швов.",
    },
    {
      title: "Мощные краны",
      description: "8 мостовых кранов грузоподъёмностью до 10 тонн.",
    },
  ],
  [WORKSHOP_PAGE_SLUGS.OILFIELD_EQUIPMENT]: [
    {
      title: "Команда профессионалов",
      description:
        "Свыше 300 специалистов и производственные линии до одного миллиона штанг в год.",
    },
    {
      title: "Полный цикл",
      description:
        "Заготовка, термообработка, испытания и маркировка на площадке завода.",
    },
    {
      title: "API и ГОСТ",
      description:
        "Многоступенчатый контроль и комплект документации для заказчика.",
    },
  ],
  [WORKSHOP_PAGE_SLUGS.BUILDING_STRUCTURES]: [
    {
      title: "Широкая номенклатура",
      description:
        "Винты, замки, гайки, подкосы и элементы опалубки в одном цехе.",
    },
    {
      title: "Складской остаток",
      description: "Постоянный запас ходовых позиций для оперативной отгрузки.",
    },
    {
      title: "Гибкость заказа",
      description: "Типовые и индивидуальные чертежи, комплектация под объект.",
    },
  ],
};

/** @deprecated используйте DEFAULT_WORKSHOP_ADVANTAGES */
export const defaultMetalStructuresAdvantages =
  DEFAULT_WORKSHOP_ADVANTAGES[WORKSHOP_PAGE_SLUGS.METAL_STRUCTURES];
