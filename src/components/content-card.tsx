import { ArrowRight, ExternalLink } from "lucide-react";
import Link from "next/link";
import type { ContentEntry, ProjectEntry } from "@/lib/content";
import { formatDate, formatShortDate } from "@/lib/format";

type ContentCardProps = {
  entry: ContentEntry;
  compact?: boolean;
};

export function ContentCard({ entry, compact = false }: ContentCardProps) {
  const isProject = entry.kind === "projects";

  return (
    <article className={`content-card ${compact ? "content-card--compact" : ""}`}>
      <div className="content-card__meta">
        <span>{isProject ? (entry as ProjectEntry).status : formatShortDate(entry.date)}</span>
      </div>
      <div className="content-card__main">
        <h3>
          <Link href={entry.href}>{entry.title}</Link>
        </h3>
        <p>{entry.description}</p>
        <div className="tag-row">
          {entry.tags.slice(0, 3).map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      </div>
      <ArrowRight aria-hidden="true" className="content-card__arrow" size={18} />
    </article>
  );
}

type ArticleHeaderProps = {
  entry: ContentEntry;
};

export function ArticleHeader({ entry }: ArticleHeaderProps) {
  return (
    <header className="article-header">
      <p className="article-kicker">
        {entry.kind === "projects" ? "Project" : "Note"} / {formatDate(entry.date)} /{" "}
        {entry.readingTime}
      </p>
      <h1>{entry.title}</h1>
      <p>{entry.description}</p>
      <div className="tag-row tag-row--large">
        {entry.tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>
      {entry.kind === "projects" ? <ProjectLinks project={entry} /> : null}
    </header>
  );
}

function ProjectLinks({ project }: { project: ProjectEntry }) {
  const links = [
    { label: "Demo", href: project.demoUrl },
    { label: "Repo", href: project.repoUrl },
    { label: "Video", href: project.videoUrl },
  ].filter((link): link is { label: string; href: string } => Boolean(link.href));

  if (links.length === 0) {
    return null;
  }

  return (
    <div className="project-links">
      {links.map((link) => (
        <a href={link.href} key={link.href} rel="noreferrer" target="_blank">
          {link.label}
          <ExternalLink aria-hidden="true" size={14} />
        </a>
      ))}
    </div>
  );
}
