import type {
  ServiceContentBlock,
  ServiceSlug,
} from "@/shared/lib/services.shared";
import type { SeedLocale } from "./catalog";

export const servicesPageTranslations: Record<
  SeedLocale,
  { pageTitle: string; cardsSectionTitle: string }
> = {
  en: {
    pageTitle: "Services",
    cardsSectionTitle: "Services",
  },
  zh: {
    pageTitle: "服务",
    cardsSectionTitle: "服务",
  },
};

export const servicesBottomContentTranslations: Record<
  SeedLocale,
  { headings: string[]; paragraphs: string[]; bulletList?: string[] }
> = {
  en: {
    headings: [
      "OMZ plant services",
      "Pump rod repair",
      "Design documentation development",
      "Delivery services",
      "Laboratory testing",
      "Laser and abrasive waterjet cutting",
      "Calibrated steel round bar",
    ],
    paragraphs: [
      "JSC Ocher Machine-Building Plant offers a full range of services in the production and repair of oilfield equipment and metal structures, as well as laboratory testing of products, design documentation development, and delivery services.",
      "Our company guarantees the highest quality of execution and an individual approach to each client, ensuring reliability and efficiency at every stage of cooperation. We are ready to offer you the best solutions based on many years of experience and the professionalism of our specialists.",
      "We perform in-depth repair of pump rods using innovative technologies, including the radial-shift screw rolling method. We restore the functionality of worn rods, significantly improving their mechanical properties by creating a fine-grained metal structure. The results of in-depth repair are confirmed by numerous field trials, guaranteeing increased wear resistance and durability of the restored equipment.",
      "The plant's specialists, with high qualifications and experience in mechanical engineering, offer design documentation development services. Using advanced CAD systems, JSC Ocher Machine-Building Plant engineers perform comprehensive design and technical calculations. This achieves high precision and compliance with production requirements when developing metal structures and complex equipment for the oil and gas industry and other industrial sectors.",
      "We deliver products by both rail and road transport throughout Russia and beyond. Our own loading and unloading infrastructure and lifting equipment ensure prompt and safe transportation, guaranteeing cargo integrity at every stage of its journey.",
      "We conduct mechanical testing of metals, metallographic and chemical analyses to verify product compliance with GOST and API standards. Each product undergoes thorough testing, confirmed by quality certificates.",
      "Key laboratory tasks:",
      "Laser or abrasive waterjet cutting of metals of various thicknesses allows high-precision and efficient creation of parts with complex geometry. The process minimizes material waste and reduces processing time, improving production cost efficiency. Smooth part edges reduce the need for additional finishing, enhancing the quality of finished products.",
      "Calibrated steel round bar is produced with strict adherence to dimensions and surface quality. The range includes ready-made products and the option to manufacture items to individual customer specifications. This provides flexibility in selection and high quality of finished products.",
    ],
    bulletList: [
      "Mechanical testing of metals — determining the physical properties of materials under load",
      "Metallographic analyses — analyzing material structure to assess microstructural characteristics",
      "Chemical analysis of materials — precise determination of chemical composition to verify quality and specification compliance",
      "Additional certification tests — tests required for product certification under international and national standards",
    ],
  },
  zh: {
    headings: [
      "OMZ工厂服务",
      "抽油杆维修",
      "设计文件开发",
      "运输服务",
      "实验室检测",
      "激光与水射流切割",
      "校准圆钢",
    ],
    paragraphs: [
      "奥cher机械制造厂股份公司在石油开采设备与金属结构的生产和维修、产品实验室检测、设计文件开发及运输服务方面提供全面服务。",
      "公司保证最高执行质量，为每位客户提供个性化方案，在合作的每个阶段确保可靠与高效。我们凭借多年经验和专业人员的专业水平，随时准备为您提供最佳解决方案。",
      "我们采用创新技术（包括径向移位螺旋轧制法）对抽油杆进行深度维修，恢复磨损抽油杆的功能，通过形成细晶粒金属结构显著改善其机械性能。深度维修效果经大量现场工业试验验证，保证修复设备更高的耐磨性和使用寿命。",
      "工厂拥有高资质和机械制造经验的专业人员，提供设计文件开发服务。工程师使用先进CAD系统进行全面设计和技术计算，在开发石油天然气行业及其他工业领域的金属结构和复杂设备时达到高精度并符合生产要求。",
      "我们通过铁路和公路运输在俄罗斯全境及境外配送产品。自有装卸基础设施和起重设备确保运输快捷安全，在货物全程运输中保证完好。",
      "我们进行金属力学试验、金相和化学分析，以验证产品符合GOST和API标准。每件产品均经严格检测，并有质量证书为证。",
      "实验室主要任务：",
      "激光或水射流切割不同厚度金属，可高精度高效制造复杂几何形状零件。该工艺减少材料浪费、缩短加工时间，提高生产经济效益。零件边缘光滑，减少后续精加工需求，提升成品质量。",
      "校准圆钢严格按尺寸和表面质量生产。产品系列包括现货及按客户个别规格定制。选择灵活，成品质量高。",
    ],
    bulletList: [
      "金属力学试验——测定材料在载荷下的物理性能",
      "金相分析——分析材料结构以评估显微组织特征",
      "材料化学分析——精确测定化学成分以验证质量及规格符合性",
      "附加认证试验——按国际和国家标准进行产品认证所需的试验",
    ],
  },
};

export const serviceTranslations: Record<
  SeedLocale,
  Record<
    ServiceSlug,
    {
      title: string;
      description: string;
      heroTitle: string;
      heroDescription: string;
      advantages?: string[];
      specs?: { label: string; value: string }[];
      sliderAlts?: string[];
      secondarySliderAlts?: string[];
      contentBlocks: ServiceContentBlock[];
    }
  >
> = {
  en: {
    "pump-rods-repair": {
      title: "Pump rod repair",
      description:
        "Restoration of pump rod geometry and operational characteristics using modern equipment",
      heroTitle: "Pump rod repair",
      heroDescription:
        "We perform in-depth repair of pump rods using innovative technologies, including the radial-shift screw rolling method.",
      advantages: [
        "Straightening and geometry restoration",
        "Parameter control and testing",
        "Quality guarantee",
      ],
      sliderAlts: [
        "Pump rod repair shop",
        "Pump rods after restoration",
        "Rod quality control in the laboratory",
        "OMZ metal structure testing",
      ],
      secondarySliderAlts: [
        "Metal processing at OMZ plant",
        "Metal rolling and calibration",
        "Equipment design documentation",
        "Oilfield equipment design",
      ],
      contentBlocks: [
        { type: "slider", slidesKey: "primary" },
        { type: "heading", text: "Pump rod restoration technologies" },
        {
          type: "paragraph",
          text: "JSC Ocher Machine-Building Plant performs in-depth repair of pump rods for oil and gas production companies. Restoration is carried out using the radial-shift screw rolling method, which forms a hardened surface layer and improves the fatigue strength of the part.",
        },
        {
          type: "paragraph",
          text: "The process includes wear diagnostics, geometry straightening, mechanical processing, and final parameter control. Repaired rods return to operation with characteristics confirmed by field trials at customer sites.",
        },
        {
          type: "paragraph",
          text: "Pump rod repair at OMZ significantly reduces well downtime and lowers the cost of purchasing new components. The plant works with Russia's largest oil and gas companies and ensures stable order fulfillment timelines.",
        },
        {
          type: "callout",
          callout: {
            variant: "primary",
            title: "Why choose OMZ",
            body: "Many years of experience in manufacturing and repairing oilfield equipment, an in-house quality control laboratory, and product certification to API requirements.",
          },
        },
        { type: "heading", text: "Repair stages", tag: "h3" },
        {
          type: "bulletList",
          items: [
            "Acceptance and visual inspection of rods, defect recording and geometry measurement",
            "Straightening and restoration of linearity on specialized equipment",
            "Radial-shift screw rolling for surface hardening",
            "Mechanical processing of seating zones and threaded sections",
            "Laboratory control and quality certificate preparation",
          ],
        },
        {
          type: "twoColumns",
          columns: {
            leftTitle: "Controlled parameters",
            leftItems: [
              "Linearity and runout",
              "Diameter and ovality",
              "Thread and seating condition",
              "Surface layer hardness",
            ],
            rightTitle: "Applications",
            rightItems: [
              "Rod pump installations",
              "Oil and associated gas production",
              "Field repair inventory",
              "Replacement of worn components",
            ],
          },
        },
        { type: "slider", slidesKey: "secondary" },
        {
          type: "paragraph",
          text: "Plant specialists advise customers on selecting the optimal restoration program based on operating conditions, media aggressiveness, and load cycles. When necessary, an individual process route is developed.",
        },
        {
          type: "paragraph",
          text: "To request pump rod repair, contact the JSC OMZ sales department — managers will clarify batch volume, timelines, and delivery terms for repaired products to the site.",
        },
      ],
    },
    "laser-cutting": {
      title: "Laser metal cutting",
      description:
        "High-precision laser cutting of sheet metal of any complexity on modern equipment",
      heroTitle: "Laser and abrasive waterjet cutting",
      heroDescription:
        "Laser or abrasive waterjet cutting of metals of various thicknesses allows high-precision and efficient creation of parts with complex geometry.",
      advantages: [
        "High cutting precision",
        "Complex contours and shapes",
        "Minimal heat-affected zone",
      ],
      sliderAlts: [
        "Laser cutting of sheet metal",
        "Metal processing on a laser cutting machine",
        "Blanks after metal processing",
        "OMZ metal product range",
      ],
      secondarySliderAlts: [
        "OMZ production shop",
        "Metal structure quality control",
        "Plant design bureau",
        "Drawing and specification development",
      ],
      contentBlocks: [
        { type: "slider", slidesKey: "primary" },
        { type: "heading", text: "Laser and abrasive waterjet cutting at OMZ" },
        {
          type: "paragraph",
          text: "The metal processing shop of JSC Ocher Machine-Building Plant performs laser and abrasive waterjet cutting of sheet metal and blanks for in-house production and external customers. The technology ensures high contour precision and a minimal heat-affected zone in the material.",
        },
        {
          type: "paragraph",
          text: "Laser cutting is used to manufacture parts of complex configuration: from metal structure elements to oilfield equipment components. Abrasive waterjet cutting is used where it is important to exclude metal heating and preserve material structure.",
        },
        {
          type: "paragraph",
          text: "The plant has modern equipment and qualified personnel, enabling processing of orders of various volumes — from single parts to serial batches.",
        },
        {
          type: "twoColumns",
          columns: {
            leftTitle: "Advantages of laser cutting",
            leftItems: [
              "Positioning accuracy and repeatability",
              "Minimal allowances and material waste",
              "Clean cut without burrs",
              "High processing speed",
            ],
            rightTitle: "Processed materials",
            rightItems: [
              "Structural and stainless steels",
              "Sheet metal of various thicknesses",
              "Blanks for metal structures",
              "Parts per customer drawings",
            ],
          },
        },
        {
          type: "callout",
          callout: {
            variant: "blue",
            title: "Comprehensive approach",
            body: "Cutting can be performed as a standalone service or as part of a full cycle: design, nesting, welding, mechanical processing, and quality control at a single OMZ site.",
          },
        },
        { type: "heading", text: "Production applications", tag: "h3" },
        {
          type: "bulletList",
          items: [
            "Sheet nesting for metal structures and construction products",
            "Manufacturing of oilfield equipment parts",
            "Cutting holes and complex contours",
            "Preparing blanks for welding and assembly",
          ],
        },
        { type: "slider", slidesKey: "secondary" },
        {
          type: "paragraph",
          text: "To calculate cost and timelines, provide part drawings or sketches in DXF, DWG, or PDF format. Plant engineers will help optimize nesting and select the processing technology.",
        },
        {
          type: "paragraph",
          text: "JSC OMZ guarantees compliance with tolerances specified in design documentation and conducts incoming material inspection before production launch.",
        },
      ],
    },
    "calibrated-round": {
      title: "Calibrated steel round bar",
      description:
        "Production of calibrated round bar with strict adherence to dimensions and surface quality",
      heroTitle: "Calibrated steel round bar",
      heroDescription:
        "Calibrated steel round bar is produced with strict adherence to dimensions and surface quality for a wide range of industrial applications.",
      specs: [
        { label: "Diameter", value: "from 10 to 100 mm" },
        { label: "Tolerance class", value: "h11" },
        { label: "Length", value: "up to 6000 mm" },
      ],
      sliderAlts: [
        "Calibrated round bar production",
        "Calibrated steel round bar range",
        "OMZ metal warehouse",
        "Blank metal processing",
      ],
      secondarySliderAlts: [
        "Metal products for oil production",
        "Laboratory metal control",
        "Rolled product testing",
        "Specifications and documentation",
      ],
      contentBlocks: [
        { type: "slider", slidesKey: "primary" },
        {
          type: "heading",
          text: "Calibrated steel round bar from the manufacturer",
        },
        {
          type: "paragraph",
          text: "JSC Ocher Machine-Building Plant produces calibrated steel round bar for mechanical engineering, the oil and gas industry, and metal structures. Products are manufactured with strict adherence to diameter, tolerance class, and surface quality requirements.",
        },
        {
          type: "paragraph",
          text: "Calibrated round bar is used to manufacture shafts, axles, rods, embedded parts, and other elements where geometric precision and batch size stability are important. The plant supplies both from finished product stock and to individual specifications.",
        },
        {
          type: "paragraph",
          text: "OMZ metallurgical and mechanical shops enable quality control at all stages — from incoming raw material inspection to final acceptance of finished rolled products.",
        },
        {
          type: "callout",
          callout: {
            variant: "green",
            title: "Range and precision",
            body: "Diameter from 10 to 100 mm, tolerance class h11, length up to 6000 mm. Custom manufacturing per customer drawings with steel grade and heat treatment specification is available.",
          },
        },
        {
          type: "twoColumns",
          columns: {
            leftTitle: "Technical specifications",
            leftItems: [
              "Diameter: from 10 to 100 mm",
              "Tolerance class: h11",
              "Length: up to 6000 mm",
              "Geometry and surface control",
            ],
            rightTitle: "Applications",
            rightItems: [
              "Mechanical engineering and metal processing",
              "Oilfield equipment",
              "Metal structures and supports",
              "Repair and production inventory",
            ],
          },
        },
        { type: "heading", text: "Quality control", tag: "h3" },
        {
          type: "bulletList",
          items: [
            "Incoming inspection of rolled products and material certificates",
            "Diameter and ovality measurement for each batch",
            "Visual surface and packaging inspection",
            "Quality documentation preparation for shipment",
          ],
        },
        { type: "slider", slidesKey: "secondary" },
        {
          type: "paragraph",
          text: "To select the product range and calculate delivery volume, contact the sales department. Managers will clarify steel grade, diameter, length, and delivery terms to the site.",
        },
        {
          type: "paragraph",
          text: "OMZ supplies metal products to oil and gas sector enterprises, construction organizations, and industrial customers throughout Russia using its own logistics infrastructure.",
        },
      ],
    },
    "laboratory-testing": {
      title: "Laboratory testing",
      description:
        "Mechanical testing of metals, metallographic and chemical analyses to verify product compliance with GOST and API standards",
      heroTitle: "Laboratory testing",
      heroDescription:
        "We conduct mechanical testing of metals, metallographic and chemical analyses to verify product compliance with GOST and API standards.",
      sliderAlts: [
        "OMZ testing laboratory",
        "Mechanical metal testing",
        "Oilfield equipment inspection",
        "Product samples for testing",
      ],
      secondarySliderAlts: [
        "Rolled product control",
        "Rolled products before shipment",
        "Part inspection after processing",
        "Certification support",
      ],
      contentBlocks: [
        { type: "slider", slidesKey: "primary" },
        { type: "heading", text: "OMZ quality control laboratory" },
        {
          type: "paragraph",
          text: "The laboratory of JSC Ocher Machine-Building Plant conducts a comprehensive set of metal and finished product tests to confirm compliance with GOST, industry standards, and API specifications. Quality control is an integral part of the production cycle at all plant shops.",
        },
        {
          type: "paragraph",
          text: "Tests are performed on samples and serial products: pump rods, metal structures, rolled products, and oilfield equipment components. Results are documented in protocols and used for certification and customer shipment.",
        },
        {
          type: "paragraph",
          text: "The laboratory is equipped for mechanical, metallographic, and chemical research. Plant specialists have experience working with the requirements of Russia's largest oil and gas companies.",
        },
        {
          type: "heading",
          text: "Main testing areas",
          tag: "h3",
        },
        {
          type: "bulletList",
          items: [
            "Mechanical testing — determining tensile strength, yield strength, and impact toughness",
            "Metallographic analyses — assessing microstructure and inclusions",
            "Chemical analysis — controlling steel and alloy composition",
            "Additional tests for API and GOST certification",
          ],
        },
        {
          type: "twoColumns",
          columns: {
            leftTitle: "What we test",
            leftItems: [
              "Mechanical properties of metal",
              "Microstructure and defects",
              "Material chemical composition",
              "Compliance with certificate data",
            ],
            rightTitle: "Result documents",
            rightItems: [
              "Test protocols",
              "Quality certificates",
              "Laboratory reports",
              "Data for API certification",
            ],
          },
        },
        {
          type: "callout",
          callout: {
            variant: "primary",
            title: "Product certification",
            body: "Each batch of OMZ products undergoes thorough testing. Quality certificates confirm that products meet customer requirements and applicable standards.",
          },
        },
        { type: "slider", slidesKey: "secondary" },
        {
          type: "paragraph",
          text: "Laboratory services are available both for the plant's own products and for external customers when quality confirmation of materials and products is required.",
        },
        {
          type: "paragraph",
          text: "To agree on a testing program and timelines, contact the OMZ quality department or sales department.",
        },
      ],
    },
    "design-documentation": {
      title: "Design documentation development",
      description:
        "Design of metal structures and complex equipment using advanced CAD systems",
      heroTitle: "Design documentation development",
      heroDescription:
        "Plant specialists offer design documentation development services using advanced CAD systems.",
      specs: [
        {
          label: "Documentation format",
          value: "3D models, drawings, specifications",
        },
        { label: "CAD", value: "KOMPAS-3D, SolidWorks" },
      ],
      advantages: [
        "Comprehensive design",
        "Technical calculations",
        "Production support",
      ],
      sliderAlts: [
        "Design engineering at OMZ",
        "Drawing and 3D model development",
        "Production preparation per design docs",
        "Part manufacturing per project",
      ],
      secondarySliderAlts: [
        "Oilfield equipment design",
        "Metal structures and rolled products",
        "Product testing support",
        "Project compliance control",
      ],
      contentBlocks: [
        { type: "slider", slidesKey: "primary" },
        { type: "heading", text: "OMZ design bureau" },
        {
          type: "paragraph",
          text: "Engineers of JSC Ocher Machine-Building Plant develop design documentation for metal structures, oilfield equipment, and process products. Design is carried out in modern CAD systems KOMPAS-3D and SolidWorks with consideration of production and operating requirements.",
        },
        {
          type: "paragraph",
          text: "Design support covers the full cycle: from technical specification and conceptual design to working documentation, specifications, and manufacturing support at the plant site.",
        },
        {
          type: "paragraph",
          text: "Experience in designing for the oil and gas industry allows accounting for field operating specifics, reliability requirements, and equipment maintainability.",
        },
        {
          type: "twoColumns",
          columns: {
            leftTitle: "What we develop",
            leftItems: [
              "3D models and assembly drawings",
              "Specifications and bill of materials",
              "Part and assembly drawings",
              "Process documentation",
            ],
            rightTitle: "CAD and calculations",
            rightItems: [
              "KOMPAS-3D, SolidWorks",
              "Strength calculations",
              "Material and coating selection",
              "Adaptation to OMZ production capacity",
            ],
          },
        },
        {
          type: "callout",
          callout: {
            variant: "muted",
            title: "From project to series",
            body: "Documentation can be prepared for a single product or serial production with subsequent support for changes and drawing updates.",
          },
        },
        { type: "heading", text: "Customer engagement stages", tag: "h3" },
        {
          type: "bulletList",
          items: [
            "Analysis of technical specification and input data",
            "Conceptual and technical design development",
            "Working design documentation preparation",
            "Coordination with customer and production departments",
            "Manufacturing and acceptance testing support",
          ],
        },
        { type: "slider", slidesKey: "secondary" },
        {
          type: "paragraph",
          text: "The customer receives a documentation package in agreed formats to launch production at OMZ or transfer to other sites. When necessary, engineers participate in author supervision and design refinement based on test results.",
        },
        {
          type: "paragraph",
          text: "To discuss the scope of design work and documentation preparation timelines, send a technical specification or product description to the JSC Ocher Machine-Building Plant sales department.",
        },
      ],
    },
  },
  zh: {
    "pump-rods-repair": {
      title: "抽油杆维修",
      description: "采用现代设备恢复抽油杆几何形状和使用性能",
      heroTitle: "抽油杆维修",
      heroDescription:
        "我们采用创新技术（包括径向移位螺旋轧制法）对抽油杆进行深度维修。",
      advantages: ["矫直与几何恢复", "参数检测与试验", "质量保证"],
      sliderAlts: [
        "抽油杆维修工段",
        "修复后的抽油杆",
        "实验室抽油杆质量检测",
        "OMZ金属结构试验",
      ],
      secondarySliderAlts: [
        "OMZ工厂金属加工",
        "金属轧制与校准",
        "设备设计文件",
        "石油开采设备设计",
      ],
      contentBlocks: [
        { type: "slider", slidesKey: "primary" },
        { type: "heading", text: "抽油杆修复技术" },
        {
          type: "paragraph",
          text: "奥cher机械制造厂股份公司为石油天然气开采企业提供抽油杆深度维修。修复采用径向移位螺旋轧制法，形成强化表层并提高零件疲劳强度。",
        },
        {
          type: "paragraph",
          text: "流程包括磨损诊断、几何矫直、机械加工和最终参数检测。修复后的抽油杆经客户油田现场工业试验验证后重新投入使用。",
        },
        {
          type: "paragraph",
          text: "在OMZ进行抽油杆维修可大幅缩短油井停井时间，降低新购配件成本。工厂与俄罗斯主要油气公司合作，保证订单交付周期稳定。",
        },
        {
          type: "callout",
          callout: {
            variant: "primary",
            title: "为何选择OMZ",
            body: "多年石油开采设备制造与维修经验、自有质量检测实验室，以及符合API要求的产品认证。",
          },
        },
        { type: "heading", text: "维修阶段", tag: "h3" },
        {
          type: "bulletList",
          items: [
            "接收与外观检查，记录缺陷并测量几何尺寸",
            "在专用设备上矫直并恢复直线度",
            "径向移位螺旋轧制进行表面强化",
            "配合区与螺纹段机械加工",
            "实验室检测并出具质量证书",
          ],
        },
        {
          type: "twoColumns",
          columns: {
            leftTitle: "检测参数",
            leftItems: [
              "直线度与跳动",
              "直径与椭圆度",
              "螺纹与配合面状态",
              "表层硬度",
            ],
            rightTitle: "应用领域",
            rightItems: [
              "抽油机装置",
              "石油与伴生气开采",
              "油田维修储备",
              "更换磨损配件",
            ],
          },
        },
        { type: "slider", slidesKey: "secondary" },
        {
          type: "paragraph",
          text: "工厂专家根据使用条件、介质腐蚀性和载荷循环，为客户提供最优修复方案咨询。必要时制定个别工艺路线。",
        },
        {
          type: "paragraph",
          text: "如需申请抽油杆维修，请联系OMZ股份公司销售部——经理将确认批量、工期及修复产品运至现场的交付条件。",
        },
      ],
    },
    "laser-cutting": {
      title: "激光金属切割",
      description: "在现代设备上进行任意复杂度的薄板金属高精度激光切割",
      heroTitle: "激光与水射流切割",
      heroDescription:
        "激光或水射流切割不同厚度金属，可高精度高效制造复杂几何形状零件。",
      advantages: ["切割精度高", "复杂轮廓与形状", "热影响区最小"],
      sliderAlts: [
        "薄板金属激光切割",
        "激光切割机金属加工",
        "金属加工后的毛坯",
        "OMZ金属产品系列",
      ],
      secondarySliderAlts: [
        "OMZ生产车间",
        "金属结构质量检测",
        "工厂设计局",
        "图纸与规格编制",
      ],
      contentBlocks: [
        { type: "slider", slidesKey: "primary" },
        { type: "heading", text: "OMZ激光与水射流切割" },
        {
          type: "paragraph",
          text: "奥cher机械制造厂股份公司金属加工车间为自有生产及外部客户提供薄板金属和毛坯的激光及水射流切割。该技术保证轮廓精度高、材料热影响区小。",
        },
        {
          type: "paragraph",
          text: "激光切割用于制造复杂形状零件：从金属结构元件到石油开采设备配件。水射流切割用于须避免金属加热、保持材料结构的场合。",
        },
        {
          type: "paragraph",
          text: "工厂拥有现代设备和合格人员，可处理从单件到批量等不同规模的订单。",
        },
        {
          type: "twoColumns",
          columns: {
            leftTitle: "激光切割优势",
            leftItems: [
              "定位精度与重复性",
              "余量与废料最小",
              "切口无毛刺",
              "加工速度快",
            ],
            rightTitle: "加工材料",
            rightItems: [
              "结构钢与不锈钢",
              "不同厚度薄板",
              "金属结构毛坯",
              "按客户图纸的零件",
            ],
          },
        },
        {
          type: "callout",
          callout: {
            variant: "blue",
            title: "综合方案",
            body: "切割可作为独立服务，或纳入完整周期：设计、排料、焊接、机加工及OMZ同一厂区的质量检测。",
          },
        },
        { type: "heading", text: "生产应用", tag: "h3" },
        {
          type: "bulletList",
          items: [
            "金属结构与建筑制品薄板排料",
            "石油开采设备零件制造",
            "复杂形状孔洞与轮廓切割",
            "焊接与装配前毛坯准备",
          ],
        },
        { type: "slider", slidesKey: "secondary" },
        {
          type: "paragraph",
          text: "如需核算成本与工期，请提供DXF、DWG或PDF格式的零件图纸或草图。工厂工程师将协助优化排料并选择加工工艺。",
        },
        {
          type: "paragraph",
          text: "OMZ股份公司保证符合设计文件规定的公差，并在投产前进行材料入厂检验。",
        },
      ],
    },
    "calibrated-round": {
      title: "校准圆钢",
      description: "严格按尺寸和表面质量生产校准圆钢",
      heroTitle: "校准圆钢",
      heroDescription: "校准圆钢严格按尺寸和表面质量生产，适用于多种工业用途。",
      specs: [
        { label: "直径", value: "10至100 mm" },
        { label: "精度等级", value: "h11" },
        { label: "长度", value: "最长6000 mm" },
      ],
      sliderAlts: [
        "校准圆钢生产",
        "校准圆钢品种",
        "OMZ金属仓库",
        "毛坯金属加工",
      ],
      secondarySliderAlts: [
        "石油开采用金属产品",
        "金属实验室检测",
        "轧材试验",
        "规格与文件",
      ],
      contentBlocks: [
        { type: "slider", slidesKey: "primary" },
        { type: "heading", text: "制造商校准圆钢" },
        {
          type: "paragraph",
          text: "奥cher机械制造厂股份公司生产适用于机械制造、石油天然气和金属结构的校准圆钢。产品严格符合直径、精度等级和表面质量要求。",
        },
        {
          type: "paragraph",
          text: "校准圆钢用于制造轴、销、杆、预埋件及其他对几何精度和批次尺寸稳定性要求高的元件。工厂既供应现货，也按个别规格定制。",
        },
        {
          type: "paragraph",
          text: "OMZ冶金与机械车间可在各阶段进行质量控制——从原材料入厂检验到成品轧材最终验收。",
        },
        {
          type: "callout",
          callout: {
            variant: "green",
            title: "品种与精度",
            body: "直径10至100 mm，精度等级h11，长度最长6000 mm。可按客户图纸定制，并明确钢号与热处理制度。",
          },
        },
        {
          type: "twoColumns",
          columns: {
            leftTitle: "技术参数",
            leftItems: [
              "直径：10至100 mm",
              "精度等级：h11",
              "长度：最长6000 mm",
              "几何与表面检测",
            ],
            rightTitle: "应用领域",
            rightItems: [
              "机械制造与金属加工",
              "石油开采设备",
              "金属结构与支架",
              "维修与生产储备",
            ],
          },
        },
        { type: "heading", text: "质量控制", tag: "h3" },
        {
          type: "bulletList",
          items: [
            "轧材及材料证书入厂检验",
            "每批直径与椭圆度测量",
            "表面与包装外观检查",
            "发货质量文件编制",
          ],
        },
        { type: "slider", slidesKey: "secondary" },
        {
          type: "paragraph",
          text: "如需选型并计算供货量，请联系销售部。经理将确认钢号、直径、长度及运至现场的交付条件。",
        },
        {
          type: "paragraph",
          text: "OMZ借助自有物流基础设施，向俄罗斯全境石油天然气、建筑及工业客户供应金属产品。",
        },
      ],
    },
    "laboratory-testing": {
      title: "实验室检测",
      description: "金属力学试验、金相和化学分析，验证产品符合GOST和API标准",
      heroTitle: "实验室检测",
      heroDescription:
        "我们进行金属力学试验、金相和化学分析，以验证产品符合GOST和API标准。",
      sliderAlts: [
        "OMZ检测实验室",
        "金属力学试验",
        "石油开采设备检测",
        "检测用产品样品",
      ],
      secondarySliderAlts: [
        "轧材检测",
        "发货前轧材",
        "加工后零件检测",
        "认证支持",
      ],
      contentBlocks: [
        { type: "slider", slidesKey: "primary" },
        { type: "heading", text: "OMZ质量检测实验室" },
        {
          type: "paragraph",
          text: "奥cher机械制造厂股份公司实验室对金属和成品进行综合检测，以确认符合GOST、行业标准及API规格。质量检测是工厂各车间生产周期中不可或缺的环节。",
        },
        {
          type: "paragraph",
          text: "检测针对样品及批量产品：抽油杆、金属结构、轧材及石油开采设备配件。结果形成报告，用于认证及向客户发货。",
        },
        {
          type: "paragraph",
          text: "实验室配备力学、金相和化学研究设备。工厂专业人员熟悉俄罗斯主要油气公司的要求。",
        },
        {
          type: "heading",
          text: "主要检测方向",
          tag: "h3",
        },
        {
          type: "bulletList",
          items: [
            "力学试验——测定抗拉强度、屈服强度和冲击韧性",
            "金相分析——评估显微组织和夹杂物",
            "化学分析——控制钢及合金成分",
            "API与GOST认证附加试验",
          ],
        },
        {
          type: "twoColumns",
          columns: {
            leftTitle: "检测内容",
            leftItems: [
              "金属力学性能",
              "显微组织与缺陷",
              "材料化学成分",
              "与证书数据符合性",
            ],
            rightTitle: "结果文件",
            rightItems: ["试验报告", "质量证书", "实验室结论", "API认证数据"],
          },
        },
        {
          type: "callout",
          callout: {
            variant: "primary",
            title: "产品认证",
            body: "OMZ每批产品均经严格检测。质量证书确认产品符合客户要求及现行标准。",
          },
        },
        { type: "slider", slidesKey: "secondary" },
        {
          type: "paragraph",
          text: "实验室服务既面向工厂自有产品，也面向需要确认材料及制品质量的外部客户。",
        },
        {
          type: "paragraph",
          text: "如需商定检测方案与工期，请联系OMZ质量部或销售部。",
        },
      ],
    },
    "design-documentation": {
      title: "设计文件开发",
      description: "采用先进CAD系统设计金属结构和复杂设备",
      heroTitle: "设计文件开发",
      heroDescription: "工厂专业人员采用先进CAD系统提供设计文件开发服务。",
      specs: [
        { label: "文件格式", value: "三维模型、图纸、规格书" },
        { label: "CAD", value: "KOMPAS-3D、SolidWorks" },
      ],
      advantages: ["全面设计", "技术计算", "生产支持"],
      sliderAlts: [
        "OMZ设计工程",
        "图纸与三维模型开发",
        "按设计文件准备生产",
        "按项目制造零件",
      ],
      secondarySliderAlts: [
        "石油开采设备设计",
        "金属结构与轧材",
        "产品试验支持",
        "项目符合性控制",
      ],
      contentBlocks: [
        { type: "slider", slidesKey: "primary" },
        { type: "heading", text: "OMZ设计局" },
        {
          type: "paragraph",
          text: "奥cher机械制造厂股份公司工程师为金属结构、石油开采设备及工艺产品编制设计文件。设计在KOMPAS-3D和SolidWorks等现代CAD系统中进行，兼顾生产与使用要求。",
        },
        {
          type: "paragraph",
          text: "设计支持涵盖完整周期：从技术任务和方案设计到工作文件、规格书及在工厂现场的生产支持。",
        },
        {
          type: "paragraph",
          text: "石油天然气行业设计经验有助于考虑油田使用特点、可靠性及设备可维修性要求。",
        },
        {
          type: "twoColumns",
          columns: {
            leftTitle: "开发内容",
            leftItems: [
              "三维模型与装配图",
              "规格书与材料清单",
              "零件与部件图",
              "工艺文件",
            ],
            rightTitle: "CAD与计算",
            rightItems: [
              "KOMPAS-3D、SolidWorks",
              "强度计算",
              "材料与涂层选择",
              "适配OMZ生产能力",
            ],
          },
        },
        {
          type: "callout",
          callout: {
            variant: "muted",
            title: "从项目到批量",
            body: "文件可针对单件或批量生产编制，并后续支持变更与图纸更新。",
          },
        },
        { type: "heading", text: "与客户合作阶段", tag: "h3" },
        {
          type: "bulletList",
          items: [
            "分析技术任务与原始资料",
            "方案设计与技术设计",
            "编制工作设计文件",
            "与客户及生产部门协调",
            "制造与验收试验支持",
          ],
        },
        { type: "slider", slidesKey: "secondary" },
        {
          type: "paragraph",
          text: "客户获得约定格式的文件包，用于在OMZ或其他场地启动生产。必要时工程师参与作者监督及根据试验结果完善设计。",
        },
        {
          type: "paragraph",
          text: "如需讨论设计工作范围及文件编制工期，请将技术任务或产品说明发送至奥cher机械制造厂股份公司销售部。",
        },
      ],
    },
  },
};
