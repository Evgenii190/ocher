/** Документы для строк «Ссылка» в таблице сведений об образовательной организации. */
export type EducationLinkDocument = {
  slug: string;
  filename: string;
  /** Ключ — `name` строки из education-disclosure-data.ts */
  rowName: string;
};

/** Документы для кнопок в строке «Локальные нормативные акты». */
export type EducationButtonDocument = {
  slug: string;
  filename: string;
  /** Ключ — `label` кнопки из education-disclosure-data.ts */
  buttonLabel: string;
};

export const educationLinkDocuments: EducationLinkDocument[] = [
  {
    slug: "license-extract",
    filename: "license-extract.pdf",
    rowName: "Лицензии на осуществление образовательной деятельности",
  },
  {
    slug: "charter",
    filename: "charter.pdf",
    rowName: "Устав образовательной организации",
  },
  {
    slug: "labor-rules",
    filename: "labor-rules.pdf",
    rowName: "Правила внутреннего трудового распорядка",
  },
  {
    slug: "collective-agreement",
    filename: "collective-agreement.pdf",
    rowName: "Коллективный договор",
  },
];

export const educationButtonDocuments: EducationButtonDocument[] = [
  {
    slug: "student-schedule",
    filename: "student-schedule.pdf",
    buttonLabel: "Режим занятий обучающихся",
  },
  {
    slug: "admission-rules",
    filename: "admission-rules.pdf",
    buttonLabel: "Правила приема обучающихся",
  },
  {
    slug: "transfer-rules",
    filename: "transfer-rules.pdf",
    buttonLabel: "Порядок и основания перевода",
  },
  {
    slug: "control-periodicity",
    filename: "control-periodicity.pdf",
    buttonLabel: "Периодичность и порядок текущего контроля",
  },
  {
    slug: "professional-ethics",
    filename: "professional-ethics.pdf",
    buttonLabel: "Положение о нормах профессиональной этики педагогических",
  },
  {
    slug: "main-training-program",
    filename: "main-training-program.pdf",
    buttonLabel: "Основная программа профессионального образования",
  },
];

/** Старые моковые PDF из прежнего сида (копии doc.pdf). */
export const educationLegacyFilenames = [
  "education-license.pdf",
  "education-charter.pdf",
  "education-labor-rules.pdf",
  "education-collective.pdf",
  "education-prescription.pdf",
  "education-schedule.pdf",
  "education-admission.pdf",
  "education-transfer.pdf",
  "education-control-periodicity.pdf",
  "education-ethics.pdf",
  "education-main-program.pdf",
  "doc.pdf",
] as const;
