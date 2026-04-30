import type { MetadataRoute } from "next";
import { getAllEntries } from "@/lib/content";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/projects", "/notes"].map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date("2026-04-29"),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  const entries = getAllEntries().map((entry) => ({
    url: `${siteConfig.url}${entry.href}`,
    lastModified: new Date(entry.date),
    changeFrequency: "monthly" as const,
    priority: entry.kind === "projects" ? 0.75 : 0.65,
  }));

  return [...routes, ...entries];
}
