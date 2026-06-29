/**
 * Phase 1 placeholder page.
 * The real sections (Hero → Currently → Work → Impact → How I think → Contact)
 * land in Phase 5, sourced from the typed per-locale content layer (Phase 3).
 */
export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <section className="max-w-xl">
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-accent mb-4">
          v2 · Scaffold
        </p>
        <h1 className="font-display text-5xl md:text-6xl leading-[0.98] tracking-tight mb-6">
          Stefano Cintioli
        </h1>
        <p className="text-fg-dim leading-relaxed">
          Next.js redesign in progress. Real sections land in Phase 5.
          This is the Phase 1 scaffold — confirming the build, deploy,
          and design-token pipeline before content rolls in.
        </p>
      </section>
    </main>
  );
}
