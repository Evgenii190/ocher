import type { ProcurementSeedEntry } from "@/shared/lib/procurement.shared";
import type { SeedLocale } from "./catalog";

export const procurementPageTranslations: Record<SeedLocale, { pageTitle: string }> =
  {
    en: { pageTitle: "Procurement" },
    zh: { pageTitle: "采购" },
  };

/** Keys match Russian `name` or `groupTitle` from procurement-data.ts */
export const procurementEntryTranslations: Record<
  SeedLocale,
  Record<string, { name?: string; groupTitle?: string; quantity?: string }>
> = {
  en: {
    "Дробь:": { groupTitle: "Shot:" },
    "ДСКу 0,5 (тв.365-545 HV ГОСТ 11964-81)": {
      name: "DSKu 0.5 (hardness 365–545 HV GOST 11964-81)",
      quantity: "6 t",
    },
    "ДСЛу 1,0 (тв.365-545 HV ГОСТ 11964-81)": {
      name: "DSLu 1.0 (hardness 365–545 HV GOST 11964-81)",
      quantity: "10 t",
    },
    "Профиль опалубочный 60х120х3,0/Ст3сп ГОСТ 380-2005": {
      name: "Formwork profile 60×120×3.0/St3sp GOST 380-2005",
      quantity: "40 t",
    },
    "Краска порошковая RAL 3002,7036 гладкий глянец": {
      name: "Powder paint RAL 3002, 7036 smooth gloss",
      quantity: "1 t",
    },
    "Бумага битумированная БУ-Б (ГОСТ 515-77)": {
      name: "Bituminized paper BU-B (GOST 515-77)",
      quantity: "1 t",
    },
    "Изолон ППЭ, 5мм": { name: "Isolon PPE, 5 mm" },
    "Лента стальная упаковочная 32х0,8 (черная) – и замки к ней 32х57х0,9":
      {
        name: "Steel packing strip 32×0.8 (black) and locks 32×57×0.9",
        quantity: "900 kg / 2000 pcs",
      },
    "Лист Б-ПН-О-8 ГОСТ 19903-2015/ С 345-15 09Г2С ГОСТ 19281-2014": {
      name: "Sheet B-PN-O-8 GOST 19903-2015 / C 345-15 09G2S GOST 19281-2014",
      quantity: "100 t",
    },
    "Лист Б-ПН-О-10 ГОСТ 19903-2015/ С 345-15 -09Г2С ГОСТ 19281-2014": {
      name: "Sheet B-PN-O-10 GOST 19903-2015 / C 345-15 09G2S GOST 19281-2014",
      quantity: "100 t",
    },
    "Лист Б-ПН-0-5 ГОСТ19903-2015/Ст3сп ГОСТ 380-2005": {
      name: "Sheet B-PN-0-5 GOST 19903-2015 / St3sp GOST 380-2005",
      quantity: "100 t",
    },
    "Лист Б-ПН-0-8 ГОСТ19903-2015/Ст3сп ГОСТ 380-2005": {
      name: "Sheet B-PN-0-8 GOST 19903-2015 / St3sp GOST 380-2005",
      quantity: "100 t",
    },
    "Проволока чер.отож.4,0 мм ГОСТ 3282-74": {
      name: "Black annealed wire 4.0 mm GOST 3282-74",
      quantity: "800 kg",
    },
    "Проволока чер.отож.8,0 мм ГОСТ 3282-74": {
      name: "Black annealed wire 8.0 mm GOST 3282-74",
      quantity: "400 kg",
    },
    "Гайка М16 ГОСТ 5915": {
      name: "Nut M16 GOST 5915",
      quantity: "400 kg",
    },
    "Проволока сварочная ф 1,2 мм ст.08Г2С ГОСТ2246-70": {
      name: "Welding wire Ø 1.2 mm 08G2S GOST 2246-70",
      quantity: "2000 kg",
    },
  },
  zh: {
    "Дробь:": { groupTitle: "钢丸：" },
    "ДСКу 0,5 (тв.365-545 HV ГОСТ 11964-81)": {
      name: "DSKu 0.5（硬度365–545 HV GOST 11964-81）",
      quantity: "6 吨",
    },
    "ДСЛу 1,0 (тв.365-545 HV ГОСТ 11964-81)": {
      name: "DSLu 1.0（硬度365–545 HV GOST 11964-81）",
      quantity: "10 吨",
    },
    "Профиль опалубочный 60х120х3,0/Ст3сп ГОСТ 380-2005": {
      name: "模板型材 60×120×3.0/St3sp GOST 380-2005",
      quantity: "40 吨",
    },
    "Краска порошковая RAL 3002,7036 гладкий глянец": {
      name: "粉末涂料 RAL 3002、7036 光面",
      quantity: "1 吨",
    },
    "Бумага битумированная БУ-Б (ГОСТ 515-77)": {
      name: "沥青纸 BU-B（GOST 515-77）",
      quantity: "1 吨",
    },
    "Изолон ППЭ, 5мм": { name: "Isolon PPE，5 mm" },
    "Лента стальная упаковочная 32х0,8 (черная) – и замки к ней 32х57х0,9":
      {
        name: "打包钢带 32×0.8（黑色）及锁扣 32×57×0.9",
        quantity: "900 公斤/2000 件",
      },
    "Лист Б-ПН-О-8 ГОСТ 19903-2015/ С 345-15 09Г2С ГОСТ 19281-2014": {
      name: "钢板 B-PN-O-8 GOST 19903-2015 / C 345-15 09G2S GOST 19281-2014",
      quantity: "100 吨",
    },
    "Лист Б-ПН-О-10 ГОСТ 19903-2015/ С 345-15 -09Г2С ГОСТ 19281-2014": {
      name: "钢板 B-PN-O-10 GOST 19903-2015 / C 345-15 09G2S GOST 19281-2014",
      quantity: "100 吨",
    },
    "Лист Б-ПН-0-5 ГОСТ19903-2015/Ст3сп ГОСТ 380-2005": {
      name: "钢板 B-PN-0-5 GOST 19903-2015 / St3sp GOST 380-2005",
      quantity: "100 吨",
    },
    "Лист Б-ПН-0-8 ГОСТ19903-2015/Ст3сп ГОСТ 380-2005": {
      name: "钢板 B-PN-0-8 GOST 19903-2015 / St3sp GOST 380-2005",
      quantity: "100 吨",
    },
    "Проволока чер.отож.4,0 мм ГОСТ 3282-74": {
      name: "黑退火钢丝 4.0 mm GOST 3282-74",
      quantity: "800 公斤",
    },
    "Проволока чер.отож.8,0 мм ГОСТ 3282-74": {
      name: "黑退火钢丝 8.0 mm GOST 3282-74",
      quantity: "400 公斤",
    },
    "Гайка М16 ГОСТ 5915": {
      name: "螺母 M16 GOST 5915",
      quantity: "400 公斤",
    },
    "Проволока сварочная ф 1,2 мм ст.08Г2С ГОСТ2246-70": {
      name: "焊丝 Ø 1.2 mm 08G2S GOST 2246-70",
      quantity: "2000 公斤",
    },
  },
};

export function buildProcurementLocaleEntries(
  entries: ProcurementSeedEntry[],
  locale: SeedLocale,
) {
  const translations = procurementEntryTranslations[locale];

  return entries.map((entry) => {
    if (entry.kind === "group") {
      const groupTr = translations[entry.groupTitle];
      return {
        kind: "group" as const,
        groupTitle: groupTr?.groupTitle ?? entry.groupTitle,
        items: entry.items.map((item) => {
          const itemTr = translations[item.name];
          return {
            name: itemTr?.name ?? item.name,
            ...(item.quantity
              ? { quantity: itemTr?.quantity ?? item.quantity }
              : {}),
          };
        }),
      };
    }

    const rowTr = translations[entry.name];
    return {
      kind: "row" as const,
      name: rowTr?.name ?? entry.name,
      ...(entry.quantity
        ? { quantity: rowTr?.quantity ?? entry.quantity }
        : {}),
    };
  });
}
