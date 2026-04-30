import {
  Clock3,
  FileText,
  Folder,
  ListChecks,
  MapPin,
  Radio,
} from "lucide-react";
import Link from "next/link";
import { CommandLine } from "@/components/command-line";
import { ContentCard } from "@/components/content-card";
import { JsonLd } from "@/components/json-ld";
import { SectionPanel } from "@/components/section-panel";
import { TerminalFrame } from "@/components/terminal-frame";
import { getFeaturedProjects, getNotes } from "@/lib/content";
import { personJsonLd, websiteJsonLd } from "@/lib/json-ld";
import { buildLog, siteConfig } from "@/lib/site";

export default function Home() {
  const projects = getFeaturedProjects();
  const notes = getNotes().slice(0, 3);

  return (
    <>
      <JsonLd data={[websiteJsonLd(), personJsonLd()]} />
      <main className="site-shell">
        <TerminalFrame active="Projects">
          <section className="hero-section" aria-labelledby="home-title">
            <div className="hero-copy">
              <CommandLine command="npx seb-builds@latest" variant="hero" />
              <h1 className="wordmark" data-text="SEB BUILDS" id="home-title">
                SEB BUILDS
              </h1>
              <p className="hero-lede">
                I build useful products, document the process, and ship in public.
                <span className="cursor-block" aria-hidden="true" />
              </p>

              <div className="cta-row">
                <Link className="button button--primary" href="/projects">
                  <span aria-hidden="true">&gt;_</span>
                  View Projects
                </Link>
                <Link className="button button--secondary" href="/notes">
                  Follow the Build
                  <span aria-hidden="true">-&gt;</span>
                </Link>
              </div>

              <p className="system-line">
                System <span>ready</span>. Building in public since day one.
              </p>
            </div>

            <aside className="about-card" id="about" aria-label="About Sebastian">
              <div className="about-card__chrome">
                <span>&gt;_ WHO AM I?</span>
                <span aria-hidden="true">- x</span>
              </div>
              <p>
                Hi, I&apos;m <strong>Sebastian</strong>.
              </p>
              <p>
                I build products with code and curiosity. I share what I learn
                along the way. Let&apos;s build something great.
              </p>
              <Link href="/notes/the-build-loop">~/about/me.md -&gt;</Link>
            </aside>
          </section>

          <section className="dashboard-grid" aria-label="Latest updates">
            <SectionPanel
              command="seb@sebmer.com ~ % tail -f build.log"
              href="/notes"
              icon={<ListChecks aria-hidden="true" size={18} />}
              title="Latest Build Log"
            >
              <div className="build-log">
                {buildLog.map((item) => (
                  <div className="build-log__row" key={`${item.date}-${item.time}`}>
                    <span className="build-log__date">{item.date}</span>
                    <span className="build-log__time">{item.time}</span>
                    <span className="build-log__dot" aria-hidden="true" />
                    <span>
                      <strong>{item.text}</strong>
                      <em>{item.detail}</em>
                    </span>
                  </div>
                ))}
              </div>
            </SectionPanel>

            <SectionPanel
              command="seb@sebmer.com ~/projects % ls"
              href="/projects"
              icon={<Folder aria-hidden="true" size={18} />}
              title="Featured Projects"
            >
              <div className="content-list">
                {projects.map((project) => (
                  <ContentCard compact entry={project} key={project.slug} />
                ))}
              </div>
            </SectionPanel>

            <SectionPanel
              command="seb@sebmer.com ~/notes % cat index.md"
              href="/notes"
              icon={<FileText aria-hidden="true" size={18} />}
              title="Latest Notes"
            >
              <div className="content-list">
                {notes.map((note) => (
                  <ContentCard compact entry={note} key={note.slug} />
                ))}
              </div>
            </SectionPanel>
          </section>

          <section className="wide-section" id="videos">
            <div>
              <CommandLine command="cat videos.md" prefix="seb@sebmer.com ~/videos %" />
              <h2>Build videos, soon.</h2>
              <p>
                YouTube is part of the roadmap. Until then, the notes and project
                logs carry the public build trail.
              </p>
            </div>
            <div className="status-pills" aria-label="Current channels">
              {siteConfig.socials.map((social) => (
                <span data-status={social.status} key={social.name}>
                  {social.label}
                </span>
              ))}
            </div>
          </section>

          <section className="contact-strip" id="contact">
            <div>
              <CommandLine command="open contact.txt" prefix="seb@sebmer.com ~ %" />
              <h2>Want to build something useful?</h2>
            </div>
            <a className="button button--primary" href={`mailto:${siteConfig.author.email}`}>
              Contact Sebastian
            </a>
          </section>

          <footer className="terminal-footer">
            <span className="footer-status">
              <Radio aria-hidden="true" size={16} />
              Building in public
            </span>
            <span className="footer-status">
              <MapPin aria-hidden="true" size={16} />
              {siteConfig.author.location}
            </span>
            <span className="footer-status">
              <Clock3 aria-hidden="true" size={16} />
              UTC+2
            </span>
            <span className="footer-links">
              <span>(c) 2026 {siteConfig.name}</span>
              <Link href="/rss.xml">RSS</Link>
              <Link href="/sitemap.xml">Sitemap</Link>
            </span>
          </footer>
        </TerminalFrame>
      </main>
    </>
  );
}
