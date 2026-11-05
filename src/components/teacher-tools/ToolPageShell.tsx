'use client';

/**
 * Shared layout for the per-subject teacher tool pages (timer, to-do list,
 * sticky notes, lesson planner, quick links, syllabus). Mirrors the original
 * .canvas-layout: fixed dark sidebar + centred white card on a #f5f6fa body.
 */

import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TeacherSidebar from './TeacherSidebar';
import { getSubject } from '@/data/teachers/subjects';

interface ToolPageShellProps {
  subject: string;
  title: string;
  subtitle?: string;
  maxWidth?: number;
  children: React.ReactNode;
}

export default function ToolPageShell({
  subject,
  title,
  subtitle,
  maxWidth = 640,
  children,
}: ToolPageShellProps) {
  const info = getSubject(subject);

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <TeacherSidebar subject={subject} />
      <Box
        component="main"
        sx={{
          ml: { md: '220px' },
          pt: { xs: 2, md: 4 },
          px: { xs: 2, sm: 3 },
          pb: 6,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Container maxWidth={false} sx={{ maxWidth, px: { xs: 0, sm: 2 } }}>
          <Paper
            elevation={0}
            sx={{
              p: { xs: 2.5, sm: 4 },
              borderRadius: 3,
              boxShadow: '0 2px 8px rgba(45,59,69,0.06)',
            }}
          >
            <Typography
              variant="h5"
              component="h1"
              sx={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: 1.5 }}
            >
              <Box
                aria-hidden
                sx={{
                  width: 10,
                  height: 28,
                  borderRadius: 2,
                  background: info.gradient,
                  flexShrink: 0,
                }}
              />
              {title}
            </Typography>
            {subtitle && (
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                {subtitle}
              </Typography>
            )}
            <Box sx={{ mt: 3 }}>{children}</Box>
          </Paper>
        </Container>
      </Box>
    </Box>
  );
}
