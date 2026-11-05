'use client';

import * as React from 'react';
import Link from 'next/link';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import MuiLink from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import Paper from '@mui/material/Paper';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import SearchIcon from '@mui/icons-material/Search';
import SectionShell from '@/components/relationship/SectionShell';
import { TEACHER_NAV_LINKS } from '@/components/relationship/nav-links';
import {
  studentGradeHref,
  TEACHER_CLASSES,
  TEACHER_STUDENTS,
  TEACHER_STUDENT_GRADE,
} from '@/components/relationship/routes';
import {
  TEACHER,
  classLabel,
  formatStudentName,
  studentsOfTeacherClasses,
} from '@/data/relationship/demo-data';

/**
 * Port of Teacher/students.php — the roster of every student in the demo
 * teacher's classes, with a quick filter and a "Grade" action per row that
 * opens student-grade/?student_id=N.
 */

export default function TeacherStudentsPage() {
  const students = React.useMemo(() => studentsOfTeacherClasses(), []);
  const [filter, setFilter] = React.useState('');

  const filtered = React.useMemo(() => {
    const key = filter.trim().toLowerCase();
    if (!key) return students;
    return students.filter((s) =>
      [s.fname, s.lname, s.username, String(s.student_id)].join(' ').toLowerCase().includes(key),
    );
  }, [students, filter]);

  return (
    <SectionShell role="Teacher" active="Students" links={TEACHER_NAV_LINKS} maxWidth={1000}>
      <Stack direction="row" spacing={1} sx={{ mb: 3, flexWrap: 'wrap', gap: 1 }}>
        <Button component={Link} href={TEACHER_CLASSES} variant="contained" color="success">
          Go Back to classes
        </Button>
        <Button component={Link} href={TEACHER_STUDENT_GRADE} variant="contained" color="success">
          Open grade editor
        </Button>
      </Stack>

      <Typography variant="h4" component="h1" sx={{ mb: 0.5 }}>
        My Students
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
        All students in the classes of {TEACHER.fname} {TEACHER.lname} ({students.length} total).
      </Typography>

      <Box component="form" onSubmit={(e) => e.preventDefault()} sx={{ mb: 3, maxWidth: 480 }}>
        <TextField
          size="small"
          fullWidth
          placeholder="Filter by name, username or ID…"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
            },
            htmlInput: { 'aria-label': 'Filter students' },
          }}
        />
      </Box>

      {filtered.length > 0 ? (
        <TableContainer
          component={Paper}
          elevation={0}
          sx={{ border: '1px solid', borderColor: 'divider', maxHeight: 560, overflowY: 'auto' }}
        >
          <Table size="small" stickyHeader aria-label="All students">
            <TableHead>
              <TableRow>
                {['#', 'ID', 'First Name', 'Last Name', 'Username', 'Class', 'Action'].map((column) => (
                  <TableCell key={column} sx={{ fontWeight: 700 }}>
                    {column}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filtered.map((student, index) => (
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
                      {formatStudentName(student)}
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
        <Alert severity="info">No students match “{filter}”.</Alert>
      )}
    </SectionShell>
  );
}
