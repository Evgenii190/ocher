import type { ProductSpecTableSeed } from "@/shared/lib/product-spec-table.shared";
import type { SeedLocale } from "./catalog";
import { translateMaterial } from "./catalog";

export type ProductTranslation = {
  title: string;
  valueText?: Record<string, string>;
  specTables?: ProductSpecTableSeed[];
};

export type ProductSlug =
  | "pump-rod-shn-19"
  | "polished-rod-shp-31"
  | "rod-coupling-msh-19"
  | "centralizer-csh-93"
  | "rod-rotator-shvr-1"
  | "wellhead-seal-sus1-73"
  | "polished-rod-clamp-zpsh-32"
  | "pile-sv-108"
  | "tank-rvs-50"
  | "pipeline-support-opn-219"
  | "wedge-lock-formwork"
  | "tie-screw-15"
  | "three-wing-nut-15"
  | "univilka-uv"
  | "prop-telescopic-30"
  | "tripod-prop"
  | "scaffold-pn6"
  | "round-calibrated-20";

const onOrder = { en: "On order", zh: "预订" } as const;

const pumpRodStrengthEn: ProductSpecTableSeed = {
  title: "Mechanical properties of pump rods",
  rows: [
    {
      kind: "data",
      highlight: true,
      cells: [
        { values: ["Strength group"] },
        { values: ["Tensile strength, N/mm² (min)"] },
        { values: ["Yield strength, N/mm²"] },
        { values: ["Elongation, % (min)"] },
      ],
    },
    {
      kind: "data",
      label: "D, type A",
      cells: [
        { values: ["655"] },
        { values: ["379–552"] },
        { values: ["14.3"] },
      ],
    },
    {
      kind: "data",
      label: "D, type B",
      cells: [{ values: ["638"] }, { values: ["373"] }, { values: ["16"] }],
    },
    {
      kind: "data",
      label: "K",
      cells: [{ values: ["687"] }, { values: ["491"] }, { values: ["12"] }],
    },
    {
      kind: "data",
      label: "E",
      cells: [{ values: ["689"] }, { values: ["552–758"] }, { values: ["13"] }],
    },
  ],
};

const pumpRodStrengthZh: ProductSpecTableSeed = {
  title: "抽油杆机械性能",
  rows: [
    {
      kind: "data",
      highlight: true,
      cells: [
        { values: ["强度组"] },
        { values: ["抗拉强度，N/mm²（最小）"] },
        { values: ["屈服强度，N/mm²"] },
        { values: ["伸长率，%（最小）"] },
      ],
    },
    {
      kind: "data",
      label: "D，A型",
      cells: [
        { values: ["655"] },
        { values: ["379–552"] },
        { values: ["14.3"] },
      ],
    },
    {
      kind: "data",
      label: "D，B型",
      cells: [{ values: ["638"] }, { values: ["373"] }, { values: ["16"] }],
    },
    {
      kind: "data",
      label: "K",
      cells: [{ values: ["687"] }, { values: ["491"] }, { values: ["12"] }],
    },
    {
      kind: "data",
      label: "E",
      cells: [{ values: ["689"] }, { values: ["552–758"] }, { values: ["13"] }],
    },
  ],
};

const rodCouplingSpecEn: ProductSpecTableSeed = {
  title: "Technical specifications of connecting couplings",
  columns: ["ШНШ.М 3/4", "ШНШ.М 7/8", "ШНШ.М 3/4×7/8", "ШНШ.М 7/8×1"],
  rows: [
    {
      kind: "wide",
      label: "Standard",
      wideValue: "TU 3665-027-002175515-02",
    },
    {
      kind: "data",
      label: "Size",
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
      label: "Outside diameter, mm",
      cells: [
        { values: ["45", "53"] },
        { values: ["53"] },
        { values: ["53"] },
        { values: ["55.6"] },
      ],
    },
    {
      kind: "data",
      label: "Length, mm",
      cells: [
        { values: [] },
        { values: ["495"] },
        { values: [] },
        { values: ["507"] },
      ],
    },
    {
      kind: "data",
      label: "Breaking load, kgf",
      cells: [
        { values: ["14000", "20000"] },
        { values: ["20000"] },
        { values: ["20000"] },
        { values: ["20000"] },
      ],
    },
    {
      kind: "data",
      label: "Connected rod size",
      cells: [
        { values: ["ШН 3/4"] },
        { values: ["ШН 7/8"] },
        { values: ["ШН 3/4; ШН 7/8"] },
        { values: ["ШН 7/8; ШН 1"] },
      ],
    },
  ],
};

const rodCouplingSpecZh: ProductSpecTableSeed = {
  title: "连接接箍技术参数",
  columns: ["ШНШ.М 3/4", "ШНШ.М 7/8", "ШНШ.М 3/4×7/8", "ШНШ.М 7/8×1"],
  rows: [
    {
      kind: "wide",
      label: "标准",
      wideValue: "TU 3665-027-002175515-02",
    },
    {
      kind: "data",
      label: "规格",
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
      label: "外径，mm",
      cells: [
        { values: ["45", "53"] },
        { values: ["53"] },
        { values: ["53"] },
        { values: ["55.6"] },
      ],
    },
    {
      kind: "data",
      label: "长度，mm",
      cells: [
        { values: [] },
        { values: ["495"] },
        { values: [] },
        { values: ["507"] },
      ],
    },
    {
      kind: "data",
      label: "破断力，kgf",
      cells: [
        { values: ["14000", "20000"] },
        { values: ["20000"] },
        { values: ["20000"] },
        { values: ["20000"] },
      ],
    },
    {
      kind: "data",
      label: "连接抽油杆规格",
      cells: [
        { values: ["ШН 3/4"] },
        { values: ["ШН 7/8"] },
        { values: ["ШН 3/4; ШН 7/8"] },
        { values: ["ШН 7/8; ШН 1"] },
      ],
    },
  ],
};

const kzkCasingSpecEn: ProductSpecTableSeed = {
  title: "Technical specifications of KZK cable protectors",
  columns: ["KZK 60", "KZK 73", "KZK 89", "KZK 102", "KZK 114"],
  rows: [
    {
      kind: "data",
      label: "Protector size",
      highlight: true,
      cells: [
        { values: ["KZK 60"] },
        { values: ["KZK 73"] },
        { values: ["KZK 89"] },
        { values: ["KZK 102"] },
        { values: ["KZK 114"] },
      ],
    },
    {
      kind: "data",
      label: "Tubing type",
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
      label: "Minimum casing size:",
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
      label: "outside diameter, mm",
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
      label: "wall thickness, mm",
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
      label: "Protector dimensions:",
      accent: true,
    },
    {
      kind: "data",
      label: "length L, mm",
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
      label: "width B, mm",
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
      label: "height H, mm",
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
      label: "Cable slot:",
      accent: true,
    },
    {
      kind: "data",
      label: "width I, mm",
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
      label: "height h, mm",
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
      label: "Allowable axial load, kgf",
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
      label: "Allowable torque relative to tubing, kgf/m",
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
      label: "Maximum retained cable length, m",
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
      label: "Mass, max, kg",
      accent: true,
      cells: [
        { values: ["1.0"] },
        { values: ["1.2"] },
        { values: ["1.5"] },
        { values: ["2.0"] },
        { values: ["2.5"] },
      ],
    },
  ],
};

const kzkCasingSpecZh: ProductSpecTableSeed = {
  title: "KZK 电缆保护罩技术参数",
  columns: ["KZK 60", "KZK 73", "KZK 89", "KZK 102", "KZK 114"],
  rows: [
    {
      kind: "data",
      label: "保护罩规格",
      highlight: true,
      cells: [
        { values: ["KZK 60"] },
        { values: ["KZK 73"] },
        { values: ["KZK 89"] },
        { values: ["KZK 102"] },
        { values: ["KZK 114"] },
      ],
    },
    {
      kind: "data",
      label: "油管类型",
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
      label: "最小套管尺寸：",
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
      label: "外径，mm",
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
      label: "壁厚，mm",
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
      label: "保护罩外形尺寸：",
      accent: true,
    },
    {
      kind: "data",
      label: "长度 L，mm",
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
      label: "宽度 B，mm",
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
      label: "高度 H，mm",
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
      label: "电缆槽：",
      accent: true,
    },
    {
      kind: "data",
      label: "宽度 I，mm",
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
      label: "高度 h，mm",
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
      label: "允许轴向载荷，kgf",
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
      label: "相对油管允许扭矩，kgf/m",
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
      label: "最大固定电缆长度，m",
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
      label: "质量，不超过，kg",
      accent: true,
      cells: [
        { values: ["1.0"] },
        { values: ["1.2"] },
        { values: ["1.5"] },
        { values: ["2.0"] },
        { values: ["2.5"] },
      ],
    },
  ],
};

function minimalTable(
  title: string,
  rows: { label: string; value: string }[],
): ProductSpecTableSeed {
  return {
    title,
    rows: rows.map((row) => ({
      kind: "data" as const,
      label: row.label,
      cells: [{ values: [row.value] }],
    })),
  };
}

export const productTranslations: Record<
  SeedLocale,
  Record<ProductSlug, ProductTranslation>
> = {
  en: {
    "pump-rod-shn-19": {
      title: "Pump rod SHN-19, class D",
      valueText: { material: "steel" },
      specTables: [pumpRodStrengthEn],
    },
    "polished-rod-shp-31": {
      title: "Polished rod SHP-31",
      valueText: { material: "steel" },
      specTables: [
        minimalTable("Main parameters", [
          { label: "Length", value: "4 m" },
          { label: "Diameter", value: "31 mm" },
          { label: "Material", value: "steel" },
        ]),
      ],
    },
    "rod-coupling-msh-19": {
      title: "Pump rod coupling MSH-19",
      valueText: { material: "steel" },
      specTables: [rodCouplingSpecEn],
    },
    "centralizer-csh-93": {
      title: "Rod centralizer CSH-93",
      valueText: { material: "polyamide" },
      specTables: [kzkCasingSpecEn],
    },
    "rod-rotator-shvr-1": {
      title: "Rod rotator SHVR-1",
      valueText: { material: "steel" },
      specTables: [
        minimalTable("Technical data", [
          { label: "Mass", value: "14 kg" },
          { label: "Material", value: "steel" },
          { label: "Availability", value: onOrder.en },
        ]),
      ],
    },
    "wellhead-seal-sus1-73": {
      title: "Wellhead seal SUS1-73",
      valueText: { material: "steel" },
      specTables: [
        minimalTable("Seal parameters", [
          { label: "Diameter", value: "73 mm" },
          { label: "Mass", value: "18 kg" },
          { label: "Material", value: "steel" },
        ]),
      ],
    },
    "polished-rod-clamp-zpsh-32": {
      title: "Polished rod clamp ZPSH-32",
      valueText: { material: "steel" },
      specTables: [
        minimalTable("Main parameters", [
          { label: "Rod diameter", value: "32 mm" },
          { label: "Material", value: "steel" },
        ]),
      ],
    },
    "pile-sv-108": {
      title: "Screw pile SV-108",
      valueText: { material: "steel" },
      specTables: [
        minimalTable("Pile geometry", [
          { label: "Length", value: "3 m" },
          { label: "Diameter", value: "108 mm" },
          { label: "Mass", value: "28 kg" },
        ]),
      ],
    },
    "tank-rvs-50": {
      title: "Vertical tank RVS-50",
      valueText: { material: "steel" },
      specTables: [
        minimalTable("Tank specifications", [
          { label: "Volume", value: "50 m³" },
          { label: "Mass", value: "4200 kg" },
          { label: "Material", value: "steel" },
        ]),
      ],
    },
    "pipeline-support-opn-219": {
      title: "Fixed pipeline support OPN-219",
      valueText: { material: "steel" },
      specTables: [
        minimalTable("Support parameters", [
          { label: "Pipe diameter", value: "219 mm" },
          { label: "Mass", value: "16 kg" },
        ]),
      ],
    },
    "wedge-lock-formwork": {
      title: "Wedge lock for formwork",
      valueText: { material: "steel" },
      specTables: [
        minimalTable("Lock parameters", [
          { label: "Mass", value: "0.9 kg" },
          { label: "Material", value: "steel" },
        ]),
      ],
    },
    "tie-screw-15": {
      title: "Formwork tie screw 15 mm",
      valueText: { material: "steel" },
      specTables: [
        minimalTable("Dimensions", [
          { label: "Length", value: "1 m" },
          { label: "Diameter", value: "15 mm" },
        ]),
      ],
    },
    "three-wing-nut-15": {
      title: "Three-wing tie nut G-15",
      valueText: { material: "steel" },
      specTables: [
        minimalTable("Nut parameters", [
          { label: "Diameter", value: "15 mm" },
          { label: "Mass", value: "0.4 kg" },
        ]),
      ],
    },
    "univilka-uv": {
      title: "Construction univilka UV",
      valueText: { material: "steel" },
      specTables: [
        minimalTable("Parameters", [
          { label: "Mass", value: "1.8 kg" },
          { label: "Material", value: "steel" },
        ]),
      ],
    },
    "prop-telescopic-30": {
      title: "Telescopic prop 3.0 m",
      valueText: { material: "steel" },
      specTables: [
        minimalTable("Prop specifications", [
          { label: "Length", value: "3 m" },
          { label: "Mass", value: "12 kg" },
        ]),
      ],
    },
    "tripod-prop": {
      title: "Support tripod for props",
      valueText: { material: "steel" },
      specTables: [
        minimalTable("Tripod parameters", [
          { label: "Mass", value: "5.5 kg" },
          { label: "Material", value: "steel" },
        ]),
      ],
    },
    "scaffold-pn6": {
      title: "Scaffold PN-6",
      valueText: { material: "steel" },
      specTables: [
        minimalTable("Scaffold parameters", [
          { label: "Mass", value: "64 kg" },
          { label: "Availability", value: onOrder.en },
        ]),
      ],
    },
    "round-calibrated-20": {
      title: "Calibrated round 20, steel 45",
      valueText: { material: "steel 45" },
      specTables: [
        minimalTable("Dimensions", [
          { label: "Diameter", value: "20 mm" },
          { label: "Length", value: "6 m" },
          { label: "Material", value: "steel 45" },
        ]),
      ],
    },
  },
  zh: {
    "pump-rod-shn-19": {
      title: "抽油杆 ШН-19 D级",
      valueText: { material: "钢" },
      specTables: [pumpRodStrengthZh],
    },
    "polished-rod-shp-31": {
      title: "抛光杆 ШП-31",
      valueText: { material: "钢" },
      specTables: [
        minimalTable("主要参数", [
          { label: "长度", value: "4 m" },
          { label: "直径", value: "31 mm" },
          { label: "材料", value: "钢" },
        ]),
      ],
    },
    "rod-coupling-msh-19": {
      title: "抽油杆接箍 МШ-19",
      valueText: { material: "钢" },
      specTables: [rodCouplingSpecZh],
    },
    "centralizer-csh-93": {
      title: "抽油杆扶正器 ЦШ-93",
      valueText: { material: "聚酰胺" },
      specTables: [kzkCasingSpecZh],
    },
    "rod-rotator-shvr-1": {
      title: "抽油杆旋转器 ШВР-1",
      valueText: { material: "钢" },
      specTables: [
        minimalTable("技术数据", [
          { label: "质量", value: "14 kg" },
          { label: "材料", value: "钢" },
          { label: "库存", value: onOrder.zh },
        ]),
      ],
    },
    "wellhead-seal-sus1-73": {
      title: "井口密封器 СУС1-73",
      valueText: { material: "钢" },
      specTables: [
        minimalTable("密封器参数", [
          { label: "直径", value: "73 mm" },
          { label: "质量", value: "18 kg" },
          { label: "材料", value: "钢" },
        ]),
      ],
    },
    "polished-rod-clamp-zpsh-32": {
      title: "抛光杆夹具 ЗПШ-32",
      valueText: { material: "钢" },
      specTables: [
        minimalTable("主要参数", [
          { label: "杆径", value: "32 mm" },
          { label: "材料", value: "钢" },
        ]),
      ],
    },
    "pile-sv-108": {
      title: "螺旋桩 СВ-108",
      valueText: { material: "钢" },
      specTables: [
        minimalTable("桩体几何参数", [
          { label: "长度", value: "3 m" },
          { label: "直径", value: "108 mm" },
          { label: "质量", value: "28 kg" },
        ]),
      ],
    },
    "tank-rvs-50": {
      title: "立式储罐 РВС-50",
      valueText: { material: "钢" },
      specTables: [
        minimalTable("储罐参数", [
          { label: "容积", value: "50 m³" },
          { label: "质量", value: "4200 kg" },
          { label: "材料", value: "钢" },
        ]),
      ],
    },
    "pipeline-support-opn-219": {
      title: "固定管道支架 ОПН-219",
      valueText: { material: "钢" },
      specTables: [
        minimalTable("支架参数", [
          { label: "管道直径", value: "219 mm" },
          { label: "质量", value: "16 kg" },
        ]),
      ],
    },
    "wedge-lock-formwork": {
      title: "模板楔形锁",
      valueText: { material: "钢" },
      specTables: [
        minimalTable("锁具参数", [
          { label: "质量", value: "0.9 kg" },
          { label: "材料", value: "钢" },
        ]),
      ],
    },
    "tie-screw-15": {
      title: "模板对拉螺丝 15 mm",
      valueText: { material: "钢" },
      specTables: [
        minimalTable("尺寸", [
          { label: "长度", value: "1 m" },
          { label: "直径", value: "15 mm" },
        ]),
      ],
    },
    "three-wing-nut-15": {
      title: "三翼对拉螺母 Г-15",
      valueText: { material: "钢" },
      specTables: [
        minimalTable("螺母参数", [
          { label: "直径", value: "15 mm" },
          { label: "质量", value: "0.4 kg" },
        ]),
      ],
    },
    "univilka-uv": {
      title: "建筑万能连接件 УВ",
      valueText: { material: "钢" },
      specTables: [
        minimalTable("参数", [
          { label: "质量", value: "1.8 kg" },
          { label: "材料", value: "钢" },
        ]),
      ],
    },
    "prop-telescopic-30": {
      title: "伸缩支撑 3.0 m",
      valueText: { material: "钢" },
      specTables: [
        minimalTable("支撑参数", [
          { label: "长度", value: "3 m" },
          { label: "质量", value: "12 kg" },
        ]),
      ],
    },
    "tripod-prop": {
      title: "支撑三脚架",
      valueText: { material: "钢" },
      specTables: [
        minimalTable("三脚架参数", [
          { label: "质量", value: "5.5 kg" },
          { label: "材料", value: "钢" },
        ]),
      ],
    },
    "scaffold-pn6": {
      title: "脚手架 ПН-6",
      valueText: { material: "钢" },
      specTables: [
        minimalTable("脚手架参数", [
          { label: "质量", value: "64 kg" },
          { label: "库存", value: onOrder.zh },
        ]),
      ],
    },
    "round-calibrated-20": {
      title: "校准圆钢 20 45号钢",
      valueText: { material: "45号钢" },
      specTables: [
        minimalTable("尺寸", [
          { label: "直径", value: "20 mm" },
          { label: "长度", value: "6 m" },
          { label: "材料", value: "45号钢" },
        ]),
      ],
    },
  },
};

export function getProductTranslation(
  slug: string,
  locale: SeedLocale,
): ProductTranslation | undefined {
  return productTranslations[locale][slug as ProductSlug];
}

export function buildProductLocaleFields(
  slug: string,
  locale: SeedLocale,
  characteristics: { slug: string; valueText?: string }[],
  characteristicIdBySlug: Map<string, number | string>,
): Record<string, unknown> | undefined {
  const translation = getProductTranslation(slug, locale);
  if (!translation) {
    return undefined;
  }

  return {
    title: translation.title,
    characteristics: characteristics.map((item) => ({
      characteristic: characteristicIdBySlug.get(item.slug),
      ...(item.valueText
        ? {
            valueText:
              translation.valueText?.[item.slug] ??
              translateMaterial(item.valueText, locale),
          }
        : {}),
    })),
    ...(translation.specTables
      ? {
          specTables: translation.specTables.map((table) => ({
            title: table.title,
            columns: table.columns?.map((header) => ({ header })) ?? [],
            rows: table.rows.map((row) => ({
              kind: row.kind,
              label: row.label,
              wideValue: row.wideValue,
              highlight: row.highlight ?? false,
              accent: row.accent ?? false,
              cells:
                row.cells?.map((cell) => ({
                  values: cell.values.map((text) => ({ text })),
                })) ?? [],
            })),
          })),
        }
      : {}),
  };
}
