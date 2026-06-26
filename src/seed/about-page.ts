import fs from "node:fs";
import path from "node:path";
import type { getPayload } from "payload";
import { buildAboutBottomContent } from "./about-page-content-builder";
import type { SeedLocale } from "./i18n/catalog";
import { seedLocalizedUpdateGlobal } from "./localized-seed";

const secondaryLocales = ["en", "zh"] as const satisfies readonly SeedLocale[];

const HOME_VIDEO_PATH = path.resolve(process.cwd(), "src/seed/assets/home.mp4");

export async function seedAboutPage(
  payload: Awaited<ReturnType<typeof getPayload>>,
) {
  payload.logger.info("🌱 Наполнение страницы «О компании»…");

  let videoId: number | string | undefined;

  if (fs.existsSync(HOME_VIDEO_PATH)) {
    const media = await payload.create({
      collection: "media",
      data: {
        alt: "Производство АО «ОМЗ»",
      },
      filePath: HOME_VIDEO_PATH,
    });
    videoId = media.id;
  } else {
    payload.logger.warn(
      "Видео home.mp4 не найдено — блок внизу страницы «О компании» будет без видео.",
    );
  }

  await seedLocalizedUpdateGlobal({
    payload,
    slug: "about-page",
    ru: {
      bottomContent: buildAboutBottomContent(videoId),
    },
    locales: Object.fromEntries(
      secondaryLocales.map((locale) => [
        locale,
        { bottomContent: buildAboutBottomContent(videoId, locale) },
      ]),
    ),
  });

  payload.logger.info("🏭 Страница «О компании» обновлена");
}
