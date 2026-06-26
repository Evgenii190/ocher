import { buildVacancyContent } from "./vacancy-content-builder";
import type { SeedLocale } from "./i18n/catalog";
import { servicesBottomContentTranslations } from "./i18n/services";

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

function heading(text: string): LexicalChild {
  return {
    type: "heading",
    tag: "h2",
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

function pick(values: string[], index: number): string {
  return values[index] ?? "";
}

export function buildServicesBottomContent(locale?: SeedLocale) {
  if (locale) {
    const copy = servicesBottomContentTranslations[locale];
    const nodes: LexicalChild[] = [
      heading(pick(copy.headings, 0)),
      paragraph(pick(copy.paragraphs, 0)),
      paragraph(pick(copy.paragraphs, 1)),
      heading(pick(copy.headings, 1)),
      paragraph(pick(copy.paragraphs, 2)),
      heading(pick(copy.headings, 2)),
      paragraph(pick(copy.paragraphs, 3)),
      heading(pick(copy.headings, 3)),
      paragraph(pick(copy.paragraphs, 4)),
      heading(pick(copy.headings, 4)),
      paragraph(pick(copy.paragraphs, 5)),
      paragraph(pick(copy.paragraphs, 6)),
      bulletList(copy.bulletList ?? []),
      heading(pick(copy.headings, 5)),
      paragraph(pick(copy.paragraphs, 7)),
      heading(pick(copy.headings, 6)),
      paragraph(pick(copy.paragraphs, 8)),
    ];
    return buildVacancyContent(nodes);
  }

  const nodes: LexicalChild[] = [
    heading("Услуги завода ОМЗ"),
    paragraph(
      "АО «Очерский машиностроительный завод» предлагает полный спектр услуг в области производства и ремонта нефтепромыслового оборудования и металлоконструкций, а также производит лабораторные испытания продукции, разрабатывает конструкторскую документацию, осуществляет услуги доставки.",
    ),
    paragraph(
      "Наша компания гарантирует высочайшее качество исполнения и индивидуальный подход к каждому клиенту, обеспечивая надёжность и эффективность на каждом этапе сотрудничества. Мы готовы предложить вам лучшие решения, опираясь на многолетний опыт и профессионализм наших специалистов.",
    ),
    heading("Ремонт насосных штанг"),
    paragraph(
      "Осуществляем глубокий ремонт насосных штанг, применяя инновационные технологии, в том числе метод радиально-сдвиговой винтовой прокатки. Восстанавливаем функциональность изношенных штанг, значительно улучшая их механические характеристики за счёт создания мелкозернистой структуры металла. Результаты глубокого ремонта подтверждаются многочисленными опытно-промышленными испытаниями, что гарантирует повышенную износостойкость и долговечность восстановленного оборудования.",
    ),
    heading("Разработка конструкторской документации"),
    paragraph(
      "Специалисты завода, обладающие высокой квалификацией и опытом в машиностроении, предлагают услуги по разработке конструкторской документации. Используя передовые САПР-системы, инженеры АО «Очерский машиностроительный завод» выполняют всестороннее проектирование и технические расчёты. Это позволяет достигать высокой точности и соответствия требованиям производства при разработке металлоконструкций и сложного оборудования для нефтепромысловой отрасли и других секторов промышленности.",
    ),
    heading("Услуги доставки"),
    paragraph(
      "Выполняем доставку продукции как железнодорожным, так и автомобильным транспортом по всей территории России и за её пределами. Собственная погрузочно-разгрузочная инфраструктура и грузоподъёмное оборудование обеспечивают оперативность и безопасность транспортировки, гарантируя целостность груза на каждом этапе его пути.",
    ),
    heading("Лабораторные испытания"),
    paragraph(
      "Проводим механические испытания металла, металлографические и химические анализы для проверки соответствия продукции стандартам ГОСТ и API. Каждое изделие проходит тщательное тестирование, что подтверждается сертификатами качества.",
    ),
    paragraph("Основные задачи лаборатории:"),
    bulletList([
      "Механические испытания металла — определение физических свойств материалов под нагрузкой",
      "Металлографические анализы — анализ структуры материалов для оценки их микроструктурных характеристик",
      "Химический анализ материалов — точное определение химического состава для проверки качества и соответствия спецификациям",
      "Дополнительные сертификационные тесты — выполнение тестов, необходимых для сертификации продукции по международным и национальным стандартам",
    ]),
    heading("Лазерная и гидроабразивная резка"),
    paragraph(
      "Лазерная или гидроабразивная резка металлов разной толщины позволяет с высокой точностью и эффективностью создавать детали сложной геометрии. Процесс минимизирует отходы материала и сокращает время обработки, что улучшает экономическую эффективность производства. Гладкие края деталей уменьшают необходимость дополнительной отделки, повышая качество готовых изделий.",
    ),
    heading("Круг стальной калиброванный"),
    paragraph(
      "Круг стальной калиброванный производится с точным соблюдением размеров и качества поверхности. Ассортимент включает готовую продукцию и предоставляет возможность изготовления изделий по индивидуальным спецификациям заказчиков. Это обеспечивает гибкость в выборе и высокое качество конечных изделий.",
    ),
  ];

  return buildVacancyContent(nodes);
}
