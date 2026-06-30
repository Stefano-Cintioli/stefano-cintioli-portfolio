'use client';

import * as React from 'react';
import { ThemeProvider as NextThemesProvider, type ThemeProviderProps } from 'next-themes';

/**
 * Thin wrapper around next-themes' provider.
 * Keeps the import path stable for the rest of the app.
 *
 * Defaults set in layout.tsx:
 *   attribute="class" (toggles .dark / .light on <html>)
 *   defaultTheme="system"
 *   enableSystem
 *   disableTransitionOnChange (prevents flash on toggle)
 */
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
