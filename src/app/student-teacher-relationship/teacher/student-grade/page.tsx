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
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import SaveIcon from '@mui/icons-material/Save';
import SectionShell from '@/components/relationship/SectionShell';
import { TEACHER_NAV_LINKS } from '@/components/relationship/nav-links';
import {
  studentGradeHref,
  TEACHER_STUDENTS,
  TEACHER_STUDENTS_OF_CLASS,
} from '@/components/relationship/routes';
import {
  DEMO_STUDENT_ID,
  SETTING,
  STUDENTS,
  STUDENT_SCORES,
  TEACHER,
  formatStudentName,
  getGradeById,
  getSectionById,
  getStudentById,
  gradeCalc,
  teacherSubjects,
  type StudentScore,
} from '@/data/relationship/demo-data';

/**
 * Port of Teacher/student-grade.php — the score editor. Pick a student and a
 * subject, then type up to five "score / out-of" assessments into the grid;
 * Save keeps them in local state (demo only, no backend/API/DB) exactly like
 * the PHP form saved one results row ("70 100, 80 100").
 */

const MAX_ASSESSMENTS = 5;
type ScoreRow = { score: string; outOf: string };

const emptyRows: ScoreRow[] = Array.from({ length: MAX_ASSESSMENTS }, () => ({
  score: '',
  outOf: '',
}));

function rowsFromResults(results: string): ScoreRow[] {
  const pairs = results
    .split(',')
    .map((chunk) => chunk.trim())
    .filter(Boolean)
    .map((chunk) => chunk.split(/\s+/));
  const rows = pairs.map((pair) => ({ score: pair[0] ?? '', outOf: pair[1] ?? '' }));
  while (rows.length < MAX_ASSESSMENTS) rows.push({ score: '', outOf: '' });
  return rows.slice(0, MAX_ASSESSMENTS);
}

function StudentGradeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const subjects = React.useMemo(() => teacherSubjects(TEACHER), []);

  // Demo students — every seeded student is selectable, like the PHP URL contract
  const selectableStudents = STUDENTS;

  const requestedId = Number(searchParams.get('student_id')) || DEMO_STUDENT_ID;
  const [studentId, setStudentId] = React.useState(requestedId);
  const [subjectId, setSubjectId] = React.useState<number>(subjects[0]?.subject_id ?? 0);
  const [rows, setRows] = React.useState<ScoreRow[]>(emptyRows);
  const [scores, setScores] = React.useState<StudentScore[]>(STUDENT_SCORES);
  const [success, setSuccess] = React.useState('');
  const [error, setError] = React.useState('');

  const student = getStudentById(studentId) ?? getStudentById(DEMO_STUDENT_ID)!;
  const grade = getGradeById(student.grade);
  const section = getSectionById(student.section);

  // Existing record for the (student, subject, current semester/year) key
  const existing = React.useMemo(() => {
    if (!subjectId) return undefined;
    return scores.find(
      (sc) =>
        sc.student_id === student.student_id &&
        sc.subject_id === subjectId &&
        sc.teacher_id === TEACHER.teacher_id &&
        sc.semester === SETTING.current_semester &&
        sc.year === SETTING.current_year,
    );
  }, [scores, student.student_id, subjectId]);

  // Load the grid when the student or subject changes (mirrors the PHP
  // "Select" submit that repopulates the inputs)
  React.useEffect(() => {
    if (!subjectId) {
      setRows(emptyRows.map((row) => ({ ...row })));
      return;
    }
    const found = scores.find(
      (sc) =>
        sc.student_id === student.student_id &&
        sc.subject_id === subjectId &&
        sc.teacher_id === TEACHER.teacher_id &&
        sc.semester === SETTING.current_semester &&
        sc.year === SETTING.current_year,
    );
    setRows(found ? rowsFromResults(found.results) : emptyRows.map((row) => ({ ...row })));
    setError('');
    setSuccess('');
  }, [scores, student.student_id, subjectId]);

  const numericTotal = React.useMemo(() => {
    let total = 0;
    let outOf = 0;
    for (const row of rows) {
      const score = Number(row.score);
      const out = Number(row.outOf);
      if (row.score !== '' && row.outOf !== '' && Number.isFinite(score) && Number.isFinite(out)) {
        total += score;
        outOf += out;
      }
    }
    return { total, outOf, percent: outOf > 0 ? Math.round((total / outOf) * 100) : null };
  }, [rows]);

  const setCell = (index: number, field: keyof ScoreRow) => (value: string) => {
    setRows((prev) => prev.map((row, i) => (i === index ? { ...row, [field]: value } : row)));
  };

  const handleSave = (event: React.FormEvent) => {
    event.preventDefault();
    if (!subjectId) {
      setError('Choose a subject first.');
      setSuccess('');
      return;
    }

    const chunks: string[] = [];
    for (let i = 0; i < rows.length; i += 1) {
      const { score, outOf } = rows[i];
      const bothEmpty = score.trim() === '' && outOf.trim() === '';
      if (bothEmpty) continue;
      const scoreNum = Number(score);
      const outNum = Number(outOf);
      if (!Number.isFinite(scoreNum) || !Number.isFinite(outNum) || score.trim() === '' || outOf.trim() === '') {
        setError(`Assessment ${i + 1} needs both a numeric score and an out-of value.`);
        setSuccess('');
        return;
      }
      if (outNum <= 0) {
        setError(`Assessment ${i + 1}: out-of must be greater than 0.`);
        setSuccess('');
        return;
      }
      if (scoreNum < 0 || scoreNum > outNum) {
        setError(`Assessment ${i + 1}: score must be between 0 and ${outNum}.`);
        setSuccess('');
        return;
      }
      chunks.push(`${scoreNum} ${outNum}`);
    }

    if (chunks.length === 0) {
      setError('Enter at least one assessment score before saving.');
      setSuccess('');
      return;
    }

    const results = chunks.join(',');
    setScores((prev) => {
      const index = prev.findIndex(
        (sc) =>
          sc.student_id === student.student_id &&
          sc.subject_id === subjectId &&
          sc.teacher_id === TEACHER.teacher_id &&
          sc.semester === SETTING.current_semester &&
          sc.year === SETTING.current_year,
      );
      if (index >= 0) {
        const next = [...prev];
        next[index] = { ...next[index], results };
        return next;
      }
      const nextId = prev.reduce((max, sc) => Math.max(max, sc.id), 0) + 1;
      return [
        ...prev,
        {
          id: nextId,
          semester: SETTING.current_semester,
          year: SETTING.current_year,
          student_id: student.student_id,
          teacher_id: TEACHER.teacher_id,
          subject_id: subjectId,
          results,
        },
      ];
    });
    setError('');
    const subject = subjects.find((s) => s.subject_id === subjectId);
    setSuccess(
      `Scores saved for ${subject?.subject ?? 'subject'} — results "${results}". Total ${numericTotal.total}/${
        numericTotal.outOf
      } (${gradeCalc(numericTotal.percent ?? 0)}). Demo only — stored in local state.`,
    );
  };

  return (
    <>
      <Stack direction="row" spacing={1} sx={{ mb: 3, flexWrap: 'wrap', gap: 1 }}>
        <Button component={Link} href={TEACHER_STUDENTS} variant="contained" color="success">
          Go Back to students
        </Button>
        <Button component={Link} href={TEACHER_STUDENTS_OF_CLASS} variant="outlined" color="success">
          Browse by class
        </Button>
      </Stack>

      <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
        Students Grade
      </Typography>

      <Grid container spacing={3} sx={{ alignItems: 'flex-start' }}>
        {/* Student info + subject picker — mirrors the PHP "login shadow" card */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper elevation={1} sx={{ p: 2.5 }}>
            <FormControl size="small" fullWidth sx={{ mb: 2 }}>
              <InputLabel id="pick-student-label">Student</InputLabel>
              <Select
                labelId="pick-student-label"
                value={student.student_id}
                label="Student"
                onChange={(e) => {
                  const id = Number(e.target.value);
                  setStudentId(id);
                  // mirrors student-grade.php?student_id=…
                  router.replace(studentGradeHref(id));
                }}
              >
                {selectableStudents.map((s) => (
                  <MenuItem key={s.student_id} value={s.student_id}>
                    #{s.student_id} · {formatStudentName(s)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <List dense disablePadding>
              <ListItem disableGutters divider>
                <Typography variant="body2" sx={{ fontWeight: 700, width: 110 }}>
                  ID:
                </Typography>
                <Typography variant="body2">{student.student_id}</Typography>
              </ListItem>
              <ListItem disableGutters divider>
                <Typography variant="body2" sx={{ fontWeight: 700, width: 110 }}>
                  First Name:
                </Typography>
                <Typography variant="body2">{student.fname}</Typography>
              </ListItem>
              <ListItem disableGutters divider>
                <Typography variant="body2" sx={{ fontWeight: 700, width: 110 }}>
                  Last Name:
                </Typography>
                <Typography variant="body2">{student.lname}</Typography>
              </ListItem>
              <ListItem disableGutters divider>
                <Typography variant="body2" sx={{ fontWeight: 700, width: 110 }}>
                  Grade:
                </Typography>
                <Typography variant="body2">{grade ? `${grade.grade_code}-${grade.grade}` : '—'}</Typography>
              </ListItem>
              <ListItem disableGutters divider>
                <Typography variant="body2" sx={{ fontWeight: 700, width: 110 }}>
                  Section:
                </Typography>
                <Typography variant="body2">{section ? section.section : '—'}</Typography>
              </ListItem>
              <ListItem disableGutters>
                <Typography variant="body2" sx={{ textAlign: 'center', width: '100%' }}>
                  <strong>Year:</strong> {SETTING.current_year} &nbsp;&nbsp; <strong>Semester:</strong>{' '}
                  {SETTING.current_semester}
                </Typography>
              </ListItem>
            </List>

            <Box component="form" onSubmit={handleSave} sx={{ mt: 2 }}>
              <Typography variant="h6" component="h2" sx={{ mb: 1.5, textAlign: 'center' }}>
                Add Grade
              </Typography>
              <FormControl size="small" fullWidth sx={{ mb: 2 }}>
                <InputLabel id="pick-subject-label">Subject / Course</InputLabel>
                <Select
                  labelId="pick-subject-label"
                  value={subjectId}
                  label="Subject / Course"
                  onChange={(e) => setSubjectId(Number(e.target.value))}
                >
                  {subjects.map((subject) => (
                    <MenuItem key={subject.subject_id} value={subject.subject_id}>
                      {subject.subject_code} — {subject.subject}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {existing ? (
                <Chip
                  size="small"
                  variant="outlined"
                  sx={{ mb: 2 }}
                  label={`Existing record #${existing.id}: ${existing.results}`}
                />
              ) : (
                <Chip size="small" variant="outlined" color="warning" sx={{ mb: 2 }} label="No record yet for this semester" />
              )}
            </Box>
          </Paper>
        </Grid>

        {/* Editable score grid */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Box component="form" onSubmit={handleSave}>
            <TableContainer
              component={Paper}
              elevation={0}
              sx={{ border: '1px solid', borderColor: 'divider', maxWidth: 560 }}
            >
              <Table size="small" aria-label="Editable score grid">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 700, width: 130 }}>Assessment</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Score</TableCell>
                    <TableCell sx={{ width: 24, textAlign: 'center' }}>/</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Out of</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row, index) => (
                    <TableRow key={index} hover>
                      <TableCell sx={{ fontWeight: 600 }}>#{index + 1}</TableCell>
                      <TableCell>
                        <TextField
                          size="small"
                          type="number"
                          slotProps={{
                            htmlInput: {
                              min: 0,
                              max: 100,
                              'aria-label': `Assessment ${index + 1} score`,
                            },
                          }}
                          value={row.score}
                          onChange={(e) => setCell(index, 'score')(e.target.value)}
                          sx={{ width: 120 }}
                        />
                      </TableCell>
                      <TableCell sx={{ textAlign: 'center', color: 'text.secondary' }}>/</TableCell>
                      <TableCell>
                        <TextField
                          size="small"
                          type="number"
                          slotProps={{
                            htmlInput: {
                              min: 1,
                              max: 100,
                              'aria-label': `Assessment ${index + 1} out-of`,
                            },
                          }}
                          value={row.outOf}
                          onChange={(e) => setCell(index, 'outOf')(e.target.value)}
                          sx={{ width: 120 }}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell sx={{ fontWeight: 700 }}>Total</TableCell>
                    <TableCell colSpan={3} sx={{ fontWeight: 700 }}>
                      {numericTotal.total} / {numericTotal.outOf}
                      {numericTotal.percent !== null ? (
                        <Chip
                          size="small"
                          color={numericTotal.percent >= 50 ? 'success' : 'error'}
                          sx={{ ml: 1.5 }}
                          label={`${numericTotal.percent}% · ${gradeCalc(numericTotal.percent)}`}
                        />
                      ) : null}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>

            {error ? (
              <Alert severity="error" sx={{ mt: 2, maxWidth: 560 }} onClose={() => setError('')}>
                {error}
              </Alert>
            ) : null}
            {success ? (
              <Alert severity="success" sx={{ mt: 2, maxWidth: 560 }} onClose={() => setSuccess('')}>
                {success}
              </Alert>
            ) : null}

            <Button
              type="submit"
              variant="contained"
              size="large"
              startIcon={<SaveIcon />}
              sx={{ mt: 2 }}
            >
              Save Scores
            </Button>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default function StudentGradePage() {
  return (
    <SectionShell
      role="Teacher"
      active="Students Grade"
      links={TEACHER_NAV_LINKS}
      maxWidth={1100}
    >
      <React.Suspense
        fallback={
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress aria-label="Loading grade editor" />
          </Box>
        }
      >
        <StudentGradeContent />
      </React.Suspense>
    </SectionShell>
  );
}
