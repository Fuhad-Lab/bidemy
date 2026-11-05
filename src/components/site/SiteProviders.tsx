'use client';

/**
 * Global MUI bootstrap for the migrated content pages.
 * Scoped emotion cache that hydrates correctly with the App Router,
 * site theme matching the original palette (#3B82F6 primary / #6366F1 secondary).
 */

import * as React from 'react';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { useServerInsertedHTML } from 'next/navigation';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme } from '@mui/material/styles';

const siteTheme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#3B82F6' },
    secondary: { main: '#6366F1' },
    success: { main: '#16a34a' },
    warning: { main: '#d97706' },
    error: { main: '#dc2626' },
    background: { default: '#ffffff', paper: '#ffffff' },
    text: { primary: '#1f2937', secondary: '#6b7280' },
  },
  typography: {
    fontFamily:
      "'Plus Jakarta Sans', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },
  shape: { borderRadius: 10 },
  components: {
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: { root: { textTransform: 'none' } },
    },
    MuiPaper: { styleOverrides: { root: { backgroundImage: 'none' } } },
  },
});

export default function SiteProviders({ children }: { children: React.ReactNode }) {
  const [{ cache, flush }] = React.useState(() => {
    const emotionCache = createCache({ key: 'bidemy-site', prepend: true });
    emotionCache.compat = true;

    const originalInsert = emotionCache.insert.bind(emotionCache);
    let insertedNames: string[] = [];

    type InsertArgs = Parameters<typeof originalInsert>;
    emotionCache.insert = (...args: InsertArgs) => {
      const serialized = args[1] as { name?: string } | undefined;
      const sheetTagsLength = emotionCache.sheet?.tags?.length ?? 0;
      if (sheetTagsLength === 0 && serialized?.name) {
        insertedNames.push(serialized.name);
      }
      return originalInsert(...args);
    };

    const flush = () => {
      const names = insertedNames;
      insertedNames = [];
      return names;
    };

    return { cache: emotionCache, flush };
  });

  useServerInsertedHTML(() => {
    const names = flush();
    if (names.length === 0) return null;
    let css = '';
    for (const name of names) {
      css += cache.inserted[name] ?? '';
    }
    return (
      <style
        data-emotion={`${cache.key} ${names.join(' ')}`}
        dangerouslySetInnerHTML={{ __html: css }}
      />
    );
  });

  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={siteTheme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </CacheProvider>
  );
}
