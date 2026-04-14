"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export function CursorGlow() {
  const [enabled, setEnabled] = useState(false);
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setEnabled(window.matchMedia("(pointer: fine)").matches);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const d = dot.current;
    const r = ring.current;
    if (!d || !r) return;

    gsap.set([d, r], { xPercent: -50, yPercent: -50 });

    const onMove = (e: PointerEvent) => {
      gsap.to(d, { x: e.clientX, y: e.clientY, duration: 0.08, ease: "power2.out", overwrite: "auto" });
      gsap.to(r, { x: e.clientX, y: e.clientY, duration: 0.55, ease: "power3.out", overwrite: "auto" });
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={dot}
        className="pointer-events-none fixed left-0 top-0 z-[90] hidden h-2 w-2 rounded-full bg-[var(--accent)] mix-blend-difference md:block"
        aria-hidden
      />
      <div
        ref={ring}
        className="pointer-events-none fixed left-0 top-0 z-[89] hidden h-11 w-11 rounded-full border border-[var(--accent)] opacity-35 md:block"
        aria-hidden
      />
    </>
  );
}
