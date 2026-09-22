'use client';

import { useState } from 'react';
import { Menu } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import type { SiteContent } from '@/content';

export function MobileMenu({
  content,
  activeId,
}: {
  content: SiteContent;
  activeId: string | null;
}) {
  const [open, setOpen] = useState(false);

  const items = [
    { href: '#builder-sessions', label: content.nav.work, id: 'builder-sessions' },
    { href: '#online-events', label: content.nav.online, id: 'online-events' },
    { href: '#offline-events', label: content.nav.offline, id: 'offline-events' },
    { href: '#about', label: content.nav.about, id: 'about' },
    { href: '#contact', label: content.nav.contact, id: 'contact' },
  ];

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label={content.ui.openMenu}
          className="h-9 w-9 lg:hidden"
        >
          <Menu className="h-5 w-5" aria-hidden="true" />
        </Button>
      </SheetTrigger>
      <SheetContent closeLabel={content.ui.closeMenu} aria-describedby={undefined} side="right" className="w-[260px] sm:w-[300px]">
        <SheetHeader>
          <SheetTitle className="font-display text-xl">
            Stefano Cintioli
          </SheetTitle>
        </SheetHeader>
        <nav aria-label={content.ui.navigation} className="mt-8 flex flex-col gap-1 px-4">
          {items.map((item) => {
            const isActive = item.id === activeId;
            return (
              <a
                key={item.id}
                href={item.href}
                onClick={() => setOpen(false)}
                aria-current={isActive ? 'location' : undefined}
                className={[
                  'rounded-md px-3 py-3 font-display text-xl transition-colors',
                  isActive
                    ? 'text-gold-ink'
                    : 'text-foreground/80 hover:text-foreground hover:bg-muted',
                ].join(' ')}
              >
                {item.label}
              </a>
            );
          })}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
