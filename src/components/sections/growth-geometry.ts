import { communityGrowth } from '@/content/community-growth';

export const W = 900, H = 230, PAD = 12;
const maximum = Math.ceil(Math.max(...communityGrowth.map(point => point[1])) / 500) * 500;
export const x = (index: number) => PAD + index / (communityGrowth.length - 1) * (W - PAD * 2);
export const y = (value: number) => H - PAD - value / maximum * (H - PAD * 2);
// Daily segments retain the observed plateaus and dips.
export const line = communityGrowth.map((point, index) => `${index ? 'L' : 'M'}${x(index).toFixed(2)},${y(point[1]).toFixed(2)}`).join(' ');
export const area = `${line} L${x(communityGrowth.length - 1)},${y(0)} L${x(0)},${y(0)} Z`;
