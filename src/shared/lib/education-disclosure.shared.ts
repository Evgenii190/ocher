export const EDUCATION_DISCLOSURE_TAG = "education-disclosure";

export type EducationDocumentLink = {
  label: string;
  href?: string;
  variant: "filled" | "outline";
};

export type EducationRow =
  | {
      kind: "section";
      title: string;
      titleStyle?: "default" | "compact";
    }
  | {
      kind: "row";
      code?: string;
      name: string;
      info:
        | { type: "text"; lines: string[] }
        | { type: "link"; lines: string[]; href?: string }
        | { type: "documents"; items: EducationDocumentLink[] };
    };
