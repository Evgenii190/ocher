import type { ProductSpecTableSeed } from "@/shared/lib/product-spec-table.shared";

/** Таблица из Figma: технические характеристики кожухов КЗК. */
export const kzkCasingSpecTable: ProductSpecTableSeed = {
  title: "Технические характеристики кожухов КЗК",
  columns: ["КЗК 60", "КЗК 73", "КЗК 89", "КЗК 102", "КЗК 114"],
  rows: [
    {
      kind: "data",
      label: "Типоразмер кожуха",
      highlight: true,
      cells: [
        { values: ["КЗК 60"] },
        { values: ["КЗК 73"] },
        { values: ["КЗК 89"] },
        { values: ["КЗК 102"] },
        { values: ["КЗК 114"] },
      ],
    },
    {
      kind: "data",
      label: "Тип НКТ",
      cells: [
        { values: ["НКТ-60"] },
        { values: ["НКТ-73"] },
        { values: ["НКТ-89"] },
        { values: ["НКТ-102"] },
        { values: ["НКТ-114"] },
      ],
    },
    {
      kind: "data",
      label: "Минимальный размер обсадной трубы:",
      accent: true,
      cells: [
        { values: ["140×7"] },
        { values: ["146×10"] },
        { values: ["168×10"] },
        { values: ["194×12"] },
        { values: ["219×12"] },
      ],
    },
    {
      kind: "data",
      label: "наружный диаметр, мм",
      cells: [
        { values: ["140"] },
        { values: ["146"] },
        { values: ["168"] },
        { values: ["194"] },
        { values: ["219"] },
      ],
    },
    {
      kind: "data",
      label: "толщина стенки, мм",
      cells: [
        { values: ["7"] },
        { values: ["10"] },
        { values: ["10"] },
        { values: ["12"] },
        { values: ["12"] },
      ],
    },
    {
      kind: "section",
      label: "Габаритные размеры кожуха:",
      accent: true,
    },
    {
      kind: "data",
      label: "длина L, мм",
      cells: [
        { values: ["230"] },
        { values: ["260"] },
        { values: ["275"] },
        { values: ["285"] },
        { values: ["330"] },
      ],
    },
    {
      kind: "data",
      label: "ширина B, мм",
      cells: [
        { values: ["97"] },
        { values: ["108"] },
        { values: ["124"] },
        { values: ["136"] },
        { values: ["148"] },
      ],
    },
    {
      kind: "data",
      label: "высота H, мм",
      cells: [
        { values: ["94"] },
        { values: ["110"] },
        { values: ["129"] },
        { values: ["146"] },
        { values: ["160"] },
      ],
    },
    {
      kind: "section",
      label: "Паз под кабель:",
      accent: true,
    },
    {
      kind: "data",
      label: "ширина I, мм",
      cells: [
        { values: ["40"] },
        { values: ["40"] },
        { values: ["52"] },
        { values: ["52"] },
        { values: ["52"] },
      ],
    },
    {
      kind: "data",
      label: "высота h, мм",
      cells: [
        { values: ["16"] },
        { values: ["16"] },
        { values: ["20"] },
        { values: ["20"] },
        { values: ["20"] },
      ],
    },
    {
      kind: "data",
      label: "Допустимая осевая нагрузка, кгс",
      accent: true,
      cells: [
        { values: ["5000"] },
        { values: ["5000"] },
        { values: ["5000"] },
        { values: ["5000"] },
        { values: ["5000"] },
      ],
    },
    {
      kind: "data",
      label: "Допустимый крутящий момент относительно НКТ, кгс/м",
      accent: true,
      cells: [
        { values: ["35"] },
        { values: ["35"] },
        { values: ["35"] },
        { values: ["35"] },
        { values: ["35"] },
      ],
    },
    {
      kind: "data",
      label: "Максимальная длина удерживаемого кабеля, м",
      accent: true,
      cells: [
        { values: ["30"] },
        { values: ["30"] },
        { values: ["30"] },
        { values: ["30"] },
        { values: ["30"] },
      ],
    },
    {
      kind: "data",
      label: "Масса не более, кг",
      accent: true,
      cells: [
        { values: ["1,0"] },
        { values: ["1,2"] },
        { values: ["1,5"] },
        { values: ["2,0"] },
        { values: ["2,5"] },
      ],
    },
  ],
};

/** Таблица из Figma: механические свойства насосных штанг. */
export const pumpRodStrengthTable: ProductSpecTableSeed = {
  title: "Механические свойства насосных штанг",
  rows: [
    {
      kind: "data",
      highlight: true,
      cells: [
        { values: ["Группа прочности"] },
        { values: ["Временное сопротивление, Н/мм² (min)"] },
        { values: ["Предел текучести, Н/мм²"] },
        { values: ["Относительное удлинение, % (min)"] },
      ],
    },
    {
      kind: "data",
      label: "Д, исп.А",
      cells: [
        { values: ["655"] },
        { values: ["379–552"] },
        { values: ["14,3"] },
      ],
    },
    {
      kind: "data",
      label: "Д, исп.Б",
      cells: [{ values: ["638"] }, { values: ["373"] }, { values: ["16"] }],
    },
    {
      kind: "data",
      label: "К",
      cells: [{ values: ["687"] }, { values: ["491"] }, { values: ["12"] }],
    },
    {
      kind: "data",
      label: "Е",
      cells: [{ values: ["689"] }, { values: ["552–758"] }, { values: ["13"] }],
    },
  ],
};

/** Таблица из Figma: технические характеристики соединительных муфт. */
export const rodCouplingSpecTable: ProductSpecTableSeed = {
  title: "Технические характеристики соединительных муфт",
  columns: ["ШНШ.М 3/4", "ШНШ.М 7/8", "ШНШ.М 3/4×7/8", "ШНШ.М 7/8×1"],
  rows: [
    {
      kind: "wide",
      label: "Стандарт",
      wideValue: "ТУ 3665-027-002175515-02",
    },
    {
      kind: "data",
      label: "Типоразмер",
      highlight: true,
      cells: [
        { values: ["ШНШ.М 3/4"] },
        { values: ["ШНШ.М 7/8"] },
        { values: ["ШНШ.М 3/4×7/8"] },
        { values: ["ШНШ.М 7/8×1"] },
      ],
    },
    {
      kind: "data",
      label: "Наружный диаметр, мм",
      cells: [
        { values: ["45", "53"] },
        { values: ["53"] },
        { values: ["53"] },
        { values: ["55,6"] },
      ],
    },
    {
      kind: "data",
      label: "Длина, мм",
      cells: [
        { values: [] },
        { values: ["495"] },
        { values: [] },
        { values: ["507"] },
      ],
    },
    {
      kind: "data",
      label: "Разрывное усилие, кгс",
      cells: [
        { values: ["14000", "20000"] },
        { values: ["20000"] },
        { values: ["20000"] },
        { values: ["20000"] },
      ],
    },
    {
      kind: "data",
      label: "Типоразмер присоединяемой штанги",
      cells: [
        { values: ["ШН 3/4"] },
        { values: ["ШН 7/8"] },
        { values: ["ШН 3/4; ШН 7/8"] },
        { values: ["ШН 7/8; ШН 1"] },
      ],
    },
  ],
};

export function minimalSpecTable(
  title: string,
  rows: { label: string; value: string }[],
): ProductSpecTableSeed {
  return {
    title,
    rows: rows.map((row) => ({
      kind: "data",
      label: row.label,
      cells: [{ values: [row.value] }],
    })),
  };
}
