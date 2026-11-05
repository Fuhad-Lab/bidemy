'use client';

import * as React from 'react';
import Link from 'next/link';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import QuizIcon from '@mui/icons-material/Quiz';
import ConstructionIcon from '@mui/icons-material/Construction';
import PracticalsThemeProvider from './PracticalsThemeProvider';
import { BackToChemistryNav } from './PracticalNav';

export type TopicStubPageProps = {
  /** Document/Page title, e.g. "Acid-Base Titration" */
  title: string;
  /** One-line description shown under the header */
  description: string;
  /** The topic slug as referenced by the original "Topic Quiz System" scripts */
  topicSlug: string;
  /** Optional related practical links shown as quick actions */
  related?: { href: string; label: string }[];
};

/**
 * Shared view for the topic pages whose original HTML shipped only the
 * "Topic Quiz System" loader stub (no notes, no quiz bank in the old repo).
 * Layout mirrors the sibling hub pages (glass card on a blue gradient).
 */
export default function TopicStubPage({
  title,
  description,
  topicSlug,
  related = [],
}: TopicStubPageProps) {
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
              {title}
            </Typography>
            <Typography variant="h6" component="p" sx={{ color: '#4b5563', fontWeight: 400 }}>
              {description}
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
            <Alert
              icon={<ConstructionIcon fontSize="inherit" />}
              severity="info"
              sx={{ mb: 3 }}
            >
              The full notes for <strong>{title}</strong> are being prepared. In the
              meantime, explore the interactive practicals below.
            </Alert>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <QuizIcon color="primary" />
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                Topic quiz
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ color: '#4b5563', mb: 3 }}>
              A practice quiz for “{topicSlug}” is attached to this topic. It becomes
              available once the topic notes are published.
            </Typography>

            {related.length > 0 ? (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
                {related.map((rel) => (
                  <Button
                    key={rel.href}
                    component={Link}
                    href={rel.href}
                    variant="contained"
                    color="secondary"
                    size="small"
                  >
                    {rel.label}
                  </Button>
                ))}
              </Box>
            ) : null}
          </Paper>
        </Container>
      </Box>
    </PracticalsThemeProvider>
  );
}
