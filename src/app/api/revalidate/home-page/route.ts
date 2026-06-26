import { revalidateTag } from "next/cache";
import { HOME_PAGE_TAG } from "@/shared/lib/home-page.shared";

export async function POST(request: Request) {
  const secret = request.headers.get("x-revalidate-secret");
  const expected = process.env.REVALIDATE_SECRET;

  if (!expected || secret !== expected) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  revalidateTag(HOME_PAGE_TAG, "max");

  return Response.json({ revalidated: true, tag: HOME_PAGE_TAG });
}
