import { toMailtoHref, toTelHref } from "./phone";

export const SITE_CONTACTS_TAG = "site-contacts";

export type SiteContactLink = {
  label: string;
  href: string;
};

export type SiteOfficeContact = {
  id: string;
  city: string;
  phone: SiteContactLink;
};

export type SiteContacts = {
  headerPhone: SiteContactLink;
  headerEmail: SiteContactLink;
  hotlinePhone: SiteContactLink;
  hotlineEmail: SiteContactLink;
  generalEmail: SiteContactLink;
  commercialEmail: SiteContactLink;
  workingHours: string[];
  offices: SiteOfficeContact[];
};

export const defaultSiteContacts: SiteContacts = {
  headerPhone: {
    label: "+7 (342) 232-01-72",
    href: toTelHref("+7 (342) 232-01-72"),
  },
  headerEmail: {
    label: "omz@ocher.ru",
    href: toMailtoHref("omz@ocher.ru"),
  },
  hotlinePhone: {
    label: "+7 (495) 123-36-13",
    href: toTelHref("+7 (495) 123-36-13"),
  },
  hotlineEmail: {
    label: "hotline@ocher.ru",
    href: toMailtoHref("hotline@ocher.ru"),
  },
  generalEmail: {
    label: "info@ocher.ru",
    href: toMailtoHref("info@ocher.ru"),
  },
  commercialEmail: {
    label: "info@ocher.ru",
    href: toMailtoHref("info@ocher.ru"),
  },
  workingHours: ["Пн-Пт, с 08:00 до 20:00", "Сб-Вс, с 10:00 до 14:00"],
  offices: [
    {
      id: "perm",
      city: "г. Пермь",
      phone: {
        label: "+7 (967) 782-87-00",
        href: toTelHref("+7 (967) 782-87-00"),
      },
    },
    {
      id: "moscow-1",
      city: "г. Москва",
      phone: {
        label: "+7 (967) 782-87-00",
        href: toTelHref("+7 (967) 782-87-00"),
      },
    },
    {
      id: "moscow-2",
      city: "г. Москва",
      phone: {
        label: "+7 (967) 782-87-00",
        href: toTelHref("+7 (967) 782-87-00"),
      },
    },
  ],
};
