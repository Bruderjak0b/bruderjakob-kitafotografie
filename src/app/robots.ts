import type { MetadataRoute } from "next";

import { siteConfig } from "~/config/site";

export default function robots(): MetadataRoute.Robots {
  // Vercel preview deployments must not be indexed.
  const isPreviewDeployment =
    process.env.VERCEL_ENV !== undefined &&
    process.env.VERCEL_ENV !== "production";

  if (isPreviewDeployment) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: new URL("/sitemap.xml", siteConfig.url).href,
    host: siteConfig.url,
  };
}
