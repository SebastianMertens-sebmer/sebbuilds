import type { Metadata } from "next";
import { CommandLine } from "@/components/command-line";
import { ContentCard } from "@/components/content-card";
import { TerminalFrame } from "@/components/terminal-frame";
import { getAllTags, getProjects } from "@/lib/content";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "All products and experiments Sebastian is building and documenting on Seb Builds.",
  alternates: {
    canonical: "/projects",
  },
  openGraph: {
    title: `Projects - ${siteConfig.name}`,
    description:
      "All products and experiments Sebastian is building and documenting on Seb Builds.",
    url: "/projects",
  },
};

export default function ProjectsPage() {
  const projects = getProjects();
  const tags = getAllTags(projects);

  return (
    <main className="site-shell">
      <TerminalFrame active="Projects">
        <section className="terminal-page" aria-labelledby="projects-title">
          <CommandLine command="ls ./projects --all" />
          <div className="page-heading">
            <h1 id="projects-title">Projects</h1>
            <p>All products, experiments, and shipped ideas.</p>
          </div>

          <div className="tag-row tag-row--large" aria-label="Project tags">
            {tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>

          <div className="archive-list">
            {projects.map((project) => (
              <ContentCard entry={project} key={project.slug} />
            ))}
          </div>
        </section>
      </TerminalFrame>
    </main>
  );
}
