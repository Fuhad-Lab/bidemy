'use client';

import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import PercentIcon from '@mui/icons-material/Percent';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import {
  getSubjectById,
  gradeCalc,
  scoreTotals,
  type StudentScore,
} from '@/data/relationship/demo-data';

/**
 * Grades summary cards for the student dashboard — overall percent, letter
 * grade, number of scored courses and best subject.
 */

interface GradeSummaryCardsProps {
  scores: StudentScore[];
}

export default function GradeSummaryCards({ scores }: GradeSummaryCardsProps) {
  const { total, outOf } = React.useMemo(() => {
    return scores.reduce(
      (acc, sc) => {
        const t = scoreTotals(sc.results);
        return { total: acc.total + t.total, outOf: acc.outOf + t.outOf };
      },
      { total: 0, outOf: 0 },
    );
  }, [scores]);

  const overallPercent = outOf > 0 ? Math.round((total / outOf) * 100) : 0;
  const letter = gradeCalc(overallPercent);

  const courses = React.useMemo(() => {
    const bySubject = new Map<number, { total: number; outOf: number }>();
    for (const sc of scores) {
      const t = scoreTotals(sc.results);
      const prev = bySubject.get(sc.subject_id) ?? { total: 0, outOf: 0 };
      bySubject.set(sc.subject_id, {
        total: prev.total + t.total,
        outOf: prev.outOf + t.outOf,
      });
    }
    return [...bySubject.entries()]
      .map(([subjectId, t]) => ({
        subjectId,
        percent: t.outOf > 0 ? Math.round((t.total / t.outOf) * 100) : 0,
      }))
      .sort((a, b) => b.percent - a.percent);
  }, [scores]);

  const best = courses[0];
  const bestSubject = best ? getSubjectById(best.subjectId) : undefined;

  const cards = [
    {
      icon: <PercentIcon />,
      label: 'Overall average',
      value: `${overallPercent}%`,
      color: 'primary.main' as const,
    },
    {
      icon: <EmojiEventsIcon />,
      label: 'Letter grade',
      value: letter,
      color: 'warning.main' as const,
    },
    {
      icon: <MenuBookIcon />,
      label: 'Scored courses',
      value: String(courses.length),
      color: 'success.main' as const,
    },
    {
      icon: <TrendingUpIcon />,
      label: 'Best subject',
      value: bestSubject ? `${bestSubject.subject_code} · ${best.percent}%` : '—',
      color: 'secondary.main' as const,
    },
  ];

  return (
    <Grid container spacing={2} component="section" aria-label="Grades summary">
      {cards.map((card) => (
        <Grid key={card.label} size={{ xs: 6, sm: 3 }}>
          <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider', height: '100%' }}>
            <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
              <Box
                aria-hidden
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  bgcolor: card.color,
                  color: '#fff',
                  mb: 1.5,
                }}
              >
                {card.icon}
              </Box>
              <Typography variant="h5" component="p" sx={{ fontWeight: 800, fontSize: { xs: 20, sm: 24 } }}>
                {card.value}
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                {card.label}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
