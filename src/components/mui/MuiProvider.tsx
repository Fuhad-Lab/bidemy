'use client';

/**
 * Client-side MUI bootstrap for the migrated sections.
 *
 * The project root layout is owned by another workstream, so sections that
 * need Material UI wrap themselves with this provider from their own
 * `layout.tsx` files. It wires:
 *   - an @emotion cache that hydrates correctly with the App Router
 *     (via useServerInsertedHTML),
 *   - a light/dark palette mode context (the original teacher sidebar had a
 *     theme toggle that flipped `body.dark-mode`),
 *   - MUI ThemeProvider + CssBaseline scoped to the section.
 */

import * as React from 'react';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { useServerInsertedHTML } from 'next/navigation';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { buildRelationshipTheme, buildTeacherTheme } from './theme';

export type SectionFlavour = 'teacher' | 'relationship';
export type MuiMode = 'light' | 'dark';

interface ModeContextValue {
  mode: MuiMode;
  toggleMode: () => void;
}

const ModeContext = React.createContext<ModeContextValue>({
  mode: 'light',
  toggleMode: () => {},
});

export function useMuiMode(): ModeContextValue {
  return React.useContext(ModeContext);
}

interface MuiProviderProps {
  flavour: SectionFlavour;
  children: React.ReactNode;
}

export default function MuiProvider({ flavour, children }: MuiProviderProps) {
  const [mode, setMode] = React.useState<MuiMode>('light');

  React.useEffect(() => {
    const stored = window.localStorage.getItem('fuhademy-mui-mode');
    if (stored === 'dark' || stored === 'light') setMode(stored);
  }, []);

  const toggleMode = React.useCallback(() => {
    setMode((prev) => {
      const next = prev === 'light' ? 'dark' : 'light';
      window.localStorage.setItem('fuhademy-mui-mode', next);
      return next;
    });
  }, []);

  const theme = React.useMemo(
    () =>
      flavour === 'teacher'
        ? buildTeacherTheme(mode)
        : buildRelationshipTheme(mode),
    [flavour, mode],
  );

  const [{ cache, flush }] = React.useState(() => {
    const emotionCache = createCache({ key: `fuh-${flavour}`, prepend: true });
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
    <ModeContext.Provider value={{ mode, toggleMode }}>
      <CacheProvider value={cache}>
        <ThemeProvider theme={theme}>
          <CssBaseline enableColorScheme />
          {children}
        </ThemeProvider>
      </CacheProvider>
    </ModeContext.Provider>
  );
}
