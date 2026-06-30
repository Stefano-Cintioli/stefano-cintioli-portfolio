import type { SiteContent } from '@/content';

/**
 * Footer — name, location, copyright, last-updated. No social icons (the
 * #contact section above carries those; duplicating them in the footer
 * felt like the same row twice).
 */
export function SiteFooter({ content }: { content: SiteContent }) {
  const lastUpdated = new Date().toISOString().slice(0, 10);

  return (
    <footer className="border-t border-hairline bg-bg-deep">
      <div className="container max-w-5xl py-10 md:py-12">
        <div className="flex flex-col gap-2 md:gap-3">
          <p className="font-display text-2xl md:text-3xl font-medium tracking-tight leading-none">
            Stefano Cintioli
          </p>
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.12em] text-fg-mute">
            {content.footer.loc}
          </p>
        </div>

        <div className="mt-8 pt-5 border-t border-hairline flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 font-mono text-[0.65rem] uppercase tracking-[0.1em] text-fg-mute">
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
