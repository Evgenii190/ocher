import "server-only";

import config from "@payload-config";
import { unstable_cache } from "next/cache";
import { cache } from "react";
import { getPayload } from "payload";
import { toMailtoHref, toTelHref } from "./phone";
import {
  defaultSiteContacts,
  SITE_CONTACTS_TAG,
  type SiteContactLink,
  type SiteContacts,
  type SiteOfficeContact,
} from "./site-contacts.shared";

export type {
  SiteContactLink,
  SiteContacts,
  SiteOfficeContact,
} from "./site-contacts.shared";
export { SITE_CONTACTS_TAG } from "./site-contacts.shared";

function mapPhone(label: string | null | undefined): SiteContactLink | null {
  if (!label?.trim()) {
    return null;
  }
  return { label: label.trim(), href: toTelHref(label) };
}

function mapEmail(label: string | null | undefined): SiteContactLink | null {
  if (!label?.trim()) {
    return null;
  }
  const trimmed = label.trim();
  return { label: trimmed, href: toMailtoHref(trimmed) };
}

function mergeContacts(partial: Partial<SiteContacts>): SiteContacts {
  return {
    headerPhone: partial.headerPhone ?? defaultSiteContacts.headerPhone,
    headerEmail: partial.headerEmail ?? defaultSiteContacts.headerEmail,
    hotlinePhone: partial.hotlinePhone ?? defaultSiteContacts.hotlinePhone,
    hotlineEmail: partial.hotlineEmail ?? defaultSiteContacts.hotlineEmail,
    generalEmail: partial.generalEmail ?? defaultSiteContacts.generalEmail,
    commercialEmail:
      partial.commercialEmail ?? defaultSiteContacts.commercialEmail,
    workingHours: partial.workingHours?.length
      ? partial.workingHours
      : defaultSiteContacts.workingHours,
    offices: partial.offices?.length
      ? partial.offices
      : defaultSiteContacts.offices,
  };
}

async function fetchSiteContacts(): Promise<SiteContacts> {
  try {
    const payload = await getPayload({ config });
    const data = await payload.findGlobal({
      slug: "site-contacts",
      overrideAccess: false,
    });

    const offices: SiteOfficeContact[] = (
      (data.offices ?? []) as { phone?: string | null; city?: string | null }[]
    ).flatMap((office, index) => {
      const phone = mapPhone(office.phone);
      const city = office.city?.trim();
      if (!phone || !city) {
        return [];
      }
      return [
        {
          id: `${city}-${index}`,
          city,
          phone,
        },
      ];
    });

    const workingHours = String(data.workingHours ?? "")
      .split("\n")
      .map((line: string) => line.trim())
      .filter(Boolean);

    return mergeContacts({
      headerPhone: mapPhone(data.headerPhone) ?? undefined,
      headerEmail: mapEmail(data.headerEmail) ?? undefined,
      hotlinePhone: mapPhone(data.hotlinePhone) ?? undefined,
      hotlineEmail: mapEmail(data.hotlineEmail) ?? undefined,
      generalEmail: mapEmail(data.generalEmail) ?? undefined,
      commercialEmail: mapEmail(data.commercialEmail) ?? undefined,
      workingHours: workingHours.length > 0 ? workingHours : undefined,
      offices: offices.length > 0 ? offices : undefined,
    });
  } catch (error) {
    console.error("[site-contacts] Не удалось загрузить контакты:", error);
    return defaultSiteContacts;
  }
}

const getCachedSiteContacts = unstable_cache(
  fetchSiteContacts,
  ["site-contacts"],
  { tags: [SITE_CONTACTS_TAG] },
);

export const getSiteContacts = cache(getCachedSiteContacts);
