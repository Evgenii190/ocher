export type DeliveryCountryId =
  | "russia"
  | "kazakhstan"
  | "belarus"
  | "india"
  | "brazil"
  | "argentina"
  | "venezuela"
  | "usa";

export type DeliveryCountry = {
  id: DeliveryCountryId;
};

export const deliveryCountries: DeliveryCountry[] = [
  { id: "russia" },
  { id: "kazakhstan" },
  { id: "belarus" },
  { id: "india" },
  { id: "brazil" },
  { id: "argentina" },
  { id: "venezuela" },
  { id: "usa" },
];

export type DeliveryGeographyStatKey = "countries" | "regions" | "customers";

export const deliveryGeographyStats: {
  statKey: DeliveryGeographyStatKey;
  value: string;
  icon: "globe" | "map-pin" | "factory";
}[] = [
  {
    statKey: "countries",
    value: "8",
    icon: "globe",
  },
  {
    statKey: "regions",
    value: "20+",
    icon: "map-pin",
  },
  {
    statKey: "customers",
    value: "500+",
    icon: "factory",
  },
];
