"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { projects } from "@/lib/content";
import { SectionHeading } from "@/components/SectionHeading";
import { registerGsap } from "@/lib/gsap-register";

export function Projects() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    registerGsap();
    const el = root.current;
    if (!el) return;

    const cards = el.querySelectorAll("[data-project]");
    const detach: Array<() => void> = [];
    const ctx = gsap.context(() => {
      gsap.from(cards, {
        scrollTrigger: { trigger: el, start: "top 78%", once: true },
        y: 36,
        opacity: 0,
        duration: 0.75,
        stagger: 0.1,
        ease: "power3.out",
      });

      cards.forEach((card) => {
        const c = card as HTMLElement;
        const onEnter = () => gsap.to(c, { y: -6, duration: 0.35, ease: "power2.out", overwrite: "auto" });
        const onLeave = () => gsap.to(c, { y: 0, duration: 0.45, ease: "power3.out", overwrite: "auto" });
        c.addEventListener("pointerenter", onEnter);
        c.addEventListener("pointerleave", onLeave);
        detach.push(() => {
          c.removeEventListener("pointerenter", onEnter);
          c.removeEventListener("pointerleave", onLeave);
        });
      });
    }, el);

    return () => {
      detach.forEach((fn) => fn());
      ctx.revert();
    };
  }, []);

  return (
    <section id="work" ref={root} className="border-t border-[var(--border)] py-24 sm:py-28" aria-labelledby="work-title">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          id="work-title"
          eyebrow="Projects"
          title="Personal work"
          description="Products and tools shipped end-to-end—payments, real-time messaging, desktop experiences, and browser extensions."
        />
        <div className="mt-14 grid gap-5 sm:grid-cols-2">
          {projects.map((p) => (
            <a
              key={p.title}
              data-project
              href={p.href}
              className="group relative flex flex-col rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-sm outline-none transition-[border-color] hover:border-[var(--accent)]/40 focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-lg font-semibold tracking-tight text-[var(--fg)]">{p.title}</h3>
                <span className="text-sm text-[var(--accent)] transition-transform group-hover:translate-x-0.5">↗</span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">{p.description}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <span key={t} className="rounded-full border border-[var(--border)] px-3 py-1 text-xs text-[var(--fg)]">
                    {t}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
