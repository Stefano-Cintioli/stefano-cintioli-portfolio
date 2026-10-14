import type { Locale } from '@/content/schema';
export const locales: readonly Locale[] = ['en', 'es', 'pt'];
export const defaultLocale: Locale = 'en';
export const localeLabels: Record<Locale, string> = { en: 'EN', es: 'ES', pt: 'PT' };
