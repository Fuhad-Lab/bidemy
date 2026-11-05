'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { type SelectChangeEvent } from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SearchIcon from '@mui/icons-material/Search';
import SectionShell from '@/components/relationship/SectionShell';
import StudentProfileCard from '@/components/relationship/StudentProfileCard';
import GradesTables from '@/components/relationship/GradesTables';
import { REGISTRAR_NAV_LINKS } from '@/components/relationship/nav-links';
import {
  REGISTRAR_ADD,
  REGISTRAR_HOME,
  REGISTRAR_SEARCH,
  REGISTRAR_VIEW,
} from '@/components/relationship/routes';
import {
  DEMO_STUDENT_ID,
  STUDENTS,
  formatStudentName,
  getStudentById,
  scoresForStudent,
} from '@/data/relationship/demo-data';

/**
 * Port of RegistrarOffice/student-view.php — a student profile card plus the
 * grade history tables (the same year-grouped tables as Student/grade.php).
 * The selected student comes from ?student_id=N and can be switched in-page.
 */

function StudentViewContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const requestedId = Number(searchParams.get('student_id')) || DEMO_STUDENT_ID;
  const student = getStudentById(requestedId) ?? getStudentById(DEMO_STUDENT_ID)!;
  const scores = React.useMemo(() => scoresForStudent(student.student_id), [student.student_id]);

  const handlePick = (event: SelectChangeEvent<number>) => {
    const value = Number(event.target.value);
    // keep the URL in sync so the record is shareable, like the PHP links
    router.replace(`${REGISTRAR_VIEW}?student_id=${value}`);
  };

  return (
    <>
      <Stack direction="row" spacing={1} sx={{ mb: 3, flexWrap: 'wrap', gap: 1 }}>
        <Button component={Link} href={REGISTRAR_ADD} variant="contained" color="secondary">
          Add New Student
        </Button>
        <Button component={Link} href={REGISTRAR_SEARCH} variant="contained" color="secondary">
          Go Back to search
        </Button>
        <Button component={Link} href={REGISTRAR_HOME} variant="contained" color="secondary">
          Dashboard
        </Button>
      </Stack>

      <Typography variant="h5" component="h1" sx={{ mb: 2 }}>
        View Student
      </Typography>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 5 }}>
          <FormControl size="small" fullWidth sx={{ mb: 2 }}>
            <InputLabel id="pick-student-label">Pick a student</InputLabel>
            <Select
              labelId="pick-student-label"
              value={student.student_id}
              label="Pick a student"
              onChange={handlePick}
            >
              {STUDENTS.map((s) => (
                <MenuItem key={s.student_id} value={s.student_id}>
                  #{s.student_id} · {formatStudentName(s)} (@{s.username})
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <StudentProfileCard student={student} />
        </Grid>
        <Grid size={{ xs: 12, md: 7 }}>
          <Typography variant="h6" component="h2" sx={{ mb: 0.5 }}>
            Grades history
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Assessment results grouped by school year, exactly like the student&apos;s own Grade Summary.
          </Typography>
          <GradesTables scores={scores} />
        </Grid>
      </Grid>
    </>
  );
}

export default function StudentViewPage() {
  return (
    <SectionShell
      role="Registrar Office"
      active="View Student"
      links={REGISTRAR_NAV_LINKS}
    >
      <React.Suspense
        fallback={
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress aria-label="Loading student" />
          </Box>
        }
      >
        <StudentViewContent />
      </React.Suspense>
      <Alert severity="info" sx={{ mt: 4 }}>
        Demo data only — profile edits and score changes are not persisted.
      </Alert>
    </SectionShell>
  );
}
