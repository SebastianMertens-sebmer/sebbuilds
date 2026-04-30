import type { Metadata } from "next";
import Link from "next/link";
import { CommandLine } from "@/components/command-line";
import { JsonLd } from "@/components/json-ld";
import { TerminalFrame } from "@/components/terminal-frame";
import { personJsonLd } from "@/lib/json-ld";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Sebastian",
  description:
    "About Sebastian, the builder behind Seb Builds: products, build logs, and shipping in public from the Netherlands.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: `About Sebastian - ${siteConfig.name}`,
    description:
      "About Sebastian, the builder behind Seb Builds: products, build logs, and shipping in public from the Netherlands.",
    url: "/about",
  },
};

const aboutLines = [
  {
    number: "01",
    title: "Build useful products",
    text: "Small products, focused tools, and experiments that solve real workflow problems.",
  },
  {
    number: "02",
    title: "Share the process",
    text: "Build logs and lessons from shipping in public on sebmer.com.",
  },
  {
    number: "03",
    title: "Connect in public",
    text: "Follow along on GitHub, LinkedIn, X, Instagram, and YouTube as the project stack grows.",
  },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={personJsonLd()} />
      <main className="site-shell">
        <TerminalFrame active="About">
          <section className="terminal-page about-page" aria-labelledby="about-title">
            <CommandLine command="cat ./about/sebastian.md" />
            <div className="page-heading">
              <h1 id="about-title">About Sebastian</h1>
              <p>I build products in public from the Netherlands.</p>
            </div>

            <div className="about-copy">
              <p>
                <strong>Sebastian</strong> builds useful products, shares the
                process, and keeps the loop public.
              </p>
              <p>
                Seb Builds is the home base for projects, build logs, and the
                lessons that come from shipping real things.
              </p>
            </div>

            <div className="about-lines" aria-label="About Sebastian highlights">
              {aboutLines.map((line) => (
                <div className="about-line" key={line.number}>
                  <span>{line.number}</span>
                  <div>
                    <h2>{line.title}</h2>
                    <p>{line.text}</p>
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
