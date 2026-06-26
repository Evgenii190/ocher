import type {
  SeedVacancy,
  SeedVacancyCategory,
  SeedVacancyContentKey,
  SeedVacancyType,
} from "../vacancies-data";
import type { SeedLocale } from "./catalog";

export type VacancyContentCopy = {
  headings: string[];
  paragraphs: string[];
  bulletLists?: string[][];
  twoColumns?: {
    leftTitle?: string;
    leftItems: string[];
    rightTitle?: string;
    rightItems: string[];
  };
};

export const vacancyTypeTranslations: Record<
  SeedLocale,
  Record<string, Pick<SeedVacancyType, "title">>
> = {
  en: {
    office: { title: "Office" },
    production: { title: "Production" },
    engineering: { title: "Engineering" },
    "quality-control": { title: "Quality control" },
  },
  zh: {
    office: { title: "办公室" },
    production: { title: "生产" },
    engineering: { title: "工程" },
    "quality-control": { title: "质量控制" },
  },
};

export const vacancyCategoryTranslations: Record<
  SeedLocale,
  Record<string, Pick<SeedVacancyCategory, "title" | "description">>
> = {
  en: {
    "admin-personnel": {
      title: "Administrative and management staff",
      description:
        "Vacancies for executives and administrative service specialists",
    },
    "production-personnel": {
      title: "Production staff",
      description:
        "Specialists of the plant's main and auxiliary production",
    },
    "engineering-personnel": {
      title: "Engineering and technical staff",
      description:
        "Engineers, technologists, designers, and other technical specialists",
    },
    "quality-control": {
      title: "Quality control",
      description:
        "If you are interested in quality control vacancies, for example inspector roles",
    },
  },
  zh: {
    "admin-personnel": {
      title: "行政管理岗位",
      description: "管理层和行政服务部门专员的岗位",
    },
    "production-personnel": {
      title: "生产岗位",
      description: "工厂主要和辅助生产的专业人员",
    },
    "engineering-personnel": {
      title: "工程技术岗位",
      description: "工程师、工艺师、设计师和其他技术专家",
    },
    "quality-control": {
      title: "质量控制",
      description: "如果您对质量控制岗位感兴趣，例如检验员",
    },
  },
};

export const vacancyTranslations: Record<
  SeedLocale,
  Record<string, Pick<SeedVacancy, "title" | "subtitle" | "description" | "salaryText" | "schedule" | "experience" | "location">>
> = {
  en: {
    turner: {
      title: "Universal lathe operator",
      subtitle: "Grade 5–6, universal and lathe machines",
      description:
        "Machining and finishing parts on universal and lathe machines, working from drawings, dimensional control, and compliance with process requirements.",
      salaryText: "based on interview results",
      schedule: "shift / full day",
      experience: "from 1 year",
      location: "Ocher, Malyisheva St., 1",
    },
    accountant: {
      title: "Accountant",
      subtitle: "accounting and reporting",
      description:
        "Maintaining accounting and tax records, working with primary documents, payroll, and preparing reports on schedule.",
      schedule: "full day",
      experience: "from 3 years",
      location: "Ocher, Malyisheva St., 1",
    },
    "design-engineer": {
      title: "Design engineer",
      subtitle: "design and production support",
      description:
        "Developing design documentation for oilfield and metalworking equipment, drawing approval, and production support.",
      schedule: "full day",
      experience: "from 1 year",
      location: "Ocher, Malyisheva St., 1",
    },
    "quality-inspector": {
      title: "QC inspector",
      subtitle: "incoming and in-process inspection",
      description:
        "Quality control of blanks and finished products, measuring tools, protocol documentation, and non-conformance detection at production stages.",
      schedule: "shift schedule",
      experience: "from 1 year",
      location: "Ocher, Malyisheva St., 1",
    },
  },
  zh: {
    turner: {
      title: "万能车工",
      subtitle: "5–6级，万能和车床",
      description:
        "在万能和车床上加工和精加工零件，按图纸工作，尺寸检测并遵守工艺要求。",
      salaryText: "根据面试结果",
      schedule: "轮班/全天",
      experience: "1年以上",
      location: "奥cher市，马雷舍娃街1号",
    },
    accountant: {
      title: "会计",
      subtitle: "核算与报表",
      description:
        "负责会计和税务核算，处理原始凭证、工资计算并按时编制报表。",
      schedule: "全天",
      experience: "3年以上",
      location: "奥cher市，马雷舍娃街1号",
    },
    "design-engineer": {
      title: "设计工程师",
      subtitle: "设计与生产支持",
      description:
        "开发石油开采和金属加工设备的设计文件，图纸审批和生产支持。",
      schedule: "全天",
      experience: "1年以上",
      location: "奥cher市，马雷舍娃街1号",
    },
    "quality-inspector": {
      title: "质检员",
      subtitle: "入厂和过程检验",
      description:
        "控制毛坯和成品质量，使用测量工具，编制检验记录并在生产阶段发现不符合项。",
      schedule: "轮班制",
      experience: "1年以上",
      location: "奥cher市，马雷舍娃街1号",
    },
  },
};

export const vacancyContentTranslations: Record<
  SeedLocale,
  Record<SeedVacancyContentKey, VacancyContentCopy>
> = {
  en: {
    turner: {
      headings: [
        "Work at a stable machine-building production site",
        "Responsibilities:",
        "Additionally:",
        "Requirements:",
        "Working conditions:",
      ],
      paragraphs: [
        "JSC Ocher Machine-Building Plant invites a universal lathe operator to the production shop. Work with parts for oilfield equipment, metal structures, and custom products from drawings.",
        "Manufacture and machine parts on lathes according to design documentation. Perform turning, boring, threading, fitting, and dimensional control with measuring tools.",
        "Additionally:",
      ],
      bulletLists: [
        [
          "working with metal blanks",
          "reading drawings",
          "following technological processes",
          "quality control of finished parts",
        ],
        [
          "lathe operator experience",
          "knowledge of measuring tools",
          "ability to read drawings",
          "responsibility and attention to detail",
          "occupational safety compliance",
        ],
        [
          "official employment",
          "stable work at an operating plant",
          "modern production base",
          "timely salary payments",
          "work with experienced specialists",
          "career growth opportunities",
        ],
      ],
    },
    accountant: {
      headings: ["Stable work in the plant finance department", "Responsibilities:"],
      paragraphs: [
        "JSC Ocher Machine-Building Plant is looking for an accountant for accounting and reporting. Work with primary documents, settlements with counterparties, and regulatory reporting.",
        "Maintain accounting and tax records, calculate payroll, control primary documents, and prepare reports on schedule.",
      ],
      bulletLists: [
        [
          "working with 1C and electronic document flow",
          "interaction with banks and counterparties",
          "monitoring receivables and payables",
        ],
      ],
      twoColumns: {
        leftTitle: "Requirements:",
        leftItems: [
          "accounting experience from 3 years",
          "knowledge of tax legislation",
          "attention to detail",
          "responsibility and accuracy",
        ],
        rightTitle: "Conditions:",
        rightItems: [
          "official employment",
          "full working day",
          "stable salary",
          "friendly team",
        ],
      },
    },
    "design-engineer": {
      headings: [
        "Design of equipment for the oil and gas industry",
        "Responsibilities:",
        "Requirements:",
        "Working conditions:",
      ],
      paragraphs: [
        "We invite a design engineer to develop design documentation for oilfield and metalworking equipment. Support products from concept to serial production.",
        "Develop 3D models and drawings, coordinate design with technologists and production, participate in testing and design refinement.",
        "We are looking for an engineer with experience in metal structures or custom equipment design who can work with regulatory documentation.",
      ],
      bulletLists: [
        [
          "working in KOMPAS-3D / SolidWorks",
          "preparing specifications and bills of materials",
          "participating in technical specification review",
        ],
        [
          "higher technical education",
          "design experience from 1 year",
          "confident reading of drawings and GOST standards",
          "systematic approach and attention to detail",
        ],
        [
          "official employment",
          "engineering department with modern software",
          "participation in interesting plant projects",
          "career growth opportunities",
        ],
      ],
    },
    "quality-inspector": {
      headings: ["Quality control at all production stages", "Responsibilities:"],
      paragraphs: [
        "JSC Ocher Machine-Building Plant invites a QC inspector for incoming, in-process, and acceptance inspection. Work with measuring tools and quality protocols.",
        "Inspect blanks and finished products, prepare protocols, identify non-conformances, and interact with production areas.",
      ],
      bulletLists: [
        [
          "working with calipers, micrometers, bore gauges",
          "maintaining inspection logs",
          "participating in claim analysis",
        ],
      ],
      twoColumns: {
        leftTitle: "Requirements:",
        leftItems: [
          "QC experience from 1 year",
          "knowledge of inspection methods",
          "attention and accuracy",
          "occupational safety compliance",
        ],
        rightTitle: "Conditions:",
        rightItems: [
          "shift schedule",
          "official employment",
          "stable work at the plant",
          "timely salary payments",
        ],
      },
    },
  },
  zh: {
    turner: {
      headings: [
        "在稳定的机械制造企业工作",
        "职责：",
        "此外：",
        "要求：",
        "工作条件：",
      ],
      paragraphs: [
        "奥cher机械制造厂招聘万能车工到生产车间。加工石油开采设备、金属结构和非标产品的零件。",
        "按设计文件在车床上制造和加工零件。进行车削、镗削、攻丝、配装和测量工具尺寸检测。",
        "此外：",
      ],
      bulletLists: [
        [
          "金属毛坯加工",
          "识读图纸",
          "遵守工艺流程",
          "成品质量检测",
        ],
        [
          "车工经验",
          "熟悉测量工具",
          "能识读图纸",
          "责任心和细致",
          "遵守劳动安全规定",
        ],
        [
          "正式雇佣",
          "在运营工厂稳定工作",
          "现代化生产基础",
          "按时发放工资",
          "与经验丰富的专家共事",
          "职业发展机会",
        ],
      ],
    },
    accountant: {
      headings: ["在工厂财务部门稳定工作", "职责："],
      paragraphs: [
        "奥cher机械制造厂招聘会计负责核算和报表。处理原始凭证、与往来单位结算和编制规范报表。",
        "负责会计和税务核算，计算工资，控制原始凭证并按时编制报表。",
      ],
      bulletLists: [
        [
          "使用1C和电子文档流",
          "与银行和往来单位协作",
          "监控应收应付账款",
        ],
      ],
      twoColumns: {
        leftTitle: "要求：",
        leftItems: [
          "3年以上会计经验",
          "熟悉税法",
          "注重细节",
          "责任心和准确性",
        ],
        rightTitle: "条件：",
        rightItems: ["正式雇佣", "全天工作", "稳定薪资", "友好团队"],
      },
    },
    "design-engineer": {
      headings: [
        "石油天然气行业设备设计",
        "职责：",
        "要求：",
        "工作条件：",
      ],
      paragraphs: [
        "招聘设计工程师，开发石油开采和金属加工设备的设计文件。从产品构思到批量生产的全程支持。",
        "开发3D模型和图纸，与工艺师和生产部门协调设计，参与试验和设计改进。",
        "寻找有金属结构或非标设备设计经验、熟悉规范文件的工程师。",
      ],
      bulletLists: [
        [
          "使用KOMPAS-3D / SolidWorks",
          "编制规格书和材料清单",
          "参与技术任务书评审",
        ],
        [
          "工科高等教育",
          "1年以上设计经验",
          "熟练识读图纸和GOST标准",
          "系统思维和注重细节",
        ],
        [
          "正式雇佣",
          "配备现代软件的工程部门",
          "参与工厂有趣项目",
          "职业发展机会",
        ],
      ],
    },
    "quality-inspector": {
      headings: ["生产各阶段的质量控制", "职责："],
      paragraphs: [
        "奥cher机械制造厂招聘质检员，负责入厂、过程和验收检验。使用测量工具和质量记录。",
        "检验毛坯和成品，编制记录，发现不符合项并与生产工段协作。",
      ],
      bulletLists: [
        [
          "使用卡尺、千分尺、内径表",
          "维护检验日志",
          "参与索赔分析",
        ],
      ],
      twoColumns: {
        leftTitle: "要求：",
        leftItems: [
          "1年以上质检经验",
          "熟悉检验方法",
          "细致和准确",
          "遵守劳动安全规定",
        ],
        rightTitle: "条件：",
        rightItems: ["轮班制", "正式雇佣", "工厂稳定工作", "按时发放工资"],
      },
    },
  },
};

export function getVacancyContentCopy(
  contentKey: SeedVacancyContentKey,
  locale: SeedLocale,
): VacancyContentCopy {
  return vacancyContentTranslations[locale][contentKey];
}
