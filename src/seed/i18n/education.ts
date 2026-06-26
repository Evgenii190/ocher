import type { EducationRow } from "@/shared/lib/education-disclosure.shared";
import type { SeedLocale } from "./catalog";

export const educationPageTranslations: Record<
  SeedLocale,
  { pageTitle: string }
> = {
  en: { pageTitle: "Information about the educational organization" },
  zh: { pageTitle: "教育机构信息" },
};

/** Keys match Russian `title` (sections) or `name` (rows) from education-disclosure-data.ts */
export const educationRowTranslations: Record<
  SeedLocale,
  Record<
    string,
    {
      name?: string;
      sectionTitle?: string;
      lines?: string[];
      buttonLabels?: Record<string, string>;
    }
  >
> = {
  en: {
    "Основные сведения / Структура и органы управления": {
      sectionTitle: "Basic information / Structure and governing bodies",
    },
    "Полное наименование организации": {
      name: "Full name of the organization",
      lines: ['Joint Stock Company "Ocher Machine-Building Plant"'],
    },
    "Сокращенное наименование организации": {
      name: "Short name of the organization",
      lines: ['JSC "OMZ"'],
    },
    "Дата создания образовательной организации": {
      name: "Date the educational organization was established",
      lines: ["Date of obtaining the educational license — July 24, 2025."],
    },
    "Об учредителе, учредителях организации": {
      name: "About the founder(s) of the organization",
      lines: ['Founder — Trading Company "OMZ"'],
    },
    "Местонахождение организации": {
      name: "Location of the organization",
      lines: ["Organization address: 1 Malyshova St., Ocher, 617140."],
    },
    "Режим и график работы организации": {
      name: "Operating hours and schedule of the organization",
      lines: [
        "Monday through Friday on working days — from 8:00 AM to 5:00 PM.",
      ],
    },
    "Контактные телефоны, адреса электронной почты": {
      name: "Contact phone numbers and email addresses",
      lines: ["Phone: +7 (3422) 320170, ext. 401 Email: omz@ocher.ru"],
    },
    "Местонахождение осуществления образовательной деятельности": {
      name: "Location where educational activities are carried out",
      lines: ["Training address: 1 Malyshova St., Ocher, 617140. Room No. 101"],
    },
    "Лицензии на осуществление образовательной деятельности": {
      name: "Licenses for educational activities",
      lines: ["Extract from the register of educational activity licenses"],
    },
    "Наличие государственной аккредитации": {
      name: "Availability of state accreditation",
      lines: [
        "The organization does not hold state accreditation of educational activities for",
        "the implemented educational programs",
      ],
    },
    "О наименовании структурного подразделения": {
      name: "About the name of the structural unit",
      lines: ["The organization has no structural units"],
    },
    "ФИО и должности руководителей структурных подразделений": {
      name: "Full names and positions of heads of structural units",
      lines: ["The organization has no structural units"],
    },
    "О месте нахождения структурных подразделений": {
      name: "About the location of structural units",
      lines: ["The organization has no structural units"],
    },
    "Адреса сайтов структурных подразделений": {
      name: "Websites of structural units",
      lines: ["The organization has no structural units"],
    },
    "Адреса электронной почты структурных подразделений": {
      name: "Email addresses of structural units",
      lines: ["The organization has no structural units"],
    },
    "О наличии положений о структурных подразделениях": {
      name: "Availability of regulations on structural units",
      lines: ["The organization has no structural units"],
    },
    Документы: { sectionTitle: "Documents" },
    "Устав образовательной организации": {
      name: "Charter of the educational organization",
      lines: ["Charter of the educational organization"],
    },
    "Правила внутреннего трудового распорядка": {
      name: "Internal labor regulations",
      lines: ["Internal labor regulations"],
    },
    "Коллективный договор": {
      name: "Collective agreement",
      lines: ["Collective agreement"],
    },
    "Локальные нормативные акты": {
      name: "Local regulatory acts",
      buttonLabels: {
        "Режим занятий обучающихся": "Class schedule for students",
        "Правила приема обучающихся": "Student admission rules",
        "Порядок и основания перевода": "Transfer procedure and grounds",
        "Периодичность и порядок текущего контроля":
          "Frequency and procedure of ongoing assessment",
        "Положение о нормах профессиональной этики педагогических":
          "Regulation on professional ethics standards for teaching staff",
        "Основная программа профессионального образования":
          "Main vocational education program",
      },
    },
    "Отчет по результатам самообследования": {
      name: "Self-assessment report",
      lines: [
        "Self-assessment was not conducted; no educational activities were carried out",
      ],
    },
    "Предписания органов гос. контроля": {
      name: "Orders of government oversight bodies",
      lines: ["Order dated January 22, 2026"],
    },
    Образование: { sectionTitle: "Education" },
    "Реализуемые образовательные программы": {
      name: "Implemented educational programs",
      lines: ["—"],
    },
    "Уровень образования, наименование программы": {
      name: "Education level and program name",
      lines: ["The organization does not offer general education programs"],
    },
    "Форма обучения": {
      name: "Form of study",
      lines: ["Full-time"],
    },
    "Нормативный срок, код и наименование профессии": {
      name: "Standard duration, code and name of the profession",
      lines: [
        "The organization does not offer higher education programs in bachelor's, specialist, master's, residency, or assistantship-internship tracks",
      ],
    },
    "Шифр и наименование области науки": {
      name: "Code and name of the field of science",
      lines: [
        "The organization does not offer higher education programs for training research and teaching staff in postgraduate studies",
      ],
    },
    "Научная деятельность": {
      name: "Research activities",
      lines: [
        "The organization is not engaged in scientific (research) activities",
      ],
    },
    "Численность обучающихся за счет бюджетов": {
      name: "Number of students funded from budgets",
      lines: [
        "The organization does not conduct educational activities funded from federal, regional, or local budgets, or under education agreements financed by individuals and/or legal entities",
      ],
    },
    "Численность иностранных граждан": {
      name: "Number of foreign citizens",
      lines: [
        "There are no foreign citizens studying at the organization, and none are",
        "planned",
      ],
    },
    "Язык образования": {
      name: "Language of instruction",
      lines: ["Russian"],
    },
    "Результаты приема": {
      name: "Admission results",
      lines: [
        "The organization has not conducted and does not plan to conduct student admissions",
      ],
    },
    "Трудоустройство выпускников": {
      name: "Graduate employment",
      lines: [
        "The organization has not conducted and does not plan to conduct student admissions. Educational activities are provided exclusively for internal employees employed at JSC OMZ",
      ],
    },
    Руководство: { sectionTitle: "Management" },
    "Директор по производству": {
      name: "Production Director",
      lines: [
        "Alexey Vladimirovich Tiunov",
        "+7(342)232-01-72",
        "omz@ocher.ru",
      ],
    },
    "Заместитель директора по производству": {
      name: "Deputy Production Director",
      lines: ["Roman Khamidovich Gordanov", "+7(342)232-01-73", "omz@ocher.ru"],
    },
    "Заместитель директора по экономике": {
      name: "Deputy Director for Economics",
      lines: [
        "Dmitry Sergeevich Chelpanov",
        "+7(342)232-01-73",
        "omz@ocher.ru",
      ],
    },
    "Начальник отдела по управлению персоналом": {
      name: "Head of Human Resources Department",
      lines: [
        "Anastasia Vladimirovna Yarkina",
        "+7(342)232-01-74",
        "omz@ocher.ru",
      ],
    },
    "Материально-техническое обеспечение": {
      sectionTitle: "Material and technical support",
    },
    "Общеобразовательные программы": {
      name: "General education programs",
      lines: ["The organization does not offer general education programs"],
    },
    "Наличие оборудованных учебных кабинетов": {
      name: "Availability of equipped classrooms",
      lines: [
        "The organization has an equipped classroom on the 1st floor of the administrative building, Room No. 101",
      ],
    },
    "Объекты для практических занятий": {
      name: "Facilities for practical classes",
      lines: ["not available"],
    },
    Библиотеки: {
      name: "Libraries",
      lines: ["not available"],
    },
    "Объекты спорта": {
      name: "Sports facilities",
      lines: ["not available"],
    },
    "Средства обучения и воспитания": {
      name: "Teaching and educational resources",
      lines: ["not available"],
    },
    "Доступ к информационным системам": {
      name: "Access to information systems",
      lines: ["provided in the classroom"],
    },
    "Электронные образовательные ресурсы": {
      name: "Electronic educational resources",
      lines: ["not available"],
    },
    "Жилые помещения в общежитии": {
      name: "Residential accommodation in a dormitory",
      lines: ["not available"],
    },
    "Условия для инвалидов и лиц с ОВЗ": {
      name: "Conditions for persons with disabilities and special educational needs",
      lines: [
        "Building access is provided; no specialized technical aids are",
        "available",
      ],
    },
    "Платные образовательные услуги": {
      sectionTitle: "Paid educational services",
    },
    "Порядок оказания платных образовательных услуг": {
      name: "Procedure for providing paid educational services",
      lines: ["The organization does not provide paid educational services"],
    },
    "Стоимость обучения по каждой программе": {
      name: "Tuition cost for each program",
      lines: ["—"],
    },
    "Финансово-хозяйственная деятельность": {
      sectionTitle: "Financial and economic activities",
    },
    "Объем образовательной деятельности за счет бюджетов": {
      name: "Volume of educational activities funded from budgets",
      lines: [
        "The organization carries out educational activities exclusively from its own funds to train internal employees. It receives no federal, regional, or other public funding.",
      ],
    },
    "Поступление финансовых и материальных средств": {
      name: "Receipt of financial and material resources",
      lines: ["—"],
    },
    "Вакантные места за счет бюджетов": {
      name: "Vacant places funded from budgets",
      lines: [
        "The organization carries out educational activities from its own funds to train exclusively internal employees.",
      ],
    },
    "Наличие и условия предоставления стипендий": {
      name: "Availability and terms of scholarships",
      lines: [
        "The organization provides educational activities exclusively for internal employees during their paid working hours.",
      ],
    },
    "Договоры с иностранными организациями": {
      name: "Agreements with foreign organizations",
      lines: [
        "The organization has no agreements with foreign and/or international organizations on education and science, and does not plan to enter into such agreements.",
      ],
    },
    "Условия питания и охраны здоровья": {
      name: "Meals and health care conditions",
      lines: [
        "The organization carries out educational activities from its own funds to train exclusively internal employees. A canteen operates on the JSC OMZ premises to provide meals.",
      ],
    },
    "Образовательные стандарты и требования": {
      name: "Educational standards and requirements",
      lines: [
        "Educational standards and requirements in accordance with the legislation of the Russian Federation",
      ],
    },
  },
  zh: {
    "Основные сведения / Структура и органы управления": {
      sectionTitle: "基本信息 / 结构与管理机构",
    },
    "Полное наименование организации": {
      name: "机构全称",
      lines: ["股份公司“奥cher机械制造厂”"],
    },
    "Сокращенное наименование организации": {
      name: "机构简称",
      lines: ["OMZ股份公司"],
    },
    "Дата создания образовательной организации": {
      name: "教育机构成立日期",
      lines: ["取得办学许可证日期——2025年7月24日。"],
    },
    "Об учредителе, учредителях организации": {
      name: "关于机构创办人",
      lines: ["创办人——OMZ贸易公司"],
    },
    "Местонахождение организации": {
      name: "机构所在地",
      lines: ["机构地址：617140 奥cher市马雷舍娃街1号。"],
    },
    "Режим и график работы организации": {
      name: "机构工作制度与作息时间",
      lines: ["工作日周一至周五——8:00至17:00。"],
    },
    "Контактные телефоны, адреса электронной почты": {
      name: "联系电话和电子邮箱",
      lines: ["电话：+7 (3422) 320170，分机401 邮箱：omz@ocher.ru"],
    },
    "Местонахождение осуществления образовательной деятельности": {
      name: "开展教育活动的地点",
      lines: ["教学地址：617140 奥cher市马雷舍娃街1号，101号办公室"],
    },
    "Лицензии на осуществление образовательной деятельности": {
      name: "办学许可证",
      lines: ["办学活动许可证登记摘录"],
    },
    "Наличие государственной аккредитации": {
      name: "国家认证情况",
      lines: ["机构对所实施的教育项目", "未获得国家办学认证"],
    },
    "О наименовании структурного подразделения": {
      name: "关于结构部门名称",
      lines: ["机构无结构部门"],
    },
    "ФИО и должности руководителей структурных подразделений": {
      name: "结构部门负责人姓名及职务",
      lines: ["机构无结构部门"],
    },
    "О месте нахождения структурных подразделений": {
      name: "关于结构部门所在地",
      lines: ["机构无结构部门"],
    },
    "Адреса сайтов структурных подразделений": {
      name: "结构部门网站地址",
      lines: ["机构无结构部门"],
    },
    "Адреса электронной почты структурных подразделений": {
      name: "结构部门电子邮箱地址",
      lines: ["机构无结构部门"],
    },
    "О наличии положений о структурных подразделениях": {
      name: "关于结构部门规章",
      lines: ["机构无结构部门"],
    },
    Документы: { sectionTitle: "文件" },
    "Устав образовательной организации": {
      name: "教育机构章程",
      lines: ["教育机构章程"],
    },
    "Правила внутреннего трудового распорядка": {
      name: "内部劳动规章",
      lines: ["内部劳动规章"],
    },
    "Коллективный договор": {
      name: "集体合同",
      lines: ["集体合同"],
    },
    "Локальные нормативные акты": {
      name: "内部规范性文件",
      buttonLabels: {
        "Режим занятий обучающихся": "学员上课作息制度",
        "Правила приема обучающихся": "学员录取规则",
        "Порядок и основания перевода": "转学程序与依据",
        "Периодичность и порядок текущего контроля": "平时考核频率与程序",
        "Положение о нормах профессиональной этики педагогических":
          "教师职业道德规范",
        "Основная программа профессионального образования": "主要职业教育项目",
      },
    },
    "Отчет по результатам самообследования": {
      name: "自查报告",
      lines: ["未进行自查，未开展教育活动"],
    },
    "Предписания органов гос. контроля": {
      name: "国家监管机关指令",
      lines: ["2026年1月22日指令"],
    },
    Образование: { sectionTitle: "教育" },
    "Реализуемые образовательные программы": {
      name: "实施的教育项目",
      lines: ["—"],
    },
    "Уровень образования, наименование программы": {
      name: "教育层次与项目名称",
      lines: ["机构无普通教育项目"],
    },
    "Форма обучения": {
      name: "学习形式",
      lines: ["全日制"],
    },
    "Нормативный срок, код и наименование профессии": {
      name: "标准学制、职业代码与名称",
      lines: ["机构无本科、专家、硕士、住院医师及助理实习等高等教育项目"],
    },
    "Шифр и наименование области науки": {
      name: "学科代码与名称",
      lines: ["机构无培养科研及科研教学人员的研究生教育项目"],
    },
    "Научная деятельность": {
      name: "科研活动",
      lines: ["机构不从事科学（科研）活动"],
    },
    "Численность обучающихся за счет бюджетов": {
      name: "预算拨款学员人数",
      lines: [
        "机构不以联邦、地区或地方预算，以及自然人或法人出资的教育合同开展办学活动",
      ],
    },
    "Численность иностранных граждан": {
      name: "外国公民人数",
      lines: ["机构无外国学员，也", "无相关计划"],
    },
    "Язык образования": {
      name: "教学语言",
      lines: ["俄语"],
    },
    "Результаты приема": {
      name: "录取结果",
      lines: ["机构未开展且计划不开展学员录取"],
    },
    "Трудоустройство выпускников": {
      name: "毕业生就业",
      lines: [
        "机构未开展且计划不开展学员录取。办学活动仅面向OMZ股份公司在职员工",
      ],
    },
    Руководство: { sectionTitle: "领导" },
    "Директор по производству": {
      name: "生产总监",
      lines: [
        "阿列克谢·弗拉基米罗维奇·秋诺夫",
        "+7(342)232-01-72",
        "omz@ocher.ru",
      ],
    },
    "Заместитель директора по производству": {
      name: "生产副总监",
      lines: ["罗曼·哈米多维奇·戈尔达诺夫", "+7(342)232-01-73", "omz@ocher.ru"],
    },
    "Заместитель директора по экономике": {
      name: "经济副总监",
      lines: [
        "德米特里·谢尔盖耶维奇·切尔帕诺夫",
        "+7(342)232-01-73",
        "omz@ocher.ru",
      ],
    },
    "Начальник отдела по управлению персоналом": {
      name: "人力资源部主任",
      lines: [
        "阿纳斯塔西娅·弗拉基米罗夫娜·亚尔金娜",
        "+7(342)232-01-74",
        "omz@ocher.ru",
      ],
    },
    "Материально-техническое обеспечение": {
      sectionTitle: "物质技术保障",
    },
    "Общеобразовательные программы": {
      name: "普通教育项目",
      lines: ["机构无普通教育项目"],
    },
    "Наличие оборудованных учебных кабинетов": {
      name: "配备设备的教室",
      lines: ["机构在行政楼1层101号办公室设有配备设备的教室"],
    },
    "Объекты для практических занятий": {
      name: "实践教学场所",
      lines: ["无"],
    },
    Библиотеки: {
      name: "图书馆",
      lines: ["无"],
    },
    "Объекты спорта": {
      name: "体育设施",
      lines: ["无"],
    },
    "Средства обучения и воспитания": {
      name: "教学与教育资源",
      lines: ["无"],
    },
    "Доступ к информационным системам": {
      name: "信息系统接入",
      lines: ["教室内已提供"],
    },
    "Электронные образовательные ресурсы": {
      name: "电子教育资源",
      lines: ["无"],
    },
    "Жилые помещения в общежитии": {
      name: "宿舍住宿",
      lines: ["无"],
    },
    "Условия для инвалидов и лиц с ОВЗ": {
      name: "残疾及特殊需要人士条件",
      lines: ["可进入建筑物，", "无专用辅助设备"],
    },
    "Платные образовательные услуги": {
      sectionTitle: "有偿教育服务",
    },
    "Порядок оказания платных образовательных услуг": {
      name: "有偿教育服务提供程序",
      lines: ["机构不提供有偿教育服务"],
    },
    "Стоимость обучения по каждой программе": {
      name: "各项目学费",
      lines: ["—"],
    },
    "Финансово-хозяйственная деятельность": {
      sectionTitle: "财务与经营活动",
    },
    "Объем образовательной деятельности за счет бюджетов": {
      name: "预算拨款办学规模",
      lines: [
        "机构完全以自有资金开展面向内部员工的办学活动，无联邦、地区或其他公共资金保障。",
      ],
    },
    "Поступление финансовых и материальных средств": {
      name: "财务与物资收入",
      lines: ["—"],
    },
    "Вакантные места за счет бюджетов": {
      name: "预算拨款空额",
      lines: ["机构以自有资金面向内部员工开展办学活动。"],
    },
    "Наличие и условия предоставления стипендий": {
      name: "奖学金提供情况与条件",
      lines: ["机构仅在员工带薪工作时间内为其提供教育。"],
    },
    "Договоры с иностранными организациями": {
      name: "与外国机构的协议",
      lines: [
        "机构无与外国及/或国际机构就教育与科学事宜签订的协议，也无相关计划。",
      ],
    },
    "Условия питания и охраны здоровья": {
      name: "餐饮与健康保障条件",
      lines: [
        "机构以自有资金面向内部员工开展办学活动。OMZ股份公司厂区内设有食堂提供餐饮。",
      ],
    },
    "Образовательные стандарты и требования": {
      name: "教育标准与要求",
      lines: ["依照俄罗斯联邦法律规定的教育标准与要求"],
    },
  },
};

export function buildEducationLocaleEntries(
  rows: EducationRow[],
  locale: SeedLocale,
) {
  const translations = educationRowTranslations[locale];

  return rows.map((row) => {
    if (row.kind === "section") {
      const sectionTr = translations[row.title];
      return {
        kind: "section" as const,
        sectionTitle: sectionTr?.sectionTitle ?? row.title,
        titleStyle: row.titleStyle ?? "default",
      };
    }

    const rowTr = translations[row.name];

    if (row.info.type === "documents") {
      return {
        kind: "row" as const,
        code: row.code,
        name: rowTr?.name ?? row.name,
        infoType: "buttons" as const,
        buttons: row.info.items.map((item) => ({
          label: rowTr?.buttonLabels?.[item.label] ?? item.label,
          variant: item.variant,
        })),
      };
    }

    if (row.info.type === "link") {
      const lines = rowTr?.lines ?? row.info.lines;
      return {
        kind: "row" as const,
        code: row.code,
        name: rowTr?.name ?? row.name,
        infoType: "link" as const,
        lines: lines.map((text) => ({ text })),
      };
    }

    const lines = rowTr?.lines ?? row.info.lines;
    return {
      kind: "row" as const,
      code: row.code,
      name: rowTr?.name ?? row.name,
      infoType: "text" as const,
      lines: lines.map((text) => ({ text })),
    };
  });
}
