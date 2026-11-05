'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import Paper from '@mui/material/Paper';
import MuiLink from '@mui/material/Link';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import SectionShell from '@/components/relationship/SectionShell';
import { TEACHER_NAV_LINKS } from '@/components/relationship/nav-links';
import {
  studentGradeHref,
  studentsOfClassHref,
  TEACHER_CLASSES,
  TEACHER_STUDENTS_OF_CLASS,
} from '@/components/relationship/routes';
import {
  TEACHER,
  classLabel,
  studentsInClass,
  teacherClasses,
  type SchoolClass,
} from '@/data/relationship/demo-data';

/**
 * Port of Teacher/students_of_class.php — students of one selected class
 * (?class_id=N). The class picker mirrors the PHP page's class links.
 */

function StudentsOfClassContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const classes = React.useMemo(() => teacherClasses(TEACHER), []);

  const requestedId = Number(searchParams.get('class_id')) || classes[0]?.class_id;
  const activeClass: SchoolClass & { label: string } =
    classes.find((c) => c.class_id === requestedId) ?? classes[0];

  const students = React.useMemo(
    () => (activeClass ? studentsInClass(activeClass) : []),
    [activeClass],
  );

  if (!activeClass) {
    return <Alert severity="info">Empty! No classes are assigned to this teacher.</Alert>;
  }

  return (
    <>
      <Stack direction="row" spacing={1} sx={{ mb: 3, flexWrap: 'wrap', gap: 1 }}>
        <Button component={Link} href={TEACHER_CLASSES} variant="contained" color="success">
          Go Back to classes
        </Button>
        <Button component={Link} href={TEACHER_STUDENTS_OF_CLASS} variant="outlined" color="success">
          All classes
        </Button>
      </Stack>

      <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
        Students of Class {activeClass.label}
      </Typography>

      <Grid container spacing={3} sx={{ alignItems: 'flex-start' }}>
        <Grid size={{ xs: 12, md: 4 }}>
          <FormControl size="small" fullWidth>
            <InputLabel id="pick-class-label">Class</InputLabel>
            <Select
              labelId="pick-class-label"
              value={activeClass.class_id}
              label="Class"
              onChange={(e) => {
                const id = Number(e.target.value);
                // mirrors students_of_class.php?class_id=…
                router.replace(studentsOfClassHref(id));
              }}
            >
              {classes.map((cls) => (
                <MenuItem key={cls.class_id} value={cls.class_id}>
                  {cls.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Chip
            sx={{ mt: 2 }}
            color="success"
            variant="outlined"
            label={`${students.length} student${students.length === 1 ? '' : 's'} · class ${classLabel(
              activeClass.grade,
              activeClass.section,
            )}`}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 8 }}>
          {students.length > 0 ? (
            <TableContainer
              component={Paper}
              elevation={0}
              sx={{ border: '1px solid', borderColor: 'divider', maxHeight: 520, overflowY: 'auto' }}
            >
              <Table size="small" stickyHeader aria-label={`Students of class ${activeClass.label}`}>
                <TableHead>
                  <TableRow>
                    {['#', 'ID', 'First Name', 'Last Name', 'Username', 'Grade', 'Action'].map((column) => (
                      <TableCell key={column} sx={{ fontWeight: 700 }}>
                        {column}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {students.map((student, index) => (
                    <TableRow key={student.student_id} hover>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{student.student_id}</TableCell>
                      <TableCell>
                        <MuiLink
                          component={Link}
                          href={studentGradeHref(student.student_id)}
                          underline="hover"
                          sx={{ fontWeight: 600 }}
                        >
                          {student.fname}
                        </MuiLink>
                      </TableCell>
                      <TableCell>{student.lname}</TableCell>
                      <TableCell>{student.username}</TableCell>
                      <TableCell>{classLabel(student.grade, student.section)}</TableCell>
                      <TableCell>
                        <Button
                          component={Link}
                          href={studentGradeHref(student.student_id)}
                          size="small"
                          variant="outlined"
                          startIcon={<AssignmentIndIcon />}
                        >
                          Grade
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Alert severity="info">
              Empty! No students are enrolled in {activeClass.label} yet.
            </Alert>
          )}
        </Grid>
      </Grid>

      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 3 }}>
        Tip — click a first name (or the Grade button) to open the score editor for that student.
      </Typography>
    </>
  );
}

export default function StudentsOfClassPage() {
  return (
    <SectionShell
      role="Teacher"
      active="Students"
      links={TEACHER_NAV_LINKS}
      maxWidth={1000}
    >
      <React.Suspense
        fallback={
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress aria-label="Loading class students" />
          </Box>
        }
      >
        <StudentsOfClassContent />
      </React.Suspense>
    </SectionShell>
  );
}
