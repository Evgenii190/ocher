import type { ProductSpecTable } from "@/shared/lib/product-spec-table.shared";

export type AvailabilityStatus = "inStock" | "onOrder";

export type CharacteristicType = "number" | "text";

export type Unit = "none" | "mm" | "cm" | "m" | "kg" | "t";

export type CatalogSubcategory = {
  id: string;
  slug: string;
  label: string;
  /** Количество товаров в подкатегории. */
  productCount: number;
};

export type CatalogCategory = {
  id: string;
  slug: string;
  label: string;
  subcategories: CatalogSubcategory[];
  /** Суммарное количество товаров во всех подкатегориях. */
  productCount: number;
};

export type CatalogCharacteristic = {
  id: string;
  slug: string;
  label: string;
  type: CharacteristicType;
  unit: Unit;
};

export type ProductCharacteristic = {
  slug: string;
  label: string;
  type: CharacteristicType;
  unit: Unit;
  valueNumber: number | null;
  valueText: string | null;
};

export type CatalogProduct = {
  id: string;
  slug: string;
  title: string;
  categoryId: string;
  categorySlug: string;
  categoryLabel: string;
  availability: AvailabilityStatus;
  price: number | null;
  discountPercent: number;
  image: string | null;
  popularity: number;
  description: string | null;
  characteristics: ProductCharacteristic[];
};

export type ProductDocument = {
  id: string;
  title: string;
  url: string;
  filename: string;
  mimeType: string | null;
};

export type ProductDetail = CatalogProduct & {
  images: string[];
  documents: ProductDocument[];
  specTables: ProductSpecTable[];
};

export const availabilityOptionIds: AvailabilityStatus[] = [
  "inStock",
  "onOrder",
];

export const availabilityLabelKeys: Record<AvailabilityStatus, string> = {
  inStock: "common.availability.inStock",
  onOrder: "common.availability.onOrder",
};

const unitLabelKeys: Record<Unit, string | null> = {
  none: null,
  mm: "common.units.mm",
  cm: "common.units.cm",
  m: "common.units.m",
  kg: "common.units.kg",
  t: "common.units.t",
};

export function unitLabel(unit: Unit, t: (key: string) => string): string {
  const key = unitLabelKeys[unit];
  return key ? t(key) : "";
}

export function formatPrice(price: number): string {
  return `${Math.round(price).toLocaleString("ru-RU")} ₽`;
}

/** Склонение «N товар(а/ов)». */
export function formatProductCount(
  count: number,
  t: (key: string, values?: { count: number }) => string,
): string {
  return t("common.plural.product", { count });
}

/** Итоговая цена с учётом скидки (в процентах). */
export function discountedPrice(
  price: number,
  discountPercent: number,
): number {
  if (discountPercent <= 0) {
    return price;
  }
  return Math.round(price * (1 - discountPercent / 100));
}

export function formatCharacteristicValue(
  characteristic: ProductCharacteristic,
  t: (key: string) => string,
): string {
  if (characteristic.type === "number" && characteristic.valueNumber !== null) {
    const unit = unitLabel(characteristic.unit, t);
    return unit
      ? `${characteristic.valueNumber} ${unit}`
      : String(characteristic.valueNumber);
  }
  return characteristic.valueText ?? "";
}
