import type { Metadata } from "next";
import { CommandLine } from "@/components/command-line";
import { ContentCard } from "@/components/content-card";
import { TerminalFrame } from "@/components/terminal-frame";
import { getAllTags, getNotes } from "@/lib/content";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Notes",
  description:
    "Short notes on building products, shipping in public, and working with software.",
  alternates: {
    canonical: "/notes",
  },
  openGraph: {
    title: `Notes - ${siteConfig.name}`,
    description:
      "Short notes on building products, shipping in public, and working with software.",
    url: "/notes",
  },
};

export default function NotesPage() {
  const notes = getNotes();
  const tags = getAllTags(notes);

  return (
    <main className="site-shell">
      <TerminalFrame active="Notes">
        <section className="terminal-page" aria-labelledby="notes-title">
          <CommandLine command="cat ./notes/index.md" />
          <div className="page-heading">
            <h1 id="notes-title">Notes</h1>
            <p>
              Product thinking, shipping notes, and the build loop behind the
              projects.
            </p>
          </div>

          <div className="tag-row tag-row--large" aria-label="Note tags">
            {tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>

          <div className="archive-list">
            {notes.map((note) => (
              <ContentCard entry={note} key={note.slug} />
            ))}
          </div>
        </section>
      </TerminalFrame>
    </main>
  );
}
