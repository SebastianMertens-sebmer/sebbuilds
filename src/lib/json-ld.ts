import { siteConfig } from "@/lib/site";
import type { ContentEntry } from "@/lib/content";

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    inLanguage: "en",
    publisher: {
      "@type": "Person",
      name: siteConfig.author.name,
    },
  };
}

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.author.name,
    url: siteConfig.url,
    jobTitle: "Product builder",
    knowsAbout: ["Product development", "Software", "Next.js", "AI tools"],
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.author.location,
    },
  };
}

export function contentJsonLd(entry: ContentEntry) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    headline: entry.title,
    description: entry.description,
    datePublished: entry.date,
    dateModified: entry.date,
    url: `${siteConfig.url}${entry.href}`,
    author: {
      "@type": "Person",
      name: siteConfig.author.name,
    },
    publisher: {
      "@type": "Person",
      name: siteConfig.author.name,
    },
    keywords: entry.tags.join(", "),
  };
}
