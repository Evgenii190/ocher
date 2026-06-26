export const PROCUREMENT_TAG = "procurement";

export type ProcurementLineItem = {
  name: string;
  quantity?: string;
};

export type ProcurementRow =
  | {
      kind: "group";
      title: string;
      items: ProcurementLineItem[];
    }
  | {
      kind: "row";
      name: string;
      quantity?: string;
    };

export type ProcurementSeedEntry =
  | {
      kind: "group";
      groupTitle: string;
      items: ProcurementLineItem[];
    }
  | {
      kind: "row";
      name: string;
      quantity?: string;
    };
