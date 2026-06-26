import type { SeedLocale } from "./catalog";

export type HomeAboutCopy = {
  h1: string;
  introBefore: string;
  introHighlight: string;
  introAfter: string;
  paragraph1: string;
  videoCaption: string;
  productsHeading: string;
  productsIntro: string;
  productsLeftTitle: string;
  productsLeftItems: string[];
  productsRightTitle: string;
  productsRightItems: string[];
  paragraph2: string;
  metalHeading: string;
  metalParagraph1: string;
  metalParagraph2: string;
  servicesHeading: string;
  servicesIntro: string;
  servicesLeftTitle: string;
  servicesLeftItems: string[];
  servicesRightTitle: string;
  servicesRightItems: string[];
  servicesParagraph: string;
  calloutTitle: string;
  calloutBody: string;
};

export const homeAboutTranslations: Record<SeedLocale, HomeAboutCopy> = {
  en: {
    h1: "Ocher Machine-Building Plant — tradition and innovation",
    introBefore: "JSC Ocher Machine-Building Plant (",
    introHighlight: "OMZ",
    introAfter:
      ") is a large multi-profile enterprise in Perm Krai manufacturing oilfield equipment, metal structures, and building structures for domestic and export markets. Products are certified to API requirements and supplied to Kazakhstan, Belarus, Brazil, Venezuela, Argentina, the USA, India, and other countries.",
    paragraph1:
      "Customers value the wide range, prompt delivery and unloading, and the company's focus on long-term cooperation.",
    videoCaption:
      "Production capacity of JSC OMZ: oilfield equipment and metal structures shops",
    productsHeading: "Main product lines",
    productsIntro:
      "JSC OMZ supplies Gazprom PJSC, Rosneft, Lukoil, Nornickel, and other companies. Organizations of any ownership form can order:",
    productsLeftTitle: "Oilfield equipment",
    productsLeftItems: [
      "pump rods and hinged pump rods",
      "polished rods and couplings",
      "centralizers and rod rotators",
      "auto-couplers and wellhead seals",
      "polished rod clamps",
    ],
    productsRightTitle: "Metal and building structures",
    productsRightItems: [
      "pipeline supports and masts",
      "building and facility metal structures",
      "piles, tanks, and reservoirs",
      "formwork elements and construction ladders",
      "custom products from drawings",
    ],
    paragraph2:
      "The product range is constantly expanding: auto-couplers, rod rotators, and centralizers have been introduced. We perform laser cutting and manufacture metal structures of varying complexity with air and airless spray paint for corrosion protection.",
    metalHeading: "Metal structures production",
    metalParagraph1:
      "In the metal structures area we use welding equipment certified by NAKS. Semi-automatic machines quickly join blanks of any complexity — customers receive strong supports, floodlight and antenna masts, and ladders for external and internal installation.",
    metalParagraph2:
      "We accept orders for non-standard shapes. We develop unique products with the plant's engineers and designers.",
    servicesHeading: "OMZ services",
    servicesIntro:
      "We manufacture parts according to customer specifications and drawings. Services include:",
    servicesLeftTitle: "Machining",
    servicesLeftItems: [
      "turning, milling, and boring",
      "CNC grinding",
      "laser cutting of sheet metal",
      "metal structure fabrication",
      "pump rod repair",
    ],
    servicesRightTitle: "Quality control",
    servicesRightItems: [
      "testing to GOST, TU, API 11B, API 5CT",
      "metal microstructure analysis",
      "steel chemical composition analysis",
      "impact bend testing",
      "in-process and acceptance QC inspection",
    ],
    servicesParagraph:
      "The wide service range is complemented by pump rod repair for oil production companies — returning expensive equipment to operation in the shortest time.",
    calloutTitle: "Need a consultation?",
    calloutBody:
      "Browse the product catalog or contact our specialists — we provide free consultation and full answers to your questions.",
  },
  zh: {
    h1: "奥cher机械制造厂——传统与创新",
    introBefore: "奥cher机械制造厂（",
    introHighlight: "OMZ",
    introAfter:
      "）是彼尔姆边疆区的大型多_profile企业，生产石油开采设备、金属结构和建筑结构，供应国内外市场。产品通过API认证，出口哈萨克斯坦、白俄罗斯、巴西、委内瑞拉、阿根廷、美国、印度等国。",
    paragraph1:
      "客户看重品种齐全、快速交货和卸货，以及公司长期合作的定位。",
    videoCaption: "奥cher机械制造厂生产能力：石油开采设备和金属结构车间",
    productsHeading: "主要产品类型",
    productsIntro:
      "奥cher机械制造厂为俄罗斯天然气工业股份公司、俄罗斯石油公司、卢克石油、诺里尔斯克镍业等供货。各类所有制企业均可订购：",
    productsLeftTitle: "石油开采设备",
    productsLeftItems: [
      "抽油杆和铰接抽油杆",
      "抛光杆和接箍",
      "扶正器和抽油杆旋转器",
      "自动耦合器和井口密封件",
      "抛光杆夹具",
    ],
    productsRightTitle: "金属和建筑结构",
    productsRightItems: [
      "管道支架和桅杆",
      "建筑和设施金属结构",
      "桩基、储罐和容器",
      "模板构件和建筑梯",
      "按图纸定制产品",
    ],
    paragraph2:
      "产品范围持续扩大：已掌握自动耦合器、抽油杆旋转器和扶正器。我们进行激光切割，制造不同复杂度的金属结构，并采用空气和无气喷涂防腐。",
    metalHeading: "金属结构生产",
    metalParagraph1:
      "金属结构工段使用经NAKS认证的焊接设备。半自动焊机可快速连接各种复杂毛坯——客户获得坚固的支架、投光灯和天线桅杆，以及室内外安装梯。",
    metalParagraph2:
      "我们接受非标形状订单，由工厂工程师和设计师开发独特产品。",
    servicesHeading: "OMZ服务",
    servicesIntro: "我们按客户技术任务和图纸制造零件。服务包括：",
    servicesLeftTitle: "机械加工",
    servicesLeftItems: [
      "车、铣、镗加工",
      "数控机床磨削",
      "金属板材激光切割",
      "金属结构制造",
      "抽油杆维修",
    ],
    servicesRightTitle: "质量控制",
    servicesRightItems: [
      "按GOST、TU、API 11B、API 5CT试验",
      "金属显微组织分析",
      "钢化学成分分析",
      "冲击弯曲试验",
      "过程检验和验收检验",
    ],
    servicesParagraph:
      "广泛的服务还包括为石油开采企业提供抽油杆维修——在最短时间内恢复昂贵设备运行。",
    calloutTitle: "需要咨询？",
    calloutBody:
      "浏览产品目录或联系我们的专家——我们提供免费咨询并全面解答您的问题。",
  },
};

export function getHomeAboutCopy(locale: SeedLocale): HomeAboutCopy {
  return homeAboutTranslations[locale];
}
