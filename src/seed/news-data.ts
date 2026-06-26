export type SeedNewsCategory = {
  title: string;
  slug: string;
  order: number;
};

export type SeedNews = {
  title: string;
  slug: string;
  description: string;
  categorySlug: string;
  publishedAt: string;
  order: number;
  cardImageFile: string;
  heroImageFile?: string;
  bannerImageFile?: string;
  contentKey:
    | "modernization"
    | "novatek"
    | "interview"
    | "metallurg-day"
    | "new-line"
    | "sport"
    | "safety"
    | "internship";
};

export const seedNewsCategories: SeedNewsCategory[] = [
  { title: "Жизнь завода", slug: "zhizn-zavoda", order: 0 },
  { title: "Производство", slug: "proizvodstvo", order: 1 },
  { title: "Партнёры", slug: "partnery", order: 2 },
  { title: "Команда и кадры", slug: "kadry", order: 3 },
  { title: "Обучение", slug: "obuchenie", order: 4 },
  { title: "Экология и безопасность", slug: "ekologiya", order: 5 },
];

export const seedNews: SeedNews[] = [
  {
    title: "Модернизация термоагрегата",
    slug: "modernizaciya-termoagregata",
    description:
      "Модернизация производства — неотъемлемая часть инвестиционной программы завода. Обновлённый термоагрегат повысит энергоэффективность цеха.",
    categorySlug: "proizvodstvo",
    publishedAt: "2024-12-10",
    order: 0,
    cardImageFile: "engineering-personnel-1.png",
    heroImageFile: "engineering-personnel-2.png",
    bannerImageFile: "engineering-personnel-3.png",
    contentKey: "modernization",
  },
  {
    title: "Начало отгрузок для ПАО «НОВАТЭК»",
    slug: "otgruzki-novatek",
    description:
      "АО «ОМЗ» начал отгрузки продукции для ведущего партнёра ПАО «НОВАТЭК»: комплектующие для нефтепромыслового оборудования.",
    categorySlug: "partnery",
    publishedAt: "2024-11-10",
    order: 1,
    cardImageFile: "engineer-workplace-1.png",
    heroImageFile: "engineer-workplace-2.png",
    contentKey: "novatek",
  },
  {
    title: "Интервью генерального директора для РБК Пермь",
    slug: "intervyu-generalnogo-direktora",
    description:
      "Генеральный директор АО «ОМЗ» рассказал о планах развития предприятия, инвестициях в производство и кадровой политике.",
    categorySlug: "zhizn-zavoda",
    publishedAt: "2024-09-18",
    order: 2,
    cardImageFile: "admin-personnel-1.png",
    heroImageFile: "admin-personnel-2.png",
    contentKey: "interview",
  },
  {
    title: "День металлурга на заводе",
    slug: "den-metallurga",
    description:
      "Коллектив АО «ОМЗ» отметил профессиональный праздник: награды лучшим сотрудникам, экскурсии по цехам и праздничная программа.",
    categorySlug: "zhizn-zavoda",
    publishedAt: "2024-07-19",
    order: 3,
    cardImageFile: "engineering-personnel-4.png",
    heroImageFile: "engineering-personnel-5.png",
    contentKey: "metallurg-day",
  },
  {
    title: "Запуск новой линии обработки деталей",
    slug: "novaya-liniya-obrabotki",
    description:
      "В цехе металлоконструкций введена в эксплуатацию линия обработки деталей — сокращение цикла изготовления и повышение точности.",
    categorySlug: "proizvodstvo",
    publishedAt: "2024-06-05",
    order: 4,
    cardImageFile: "design-engineer-1.png",
    heroImageFile: "design-engineer-2.png",
    bannerImageFile: "design-engineer-3.png",
    contentKey: "new-line",
  },
  {
    title: "Завод поддержал местный спорт",
    slug: "podderzhka-sporta",
    description:
      "АО «ОМЗ» выступило партнёром городских соревнований по волейболу и лёгкой атлетике среди молодёжи Очёра.",
    categorySlug: "kadry",
    publishedAt: "2024-05-22",
    order: 5,
    cardImageFile: "admin-personnel-3.png",
    contentKey: "sport",
  },
  {
    title: "Внедрение обновлённой системы охраны труда",
    slug: "sistema-ohrany-truda",
    description:
      "На предприятии завершён этап модернизации системы управления охраной труда: новые инструктажи, СИЗ и контроль рабочих мест.",
    categorySlug: "ekologiya",
    publishedAt: "2024-04-12",
    order: 6,
    cardImageFile: "quality-inspector-1.png",
    heroImageFile: "quality-inspector-2.png",
    contentKey: "safety",
  },
  {
    title: "Стажировки для студентов ПГНИУ",
    slug: "stazhirovki-pgniu",
    description:
      "Инженерный отдел завода принимает студентов Пермского государственного национального исследовательского университета.",
    categorySlug: "obuchenie",
    publishedAt: "2024-03-01",
    order: 7,
    cardImageFile: "accountant-office-1.png",
    heroImageFile: "accountant-office-2.png",
    contentKey: "internship",
  },
];
