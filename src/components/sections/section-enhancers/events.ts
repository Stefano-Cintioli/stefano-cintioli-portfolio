export function enhance(section: HTMLElement) {
  const rail = section.querySelector<HTMLUListElement>('[data-event-rail]');
  const previous = section.querySelector<HTMLButtonElement>('[data-rail-direction="-1"]');
  const next = section.querySelector<HTMLButtonElement>('[data-rail-direction="1"]');
  if (!rail || !previous || !next) return () => {};
  const update = () => {
    previous.disabled = rail.scrollLeft <= 2;
    next.disabled = rail.scrollLeft + rail.clientWidth >= rail.scrollWidth - 2;
  };
  const move = (direction: number) => {
    const step = (rail.firstElementChild?.getBoundingClientRect().width ?? rail.clientWidth) + 24;
    rail.scrollBy({ left: direction * step, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  };
  const back = () => move(-1);
  const forward = () => move(1);
  const key = (event: KeyboardEvent) => {
    if (event.target !== rail || !['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
    event.preventDefault();
    move(event.key === 'ArrowRight' ? 1 : -1);
  };
  previous.addEventListener('click', back);
  next.addEventListener('click', forward);
  rail.addEventListener('keydown', key);
  rail.addEventListener('scroll', update, { passive: true });
  const observer = new ResizeObserver(update);
  observer.observe(rail);
  update();
  return () => {
    previous.removeEventListener('click', back);
    next.removeEventListener('click', forward);
    rail.removeEventListener('keydown', key);
    rail.removeEventListener('scroll', update);
    observer.disconnect();
  };
}
