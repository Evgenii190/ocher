function getRevalidationBaseUrl(): string {
  const configured = process.env.NEXT_PUBLIC_SERVER_URL?.replace(/\/$/, "");
  if (configured) {
    return configured;
  }

  const port = process.env.PORT ?? "3000";
  return `http://127.0.0.1:${port}`;
}

/** Запрашивает сброс кэша страницы «Охрана труда». */
export async function requestLaborProtectionRevalidation(): Promise<void> {
  const secret = process.env.REVALIDATE_SECRET;
  if (!secret) {
    return;
  }

  const baseUrl = getRevalidationBaseUrl();

  try {
    const response = await fetch(`${baseUrl}/api/revalidate/labor-protection`, {
      method: "POST",
      headers: {
        "x-revalidate-secret": secret,
      },
    });

    if (!response.ok) {
      console.warn(
        `[labor-protection] Revalidation failed: HTTP ${response.status}`,
      );
    }
  } catch (error) {
    console.warn("[labor-protection] Revalidation request failed:", error);
  }
}
