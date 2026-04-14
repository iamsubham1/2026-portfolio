"use client";

import { useEffect, useRef, useState, FormEvent } from "react";
import gsap from "gsap";
import { contact } from "@/lib/content";
import { SectionHeading } from "@/components/SectionHeading";
import { registerGsap } from "@/lib/gsap-register";

export default function Contact() {
  const root = useRef<HTMLElement>(null);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    registerGsap();
    const el = root.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.from(el.querySelectorAll(".contact-reveal"), {
        scrollTrigger: { trigger: el, start: "top 82%", once: true },
        y: 22,
        opacity: 0,
        duration: 0.65,
        stagger: 0.08,
        ease: "power3.out",
      });
    }, el);

    return () => ctx.revert();
  }, []);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
    window.setTimeout(() => setSent(false), 3200);
  };

  return (
    <section id="contact" ref={root} className="border-t border-[var(--border)] py-24 sm:py-28" aria-labelledby="contact-title">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading id="contact-title" eyebrow="Contact" title={contact.headline} description={contact.sub} />

        <form onSubmit={onSubmit} className="mx-auto mt-14 grid max-w-xl gap-4" noValidate>
          <label className="contact-reveal text-sm text-[var(--muted)]" htmlFor="name">
            Your name
            <input
              id="name"
              name="name"
              required
              className="mt-2 w-full rounded-xl border border-[var(--border)] bg-[var(--card)] px-4 py-3 text-sm text-[var(--fg)] outline-none transition-shadow focus:ring-2 focus:ring-[var(--accent)]"
              placeholder="Ada Lovelace"
              autoComplete="name"
            />
          </label>
          <label className="contact-reveal text-sm text-[var(--muted)]" htmlFor="email">
            Email address
            <input
              id="email"
              name="email"
              type="email"
              required
              className="mt-2 w-full rounded-xl border border-[var(--border)] bg-[var(--card)] px-4 py-3 text-sm text-[var(--fg)] outline-none transition-shadow focus:ring-2 focus:ring-[var(--accent)]"
              placeholder="you@domain.com"
              autoComplete="email"
            />
          </label>
          <label className="contact-reveal text-sm text-[var(--muted)]" htmlFor="message">
            Your message
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              className="mt-2 w-full resize-y rounded-xl border border-[var(--border)] bg-[var(--card)] px-4 py-3 text-sm text-[var(--fg)] outline-none transition-shadow focus:ring-2 focus:ring-[var(--accent)]"
              placeholder="Tell me about timelines, stack, and goals."
            />
          </label>
          <div className="contact-reveal flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-full bg-[var(--fg)] px-8 py-3 text-sm font-medium text-[var(--bg)] transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
            >
              Send →
            </button>
            {sent ? (
              <p className="text-sm text-[var(--muted)]" role="status">
                Demo form — connect an API or mailto handler to go live.
              </p>
            ) : null}
          </div>
        </form>
      </div>
    </section>
  );
}
