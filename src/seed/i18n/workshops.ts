import type { WorkshopGlobalSlug } from "@/shared/lib/workshops.shared";
import type { SeedLocale } from "./catalog";

export type { WorkshopGlobalSlug };

type WorkshopSpecTranslation = { label: string; value: string };

type WorkshopEquipmentTranslation = {
  title: string;
  titleFull: string;
  description: string;
  descriptionLong: string;
  features: string[];
  specs: WorkshopSpecTranslation[];
};

type WorkshopAdvantageTranslation = {
  title: string;
  description: string;
};

type WorkshopStockItemTranslation = {
  title: string;
  value: string;
};

export type WorkshopTranslation = {
  heroDescription: string;
  about: {
    titleLine1: string;
    titleLine2: string;
    sectionHeading: string;
    paragraphs: string[];
    galleryAlts: string[];
  };
  stock?: {
    title: string;
    items: Record<string, WorkshopStockItemTranslation>;
  };
  advantages: Record<string, WorkshopAdvantageTranslation>;
  equipment: Record<string, WorkshopEquipmentTranslation>;
};

/** Keys for equipment, advantages, and stock items match Russian `title` from workshops-data.ts */
export const workshopTranslations: Record<
  SeedLocale,
  Record<WorkshopGlobalSlug, WorkshopTranslation>
> = {
  en: {
    "workshop-metal-structures": {
      heroDescription:
        "OMZ is a team that values hard work and supports professional growth. Join us!",
      about: {
        titleLine1: "In-house metal structures workshop",
        titleLine2: "on the OMZ plant site",
        sectionHeading: "Technology and quality control",
        paragraphs: [
          "The metal structures shop is equipped with laser and plasma cutting, CNC bending and rolling machines. This enables fabrication of complex-geometry parts with minimal metal waste and without excessive manual finishing.",
          "Multi-stage inspection applies at every step — from nesting to anti-corrosion treatment. Finished structures undergo surface preparation per GOST R ISO 8501-1-2014 and coating application with airless spray units.",
        ],
        galleryAlts: [
          "Production area of the metal structures workshop",
          "Welding operations in the metal structures workshop",
          "Equipment in the metal structures workshop",
        ],
      },
      stock: {
        title: "Consistently maintained warehouse stock",
        items: {
          "Винт стяжной": { title: "Tie screw", value: "290 lin. m" },
          "Гайки для винта стяжного": {
            title: "Tie screw nuts",
            value: "290 lin. m",
          },
          "Замок реечный": { title: "Toothed wedge lock", value: "290 lin. m" },
          "Замок клиновой": { title: "Wedge lock", value: "290 lin. m" },
        },
      },
      advantages: {
        "Передовое оснащение": {
          title: "Advanced equipment",
          description:
            "The laser cutting system receives jobs directly from the process card and helps reduce metal consumption. Plasma cutting equipment, a pipe beveling machine for various diameters, and CNC bending and rolling machines enable high-precision part production.",
        },
        "Коррозионностойкая продукция": {
          title: "Corrosion-resistant products",
          description:
            "Finished products are protected with modern coatings. Surfaces are prepared in shot-blasting chambers; paint materials are applied with airless spray units.",
        },
        "Неразрушающий контроль": {
          title: "Non-destructive testing",
          description:
            "Certified equipment and specialists are used for weld inspection. Experience in manufacturing cooling towers, span structures, masts, process buildings, and pipeline supports.",
        },
        "Мощные краны": {
          title: "Heavy-duty cranes",
          description:
            "The shop has 8 overhead cranes with a lifting capacity of up to 10 tonnes.",
        },
      },
      equipment: {
        "Лазерная резка листа": {
          title: "Sheet laser cutting",
          titleFull: "TRUMPF TruLaser 3030 fiber laser cutting system",
          description: "High-precision sheet metal nesting from process cards.",
          descriptionLong:
            "The TRUMPF TruLaser 3030 fiber laser cutting system is designed for high-precision nesting of sheet metal from process card data. The equipment delivers clean cuts without edge machining and minimal metal consumption through optimal nesting.\n\nThe CNC system receives jobs directly from engineering documentation, reducing production preparation time and eliminating manual input errors. Stable positioning accuracy enables fabrication of complex-geometry parts for load-bearing and enclosure structures.",
          features: [
            "Automatic job feed from the process card",
            "Minimal allowance and metal savings",
            "Clean edge without additional deburring",
          ],
          specs: [
            { label: "Sheet thickness", value: "Up to 25 mm" },
            { label: "Cutting accuracy", value: "±0.1 mm" },
          ],
        },
        "Плазменная резка": {
          title: "Plasma cutting",
          titleFull: "Hypertherm HPR260XD plasma cutting system",
          description:
            "Cutting of structural and stainless steels of increased thickness.",
          descriptionLong:
            "The Hypertherm HPR260XD plasma cutting system is used for nesting structural and stainless steels of increased thickness where laser cutting becomes economically impractical. The equipment provides stable processing speed and quality edges on thick plate.\n\nPlasma cutting is used for load-bearing element blanks, flanges, support plates, and parts with simple to medium geometry. Combined with subsequent machining and welding, it enables rapid launch of serial metal structure batches.",
          features: [
            "Cutting thick plate up to 40 mm",
            "High nesting speed on large batches",
            "Works with structural and stainless steel",
          ],
          specs: [
            { label: "Metal thickness", value: "Up to 40 mm" },
            { label: "Speed", value: "Up to 6 m/min" },
          ],
        },
        "Станок гибки с ЧПУ": {
          title: "CNC bending press",
          titleFull: "AMADA HFE 2204 press brake",
          description:
            "Sheet and profile bending for enclosure and load-bearing elements.",
          descriptionLong:
            "The AMADA HFE 2204 CNC press brake is designed for sheet and profile bending when manufacturing enclosure and load-bearing metal structure elements. Program control ensures repeatability of angles and dimensions on serial batches.\n\nThe machine is used for shells, brackets, panels, and complex spatial form elements. Automatic bend sequence calculation reduces setup time and lowers scrap on initial order runs.",
          features: [
            "Programmable bend sequence",
            "Angle repeatability on serial parts",
            "Bending sheet up to 4000 mm long",
          ],
          specs: [
            { label: "Bend length", value: "Up to 4000 mm" },
            { label: "Force", value: "320 t" },
          ],
        },
        "Вальцовочный станок": {
          title: "Plate rolling machine",
          titleFull: "DAVI MCA 3022 three-roll plate bending machine",
          description: "Forming cylindrical and conical shells.",
          descriptionLong:
            "The DAVI MCA 3022 three-roll plate bending machine is used for forming cylindrical and conical shells from sheet metal. The equipment is used when manufacturing housings, drums, nozzles, and process plant elements.\n\nHydraulic drive and precision roll alignment ensure uniform bend radius along the entire blank length. The machine handles thick plate and reduces the number of welds on the finished structure.",
          features: [
            "Forming cylinders and cones",
            "Working with sheet up to 50 mm thick",
            "Fewer welded joints",
          ],
          specs: [
            { label: "Thickness", value: "Up to 50 mm" },
            { label: "Width", value: "Up to 3000 mm" },
          ],
        },
      },
    },
    "workshop-oilfield-equipment": {
      heroDescription: "",
      about: {
        titleLine1: "In-house oilfield equipment workshop",
        titleLine2: "on the OMZ plant site",
        sectionHeading: "Quality and innovation",
        paragraphs: [
          "The plant applies advanced quality control methods and engineering solutions to manufacture highly reliable oilfield equipment. Every stage undergoes strict inspection for compliance with international standards.",
          "JSC Ocher Machine-Building Plant has the capacity to produce pump rods, polished rods, couplings, and related products — up to one million rods per year. Products are supplied to major fields across Russia and abroad.",
        ],
        galleryAlts: [
          "Production line of the oilfield equipment workshop",
          "Pump rod processing",
          "Quality control in the workshop",
        ],
      },
      advantages: {
        "Команда профессионалов": {
          title: "Team of professionals",
          description:
            "More than 300 highly qualified specialists work in the shop. Production lines are configured for serial and custom manufacture of products of any complexity.",
        },
        "Полный производственный цикл": {
          title: "Full production cycle",
          description:
            "From blank preparation and heat treatment to testing and marking — all operations are performed on the plant site without third-party contractors.",
        },
        "Соответствие API и ГОСТ": {
          title: "API and GOST compliance",
          description:
            "Products undergo incoming, in-process, and acceptance inspection. Compliance documentation and certificates are provided to the customer.",
        },
        "Логистика и сроки": {
          title: "Logistics and lead times",
          description:
            "A streamlined kitting and shipping system enables on-time delivery to remote fields.",
        },
      },
      equipment: {
        "Линия термообработки штанг": {
          title: "Rod heat treatment line",
          titleFull: "Automated pump rod quenching and tempering line",
          description:
            "Quenching and tempering of pump rods with mechanical property control.",
          descriptionLong:
            "The automated pump rod quenching and tempering line provides heat treatment with mechanical property control on every batch. The equipment is designed for serial production of oil industry products in compliance with API and GOST requirements.\n\nThe line includes heating, quenching, tempering zones, and automatic hardness control. Stable heat treatment modes ensure rod strength and service life under high-load field conditions.",
          features: [
            "Hardness and mechanical property control",
            "Serial capacity up to 1 million pcs/year",
            "Compliance with API and GOST requirements",
          ],
          specs: [
            { label: "Capacity", value: "Up to 1 million pcs/year" },
            { label: "Rod length", value: "7.6–11.6 m" },
          ],
        },
        "Станок резьбонарезной": {
          title: "Threading machine",
          titleFull: "Threading machine for API 16D rods",
          description:
            "API thread cutting on rods and couplings with automatic inspection.",
          descriptionLong:
            "The threading machine for API 16D rods performs thread cutting on pump rods and couplings with automatic control of geometric parameters. The equipment provides the accuracy class required for reliable connections in downhole assemblies.\n\nThe machine operates in the main production flow and reduces manual operations. Thread inspection on every part prevents non-conforming items from reaching finished goods and reduces customer acceptance claims.",
          features: [
            "Thread cutting per API standard",
            "Automatic parameter control",
            "6g accuracy class",
          ],
          specs: [
            { label: "Diameter", value: "16–32 mm" },
            { label: "Accuracy class", value: "6g" },
          ],
        },
        "Испытательный стенд": {
          title: "Test bench",
          titleFull: "Hydraulic test bench for rods and couplings",
          description: "Hydraulic and mechanical testing of finished products.",
          descriptionLong:
            "The hydraulic test bench is designed for testing pump rods, couplings, and related products under load. The equipment simulates operating modes and confirms strength characteristics before shipment to the customer.\n\nThe bench supports cyclic loading tests with recording of load parameters. Test results are included in the documentation package and used to confirm compliance with technical specifications and industry standards.",
          features: [
            "Testing under load up to 150 t",
            "Cyclic loading mode",
            "Reports for the documentation package",
          ],
          specs: [
            { label: "Load", value: "Up to 150 t" },
            { label: "Mode", value: "Cyclic" },
          ],
        },
      },
    },
    "workshop-building-structures": {
      heroDescription:
        "Manufacturing of formwork, construction ladders, and metal structures for monolithic construction.",
      about: {
        titleLine1: "In-house building structures workshop",
        titleLine2: "on the OMZ plant site",
        sectionHeading: "Solutions for construction",
        paragraphs: [
          "The shop produces formwork components, construction ladders, locks, tie screws, and other products for monolithic and industrial construction. Products are supplied to construction companies across Russia.",
          "Production is oriented toward serial batches and custom orders. Structures are made from steels with anti-corrosion treatment and marking per project documentation.",
        ],
        galleryAlts: [
          "Building structures production area",
          "Formwork element fabrication",
          "Finished products of the workshop",
        ],
      },
      advantages: {
        "Широкая номенклатура": {
          title: "Wide product range",
          description:
            "Tie screws, wedge and toothed locks, nuts, braces, props, and formwork elements — all in one shop.",
        },
        "Складской остаток": {
          title: "Warehouse stock",
          description:
            "We maintain a constant stock of fast-moving items for prompt shipment to construction sites.",
        },
        "Гибкость заказа": {
          title: "Order flexibility",
          description:
            "Fabrication per standard and custom drawings; batch kitting tailored to the project.",
        },
        "Контроль качества": {
          title: "Quality control",
          description:
            "Geometric dimensions and strength characteristics are verified on every batch.",
        },
      },
      equipment: {
        "Линия резки профиля": {
          title: "Profile cutting line",
          titleFull: "Automatic tube and profile cutting line for formwork",
          description:
            "Cutting tubes and profiles for formwork elements and frames.",
          descriptionLong:
            "The automatic tube and profile cutting line is used for blanks of formwork elements, construction ladders, and load-bearing frames. The equipment ensures accurate length and clean cuts, speeding up subsequent assembly and welding.\n\nThe line is designed for serial production of standard items and allows quick changeover for custom orders. Cutting follows the project bill of materials with minimal material waste.",
          features: [
            "Precise cutting per bill of materials",
            "Works with tube and profile up to 200×200 mm",
            "Blank preparation up to 12 m",
          ],
          specs: [
            { label: "Section", value: "Up to 200×200 mm" },
            { label: "Blank length", value: "Up to 12 m" },
          ],
        },
        "Сварочный участок": {
          title: "Welding bay",
          titleFull: "MIG/MAG assembly and welding bay for building structures",
          description:
            "Assembly and welding of load-bearing building structure elements.",
          descriptionLong:
            "The MIG/MAG assembly and welding bay is designed for manufacturing load-bearing building structure elements: props, braces, frames, and formwork nodes. Semi-automatic welding ensures stable weld quality on serial batches.\n\nThe bay is equipped with exhaust ventilation, fixtures for assembling standard nodes, and control templates. This maintains product geometry and reduces assembly time at the customer's site.",
          features: [
            "MIG/MAG welding up to 20 mm",
            "Assembly of standard formwork nodes",
            "Geometry control with templates",
          ],
          specs: [
            { label: "Welding type", value: "MIG/MAG" },
            { label: "Thickness", value: "Up to 20 mm" },
          ],
        },
        "Участок покраски": {
          title: "Coating bay",
          titleFull:
            "Preparation and painting line for building metal products",
          description:
            "Priming and painting of finished products for outdoor use.",
          descriptionLong:
            "The preparation and painting line for building metal products includes shot blasting, priming, and anti-corrosion coating application. The equipment is designed for outdoor use of products in construction.\n\nCoating is applied with airless spray units after surface preparation per standards. This extends the service life of formwork and metal structures in aggressive construction site conditions.",
          features: [
            "Shot-blast surface preparation",
            "Anti-corrosion coating",
            "Design service life from 5 years",
          ],
          specs: [
            { label: "Coating", value: "Anti-corrosion" },
            { label: "Service life", value: "From 5 years" },
          ],
        },
      },
    },
  },
  zh: {
    "workshop-metal-structures": {
      heroDescription: "OMZ是一个重视劳动并助力成长的团队。欢迎加入我们！",
      about: {
        titleLine1: "自有金属结构车间",
        titleLine2: "位于OMZ厂区",
        sectionHeading: "技术与质量控制",
        paragraphs: [
          "金属结构车间配备激光和等离子切割、数控折弯和卷板设备，可加工复杂几何形状零件，最大限度节约钢材并减少手工修整。",
          "从下料到防腐处理各阶段均实行多级检验。成品结构按 GOST R ISO 8501-1-2014 进行表面处理，并采用无气喷涂设备进行涂装。",
        ],
        galleryAlts: [
          "金属结构车间生产区域",
          "金属结构车间焊接作业",
          "金属结构车间设备",
        ],
      },
      stock: {
        title: "持续维护的仓库库存",
        items: {
          "Винт стяжной": { title: "对拉螺杆", value: "290 延米" },
          "Гайки для винта стяжного": {
            title: "对拉螺杆螺母",
            value: "290 延米",
          },
          "Замок реечный": { title: "棘轮式锁", value: "290 延米" },
          "Замок клиновой": { title: "楔形锁", value: "290 延米" },
        },
      },
      advantages: {
        "Передовое оснащение": {
          title: "先进设备",
          description:
            "激光切割设备可直接接收工艺卡任务，有助于降低钢材消耗。等离子切割设备、多种管径去毛刺机床以及数控折弯和卷板设备，可高精度生产各类零件。",
        },
        "Коррозионностойкая продукция": {
          title: "耐腐蚀产品",
          description:
            "成品采用现代涂层进行防腐保护。表面在抛丸室中处理，涂料由无气喷涂设备施加。",
        },
        "Неразрушающий контроль": {
          title: "无损检测",
          description:
            "采用认证设备和专业人员检测焊缝。具备冷却塔、跨间结构、桅杆、工艺厂房和管道支架的制造经验。",
        },
        "Мощные краны": {
          title: "重型起重机",
          description: "车间安装8台起重量达10吨的桥式起重机。",
        },
      },
      equipment: {
        "Лазерная резка листа": {
          title: "板材激光切割",
          titleFull: "TRUMPF TruLaser 3030 fiber 激光切割系统",
          description: "按工艺卡高精度下料板材。",
          descriptionLong:
            "TRUMPF TruLaser 3030 fiber 激光切割系统用于按工艺卡数据高精度下料板材。设备可在无需边缘机加工的情况下获得洁净切口，并通过优化排样最大限度节约钢材。\n\n数控系统直接接收工程文档任务，缩短生产准备时间并消除人工输入错误。稳定的定位精度可制造承重和壳体结构的复杂几何零件。",
          features: [
            "工艺卡自动下发任务",
            "最小余量，节约钢材",
            "切口洁净，无需额外去毛刺",
          ],
          specs: [
            { label: "板材厚度", value: "最大 25 mm" },
            { label: "切割精度", value: "±0.1 mm" },
          ],
        },
        "Плазменная резка": {
          title: "等离子切割",
          titleFull: "Hypertherm HPR260XD 等离子切割系统",
          description: "切割较厚结构钢和不锈钢。",
          descriptionLong:
            "Hypertherm HPR260XD 等离子切割系统用于下料较厚结构钢和不锈钢，适用于激光切割经济性不佳的场合。设备在厚板上提供稳定的加工速度和优质切口。\n\n等离子切割用于承重元件坯料、法兰、支撑板及简单至中等几何形状零件。配合后续机加工和焊接，可快速启动金属结构批量生产。",
          features: [
            "切割厚板最大 40 mm",
            "大批量下料速度快",
            "可加工结构钢和不锈钢",
          ],
          specs: [
            { label: "金属厚度", value: "最大 40 mm" },
            { label: "速度", value: "最大 6 m/min" },
          ],
        },
        "Станок гибки с ЧПУ": {
          title: "数控折弯机",
          titleFull: "AMADA HFE 2204 折弯压力机",
          description: "板材和型材折弯，用于壳体和承重元件。",
          descriptionLong:
            "AMADA HFE 2204 数控折弯压力机用于制造金属结构壳体和承重元件时的板材和型材折弯。程序控制确保批量生产中角度和尺寸的重复性。\n\n该设备用于制造外壳、支架、面板及复杂空间形状元件。自动计算折弯顺序可缩短调机时间并降低首批订单的废品率。",
          features: [
            "可编程折弯顺序",
            "批量零件角度重复性高",
            "折弯板长最大 4000 mm",
          ],
          specs: [
            { label: "折弯长度", value: "最大 4000 mm" },
            { label: "压力", value: "320 吨" },
          ],
        },
        "Вальцовочный станок": {
          title: "卷板机",
          titleFull: "DAVI MCA 3022 三辊卷板机",
          description: "卷制圆柱形和锥形壳体。",
          descriptionLong:
            "DAVI MCA 3022 三辊卷板机用于将板材卷制成圆柱形和锥形壳体，适用于制造壳体、滚筒、管嘴及工艺装置元件。\n\n液压驱动和精密辊系调整确保沿坯料全长均匀的弯曲半径。该设备可加工厚板并减少成品结构上的焊缝数量。",
          features: [
            "卷制圆柱和锥体",
            "可加工最大 50 mm 厚板材",
            "减少焊接接头数量",
          ],
          specs: [
            { label: "厚度", value: "最大 50 mm" },
            { label: "宽度", value: "最大 3000 mm" },
          ],
        },
      },
    },
    "workshop-oilfield-equipment": {
      heroDescription: "",
      about: {
        titleLine1: "自有石油开采设备车间",
        titleLine2: "位于OMZ厂区",
        sectionHeading: "质量与创新",
        paragraphs: [
          "工厂采用先进的质量控制方法和工艺方案，生产高可靠性石油开采设备。每个阶段均经严格检验，确保符合国际标准。",
          "奥切尔机械制造厂具备生产抽油杆、光杆、接箍及相关产品的能力，年产量可达一百万根抽油杆。产品供应俄罗斯及海外大型油田。",
        ],
        galleryAlts: ["石油开采设备车间生产线", "抽油杆加工", "车间质量控制"],
      },
      advantages: {
        "Команда профессионалов": {
          title: "专业团队",
          description:
            "车间拥有300余名高技能专业人员。生产线可配置为批量或定制生产任意复杂度的产品。",
        },
        "Полный производственный цикл": {
          title: "完整生产周期",
          description:
            "从坯料和热处理到试验和标记，所有工序均在厂区完成，无需外包。",
        },
        "Соответствие API и ГОСТ": {
          title: "符合 API 和 GOST",
          description:
            "产品经进货、工序和出厂检验。向客户提供符合性文件和证书。",
        },
        "Логистика и сроки": {
          title: "物流与交期",
          description: "完善的配货和发运体系可确保向偏远油田按时交货。",
        },
      },
      equipment: {
        "Линия термообработки штанг": {
          title: "抽油杆热处理线",
          titleFull: "抽油杆自动化淬火回火线",
          description: "抽油杆淬火回火并控制力学性能。",
          descriptionLong:
            "抽油杆自动化淬火回火线对每批产品进行热处理并控制力学性能。设备面向石油行业批量生产，符合 API 和 GOST 要求。\n\n生产线包括加热、淬火、回火区及自动硬度检测。稳定的热处理制度确保抽油杆在高负荷油田条件下的强度和使用寿命。",
          features: [
            "硬度和力学性能控制",
            "批量产能最大 100 万根/年",
            "符合 API 和 GOST 要求",
          ],
          specs: [
            { label: "产能", value: "最大 100 万根/年" },
            { label: "杆长", value: "7.6–11.6 m" },
          ],
        },
        "Станок резьбонарезной": {
          title: "螺纹加工机床",
          titleFull: "API 16D 抽油杆螺纹加工机床",
          description: "抽油杆和接箍 API 螺纹加工并自动检测。",
          descriptionLong:
            "API 16D 抽油杆螺纹加工机床对抽油杆和接箍进行螺纹加工，并自动控制几何参数。设备提供井下组合可靠连接所需的精度等级。\n\n机床融入主生产线，减少手工操作。对每件产品进行螺纹检测，防止不合格品流入成品并减少客户验收异议。",
          features: ["按 API 标准加工螺纹", "自动参数控制", "6g 精度等级"],
          specs: [
            { label: "直径", value: "16–32 mm" },
            { label: "精度等级", value: "6g" },
          ],
        },
        "Испытательный стенд": {
          title: "试验台",
          titleFull: "抽油杆和接箍液压试验台",
          description: "成品液压和机械试验。",
          descriptionLong:
            "液压试验台用于对抽油杆、接箍及相关产品在载荷下进行试验。设备模拟工况并确认强度特性，然后方可发运客户。\n\n试验台支持循环加载试验并记录载荷参数。试验结果纳入文件包，用于确认符合技术条件和行业标准。",
          features: ["最大 150 吨载荷试验", "循环加载模式", "提供文件包用报告"],
          specs: [
            { label: "载荷", value: "最大 150 吨" },
            { label: "模式", value: "循环" },
          ],
        },
      },
    },
    "workshop-building-structures": {
      heroDescription: "生产模板、建筑梯及用于现浇混凝土施工的金属结构。",
      about: {
        titleLine1: "自有建筑结构车间",
        titleLine2: "位于OMZ厂区",
        sectionHeading: "建筑解决方案",
        paragraphs: [
          "车间生产模板配件、建筑梯、锁具、对拉螺杆及其他用于现浇和工业建筑的产品，供应俄罗斯各地建筑公司。",
          "生产面向批量订单和非标定制。结构采用经防腐处理的钢材制造，并按项目文件进行标记。",
        ],
        galleryAlts: ["建筑结构生产区域", "模板元件制造", "车间成品"],
      },
      advantages: {
        "Широкая номенклатура": {
          title: "品种齐全",
          description:
            "对拉螺杆、楔形锁和棘轮锁、螺母、斜撑、支柱及模板元件——同一车间内一应俱全。",
        },
        "Складской остаток": {
          title: "仓库库存",
          description: "常备畅销品种，可快速发运至施工现场。",
        },
        "Гибкость заказа": {
          title: "订单灵活",
          description: "按标准图和定制图加工，按项目配套批次。",
        },
        "Контроль качества": {
          title: "质量控制",
          description: "每批产品均检验几何尺寸和强度特性。",
        },
      },
      equipment: {
        "Линия резки профиля": {
          title: "型材切割线",
          titleFull: "模板用管材和型材自动切割线",
          description: "切割模板元件和框架用管材和型材。",
          descriptionLong:
            "管材和型材自动切割线用于模板元件、建筑梯和承重框架坯料。设备确保精确长度和洁净切口，加快后续装配和焊接。\n\n该线适用于标准件批量生产，并可快速切换至定制订单。按项目清单下料，最大限度减少材料损耗。",
          features: [
            "按清单精确下料",
            "可加工最大 200×200 mm 管材和型材",
            "坯料长度最大 12 m",
          ],
          specs: [
            { label: "截面", value: "最大 200×200 mm" },
            { label: "坯料长度", value: "最大 12 m" },
          ],
        },
        "Сварочный участок": {
          title: "焊接工段",
          titleFull: "建筑结构 MIG/MAG 装配焊接工段",
          description: "建筑结构承重元件装配和焊接。",
          descriptionLong:
            "MIG/MAG 装配焊接工段用于制造建筑结构承重元件：支柱、斜撑、框架和模板节点。半自动焊接确保批量焊缝质量稳定。\n\n工段配备排风系统、标准节点装配夹具和检验样板，保证产品几何精度并缩短客户现场装配时间。",
          features: [
            "MIG/MAG 焊接最大 20 mm",
            "标准模板节点装配",
            "样板控制几何尺寸",
          ],
          specs: [
            { label: "焊接类型", value: "MIG/MAG" },
            { label: "厚度", value: "最大 20 mm" },
          ],
        },
        "Участок покраски": {
          title: "涂装工段",
          titleFull: "建筑金属制品准备与涂装线",
          description: "成品底漆和面漆，适用于室外使用。",
          descriptionLong:
            "建筑金属制品准备与涂装线包括抛丸、底漆和防腐涂层施工。设备面向建筑室外使用产品。\n\n表面按规范处理后，采用无气喷涂设备施涂涂层，延长模板和金属结构在恶劣施工条件下的使用寿命。",
          features: ["抛丸表面处理", "防腐涂层", "设计使用寿命不少于 5 年"],
          specs: [
            { label: "涂层", value: "防腐" },
            { label: "使用寿命", value: "不少于 5 年" },
          ],
        },
      },
    },
  },
};
