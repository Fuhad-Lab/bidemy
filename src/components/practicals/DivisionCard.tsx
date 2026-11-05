'use client';

import * as React from 'react';
import Link from 'next/link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export type DivisionCardProps = {
  title: string;
  description: string;
  /** Trailing-slash href; omit for a non-navigating card (original href="#") */
  href?: string;
  chips?: { label: string; bg: string; color: string }[];
  /** Original card 2 had a hover gradient sweep — enable to replicate */
  hoverSweep?: boolean;
};

/**
 * Replica of the `.division-card` glassmorphism card used on the original
 * static practicals hub pages (backdrop blur, translucent white, soft shadow).
 */
export default function DivisionCard({
  title,
  description,
  href,
  chips,
  hoverSweep = false,
}: DivisionCardProps) {
  const inner = (
    <>
      {hoverSweep ? (
        <Box
          aria-hidden
          sx={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(90deg, rgba(56,189,248,0.10), rgba(129,140,248,0.10))',
            transform: 'scaleX(0)',
            transformOrigin: 'left',
            transition: 'transform 0.3s ease',
            '.groupWrap:hover &': { transform: 'scaleX(1)' },
          }}
        />
      ) : null}
      <Typography
        variant="h6"
        component="h2"
        sx={{ mb: 1, position: 'relative', zIndex: 1, fontSize: '1.25rem' }}
      >
        {href ? (
          <Link
            href={href}
            style={{
              color: 'inherit',
              textDecoration: 'none',
              transition: 'color 0.2s',
            }}
            className="divisionCardLink"
          >
            {title}
          </Link>
        ) : (
          title
        )}
      </Typography>
      <Typography
        variant="body2"
        sx={{ color: '#374151', position: 'relative', zIndex: 1 }}
      >
        {description}
      </Typography>
      {chips && chips.length > 0 ? (
        <Box sx={{ mt: 2, display: 'flex', gap: 1, position: 'relative', zIndex: 1 }}>
          {chips.map((chip) => (
            <Box
              key={chip.label}
              sx={{
                fontSize: '0.75rem',
                px: 1,
                py: 0.5,
                borderRadius: 999,
                backgroundColor: chip.bg,
                color: chip.color,
              }}
            >
              {chip.label}
            </Box>
          ))}
        </Box>
      ) : null}
    </>
  );

  return (
    <Box
      className={hoverSweep ? 'groupWrap' : undefined}
      sx={{
        position: 'relative',
        overflow: 'hidden',
        p: 3,
        borderRadius: '12px',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        background: 'rgba(255,255,255,0.75)',
        border: '1px solid rgba(255,255,255,0.2)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.06)',
        '& .divisionCardLink:hover': { color: '#2563eb' },
      }}
    >
      {inner}
    </Box>
  );
}
