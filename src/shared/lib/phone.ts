/** Нормализует телефон для href="tel:…" */
export function toTelHref(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 11 && digits.startsWith("8")) {
    return `tel:+7${digits.slice(1)}`;
  }
  if (digits.length === 11 && digits.startsWith("7")) {
    return `tel:+${digits}`;
  }
  if (digits.length === 10) {
    return `tel:+7${digits}`;
  }
  return `tel:+${digits}`;
}

export function toMailtoHref(email: string): string {
  return `mailto:${email.trim()}`;
}
