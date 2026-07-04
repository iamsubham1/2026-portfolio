"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { nav, site } from "@/lib/content";

function toggleDark() {
  const root = document.documentElement;
  const next = !root.classList.contains("dark");
  root.classList.toggle("dark", next);
  localStorage.setItem("theme", next ? "dark" : "light");
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const robotRef = useRef<HTMLSpanElement>(null);
  const leftEyeRef = useRef<SVGCircleElement>(null);
  const rightEyeRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  useEffect(() => {
    if (!open || !menuRef.current) return;
    const links = menuRef.current.querySelectorAll("[data-mobile-link]");
    const ctx = gsap.context(() => {
      gsap.fromTo(
        links,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, stagger: 0.05, duration: 0.35, ease: "power3.out" },
      );
    }, menuRef);
    return () => ctx.revert();
  }, [open]);

  useEffect(() => {
    const robot = robotRef.current;
    const leftEye = leftEyeRef.current;
    const rightEye = rightEyeRef.current;
    if (!robot || !leftEye || !rightEye) return;

    const moveLeftEyeX = gsap.quickTo(leftEye, "x", { duration: 0.2, ease: "power2.out" });
    const moveLeftEyeY = gsap.quickTo(leftEye, "y", { duration: 0.2, ease: "power2.out" });
    const moveRightEyeX = gsap.quickTo(rightEye, "x", { duration: 0.2, ease: "power2.out" });
    const moveRightEyeY = gsap.quickTo(rightEye, "y", { duration: 0.2, ease: "power2.out" });

    const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));
    const maxEyeOffset = 1.25;

    const onPointerMove = (event: PointerEvent) => {
      const rect = robot.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const normX = clamp((event.clientX - centerX) / (rect.width / 2), -1, 1);
      const normY = clamp((event.clientY - centerY) / (rect.height / 2), -1, 1);
      const targetX = normX * maxEyeOffset;
      const targetY = normY * maxEyeOffset;

      moveLeftEyeX(targetX);
      moveLeftEyeY(targetY);
      moveRightEyeX(targetX);
      moveRightEyeY(targetY);
    };

    const resetEyes = () => {
      moveLeftEyeX(0);
      moveLeftEyeY(0);
      moveRightEyeX(0);
      moveRightEyeY(0);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerleave", resetEyes);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", resetEyes);
      resetEyes();
    };
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[var(--border)] bg-[var(--bg)]/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/#hero"
          className="inline-flex items-center gap-4 text-base font-semibold tracking-tight text-[var(--fg)] transition-opacity hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] sm:text-lg"
        >
          <span
            aria-hidden
            className="header-robot inline-flex items-center justify-center text-[var(--accent)]"
            ref={robotRef}
          >
            <svg
              viewBox="0 0 24 24"
              className="header-robot-icon h-[3.25rem] w-[3.25rem]"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="5.9" y="6.9" width="12.2" height="10.2" rx="2.5" />
              <circle ref={leftEyeRef} className="header-robot-eye-left" cx="9.8" cy="11" r="0.95" fill="currentColor" stroke="none" />
              <circle ref={rightEyeRef} className="header-robot-eye-right" cx="14.2" cy="11" r="0.95" fill="currentColor" stroke="none" />
              <path d="M8.9 14.8h6.2" />
            </svg>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-xs font-medium uppercase tracking-[0.14em] text-[var(--muted)] transition-colors hover:text-[var(--fg)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
            >
              {item.label}
            </a>
          ))}
          <Link
            href="/blog"
            className="text-xs font-medium uppercase tracking-[0.14em] text-[var(--muted)] transition-colors hover:text-[var(--fg)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
          >
            Blog
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              toggleDark();
              setIsDark(document.documentElement.classList.contains("dark"));
            }}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--card)] text-[var(--fg)] transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            title={isDark ? "Light mode" : "Dark mode"}
          >
            {isDark ? (
              <svg
                aria-hidden
                viewBox="0 0 24 24"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="4.5" />
                <path d="M12 2.5v2.2M12 19.3v2.2M4.7 4.7l1.6 1.6M17.7 17.7l1.6 1.6M2.5 12h2.2M19.3 12h2.2M4.7 19.3l1.6-1.6M17.7 6.3l1.6-1.6" />
              </svg>
            ) : (
              <svg
                aria-hidden
                viewBox="0 0 24 24"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20.5 14.2A8.8 8.8 0 1 1 9.8 3.5a7.2 7.2 0 0 0 10.7 10.7Z" />
              </svg>
            )}
          </button>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">Menu</span>
            <span className="flex flex-col gap-1">
              <span className={`h-0.5 w-4 bg-current transition ${open ? "translate-y-1.5 rotate-45" : ""}`} />
              <span className={`h-0.5 w-4 bg-current transition ${open ? "opacity-0" : ""}`} />
              <span className={`h-0.5 w-4 bg-current transition ${open ? "-translate-y-1.5 -rotate-45" : ""}`} />
            </span>
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        ref={menuRef}
        className={`border-t border-[var(--border)] bg-[var(--bg)] md:hidden ${open ? "block" : "hidden"}`}
      >
        <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-4">
          {nav.map((item) => (
            <a
              key={item.href}
              data-mobile-link
              href={item.href}
              className="rounded-lg px-3 py-2 text-sm text-[var(--fg)] hover:bg-[var(--accent-soft)]"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <Link
            data-mobile-link
            href="/blog"
            className="rounded-lg px-3 py-2 text-sm text-[var(--fg)] hover:bg-[var(--accent-soft)]"
            onClick={() => setOpen(false)}
          >
            Blog
          </Link>
        </div>
      </div>
    </header>
  );
}
