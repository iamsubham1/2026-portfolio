/**
 * Portfolio copy extracted from https://subhamdas-portfolio.vercel.app/
 * (structure and wording aligned with the public site; links are placeholders where not specified on source.)
 */
import {
  experience,
  projects,
  skillGroups,
} from "@/constants/portfolio-sections";

export const site = {
  name: "Subham Das",
  title: "Full-Stack Developer",
  tagline:
    "Building robust solutions with modern web technologies and scalable architectures.",
  url: "https://subhamdas-portfolio.vercel.app",
  ogImage: "/og.svg",
  githubUsername: "iamsubham1",
} as const;

export const nav = [
  { href: "#hero", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#work", label: "Work" },
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
] as const;

export const about = {
  lead:
    "I design and ship resilient full-stack systems—microservices, real-time features, and polished interfaces—with an emphasis on performance and clarity.",
  body: [
    "From Redis and Kafka-backed services to React front ends, I enjoy owning features end-to-end and collaborating across teams to deliver measurable impact.",
  ],
} as const;

export { experience, projects, skillGroups };

export const contact = {
  headline: "Contact me",
  sub: "Open to collaborations, freelance work, and full-time roles. Tell me about your project.",
} as const;
