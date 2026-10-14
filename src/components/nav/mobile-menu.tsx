'use client';

import { useId, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { Menu } from 'lucide-react';
import type { SiteContent } from '@/content';

// The modal, focus trap, and Radix runtime are only needed after a tap.
const MobileMenuPanel = dynamic(() => import('./mobile-menu-panel'), { ssr: false });

export function MobileMenu({
  content,
  activeId,
}: {
  content: Pick<SiteContent, 'nav' | 'ui'>;
  activeId: string | null;
}) {
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const id = useId();

  return (
    <>
      <button
        ref={trigger}
        type="button"
        aria-label={content.ui.openMenu}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={open ? id : undefined}
        onClick={() => setOpen(true)}
        className="inline-flex h-11 w-11 items-center justify-center rounded-md transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 lg:hidden"
      >
        <Menu className="h-5 w-5" aria-hidden="true" />
      </button>
      {open && <MobileMenuPanel id={id} content={content} activeId={activeId} onClose={() => setOpen(false)} onReturnFocus={() => trigger.current?.focus()} />}
    </>
  );
}
