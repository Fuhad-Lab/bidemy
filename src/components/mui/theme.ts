import { createTheme } from '@mui/material/styles';

/**
 * Shared MUI theme options for the migrated Fuhademy sections
 * (Teachers area + Student-Teacher-Relationship admin panel).
 * The relationship app originally used Bootstrap's default palette
 * (#0d6efd primary / #ffc107 warning) — mirrored here in MUI terms.
 */

export const buildRelationshipTheme = (mode: 'light' | 'dark') =>
  createTheme({
    palette: {
      mode,
      primary: { main: '#0d6efd' },
      secondary: { main: '#6c757d' },
      warning: { main: '#ffc107', contrastText: 'rgba(0, 0, 0, 0.87)' },
      success: { main: '#198754' },
      error: { main: '#dc3545' },
      background:
        mode === 'light'
          ? { default: '#f5f6fa', paper: '#ffffff' }
          : { default: '#121417', paper: '#1e2125' },
    },
    typography: {
      fontFamily:
        "Roboto, 'Helvetica Neue', Arial, ui-sans-serif, system-ui, sans-serif",
      h4: { fontWeight: 700 },
      h5: { fontWeight: 700 },
      h6: { fontWeight: 700 },
    },
    shape: { borderRadius: 8 },
    components: {
      MuiButton: { defaultProps: { disableElevation: true } },
      MuiCard: { defaultProps: { elevation: 1 } },
    },
  });

/**
 * Theme for the modern teacher "live session" dashboard (originally
 * styled with Tailwind CDN + Inter font, blue gradient glassmorphism).
 */
export const buildTeacherTheme = (mode: 'light' | 'dark') =>
  createTheme({
    palette: {
      mode,
      primary: { main: '#2563eb' },
      secondary: { main: '#6366f1' },
      success: { main: '#14b8a6' },
      error: { main: '#ef4444' },
      background:
        mode === 'light'
          ? { default: '#eef4ff', paper: '#ffffff' }
          : { default: '#0f1424', paper: '#1a2032' },
      text:
        mode === 'light'
          ? { primary: '#111827', secondary: '#4b5563' }
          : { primary: '#e5e7eb', secondary: '#9ca3af' },
    },
    typography: {
      fontFamily:
        "'Inter', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
    },
    shape: { borderRadius: 12 },
    components: {
      MuiButton: { defaultProps: { disableElevation: true }, styleOverrides: { root: { textTransform: 'none' } } },
      MuiCard: { defaultProps: { elevation: 1 } },
      MuiPaper: { styleOverrides: { root: { backgroundImage: 'none' } } },
    },
  });
