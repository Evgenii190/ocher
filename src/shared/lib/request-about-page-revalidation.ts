function getRevalidationBaseUrl(): string {
  const configured = process.env.NEXT_PUBLIC_SERVER_URL?.replace(/\/$/, "");
  if (configured) {
    return configured;
  }

  const port = process.env.PORT ?? "3000";
  return `http://127.0.0.1:${port}`;
}

/** Запрашивает сброс кэша страницы «О компании». */
export async function requestAboutPageRevalidation(): Promise<void> {
  const secret = process.env.REVALIDATE_SECRET;
  if (!secret) {
    return;
  }

  const baseUrl = getRevalidationBaseUrl();

  try {
    const response = await fetch(`${baseUrl}/api/revalidate/about-page`, {
      method: "POST",
      headers: {
        "x-revalidate-secret": secret,
      },
    });

    if (!response.ok) {
      console.warn(`[about-page] Revalidation failed: HTTP ${response.status}`);
    }
  } catch (error) {
    console.warn("[about-page] Revalidation request failed:", error);
  }
}
