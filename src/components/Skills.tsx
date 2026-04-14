"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { skillGroups } from "@/lib/content";
import { SectionHeading } from "@/components/SectionHeading";
import { registerGsap } from "@/lib/gsap-register";
import {
  siApachekafka,
  siClaude,
  siCss,
  siDocker,
  siElasticsearch,
  siExpress,
  siFastapi,
  siFirebase,
  siFramer,
  siGit,
  siGooglecloud,
  siGreensock,
  siHtml5,
  siJavascript,
  siLangchain,
  siLanggraph,
  siMongodb,
  siNestjs,
  siNextdotjs,
  siNodedotjs,
  siPydantic,
  siPostgresql,
  siPython,
  siReact,
  siRedis,
  siRedux,
  siSocketdotio,
  siTailwindcss,
  siTypescript,
  siVercel,
} from "simple-icons/icons";
import { faAws, faOpenai } from "@fortawesome/free-brands-svg-icons";
import type { IconDefinition } from "@fortawesome/fontawesome-common-types";

type IconData = { path: string; hex: string; title: string };
type ResolvedIcon =
  | { kind: "simple"; icon: IconData }
  | { kind: "fontawesome"; icon: IconDefinition };

const importedIconsByKey: Record<string, IconData> = {
  apachekafka: siApachekafka,
  claude: siClaude,
  css: siCss,
  docker: siDocker,
  elasticsearch: siElasticsearch,
  express: siExpress,
  fastapi: siFastapi,
  firebase: siFirebase,
  framer: siFramer,
  git: siGit,
  googlecloud: siGooglecloud,
  greensock: siGreensock,
  html5: siHtml5,
  javascript: siJavascript,
  langchain: siLangchain,
  langgraph: siLanggraph,
  mongodb: siMongodb,
  nestjs: siNestjs,
  nextdotjs: siNextdotjs,
  nodedotjs: siNodedotjs,
  pydanticai: siPydantic,
  postgresql: siPostgresql,
  python: siPython,
  react: siReact,
  redis: siRedis,
  redux: siRedux,
  socketdotio: siSocketdotio,
  tailwindcss: siTailwindcss,
  typescript: siTypescript,
  vercel: siVercel,
};

const iconAliasByTechName: Record<string, string> = {
  "html 5": "html5",
  "css 3": "css",
  "react js": "react",
  "node js": "nodedotjs",
  "socket.io": "socketdotio",
  "apache kafka": "apachekafka",
  "amazon web services": "amazonwebservices",
  "next js": "nextdotjs",
  "framer motion": "framer",
  gsap: "greensock",
  "google cloud platform": "googlecloud",
  "langgraph": "langgraph",
  "openai": "openai",
};

export function Skills() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    registerGsap();
    const el = root.current;
    if (!el) return;

    const rows = el.querySelectorAll("[data-skill-row]");
    const ctx = gsap.context(() => {
      rows.forEach((row) => {
        const headingCard = row.querySelector("[data-skill-heading-card]");
        const contentCard = row.querySelector("[data-skill-content-card]");
        const heading = row.querySelector("[data-skill-heading]");
        const chips = row.querySelectorAll("[data-skill-chip]");

        const sequenceTl = gsap.timeline({
          scrollTrigger: {
            trigger: row,
            start: "top 78%",
            end: "bottom 35%",
            toggleActions: "play reverse play reverse",
          },
        });

        sequenceTl
          .fromTo(
            headingCard,
            { y: 24, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.45, ease: "power3.out" },
          )
          .fromTo(
            heading,
            { y: 12, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.3, ease: "power3.out" },
            "<0.04",
          )
          .fromTo(
            contentCard,
            { y: 18, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.35, ease: "power2.out" },
            ">-0.02",
          )
          .fromTo(
            chips,
            { y: 10, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.3, stagger: 0.03, ease: "power2.out" },
            "<0.03",
          );
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" ref={root} className="border-t border-[var(--border)] py-24 sm:py-28" aria-labelledby="skills-title">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          id="skills-title"
          eyebrow="Stack"
          title="Technologies & expertise"
          description="Grouped the same way as the source site—frontend, backend, tooling, and cloud."
        />

        <div className="mt-14 space-y-12">
          {skillGroups.map((group) => (
            <section
              key={group.title}
              data-skill-row
              className="grid gap-4 md:grid-cols-[240px_minmax(0,1fr)] md:items-start"
            >
              <div
                data-skill-heading-card
                className="rounded-2xl border border-[var(--border)] bg-[var(--card)] px-5 py-4 sm:px-6 md:h-full"
              >
                <div data-skill-heading className="border-b border-[var(--border)] pb-4">
                  {/* <p className="text-[11px] uppercase tracking-[0.22em] text-[var(--muted)]">""</p> */}
                  <h3 className="mt-2 text-4xl font-semibold uppercase tracking-tight text-[var(--fg)] sm:text-5xl md:text-4xl">
                    {group.title}
                  </h3>
                </div>
              </div>

              <div
                data-skill-content-card
                className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 sm:p-6"
              >
                <p className="mb-3 text-[11px] uppercase tracking-[0.18em] text-[var(--muted)]">Technologies</p>
                <ul className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                  {group.items.map((item) => (
                    <li
                      key={item.name}
                      data-skill-chip
                      className="group rounded-xl border border-[var(--border)] bg-[var(--bg)]/40 px-3 py-2.5 transition-all hover:-translate-y-0.5 hover:border-[var(--accent)]/40"
                    >
                      <p className="flex items-center gap-2 text-xs font-medium text-[var(--fg)] sm:text-sm">
                        <span className="inline-flex h-4 w-4 items-center justify-center">
                          <TechIcon name={item.name} />
                        </span>
                        {item.name}
                      </p>
                      <p className="mt-1 text-[10px] text-[var(--muted)]">{item.note}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}

function TechIcon({ name }: { name: string }) {
  const resolved = resolveTechIcon(name);
  if (!resolved) {
    // Hardcoded fallback icon when no brand icon exists.
    return (
      <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden className="shrink-0 text-[var(--accent)]">
        <path
          d="M12 2 2.8 7v10L12 22l9.2-5V7L12 2Zm0 2.2 7.1 3.8-7.1 3.8L4.9 8 12 4.2Zm-7 5.6 6.1 3.3v6.4L5 16.3V9.8Zm14 0v6.5l-6.1 3.2v-6.4L19 9.8Z"
          fill="currentColor"
        />
      </svg>
    );
  }

  if (resolved.kind === "fontawesome") {
    const [width, height, , , svgPathData] = resolved.icon.icon;
    const paths = Array.isArray(svgPathData) ? svgPathData : [svgPathData];
    const isAws = normalizedTechName(name) === "amazon web services";

    return (
      <svg
        viewBox={`0 0 ${width} ${height}`}
        width="16"
        height="16"
        aria-hidden
        style={isAws ? { color: "rgb(134, 134, 134)" } : undefined}
        className={`shrink-0 ${isAws ? "" : "text-[var(--fg)]"}`}
      >
        {paths.map((d, idx) => (
          <path key={idx} d={d} fill="currentColor" />
        ))}
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      aria-hidden
      style={{ color: `#${resolved.icon.hex}` }}
      className="shrink-0"
    >
      <path d={resolved.icon.path} fill="currentColor" />
    </svg>
  );
}

function resolveTechIcon(name: string): ResolvedIcon | undefined {
  const normalized = normalizedTechName(name);
  if (normalized === "openai") {
    return { kind: "fontawesome", icon: faOpenai };
  }
  if (normalized === "amazon web services") {
    return { kind: "fontawesome", icon: faAws };
  }
  const alias = iconAliasByTechName[normalized];
  if (alias) {
    const icon = importedIconsByKey[alias];
    return icon ? { kind: "simple", icon } : undefined;
  }

  const fallbackKey = normalized.replace(/[^a-z0-9]/g, "");
  const icon = importedIconsByKey[fallbackKey];
  return icon ? { kind: "simple", icon } : undefined;
}

function normalizedTechName(name: string): string {
  return name.trim().toLowerCase();
}
