import { revalidateTag } from "next/cache";
import { EDUCATION_DISCLOSURE_TAG } from "@/shared/lib/education-disclosure.shared";

export async function POST(request: Request) {
  const secret = request.headers.get("x-revalidate-secret");
  const expected = process.env.REVALIDATE_SECRET;

  if (!expected || secret !== expected) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  revalidateTag(EDUCATION_DISCLOSURE_TAG, "max");

  return Response.json({
    revalidated: true,
    tag: EDUCATION_DISCLOSURE_TAG,
  });
}
