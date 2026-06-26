"use server";

import config from "@payload-config";
import { getTranslations } from "next-intl/server";
import { getPayload } from "payload";

const MAX_RESUME_SIZE = 5 * 1024 * 1024;
const ALLOWED_RESUME_TYPES = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/rtf",
  "text/rtf",
]);

export type SubmitVacancyApplicationResult =
  | { ok: true; applicationId: string }
  | { ok: false; error: string };

function getString(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

export async function submitVacancyApplication(
  formData: FormData,
): Promise<SubmitVacancyApplicationResult> {
  const t = await getTranslations("validation.vacancy");
  const vacancyId = getString(formData, "vacancyId");
  const name = getString(formData, "name");
  const phone = getString(formData, "phone");
  const about = getString(formData, "about");
  const consent = formData.get("consent");

  if (!vacancyId) {
    return { ok: false, error: t("vacancyRequired") };
  }
  if (!name) {
    return { ok: false, error: t("nameRequired") };
  }
  if (!phone || phone.replace(/\D/g, "").length < 10) {
    return { ok: false, error: t("phoneInvalid") };
  }
  if (!about) {
    return { ok: false, error: t("aboutRequired") };
  }
  if (consent !== "on" && consent !== "true") {
    return { ok: false, error: t("consentRequired") };
  }

  const resumeEntry = formData.get("resume");
  const resumeFile =
    resumeEntry instanceof File && resumeEntry.size > 0 ? resumeEntry : null;

  if (resumeFile) {
    if (resumeFile.size > MAX_RESUME_SIZE) {
      return { ok: false, error: t("resumeTooLarge") };
    }
    if (resumeFile.type && !ALLOWED_RESUME_TYPES.has(resumeFile.type)) {
      return { ok: false, error: t("resumeFormat") };
    }
  }

  try {
    const payload = await getPayload({ config });
    const numericId = Number(vacancyId);
    const vacancyResult = await payload.find({
      collection: "vacancies",
      where: {
        and: [
          {
            id: {
              equals: Number.isNaN(numericId) ? vacancyId : numericId,
            },
          },
          { isActive: { equals: true } },
        ],
      },
      limit: 1,
      depth: 1,
    });

    const vacancy = vacancyResult.docs[0];
    if (!vacancy) {
      return { ok: false, error: t("notFound") };
    }

    const category =
      vacancy.category &&
      typeof vacancy.category === "object" &&
      "title" in vacancy.category
        ? (vacancy.category as { title?: string | null })
        : null;

    let resumeId: number | undefined;
    if (resumeFile) {
      const resumeBuffer = Buffer.from(await resumeFile.arrayBuffer());
      const resumeDoc = await payload.create({
        collection: "documents",
        data: {
          title: `Резюме — ${name} (${vacancy.title})`,
        },
        file: {
          name: resumeFile.name,
          data: resumeBuffer,
          mimetype: resumeFile.type || "application/octet-stream",
          size: resumeFile.size,
        },
      });
      resumeId =
        typeof resumeDoc.id === "number" ? resumeDoc.id : Number(resumeDoc.id);
    }

    const application = await payload.create({
      collection: "vacancy-applications",
      data: {
        vacancy: vacancy.id,
        vacancyTitle: vacancy.title,
        categoryTitle: category?.title ?? undefined,
        applicantName: name,
        phone,
        about,
        resume: resumeId,
        status: "new",
      },
    });

    return { ok: true, applicationId: String(application.id) };
  } catch (error) {
    console.error("[vacancy-application] Не удалось сохранить отклик:", error);
    return {
      ok: false,
      error: t("submitFailed"),
    };
  }
}
