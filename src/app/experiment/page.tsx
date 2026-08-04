/**
 * TEMPORARY design-experiment page. Delete `src/app/experiment/` to remove.
 *
 * Two review surfaces:
 *  1. Display-face candidates for Tier 3 #1 — the same headline + a hard accent
 *     test (ñ / ã / í / ç) rendered in Geist (current), Fraunces (live pick),
 *     Instrument Serif, and Bricolage Grotesque.
 *  2. Gold swatch — #F0B90B (current, live) vs #FFE900 (brand file) on navy.
 *     Comparison only; the live accent color is NOT changed.
 */

const HEADLINE = 'Conectando el talento de la región';
const ACCENTS = 'ñ ã í ç — Señal · região · indústria · apalancándome · coração';

const FACES = [
  { name: 'Geist (current)', varName: 'var(--font-geist-sans)', note: 'what ships today' },
  { name: 'Fraunces', varName: 'var(--exp-fraunces)', note: 'LIVE on this preview — soft editorial serif' },
  { name: 'Instrument Serif', varName: 'var(--exp-instrument)', note: 'high-contrast magazine serif' },
  { name: 'Bricolage Grotesque', varName: 'var(--exp-bricolage)', note: 'characterful display sans (stays sans)' },
];

const GOLDS = [
  { hex: '#F0B90B', label: 'Current (live)' },
  { hex: '#FFE900', label: 'Brand file' },
];

export default function ExperimentPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <div className="mb-14 rounded-lg border border-primary/40 bg-primary/10 px-5 py-4 font-mono text-sm">
        <strong>TEMPORARY — design experiment.</strong> Not linked, noindex.
        Delete <code>src/app/experiment/</code> before any merge.
      </div>

      {/* 1. Display-face candidates */}
      <h1 className="font-mono text-xs uppercase tracking-[0.16em] text-gold-ink mb-2">
        Tier 3 #1 — display face candidates
      </h1>
      <p className="text-sm text-fg-dim mb-10 max-w-[60ch]">
        Same headline + a hard accent line in each candidate. Check ñ / ã / í / ç
        render cleanly and the tone. Numbers stay on Geist regardless — only
        headline text changes.
      </p>

      <div className="space-y-8">
        {FACES.map((f) => (
          <section key={f.name} className="border-t border-hairline pt-5">
            <div className="mb-3 flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="font-mono text-xs text-foreground">{f.name}</span>
              <span className="font-mono text-[0.7rem] text-fg-mute">{f.note}</span>
            </div>
            <p
              style={{ fontFamily: f.varName }}
              className="text-4xl md:text-5xl font-medium leading-[1.05] tracking-[-0.02em] text-foreground text-balance mb-3"
            >
              {HEADLINE}
            </p>
            <p
              style={{ fontFamily: f.varName }}
              className="text-2xl md:text-3xl leading-[1.2] text-fg-dim"
            >
              {ACCENTS}
            </p>
          </section>
        ))}
      </div>

      {/* 2. Gold swatch comparison */}
      <h2 className="font-mono text-xs uppercase tracking-[0.16em] text-gold-ink mt-20 mb-2">
        Tier 3 #2 — gold swatch (comparison only, accent NOT changed)
      </h2>
      <p className="text-sm text-fg-dim mb-8 max-w-[60ch]">
        #F0B90B (live) vs #FFE900 (brand file) on the navy surface, shown as fill,
        as text, and as a hairline. The live site is unchanged.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {GOLDS.map((g) => (
          <div
            key={g.hex}
            className="rounded-xl border border-hairline overflow-hidden"
            style={{ backgroundColor: '#0d1117' }}
          >
            <div className="h-28 w-full" style={{ backgroundColor: g.hex }} />
            <div className="p-5">
              <div className="flex items-baseline justify-between">
                <span className="font-mono text-sm" style={{ color: g.hex }}>
                  {g.label}
                </span>
                <span className="font-mono text-xs text-fg-mute">{g.hex}</span>
              </div>
              <p className="mt-3 text-2xl font-semibold" style={{ color: g.hex }}>
                800+ followers
              </p>
              <p className="mt-1 text-sm" style={{ color: '#9CA3AF' }}>
                sample body on navy, with a{' '}
                <span style={{ color: g.hex }}>gold link</span> inline.
              </p>
              <div className="mt-4 h-px w-full" style={{ backgroundColor: g.hex }} />
              <button
                type="button"
                className="mt-4 rounded-md px-4 py-2 text-sm font-medium"
                style={{ backgroundColor: g.hex, color: '#0d1117' }}
              >
                Filled button
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
