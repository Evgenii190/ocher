import { revalidateTag } from "next/cache";
import { ABOUT_PAGE_TAG } from "@/shared/lib/about-page.shared";

export async function POST(request: Request) {
  const secret = request.headers.get("x-revalidate-secret");
  const expected = process.env.REVALIDATE_SECRET;

  if (!expected || secret !== expected) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  revalidateTag(ABOUT_PAGE_TAG, "max");

  return Response.json({ revalidated: true, tag: ABOUT_PAGE_TAG });
}
