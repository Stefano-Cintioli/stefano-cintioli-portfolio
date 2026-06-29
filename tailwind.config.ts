import type { Config } from 'tailwindcss';

/**
 * Tailwind v3 config — design tokens live as CSS variables in src/app/globals.css
 * and are surfaced here so utilities like `bg-bg` and `text-fg` work consistently
 * across light + dark themes.
 */
const config: Config = {
  darkMode: 'class',
  content: [
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1.25rem',
        sm: '1.5rem',
        lg: '2rem',
      },
      screens: {
        '2xl': '1280px',
      },
    },
    extend: {
      colors: {
        bg: 'hsl(var(--bg) / <alpha-value>)',
        'bg-2': 'hsl(var(--bg-2) / <alpha-value>)',
        'bg-deep': 'hsl(var(--bg-deep) / <alpha-value>)',
        fg: 'hsl(var(--fg) / <alpha-value>)',
        'fg-dim': 'hsl(var(--fg-dim) / <alpha-value>)',
        'fg-mute': 'hsl(var(--fg-mute) / <alpha-value>)',
        accent: 'hsl(var(--accent) / <alpha-value>)',
        'accent-hover': 'hsl(var(--accent-hover) / <alpha-value>)',
        'accent-secondary': 'hsl(var(--accent-secondary) / <alpha-value>)',
        hairline: 'hsl(var(--fg) / 0.10)',
        'hairline-2': 'hsl(var(--fg) / 0.18)',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'Georgia', 'serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      transitionTimingFunction: {
        'out-soft': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
