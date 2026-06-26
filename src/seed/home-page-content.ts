import { randomUUID } from "node:crypto";
import { getHomeAboutCopy } from "./i18n/home";
import type { SeedLocale } from "./i18n/catalog";
import { buildVacancyContent } from "./vacancy-content-builder";

type LexicalChild = Record<string, unknown>;

function textNode(text: string, state?: Record<string, string>): LexicalChild {
  return {
    type: "text",
    detail: 0,
    format: 0,
    mode: "normal",
    style: "",
    text,
    version: 1,
    ...(state ? { $: state } : {}),
  };
}

function paragraph(text: string, state?: Record<string, string>): LexicalChild {
  return {
    type: "paragraph",
    children: [textNode(text, state)],
    direction: "ltr",
    format: "",
    indent: 0,
    textFormat: 0,
    textStyle: "",
    version: 1,
  };
}

function richParagraph(children: LexicalChild[]): LexicalChild {
  return {
    type: "paragraph",
    children,
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

function videoBlock(mediaId: number | string, caption?: string): LexicalChild {
  const id = randomUUID();
  return {
    type: "block",
    format: "",
    version: 2,
    fields: {
      id,
      blockName: "",
      blockType: "richTextVideo",
      video: mediaId,
      size: "full",
      aspect: "video",
      caption: caption ?? "",
    },
  };
}

function calloutBlock(options: {
  variant: "primary" | "neutral" | "muted" | "blue" | "green";
  title?: string;
  body: string;
}): LexicalChild {
  const id = randomUUID();
  return {
    type: "block",
    format: "",
    version: 2,
    fields: {
      id,
      blockName: "",
      blockType: "richTextCallout",
      variant: options.variant,
      title: options.title ?? "",
      body: options.body,
    },
  };
}

export function buildHomeAboutContent(
  videoId?: number | string,
  locale?: SeedLocale,
) {
  if (locale) {
    const copy = getHomeAboutCopy(locale);
    const nodes: LexicalChild[] = [
      heading(copy.h1),
      richParagraph([
        textNode(copy.introBefore, {}),
        textNode(copy.introHighlight, { color: "text-primary" }),
        textNode(copy.introAfter),
      ]),
      paragraph(copy.paragraph1),
      ...(videoId ? [videoBlock(videoId, copy.videoCaption)] : []),
      heading(copy.productsHeading),
      paragraph(copy.productsIntro),
      twoColumnsBlock({
        leftTitle: copy.productsLeftTitle,
        leftItems: copy.productsLeftItems,
        rightTitle: copy.productsRightTitle,
        rightItems: copy.productsRightItems,
      }),
      paragraph(copy.paragraph2),
      heading(copy.metalHeading),
      paragraph(copy.metalParagraph1),
      paragraph(copy.metalParagraph2),
      heading(copy.servicesHeading),
      paragraph(copy.servicesIntro),
      twoColumnsBlock({
        leftTitle: copy.servicesLeftTitle,
        leftItems: copy.servicesLeftItems,
        rightTitle: copy.servicesRightTitle,
        rightItems: copy.servicesRightItems,
      }),
      paragraph(copy.servicesParagraph),
      calloutBlock({
        variant: "primary",
        title: copy.calloutTitle,
        body: copy.calloutBody,
      }),
    ];
    return buildVacancyContent(nodes);
  }

  const nodes: LexicalChild[] = [
    heading("Очёрский машиностроительный завод — традиции и инновации"),
    richParagraph([
      textNode("АО «Очёрский машиностроительный завод» (", {}),
      textNode("ОМЗ", { color: "text-primary" }),
      textNode(
        ") — крупное многопрофильное предприятие Пермского края, выпускающее нефтепромысловое оборудование, металлоконструкции и строительные конструкции для внутреннего и зарубежного рынков. Продукция сертифицирована по требованиям API и представлена в Казахстане, Беларуси, Бразилии, Венесуэле, Аргентине, США, Индии и других странах.",
      ),
    ]),
    paragraph(
      "Покупателей привлекают широкий ассортимент, оперативная доставка и выгрузка, а также нацеленность компании на долгосрочное сотрудничество.",
    ),
    ...(videoId
      ? [
          videoBlock(
            videoId,
            "Производственные мощности АО «ОМЗ»: цеха нефтепромыслового оборудования и металлоконструкций",
          ),
        ]
      : []),
    heading("Основные виды продукции"),
    paragraph(
      "АО «ОМЗ» снабжает ПАО «Газпром», «Роснефть», «Лукойл», «Норильский никель» и другие компании. Предприятия любой формы собственности могут заказать:",
    ),
    twoColumnsBlock({
      leftTitle: "Нефтепромысловое оборудование",
      leftItems: [
        "насосные штанги и шарнирные штанги",
        "полированные штоки и муфты",
        "центраторы и штанговращатели",
        "автосцепы и устьевые сальники",
        "зажимы полированных штоков",
      ],
      rightTitle: "Металло- и строительные конструкции",
      rightItems: [
        "опоры трубопроводов и мачты",
        "металлоконструкции зданий и сооружений",
        "сваи, емкости и резервуары",
        "элементы опалубки и строительные лестницы",
        "нестандартные изделия по чертежам",
      ],
    }),
    paragraph(
      "Перечень продукции постоянно расширяется: освоены автосцепы, штанговращатели и центраторы. Выполняем лазерный раскрой, изготавливаем металлоконструкции разной сложности с покрытием краской методом воздушного и безвоздушного распыления для защиты от коррозии.",
    ),
    heading("Производство металлоконструкций"),
    paragraph(
      "На участке металлоконструкций используем сварочное оборудование, аттестованное в НАКС. Полуавтоматы позволяют быстро соединять заготовки любой сложности — клиенты получают прочные опоры, прожекторные и антенные мачты, лестницы для наружной и внутренней установки.",
    ),
    paragraph(
      "Принимаем заказы на нестандартные формы. Разрабатываем уникальные изделия с привлечением инженеров и конструкторов завода.",
    ),
    heading("Услуги ОМЗ"),
    paragraph(
      "Выпускаем детали по техническим заданиям и чертежам заказчиков. В перечень услуг входит:",
    ),
    twoColumnsBlock({
      leftTitle: "Механическая обработка",
      leftItems: [
        "токарные, фрезерные и расточные работы",
        "шлифование на станках с ЧПУ",
        "лазерный раскрой листового металла",
        "изготовление металлоконструкций",
        "ремонт насосных штанг",
      ],
      rightTitle: "Контроль качества",
      rightItems: [
        "испытания по ГОСТ, ТУ, API 11B, API 5CT",
        "исследование микроструктуры металла",
        "анализ химического состава стали",
        "испытания на ударный изгиб",
        "операционный и приёмочный контроль ОТК",
      ],
    }),
    paragraph(
      "Широкий спектр услуг дополняется ремонтом насосных штанг для нефтедобывающих предприятий — возвращаем дорогостоящее оборудование в эксплуатацию в кратчайшие сроки.",
    ),
    calloutBlock({
      variant: "primary",
      title: "Нужна консультация?",
      body: "Ознакомьтесь с каталогом продукции или свяжитесь с нашими специалистами — предоставим бесплатную консультацию и ответим на вопросы в полном объёме.",
    }),
  ];

  return buildVacancyContent(nodes);
}
