const buckets = new Map<string, number[]>();

export function rateLimit(
  key: string,
  { limit, windowMs }: { limit: number; windowMs: number }
) {
  const now = Date.now();
  const recent = (buckets.get(key) ?? []).filter((at) => now - at < windowMs);
  if (recent.length >= limit) {
    buckets.set(key, recent);
    return false;
  }
  recent.push(now);
  buckets.set(key, recent);
  return true;
}

export function clientIp(headerList: Headers) {
  const forwarded = headerList.get("x-forwarded-for")?.split(",")[0]?.trim();
  const real = headerList.get("x-real-ip")?.trim();
  return forwarded || real || "unknown";
}
