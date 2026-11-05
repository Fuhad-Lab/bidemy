'use client';

/**
 * "Interactive Simulations" section of the Electrolysis module.
 * Ported 1:1 from the original index.html: the same three embedded virtual
 * labs (Javalab electrolysis of water, Javalab electroplating, Pearson
 * Electrolysis Lab) with their key observations / learning points.
 */

import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ScienceIcon from '@mui/icons-material/Science';

interface SimulationDef {
  id: string;
  title: string;
  subtitle: string;
  headerBg: string;
  titleColor: string;
  subtitleColor: string;
  src: string;
  notesTitle: string;
  notes: { text: string; numbered?: boolean }[];
}

const SIMULATIONS: SimulationDef[] = [
  {
    id: 'water',
    title: 'Electrolysis of Water',
    subtitle: 'Observe the decomposition of water into hydrogen and oxygen gases',
    headerBg: '#eef2ff',
    titleColor: '#312e81',
    subtitleColor: '#4338ca',
    src: 'https://javalab.org/en/electrolysis_of_water_en/',
    notesTitle: 'Key Observations:',
    notes: [
      { text: 'Notice the ratio of hydrogen to oxygen gas produced (2:1)', numbered: true },
      { text: 'Observe the movement of ions', numbered: true },
      { text: 'Watch the electrode reactions', numbered: true },
    ],
  },
  {
    id: 'plating',
    title: 'Electroplating Process',
    subtitle: 'Learn how metals are electroplated for protection and decoration',
    headerBg: '#faf5ff',
    titleColor: '#581c87',
    subtitleColor: '#7e22ce',
    src: 'https://javalab.org/en/electric_plating_en/',
    notesTitle: 'Key Learning Points:',
    notes: [
      { text: 'Metal ion movement through the electrolyte' },
      { text: 'Metal deposition process at the cathode' },
      { text: 'Effect of current strength on plating speed' },
    ],
  },
  {
    id: 'pearson',
    title: "Pearson's Electrolysis Lab",
    subtitle: 'Comprehensive virtual lab for exploring various electrolysis setups',
    headerBg: '#f0fdf4',
    titleColor: '#14532d',
    subtitleColor: '#15803d',
    src: 'https://media.pearsoncmg.com/bc/bc_0media_chem/chem_sim/html5/Electro/Electro.php',
    notesTitle: '',
    notes: [],
  },
];

export default function SimulationsSection() {
  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" sx={{ color: '#111827', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box component="span" sx={{ display: 'inline-flex', color: '#6366f1', '& svg': { fontSize: 28 } }}>
            <ScienceIcon />
          </Box>
          Interactive Simulations
        </Typography>
        <Typography sx={{ color: '#4b5563', mt: 1 }}>
          Hands-on virtual experiments to understand electrolysis processes
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        {SIMULATIONS.map((sim) => (
          <Paper key={sim.id} elevation={0} sx={{ borderRadius: 2, overflow: 'hidden', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
            <Box sx={{ p: 3, bgcolor: sim.headerBg }}>
              <Typography sx={{ color: sim.titleColor, fontWeight: 600, mb: 1, fontSize: 18 }}>{sim.title}</Typography>
              <Typography sx={{ fontSize: 14, color: sim.subtitleColor, mb: 2 }}>{sim.subtitle}</Typography>
            </Box>

            <Box sx={{ p: 2 }}>
              <Box
                sx={{
                  position: 'relative',
                  width: '100%',
                  paddingTop: '56.25%', // 16:9 (original aspect-w-16 aspect-h-9)
                  mb: 3,
                  borderRadius: 2,
                  overflow: 'hidden',
                  bgcolor: '#f3f4f6',
                }}
              >
                <iframe
                  src={sim.src}
                  title={sim.title}
                  loading="lazy"
                  allowFullScreen
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    border: 0,
                  }}
                />
              </Box>

              {sim.notes.length > 0 && (
                <Box sx={{ bgcolor: '#f9fafb', borderRadius: 2, p: 2 }}>
                  <Typography sx={{ fontWeight: 500, color: '#111827', mb: 1.5 }}>{sim.notesTitle}</Typography>
                  <Box
                    component={sim.notes[0]?.numbered ? 'ol' : 'ul'}
                    sx={{ display: 'flex', flexDirection: 'column', gap: 1, fontSize: 14, color: '#4b5563', pl: sim.notes[0]?.numbered ? 3 : 0 }}
                  >
                    {sim.notes.map((n) => (
                      <Box
                        key={n.text}
                        component="li"
                        sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, listStyle: n.numbered ? 'decimal' : 'none' }}
                      >
                        {!n.numbered && <CheckCircleIcon sx={{ color: '#a855f7', fontSize: 18, mt: '2px' }} />}
                        <Typography component="span" sx={{ fontSize: 14, color: '#4b5563' }}>
                          {n.text}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </Box>
              )}
            </Box>
          </Paper>
        ))}
      </Box>
    </Box>
  );
}
