'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';

const AnimatedMesh = dynamic(() => import('@/components/hero-mesh-renderer'), { ssr: false });

/** The static background paints first. Desktop animation is an idle enhancement. */
export function HeroMesh() {
  const element = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [allowed, setAllowed] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 1024px)');
    const motion = window.matchMedia('(prefers-reduced-motion: no-preference)');
    const image = document.getElementById('hero-portrait-image') as HTMLImageElement | null;
    let disposed = false;
    let visible = false;
    let started = false;
    let painted = false;
    let awaitingPaint = false;
    let photoReady = false;
    let pageReady = document.readyState === 'complete';
    let fontsReady = !document.fonts;
    let idle: number | undefined;
    let timer: number | undefined;
    let firstFrame: number | undefined;
    let secondFrame: number | undefined;

    const eligible = () => desktop.matches && motion.matches;
    const cancelScheduled = () => {
      if (idle !== undefined) window.cancelIdleCallback(idle);
      if (timer !== undefined) window.clearTimeout(timer);
      idle = undefined;
      timer = undefined;
    };
    const start = () => {
      idle = undefined;
      timer = undefined;
      if (disposed || !eligible() || !visible || document.hidden) return;
      started = true;
      // Paper requires WebGL2. Keep the CSS background if the browser or
      // device has disabled it, rather than importing a renderer that throws.
      const probe = document.createElement('canvas');
      const context = probe.getContext('webgl2');
      if (!context) return;
      context.getExtension('WEBGL_lose_context')?.loseContext();
      setLoaded(true);
      setPlaying(true);
    };
    const schedule = () => {
      if (disposed || started || !painted || !eligible() || !visible || document.hidden || idle !== undefined || timer !== undefined) return;
      if (typeof window.requestIdleCallback === 'function') idle = window.requestIdleCallback(start, { timeout: 3000 });
      else timer = window.setTimeout(start, 250);
    };
    const update = () => {
      if (disposed) return;
      setAllowed(eligible());
      setPlaying(started && eligible() && visible && !document.hidden);
      if (!eligible() || !visible || document.hidden) cancelScheduled();
      schedule();
    };
    const afterPaint = () => {
      if (disposed || awaitingPaint || !pageReady || !photoReady || !fontsReady) return;
      awaitingPaint = true;
      // Decode + load + fonts, then two paints: the portrait has appeared before
      // an idle callback can import the optional shader package.
      firstFrame = window.requestAnimationFrame(() => {
        secondFrame = window.requestAnimationFrame(() => {
          if (disposed) return;
          painted = true;
          schedule();
        });
      });
    };
    const onPhotoReady = () => {
      if (!image?.naturalWidth) return;
      image.decode().catch(() => undefined).then(() => {
        if (disposed) return;
        photoReady = true;
        afterPaint();
      });
    };
    const onLoad = () => { pageReady = true; afterPaint(); };
    const observer = new IntersectionObserver(entries => {
      visible = entries[0]?.isIntersecting ?? false;
      update();
    });
    if (element.current) observer.observe(element.current);
    if (image?.complete) onPhotoReady();
    else image?.addEventListener('load', onPhotoReady);
    if (document.fonts) document.fonts.ready.then(() => {
      if (disposed) return;
      fontsReady = true;
      afterPaint();
    });
    window.addEventListener('load', onLoad);
    desktop.addEventListener('change', update);
    motion.addEventListener('change', update);
    document.addEventListener('visibilitychange', update);
    update();

    return () => {
      disposed = true;
      cancelScheduled();
      if (firstFrame !== undefined) window.cancelAnimationFrame(firstFrame);
      if (secondFrame !== undefined) window.cancelAnimationFrame(secondFrame);
      observer.disconnect();
      image?.removeEventListener('load', onPhotoReady);
      window.removeEventListener('load', onLoad);
      desktop.removeEventListener('change', update);
      motion.removeEventListener('change', update);
      document.removeEventListener('visibilitychange', update);
    };
  }, []);

  return <div ref={element} className="hero-mesh" aria-hidden="true" data-mesh-state={!loaded || !allowed ? 'static' : playing ? 'animated' : 'paused'}>
    {loaded && allowed && <AnimatedMesh playing={playing} />}
  </div>;
}
