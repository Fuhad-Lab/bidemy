'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import BrokenImageIcon from '@mui/icons-material/BrokenImage';
import PracticalsThemeProvider from '@/components/practicals/PracticalsThemeProvider';
import { BackToChemistryNav } from '@/components/practicals/PracticalNav';
import DivisionCard from '@/components/practicals/DivisionCard';

/**
 * Port of identification-of-apparatus.html.
 *
 * The five apparatus photos lived at `../../../../assets/images/IMG-20251101-WA00XX.jpeg`
 * in the old repo and are referenced here via their /site/ equivalents.
 * If an image fails to load, a labelled placeholder is shown instead.
 */
const APPARATUS_IMAGES: { id: string; src: string; alt: string }[] = [
  {
    id: 'heating',
    src: '/site/assets/images/IMG-20251101-WA0020.jpeg',
    alt: 'Apparatus used for heating: bunsen burner, spirit lamp, tripod stand and wire gauze',
  },
  {
    id: 'apparatus-in-which-chemical-rxn-occur',
    src: '/site/assets/images/IMG-20251101-WA0021.jpeg',
    alt: 'Apparatus in which chemical reactions occur: beaker, conical flask, test tube and round-bottom flask',
  },
  {
    id: 'apparatuse-used-for-drying',
    src: '/site/assets/images/IMG-20251101-WA0022.jpeg',
    alt: 'Apparatus used for drying: desiccator and laboratory drying oven',
  },
  {
    id: 'apparatuse-used-as-containers',
    src: '/site/assets/images/IMG-20251101-WA0023.jpeg',
    alt: 'Apparatus used as containers: reagent bottles, wash bottle, gas jar and specimen tubes',
  },
  {
    id: 'apparatuse-used-for-delivery',
    src: '/site/assets/images/IMG-20251101-WA0024.jpeg',
    alt: 'Apparatus used for delivery: delivery tube, gas generator and collection over water',
  },
];

/** Card labels/descriptions kept verbatim from the source page (template text included). */
const CARDS: { title: string; anchor: string }[] = [
  { title: '1. Introduction to Chemistry Praticals', anchor: '#heating' },
  { title: '2. Quantitative Analysis', anchor: '#apparatus-in-which-chemical-rxn-occur' },
  { title: '3. Periodicity & Bonding', anchor: '#apparatuse-used-for-drying' },
  { title: '3. Periodicity & Bonding', anchor: '#apparatuse-used-as-containers' },
  { title: '3. Periodicity & Bonding', anchor: '#apparatuse-used-for-delivery' },
];

function ApparatusImage({ id, src, alt }: { id: string; src: string; alt: string }) {
  const [failed, setFailed] = React.useState(false);

  if (failed) {
    return (
      <Box
        id={id}
        sx={{
          width: 250,
          height: 250,
          borderRadius: '8px',
          border: '2px dashed #cbd5e1',
          backgroundColor: '#f8fafc',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 1,
          color: '#64748b',
          textAlign: 'center',
          p: 1,
          scrollMarginTop: 96,
        }}
      >
        <BrokenImageIcon />
        <Typography variant="caption">{alt}</Typography>
      </Box>
    );
  }

  return (
    <Box
      component="img"
      id={id}
      src={src}
      alt={alt}
      onError={() => setFailed(true)}
      sx={{
        width: 250,
        height: 250,
        objectFit: 'cover',
        borderRadius: '8px',
        boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
        scrollMarginTop: 96,
      }}
    />
  );
}

export default function ApparatusView() {
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

          {/* Category cards — anchors jump to the matching photo below */}
          <Box
            sx={{
              display: 'grid',
              gap: 3,
              gridTemplateColumns: {
                xs: '1fr',
                md: 'repeat(2, 1fr)',
                lg: 'repeat(3, 1fr)',
              },
              mb: 6,
            }}
          >
            {CARDS.map((card, i) => (
              <DivisionCard
                key={`${card.anchor}-${i}`}
                title={card.title}
                description="."
                href={card.anchor}
              />
            ))}
          </Box>

          {/* Apparatus gallery (original: five 250×250 images stacked in a div) */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
            {APPARATUS_IMAGES.map((img) => (
              <ApparatusImage key={img.id} id={img.id} src={img.src} alt={img.alt} />
            ))}
          </Box>
        </Container>
      </Box>
    </PracticalsThemeProvider>
  );
}
