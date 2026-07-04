"use client";

import { type CSSProperties, useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { site } from "@/lib/content";
import { registerGsap } from "@/lib/gsap-register";


export function Hero() {
  const currentYear = new Date().getFullYear();
  const section = useRef<HTMLElement>(null);
  const orb = useRef<HTMLDivElement>(null);
  const lines = useRef<HTMLDivElement>(null);
  const [contrib, setContrib] = useState<{
    username: string;
    year: number;
    total: number;
    contributions: Array<{ date: string; count: number; level: 0 | 1 | 2 | 3 | 4 }>;
  } | null>(null);
  const [loadingContrib, setLoadingContrib] = useState(true);
  const [selectedYear, setSelectedYear] = useState(currentYear);

  useEffect(() => {
    registerGsap();
    const root = section.current;
    const orbEl = orb.current;
    const linesEl = lines.current;
    if (!root || !orbEl || !linesEl) return;

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set(linesEl.querySelectorAll(".hero-line-inner"), { clearProps: "all" });
    });

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      let detachMove: (() => void) | undefined;
      const ctx = gsap.context(() => {
        gsap.fromTo(
          linesEl.querySelectorAll(".hero-line-inner"),
          { yPercent: 110, rotate: 2 },
          {
            yPercent: 0,
            rotate: 0,
            duration: 1,
            ease: "power4.out",
            stagger: 0.09,
            delay: 0.15,
          },
        );

        gsap.to(orbEl, {
          rotation: 360,
          duration: 48,
          repeat: -1,
          ease: "none",
        });

        const onMove = (e: PointerEvent) => {
          const rect = root.getBoundingClientRect();
          const x = (e.clientX - rect.left) / rect.width - 0.5;
          const y = (e.clientY - rect.top) / rect.height - 0.5;
          gsap.to(orbEl, {
            x: x * 56,
            y: y * 56,
            duration: 0.75,
            ease: "power2.out",
            overwrite: "auto",
          });
        };

        root.addEventListener("pointermove", onMove, { passive: true });
        detachMove = () => root.removeEventListener("pointermove", onMove);

        gsap.fromTo(
          orbEl,
          { scale: 0.6, opacity: 0 },
          { scale: 1, opacity: 1, duration: 1.1, ease: "power3.out", delay: 0.05 },
        );

        ScrollTrigger.create({
          trigger: root,
          start: "top top",
          end: "bottom top",
          scrub: true,
          onUpdate: (self) => {
            gsap.to(linesEl, {
              y: self.progress * 40,
              opacity: 1 - self.progress * 0.35,
              overwrite: "auto",
            });
          },
        });

      }, root);

      return () => {
        detachMove?.();
        ctx.revert();
      };
    });

    return () => mm.revert();
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    const loadContributions = async () => {
      setLoadingContrib(true);
      try {
        const res = await fetch(`/api/github-contributions?year=${selectedYear}`, { signal: controller.signal });
        if (!res.ok) {
          setLoadingContrib(false);
          return;
        }
        const data = (await res.json()) as {
          username: string;
          year: number;
          total: number;
          contributions: Array<{ date: string; count: number; level: 0 | 1 | 2 | 3 | 4 }>;
          degraded?: boolean;
        };
        setContrib(data);
      } catch {
        // Keep UI resilient; fallback skeleton remains visible.
      } finally {
        setLoadingContrib(false);
      }
    };

    loadContributions();
    return () => controller.abort();
  }, [selectedYear]);

  const words = site.name.split(" ");
  const firstNameChars = useMemo(() => words[0]?.split("") ?? [], [words]);
  const selectableYears = useMemo(() => [currentYear, 2025, 2024], [currentYear]);
  const contributionCells = useMemo(() => {
    if (contrib?.contributions?.length) return contrib.contributions;
    return Array.from({ length: 366 }, (_, idx) => ({
      date: `placeholder-${idx}`,
      count: 0,
      level: 0 as const,
    }));
  }, [contrib]);
  const levelClassMap: Record<number, string> = {
    0: "bg-ink-300/25 dark:bg-ink-700/60",
    1: "bg-indigo-300/55 dark:bg-indigo-500/35",
    2: "bg-indigo-400/70 dark:bg-indigo-500/55",
    3: "bg-indigo-500/85 dark:bg-indigo-400/80",
    4: "bg-indigo-600 dark:bg-indigo-300",
  };

  return (
    <section
      id="hero"
      ref={section}
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-14"
      aria-labelledby="hero-title"
    >
      <div
        ref={orb}
        className="pointer-events-none absolute -right-24 top-1/3 h-[min(70vw,520px)] w-[min(70vw,520px)] rounded-full bg-[radial-gradient(circle_at_30%_30%,rgb(129_140_248/0.55),transparent_55%),radial-gradient(circle_at_70%_60%,rgb(99_102_241/0.35),transparent_50%)] opacity-90 blur-3xl will-change-transform"
        aria-hidden
      />

      <div className="relative mx-auto grid w-full max-w-6xl gap-12 px-4 pb-24 pt-10 sm:px-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-center">
        <div ref={lines}>
          <p className="overflow-hidden text-xs font-semibold uppercase tracking-[0.28em] text-[var(--muted)]">
            <span className="hero-line-inner inline-block">Portfolio / 2026</span>
          </p>
          <h1 id="hero-title" className="mt-4 text-5xl font-semibold leading-[0.95] tracking-tight text-[var(--fg)] sm:text-6xl lg:text-7xl">
            {words.map((w, idx) => (
              <span key={w} className="hero-line block overflow-hidden">
                {idx === 0 ? (
                  <span className="hero-line-inner inline-block">
                    {firstNameChars.map((char, charIdx) => (
                      <span
                        key={`${char}-${charIdx}`}
                        className="hero-name-flow hero-name-char"
                        style={
                          {
                            "--wave-delay": `${(charIdx * 0.17 + (charIdx % 3) * 0.07).toFixed(2)}s`,
                          } as CSSProperties
                        }
                      >
                        {char}
                      </span>
                    ))}
                    
                  </span>
                ) : (
                  <span className="hero-line-inner inline-block">{w}</span>
                )}

              </span>
            ))}



          </h1>

          <div className="mt-3 overflow-hidden sm:mt-4">
            <p className="hero-line-inner inline-block text-lg text-[var(--muted)] sm:text-xl">{site.title}</p>
          </div>
          <div className="mt-6 max-w-xl overflow-hidden">
            <p className="hero-line-inner text-balance text-sm leading-relaxed text-[var(--muted)] sm:text-base">
              {site.tagline}
            </p>
          </div>
          <div className="mt-10 flex flex-wrap gap-3 overflow-hidden">
            <span className="hero-line-inner inline-flex">
              <a
                href="#work"
                className="inline-flex items-center justify-center rounded-full bg-[var(--fg)] px-6 py-2.5 text-sm font-medium text-[var(--bg)] transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
              >
                View work
              </a>
            </span>
            <span className="hero-line-inner inline-flex">
              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-full border border-[var(--border)] bg-[var(--card)] px-6 py-2.5 text-sm font-medium text-[var(--fg)] transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
              >
                Let&apos;s talk
              </a>
            </span>
          </div>
        </div>

        <aside className="relative hidden lg:block" aria-hidden>
          <div className="relative mx-auto max-w-md rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-[0_0_0_1px_rgb(0_0_0/0.02)] dark:shadow-[0_0_0_1px_rgb(255_255_255/0.04)]">
            <div className="pointer-events-none absolute inset-x-6 top-0 h-24 rounded-b-[2rem] bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.18),transparent_70%)]" />

            <div className="relative">
              <p className="text-[11px] uppercase tracking-[0.2em] text-[var(--muted)]">Profile snapshot</p>
              <p className="mt-2 text-2xl font-semibold leading-tight text-[var(--fg)]">Systems that feel effortless.</p>
            </div>

            <div className="relative mt-6 grid grid-cols-3 gap-3">
              {[
                { label: "Years", value: "3+" },
                { label: "Projects", value: "10+" },
                { label: "Domains", value: "4" },
              ].map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-[var(--border)] bg-[var(--bg)]/55 p-3">
                  <p className="text-lg font-semibold text-[var(--fg)]">{stat.value}</p>
                  <p className="text-[11px] uppercase tracking-[0.12em] text-[var(--muted)]">{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="relative mt-6 rounded-2xl border border-[var(--border)] bg-[var(--bg)]/45 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">Current focus</p>
              <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                Microservices, real-time interfaces, and disciplined delivery from prototype to production.
              </p>
              <div className="mt-4">
                <div className="mb-2 flex items-center justify-between gap-2">
                  <p className="text-[11px] uppercase tracking-[0.14em] text-[var(--muted)]">GitHub contributions</p>
                  <label className="sr-only" htmlFor="contrib-year">
                    Select contribution year
                  </label>
                  <select
                    id="contrib-year"
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(Number(e.target.value))}
                    className="rounded-md border border-[var(--border)] bg-[var(--card)] px-2 py-1 text-[11px] text-[var(--fg)] outline-none focus:ring-2 focus:ring-[var(--accent)]"
                  >
                    {selectableYears.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="overflow-x-auto pb-1">
                  <div className="grid min-w-max grid-flow-col grid-rows-7 gap-1">
                    {contributionCells.map((entry) => (
                      <span
                        key={entry.date}
                        title={`${entry.date}: ${entry.count} contribution${entry.count === 1 ? "" : "s"}`}
                        aria-label={`${entry.date}: ${entry.count} contribution${entry.count === 1 ? "" : "s"}`}
                        className={`h-2.5 w-2.5 rounded-[3px] border border-[var(--border)] ${levelClassMap[Number(entry.level)] ?? levelClassMap[0]}`}
                      />
                    ))}
                  </div>
                </div>
                <p className="mt-2 text-[11px] text-[var(--muted)]">
                  {loadingContrib
                    ? "Loading latest activity..."
                    : contrib
                      ? `${contrib.total.toLocaleString()} contributions in ${contrib.year} by @${contrib.username}`
                      : "Unable to load contribution graph right now."}
                </p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
