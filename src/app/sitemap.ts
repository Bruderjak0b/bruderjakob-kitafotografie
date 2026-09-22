import type { MetadataRoute } from "next";

import { siteConfig } from "~/config/site";

/** Every public route. New pages must be added here. */
const routes = [
  { path: "/", priority: 1 },
  { path: "/ueber-mich", priority: 0.8 },
  { path: "/ablauf", priority: 0.8 },
  { path: "/preise", priority: 0.8 },
  { path: "/kontakt", priority: 0.8 },
  { path: "/impressum", priority: 0.3 },
  { path: "/datenschutz", priority: 0.3 },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return routes.map(({ path, priority }) => ({
    url: new URL(path, siteConfig.url).href,
    lastModified,
    changeFrequency: "monthly",
    priority,
  }));
}
