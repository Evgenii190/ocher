import fs from "node:fs";
import path from "node:path";
import { getTranslations } from "next-intl/server";
import { cn } from "@/shared/lib/utils";
import { gapHeading } from "@/shared/ui/spacing";
import { typeTitle } from "@/shared/ui/typography";
import {
  DeliveryGeographyHeader,
  DeliveryGeographyInteractive,
} from "./delivery-geography-interactive";

const mapPath = path.join(
  process.cwd(),
  "public/delivery-geography/world-map.svg",
);

function getMapMarkup() {
  const svg = fs.readFileSync(mapPath, "utf8");
  return svg.replace(/^<\?xml.*?\?>\s*/u, "");
}

export async function DeliveryGeographySection() {
  const t = await getTranslations("home.deliveryGeography");
  const mapMarkup = getMapMarkup();

  return (
    <section className={cn("flex flex-col", gapHeading)}>
      <DeliveryGeographyHeader>
        <h2 className={typeTitle}>{t("title")}</h2>
      </DeliveryGeographyHeader>
      <DeliveryGeographyInteractive mapMarkup={mapMarkup} />
    </section>
  );
}
