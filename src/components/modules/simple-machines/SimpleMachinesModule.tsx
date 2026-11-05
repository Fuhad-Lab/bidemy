'use client';

/**
 * Simple Machines — Interactive Tutorial (full interactive port).
 *
 * Source: /home/z/fuhademy/students/simple-machines-module/ and its identical
 * twin /home/z/fuhademy/students/practical/simple-machines/. Both routes
 * render this shared component (the two original pages were byte-identical).
 *
 * Ported behaviours (script.js): lever torque sim, inclined-plane sim and the
 * 3-question quiz — see LeverSim / InclineSim / QuickQuiz for the exact
 * original formulas. Layout, colors and typography reproduce the original
 * style.css (#0b63b1 header, #f6f9fc background, card shadows, step boxes).
 */

import * as React from 'react';
import Link from 'next/link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LeverSim from './LeverSim';
import InclineSim from './InclineSim';
import QuickQuiz from './QuickQuiz';

const BRAND = '#0b63b1';

const cardSx = {
  bgcolor: '#fff',
  borderRadius: 2,
  p: 2,
  mb: 2.5,
  boxShadow: '0 2px 6px rgba(11,38,69,0.08)',
} as const;

function StepBox({ title, items }: { title: string; items: string[] }) {
  return (
    <Box sx={{ mt: 1.5, bgcolor: '#f1f8ff', p: 1.5, borderRadius: 1.5 }}>
      <Typography sx={{ fontWeight: 600, mb: 0.5 }}>{title}</Typography>
      <Box component="ol" sx={{ pl: 3, m: 0, fontSize: 14, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
        {items.map((it) => (
          <li key={it}>{it}</li>
        ))}
      </Box>
    </Box>
  );
}

export default function SimpleMachinesModule({ backHref }: { backHref?: string }) {
  return (
    <Box sx={{ bgcolor: '#f6f9fc', color: '#0b2545', minHeight: '100vh', lineHeight: 1.45 }}>
      {/* Header banner (original style.css) */}
      <Box
        component="header"
        sx={{
          bgcolor: BRAND,
          color: '#fff',
          px: { xs: 2, md: 3 },
          py: 3,
        }}
      >
        <Box sx={{ maxWidth: 1000, mx: 'auto' }}>
          {backHref && (
            <Link
              href={backHref}
              style={{
                color: 'rgba(255,255,255,0.85)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 4,
                fontSize: 14,
                textDecoration: 'none',
                marginBottom: 8,
              }}
            >
              <ArrowBackIcon sx={{ fontSize: 18 }} /> Back
            </Link>
          )}
          <Typography component="h1" sx={{ m: 0, fontSize: '1.6rem', fontWeight: 700 }}>
            Simple Machines — Interactive Tutorial
          </Typography>
          <Typography sx={{ mt: 0.5, opacity: 0.92 }}>
            A short, step-by-step module covering levers and inclined planes with interactive simulations and a short
            quiz.
          </Typography>
        </Box>
      </Box>

      <Box component="main" sx={{ p: { xs: 1.5, md: '20px' }, maxWidth: 1000, mx: 'auto' }}>
        {/* How to use this module */}
        <Box component="section" sx={{ mb: 2.5 }}>
          <Typography component="h2" sx={{ fontSize: '1.25rem', fontWeight: 700, mb: 1 }}>
            How to use this module
          </Typography>
          <Box component="ol" sx={{ pl: 3, m: 0, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
            <li>Read the short explanation for each machine.</li>
            <li>Use the controls in the interactive panels to experiment.</li>
            <li>Try to predict what will happen, then confirm with the simulation.</li>
            <li>Take the short quiz at the end to check your understanding.</li>
          </Box>
        </Box>

        {/* Levers */}
        <Paper component="section" elevation={0} sx={cardSx} aria-label="Levers concepts">
          <Typography component="h2" sx={{ fontSize: '1.25rem', fontWeight: 700, mb: 1 }}>
            1) Levers — Concepts
          </Typography>
          <Typography sx={{ mb: 1.5 }}>
            A lever rotates about a fulcrum. Torque = Force × Distance (from fulcrum). The lever balances when torques
            on both sides are equal.
          </Typography>

          <LeverSim />

          <StepBox
            title="Step-by-step"
            items={[
              'Set the fulcrum in the center.',
              'Place equal weights at equal distances — the beam should balance.',
              'Move one weight further away or increase its force to create imbalance.',
              'Observe torques displayed and predict motion direction.',
            ]}
          />
        </Paper>

        {/* Inclined plane */}
        <Paper component="section" elevation={0} sx={cardSx} aria-label="Inclined plane concepts">
          <Typography component="h2" sx={{ fontSize: '1.25rem', fontWeight: 700, mb: 1 }}>
            2) Inclined Plane — Concepts
          </Typography>
          <Typography sx={{ mb: 1.5 }}>
            On a frictionless incline, the component of gravity along the plane is g·sin(theta). Acceleration =
            g·sin(theta).
          </Typography>

          <InclineSim />

          <StepBox
            title="Step-by-step"
            items={[
              'Set the angle to a small value — the block will accelerate slowly.',
              'Increase the angle — acceleration increases roughly with sin(theta).',
              'Change the mass — note that acceleration does not depend on mass for frictionless incline.',
            ]}
          />
        </Paper>

        {/* Quiz */}
        <Paper component="section" elevation={0} sx={cardSx} aria-label="Quick quiz">
          <Typography component="h2" sx={{ fontSize: '1.25rem', fontWeight: 700, mb: 1 }}>
            3) Quick Quiz
          </Typography>
          <QuickQuiz />
        </Paper>
      </Box>

      {/* Footer (original style.css) */}
      <Typography
        component="footer"
        sx={{ my: 3, textAlign: 'center', color: '#3b3b3b', px: 2, pb: 2 }}
      >
        Built as a lightweight learning module. Modify and extend experiments as you like.
      </Typography>
    </Box>
  );
}
