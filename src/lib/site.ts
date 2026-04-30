import {
  Instagram,
  Linkedin,
  Music2,
  Twitter,
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
    icon: Twitter,
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
  tagline: "Sebastian builds products",
  description:
    "Seb Builds is Sebastian's public builder log for useful products, project notes, videos, and lessons from shipping in public.",
  author: {
    name: "Sebastian",
    location: "Amsterdam, NL",
    email: "hello@sebmer.com",
  },
  nav: [
    { label: "Projects", href: "/projects" },
    { label: "Notes", href: "/notes" },
    { label: "About", href: "/#about" },
    { label: "Videos", href: "/#videos" },
    { label: "Contact", href: "/#contact" },
  ],
  socials: socialLinks,
} as const;

export const buildLog = [
  {
    date: "2026-04-29",
    time: "21:42:17",
    text: "Deployed sebmer.com v1.0.0",
    detail: "Live and feeling fast.",
  },
  {
    date: "2026-04-29",
    time: "19:18:03",
    text: "Added project: FlowState",
    detail: "Focus timer for deep work.",
  },
  {
    date: "2026-04-28",
    time: "16:09:11",
    text: "Wrote: Shipping is a feature",
    detail: "Why momentum beats perfection.",
  },
  {
    date: "2026-04-28",
    time: "12:31:22",
    text: "YouTube video published",
    detail: "Building in public update #1.",
  },
  {
    date: "2026-04-27",
    time: "17:55:44",
    text: "New note: The build loop",
    detail: "Ideas -> Code -> Ship -> Learn.",
  },
];
