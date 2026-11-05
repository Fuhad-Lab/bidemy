'use client';

import * as React from 'react';
import Link from 'next/link';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ScienceIcon from '@mui/icons-material/Science';
import ColorizeIcon from '@mui/icons-material/Colorize';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import PracticalsThemeProvider from '@/components/practicals/PracticalsThemeProvider';
import PracticalNav from '@/components/practicals/PracticalNav';

const BASE = '/students/practical/chemistry';

function Chip({ label, bg, color }: { label: string; bg: string; color: string }) {
  return (
    <Box
      component="span"
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 0.5,
        px: 1.5,
        py: 0.5,
        borderRadius: 999,
        fontSize: '0.75rem',
        fontWeight: 500,
        backgroundColor: bg,
        color,
      }}
    >
      {label}
    </Box>
  );
}

type PracticalCard = {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
  previewBg: string;
  iconColor: string;
  chips: { label: string; bg: string; color: string }[];
};

const CARDS: PracticalCard[] = [
  {
    title: 'Titration Practical v2',
    description:
      'Step-by-step interactive titration simulator with modern interface and real-time guidance. Perfect for exam preparation.',
    href: `${BASE}/waec-titration-practical-v2/`,
    icon: <ScienceIcon sx={{ fontSize: 120 }} />,
    previewBg: 'linear-gradient(135deg, #f0f9ff, #eef2ff)',
    iconColor: '#0ea5e9',
    chips: [
      { label: 'Interactive', bg: '#f0f9ff', color: '#0284c7' },
      { label: 'Modern UI', bg: '#faf5ff', color: '#9333ea' },
    ],
  },
  {
    title: 'Classic Titration',
    description:
      'Traditional titration practical with readings table and step-by-step instructions. Follows standard WAEC examination format.',
    href: `${BASE}/waec-titration-practical/`,
    icon: <ColorizeIcon sx={{ fontSize: 120 }} />,
    previewBg: 'linear-gradient(135deg, #fffbeb, #fef2f2)',
    iconColor: '#f59e0b',
    chips: [
      { label: 'Classic', bg: '#fffbeb', color: '#d97706' },
      { label: 'WAEC Format', bg: '#f0fdf4', color: '#16a34a' },
    ],
  },
];

export default function QuantitativeView() {
  return (
    <PracticalsThemeProvider>
      <Box sx={{ minHeight: '100vh', backgroundColor: '#f8fafc' }}>
        <PracticalNav
          currentLabel="Quantitative Analysis"
          extraLink={{ href: BASE, label: 'All Practicals' }}
        />

        <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3, lg: 4 } }}>
          <Box component="header" sx={{ mb: 5, maxWidth: 672 }}>
            <Typography variant="h4" component="h1" sx={{ mb: 1.5 }}>
              Quantitative Analysis Practicals
            </Typography>
            <Typography variant="h6" component="p" sx={{ color: '#475569', fontWeight: 400 }}>
              Interactive simulations and guided practicals for titration and volumetric
              analysis. Choose a practical below to begin.
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'grid',
              gap: 4,
              gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
            }}
          >
            {CARDS.map((card) => (
              <Paper
                key={card.href}
                elevation={0}
                sx={{
                  borderRadius: '16px',
                  overflow: 'hidden',
                  boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                  },
                }}
              >
                <Box
                  sx={{
                    aspectRatio: '16 / 9',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    p: 3,
                    color: card.iconColor,
                    background: card.previewBg,
                  }}
                >
                  {card.icon}
                </Box>
                <Box sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', gap: 1, mb: 1.5 }}>
                    {card.chips.map((chip) => (
                      <Chip key={chip.label} {...chip} />
                    ))}
                  </Box>
                  <Typography variant="h6" component="h2" sx={{ mb: 1 }}>
                    {card.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#475569', mb: 3 }}>
                    {card.description}
                  </Typography>
                  <Button
                    component={Link}
                    href={card.href}
                    variant="contained"
                    endIcon={<ArrowForwardIcon />}
                    onClick={() => {
                      // Analytics hook kept from the original inline script
                      console.log(`Starting practical: ${card.title}`);
                    }}
                    sx={{
                      backgroundColor: '#0ea5e9',
                      '&:hover': {
                        backgroundColor: '#0284c7',
                        transform: 'translateY(-1px)',
                      },
                      transition: 'all 0.2s',
                    }}
                  >
                    Start Practical
                  </Button>
                </Box>
              </Paper>
            ))}
          </Box>

          <Box component="footer" sx={{ mt: 6, textAlign: 'center', pb: 4 }}>
            <Typography variant="body2" sx={{ color: '#64748b' }}>
              Need help? Ask your instructor or use the AI Tutor feature from your dashboard.
            </Typography>
          </Box>
        </Container>
      </Box>
    </PracticalsThemeProvider>
  );
}
