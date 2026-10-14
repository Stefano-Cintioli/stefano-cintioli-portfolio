import { communityGrowth } from '@/content/community-growth';
import { PAD, W, x, y } from '../growth-geometry';

export function enhance(section: HTMLElement) {
  const input = section.querySelector<HTMLInputElement>('[data-growth-input]');
  const date = section.querySelector<HTMLTimeElement>('[data-growth-date]');
  const output = section.querySelector<HTMLOutputElement>('[data-growth-output]');
  const guide = section.querySelector<SVGLineElement>('[data-growth-guide]');
  const point = section.querySelector<SVGCircleElement>('[data-growth-point]');
  const chart = section.querySelector<SVGSVGElement>('[data-growth-chart]');
  if (!input || !date || !output || !guide || !point || !chart) return () => {};
  const locale = section.dataset.locale;
  const number = new Intl.NumberFormat(locale);
  const formatter = new Intl.DateTimeFormat(locale, { year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC' });
  const update = (index: number) => {
    const selected = Math.max(0, Math.min(communityGrowth.length - 1, index));
    const [day, net] = communityGrowth[selected];
    const dateText = formatter.format(new Date(`${day}T12:00:00Z`));
    const value = `${net >= 0 ? '+' : ''}${number.format(net)}`;
    input.value = String(selected);
    input.setAttribute('aria-valuetext', `${dateText}, ${value} ${section.dataset.growthLabel}`);
    date.dateTime = day;
    date.textContent = dateText;
    output.textContent = value;
    guide.setAttribute('x1', String(x(selected)));
    guide.setAttribute('x2', String(x(selected)));
    point.setAttribute('cx', String(x(selected)));
    point.setAttribute('cy', String(y(net)));
  };
  const change = () => update(Number(input.value));
  const pointer = (event: PointerEvent) => {
    if (event.pointerType !== 'mouse') return;
    const box = chart.getBoundingClientRect();
    const fraction = ((event.clientX - box.left) / box.width * W - PAD) / (W - PAD * 2);
    update(Math.round(fraction * (communityGrowth.length - 1)));
  };
  input.addEventListener('input', change);
  chart.addEventListener('pointermove', pointer);
  update(Number(input.value));
  return () => {
    input.removeEventListener('input', change);
    chart.removeEventListener('pointermove', pointer);
  };
}
