import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Blog",
  description: "Notes, case studies, and experiments—optional extension to the portfolio.",
};

export default function BlogPage() {
  return (
    <>
      <Header />
      <main id="main" className="mx-auto max-w-3xl px-4 pb-24 pt-28 sm:px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">Blog</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-[var(--fg)]">Writing in progress</h1>
        <p className="mt-4 text-sm leading-relaxed text-[var(--muted)] sm:text-base">
          This route is a lightweight placeholder for longer-form case studies. Ship MDX or a CMS when you are ready;
          the home page already covers the extracted portfolio narrative.
        </p>
        <Link
          href="/"
          className="mt-10 inline-flex rounded-full border border-[var(--border)] bg-[var(--card)] px-6 py-2.5 text-sm font-medium text-[var(--fg)] transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
        >
          ← Back home
        </Link>
      </main>
      <Footer />
    </>
  );
}
