import type { StaticImageData } from "next/image";
import type { ReactNode } from "react";
import { GiLadder, GiOilPump, GiPipes } from "react-icons/gi";
import bashneftImage from "../_assets/bashneft.webp";
import gazpromImage from "../_assets/gazprom.webp";
import lavneneftImage from "../_assets/lavneft.webp";
import lykoilImage from "../_assets/lykoil.webp";
import nornikelImage from "../_assets/nornikel.webp";
import rosneftImage from "../_assets/rosneft.webp";
import sibImage from "../_assets/sib.png";
import staletImage from "../_assets/stalet.png";
import syrgytneftImage from "../_assets/syrgytneft.webp";
import tatneftImage from "../_assets/tatneft.webp";
import transNeftImage from "../_assets/trans.png";
import uralkaliImage from "../_assets/uralkali.webp";
import {
  type CompanyStat,
  type CompanyStatKey,
  companyStats,
} from "@/shared/lib/company-stats.shared";

export type FactoryWorkshopKey = "oilfield" | "metal" | "building";

export type FactoryItem = {
  workshopKey: FactoryWorkshopKey;
  width: number;
  height: number;
  href: string;
  image: ReactNode;
};

export type CatalogItem = {
  title: string;
  items: { name: string; href: string }[];
};

export type PressCenterItem = {
  title: string;
  description: string;
  date: string;
  dateIso: string;
  href: string;
};

export type Partner = {
  src: StaticImageData;
  alt: string;
  width: number;
  height: number;
};

export const factoryItems: FactoryItem[] = [
  {
    workshopKey: "oilfield",
    width: 93,
    height: 126,
    href: "/production/oilfield-equipment",
    image: <GiOilPump />,
  },
  {
    workshopKey: "metal",
    width: 126,
    height: 126,
    href: "/production/metal-structures",
    image: <GiPipes />,
  },
  {
    workshopKey: "building",
    width: 124,
    height: 132,
    href: "/production/building-structures",
    image: <GiLadder />,
  },
];

export type FactoryFactKey = CompanyStatKey;

export type FactoryFact = CompanyStat;

export const factoryFacts: FactoryFact[] = companyStats;

export const catalogItems: CatalogItem[] = [
  {
    title: "центраторы",
    items: [{ name: "центратор 1", href: "/catalog/centrators/1" }],
  },
  {
    title: "центраторы",
    items: [{ name: "центратор 1", href: "/catalog/centrators/1" }],
  },
  {
    title: "центраторы",
    items: [{ name: "centратор 1", href: "/catalog/centrators/1" }],
  },
  {
    title: "центраторы",
    items: [{ name: "центратор 1", href: "/catalog/centrators/1" }],
  },
];

export const pressCenterItems: PressCenterItem[] = [
  {
    title: "Модернизация термоагрегата",
    description:
      "Модернизация производства — это неотъемлемая часть инвестиционной... ",
    date: "10 декабря 2024",
    dateIso: "2024-12-10",
    href: "/news/1",
  },
  {
    title: "Начало отгрузок для ПАО НОВАТЭК",
    description:
      "АО «ОМЗ» начал отгрузки продукции для ведущего партнера ПАО НОВАТЭК, в частности...",
    date: "10 ноября 2024",
    dateIso: "2024-11-10",
    href: "/news/2",
  },
  {
    title: "Интервью генерального директора АО «ОМЗ» для РБК Пермь",
    description:
      "Генеральный директор АО «ОМЗ» Нуждин Александр Вячеславович...",
    date: "18 сентября 2024",
    dateIso: "2024-09-18",
    href: "/news/3",
  },
  {
    title: "Модернизация термоагрегата",
    description:
      "Модернизация производства — это неотъемлемая часть инвестиционной...",
    date: "10 декабря 2024",
    dateIso: "2024-12-10",
    href: "/news/4",
  },
  {
    title: "Начало отгрузок для ПАО НОВАТЭК",
    description:
      "АО «ОМЗ» начал отгрузки продукции для ведущего партнера ПАО НОВАТЭК, в частности...",
    date: "10 ноября 2024",
    dateIso: "2024-11-10",
    href: "/news/5",
  },
  {
    title: "Интервью генерального директора АО «ОМЗ» для РБК Пермь",
    description:
      "Генеральный директор АО «ОМЗ» Нуждин Александр Вячеславович...",
    date: "18 сентября 2024",
    dateIso: "2024-09-18",
    href: "/news/6",
  },
];

export const partners: Partner[] = [
  { src: gazpromImage, alt: "Газпром", width: 178, height: 87 },
  { src: rosneftImage, alt: "Роснефть", width: 205, height: 106 },
  { src: lykoilImage, alt: "Лукоил", width: 232, height: 75 },
  { src: bashneftImage, alt: "Башнефть", width: 178, height: 116 },
  { src: syrgytneftImage, alt: "Сургутнефть", width: 181, height: 101 },
  { src: tatneftImage, alt: "Татнефть", width: 216, height: 68 },
  { src: uralkaliImage, alt: "Уралкалий", width: 176, height: 115 },
  { src: nornikelImage, alt: "Норникель", width: 184, height: 105 },
  { src: lavneneftImage, alt: "Лавнефть", width: 199, height: 51 },
  { src: transNeftImage, alt: "Транснефть", width: 216, height: 57 },
  {
    src: staletImage,
    alt: "Сталелитейная промышленность",
    width: 246,
    height: 30,
  },
  { src: sibImage, alt: "Сибирская нефть", width: 210, height: 88 },
];
