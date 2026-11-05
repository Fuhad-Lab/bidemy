'use client';

import * as React from 'react';
import { ThemeProvider, createTheme, CssBaseline, GlobalStyles } from '@mui/material';

/**
 * Local theme for the Practicals section (Chemistry/Physics/...).
 *
 * The palette mirrors the colours used across the original static pages:
 *  - teal (#0d9488) for the interactive simulator headers / actions
 *  - sky (#0ea5e9) for primary buttons on hub cards
 *  - the light slate page background used by the simulator pages
 */
const practicalsTheme = createTheme({
  cssVariables: true,
  palette: {
    mode: 'light',
    primary: { main: '#0d9488', contrastText: '#ffffff' },
    secondary: { main: '#0ea5e9', contrastText: '#ffffff' },
    success: { main: '#059669' },
    warning: { main: '#f59e0b' },
    error: { main: '#dc2626' },
    info: { main: '#0284c7' },
    background: { default: '#f1f5f9', paper: '#ffffff' },
    text: { primary: '#0f172a', secondary: '#475569' },
  },
  typography: {
    fontFamily:
      "'Plus Jakarta Sans', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
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
    MuiPaper: { styleOverrides: { root: { backgroundImage: 'none' } } },
  },
});

export default function PracticalsThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={practicalsTheme}>
      {/* CssBaseline is scoped to this subtree usage; globals.css stays untouched */}
      <CssBaseline enableColorScheme={false} />
      <GlobalStyles
        styles={{
          'html, body': {
            margin: 0,
            padding: 0,
            maxWidth: '100%',
            overflowX: 'hidden',
          },
        }}
      />
      {children}
    </ThemeProvider>
  );
}
