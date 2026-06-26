import type { Payload } from "payload";
import { defaultSiteContacts } from "@/shared/lib/site-contacts.shared";

export async function seedSiteContacts(payload: Payload) {
  payload.logger.info("🌱 Наполнение контактов сайта…");

  await payload.updateGlobal({
    slug: "site-contacts",
    data: {
      headerPhone: defaultSiteContacts.headerPhone.label,
      headerEmail: defaultSiteContacts.headerEmail.label,
      hotlinePhone: defaultSiteContacts.hotlinePhone.label,
      hotlineEmail: defaultSiteContacts.hotlineEmail.label,
      generalEmail: defaultSiteContacts.generalEmail.label,
      commercialEmail: defaultSiteContacts.commercialEmail.label,
      workingHours: defaultSiteContacts.workingHours.join("\n"),
      offices: defaultSiteContacts.offices.map((office) => ({
        city: office.city,
        phone: office.phone.label,
      })),
    },
  });

  payload.logger.info("📞 Контакты сайта обновлены");
}
