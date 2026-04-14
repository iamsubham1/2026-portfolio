"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { about } from "@/lib/content";
import { SectionHeading } from "@/components/SectionHeading";
import { registerGsap } from "@/lib/gsap-register";

export function About() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    registerGsap();
    const el = root.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.from(el.querySelectorAll("[data-reveal]"), {
        scrollTrigger: { trigger: el, start: "top 82%", once: true },
        y: 28,
        opacity: 0,
        duration: 0.75,
        stagger: 0.08,
        ease: "power3.out",
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={root} className="border-t border-[var(--border)] py-24 sm:py-28" aria-labelledby="about-title">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading id="about-title" eyebrow="About" title="Craft, clarity, and dependable delivery" />
        <div className="mx-auto mt-14 max-w-3xl space-y-6 text-center">
          <p data-reveal className="text-lg font-medium text-[var(--fg)] sm:text-xl">
            {about.lead}
          </p>
          {about.body.map((p) => (
            <p key={p.slice(0, 24)} data-reveal className="text-sm leading-relaxed text-[var(--muted)] sm:text-base">
              {p}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
