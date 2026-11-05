'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import PracticalsThemeProvider from '@/components/practicals/PracticalsThemeProvider';
import { BackToChemistryNav } from '@/components/practicals/PracticalNav';
import DivisionCard from '@/components/practicals/DivisionCard';

const BASE = '/students/practical/chemistry';

/**
 * Port of qtitative-anal.html — a small module hub linking to the titration
 * topic pages. Original card labels are kept verbatim.
 */
export default function QtitativeView() {
  return (
    <PracticalsThemeProvider>
      <Box
        sx={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #eff6ff 0%, #e0e7ff 100%)',
          p: { xs: 2, md: 3 },
        }}
      >
        <Container maxWidth="lg" disableGutters sx={{ px: { xs: 1, sm: 0 } }}>
          <BackToChemistryNav />

          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography variant="h4" component="h1" sx={{ color: '#1f2937', mb: 2 }}>
              Chemistry Praticals
            </Typography>
            <Typography variant="h6" component="p" sx={{ color: '#4b5563', fontWeight: 400 }}>
              Structured learning module for Chemistry Practicals.
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'grid',
              gap: 3,
              gridTemplateColumns: {
                xs: '1fr',
                md: 'repeat(2, 1fr)',
                lg: 'repeat(3, 1fr)',
              },
            }}
          >
            <DivisionCard
              title="1. Introduction to Chemistry Praticals"
              description="."
              href={`${BASE}/redox-titration/`}
            />
            <DivisionCard
              title="2. Quantitative Analysis"
              description="."
              href={`${BASE}/acid-base-titration/`}
            />
          </Box>
        </Container>
      </Box>
    </PracticalsThemeProvider>
  );
}
