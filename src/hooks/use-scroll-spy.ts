'use client';

import { useEffect, useState } from 'react';

/**
 * Scroll-spy via IntersectionObserver.
 *
 * Observes the elements with the given ids and returns the id of the one
 * currently considered "in view" (intersecting per the rootMargin window).
 * No scroll math — the browser does the work and dispatches on intersection
 * changes, so it's debounced for free.
 *
 * `rootMargin: '-40% 0px -55% 0px'` defines a horizontal slab anchored
 * slightly above center — a section is "active" when its top has scrolled
 * past 40% of the viewport, until it has scrolled all the way past 45%.
 */
export function useScrollSpy(
  ids: string[],
  opts: { rootMargin?: string } = {},
): string | null {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;

    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const visible = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visible.set(entry.target.id, entry.intersectionRatio);
          } else {
            visible.delete(entry.target.id);
          }
        });

        // Prefer the topmost intersecting section (matches what the eye picks).
        let topId: string | null = null;
        let topY = Infinity;
        visible.forEach((_ratio, id) => {
          const el = document.getElementById(id);
          if (!el) return;
          const y = el.getBoundingClientRect().top;
          if (y < topY) {
            topY = y;
            topId = id;
          }
        });

        setActiveId(topId);
      },
      {
        rootMargin: opts.rootMargin ?? '-40% 0px -55% 0px',
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids, opts.rootMargin]);

  return activeId;
}
