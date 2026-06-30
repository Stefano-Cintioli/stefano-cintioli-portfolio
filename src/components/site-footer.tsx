import { SocialGlyph } from '@/components/social-glyph';
import type { SiteContent } from '@/content';

/**
 * Site footer.
 *
 * Visually lighter treatment for the social row (no border, smaller, muted)
 * so it doesn't compete with the #contact section above, where the same
 * icons are the primary contact surface. Footer = chrome, not CTA.
 */
export function SiteFooter({ content }: { content: SiteContent }) {
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

          {/* Right — small, borderless social glyphs */}
          <ul
            className="flex flex-wrap gap-5 items-center"
            aria-label="Social links"
          >
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
                  className="inline-grid place-items-center h-8 w-8 rounded-md text-fg-mute hover:text-primary transition-colors"
                >
                  <SocialGlyph kind={item.kind} className="h-[18px] w-[18px]" />
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
