import { revalidateTag } from "next/cache";
import { workshopTag } from "@/shared/lib/workshop.shared";

type RouteContext = {
  params: Promise<{ slug: string }>;
};

export async function POST(request: Request, context: RouteContext) {
  const secret = request.headers.get("x-revalidate-secret");
  const expected = process.env.REVALIDATE_SECRET;

  if (!expected || secret !== expected) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { slug } = await context.params;
  const tag = workshopTag(slug);

  revalidateTag(tag, "max");

  return Response.json({ revalidated: true, tag });
}
