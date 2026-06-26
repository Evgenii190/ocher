import { hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { type Locale, routing } from "@/i18n/routing";
import {
  type CatalogProductRef,
  getCatalogProductsByRefs,
} from "../../[locale]/catalog/_lib/get-catalog";
import {
  availabilityLabelKeys,
  formatCharacteristicValue,
} from "../../[locale]/catalog/_ui/types";

export const dynamic = "force-dynamic";

type CartProductsRequest = {
  items?: CatalogProductRef[];
  locale?: string;
};

function resolveLocale(request: Request, bodyLocale?: string): Locale {
  if (bodyLocale && hasLocale(routing.locales, bodyLocale)) {
    return bodyLocale;
  }

  const referer = request.headers.get("referer");
  if (referer) {
    try {
      const segment = new URL(referer).pathname.split("/")[1];
      if (segment && hasLocale(routing.locales, segment)) {
        return segment;
      }
    } catch {
      // ignore invalid referer
    }
  }

  return routing.defaultLocale;
}

export async function POST(request: Request) {
  let body: CartProductsRequest;

  try {
    body = (await request.json()) as CartProductsRequest;
  } catch {
    return Response.json({ products: [] });
  }

  const locale = resolveLocale(request, body.locale);
  const t = await getTranslations({ locale });
  const refs = Array.isArray(body.items) ? body.items : [];
  const products = await getCatalogProductsByRefs(refs, locale);

  return Response.json({
    products: products.map((product) => ({
      id: product.id,
      slug: product.slug,
      title: product.title,
      availability: product.availability,
      price: product.price,
      discountPercent: product.discountPercent,
      image: product.image,
      specs: [
        ...product.characteristics
          .map((characteristic) => ({
            label: characteristic.label,
            value: formatCharacteristicValue(characteristic, t),
          }))
          .filter((spec) => spec.value.length > 0),
        {
          label: t("common.availabilityLabel"),
          value: t(availabilityLabelKeys[product.availability]),
        },
      ],
    })),
  });
}
