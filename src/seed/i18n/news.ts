import type { SeedNewsCategory, SeedNews } from "../news-data";
import type { SeedLocale } from "./catalog";

export type NewsContentCopy = {
  headings: string[];
  paragraphs: string[];
};

export const newsCategoryTranslations: Record<
  SeedLocale,
  Record<string, Pick<SeedNewsCategory, "title">>
> = {
  en: {
    "zhizn-zavoda": { title: "Plant life" },
    proizvodstvo: { title: "Production" },
    partnery: { title: "Partners" },
    kadry: { title: "Team and HR" },
    obuchenie: { title: "Training" },
    ekologiya: { title: "Ecology and safety" },
  },
  zh: {
    "zhizn-zavoda": { title: "工厂生活" },
    proizvodstvo: { title: "生产" },
    partnery: { title: "合作伙伴" },
    kadry: { title: "团队与人才" },
    obuchenie: { title: "培训" },
    ekologiya: { title: "生态与安全" },
  },
};

export const newsItemTranslations: Record<
  SeedLocale,
  Record<string, Pick<SeedNews, "title" | "description">>
> = {
  en: {
    "modernizaciya-termoagregata": {
      title: "Heat treatment unit modernization",
      description:
        "Production modernization is an integral part of the plant's investment program. The upgraded heat treatment unit will improve shop energy efficiency.",
    },
    "otgruzki-novatek": {
      title: "Shipments to NOVATEK PJSC begin",
      description:
        "JSC OMZ has started shipping products for leading partner NOVATEK PJSC: components for oilfield equipment.",
    },
    "intervyu-generalnogo-direktora": {
      title: "CEO interview for RBC Perm",
      description:
        "The CEO of JSC OMZ spoke about the company's development plans, production investments, and HR policy.",
    },
    "den-metallurga": {
      title: "Metallurgist Day at the plant",
      description:
        "The JSC OMZ team celebrated the professional holiday: awards for top employees, shop tours, and a festive program.",
    },
    "novaya-liniya-obrabotki": {
      title: "New parts processing line launched",
      description:
        "A parts processing line has been commissioned in the metal structures shop — shorter manufacturing cycle and higher precision.",
    },
    "podderzhka-sporta": {
      title: "The plant supported local sports",
      description:
        "JSC OMZ partnered in Ocher city volleyball and athletics competitions for youth.",
    },
    "sistema-ohrany-truda": {
      title: "Updated occupational safety system implemented",
      description:
        "The plant completed a stage of occupational safety management modernization: new briefings, PPE, and workplace monitoring.",
    },
    "stazhirovki-pgniu": {
      title: "Internships for PSU students",
      description:
        "The plant engineering department welcomes students from Perm State National Research University.",
    },
  },
  zh: {
    "modernizaciya-termoagregata": {
      title: "热处理装置现代化改造",
      description:
        "生产现代化是工厂投资计划的重要组成部分。更新后的热处理装置将提高车间能源效率。",
    },
    "otgruzki-novatek": {
      title: "开始向诺瓦泰克股份公司发货",
      description:
        "奥cher机械制造厂开始向主要合作伙伴诺瓦泰克股份公司供应石油开采设备零部件。",
    },
    "intervyu-generalnogo-direktora": {
      title: "总经理接受RBC彼尔姆采访",
      description:
        "奥cher机械制造厂总经理介绍了企业发展计划、生产投资和人才政策。",
    },
    "den-metallurga": {
      title: "工厂冶金师节",
      description:
        "奥cher机械制造厂员工庆祝专业节日：表彰优秀员工、车间参观和节日活动。",
    },
    "novaya-liniya-obrabotki": {
      title: "新零件加工线投产",
      description:
        "金属结构车间投入零件加工线——缩短制造周期并提高精度。",
    },
    "podderzhka-sporta": {
      title: "工厂支持本地体育",
      description:
        "奥cher机械制造厂成为奥cher市青年排球和田径比赛的合作伙伴。",
    },
    "sistema-ohrany-truda": {
      title: "实施更新的劳动保护体系",
      description:
        "企业完成了劳动保护管理体系现代化阶段：新培训、个人防护装备和工作场所监控。",
    },
    "stazhirovki-pgniu": {
      title: "彼尔姆国立大学学生实习",
      description:
        "工厂工程部门欢迎彼尔姆国立研究大学的学生前来实习。",
    },
  },
};

export const newsContentTranslations: Record<
  SeedLocale,
  Record<string, NewsContentCopy>
> = {
  en: {
    modernization: {
      headings: ["Investments in energy efficiency"],
      paragraphs: [
        "JSC Ocher Machine-Building Plant has completed modernization of the heat treatment unit in the metal structures shop. The upgrade will reduce fuel consumption and stabilize temperature during thermal processing.",
        "The work was performed by the plant engineering service together with a contractor. The new equipment meets current industrial safety and environmental requirements.",
      ],
    },
    novatek: {
      headings: ["Expanding the partnership program"],
      paragraphs: [
        "JSC OMZ has started serial shipments of oilfield equipment components to NOVATEK PJSC. Deliveries include units for surface and field equipment manufactured at the Ocher plant.",
        "The contract confirms trust in the plant's product quality and opens opportunities for further cooperation growth.",
      ],
    },
    interview: {
      headings: ["On company development and HR policy"],
      paragraphs: [
        "In an interview with RBC Perm, the CEO of JSC OMZ spoke about investment program priorities, production capacity modernization, and attracting young specialists to the plant.",
        "According to management, the team remains the key factor for sustainable growth: the company continues training, mentoring, and social support programs for employees.",
      ],
    },
    "metallurg-day": {
      headings: ["A holiday for those who create metal"],
      paragraphs: [
        "Metallurgist Day at the plant traditionally brings together employees from all shops. This year top workers received awards for their contribution to production development.",
        "Young specialists were offered tours of key areas — from blank preparation to the assembly shop.",
      ],
    },
    "new-line": {
      headings: ["New opportunities for customers"],
      paragraphs: [
        "Launching the parts processing line enables more complex operations in one process chain: milling, boring, and geometry control without re-setup between areas.",
        "Plant engineers expect to reduce serial product lead time by 15–20% while maintaining precision requirements.",
      ],
    },
    sport: {
      headings: ["Corporate social responsibility"],
      paragraphs: [
        "JSC OMZ regularly supports sports initiatives in Ocher. This season the plant was the general partner of the city volleyball tournament among companies and educational institutions.",
        "Corporate sports sections and participation in regional competitions are also organized for employees.",
      ],
    },
    safety: {
      headings: ["Safety is a priority of every shift"],
      paragraphs: [
        "The updated occupational safety system includes digital briefing records, an expanded PPE list, and regular workplace audits.",
        "Occupational safety specialists trained foremen and area supervisors with analysis of typical production situations.",
      ],
    },
    internship: {
      headings: ["Internship at an operating production site"],
      paragraphs: [
        "Engineering students intern in the design office and production areas under plant mentors.",
        "The program lasts one semester: participants learn technological processes, regulatory documentation, and the quality management system.",
      ],
    },
  },
  zh: {
    modernization: {
      headings: ["能源效率投资"],
      paragraphs: [
        "奥cher机械制造厂完成了金属结构车间热处理装置的现代化改造。升级将降低燃料消耗并稳定热处理温度。",
        "工作由企业工程部门与承包商共同完成。新设备符合现行工业安全和环保要求。",
      ],
    },
    novatek: {
      headings: ["扩大合作计划"],
      paragraphs: [
        "奥cher机械制造厂开始向诺瓦泰克股份公司批量供应石油开采设备零部件。供货包括奥cher工厂生产的地面和油田设备部件。",
        "合同确认了客户对产品质量的信任，并为进一步合作增长创造了条件。",
      ],
    },
    interview: {
      headings: ["关于企业发展和人才政策"],
      paragraphs: [
        "在接受RBC彼尔姆采访时，奥cher机械制造厂总经理介绍了投资计划重点、生产设施现代化以及吸引年轻人才进厂。",
        "管理层表示，团队仍是可持续增长的关键因素：企业继续开展培训、导师制和员工社会支持计划。",
      ],
    },
    "metallurg-day": {
      headings: ["为创造金属的人庆祝的节日"],
      paragraphs: [
        "冶金师节是工厂各车间员工的传统聚会。今年优秀员工因对生产发展的贡献获得表彰。",
        "为年轻专家组织了从备料到装配车间的关键工段参观。",
      ],
    },
    "new-line": {
      headings: ["为客户带来新机遇"],
      paragraphs: [
        "零件加工线的投产使更复杂的工序可在一条工艺链上完成：铣削、镗削和几何检测，无需在各工段间重新装夹。",
        "工厂工程师预计可在保持精度要求的同时将系列产品制造周期缩短15–20%。",
      ],
    },
    sport: {
      headings: ["企业社会责任"],
      paragraphs: [
        "奥cher机械制造厂定期支持奥cher的体育倡议。本季工厂成为企业和院校城市排球锦标赛的冠名合作伙伴。",
        "还为员工组织了企业运动小组并参与地区比赛。",
      ],
    },
    safety: {
      headings: ["安全是每个班次的首要任务"],
      paragraphs: [
        "更新的劳动保护体系包括数字化培训记录、扩展的个人防护装备清单和定期工作场所审计。",
        "劳动保护专家针对典型生产情况对工长和班长进行了培训。",
      ],
    },
    internship: {
      headings: ["在实际生产中的实习"],
      paragraphs: [
        "工科学生在设计部门和生产工段、在工厂导师指导下实习。",
        "项目为期一个学期：参与者了解工艺流程、规范文件和质量管理体系。",
      ],
    },
  },
};

export function getNewsContentCopy(
  contentKey: string,
  locale: SeedLocale,
): NewsContentCopy | undefined {
  return newsContentTranslations[locale][contentKey];
}
