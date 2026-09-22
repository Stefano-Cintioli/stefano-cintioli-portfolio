'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, Play } from 'lucide-react';
import type { EventCollection, Locale, SiteContent } from '@/content';

/** Native scroll-snap: touch, trackpad, keyboard and explicit controls; never auto-rotates. */
export function Events({ id, collection, ui, locale }: { id: string; collection: EventCollection; ui: SiteContent['ui']; locale: Locale }) {
  const rail = useRef<HTMLUListElement>(null);
  const [edges, setEdges] = useState({ start: true, end: false });

  useEffect(() => {
    const el = rail.current;
    if (!el) return;
    const update = () => setEdges({ start: el.scrollLeft <= 2, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 2 });
    update();
    el.addEventListener('scroll', update, { passive: true });
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => { el.removeEventListener('scroll', update); observer.disconnect(); };
  }, []);

  function move(direction: number) {
    const el = rail.current;
    if (!el) return;
    const step = (el.firstElementChild?.getBoundingClientRect().width ?? el.clientWidth) + 24;
    el.scrollBy({ left: direction * step, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  }

  return (
    <section id={id} aria-labelledby={`${id}-heading`} className="section-space">
      <div className="container max-w-6xl">
        <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div className="max-w-[65ch]">
            <h2 id={`${id}-heading`} className="section-title">{collection.heading}</h2>
            <p className="mt-4 text-lg font-medium">{collection.intro}</p>
            <p className="mt-2 text-sm leading-relaxed text-fg-dim">{collection.description}</p>
          </div>
          <div className="flex shrink-0 self-end gap-2">
            <button type="button" className="rail-control" aria-label={`${ui.previous} · ${collection.heading}`} aria-controls={`${id}-rail`} disabled={edges.start} onClick={() => move(-1)}><ArrowLeft size={18} aria-hidden="true" /></button>
            <button type="button" className="rail-control" aria-label={`${ui.next} · ${collection.heading}`} aria-controls={`${id}-rail`} disabled={edges.end} onClick={() => move(1)}><ArrowRight size={18} aria-hidden="true" /></button>
          </div>
        </div>
        <ul ref={rail} id={`${id}-rail`} aria-label={collection.heading} tabIndex={0} className="event-rail" onKeyDown={event => {
          if (event.target !== event.currentTarget) return;
          if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') { event.preventDefault(); move(event.key === 'ArrowRight' ? 1 : -1); }
        }}>
          {collection.items.map(item => (
            <li key={item.id} className="event-slide">
              <article className="flex h-full flex-col overflow-hidden rounded-xl border border-hairline bg-background">
                {item.videoId ? (
                  <a href={item.url} target="_blank" rel="noopener noreferrer" className="group relative block aspect-video w-full overflow-hidden bg-bg-2" aria-label={`${ui.youtube} · ${item.title}`}>
                    {/* Preview links directly to the recording; no embedded-player dependency. */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={`https://i.ytimg.com/vi/${item.videoId}/hqdefault.jpg`} alt="" loading="lazy" width={480} height={360} className="h-full w-full object-cover" />
                    <span className="absolute inset-0 grid place-items-center bg-black/10"><span className="grid h-12 w-12 place-items-center rounded-full bg-primary text-primary-foreground transition-transform group-hover:scale-110"><Play size={20} fill="currentColor" aria-hidden="true" /></span></span>
                  </a>
                ) : item.photo ? (
                  <div className="relative aspect-video bg-bg-2"><Image src={item.photo} alt={item.alt ?? item.title} fill sizes="(max-width: 640px) 85vw, 360px" className="object-cover" style={{ objectPosition: item.photoPosition ?? '50% 32%', objectFit: item.photoFit ?? 'cover' }} /></div>
                ) : (
                  <div className="event-poster"><span aria-hidden="true" className="event-poster-dot" /><h3 className="max-w-[20ch]">{item.title}</h3></div>
                )}
                <div className="flex flex-1 flex-col p-5">
                  <p className="mb-3 flex items-center gap-3 text-xs text-fg-dim"><time dateTime={item.date}>{new Intl.DateTimeFormat(locale, { month: 'short', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${item.date.length === 7 ? item.date + '-01' : item.date}T12:00:00Z`))}</time>{item.language && <span className="rounded border border-hairline-2 px-1.5 py-0.5">{item.language}</span>}</p>
                  {(item.videoId || item.photo) && <h3 className="text-xl font-medium leading-snug tracking-tight">{item.title}</h3>}
                  <p className="mb-5 mt-3 text-sm leading-relaxed text-fg-dim">{item.description}</p>
                  {item.videoId ? <a className="mt-auto inline-flex min-h-11 items-center gap-2 text-sm underline underline-offset-4" href={item.url} target="_blank" rel="noopener noreferrer">{ui.youtube}<ArrowUpRight size={14} aria-hidden="true" /></a> : <a className="mt-auto inline-flex min-h-11 items-center gap-2 text-sm underline underline-offset-4" href={item.url} target="_blank" rel="noopener noreferrer">{collection.action}<ArrowUpRight size={14} aria-hidden="true" /></a>}
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
