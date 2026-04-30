import {
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
    label: "LinkedIn",
    status: "pending",
    icon: Linkedin,
  },
  {
    name: "Instagram",
    label: "Instagram",
    status: "pending",
    icon: Instagram,
  },
  {
    name: "X",
    label: "X",
    status: "soon",
    icon: XIcon,
  },
  {
    name: "YouTube",
    label: "YouTube",
    status: "soon",
    icon: Youtube,
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
  author: {
    name: "Sebastian",
    location: "Amsterdam, NL",
    email: "hello@sebmer.com",
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
