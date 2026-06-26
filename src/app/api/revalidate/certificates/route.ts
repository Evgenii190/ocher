import { revalidateTag } from "next/cache";
import { CERTIFICATES_TAG } from "@/shared/lib/certificates.shared";

export async function POST(request: Request) {
  const secret = request.headers.get("x-revalidate-secret");
  if (secret !== process.env.REVALIDATE_SECRET) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  revalidateTag(CERTIFICATES_TAG, "max");

  return Response.json({ revalidated: true, tag: CERTIFICATES_TAG });
}
