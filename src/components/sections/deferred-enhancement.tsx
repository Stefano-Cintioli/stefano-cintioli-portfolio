'use client';

import { useEffect } from 'react';

type Kind = 'sessions' | 'growth' | 'events';
const loaders = {
  sessions: () => import('./section-enhancers/sessions'),
  growth: () => import('./section-enhancers/growth'),
  events: () => import('./section-enhancers/events'),
};

/** Complete HTML is rendered on the server. Interaction code waits for visibility or intent. */
export function DeferredEnhancement({ id, kind }: { id: string; kind: Kind }) {
  useEffect(() => {
    const section = document.getElementById(id);
    if (!section) return;
    let disposed = false;
    let loaded = false;
    let pending = false;
    let cleanup: (() => void) | undefined;
    let queued: HTMLElement | null = null;
    const load = () => {
      if (loaded || pending || disposed) return;
      pending = true;
      loaders[kind]().then(module => {
        if (disposed) return;
        cleanup = module.enhance(section);
        loaded = true;
        pending = false;
        section.dataset.enhanced = 'true';
        queued?.click();
        queued = null;
      }).catch(() => {
        pending = false;
        queued = null;
        // Static content, outbound links and native scrolling remain available.
      });
    };
    const click = (event: MouseEvent) => {
      if (loaded || !(event.target instanceof Element)) return;
      const control = event.target.closest<HTMLElement>('[data-enhance-control]');
      if (control && section.contains(control)) queued = control;
      load();
    };
    const observer = new IntersectionObserver(entries => {
      if (!entries.some(entry => entry.isIntersecting && entry.intersectionRatio > 0)) return;
      observer.disconnect();
      load();
    }, { rootMargin: '0px', threshold: 0 });
    observer.observe(section);
    section.addEventListener('focusin', load);
    section.addEventListener('pointerenter', load);
    section.addEventListener('click', click, true);
    return () => {
      disposed = true;
      observer.disconnect();
      section.removeEventListener('focusin', load);
      section.removeEventListener('pointerenter', load);
      section.removeEventListener('click', click, true);
      cleanup?.();
      delete section.dataset.enhanced;
    };
  }, [id, kind]);
  return null;
}
