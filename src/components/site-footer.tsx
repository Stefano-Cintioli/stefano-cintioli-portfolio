import { Mail } from 'lucide-react';

import type { SiteContent } from '@/content';

/**
 * Site footer — reuses the contact items from content.contact for socials,
 * so we don't duplicate handles/links between the contact section and the
 * footer. footer.lastUpdated is sourced server-side from the build date so
 * the published HTML carries a real ISO date and CDN-cached HTML doesn't lie.
 */
export function SiteFooter({ content }: { content: SiteContent }) {
  // Build-time ISO date — stamped at server-render. Falls back gracefully.
  const lastUpdated = new Date().toISOString().slice(0, 10);

  return (
    <footer className="border-t border-hairline bg-bg-deep">
      <div className="container max-w-5xl py-12 md:py-14">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-10 md:gap-12 items-end">
          {/* Left — signature + location */}
          <div>
            <p className="font-display text-3xl md:text-4xl font-medium tracking-tight leading-none mb-3">
              Stefano Cintioli
            </p>
            <p className="font-mono text-xs uppercase tracking-[0.12em] text-fg-mute">
              {content.footer.loc}
            </p>
          </div>

          {/* Right — social glyphs */}
          <ul className="flex flex-wrap gap-2.5" aria-label="Social links">
            {content.contact.items.map((item) => (
              <li key={item.kind}>
                <a
                  href={item.href}
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel={
                    item.href.startsWith('http')
                      ? 'noopener noreferrer'
                      : undefined
                  }
                  aria-label={item.label}
                  className="inline-grid place-items-center h-9 w-9 rounded-md border border-border text-fg-mute hover:text-primary hover:border-primary hover:-translate-y-px transition-all duration-200"
                >
                  <SocialIcon kind={item.kind} />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Hairline + meta row */}
        <div className="mt-10 pt-5 border-t border-hairline flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 font-mono text-[0.65rem] uppercase tracking-[0.1em] text-fg-mute">
          <p>{content.footer.copyright}</p>
          <p>
            {content.footer.lastUpdatedLabel}{' '}
            <span className="text-fg-dim">{lastUpdated}</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

/**
 * Outline-style social glyphs. Same set as the contact-list icons; kept
 * inline (not separate files) because the set is small and stable.
 */
function SocialIcon({ kind }: { kind: 'email' | 'x' | 'linkedin' | 'telegram' }) {
  if (kind === 'email') {
    return <Mail className="h-4 w-4" aria-hidden="true" />;
  }
  if (kind === 'x') {
    return (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
        <path d="M4 4l16 16M20 4L4 20" />
      </svg>
    );
  }
  if (kind === 'linkedin') {
    return (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="3" />
        <line x1="8" y1="11" x2="8" y2="17" />
        <circle cx="8" cy="7.5" r="0.7" fill="currentColor" />
        <path d="M12 17v-4a2.5 2.5 0 0 1 5 0v4" />
        <line x1="12" y1="11" x2="12" y2="17" />
      </svg>
    );
  }
  if (kind === 'telegram') {
    return (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 11.5l17-7-3 16-6-5-2 5-1-6 11-8" />
      </svg>
    );
  }
  return null;
}
