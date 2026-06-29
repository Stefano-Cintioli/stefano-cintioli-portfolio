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

/**
 * Mobile nav drawer. shadcn Sheet → Radix Dialog under the hood, so focus
 * trapping, Escape-to-close, and overlay click-out are handled correctly.
 */
export function MobileMenu({
  content,
  activeId,
}: {
  content: SiteContent;
  activeId: string | null;
}) {
  const [open, setOpen] = useState(false);

  const items = [
    { href: '#currently', label: content.nav.currently, id: 'currently' },
    { href: '#work',      label: content.nav.work,      id: 'work' },
    { href: '#how',       label: content.nav.how,       id: 'how' },
    { href: '#contact',   label: content.nav.contact,   id: 'contact' },
  ];

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Open menu"
          className="h-9 w-9 md:hidden"
        >
          <Menu className="h-5 w-5" aria-hidden="true" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[260px] sm:w-[300px]">
        <SheetHeader>
          <SheetTitle className="font-display text-xl">
            Stefano Cintioli
          </SheetTitle>
        </SheetHeader>
        <nav aria-label="Mobile" className="mt-8 flex flex-col gap-1 px-4">
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
                    ? 'text-primary'
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
