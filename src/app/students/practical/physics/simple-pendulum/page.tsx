'use client';

import Link from 'next/link';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import SimplePendulum from '@/components/modules/simple-pendulum/SimplePendulum';

/**
 * Simple Pendulum practical (WAEC) — interactive React port of
 * students/practical/physics/simple-pendulum.html. Simulation, timing,
 * T²-vs-L data table and chart are implemented in the SimplePendulum
 * component; the datasheet/CSV are served from /site/**.
 */
export default function SimplePendulumPage() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(to bottom right, #eff6ff, #e0e7ff)',
        pb: 6,
      }}
    >
      <Container maxWidth="lg" sx={{ pt: 3 }}>
        <Box component="nav" sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap', mb: 3 }}>
          <Link
            href="/students/practical/physics/"
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
            Back
          </Link>
          <Box
            component="a"
            href="/site/students/practical/physics/WAEC_Simple_Pendulum_DataSheet.pdf"
            target="_blank"
            rel="noopener"
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 0.5,
              padding: '8px 14px',
              borderRadius: 10,
              background: '#ffffff',
              border: '1px solid #e2e8f0',
              color: '#b91c1c',
              fontWeight: 600,
              textDecoration: 'none',
              fontSize: 14,
            }}
          >
            <PictureAsPdfIcon sx={{ fontSize: 18 }} />
            WAEC Data Sheet (PDF)
          </Box>
        </Box>

        <Box sx={{ textAlign: 'center', mb: { xs: 2, md: 4 } }}>
          <Typography
            component="h1"
            sx={{ fontSize: { xs: '1.7rem', sm: '2.1rem', md: '2.4rem' }, fontWeight: 700, color: '#1f2937' }}
          >
            Simple Pendulum Experiment
          </Typography>
          <Typography sx={{ fontSize: { xs: 14, sm: 16 }, color: '#4b5563', mt: 0.5 }}>
            Determine the acceleration due to gravity (g) using a simple pendulum — WAEC practical.
          </Typography>
        </Box>

        <SimplePendulum />
      </Container>
    </Box>
  );
}
