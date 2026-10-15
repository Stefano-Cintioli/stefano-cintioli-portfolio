export function enhance(section: HTMLElement) {
  const buttons = Array.from(section.querySelectorAll<HTMLButtonElement>('[data-country-panel]'));
  const panels = Array.from(section.querySelectorAll<HTMLElement>('[data-country-content]'));
  const select = (event: MouseEvent) => {
    const button = event.currentTarget as HTMLButtonElement;
    const selected = button.dataset.countryPanel;
    buttons.forEach(item => item.setAttribute('aria-pressed', String(item.dataset.countryPanel === selected)));
    panels.forEach(panel => { panel.hidden = panel.id !== selected; });
  };
  buttons.forEach(button => button.addEventListener('click', select));
  const frames = new Set<number>();
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const observer = new IntersectionObserver(entries => {
    if (reduced.matches) return;
    entries.filter(entry => entry.isIntersecting).forEach(entry => {
      observer.unobserve(entry.target);
      const element = entry.target as HTMLElement;
      const target = Number(element.dataset.countTarget);
      const suffix = element.dataset.countSuffix ?? '';
      const start = performance.now();
      const tick = (now: number) => {
        const progress = Math.min(1, (now - start) / 900);
        element.textContent = `${Math.round(target * (1 - (1 - progress) ** 3))}${suffix}`;
        if (progress < 1) {
          const frame = requestAnimationFrame(time => { frames.delete(frame); tick(time); });
          frames.add(frame);
        }
      };
      const frame = requestAnimationFrame(time => { frames.delete(frame); tick(time); });
      frames.add(frame);
    });
  }, { threshold: 0.7 });
  if (!reduced.matches) section.querySelectorAll('[data-count-target]').forEach(element => observer.observe(element));
  return () => {
    buttons.forEach(button => button.removeEventListener('click', select));
    observer.disconnect();
    frames.forEach(frame => cancelAnimationFrame(frame));
  };
}
