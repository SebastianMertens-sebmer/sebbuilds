import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const contentDirectory = path.join(process.cwd(), "content");

export type ContentKind = "projects" | "notes";

export type BaseEntry = {
  kind: ContentKind;
  title: string;
  slug: string;
  description: string;
  date: string;
  tags: string[];
  content: string;
  readingTime: string;
  href: string;
};

export type ProjectEntry = BaseEntry & {
  kind: "projects";
  status: "shipped" | "building" | "idea";
  demoUrl?: string;
  repoUrl?: string;
  videoUrl?: string;
  featured: boolean;
};

export type NoteEntry = BaseEntry & {
  kind: "notes";
};

export type ContentEntry = ProjectEntry | NoteEntry;

type RawFrontmatter = {
  title?: unknown;
  slug?: unknown;
  description?: unknown;
  date?: unknown;
  tags?: unknown;
  status?: unknown;
  demoUrl?: unknown;
  repoUrl?: unknown;
  videoUrl?: unknown;
  featured?: unknown;
};

function requireString(value: unknown, field: string, filePath: string) {
  if (typeof value !== "string" || value.trim() === "") {
    throw new Error(`Missing ${field} in ${filePath}`);
  }

  return value;
}

function optionalString(value: unknown) {
  return typeof value === "string" && value.trim() !== "" ? value : undefined;
}

function readKind(kind: ContentKind) {
  const directory = path.join(contentDirectory, kind);

  if (!fs.existsSync(directory)) {
    return [];
  }

  return fs
    .readdirSync(directory)
    .filter((fileName) => fileName.endsWith(".mdx"))
    .map((fileName) => readEntry(kind, fileName))
    .sort(
      (entryA, entryB) =>
        new Date(entryB.date).getTime() - new Date(entryA.date).getTime(),
    );
}

function readEntry(kind: ContentKind, fileName: string): ContentEntry {
  const filePath = path.join(contentDirectory, kind, fileName);
  const source = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(source);
  const frontmatter = data as RawFrontmatter;
  const fallbackSlug = fileName.replace(/\.mdx$/, "");
  const slug = optionalString(frontmatter.slug) ?? fallbackSlug;
  const tags = Array.isArray(frontmatter.tags)
    ? frontmatter.tags.filter((tag): tag is string => typeof tag === "string")
    : [];
  const base = {
    kind,
    title: requireString(frontmatter.title, "title", filePath),
    slug,
    description: requireString(frontmatter.description, "description", filePath),
    date: requireString(frontmatter.date, "date", filePath),
    tags,
    content,
    readingTime: getReadingTime(content),
    href: `/${kind}/${slug}`,
  } satisfies BaseEntry;

  if (kind === "projects") {
    const status = optionalString(frontmatter.status) ?? "building";

    return {
      ...base,
      kind: "projects",
      status: isProjectStatus(status) ? status : "building",
      demoUrl: optionalString(frontmatter.demoUrl),
      repoUrl: optionalString(frontmatter.repoUrl),
      videoUrl: optionalString(frontmatter.videoUrl),
      featured: frontmatter.featured === true,
    };
  }

  return {
    ...base,
    kind: "notes",
  };
}

function isProjectStatus(status: string): status is ProjectEntry["status"] {
  return status === "shipped" || status === "building" || status === "idea";
}

function getReadingTime(content: string) {
  const words = content
    .replace(/`{1,3}[\s\S]*?`{1,3}/g, "")
    .split(/\s+/)
    .filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 220));

  return `${minutes} min read`;
}

export function getProjects() {
  return readKind("projects") as ProjectEntry[];
}

export function getFeaturedProjects() {
  return getProjects().filter((project) => project.featured);
}

export function getNotes() {
  return readKind("notes") as NoteEntry[];
}

export function getAllEntries() {
  return [...getProjects(), ...getNotes()].sort(
    (entryA, entryB) =>
      new Date(entryB.date).getTime() - new Date(entryA.date).getTime(),
  );
}

export function getEntryBySlug(kind: "projects", slug: string): ProjectEntry | undefined;
export function getEntryBySlug(kind: "notes", slug: string): NoteEntry | undefined;
export function getEntryBySlug(kind: ContentKind, slug: string) {
  return readKind(kind).find((entry) => entry.slug === slug);
}

export function getAllTags(entries: ContentEntry[]) {
  return Array.from(new Set(entries.flatMap((entry) => entry.tags))).sort();
}
