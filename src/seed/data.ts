// Данные для наполнения каталога. Запускается через `bun run seed`.

import {
  staticCatalogCategories,
  type StaticCategory,
  type StaticSubcategory,
} from "@/shared/catalog/static-categories";
import type { ProductSpecTableSeed } from "@/shared/lib/product-spec-table.shared";
import {
  kzkCasingSpecTable,
  minimalSpecTable,
  pumpRodStrengthTable,
  rodCouplingSpecTable,
} from "./product-spec-tables-data";

export type SeedSubcategory = StaticSubcategory;
export type SeedCategory = StaticCategory;

export const seedCategories: SeedCategory[] = staticCatalogCategories;

export type SeedCharacteristic = {
  title: string;
  slug: string;
  type: "number" | "text";
  unit: "none" | "mm" | "cm" | "m" | "kg" | "t";
  order: number;
};

export const seedCharacteristics: SeedCharacteristic[] = [
  { title: "Длина", slug: "length", type: "number", unit: "m", order: 1 },
  { title: "Диаметр", slug: "diameter", type: "number", unit: "mm", order: 2 },
  { title: "Вес", slug: "weight", type: "number", unit: "kg", order: 3 },
  { title: "Материал", slug: "material", type: "text", unit: "none", order: 4 },
];

export type SeedProductChar = {
  slug: string;
  valueNumber?: number;
  valueText?: string;
};

export type SeedProduct = {
  title: string;
  slug: string;
  categorySlug: string;
  availability: "inStock" | "onOrder";
  price: number | null;
  discountPercent: number;
  popularity: number;
  withImage: boolean;
  /** Доп. фото в галерею (к основному). Для теста слайдера. */
  galleryExtra?: number;
  characteristics: SeedProductChar[];
  /** Необязательные таблицы характеристик на странице товара. */
  specTables?: ProductSpecTableSeed[];
};

const steel = { slug: "material", valueText: "сталь" };

export const seedProducts: SeedProduct[] = [
  {
    title: "Штанга насосная ШН-19 класс D",
    slug: "pump-rod-shn-19",
    categorySlug: "pump-rods",
    availability: "inStock",
    price: 1450,
    discountPercent: 0,
    popularity: 90,
    withImage: true,
    galleryExtra: 4,
    characteristics: [
      { slug: "length", valueNumber: 8 },
      { slug: "diameter", valueNumber: 19 },
      { slug: "weight", valueNumber: 23 },
      steel,
    ],
    specTables: [pumpRodStrengthTable],
  },
  {
    title: "Шток полированный ШП-31",
    slug: "polished-rod-shp-31",
    categorySlug: "polished-rods",
    availability: "inStock",
    price: 6200,
    discountPercent: 10,
    popularity: 70,
    withImage: true,
    characteristics: [
      { slug: "length", valueNumber: 4 },
      { slug: "diameter", valueNumber: 31 },
      steel,
    ],
    specTables: [
      minimalSpecTable("Основные параметры", [
        { label: "Длина", value: "4 м" },
        { label: "Диаметр", value: "31 мм" },
        { label: "Материал", value: "сталь" },
      ]),
    ],
  },
  {
    title: "Муфта штанги насосной МШ-19",
    slug: "rod-coupling-msh-19",
    categorySlug: "rod-couplings",
    availability: "inStock",
    price: 320,
    discountPercent: 0,
    popularity: 40,
    withImage: false,
    characteristics: [
      { slug: "diameter", valueNumber: 42 },
      { slug: "weight", valueNumber: 0.6 },
      steel,
    ],
    specTables: [rodCouplingSpecTable],
  },
  {
    title: "Центратор штанговый ЦШ-93",
    slug: "centralizer-csh-93",
    categorySlug: "centralizers",
    availability: "inStock",
    price: 540,
    discountPercent: 15,
    popularity: 85,
    withImage: true,
    characteristics: [
      { slug: "diameter", valueNumber: 93 },
      { slug: "weight", valueNumber: 1.2 },
      { slug: "material", valueText: "полиамид" },
    ],
    specTables: [kzkCasingSpecTable],
  },
  {
    title: "Штанговращатель ШВР-1",
    slug: "rod-rotator-shvr-1",
    categorySlug: "rod-rotators",
    availability: "onOrder",
    price: null,
    discountPercent: 0,
    popularity: 30,
    withImage: false,
    characteristics: [{ slug: "weight", valueNumber: 14 }, steel],
    specTables: [
      minimalSpecTable("Технические данные", [
        { label: "Масса", value: "14 кг" },
        { label: "Материал", value: "сталь" },
        { label: "Наличие", value: "Под заказ" },
      ]),
    ],
  },
  {
    title: "Сальник устьевой СУС1-73",
    slug: "wellhead-seal-sus1-73",
    categorySlug: "wellhead-seals",
    availability: "inStock",
    price: 9800,
    discountPercent: 0,
    popularity: 55,
    withImage: false,
    characteristics: [
      { slug: "diameter", valueNumber: 73 },
      { slug: "weight", valueNumber: 18 },
      steel,
    ],
    specTables: [
      minimalSpecTable("Параметры сальника", [
        { label: "Диаметр", value: "73 мм" },
        { label: "Масса", value: "18 кг" },
        { label: "Материал", value: "сталь" },
      ]),
    ],
  },
  {
    title: "Зажим полированного штока ЗПШ-32",
    slug: "polished-rod-clamp-zpsh-32",
    categorySlug: "polished-rod-clamps",
    availability: "inStock",
    price: 1100,
    discountPercent: 0,
    popularity: 35,
    withImage: false,
    characteristics: [{ slug: "diameter", valueNumber: 32 }, steel],
    specTables: [
      minimalSpecTable("Основные параметры", [
        { label: "Диаметр штока", value: "32 мм" },
        { label: "Материал", value: "сталь" },
      ]),
    ],
  },
  {
    title: "Свая винтовая СВ-108",
    slug: "pile-sv-108",
    categorySlug: "piles",
    availability: "inStock",
    price: 3400,
    discountPercent: 5,
    popularity: 80,
    withImage: true,
    characteristics: [
      { slug: "length", valueNumber: 3 },
      { slug: "diameter", valueNumber: 108 },
      { slug: "weight", valueNumber: 28 },
      steel,
    ],
    specTables: [
      minimalSpecTable("Геометрия сваи", [
        { label: "Длина", value: "3 м" },
        { label: "Диаметр", value: "108 мм" },
        { label: "Масса", value: "28 кг" },
      ]),
    ],
  },
  {
    title: "Резервуар вертикальный РВС-50",
    slug: "tank-rvs-50",
    categorySlug: "tanks",
    availability: "onOrder",
    price: null,
    discountPercent: 0,
    popularity: 60,
    withImage: false,
    characteristics: [{ slug: "weight", valueNumber: 4200 }, steel],
    specTables: [
      minimalSpecTable("Характеристики резервуара", [
        { label: "Объём", value: "50 м³" },
        { label: "Масса", value: "4200 кг" },
        { label: "Материал", value: "сталь" },
      ]),
    ],
  },
  {
    title: "Опора трубопровода неподвижная ОПН-219",
    slug: "pipeline-support-opn-219",
    categorySlug: "pipeline-supports",
    availability: "inStock",
    price: 2700,
    discountPercent: 0,
    popularity: 45,
    withImage: false,
    characteristics: [
      { slug: "diameter", valueNumber: 219 },
      { slug: "weight", valueNumber: 16 },
      steel,
    ],
    specTables: [
      minimalSpecTable("Параметры опоры", [
        { label: "Диаметр трубы", value: "219 мм" },
        { label: "Масса", value: "16 кг" },
      ]),
    ],
  },
  {
    title: "Замок клиновой для опалубки",
    slug: "wedge-lock-formwork",
    categorySlug: "wedge-lock",
    availability: "inStock",
    price: 280,
    discountPercent: 0,
    popularity: 75,
    withImage: true,
    characteristics: [{ slug: "weight", valueNumber: 0.9 }, steel],
    specTables: [
      minimalSpecTable("Параметры замка", [
        { label: "Масса", value: "0,9 кг" },
        { label: "Материал", value: "сталь" },
      ]),
    ],
  },
  {
    title: "Винт стяжной для опалубки 15 мм",
    slug: "tie-screw-15",
    categorySlug: "tie-screw",
    availability: "inStock",
    price: 95,
    discountPercent: 20,
    popularity: 88,
    withImage: false,
    characteristics: [
      { slug: "length", valueNumber: 1 },
      { slug: "diameter", valueNumber: 15 },
      steel,
    ],
    specTables: [
      minimalSpecTable("Размеры", [
        { label: "Длина", value: "1 м" },
        { label: "Диаметр", value: "15 мм" },
      ]),
    ],
  },
  {
    title: "Гайка стяжная трёхрожковая Г-15",
    slug: "three-wing-nut-15",
    categorySlug: "three-wing-nut",
    availability: "inStock",
    price: 140,
    discountPercent: 0,
    popularity: 50,
    withImage: false,
    characteristics: [
      { slug: "diameter", valueNumber: 15 },
      { slug: "weight", valueNumber: 0.4 },
      steel,
    ],
    specTables: [
      minimalSpecTable("Параметры гайки", [
        { label: "Диаметр", value: "15 мм" },
        { label: "Масса", value: "0,4 кг" },
      ]),
    ],
  },
  {
    title: "Унивилка строительная УВ",
    slug: "univilka-uv",
    categorySlug: "univilka",
    availability: "inStock",
    price: 360,
    discountPercent: 0,
    popularity: 42,
    withImage: false,
    characteristics: [{ slug: "weight", valueNumber: 1.8 }, steel],
    specTables: [
      minimalSpecTable("Параметры", [
        { label: "Масса", value: "1,8 кг" },
        { label: "Материал", value: "сталь" },
      ]),
    ],
  },
  {
    title: "Стойка телескопическая 3.0 м",
    slug: "prop-telescopic-30",
    categorySlug: "prop",
    availability: "inStock",
    price: 1250,
    discountPercent: 12,
    popularity: 82,
    withImage: true,
    characteristics: [
      { slug: "length", valueNumber: 3 },
      { slug: "weight", valueNumber: 12 },
      steel,
    ],
    specTables: [
      minimalSpecTable("Характеристики стойки", [
        { label: "Длина", value: "3 м" },
        { label: "Масса", value: "12 кг" },
      ]),
    ],
  },
  {
    title: "Тренога опорная для стойки",
    slug: "tripod-prop",
    categorySlug: "tripod",
    availability: "inStock",
    price: 690,
    discountPercent: 0,
    popularity: 38,
    withImage: false,
    characteristics: [{ slug: "weight", valueNumber: 5.5 }, steel],
    specTables: [
      minimalSpecTable("Параметры треноги", [
        { label: "Масса", value: "5,5 кг" },
        { label: "Материал", value: "сталь" },
      ]),
    ],
  },
  {
    title: "Подмости ПН-6",
    slug: "scaffold-pn6",
    categorySlug: "scaffold-pn6",
    availability: "onOrder",
    price: null,
    discountPercent: 0,
    popularity: 28,
    withImage: false,
    characteristics: [{ slug: "weight", valueNumber: 64 }, steel],
    specTables: [
      minimalSpecTable("Параметры подмостей", [
        { label: "Масса", value: "64 кг" },
        { label: "Наличие", value: "Под заказ" },
      ]),
    ],
  },
  {
    title: "Круг калиброванный 20 ст45",
    slug: "round-calibrated-20",
    categorySlug: "round-calibrated",
    availability: "inStock",
    price: 78,
    discountPercent: 0,
    popularity: 65,
    withImage: false,
    characteristics: [
      { slug: "diameter", valueNumber: 20 },
      { slug: "length", valueNumber: 6 },
      { slug: "material", valueText: "сталь 45" },
    ],
    specTables: [
      minimalSpecTable("Размеры", [
        { label: "Диаметр", value: "20 мм" },
        { label: "Длина", value: "6 м" },
        { label: "Материал", value: "сталь 45" },
      ]),
    ],
  },
];
