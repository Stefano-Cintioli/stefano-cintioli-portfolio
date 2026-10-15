'use client';

import { useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { SiteContent } from '@/content/schema';

// Dialog validation and Radix are downloaded only after an explicit request.
const RequestCallDialog = dynamic(() => import('./request-call-dialog'), { ssr: false });

export function RequestCall({ copy }: { copy: SiteContent['requestForm'] }) {
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  return <>
    <Button ref={trigger} size="lg" className="rounded-full px-6" aria-haspopup="dialog" aria-expanded={open} onClick={() => setOpen(true)}>{copy.title}<ArrowUpRight aria-hidden="true" /></Button>
    {open && <RequestCallDialog copy={copy} onClose={() => setOpen(false)} onReturnFocus={() => trigger.current?.focus()} />}
  </>;
}
