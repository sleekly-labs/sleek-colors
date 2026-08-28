import type { MetadataRoute } from "next";

import {
  getCategoryDefinitions,
  getPalettes,
  getWebsitePalettes
} from "@/data";
import { siteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const url = (path: string) => new URL(path, siteUrl).toString();
  const publishedPalettes = getPalettes("published");
  const websitePalettes = getWebsitePalettes("published");

  return [
    { url: url("/"), changeFrequency: "weekly", priority: 1 },
    { url: url("/about"), changeFrequency: "monthly", priority: 0.5 },
    { url: url("/privacy"), changeFrequency: "yearly", priority: 0.3 },
    { url: url("/terms"), changeFrequency: "yearly", priority: 0.3 },
    { url: url("/contact"), changeFrequency: "monthly", priority: 0.4 },
    { url: url("/palettes"), changeFrequency: "weekly", priority: 0.9 },
    {
      url: url("/website-colors"),
      changeFrequency: "weekly",
      priority: 0.9
    },
    { url: url("/search"), changeFrequency: "monthly", priority: 0.4 },
    ...getCategoryDefinitions().map((category) => ({
      url: url(`/category/${category.slug}`),
      changeFrequency: "weekly" as const,
      priority: 0.7
    })),
    ...publishedPalettes.map((palette) => ({
      url: url(`/palette/${palette.slug}`),
      lastModified: palette.updatedAt ?? palette.createdAt,
      changeFrequency: "monthly" as const,
      priority: 0.8
    })),
    ...websitePalettes.map((palette) => ({
      url: url(`/preview/${palette.slug}`),
      lastModified: palette.updatedAt ?? palette.createdAt,
      changeFrequency: "monthly" as const,
      priority: 0.6
    }))
  ];
}
