'use client';

import Link from 'next/link';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import TableChartIcon from '@mui/icons-material/TableChart';

/** Physics practicals hub — mirrors the original practical/physics folder. */
export default function PhysicsPracticalsHub() {
  const items = [
    {
      href: '/students/practical/physics/simple-pendulum/',
      title: 'Simple Pendulum Experiment',
      desc: 'Interactive WAEC pendulum simulation with timing and T² analysis.',
      icon: <PlayCircleIcon sx={{ color: '#6366f1', fontSize: 26 }} />,
    },
    {
      href: '/site/students/practical/physics/WAEC_Simple_Pendulum_DataSheet.pdf',
      title: 'WAEC Data Sheet (PDF)',
      desc: 'Official data sheet for the simple pendulum experiment.',
      icon: <PictureAsPdfIcon sx={{ color: '#b91c1c', fontSize: 26 }} />,
    },
    {
      href: '/site/students/practical/physics/pendulum-data.csv',
      title: 'Pendulum Data (CSV)',
      desc: 'Sample readings for L, T and computed T² values.',
      icon: <TableChartIcon sx={{ color: '#15803d', fontSize: 26 }} />,
    },
  ];

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
            href="/students/practical/chemistry/"
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
            Practicals
          </Link>
        </Box>

        <Box sx={{ textAlign: 'center', mb: { xs: 3, md: 5 } }}>
          <Typography
            component="h1"
            sx={{ fontSize: { xs: '1.7rem', sm: '2.2rem', md: '2.6rem' }, fontWeight: 700, color: '#1f2937', mb: 1 }}
          >
            Physics Practicals
          </Typography>
          <Typography sx={{ fontSize: { xs: 14, sm: 16, md: 17 }, color: '#4b5563' }}>
            Hands-on physics experiments and resources.
          </Typography>
        </Box>

        <Grid container spacing={{ xs: 1.5, sm: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          {items.map((item) => (
            <Grid key={item.href} size={{ xs: 4, sm: 4, md: 4 }}>
              <Box
                component={Link}
                href={item.href}
                target={item.href.startsWith('/site/') ? '_blank' : undefined}
                rel={item.href.startsWith('/site/') ? 'noopener' : undefined}
                sx={{
                  display: 'block',
                  height: '100%',
                  p: { xs: 1.5, sm: 2.5, md: 3 },
                  borderRadius: { xs: 2, sm: 3 },
                  backdropFilter: 'blur(16px)',
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
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, mb: 1 }}>
                  {item.icon}
                  <Typography
                    className="hub-title"
                    sx={{ fontWeight: 600, color: '#1f2937', fontSize: { xs: 13, sm: 17, md: 19 }, lineHeight: 1.3 }}
                  >
                    {item.title}
                  </Typography>
                </Box>
                <Typography sx={{ fontSize: { xs: 11, sm: 13 }, color: '#64748b' }}>{item.desc}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
