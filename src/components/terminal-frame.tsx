import { LockKeyhole, MapPin, TerminalSquare } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { siteConfig } from "@/lib/site";

type TerminalFrameProps = {
  active?: string;
  children: ReactNode;
};

export function TerminalFrame({ active, children }: TerminalFrameProps) {
  return (
    <div className="terminal-frame" data-testid="terminal-frame">
      <div className="terminal-chrome" aria-label="Browser window controls">
        <div className="traffic-lights" aria-hidden="true">
          <span className="traffic-light traffic-light--red" />
          <span className="traffic-light traffic-light--yellow" />
          <span className="traffic-light traffic-light--green" />
        </div>

        <div className="address-bar" aria-label="Current site">
          <LockKeyhole aria-hidden="true" size={14} />
          <span>{siteConfig.domain}</span>
        </div>

        <div className="chrome-actions">
          <span className="icon-chip" aria-hidden="true">
            <TerminalSquare size={16} />
          </span>
          <ThemeToggle />
        </div>
      </div>

      <div className="terminal-nav">
        <Link className="brand-prompt" href="/" aria-label="Seb Builds home">
          <span>Seb Builds</span>
          <span className="cursor-small" aria-hidden="true" />
        </Link>

        <nav aria-label="Primary navigation" className="nav-links">
          {siteConfig.nav.map((item) =>
            item.external ? (
              <a
                className="nav-link"
                href={item.href}
                key={item.href}
                rel="noreferrer"
                target="_blank"
              >
                {item.label}
              </a>
            ) : (
              <Link
                aria-current={active === item.label ? "page" : undefined}
                className="nav-link"
                href={item.href}
                key={item.href}
              >
                {active === item.label ? ">_ " : ""}
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <SocialRail />
      </div>

      <div className="terminal-body">
        {children}
        <TerminalFooter />
      </div>
    </div>
  );
}

function TerminalFooter() {
  return (
    <footer className="terminal-footer">
      <span className="footer-status">
        <MapPin aria-hidden="true" size={16} />
        {siteConfig.author.location}
      </span>
      <span className="footer-links">
        <span>
          © 2026 {siteConfig.name} by {siteConfig.legal.businessName} | KVK{" "}
          {siteConfig.legal.kvkNumber}
        </span>
        <Link href="/legal">Legal</Link>
      </span>
    </footer>
  );
}

function SocialRail() {
  return (
    <div className="social-rail" aria-label="Social links">
      {siteConfig.socials.map((social) => {
        const Icon = social.icon;
        const isLive = social.status === "live" && social.href;

        if (isLive) {
          return (
            <a
              aria-label={social.label}
              className="social-link"
              href={social.href}
              key={social.name}
              rel="noreferrer"
              target="_blank"
            >
              <Icon aria-hidden="true" size={18} />
            </a>
          );
        }

        return (
          <span
            aria-label={`${social.name} ${social.status === "soon" ? "coming soon" : "link pending"}`}
            className="social-link social-link--disabled"
            key={social.name}
            role="img"
            title={social.status === "soon" ? "Coming soon" : "Link pending"}
          >
            <Icon aria-hidden="true" size={18} />
            {social.name === "TikTok" ? <span>TikTok soon</span> : null}
          </span>
        );
      })}
    </div>
  );
}
