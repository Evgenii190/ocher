export type SeedVacancyType = {
  title: string;
  slug: string;
  order: number;
};

export type SeedVacancyCategory = {
  title: string;
  slug: string;
  typeSlug: string;
  description: string;
  salaryFrom: number;
  imageFile?: string;
  publishedAt: string;
  order: number;
};

export type SeedVacancyContentKey =
  | "turner"
  | "accountant"
  | "design-engineer"
  | "quality-inspector";

export type SeedVacancy = {
  title: string;
  slug: string;
  subtitle?: string;
  description: string;
  categorySlug: string;
  typeSlug: string;
  salaryFrom?: number;
  salaryText?: string;
  schedule?: string;
  experience?: string;
  location?: string;
  contentKey: SeedVacancyContentKey;
  heroImageFile?: string;
  bannerImageFile?: string;
  publishedAt: string;
  order: number;
};

export const seedVacancyTypes: SeedVacancyType[] = [
  { title: "Офис", slug: "office", order: 0 },
  { title: "Производство", slug: "production", order: 1 },
  { title: "Инженерия", slug: "engineering", order: 2 },
  { title: "Контроль качества", slug: "quality-control", order: 3 },
];

export const seedVacancyCategories: SeedVacancyCategory[] = [
  {
    title: "Административно управленческий персонал",
    slug: "admin-personnel",
    typeSlug: "office",
    description:
      "Вакансии руководящего состава и специалистов административных служб",
    salaryFrom: 70_000,
    imageFile: "admin-personnel.png",
    publishedAt: "2026-08-10",
    order: 0,
  },
  {
    title: "Производственный персонал",
    slug: "production-personnel",
    typeSlug: "production",
    description: "Специалисты основного и вспомогательного производства завода",
    salaryFrom: 65_000,
    imageFile: "engineering-personnel.png",
    publishedAt: "2026-08-10",
    order: 1,
  },
  {
    title: "Инженерно технический персонал",
    slug: "engineering-personnel",
    typeSlug: "engineering",
    description:
      "Инженеры, технологи, конструкторы и другие технические специалисты",
    salaryFrom: 70_000,
    imageFile: "engineering-personnel.png",
    publishedAt: "2026-08-10",
    order: 2,
  },
  {
    title: "Контроль качества",
    slug: "quality-control",
    typeSlug: "quality-control",
    description:
      "Если вас интересуют вакансии контроля качества, например контролер",
    salaryFrom: 70_000,
    imageFile: "quality-control.png",
    publishedAt: "2026-08-10",
    order: 3,
  },
];

export const seedVacancies: SeedVacancy[] = [
  {
    title: "Токарь-универсал",
    slug: "turner",
    subtitle: "5–6 разряд, универсальные и токарные станки",
    description:
      "Изготовление и доработка деталей на универсальных и токарных станках, работа по чертежам, контроль размеров и соблюдение технологических требований.",
    categorySlug: "production-personnel",
    typeSlug: "production",
    salaryText: "по результатам собеседования",
    schedule: "сменный / полный день",
    experience: "от 1 года",
    location: "г. Очёр, ул. Малышева, 1",
    contentKey: "turner",
    heroImageFile: "detail/turner-hero-79aabc.png",
    bannerImageFile: "detail/turner-bottom.png",
    publishedAt: "2026-08-10",
    order: 0,
  },
  {
    title: "Бухгалтер",
    slug: "accountant",
    subtitle: "учёт и отчётность",
    description:
      "Ведение бухгалтерского и налогового учёта, работа с первичной документацией, начисление заработной платы и подготовка отчётности в установленные сроки.",
    categorySlug: "admin-personnel",
    typeSlug: "office",
    salaryFrom: 70_000,
    schedule: "полный день",
    experience: "от 3 лет",
    location: "г. Очёр, ул. Малышева, 1",
    contentKey: "accountant",
    heroImageFile: "detail/accountant-office.png",
    bannerImageFile: "detail/accountant-office.png",
    publishedAt: "2026-08-10",
    order: 0,
  },
  {
    title: "Инженер-конструктор",
    slug: "design-engineer",
    subtitle: "проектирование и сопровождение производства",
    description:
      "Разработка конструкторской документации на нефтепромысловое и металлообрабатывающее оборудование, согласование чертежей и сопровождение изделий в производстве.",
    categorySlug: "engineering-personnel",
    typeSlug: "engineering",
    salaryFrom: 95_000,
    schedule: "полный день",
    experience: "от 1 года",
    location: "г. Очёр, ул. Малышева, 1",
    contentKey: "design-engineer",
    heroImageFile: "detail/design-engineer.png",
    bannerImageFile: "detail/engineer-workplace.png",
    publishedAt: "2026-08-10",
    order: 0,
  },
  {
    title: "Контролёр ОТК",
    slug: "quality-inspector",
    subtitle: "входной и операционный контроль",
    description:
      "Контроль качества заготовок и готовых изделий, работа с измерительным инструментом, оформление протоколов и выявление несоответствий на этапах производства.",
    categorySlug: "quality-control",
    typeSlug: "quality-control",
    salaryFrom: 70_000,
    schedule: "сменный график",
    experience: "от 1 года",
    location: "г. Очёр, ул. Малышева, 1",
    contentKey: "quality-inspector",
    heroImageFile: "detail/quality-inspector.png",
    bannerImageFile: "detail/quality-inspector.png",
    publishedAt: "2026-08-10",
    order: 0,
  },
];
