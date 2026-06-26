import { revalidateTag } from "next/cache";
import { PROCUREMENT_TAG } from "@/shared/lib/procurement.shared";

export async function POST(request: Request) {
  const secret = request.headers.get("x-revalidate-secret");
  const expected = process.env.REVALIDATE_SECRET;

  if (!expected || secret !== expected) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  revalidateTag(PROCUREMENT_TAG, "max");

  return Response.json({
    revalidated: true,
    tag: PROCUREMENT_TAG,
  });
}
