'use client';

/**
 * Shared MUI setup for interactive learning modules (agent task 2-b).
 *
 * - Provides an Emotion cache wired into Next.js App Router SSR via
 *   `useServerInsertedHTML` (the official pattern, without adding new deps).
 * - Supplies one light theme shared by the interactive modules so every
 *   module page looks consistent and uses the original Inter typography.
 *
 * This file is owned by the modules migration (task 2-b) and is self
 * contained: it does NOT touch src/app/layout.tsx, src/theme/** or globals.
 */

import * as React from 'react';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { useServerInsertedHTML } from 'next/navigation';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';

const moduleTheme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#2563eb' },
    secondary: { main: '#10b981' },
    error: { main: '#dc2626' },
    warning: { main: '#d97706' },
    info: { main: '#2563eb' },
    success: { main: '#16a34a' },
    background: { default: '#ffffff', paper: '#ffffff' },
    text: { primary: '#0f172a', secondary: '#475569' },
  },
  typography: {
    fontFamily:
      "'Inter', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
    h1: { fontWeight: 700 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 600 },
    h4: { fontWeight: 600 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
    button: { textTransform: 'none', fontWeight: 600 },
  },
  shape: { borderRadius: 8 },
  components: {
    MuiButton: { defaultProps: { disableElevation: true } },
    MuiTextField: { defaultProps: { size: 'small' } },
  },
});

export default function ModuleProviders({ children }: { children: React.ReactNode }) {
  const [cache] = React.useState(() =>
    createCache({ key: 'mui-modules', prepend: true }),
  );

  useServerInsertedHTML(() => (
    <style
      data-emotion={`${cache.key} ${Object.keys(cache.inserted).join(' ')}`}
      dangerouslySetInnerHTML={{ __html: Object.values(cache.inserted).join(' ') }}
    />
  ));

  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={moduleTheme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </CacheProvider>
  );
}
