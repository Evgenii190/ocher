/** Форматирует размер файла в стиле макета (Kb / Mb). */
export function formatFileSize(bytes: number | null | undefined): string {
  if (!bytes || bytes <= 0) {
    return "";
  }

  if (bytes < 1024) {
    return `${bytes} B`;
  }

  if (bytes < 1024 * 1024) {
    const kb = bytes / 1024;
    const precision = kb < 10 ? 1 : 0;
    return `${kb.toFixed(precision)} Kb`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(2)} Mb`;
}
