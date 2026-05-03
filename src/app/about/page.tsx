import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { CommandLine } from "@/components/command-line";
import { JsonLd } from "@/components/json-ld";
import { TerminalFrame } from "@/components/terminal-frame";
import { getSebastianAbout, getSebastianAboutSectionContent } from "@/lib/about";
import { personJsonLd } from "@/lib/json-ld";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Sebastian",
  description: "Canonical public profile and builder context for Sebastian Mertens on Seb Builds.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: `About Sebastian - ${siteConfig.name}`,
    description: "Canonical public profile and builder context for Sebastian Mertens on Seb Builds.",
    url: "/about",
  },
};

type MarkdownBlock =
  | {
      items: string[];
      type: "list";
    }
  | {
      text: string;
      type: "paragraph";
    };

const detailSectionTitles = [
  "What Sebastian Builds",
  "Current Work",
  "Experience Highlights",
  "Education",
  "Certifications",
  "Public Themes",
  "Links",
];

export default function AboutPage() {
  const about = getSebastianAbout();
  const heading = about.sections.find((section) => section.level === 1)?.title ?? "Sebastian Mertens";
  const shortBio = getSebastianAboutSectionContent(about, "Short Bio");
  const shortBioParagraphs = getMarkdownBlocks(shortBio).filter(
    (block): block is Extract<MarkdownBlock, { type: "paragraph" }> =>
      block.type === "paragraph",
  );
  const detailSections = detailSectionTitles
    .map((title) => about.sections.find((section) => section.title === title))
    .filter((section) => section !== undefined);

  return (
    <>
      <JsonLd data={personJsonLd()} />
      <main className="site-shell">
        <TerminalFrame active="About">
          <section className="terminal-page about-page" aria-labelledby="about-title">
            <CommandLine command="cat ./about/sebastian.md" />
            <div className="page-heading">
              <h1 id="about-title">{heading}</h1>
              <p>Canonical public profile and builder context for Seb Builds.</p>
            </div>

            <div className="about-copy">
              {shortBioParagraphs.map((paragraph) => (
                <p key={paragraph.text}>{renderInlineMarkdown(paragraph.text)}</p>
              ))}
            </div>

            <div className="about-lines" aria-label="About Sebastian highlights">
              {detailSections.map((section, index) => (
                <div className="about-line" key={section.slug}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <h2>{section.title}</h2>
                    {renderMarkdownBlocks(section.content)}
                  </div>
                </div>
              ))}
            </div>

            <div className="about-actions">
              <Link className="button button--primary" href="/projects">
                View Projects
              </Link>
              <a
                className="button button--secondary"
                href={siteConfig.contactUrl}
                rel="noreferrer"
                target="_blank"
              >
                Contact Sebastian
              </a>
            </div>
          </section>
        </TerminalFrame>
      </main>
    </>
  );
}

function renderMarkdownBlocks(content: string) {
  return getMarkdownBlocks(content).map((block, index) => {
    if (block.type === "list") {
      return (
        <ul key={`${block.type}-${index}`}>
          {block.items.map((item) => (
            <li key={item}>{renderInlineMarkdown(item)}</li>
          ))}
        </ul>
      );
    }

    return <p key={`${block.type}-${index}`}>{renderInlineMarkdown(block.text)}</p>;
  });
}

function getMarkdownBlocks(content: string): MarkdownBlock[] {
  const blocks: MarkdownBlock[] = [];
  let paragraphLines: string[] = [];
  let listItems: string[] = [];

  const flushParagraph = () => {
    if (paragraphLines.length === 0) {
      return;
    }

    blocks.push({
      type: "paragraph",
      text: paragraphLines.join(" "),
    });
    paragraphLines = [];
  };

  const flushList = () => {
    if (listItems.length === 0) {
      return;
    }

    blocks.push({
      type: "list",
      items: listItems,
    });
    listItems = [];
  };

  for (const line of content.split(/\r?\n/)) {
    const trimmed = line.trim();

    if (trimmed === "") {
      flushParagraph();
      flushList();
      continue;
    }

    if (trimmed.startsWith("- ")) {
      flushParagraph();
      listItems.push(trimmed.slice(2));
      continue;
    }

    flushList();
    paragraphLines.push(trimmed);
  }

  flushParagraph();
  flushList();

  return blocks;
}

function renderInlineMarkdown(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const linkPattern = /\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g;
  let lastIndex = 0;

  for (const match of text.matchAll(linkPattern)) {
    const [raw, label, href] = match;
    const index = match.index ?? 0;

    if (index > lastIndex) {
      nodes.push(text.slice(lastIndex, index));
    }

    nodes.push(
      <a href={href} key={`${href}-${index}`} rel="noreferrer" target="_blank">
        {label}
      </a>,
    );
    lastIndex = index + raw.length;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes.length > 0 ? nodes : [text];
}
