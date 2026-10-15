'use client';

import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import type { SiteContent } from '@/content';

export default function MobileMenuPanel({ id, content, activeId, onClose, onReturnFocus }: {
  id: string;
  content: Pick<SiteContent, 'nav' | 'ui'>;
  activeId: string | null;
  onClose(): void;
  onReturnFocus(): void;
}) {
  const items = [
    { href: '#builder-sessions', label: content.nav.work, id: 'builder-sessions' },
    { href: '#online-events', label: content.nav.online, id: 'online-events' },
    { href: '#offline-events', label: content.nav.offline, id: 'offline-events' },
    { href: '#contact', label: content.nav.contact, id: 'contact' },
  ];

  return (
    <Sheet open onOpenChange={value => { if (!value) onClose(); }}>
      <SheetContent id={id} closeLabel={content.ui.closeMenu} aria-describedby={undefined} side="right" className="w-[260px] sm:w-[300px]" onCloseAutoFocus={event => { event.preventDefault(); onReturnFocus(); }}>
        <SheetHeader>
          <SheetTitle className="font-display text-xl">Stefano Cintioli</SheetTitle>
        </SheetHeader>
        <nav aria-label={content.ui.navigation} className="mt-8 flex flex-col gap-1 px-4">
          {items.map(item => {
            const isActive = item.id === activeId;
            return (
              <a key={item.id} href={item.href} onClick={onClose} aria-current={isActive ? 'location' : undefined} className={[
                'rounded-md px-3 py-3 font-display text-xl transition-colors',
                isActive ? 'text-gold-ink' : 'text-foreground/80 hover:text-foreground hover:bg-muted',
              ].join(' ')}>{item.label}</a>
            );
          })}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
