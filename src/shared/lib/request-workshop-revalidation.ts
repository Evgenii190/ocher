import { workshopTag } from "./workshop.shared";

function getRevalidationBaseUrl(): string {
  const configured = process.env.NEXT_PUBLIC_SERVER_URL?.replace(/\/$/, "");
  if (configured) {
    return configured;
  }

  const port = process.env.PORT ?? "3000";
  return `http://127.0.0.1:${port}`;
}

/** Запрашивает сброс кэша страницы цеха. */
export async function requestWorkshopRevalidation(slug: string): Promise<void> {
  const secret = process.env.REVALIDATE_SECRET;
  if (!secret) {
    return;
  }

  const baseUrl = getRevalidationBaseUrl();

  try {
    const response = await fetch(`${baseUrl}/api/revalidate/workshop/${slug}`, {
      method: "POST",
      headers: {
        "x-revalidate-secret": secret,
      },
    });

    if (!response.ok) {
      console.warn(
        `[workshop:${slug}] Revalidation failed: HTTP ${response.status}`,
      );
    }
  } catch (error) {
    console.warn(`[workshop:${slug}] Revalidation request failed:`, error);
  }
}

export { workshopTag };
