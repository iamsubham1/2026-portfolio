import dynamic from "next/dynamic";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Projects } from "@/components/Projects";
import { Experience } from "@/components/Experience";
import { Skills } from "@/components/Skills";
import { Footer } from "@/components/Footer";

const Contact = dynamic(() => import("@/components/Contact"), {
  loading: () => (
    <section id="contact" className="border-t border-[var(--border)] py-24 sm:py-28" aria-busy="true">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto h-8 max-w-md animate-pulse rounded-lg bg-[var(--border)]" />
        <div className="mx-auto mt-6 h-4 max-w-lg animate-pulse rounded-lg bg-[var(--border)]" />
        <div className="mx-auto mt-14 grid max-w-xl gap-4">
          <div className="h-16 animate-pulse rounded-xl bg-[var(--border)]" />
          <div className="h-16 animate-pulse rounded-xl bg-[var(--border)]" />
          <div className="h-32 animate-pulse rounded-xl bg-[var(--border)]" />
        </div>
      </div>
    </section>
  ),
});

export default function HomePage() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
