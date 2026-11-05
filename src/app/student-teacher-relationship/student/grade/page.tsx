'use client';

import * as React from 'react';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import GradesTables from '@/components/relationship/GradesTables';
import SectionShell from '@/components/relationship/SectionShell';
import { STUDENT_NAV_LINKS } from '@/components/relationship/nav-links';
import { STUDENT_GRADE } from '@/components/relationship/routes';
import {
  DEMO_STUDENT_ID,
  SETTING,
  formatStudentName,
  getStudentById,
  scoresForStudent,
} from '@/data/relationship/demo-data';

/**
 * Port of Student/grade.php — the grade summary of the logged-in demo student,
 * one bordered table per school year with caption "Year - <year>".
 */

export default function StudentGradePage() {
  const student = getStudentById(DEMO_STUDENT_ID)!;
  const scores = React.useMemo(() => scoresForStudent(student.student_id), [student.student_id]);

  return (
    <SectionShell role="Student" active="Grade Summary" links={STUDENT_NAV_LINKS}>
      <Typography variant="h4" component="h1" sx={{ mb: 0.5 }}>
        Grade Summary
      </Typography>
      <Typography variant="body1" color="text.secondary">
        {formatStudentName(student)} (@{student.username}) · school year {SETTING.current_year}, semester{' '}
        {SETTING.current_semester}
      </Typography>
      <Divider sx={{ my: 2 }} />

      <Box component="section" aria-label="Grade summary tables">
        <GradesTables scores={scores} />
      </Box>

      <Stack sx={{ mt: 3 }}>
        <Alert severity="info">
          Results are shown as “score / out-of” chips per assessment — the same format the teacher
          enters in the Students Grade editor.
        </Alert>
      </Stack>
    </SectionShell>
  );
}
