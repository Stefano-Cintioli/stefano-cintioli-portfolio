'use client';

import { useId, useRef, useState, type FormEvent } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { ArrowUpRight, Check, LoaderCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { SiteContent } from '@/content';

const endpoint = 'https://formsubmit.co/ajax/stefano.cintioli@bnbchain.org';
const fieldClass = 'mt-2 block w-full rounded-lg border border-hairline-2 bg-background px-3 py-3 text-base text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/25 disabled:opacity-60';

export function RequestCall({ copy }: { copy: SiteContent['requestForm'] }) {
  const id = useId();
  const busy = useRef(false);
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy.current) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    if (data.get('_honey')) return;
    busy.current = true;
    setStatus('sending');
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          ...Object.fromEntries(data),
          _subject: 'Portfolio · Call request',
          _template: 'table',
          _replyto: data.get('email'),
        }),
        signal: AbortSignal.timeout(20000),
      });
      const result = await response.json();
      if (!response.ok || (result.success !== true && result.success !== 'true')) throw new Error('Submission not accepted');
      setStatus('success');
      form.reset();
    } catch {
      setStatus('error');
    } finally {
      busy.current = false;
    }
  }

  return <Dialog.Root open={open} onOpenChange={value => {
    if (busy.current) return;
    setOpen(value);
    if (value) setStatus('idle');
  }}>
    <Dialog.Trigger asChild><Button size="lg" className="rounded-full px-6">{copy.title}<ArrowUpRight aria-hidden="true" /></Button></Dialog.Trigger>
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm" />
      <Dialog.Content className="fixed left-1/2 top-1/2 z-50 max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-xl -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-2xl border border-hairline-2 bg-background p-6 text-left text-foreground shadow-xl sm:p-8">
        <Dialog.Title className="pr-10 text-2xl font-semibold tracking-tight">{copy.title}</Dialog.Title>
        {status !== 'success' && <Dialog.Description className="mb-6 mt-3 text-sm leading-relaxed text-fg-dim">{copy.intro}</Dialog.Description>}
        <Dialog.Close disabled={status === 'sending'} className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full hover:bg-bg-2 disabled:opacity-40" aria-label={copy.close}><X size={20} aria-hidden="true" /></Dialog.Close>
        {status === 'success' ? <div role="status" className="space-y-5 py-5">
          <Check className="h-8 w-8 text-gold-ink" aria-hidden="true" />
          <Dialog.Description className="leading-relaxed">{copy.success}</Dialog.Description>
          <Dialog.Close asChild><Button className="rounded-full">{copy.done}</Button></Dialog.Close>
        </div> : <form onSubmit={submit} aria-busy={status === 'sending'}>
          <fieldset disabled={status === 'sending'} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block text-sm font-medium" htmlFor={`${id}-name`}>{copy.name}<input id={`${id}-name`} name="name" autoComplete="name" required maxLength={120} className={fieldClass} /></label>
              <label className="block text-sm font-medium" htmlFor={`${id}-email`}>{copy.email}<input id={`${id}-email`} name="email" type="email" autoComplete="email" required maxLength={254} className={fieldClass} /></label>
            </div>
            <label className="block text-sm font-medium" htmlFor={`${id}-company`}>{copy.company}<input id={`${id}-company`} name="company" autoComplete="organization" required maxLength={200} className={fieldClass} /></label>
            <label className="block text-sm font-medium" htmlFor={`${id}-link`}>{copy.link}<input id={`${id}-link`} name="link" type="text" inputMode="url" required maxLength={500} className={fieldClass} /></label>
            <div><label className="block text-sm font-medium" htmlFor={`${id}-message`}>{copy.message}</label><textarea id={`${id}-message`} name="message" required maxLength={3000} rows={3} aria-describedby={`${id}-hint`} className={fieldClass} /><p id={`${id}-hint`} className="mt-2 text-xs leading-relaxed text-fg-dim">{copy.hint}</p></div>
            <input name="_honey" type="text" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
            <p className="text-xs leading-relaxed text-fg-dim">{copy.privacy}</p>
            {status === 'error' && <p role="alert" className="text-sm leading-relaxed">{copy.error} <a className="underline underline-offset-4" href="mailto:stefano.cintioli@bnbchain.org">stefano.cintioli@bnbchain.org</a></p>}
            <Button type="submit" size="lg" className="w-full rounded-full">{status === 'sending' && <LoaderCircle className="animate-spin motion-reduce:animate-none" aria-hidden="true" />}{status === 'sending' ? copy.sending : copy.submit}</Button>
          </fieldset>
        </form>}
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>;
}
