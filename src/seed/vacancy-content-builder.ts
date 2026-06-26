import { randomUUID } from "node:crypto";
import type { SeedLocale } from "./i18n/catalog";
import {
  getVacancyContentCopy,
  type VacancyContentCopy,
} from "./i18n/vacancies";
import type { SeedVacancyContentKey } from "./vacancies-data";

type LexicalChild = Record<string, unknown>;

function textNode(text: string): LexicalChild {
  return {
    type: "text",
    detail: 0,
    format: 0,
    mode: "normal",
    style: "",
    text,
    version: 1,
  };
}

function paragraph(text: string): LexicalChild {
  return {
    type: "paragraph",
    children: [textNode(text)],
    direction: "ltr",
    format: "",
    indent: 0,
    textFormat: 0,
    textStyle: "",
    version: 1,
  };
}

function heading(text: string, tag: "h2" | "h3" = "h2"): LexicalChild {
  return {
    type: "heading",
    tag,
    children: [textNode(text)],
    direction: "ltr",
    format: "",
    indent: 0,
    version: 1,
  };
}

function listItem(text: string): LexicalChild {
  return {
    type: "listitem",
    children: [paragraph(text)],
    direction: "ltr",
    format: "",
    indent: 0,
    value: 1,
    version: 1,
  };
}

function bulletList(items: string[]): LexicalChild {
  return {
    type: "list",
    listType: "bullet",
    tag: "ul",
    children: items.map((item) => listItem(item)),
    direction: "ltr",
    format: "",
    indent: 0,
    start: 1,
    version: 1,
  };
}

function imageBlock(
  mediaId: number | string,
  aspect: "wide" | "banner",
  caption?: string,
  size: "full" | "large" | "medium" | "small" = "full",
): LexicalChild {
  const id = randomUUID();
  return {
    type: "block",
    format: "",
    version: 2,
    fields: {
      id,
      blockName: "",
      blockType: "vacancyImage",
      image: mediaId,
      size,
      aspect,
      align: "left",
      caption: caption ?? "",
    },
  };
}

function twoColumnsBlock(options: {
  leftTitle?: string;
  leftItems: string[];
  rightTitle?: string;
  rightItems: string[];
}): LexicalChild {
  const id = randomUUID();
  return {
    type: "block",
    format: "",
    version: 2,
    fields: {
      id,
      blockName: "",
      blockType: "vacancyTwoColumns",
      leftTitle: options.leftTitle ?? "",
      leftItems: options.leftItems.map((text) => ({ text })),
      rightTitle: options.rightTitle ?? "",
      rightItems: options.rightItems.map((text) => ({ text })),
    },
  };
}

export function buildVacancyContent(children: LexicalChild[]) {
  return {
    root: {
      type: "root",
      children,
      direction: "ltr",
      format: "",
      indent: 0,
      version: 1,
    },
  };
}

export type VacancyContentMedia = {
  heroId?: number | string;
  bannerId?: number | string;
};

function pick(values: string[], index: number, fallback = ""): string {
  return values[index] ?? fallback;
}

function buildFromVacancyCopy(
  contentKey: SeedVacancyContentKey,
  copy: VacancyContentCopy,
  media: VacancyContentMedia,
) {
  const nodes: LexicalChild[] = [];

  if (media.heroId) {
    nodes.push(imageBlock(media.heroId, "wide"));
  }

  switch (contentKey) {
    case "turner": {
      nodes.push(
        heading(pick(copy.headings, 0)),
        paragraph(pick(copy.paragraphs, 0)),
        heading(pick(copy.headings, 1)),
        paragraph(pick(copy.paragraphs, 1)),
        paragraph(pick(copy.paragraphs, 2)),
        bulletList(copy.bulletLists?.[0] ?? []),
        heading(pick(copy.headings, 2)),
        paragraph(pick(copy.paragraphs, 3)),
        bulletList(copy.bulletLists?.[1] ?? []),
        heading(pick(copy.headings, 3)),
        bulletList(copy.bulletLists?.[2] ?? []),
      );
      break;
    }
    case "accountant": {
      nodes.push(
        heading(pick(copy.headings, 0)),
        paragraph(pick(copy.paragraphs, 0)),
        heading(pick(copy.headings, 1)),
        paragraph(pick(copy.paragraphs, 1)),
        bulletList(copy.bulletLists?.[0] ?? []),
      );
      if (copy.twoColumns) {
        nodes.push(twoColumnsBlock(copy.twoColumns));
      }
      break;
    }
    case "design-engineer": {
      nodes.push(
        heading(pick(copy.headings, 0)),
        paragraph(pick(copy.paragraphs, 0)),
        heading(pick(copy.headings, 1)),
        paragraph(pick(copy.paragraphs, 1)),
        bulletList(copy.bulletLists?.[0] ?? []),
        heading(pick(copy.headings, 2)),
        paragraph(pick(copy.paragraphs, 2)),
        bulletList(copy.bulletLists?.[1] ?? []),
        heading(pick(copy.headings, 3)),
        bulletList(copy.bulletLists?.[2] ?? []),
      );
      break;
    }
    case "quality-inspector": {
      nodes.push(
        heading(pick(copy.headings, 0)),
        paragraph(pick(copy.paragraphs, 0)),
        heading(pick(copy.headings, 1)),
        paragraph(pick(copy.paragraphs, 1)),
        bulletList(copy.bulletLists?.[0] ?? []),
      );
      if (copy.twoColumns) {
        nodes.push(twoColumnsBlock(copy.twoColumns));
      }
      break;
    }
  }

  if (media.bannerId) {
    nodes.push(imageBlock(media.bannerId, "banner"));
  }

  return buildVacancyContent(nodes);
}

export function buildTurnerContent(
  media: VacancyContentMedia,
  locale?: SeedLocale,
) {
  if (locale) {
    return buildFromVacancyCopy("turner", getVacancyContentCopy("turner", locale), media);
  }
  const nodes: LexicalChild[] = [];

  if (media.heroId) {
    nodes.push(imageBlock(media.heroId, "wide"));
  }

  nodes.push(
    heading("Работа на стабильном машиностроительном производстве"),
    paragraph(
      "АО «Очёрский машиностроительный завод» приглашает токаря-универсала в производственный цех. Работа с деталями для нефтепромыслового оборудования, металлоконструкций и нестандартных изделий по чертежам.",
    ),
    heading("Обязанности:"),
    paragraph(
      "Изготавливать и обрабатывать детали на токарных станках по конструкторской документации. Выполнять точение, расточку, нарезание резьбы, подгонку деталей и контроль размеров измерительным инструментом.",
    ),
    paragraph("Дополнительно:"),
    bulletList([
      "работа с металлическими заготовками",
      "чтение чертежей",
      "соблюдение технологических процессов",
      "контроль качества готовых деталей",
    ]),
    heading("Требования:"),
    paragraph(
      "Нам нужен специалист, который уверенно работает на токарном оборудовании, понимает чертежи и аккуратно относится к качеству обработки.",
    ),
    bulletList([
      "опыт работы токарем",
      "знание измерительного инструмента",
      "умение читать чертежи",
      "ответственность и внимательность",
      "соблюдение техники безопасности",
    ]),
    heading("Условия работы:"),
    bulletList([
      "официальное трудоустройство",
      "стабильная работа на действующем заводе",
      "современная производственная база",
      "своевременная выплата заработной платы",
      "работа в команде опытных специалистов",
      "возможность профессионального роста",
    ]),
  );

  if (media.bannerId) {
    nodes.push(imageBlock(media.bannerId, "banner"));
  }

  return buildVacancyContent(nodes);
}

export function buildAccountantContent(
  media: VacancyContentMedia,
  locale?: SeedLocale,
) {
  if (locale) {
    return buildFromVacancyCopy(
      "accountant",
      getVacancyContentCopy("accountant", locale),
      media,
    );
  }
  const nodes: LexicalChild[] = [];

  if (media.heroId) {
    nodes.push(imageBlock(media.heroId, "wide"));
  }

  nodes.push(
    heading("Стабильная работа в финансовой службе завода"),
    paragraph(
      "АО «Очёрский машиностроительный завод» ищет бухгалтера для ведения учёта и отчётности. Работа с первичной документацией, расчётами с контрагентами и подготовкой регламентированной отчётности.",
    ),
    heading("Обязанности:"),
    paragraph(
      "Вести бухгалтерский и налоговый учёт, начислять заработную плату, контролировать первичные документы и формировать отчётность в установленные сроки.",
    ),
    bulletList([
      "работа с 1С и электронным документооборотом",
      "взаимодействие с банками и контрагентами",
      "контроль дебиторской и кредиторской задолженности",
    ]),
    twoColumnsBlock({
      leftTitle: "Требования:",
      leftItems: [
        "опыт бухгалтерского учёта от 3 лет",
        "знание налогового законодательства",
        "внимательность к деталям",
        "ответственность и аккуратность",
      ],
      rightTitle: "Условия:",
      rightItems: [
        "официальное трудоустройство",
        "полный рабочий день",
        "стабильная заработная плата",
        "дружный коллектив",
      ],
    }),
  );

  if (media.bannerId) {
    nodes.push(imageBlock(media.bannerId, "banner"));
  }

  return buildVacancyContent(nodes);
}

export function buildDesignEngineerContent(
  media: VacancyContentMedia,
  locale?: SeedLocale,
) {
  if (locale) {
    return buildFromVacancyCopy(
      "design-engineer",
      getVacancyContentCopy("design-engineer", locale),
      media,
    );
  }
  const nodes: LexicalChild[] = [];

  if (media.heroId) {
    nodes.push(imageBlock(media.heroId, "wide"));
  }

  nodes.push(
    heading("Проектирование оборудования для нефтегазовой отрасли"),
    paragraph(
      "Приглашаем инженера-конструктора для разработки конструкторской документации на нефтепромысловое и металлообрабатывающее оборудование. Сопровождение изделий от идеи до серийного производства.",
    ),
    heading("Обязанности:"),
    paragraph(
      "Разрабатывать 3D-модели и чертежи, согласовывать конструкцию с технологами и производством, участвовать в испытаниях и доработке узлов.",
    ),
    bulletList([
      "работа в KOMPAS-3D / SolidWorks",
      "подготовка спецификаций и ведомостей",
      "участие в рассмотрении технических заданий",
    ]),
    heading("Требования:"),
    paragraph(
      "Ищем инженера с опытом проектирования металлоконструкций или нестандартного оборудования, умеющего работать с нормативной документацией.",
    ),
    bulletList([
      "высшее техническое образование",
      "опыт конструкторской работы от 1 года",
      "уверенное чтение чертежей и ГОСТ",
      "системность и внимание к деталям",
    ]),
    heading("Условия работы:"),
    bulletList([
      "официальное трудоустройство",
      "инженерный отдел с современным ПО",
      "участие в интересных проектах завода",
      "возможность профессионального роста",
    ]),
  );

  if (media.bannerId) {
    nodes.push(imageBlock(media.bannerId, "banner"));
  }

  return buildVacancyContent(nodes);
}

export function buildQualityInspectorContent(
  media: VacancyContentMedia,
  locale?: SeedLocale,
) {
  if (locale) {
    return buildFromVacancyCopy(
      "quality-inspector",
      getVacancyContentCopy("quality-inspector", locale),
      media,
    );
  }
  const nodes: LexicalChild[] = [];

  if (media.heroId) {
    nodes.push(imageBlock(media.heroId, "wide"));
  }

  nodes.push(
    heading("Контроль качества на всех этапах производства"),
    paragraph(
      "АО «Очёрский машиностроительный завод» приглашает контролёра ОТК для входного, операционного и приёмочного контроля. Работа с измерительным инструментом и протоколами качества.",
    ),
    heading("Обязанности:"),
    paragraph(
      "Проводить контроль заготовок и готовых изделий, оформлять протоколы, выявлять несоответствия и взаимодействовать с производственными участками.",
    ),
    bulletList([
      "работа с штангенциркулем, микрометром, нутромером",
      "ведение журналов контроля",
      "участие в разборе рекламаций",
    ]),
    twoColumnsBlock({
      leftTitle: "Требования:",
      leftItems: [
        "опыт работы в ОТК от 1 года",
        "знание методов контроля",
        "внимательность и аккуратность",
        "соблюдение техники безопасности",
      ],
      rightTitle: "Условия:",
      rightItems: [
        "сменный график",
        "официальное трудоустройство",
        "стабильная работа на заводе",
        "своевременная оплата труда",
      ],
    }),
  );

  if (media.bannerId) {
    nodes.push(imageBlock(media.bannerId, "banner"));
  }

  return buildVacancyContent(nodes);
}
