import type { MetadataRoute } from "next";
import { getArticles } from "@/lib/articles";
import { absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["/", "/about", "/disclosure", "/privacy"].map((path) => ({
    url: absoluteUrl(path),
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "/" ? 1 : 0.5,
  }));

  const articleRoutes = getArticles().map((article) => ({
    url: absoluteUrl(`/articles/${article.slug}`),
    lastModified: new Date(`${article.date}T00:00:00Z`),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...articleRoutes];
}
