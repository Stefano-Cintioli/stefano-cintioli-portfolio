import type { SiteContent } from '@/content';
export function SiteFooter({ content }: { content: SiteContent }) {
  return <footer className="border-t border-hairline"><div className="container max-w-6xl py-7 text-sm text-fg-dim">{content.footer.copyright}</div></footer>;
}
