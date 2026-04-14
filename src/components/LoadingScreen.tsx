"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { site } from "@/lib/content";
import { registerGsap } from "@/lib/gsap-register";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function LoadingScreen() {
  const reduce = useReducedMotion();
  const [visible, setVisible] = useState(true);
  const root = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLDivElement>(null);
  const bot = useRef<HTMLDivElement>(null);
  const eyeLeft = useRef<HTMLSpanElement>(null);
  const eyeRight = useRef<HTMLSpanElement>(null);
  const antenna = useRef<HTMLSpanElement>(null);
  const pupilWrap = useRef<HTMLDivElement>(null);
  const mouthBars = useRef<HTMLDivElement>(null);
  const badgeA = useRef<HTMLSpanElement>(null);
  const badgeB = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (reduce) {
      setVisible(false);
      return;
    }

    registerGsap();
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.inOut" },
        onComplete: () => {
          setVisible(false);
          requestAnimationFrame(() => ScrollTrigger.refresh());
        },
      });

      gsap.to(bot.current, {
        y: -6,
        duration: 0.55,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });
      gsap.to(bot.current, {
        rotate: 4,
        duration: 0.7,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
        transformOrigin: "center bottom",
      });
      gsap.to([eyeLeft.current, eyeRight.current], {
        opacity: 0.25,
        duration: 0.3,
        yoyo: true,
        repeat: -1,
        repeatDelay: 0.8,
        stagger: 0.04,
        ease: "power1.inOut",
      });
      gsap.to(antenna.current, {
        scale: 1.18,
        duration: 0.5,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
        transformOrigin: "center",
      });
      gsap.to(pupilWrap.current, {
        x: 3,
        duration: 0.4,
        yoyo: true,
        repeat: -1,
        repeatDelay: 0.45,
        ease: "power1.inOut",
      });
      gsap.fromTo(
        mouthBars.current?.children ?? [],
        { scaleY: 0.45, transformOrigin: "center bottom" },
        {
          scaleY: 1.2,
          duration: 0.32,
          repeat: -1,
          yoyo: true,
          stagger: 0.08,
          ease: "sine.inOut",
        },
      );
      const bubbleTl = gsap.timeline({ repeat: -1, repeatDelay: 0.15 });
      bubbleTl
        .set([badgeA.current, badgeB.current], { opacity: 0, scale: 0.8, y: 0 })
        .to(badgeA.current, {
          opacity: 1,
          y: -7,
          scale: 1,
          duration: 0.26,
          ease: "power2.out",
        })
        .to(
          badgeA.current,
          {
            y: -17,
            scale: 1.12,
            opacity: 0,
            duration: 0.35,
            ease: "power2.in",
          },
          ">-0.02",
        )
        .to(
          badgeB.current,
          {
            opacity: 1,
            y: -7,
            scale: 1,
            duration: 0.24,
            ease: "power2.out",
          },
          ">-0.06",
        )
        .to(badgeB.current, {
          y: -18,
          scale: 1.15,
          opacity: 0,
          duration: 0.35,
          ease: "power2.in",
        });

      tl.fromTo(
        bar.current,
        { scaleX: 0, transformOrigin: "left center" },
        { scaleX: 1, duration: 0.9 },
      )
        .to(bar.current, { scaleX: 0, transformOrigin: "right center", duration: 0.35 }, "-=0.15")
        .to(
          label.current,
          { y: -12, opacity: 0, letterSpacing: "0.35em", duration: 0.35 },
          "<0.1",
        )
        .to(
          root.current,
          { clipPath: "inset(0% 0% 100% 0%)", duration: 0.55, ease: "power4.inOut" },
          "-=0.05",
        );
    }, root);

    return () => ctx.revert();
  }, [reduce]);

  if (!visible) return null;

  return (
    <div
      ref={root}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[var(--bg)]"
      style={{ clipPath: "inset(0% 0% 0% 0%)" }}
      aria-hidden
    >
      <div ref={bot} className="mb-5">
        <div className="relative mx-auto h-14 w-16 rounded-2xl border border-[var(--border)] bg-[var(--card)]">
          <span
            ref={badgeA}
            className="absolute -right-1 -top-1 rounded-full border border-[var(--border)] bg-[var(--accent)] px-1.5 py-0.5 text-[8px] font-semibold uppercase tracking-[0.06em] text-white opacity-0"
          >
            beep
          </span>
          <span
            ref={badgeB}
            className="absolute -right-1 -top-1 rounded-full border border-[var(--border)] bg-[var(--accent)]/90 px-1.5 py-0.5 text-[8px] font-semibold uppercase tracking-[0.06em] text-white opacity-0"
          >
            boop
          </span>
          <span className="absolute left-1/2 top-1 block h-2 w-2 -translate-x-1/2 rounded-full bg-[var(--accent)]/70" ref={antenna} />
          <span className="absolute left-1/2 top-0 h-2 w-px -translate-x-1/2 bg-[var(--border)]" />
          <div ref={pupilWrap} className="absolute inset-x-0 top-5 flex items-center justify-center gap-3">
            <span ref={eyeLeft} className="h-2 w-2 rounded-full bg-[var(--accent)] shadow-[0_0_6px_rgba(99,102,241,0.8)]" />
            <span ref={eyeRight} className="h-2 w-2 rounded-full bg-[var(--accent)] shadow-[0_0_6px_rgba(99,102,241,0.8)]" />
          </div>
          <div ref={mouthBars} className="absolute inset-x-0 bottom-2 mx-auto flex h-2 w-8 items-end justify-center gap-0.5">
            <span className="h-1 w-1 rounded-full bg-[var(--accent)]/80" />
            <span className="h-2 w-1 rounded-full bg-[var(--accent)]/80" />
            <span className="h-1.5 w-1 rounded-full bg-[var(--accent)]/80" />
          </div>
        </div>
      </div>
      <div ref={label} className="mb-6 text-xs font-medium uppercase tracking-[0.2em] text-[var(--muted)]">
        {site.name}
      </div>
      <div className="h-px w-40 overflow-hidden bg-[var(--border)]">
        <div
          ref={bar}
          className="h-full w-full origin-left scale-x-0 bg-[var(--accent)]"
        />
      </div>
    </div>
  );
}
