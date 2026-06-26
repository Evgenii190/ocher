import type { SeedLocale } from "./catalog";

export type AboutBottomCopy = {
  h1: string;
  introSegments: { text: string; bold?: boolean }[];
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

const ruAboutBottom: AboutBottomCopy = {
  h1: "Очёрский машиностроительный завод — вековые традиции и инновации",
  introSegments: [
    { text: "АО «Очёрский машиностроительный завод» — это " },
    { text: "крупнейшее в России многопрофильное предприятие,", bold: true },
    {
      text: " выпускающее нефтепромысловое оборудование ",
    },
    { text: "для внутреннего и зарубежного рынка.", bold: true },
    { text: " Наша продукция " },
    {
      text: "сертифицирована американским институтом нефти",
      bold: true,
    },
    {
      text: " и представлена в таких странах как ",
    },
    {
      text: "Казахстан, Беларусь, Бразилия, Венесуэла, Аргентина, США и Индия.",
      bold: true,
    },
    { text: " Покупателей привлекает " },
    {
      text: "широкий ассортимент, оперативная доставка и выгрузка, а также нацеленность компании на длительное сотрудничество.",
      bold: true,
    },
  ],
  paragraph1: "",
  videoCaption:
    "Производственные мощности АО «ОМЗ»: цеха нефтепромыслового оборудования и металлоконструкций",
  productsHeading: "Основные виды продукции",
  productsIntro:
    "Очёрский машиностроительный завод снабжает ПАО «Газпром», «Роснефть», компанию «Лукойл» и «Норильский никель». Предприятие любой формы собственности получает возможность заказать:",
  productsLeftTitle: "Нефтепромысловое оборудование",
  productsLeftItems: [
    "насосные штанги и шарнирные штанги",
    "полированные штоки и муфты",
    "центраторы и штанговращатели",
    "автосцепы и устьевые сальники",
    "зажимы полированных штоков",
  ],
  productsRightTitle: "Металло- и строительные конструкции",
  productsRightItems: [
    "опоры трубопроводов и мачты",
    "металлоконструкции зданий и сооружений",
    "сваи, ёмкости и резервуары",
    "элементы опалубки и строительные лестницы",
    "нестандартные изделия по чертежам",
  ],
  paragraph2:
    "Постоянно расширяется перечень продукции для удовлетворения потребностей клиентов: производим автосцепы, штанговращатели и центраторы. Выполняем лазерный раскрой материалов, изготавливаем металлические конструкции разной сложности, которые покрываем краской с помощью системы воздушного и безвоздушного распыления для продления срока эксплуатации, защиты от коррозии.",
  metalHeading: "Производство металлоконструкций",
  metalParagraph1:
    "На заводе по производству металлоконструкций используем сварочное оборудование, аттестованное в НАКС. Инновационные сварочные полуавтоматы позволяют быстро соединять заготовки любого уровня сложности — клиенты получают прочные опоры трубопроводов, прожекторные и антенные мачты, металлические лестницы для наружной и внутренней установки.",
  metalParagraph2:
    "Принимаем заказы на производство металлоконструкций нестандартной формы. Разрабатываем уникальные изделия в единственном экземпляре с привлечением квалифицированных инженеров и дизайнеров.",
  servicesHeading: "Какие услуги оказывает ОМЗ",
  servicesIntro:
    "Выпускаем детали по техническим заданиям и чертежам заказчиков. В перечень услуг входит:",
  servicesLeftTitle: "Механическая обработка",
  servicesLeftItems: [
    "токарные, фрезерные и расточные работы",
    "шлифование на станках с ЧПУ",
    "лазерный раскрой листового металла",
    "изготовление металлоконструкций",
    "ремонт насосных штанг",
  ],
  servicesRightTitle: "Контроль качества",
  servicesRightItems: [
    "испытания по ГОСТ, ТУ, API 11B, API 5CT",
    "исследование микроструктуры металла",
    "анализ химического состава стали",
    "испытания на ударный изгиб",
    "операционный и приёмочный контроль ОТК",
  ],
  servicesParagraph:
    "Мастера растачивают и шлифуют заготовки на высокоточных станках с программным управлением. Наличие лаборатории позволяет проводить испытания на соответствие ГОСТ, ТУ, API 11B, API 5CT. Наши специалисты исследуют микроструктуру металла, а аналитическая группа определяет химический состав стали. Проводим испытания на ударный изгиб, что очень важно при сборке конструкций для сложных условий эксплуатации. Широкий спектр услуг дополняется ремонтом насосных штанг, которые используют нефтедобывающие предприятия — гарантируем быстрое возвращение дорогостоящего оборудования в эксплуатацию.",
  calloutTitle: "Нужна консультация?",
  calloutBody:
    "Предлагаем частным и юридическим лицам более подробно ознакомиться с работой Очёрского машиностроительного завода. Если у вас остались вопросы, обращайтесь к нашим специалистам — предоставим бесплатную консультацию и ответим на ваши вопросы в полном объёме.",
};

export const aboutBottomTranslations: Record<SeedLocale, AboutBottomCopy> = {
  en: {
    h1: "Ocher Machine-Building Plant — centuries of tradition and innovation",
    introSegments: [
      { text: "JSC Ocher Machine-Building Plant is " },
      {
        text: "Russia's largest multi-profile enterprise,",
        bold: true,
      },
      { text: " manufacturing oilfield equipment " },
      { text: "for domestic and export markets.", bold: true },
      { text: " Our products are " },
      {
        text: "certified by the American Petroleum Institute",
        bold: true,
      },
      { text: " and supplied to " },
      {
        text: "Kazakhstan, Belarus, Brazil, Venezuela, Argentina, the USA, and India.",
        bold: true,
      },
      { text: " Customers value " },
      {
        text: "the wide range, prompt delivery and unloading, and the company's focus on long-term cooperation.",
        bold: true,
      },
    ],
    paragraph1: "",
    videoCaption:
      "Production capacity of JSC OMZ: oilfield equipment and metal structures shops",
    productsHeading: "Main product lines",
    productsIntro:
      "Ocher Machine-Building Plant supplies Gazprom PJSC, Rosneft, Lukoil, and Nornickel. Organizations of any ownership form can order:",
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
      "The product range is constantly expanding to meet customer needs: we manufacture auto-couplers, rod rotators, and centralizers. We perform laser cutting and manufacture metal structures of varying complexity with air and airless spray paint for corrosion protection and extended service life.",
    metalHeading: "Metal structures production",
    metalParagraph1:
      "In the metal structures area we use welding equipment certified by NAKS. Innovative semi-automatic welders quickly join blanks of any complexity — customers receive strong pipeline supports, floodlight and antenna masts, and ladders for external and internal installation.",
    metalParagraph2:
      "We accept orders for non-standard shapes and develop unique one-off products with qualified engineers and designers.",
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
      "Our specialists bore and grind blanks on high-precision CNC machines. An in-house laboratory enables testing to GOST, TU, API 11B, and API 5CT. We study metal microstructure and analyze steel composition. Impact bend testing is available for structures used in demanding conditions. Pump rod repair for oil production companies returns expensive equipment to operation quickly.",
    calloutTitle: "Need a consultation?",
    calloutBody:
      "We invite individuals and companies to learn more about Ocher Machine-Building Plant. If you have questions, contact our specialists — we provide free consultation and full answers.",
  },
  zh: {
    h1: "奥cher机械制造厂——百年传统与创新",
    introSegments: [
      { text: "奥cher机械制造厂是" },
      { text: "俄罗斯最大的多_profile企业，", bold: true },
      { text: "生产石油开采设备，" },
      { text: "供应国内外市场。", bold: true },
      { text: "产品" },
      { text: "通过美国石油学会认证", bold: true },
      { text: "，出口" },
      {
        text: "哈萨克斯坦、白俄罗斯、巴西、委内瑞拉、阿根廷、美国和印度。",
        bold: true,
      },
      { text: "客户看重" },
      {
        text: "品种齐全、快速交货和卸货，以及公司长期合作的定位。",
        bold: true,
      },
    ],
    paragraph1: "",
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
      "产品范围持续扩大以满足客户需求：生产自动耦合器、抽油杆旋转器和扶正器。我们进行激光切割，制造不同复杂度的金属结构，并采用空气和无气喷涂防腐以延长使用寿命。",
    metalHeading: "金属结构生产",
    metalParagraph1:
      "金属结构工段使用经NAKS认证的焊接设备。创新半自动焊机可快速连接各种复杂毛坯——客户获得坚固的管道支架、投光灯和天线桅杆，以及室内外安装梯。",
    metalParagraph2:
      "我们接受非标形状订单，由合格工程师和设计师开发独特的一次性产品。",
    servicesHeading: "OMZ提供的服务",
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
      "师傅们在高精度数控机床上镗孔和磨削毛坯。自有实验室可按GOST、TU、API 11B、API 5CT进行试验。专家研究金属显微组织，分析组确定钢化学成分。提供冲击弯曲试验，对复杂工况结构尤为重要。还为石油开采企业提供抽油杆维修，快速恢复昂贵设备运行。",
    calloutTitle: "需要咨询？",
    calloutBody:
      "欢迎个人和企业进一步了解奥cher机械制造厂。如有疑问，请联系我们的专家——我们提供免费咨询并全面解答。",
  },
};

export function getAboutBottomCopy(locale?: SeedLocale): AboutBottomCopy {
  if (locale) {
    return aboutBottomTranslations[locale];
  }
  return ruAboutBottom;
}
