import Link from 'next/link';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import type { HubData } from '@/lib/content';

/**
 * Synthetic hub pages — for folders the original site linked to as
 * directories (e.g. /students/subjects/, /students/subjects/waves/,
 * /students/subjects/government/) which had no index.html in the source.
 * Rendered in the same "division card" visual language as the original
 * subject index pages (glassmorphism cards on the blue gradient).
 */

const SUBJECT_ORDER = [
  'mathematics', 'physics', 'chemistry', 'biology', 'english',
  'economics', 'government', 'commerce', 'accounting', 'literature', 'waves',
];

function childrenSort(hub: HubData) {
  if (hub.dir === 'students/subjects') {
    return [...hub.children].sort((a, b) => {
      const ia = SUBJECT_ORDER.indexOf(a.route.split('/')[3]);
      const ib = SUBJECT_ORDER.indexOf(b.route.split('/')[3]);
      return (ia < 0 ? 99 : ia) - (ib < 0 ? 99 : ib);
    });
  }
  return hub.children;
}

export default function HubView({ hub }: { hub: HubData }) {
  const isRoot = hub.dir === 'students/subjects';
  const parentRoute =
    hub.dir === 'students/subjects'
      ? '/students/student-dashboard/'
      : hub.dir.replace(/\/[^/]+$/, '') === 'students'
        ? '/students/'
        : '/' + hub.dir.replace(/\/[^/]+$/, '') + '/';

  const children = childrenSort(hub);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(to bottom right, #eff6ff, #e0e7ff)',
        pb: 8,
      }}
    >
      <Container maxWidth="lg" sx={{ pt: 3, pb: 2 }}>
        <Box component="nav" sx={{ mb: 4 }}>
          <Link
            href={parentRoute}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 4,
              padding: '8px 14px',
              borderRadius: 10,
              background: '#ffffff',
              border: '1px solid #e2e8f0',
              color: '#334155',
              fontWeight: 600,
              textDecoration: 'none',
              fontSize: 14,
            }}
          >
            <ArrowBackIcon sx={{ fontSize: 18 }} />
            {isRoot ? 'Dashboard' : 'Back'}
          </Link>
        </Box>

        <Box sx={{ textAlign: 'center', mb: { xs: 3, md: 5 } }}>
          <Typography
            component="h1"
            sx={{
              fontSize: { xs: '1.7rem', sm: '2.2rem', md: '2.6rem' },
              fontWeight: 700,
              color: '#1f2937',
              mb: 1,
              textTransform: isRoot ? 'none' : 'capitalize',
            }}
          >
            {isRoot ? 'All Subjects' : hub.title}
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: 14, sm: 16, md: 17 },
              color: '#4b5563',
              px: 2,
            }}
          >
            {isRoot
              ? 'Choose a subject to start learning — every topic, practical and module in one place.'
              : `Browse the ${hub.title.toLowerCase()} learning materials below.`}
          </Typography>
        </Box>

        <Grid container spacing={{ xs: 1.5, sm: 3 }} columns={{ xs: 2, sm: 8, md: 12 }}>
          {children.map((child) => (
            <Grid key={child.route} size={{ xs: 4, sm: 4, md: 4 }}>
              <Link
                href={child.route}
                style={{ textDecoration: 'none' }}
              >
              <Box
                sx={{
                  display: 'block',
                  height: '100%',
                  p: { xs: 1.5, sm: 2.5, md: 3 },
                  borderRadius: { xs: 2, sm: 3 },
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  background: 'rgba(255, 255, 255, 0.75)',
                  border: '1px solid rgba(255, 255, 255, 0.5)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.06)',
                  textDecoration: 'none',
                  transition: 'transform .2s ease, box-shadow .2s ease',
                  '&:hover': {
                    transform: 'translateY(-3px)',
                    boxShadow: '0 14px 40px rgba(37, 99, 235, 0.14)',
                    '& .hub-title': { color: '#2563eb' },
                  },
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 1,
                    mb: { xs: 0.5, sm: 1 },
                  }}
                >
                  {child.kind === 'dir' || child.kind === 'division' || child.kind === 'subject-home' ? (
                    <FolderOpenIcon sx={{ color: '#3b82f6', fontSize: { xs: 20, sm: 26 }, mt: '2px' }} />
                  ) : (
                    <PlayCircleIcon sx={{ color: '#6366f1', fontSize: { xs: 20, sm: 26 }, mt: '2px' }} />
                  )}
                  <Typography
                    className="hub-title"
                    sx={{
                      fontWeight: 600,
                      color: '#1f2937',
                      fontSize: { xs: 13, sm: 17, md: 19 },
                      lineHeight: 1.3,
                      transition: 'color .2s',
                    }}
                  >
                    {child.title.replace(/[_-]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
                  </Typography>
                </Box>
                {child.kind === 'sim' && (
                  <Typography
                    sx={{ fontSize: { xs: 11, sm: 13 }, color: '#64748b', pl: { xs: 3.2, sm: 4.2 } }}
                  >
                    Interactive simulation
                  </Typography>
                )}
              </Box>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
