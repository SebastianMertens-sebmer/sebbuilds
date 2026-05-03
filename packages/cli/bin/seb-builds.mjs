#!/usr/bin/env node

const DEFAULT_BASE_URL = "https://sebmer.com";
const baseUrl = (process.env.SEB_BUILDS_BASE_URL || DEFAULT_BASE_URL).replace(/\/$/, "");
const contactUrl = "https://tally.so/r/3jeJVa";

const args = process.argv.slice(2);

async function main() {
  if (args.length === 0 || args.includes("--help") || args.includes("-h")) {
    printHelp();
    return;
  }

  const [command, target, flag] = args;

  if (command === "ls" && target === "./projects" && flag === "--all") {
    await listProjects();
    return;
  }

  if (command === "cat" && target?.startsWith("./projects/") && target.endsWith(".md")) {
    await printProject(target);
    return;
  }

  if (command === "tail" && target === "-f" && flag === "./build.log") {
    await printLogs();
    return;
  }

  if (command === "cat" && target === "./about/sebastian.md") {
    printAbout();
    return;
  }

  if (command === "open" && target === "contact.txt") {
    console.log(contactUrl);
    return;
  }

  console.error(`Unknown command: ${args.join(" ")}`);
  console.error("");
  printHelp();
  process.exitCode = 1;
}

async function listProjects() {
  const projects = await getProjects();

  console.log("SEB BUILDS / projects");
  console.log("");

  for (const project of projects) {
    console.log(`${project.status.padEnd(8)} ${project.title}  ${project.href}`);
  }
}

async function printProject(target) {
  const slug = target.replace("./projects/", "").replace(/\.md$/, "");
  const projects = await getProjects();
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    throw new Error(`Project not found: ${slug}`);
  }

  console.log(`# ${project.title}`);
  console.log("");
  console.log(project.description);
  console.log("");
  console.log(project.body);
}

async function printLogs() {
  const logs = await getLogs();

  console.log("SEB BUILDS / build.log");
  console.log("");

  for (const log of logs) {
    console.log(`${log.date} ${log.time}  ${log.text}`);
    console.log(`  ${log.detail}`);
  }
}

function printAbout() {
  console.log(`# Sebastian`);
  console.log("");
  console.log("Sebastian builds useful products, shares the process, and keeps the loop public.");
  console.log("Based in the Netherlands. Shipping on sebmer.com.");
}

function printHelp() {
  console.log("SEB BUILDS");
  console.log("products in public.");
  console.log("");
  console.log("Usage:");
  console.log("  npx github:sebmer-com/sebbuilds ls ./projects --all");
  console.log("  npx github:sebmer-com/sebbuilds cat ./projects/elson-ai.md");
  console.log("  npx github:sebmer-com/sebbuilds tail -f ./build.log");
  console.log("  npx github:sebmer-com/sebbuilds cat ./about/sebastian.md");
  console.log("  npx github:sebmer-com/sebbuilds open contact.txt");
}

async function getProjects() {
  const manifest = await fetchJson("/content/projects/index.json");
  const files = normalizeManifest(manifest, "projects");
  const projects = await Promise.all(
    files.map((file) => fetchJson(`/content/projects/${file}`)),
  );

  return projects.map((project) => ({
    ...project,
    href: `/projects/${project.slug}`,
  }));
}

async function getLogs() {
  const manifest = await fetchJson("/content/logs/index.json");
  const files = normalizeManifest(manifest, "logs");

  return Promise.all(files.map((file) => fetchJson(`/content/logs/${file}`)));
}

function normalizeManifest(manifest, label) {
  if (!manifest || !Array.isArray(manifest.items)) {
    throw new Error(`Invalid ${label} manifest: expected items array`);
  }

  return manifest.items.map((item) => (item.endsWith(".json") ? item : `${item}.json`));
}

async function fetchJson(pathname) {
  const response = await fetch(`${baseUrl}${pathname}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch ${pathname}: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
