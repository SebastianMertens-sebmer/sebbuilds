import {
  Github,
  Instagram,
  Linkedin,
  Music2,
  X as XIcon,
  Youtube,
  type LucideIcon,
} from "lucide-react";

export type SocialLink = {
  name: string;
  href?: string;
  label: string;
  status: "live" | "pending" | "soon";
  icon: LucideIcon;
};

export type NavLink = {
  label: string;
  href: string;
  external?: boolean;
};

const socialLinks: SocialLink[] = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/auto-mate/",
    label: "LinkedIn",
    status: "live",
    icon: Linkedin,
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/sebmer_/",
    label: "Instagram",
    status: "live",
    icon: Instagram,
  },
  {
    name: "X",
    href: "https://x.com/sebmer_com",
    label: "X",
    status: "live",
    icon: XIcon,
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/@Sebmer-automate",
    label: "YouTube",
    status: "live",
    icon: Youtube,
  },
  {
    name: "GitHub",
    href: "https://github.com/sebmer-com",
    label: "GitHub",
    status: "live",
    icon: Github,
  },
  {
    name: "TikTok",
    label: "TikTok soon",
    status: "soon",
    icon: Music2,
  },
];

export const siteConfig = {
  name: "Seb Builds",
  domain: "sebmer.com",
  url: "https://sebmer.com",
  locale: "en_US",
  tagline: "products in public.",
  description:
    "Seb Builds is Sebastian's public builder log for useful products, build logs, videos, and lessons from shipping in public.",
  contactUrl: "https://tally.so/r/3jeJVa",
  legal: {
    businessName: "Mertens Advies",
    ownerName: "Sebastian Mertens",
    kvkNumber: "96847247",
    addressLabel: "Available on request via the contact form",
    contactLabel: "Available on request via the contact form",
  },
  author: {
    name: "Sebastian",
    location: "Amsterdam, NL",
  },
  nav: [
    { label: "Projects", href: "/projects" },
    { label: "Build Log", href: "/logs" },
    { label: "About", href: "/about" },
    { label: "Follow", href: "/#follow" },
    { label: "Contact", href: "https://tally.so/r/3jeJVa", external: true },
  ] satisfies NavLink[],
  socials: socialLinks,
} as const;
