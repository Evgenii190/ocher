export type CompanyStatKey = "area" | "staff" | "countries" | "directions";

export type CompanyStat = {
  key: CompanyStatKey;
  icon: CompanyStatKey;
};

export const companyStats: CompanyStat[] = [
  { key: "area", icon: "area" },
  { key: "staff", icon: "staff" },
  { key: "countries", icon: "countries" },
  { key: "directions", icon: "directions" },
];
