import type { StaticImageData } from "next/image";
import history1757Image from "../_assets/history-1757-2309ed.png";

export type HistoryEntry = {
  year: number;
  image?: StaticImageData;
  paragraphs: string[];
};

export { history1757Image };

export const historyYears: number[] = [
  1757, 1759, 1761, 1813, 1814, 1835, 1840, 1909, 1911, 1913, 1922, 1930, 1950,
  1975, 1980, 1990, 1997, 2005, 2007, 2009, 2011, 2015, 2016, 2017, 2018, 2022,
  2023, 2024,
];
