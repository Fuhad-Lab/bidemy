'use client';

import Link from 'next/link';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import SchoolIcon from '@mui/icons-material/School';
import DynamicIcon from '@/components/teacher-tools/DynamicIcon';
import {
  TEACHER_SUBJECTS,
  TEACHER_CONFIRMATION_ROUTE,
  STUDENT_AREA_ROUTE,
} from '@/data/teachers/subjects';

/**
 * Teachers index — links to the confirmation gate and each subject dashboard.
 * (The original repo had no teachers/index.html; this page mirrors the
 * dashboard grid it exposed via teacher-dashboard-<subject>.html.)
 */

const gridItemSx = { display: 'flex', flexDirection: 'column' } as const;

export default function TeachersIndexPage() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #dbeafe 0%, #e0e7ff 45%, #ffffff 100%)',
        py: { xs: 4, md: 6 },
        px: { xs: 2, sm: 3 },
      }}
    >
      <Box sx={{ maxWidth: 1100, mx: 'auto' }}>
        <Chip
          icon={<SchoolIcon />}
          label="JUANOVA CORTEX · Teachers"
          sx={{ bgcolor: 'rgba(255,255,255,0.75)', color: '#1e3a8a', fontWeight: 700, mb: 2 }}
        />
        <Typography variant="h3" component="h1" sx={{ fontWeight: 800, color: '#111827' }}>
          Teacher Dashboards
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mt: 1, maxWidth: 640 }}>
          Pick a subject to open its live-session dashboard, or confirm your
          teacher ID first. Every subject ships with a lesson planner, timer,
          to-do list, sticky notes, quick links and the full syllabus tracker.
        </Typography>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mt: 3 }}>
          <Button
            component={Link}
            href={TEACHER_CONFIRMATION_ROUTE}
            variant="contained"
            size="large"
            startIcon={<HowToRegIcon />}
            sx={{ borderRadius: 6, px: 3 }}
          >
            Teacher Confirmation (ID gate)
          </Button>
          <Button
            component={Link}
            href={STUDENT_AREA_ROUTE}
            variant="outlined"
            size="large"
            endIcon={<ArrowForwardIcon />}
            sx={{ borderRadius: 6, px: 3 }}
          >
            Student area
          </Button>
        </Stack>

        <Divider sx={{ my: 4 }} />

        <Grid container spacing={2.5} component="section" aria-label="Subjects">
          {TEACHER_SUBJECTS.map((subject) => (
            <Grid key={subject.id} size={{ xs: 12, sm: 6, md: 4 }} sx={gridItemSx}>
              <Card
                elevation={0}
                sx={{
                  flex: 1,
                  borderRadius: 4,
                  border: '1px solid #dbe5ff',
                  boxShadow: '0 8px 20px rgba(30,58,138,0.08)',
                }}
              >
                <CardActionArea
                  component={Link}
                  href={`/teachers/${subject.id}/`}
                  sx={{ height: '100%' }}
                >
                  <CardContent sx={{ p: 3, height: '100%' }}>
                    <Box
                      aria-hidden
                      sx={{
                        width: 48,
                        height: 48,
                        borderRadius: 2.5,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#fff',
                        background: subject.gradient,
                        mb: 2,
                      }}
                    >
                      <DynamicIcon name={subject.icon} />
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                      {subject.label}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                      Live session · tools · syllabus tracker
                    </Typography>
                    <Stack direction="row" spacing={0.5} sx={{ alignItems: "center", mt: 2, color: 'primary.main' }}>
                      <Typography variant="caption" sx={{ fontWeight: 700 }}>
                        Open dashboard
                      </Typography>
                      <ArrowForwardIcon sx={{ fontSize: 14 }} />
                    </Stack>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
