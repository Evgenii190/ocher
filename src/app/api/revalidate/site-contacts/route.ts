import { revalidateTag } from "next/cache";
import { SITE_CONTACTS_TAG } from "@/shared/lib/site-contacts.shared";

export async function POST(request: Request) {
  const secret = request.headers.get("x-revalidate-secret");
  const expected = process.env.REVALIDATE_SECRET;

  if (!expected || secret !== expected) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  revalidateTag(SITE_CONTACTS_TAG, "max");

  return Response.json({ revalidated: true, tag: SITE_CONTACTS_TAG });
}
