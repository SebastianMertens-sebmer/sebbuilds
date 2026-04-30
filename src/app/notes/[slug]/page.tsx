import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { ArticleHeader } from "@/components/content-card";
import { JsonLd } from "@/components/json-ld";
import { mdxComponents } from "@/components/mdx-content";
import { TerminalFrame } from "@/components/terminal-frame";
import { getEntryBySlug, getNotes } from "@/lib/content";
import { contentJsonLd } from "@/lib/json-ld";
import { siteConfig } from "@/lib/site";

type NotePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return getNotes().map((note) => ({
    slug: note.slug,
  }));
}

export async function generateMetadata({
  params,
}: NotePageProps): Promise<Metadata> {
  const { slug } = await params;
  const note = getEntryBySlug("notes", slug);

  if (!note) {
    return {};
  }

  return {
    title: note.title,
    description: note.description,
    alternates: {
      canonical: note.href,
    },
    openGraph: {
      type: "article",
      title: `${note.title} - ${siteConfig.name}`,
      description: note.description,
      url: note.href,
      publishedTime: note.date,
      tags: note.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: `${note.title} - ${siteConfig.name}`,
      description: note.description,
    },
  };
}

export default async function NotePage({ params }: NotePageProps) {
  const { slug } = await params;
  const note = getEntryBySlug("notes", slug);

  if (!note) {
    notFound();
  }

  return (
    <>
      <JsonLd data={contentJsonLd(note)} />
      <main className="site-shell">
        <TerminalFrame active="Notes">
          <article className="article-shell">
            <ArticleHeader entry={note} />
            <div className="mdx-content">
              <MDXRemote components={mdxComponents} source={note.content} />
            </div>
          </article>
        </TerminalFrame>
      </main>
    </>
  );
}
