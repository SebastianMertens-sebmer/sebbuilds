import { getLogs, getProjects } from "@/lib/content";
import { siteConfig } from "@/lib/site";

export const dynamic = "force-static";

export function GET() {
  const projects = getProjects()
    .map(
      (project) => `## ${project.title}

- URL: ${siteConfig.url}${project.href}
- Date: ${project.date}
- Status: ${project.status}
- Tags: ${project.tags.join(", ")}
- Description: ${project.description}
`,
    )
    .join("\n");
  const logs = getLogs()
    .map((log) => `- ${log.date} ${log.time}: ${log.text} — ${log.detail}`)
    .join("\n");

  const text = `# ${siteConfig.name} Full LLM Context

${siteConfig.description}

## Site

- Canonical URL: ${siteConfig.url}
- About: ${siteConfig.url}/about
- Projects: ${siteConfig.url}/projects
- Logs: ${siteConfig.url}/logs
- Legal: ${siteConfig.url}/legal
- Contact: ${siteConfig.contactUrl}

## Public JSON

- Projects manifest: ${siteConfig.url}/content/projects/index.json
- Logs manifest: ${siteConfig.url}/content/logs/index.json

## Projects

${projects}

## Recent Logs

${logs}
`;

  return new Response(text.trim(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
