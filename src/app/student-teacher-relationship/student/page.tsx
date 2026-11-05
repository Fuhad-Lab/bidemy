'use client';

import * as React from 'react';
import Link from 'next/link';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import GradeIcon from '@mui/icons-material/Grade';
import LockResetIcon from '@mui/icons-material/LockReset';
import SectionShell from '@/components/relationship/SectionShell';
import StudentProfileCard from '@/components/relationship/StudentProfileCard';
import GradeSummaryCards from '@/components/relationship/GradeSummaryCards';
import { STUDENT_NAV_LINKS } from '@/components/relationship/nav-links';
import { STUDENT_GRADE, STUDENT_PASS } from '@/components/relationship/routes';
import {
  DEMO_STUDENT_ID,
  SETTING,
  getStudentById,
  scoresForStudent,
} from '@/data/relationship/demo-data';

/**
 * Student home — port of Student/index.php (profile card) extended with the
 * grades summary cards and quick links to Grade Summary / Change Password.
 * The "logged in" student is the demo student john (ID 1).
 */

export default function StudentHomePage() {
  const student = getStudentById(DEMO_STUDENT_ID)!;
  const scores = React.useMemo(() => scoresForStudent(student.student_id), [student.student_id]);

  return (
    <SectionShell role="Student" active="Dashboard" links={STUDENT_NAV_LINKS}>
      <Stack spacing={1} sx={{ mb: 4 }}>
        <Chip
          label={`@${student.username} · ${student.gender} · Grade ${student.grade}`}
          color="primary"
          variant="outlined"
          sx={{ alignSelf: 'flex-start', fontWeight: 700 }}
        />
        <Typography variant="h4" component="h1">
          My dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Welcome back, {student.fname}. School year {SETTING.current_year}, semester {SETTING.current_semester}.
        </Typography>
      </Stack>

      <GradeSummaryCards scores={scores} />

      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mt: 3 }}>
        <Button
          component={Link}
          href={STUDENT_GRADE}
          variant="contained"
          size="large"
          startIcon={<GradeIcon />}
        >
          View Grade Summary
        </Button>
        <Button
          component={Link}
          href={STUDENT_PASS}
          variant="outlined"
          size="large"
          startIcon={<LockResetIcon />}
        >
          Change Password
        </Button>
      </Stack>

      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid size={{ xs: 12, sm: 8, md: 6 }}>
          <Box component="section" aria-label="My profile">
            <Typography variant="h6" component="h2" sx={{ mb: 1.5 }}>
              My profile
            </Typography>
            <StudentProfileCard student={student} />
          </Box>
        </Grid>
      </Grid>
    </SectionShell>
  );
}
