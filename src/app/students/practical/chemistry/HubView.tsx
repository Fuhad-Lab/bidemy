'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import PracticalsThemeProvider from '@/components/practicals/PracticalsThemeProvider';
import PracticalNav from '@/components/practicals/PracticalNav';
import DivisionCard from '@/components/practicals/DivisionCard';

const BASE = '/students/practical/chemistry';

/**
 * All practical topics in the Chemistry Practicals section.
 * The first three cards replicate the original index.html exactly
 * (same names, descriptions and link targets); the full catalogue below
 * lists every topic page so nothing is more than one click away.
 */
const ALL_TOPICS: { title: string; description: string; href: string; chips?: string[] }[] = [
  {
    title: 'Introduction to Chemistry Practicals',
    description: 'Basic laboratory safety, equipment handling, and general practical skills.',
    href: `${BASE}/intro-to-chemistry-pratical/`,
  },
  {
    title: 'Principles',
    description: 'WAEC syllabus coverage for chemistry practicals.',
    href: `${BASE}/principles/`,
  },
  {
    title: 'Identification of Apparatus',
    description: 'Visual gallery of laboratory apparatus and what each one is used for.',
    href: `${BASE}/identification-of-apparatus/`,
  },
  {
    title: 'Acid-Base Titration',
    description: 'Neutralisation titrations between acids and bases.',
    href: `${BASE}/acid-base-titration/`,
  },
  {
    title: 'Redox Titration',
    description: 'Oxidation-reduction titrations such as KMnO₄ against Fe²⁺.',
    href: `${BASE}/redox-titration/`,
  },
  {
    title: 'Quantitative Analysis',
    description: 'Interactive titration simulations and volumetric analysis practicals.',
    href: `${BASE}/quantitative-analysis/`,
    chips: ['Interactive', 'WAEC Format'],
  },
  {
    title: 'Qualitative Analysis',
    description: 'Salt analysis and chemical tests for identifying unknown compounds.',
    href: `${BASE}/qlitative-anal/`,
  },
  {
    title: 'Titration Simulator',
    description: 'Hands-on burette and conical flask simulation with readings and calculations.',
    href: `${BASE}/titration-simulator/`,
    chips: ['Interactive'],
  },
  {
    title: 'Titration Simulator v2',
    description: 'Click-to-place equipment with droplet animation and live volume readout.',
    href: `${BASE}/titration-simulator-v2/`,
    chips: ['Interactive'],
  },
  {
    title: 'WAEC Titration Practical',
    description: 'Guided WAEC titration practice with readings table and calculations.',
    href: `${BASE}/waec-titration-practical/`,
  },
  {
    title: 'WAEC Titration Practical v2',
    description: 'Step-by-step WAEC titration task tracker.',
    href: `${BASE}/waec-titration-practical-v2/`,
  },
  {
    title: 'WAEC Titration Practical v3',
    description:
      'Latest version: learning + practice modes, exam timer, WAEC question bank and calculators.',
    href: `${BASE}/waec-titration-practicalv3/`,
    chips: ['Latest', 'Interactive', 'WAEC Format'],
  },
];

export default function HubView() {
  return (
    <PracticalsThemeProvider>
      <Box
        sx={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #eff6ff 0%, #e0e7ff 100%)',
        }}
      >
        <PracticalNav currentLabel="Chemistry Practicals" />

        <Container maxWidth="lg" sx={{ py: 4, px: { xs: 2, sm: 3 } }}>
          {/* Header */}
          <Box component="header" sx={{ mb: 6, textAlign: 'center' }}>
            <Typography variant="h3" component="h1" sx={{ color: '#1f2937', mb: 2 }}>
              Chemistry Practicals
            </Typography>
            <Typography variant="h6" component="p" sx={{ color: '#4b5563', fontWeight: 400 }}>
              Interactive simulations and guided experiments for chemistry lab work.
            </Typography>
          </Box>

          {/* Original three division cards (same names/descriptions/links as index.html) */}
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
              title="1. Introduction to Chemistry Practicals"
              description="Basic laboratory safety, equipment handling, and general practical skills."
              href={`${BASE}/intro-to-chemistry-pratical/`}
            />
            <DivisionCard
              title="2. Quantitative Analysis"
              description="Interactive titration simulations and volumetric analysis practicals."
              href={`${BASE}/quantitative-analysis/`}
              hoverSweep
              chips={[
                { label: 'Interactive', bg: '#e0f2fe', color: '#0369a1' },
                { label: 'WAEC Format', bg: '#dcfce7', color: '#15803d' },
              ]}
            />
            <DivisionCard
              title="3. Qualitative Analysis"
              description="Salt analysis and chemical tests for identifying unknown compounds."
              href={`${BASE}/qlitative-anal/`}
            />
          </Box>

          <Divider sx={{ my: 6 }} />

          {/* Full catalogue of practical topics in this section */}
          <Typography variant="h5" component="h2" sx={{ color: '#1f2937', mb: 1 }}>
            All practical topics
          </Typography>
          <Typography variant="body2" sx={{ color: '#64748b', mb: 3 }}>
            Every page in the Chemistry Practicals section.
          </Typography>

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
            {ALL_TOPICS.map((topic) => (
              <DivisionCard
                key={topic.href}
                title={topic.title}
                description={topic.description}
                href={topic.href}
                chips={topic.chips?.map((label) => {
                  if (label === 'Latest')
                    return { label, bg: '#fef3c7', color: '#92400e' };
                  if (label === 'WAEC Format')
                    return { label, bg: '#dcfce7', color: '#15803d' };
                  return { label, bg: '#e0f2fe', color: '#0369a1' };
                })}
              />
            ))}
          </Box>
        </Container>
      </Box>
    </PracticalsThemeProvider>
  );
}
