import { getProjects } from "@/lib/content";
import { siteConfig } from "@/lib/site";

export const dynamic = "force-static";

export function GET() {
  const projects = getProjects();
  const projectLinks = projects
    .map((project) => `- [${project.title}](${siteConfig.url}${project.href}): ${project.description}`)
    .join("\n");

  const text = `# ${siteConfig.name}

${siteConfig.name} is Sebastian's public builder log for useful products, long-form project posts, and short build logs.

## Key Pages

- [Home](${siteConfig.url})
- [About Sebastian](${siteConfig.url}/about)
- [Projects](${siteConfig.url}/projects)
- [Latest Build Logs](${siteConfig.url}/logs)
- [Full LLM Context](${siteConfig.url}/llms-full.txt)
- [RSS](${siteConfig.url}/rss.xml)
- [Sitemap](${siteConfig.url}/sitemap.xml)

## Public JSON Content

- [Projects manifest](${siteConfig.url}/content/projects/index.json)
- [Logs manifest](${siteConfig.url}/content/logs/index.json)

## Projects

${projectLinks}

## Notes For AI Agents

- Projects are long-form posts with Markdown bodies.
- Logs are short build updates and do not have individual detail pages.
- The canonical domain is ${siteConfig.url}.
`;

  return new Response(text.trim(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
