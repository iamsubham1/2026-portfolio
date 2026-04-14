"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { experience } from "@/lib/content";
import { SectionHeading } from "@/components/SectionHeading";
import { registerGsap } from "@/lib/gsap-register";

export function Experience() {
  const root = useRef<HTMLElement>(null);
  const line = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    registerGsap();
    const el = root.current;
    const lineEl = line.current;
    if (!el || !lineEl) return;

    const items = el.querySelectorAll("[data-exp]");
    const ctx = gsap.context(() => {
      gsap.from(items, {
        scrollTrigger: { trigger: el, start: "top 78%", once: true },
        x: -6,
        opacity: 0,
        duration: 0.65,
        stagger: 0.1,
        ease: "power3.out",
      });

      gsap.fromTo(
        lineEl,
        { scaleY: 0, transformOrigin: "top center" },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top 70%",
            end: "bottom 60%",
            scrub: true,
          },
        },
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="experience"
      ref={root}
      className="border-t border-[var(--border)] py-24 sm:py-28"
      aria-labelledby="experience-title"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          id="experience-title"
          eyebrow="Experience"
          title="Where I’ve shipped impact"
          description="Roles aligned with the public résumé on the reference portfolio—backend, full-stack, and product-minded frontend work."
        />

        <div className="relative mx-auto mt-16 max-w-3xl">
          <div className="absolute left-3 top-2 bottom-2 w-px bg-[var(--border)]" aria-hidden />
          <div
            ref={line}
            className="absolute left-3 top-2 h-[calc(100%-16px)] w-px origin-top scale-y-0 bg-[var(--accent)]"
            aria-hidden
          />

          <ol className="space-y-10">
            {experience.map((job) => (
              <li key={job.company + job.role} data-exp className="relative pl-10 sm:pl-12">
                <span
                  className="absolute left-0 top-1.5 flex h-6 w-6 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--card)] sm:top-1"
                  aria-hidden
                >
                  <span className="h-2 w-2 rounded-full bg-[var(--accent)]" />
                </span>
                <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 sm:p-6">
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                    <h3 className="text-base font-semibold text-[var(--fg)]">{job.role}</h3>
                    <p className="text-sm font-medium text-[var(--accent)]">{job.company}</p>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">{job.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
