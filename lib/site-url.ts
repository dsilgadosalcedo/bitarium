export function getPublicSiteUrl() {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.VERCEL_URL ??
    "http://localhost:3000"

  if (siteUrl.startsWith("http://") || siteUrl.startsWith("https://")) {
    return siteUrl
  }

  return `https://${siteUrl}`
}
