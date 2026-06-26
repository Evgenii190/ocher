import { randomUUID } from "node:crypto";
import {
  getNewsContentCopy,
  type NewsContentCopy,
} from "./i18n/news";
import type { SeedLocale } from "./i18n/catalog";
import {
  buildVacancyContent,
  type VacancyContentMedia,
} from "./vacancy-content-builder";

type LexicalChild = Record<string, unknown>;

function paragraph(text: string): LexicalChild {
  return {
    type: "paragraph",
    children: [
      {
        type: "text",
        detail: 0,
        format: 0,
        mode: "normal",
        style: "",
        text,
        version: 1,
      },
    ],
    direction: "ltr",
    format: "",
    indent: 0,
    textFormat: 0,
    textStyle: "",
    version: 1,
  };
}

function heading(text: string): LexicalChild {
  return {
    type: "heading",
    tag: "h2",
    children: [
      {
        type: "text",
        detail: 0,
        format: 0,
        mode: "normal",
        style: "",
        text,
        version: 1,
      },
    ],
    direction: "ltr",
    format: "",
    indent: 0,
    version: 1,
  };
}

function imageBlock(
  mediaId: number | string,
  aspect: "wide" | "banner" = "wide",
): LexicalChild {
  return {
    type: "block",
    format: "",
    version: 2,
    fields: {
      id: randomUUID(),
      blockName: "",
      blockType: "vacancyImage",
      image: mediaId,
      size: "full",
      aspect,
      align: "left",
      caption: "",
    },
  };
}

function buildFromCopy(
  copy: NewsContentCopy,
  media: VacancyContentMedia,
  withBanner = false,
) {
  const nodes: LexicalChild[] = [];
  if (media.heroId) {
    nodes.push(imageBlock(media.heroId));
  }

  for (const [index, headingText] of copy.headings.entries()) {
    nodes.push(heading(headingText));
    const paragraphText = copy.paragraphs[index];
    if (paragraphText) {
      nodes.push(paragraph(paragraphText));
    }
  }

  const remainingParagraphs = copy.paragraphs.slice(copy.headings.length);
  for (const text of remainingParagraphs) {
    nodes.push(paragraph(text));
  }

  if (withBanner && media.bannerId) {
    nodes.push(imageBlock(media.bannerId, "banner"));
  }

  return buildVacancyContent(nodes);
}

function buildModernizationContent(media: VacancyContentMedia) {
  const nodes: LexicalChild[] = [];
  if (media.heroId) nodes.push(imageBlock(media.heroId));
  nodes.push(
    heading("Инвестиции в энергоэффективность"),
    paragraph(
      "На АО «Очёрский машиностроительный завод» завершена модернизация термоагрегата в цехе металлоконструкций. Обновление позволит снизить расход топлива и стабилизировать температурный режим при термической обработке деталей.",
    ),
    paragraph(
      "Работы выполнены силами инженерной службы предприятия совместно с подрядчиком. Новое оборудование соответствует действующим нормам промышленной безопасности и экологическим требованиям.",
    ),
  );
  if (media.bannerId) nodes.push(imageBlock(media.bannerId, "banner"));
  return buildVacancyContent(nodes);
}

function buildNovatekContent(media: VacancyContentMedia) {
  const nodes: LexicalChild[] = [];
  if (media.heroId) nodes.push(imageBlock(media.heroId));
  nodes.push(
    heading("Расширение партнёрской программы"),
    paragraph(
      "АО «ОМЗ» начало серийные отгрузки комплектующих для нефтепромыслового оборудования в адрес ПАО «НОВАТЭК». Поставки включают узлы для наземного и промыслового оборудования, изготовленные на производственных площадках завода в Очёре.",
    ),
    paragraph(
      "Контракт подтверждает доверие к качеству продукции предприятия и открывает возможности для дальнейшего увеличения объёмов кооперации.",
    ),
  );
  return buildVacancyContent(nodes);
}

function buildInterviewContent(media: VacancyContentMedia) {
  const nodes: LexicalChild[] = [];
  if (media.heroId) nodes.push(imageBlock(media.heroId));
  nodes.push(
    heading("О развитии предприятия и кадровой политике"),
    paragraph(
      "В интервью для РБК Пермь генеральный директор АО «ОМЗ» рассказал о приоритетах инвестиционной программы, модернизации производственных мощностей и привлечении молодых специалистов на завод.",
    ),
    paragraph(
      "По словам руководителя, ключевым фактором устойчивого роста остаётся команда: предприятие продолжает развивать программы обучения, наставничества и социальной поддержки сотрудников.",
    ),
  );
  return buildVacancyContent(nodes);
}

function buildMetallurgDayContent(media: VacancyContentMedia) {
  const nodes: LexicalChild[] = [];
  if (media.heroId) nodes.push(imageBlock(media.heroId));
  nodes.push(
    heading("Праздник для тех, кто создаёт металл"),
    paragraph(
      "День металлурга на заводе традиционно собирает сотрудников всех цехов. В этом году лучшие работники получили благодарности и памятные награды за вклад в развитие производства.",
    ),
    paragraph(
      "Для молодых специалистов организовали экскурсии по ключевым участкам — от заготовительного до сборочного цеха.",
    ),
  );
  return buildVacancyContent(nodes);
}

function buildNewLineContent(media: VacancyContentMedia) {
  const nodes: LexicalChild[] = [];
  if (media.heroId) nodes.push(imageBlock(media.heroId));
  nodes.push(
    heading("Новые возможности для заказчиков"),
    paragraph(
      "Запуск линии обработки деталей позволяет выполнять более сложные операции на одной технологической цепочке: фрезерование, расточку и контроль геометрии без переналадки между участками.",
    ),
    paragraph(
      "Инженеры завода рассчитывают сократить срок изготовления серийных изделий на 15–20% при сохранении требований к точности.",
    ),
  );
  if (media.bannerId) nodes.push(imageBlock(media.bannerId, "banner"));
  return buildVacancyContent(nodes);
}

function buildSportContent() {
  return buildVacancyContent([
    heading("Социальная ответственность предприятия"),
    paragraph(
      "АО «ОМЗ» регулярно поддерживает спортивные инициативы в Очёре. В этом сезоне завод выступил генеральным партнёром городского турнира по волейболу среди команд предприятий и учебных заведений.",
    ),
    paragraph(
      "Для сотрудников предприятия также организованы корпоративные секции и участие в региональных соревнованиях.",
    ),
  ]);
}

function buildSafetyContent(media: VacancyContentMedia) {
  const nodes: LexicalChild[] = [];
  if (media.heroId) nodes.push(imageBlock(media.heroId));
  nodes.push(
    heading("Безопасность — приоритет каждого смены"),
    paragraph(
      "Обновлённая система охраны труда включает цифровой учёт инструктажей, расширенный перечень средств индивидуальной защиты и регулярный аудит рабочих мест.",
    ),
    paragraph(
      "Специалисты службы охраны труда провели обучение бригадиров и мастеров участков с разбором типовых ситуаций на производстве.",
    ),
  );
  return buildVacancyContent(nodes);
}

function buildInternshipContent(media: VacancyContentMedia) {
  const nodes: LexicalChild[] = [];
  if (media.heroId) nodes.push(imageBlock(media.heroId));
  nodes.push(
    heading("Практика на действующем производстве"),
    paragraph(
      "Студенты инженерных специальностей проходят стажировку в конструкторском бюро и на производственных участках под руководством наставников завода.",
    ),
    paragraph(
      "Программа рассчитана на один семестр: участники знакомятся с технологическими процессами, нормативной документацией и системой управления качеством.",
    ),
  );
  return buildVacancyContent(nodes);
}

export function buildNewsContent(
  contentKey: string,
  media: VacancyContentMedia,
  locale?: SeedLocale,
) {
  if (locale) {
    const copy = getNewsContentCopy(contentKey, locale);
    if (copy) {
      const withBanner =
        contentKey === "modernization" || contentKey === "new-line";
      return buildFromCopy(copy, media, withBanner);
    }
  }

  switch (contentKey) {
    case "modernization":
      return buildModernizationContent(media);
    case "novatek":
      return buildNovatekContent(media);
    case "interview":
      return buildInterviewContent(media);
    case "metallurg-day":
      return buildMetallurgDayContent(media);
    case "new-line":
      return buildNewLineContent(media);
    case "sport":
      return buildSportContent();
    case "safety":
      return buildSafetyContent(media);
    case "internship":
      return buildInternshipContent(media);
    default:
      return buildModernizationContent(media);
  }
}
