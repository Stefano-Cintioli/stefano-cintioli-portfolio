import { SocialGlyph } from '@/components/social-glyph';
import type { ContactItem } from '@/content';
import { cn } from '@/lib/utils';

/** Hero and contact share the same localized social data and accessible links. */
export function SocialLinks({ items, className }: { items: ContactItem[]; className?: string }) {
  return (
    <ul className={cn('flex flex-wrap justify-center gap-3', className)}>
      {items.map(item => {
        const external = item.href.startsWith('http');
        return (
          <li key={item.kind}>
            <a href={item.href} target={external ? '_blank' : undefined} rel={external ? 'noopener noreferrer' : undefined} aria-label={item.label} title={item.label} className="social-link group">
              <SocialGlyph kind={item.kind} className="h-[22px] w-[22px]" />
              <span aria-hidden="true" className="social-tooltip">{item.label}</span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}
