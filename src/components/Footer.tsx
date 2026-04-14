import Link from "next/link";
import { site } from "@/lib/content";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--border)] py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-4 text-sm text-[var(--muted)] sm:flex-row sm:items-center sm:px-6">
        <p>
          © {year} {site.name}. Built with Next.js, Tailwind, GSAP, and Lenis.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link className="hover:text-[var(--fg)]" href="/blog">
            Blog
          </Link>
          <a className="hover:text-[var(--fg)]" href="#hero">
            Back to top
          </a>
        </div>
      </div>
    </footer>
  );
}
