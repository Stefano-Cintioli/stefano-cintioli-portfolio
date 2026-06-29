import { ThemeToggle } from '@/components/theme-toggle';

/**
 * Phase 2 page — exercises the theme system end-to-end.
 * The real layout (sticky nav with the toggle in the top-right) lands in Phase 4.
 * The real sections (Hero → Currently → Work → Impact → How I think → Contact)
 * land in Phase 5, sourced from the typed per-locale content layer (Phase 3).
 */
export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Provisional nav-corner toggle — Phase 4 will fold this into a real nav */}
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      <section className="container max-w-3xl py-24 md:py-32">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-primary mb-5">
          v2 · Phase 2 · Tokens + theme
        </p>
        <h1 className="font-display text-5xl md:text-7xl leading-[0.96] tracking-tight mb-7">
          Stefano Cintioli
        </h1>
        <p className="text-lg text-fg-dim max-w-prose leading-relaxed mb-10">
          Next.js redesign in progress. Theme tokens (light + dark), shadcn/ui
          primitives, and a working theme toggle are all wired through the same
          design-token system — no parallel sets, no hardcoded hex. Real
          sections land in Phase 5.
        </p>

        <div className="grid gap-3 sm:grid-cols-3 max-w-md">
          <SwatchCard name="primary" desc="BNB gold" />
          <SwatchCard name="background" desc="Page bg" />
          <SwatchCard name="foreground" desc="Body text" />
        </div>
      </section>
    </main>
  );
}

function SwatchCard({ name, desc }: { name: string; desc: string }) {
  return (
    <div className="rounded-md border border-border bg-card p-3 text-card-foreground">
      <div
        className="h-8 w-full rounded-sm mb-2"
        style={{ background: `hsl(var(--${name}))` }}
        aria-hidden="true"
      />
      <p className="font-mono text-[0.7rem] uppercase tracking-wider text-muted-foreground">
        --{name}
      </p>
      <p className="text-sm">{desc}</p>
    </div>
  );
}
