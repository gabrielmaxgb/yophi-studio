/** Studio one-click login. Never on Vercel production. */
export function isDevStudioLoginEnabled() {
  if (process.env.VERCEL_ENV === "production") return false;
  if (process.env.NODE_ENV !== "development") return false;
  return process.env.ENABLE_DEV_LOGIN !== "0";
}
