import type { Metadata } from "next";
import { CommandLine } from "@/components/command-line";
import { TerminalFrame } from "@/components/terminal-frame";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Legal",
  description:
    "Company information, privacy policy, and cookie policy for Seb Builds by Mertens Advies.",
  alternates: {
    canonical: "/legal",
  },
  openGraph: {
    title: `Legal - ${siteConfig.name}`,
    description:
      "Company information, privacy policy, and cookie policy for Seb Builds by Mertens Advies.",
    url: "/legal",
  },
};

const legalSections = [
  {
    title: "Company Info",
    items: [
      `Brand: ${siteConfig.name}`,
      `Registered business: ${siteConfig.legal.businessName}`,
      `Owner: ${siteConfig.legal.ownerName}`,
      `KVK number: ${siteConfig.legal.kvkNumber}`,
      `Website: ${siteConfig.domain}`,
      `Business address: ${siteConfig.legal.addressLabel}`,
      `Contact email: ${siteConfig.legal.contactLabel}`,
    ],
  },
  {
    title: "Privacy Policy",
    items: [
      "This website may process basic server logs for security, reliability, and abuse prevention.",
      "If you use the contact form, Tally processes the details you submit so Sebastian can reply.",
      "External links such as GitHub and social profiles are handled by those third-party services.",
      "This site currently has no account system, newsletter signup, payment flow, or embedded YouTube tracking.",
      "Personal data is kept only as long as needed for the purpose it was submitted or as required by law.",
    ],
  },
  {
    title: "Cookie Policy",
    items: [
      "The site currently uses functional theme preference behavior only.",
      "No ad cookies, Meta Pixel, profiling cookies, or non-essential tracking cookies are used in v1.",
      "Because no non-essential tracking cookies are used, this version does not show a cookie consent banner.",
      "If analytics, ads, embedded video tracking, or other third-party trackers are added later, this page and the consent flow must be updated.",
    ],
  },
];

export default function LegalPage() {
  return (
    <main className="site-shell">
      <TerminalFrame>
        <section className="terminal-page legal-page" aria-labelledby="legal-title">
          <CommandLine command="cat ./legal/company-privacy-cookies.md" />
          <div className="page-heading">
            <h1 id="legal-title">Legal</h1>
            <p>Company info, privacy, and cookies for Seb Builds.</p>
          </div>

          <div className="legal-stack">
            {legalSections.map((section) => (
              <section className="legal-section" key={section.title}>
                <h2>{section.title}</h2>
                <ul>
                  {section.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </section>
            ))}

            <section className="legal-section">
              <h2>Contact</h2>
              <p>
                Address and direct contact details are available on request via
                the contact form.
              </p>
              <a
                className="button button--primary"
                href={siteConfig.contactUrl}
                rel="noreferrer"
                target="_blank"
              >
                Contact Sebastian
              </a>
            </section>

            <p className="legal-note">
              Last updated: May 1, 2026. This page is maintained as a practical
              website notice and is not legal advice.
            </p>
          </div>
        </section>
      </TerminalFrame>
    </main>
  );
}
