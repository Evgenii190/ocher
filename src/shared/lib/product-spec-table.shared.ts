export type ProductSpecTableCell = {
  values: string[];
};

export type ProductSpecTableRowKind = "data" | "wide" | "section";

export type ProductSpecTableRow = {
  kind: ProductSpecTableRowKind;
  label?: string;
  /** Для kind=wide — значение на всю ширину таблицы. */
  wideValue?: string;
  cells?: ProductSpecTableCell[];
  highlight?: boolean;
  /** Красная маркер-точка перед подписью (как в макете КЗК). */
  accent?: boolean;
};

export type ProductSpecTable = {
  title: string;
  /** Заголовки колонок данных (без первой колонки «Параметр»). Пусто — простая таблица. */
  columns: string[];
  rows: ProductSpecTableRow[];
};

export type ProductSpecTableSeedRow = {
  kind: ProductSpecTableRowKind;
  label?: string;
  wideValue?: string;
  cells?: { values: string[] }[];
  highlight?: boolean;
  accent?: boolean;
};

export type ProductSpecTableSeed = {
  title: string;
  columns?: string[];
  rows: ProductSpecTableSeedRow[];
};
