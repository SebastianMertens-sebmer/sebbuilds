import { getAllEntries } from "@/lib/content";
import { siteConfig } from "@/lib/site";

export const dynamic = "force-static";

export function GET() {
  const entries = getAllEntries();
  const updated = entries[0]?.date ?? "2026-04-29";
  const items = entries
    .map(
      (entry) => `
        <item>
          <title>${escapeXml(entry.title)}</title>
          <link>${siteConfig.url}${entry.href}</link>
          <guid>${siteConfig.url}${entry.href}</guid>
          <pubDate>${new Date(entry.date).toUTCString()}</pubDate>
          <description>${escapeXml(entry.description)}</description>
        </item>`,
    )
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
    <rss version="2.0">
      <channel>
        <title>${escapeXml(siteConfig.name)}</title>
        <link>${siteConfig.url}</link>
        <description>${escapeXml(siteConfig.description)}</description>
        <language>en</language>
        <lastBuildDate>${new Date(updated).toUTCString()}</lastBuildDate>
        ${items}
      </channel>
    </rss>`;

  return new Response(xml.trim(), {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
