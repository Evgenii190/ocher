import { revalidateTag } from "next/cache";
import { NEWS_TAG } from "@/shared/lib/news.shared";

export async function POST(request: Request) {
  const secret = request.headers.get("x-revalidate-secret");
  const expected = process.env.REVALIDATE_SECRET;

  if (!expected || secret !== expected) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  revalidateTag(NEWS_TAG, "max");

  return Response.json({ revalidated: true, tag: NEWS_TAG });
}
