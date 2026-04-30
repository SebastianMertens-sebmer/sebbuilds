import { ArrowRight, ExternalLink } from "lucide-react";
import Link from "next/link";
import type { ContentEntry, ProjectEntry } from "@/lib/content";
import { formatDate } from "@/lib/format";

type ContentCardProps = {
  entry: ContentEntry;
  compact?: boolean;
  descriptionMode?: "short" | "none";
  linked?: boolean;
};

export function ContentCard({
  entry,
  compact = false,
  descriptionMode,
  linked = true,
}: ContentCardProps) {
  const resolvedDescriptionMode = descriptionMode ?? (compact ? "none" : "short");

  return (
    <article
      className={`content-card ${compact ? "content-card--compact" : ""} ${
        resolvedDescriptionMode === "none" ? "content-card--no-description" : ""
      } ${linked ? "" : "content-card--static"}`}
      aria-label={entry.title}
    >
      <div className="content-card__meta">
        <span>{entry.status}</span>
      </div>
      <div className="content-card__main">
        <h3>{entry.title}</h3>
        {resolvedDescriptionMode === "short" ? <p>{entry.description}</p> : null}
        <div className="tag-row">
          {entry.tags.slice(0, 3).map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      </div>
      {linked ? (
        <>
          <ArrowRight aria-hidden="true" className="content-card__arrow" size={18} />
          <Link
            aria-label={`Open ${entry.title}`}
            className="content-card__hitbox"
            href={entry.href}
          />
        </>
      ) : null}
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
        Project / {formatDate(entry.date)} / {entry.readingTime}
      </p>
      <h1>{entry.title}</h1>
      <p>{entry.description}</p>
      <div className="tag-row tag-row--large">
        {entry.tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>
      <ProjectLinks project={entry} />
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
