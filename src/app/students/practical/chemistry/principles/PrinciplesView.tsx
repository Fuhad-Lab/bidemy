'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import PracticalsThemeProvider from '@/components/practicals/PracticalsThemeProvider';
import { BackToChemistryNav } from '@/components/practicals/PracticalNav';

/**
 * Port of principles.html.
 *
 * The source page only contained an authoring note and an (empty) image slot
 * for a WAEC syllabus screenshot. Both are reproduced faithfully:
 *  - the note text is kept verbatim
 *  - the missing screenshot is rendered as a labelled placeholder frame
 */
export default function PrinciplesView() {
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
              Principles
            </Typography>
            <Typography variant="h6" component="p" sx={{ color: '#4b5563', fontWeight: 400 }}>
              Structured learning module for Chemistry Practicals.
            </Typography>
          </Box>

          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: '12px',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              background: 'rgba(255,255,255,0.75)',
              border: '1px solid rgba(255,255,255,0.2)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.06)',
              maxWidth: 720,
              mx: 'auto',
            }}
          >
            {/* Authoring note kept verbatim from the source page */}
            <Alert severity="warning" sx={{ mb: 3 }}>
              <Typography variant="body2" component="pre" sx={{ whiteSpace: 'pre-wrap', m: 0 }}>
                {'copilot note: \nmake the page cover all these:'}
              </Typography>
            </Alert>

            {/* The empty <img alt="screenshot from waec syllabus for Chemistry"> slot */}
            <Box
              role="img"
              aria-label="screenshot from waec syllabus for Chemistry"
              sx={{
                height: 320,
                borderRadius: '12px',
                border: '2px dashed #cbd5e1',
                backgroundColor: 'rgba(241,245,249,0.7)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 1,
                color: '#64748b',
                textAlign: 'center',
                px: 2,
              }}
            >
              <ImageOutlinedIcon sx={{ fontSize: 48 }} />
              <Typography variant="body2">screenshot from waec syllabus for Chemistry</Typography>
            </Box>
          </Paper>
        </Container>
      </Box>
    </PracticalsThemeProvider>
  );
}
