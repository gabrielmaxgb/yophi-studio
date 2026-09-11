/** Blocks protocol-relative and credential-stuffed paths used as open redirects. */
export function safeNextPath(raw: string | null | undefined): string | null {
  if (!raw || !raw.startsWith("/") || raw.startsWith("//")) return null;
  if (raw.includes("\\") || raw.includes("@")) return null;
  return raw;
}
