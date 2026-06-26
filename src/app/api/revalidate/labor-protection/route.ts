import { revalidateTag } from "next/cache";
import { LABOR_PROTECTION_TAG } from "@/shared/lib/labor-protection.shared";

export async function POST(request: Request) {
  const secret = request.headers.get("x-revalidate-secret");
  const expected = process.env.REVALIDATE_SECRET;

  if (!expected || secret !== expected) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  revalidateTag(LABOR_PROTECTION_TAG, "max");

  return Response.json({ revalidated: true, tag: LABOR_PROTECTION_TAG });
}
