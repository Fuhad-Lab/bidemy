import Link from 'next/link';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import type { PageData } from '@/lib/content';

/**
 * Wrapper routes for self-contained interactive HTML applications from the
 * original site (PhET simulations, ISPRING e-learning packages, the CBT
 * exam engine). The app itself is served from /site/** and embedded full-
 * height; MUI chrome provides the navigation around it.
 */
export default function SimView({ page }: { page: PageData }) {
  const parentRoute =
    '/' + page.source.split('/').slice(0, -1).join('/') + '/';

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#f8fafc' }}>
      <Box
        sx={{
          background: 'linear-gradient(90deg, #1e3a8a, #3730a3)',
          color: '#fff',
          px: { xs: 1.5, sm: 3 },
          py: 1.25,
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          position: 'sticky',
          top: 0,
          zIndex: 20,
        }}
      >
        <Link
          href={parentRoute}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 4,
            color: '#dbeafe',
            textDecoration: 'none',
            fontWeight: 600,
            fontSize: 14,
          }}
        >
          <ArrowBackIcon sx={{ fontSize: 18 }} />
          Back
        </Link>
        <Typography
          sx={{
            fontWeight: 700,
            fontSize: { xs: 14, sm: 16 },
            textAlign: 'center',
            flex: 1,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {page.title.replace(/[_]/g, ' ')}
        </Typography>
        <Box
          component="a"
          href={page.iframeSrc}
          target="_blank"
          rel="noopener"
          aria-label="Open simulation in new tab"
          sx={{ display: 'inline-flex', color: '#dbeafe', textDecoration: 'none' }}
        >
          <OpenInNewIcon sx={{ fontSize: 20 }} />
        </Box>
      </Box>
      <Container
        maxWidth={false}
        disableGutters
        sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}
      >
        <iframe
          src={page.iframeSrc}
          title={page.title}
          style={{ width: '100%', flex: 1, minHeight: '75vh', border: 0, background: '#fff' }}
          allow="fullscreen"
        />
      </Container>
    </Box>
  );
}
