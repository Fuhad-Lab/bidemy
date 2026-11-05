'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SchoolIcon from '@mui/icons-material/School';

export const LINKS = {
  dashboard: '/student-dashboard/',
  chemistrySubject: '/students/chemistry/',
  chemistryPracticals: '/students/practical/chemistry/',
  allSubjects: '/students/',
};

/** Simple inline nav used by the sub-topic pages ("← Back to Chemistry"). */
export function BackToChemistryNav() {
  return (
    <Box component="nav" sx={{ mb: 4 }}>
      <Link
        href={LINKS.chemistryPracticals}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 4,
          color: '#0284c7',
          textDecoration: 'none',
          fontWeight: 500,
        }}
      >
        <ArrowBackIcon fontSize="small" />
        Back to Chemistry
      </Link>
    </Box>
  );
}

type HubNavProps = {
  /** Text shown in the centre chip, e.g. "Chemistry Practicals" / "Quantitative Analysis" */
  currentLabel: string;
  /** Optional extra button next to "Back to Chemistry" (e.g. All Practicals) */
  extraLink?: { href: string; label: string };
};

/**
 * Replica of the original "Unified Navigation" bar:
 * left = Dashboard / Back to Chemistry, centre = current location chip, right = All Subjects.
 */
export default function PracticalNav({ currentLabel, extraLink }: HubNavProps) {
  return (
    <AppBar
      component="nav"
      position="sticky"
      elevation={0}
      sx={{
        top: 0,
        zIndex: 1100,
        backgroundColor: 'rgba(255,255,255,0.9)',
        backdropFilter: 'blur(8px)',
        borderBottom: '1px solid #e2e8f0',
        color: 'inherit',
      }}
    >
      <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3 } }}>
        <Toolbar disableGutters sx={{ minHeight: 64, gap: 2, justifyContent: 'space-between' }}>
          {/* Left side */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
            <Button
              component={Link}
              href={LINKS.dashboard}
              startIcon={<ArrowBackIcon />}
              variant="outlined"
              size="small"
              sx={{
                borderColor: '#e2e8f0',
                color: '#334155',
                backgroundColor: '#fff',
                '&:hover': { backgroundColor: '#f8fafc', borderColor: '#cbd5e1' },
              }}
            >
              Dashboard
            </Button>
            <Button
              component={Link}
              href={LINKS.chemistrySubject}
              variant="outlined"
              size="small"
              sx={{
                borderColor: '#e2e8f0',
                color: '#334155',
                backgroundColor: '#fff',
                '&:hover': { backgroundColor: '#f8fafc', borderColor: '#cbd5e1' },
              }}
            >
              Back to Chemistry
            </Button>
            {extraLink ? (
              <Button
                component={Link}
                href={extraLink.href}
                variant="outlined"
                size="small"
                sx={{
                  borderColor: '#e2e8f0',
                  color: '#334155',
                  backgroundColor: '#fff',
                  '&:hover': { backgroundColor: '#f8fafc', borderColor: '#cbd5e1' },
                }}
              >
                {extraLink.label}
              </Button>
            ) : null}
          </Box>

          {/* Centre - current location */}
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              alignItems: 'center',
              gap: 1,
              px: 1.5,
              py: 1,
              borderRadius: 2,
              backgroundColor: '#eff6ff',
              color: '#1d4ed8',
            }}
          >
            <SchoolIcon fontSize="small" />
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              {currentLabel}
            </Typography>
          </Box>

          {/* Right side */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Button
              component={Link}
              href={LINKS.allSubjects}
              variant="outlined"
              size="small"
              sx={{
                borderColor: '#e2e8f0',
                color: '#334155',
                backgroundColor: '#fff',
                '&:hover': { backgroundColor: '#f8fafc', borderColor: '#cbd5e1' },
              }}
            >
              All Subjects
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
