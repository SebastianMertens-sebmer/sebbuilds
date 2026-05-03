import fs from "node:fs";
import path from "node:path";

const aboutFilePath = path.join(process.cwd(), "public", "content", "about", "sebastian.md");

export type AboutSection = {
  level: number;
  title: string;
  slug: string;
  content: string;
};

export type SebastianAbout = {
  markdown: string;
  sections: AboutSection[];
};

export function getSebastianAbout(): SebastianAbout {
  const markdown = readSebastianAboutMarkdown();

  return {
    markdown,
    sections: parseMarkdownSections(markdown),
  };
}

export function readSebastianAboutMarkdown() {
  if (!fs.existsSync(aboutFilePath)) {
    throw new Error(`Missing about file: ${aboutFilePath}`);
  }

  return fs.readFileSync(aboutFilePath, "utf8").trim();
}

export function getSebastianAboutSectionContent(
  about: SebastianAbout,
  title: string,
) {
  return (
    about.sections.find((section) => normalizeTitle(section.title) === normalizeTitle(title))
      ?.content ?? ""
  );
}

export function parseMarkdownSections(markdown: string): AboutSection[] {
  const sections: Array<AboutSection & { lines: string[] }> = [];
  const headingPattern = /^(#{1,6})\s+(.+?)\s*#*\s*$/;

  for (const line of markdown.split(/\r?\n/)) {
    const heading = line.match(headingPattern);

    if (heading) {
      sections.push({
        level: heading[1].length,
        title: heading[2].trim(),
        slug: slugify(heading[2]),
        content: "",
        lines: [],
      });
      continue;
    }

    sections.at(-1)?.lines.push(line);
  }

  return sections.map(({ lines, ...section }) => ({
    ...section,
    content: lines.join("\n").trim(),
  }));
}

function normalizeTitle(title: string) {
  return title.trim().toLowerCase();
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
