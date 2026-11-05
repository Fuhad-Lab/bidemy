'use client';

import * as React from 'react';
import Link from 'next/link';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import MuiLink from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import CasinoIcon from '@mui/icons-material/Casino';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SearchIcon from '@mui/icons-material/Search';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import SectionShell from '@/components/relationship/SectionShell';
import { REGISTRAR_NAV_LINKS } from '@/components/relationship/nav-links';
import {
  REGISTRAR_HOME,
  REGISTRAR_VIEW,
} from '@/components/relationship/routes';
import {
  GRADES,
  SECTIONS,
  SETTING,
  STUDENTS,
  classLabel,
  type Student,
} from '@/data/relationship/demo-data';

/**
 * Port of RegistrarOffice/student-add.php — the "Add New Student" form.
 * Registration is demo-only: the new record is kept in local state (session)
 * and shown in the table below; no backend/API/DB.
 */

interface FormState {
  fname: string;
  lname: string;
  address: string;
  email: string;
  date_of_birth: string;
  gender: 'Male' | 'Female';
  username: string;
  pass: string;
  parent_fname: string;
  parent_lname: string;
  parent_phone_number: string;
  grade: string;
  section: string;
}

const emptyForm: FormState = {
  fname: '',
  lname: '',
  address: '',
  email: '',
  date_of_birth: '',
  gender: 'Male',
  username: '',
  pass: '',
  parent_fname: '',
  parent_lname: '',
  parent_phone_number: '',
  grade: '',
  section: '',
};

function makePass(length: number): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i += 1) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

export default function StudentAddPage() {
  const [registered, setRegistered] = React.useState<Student[]>(STUDENTS);
  const [form, setForm] = React.useState<FormState>(emptyForm);
  const [error, setError] = React.useState('');
  const [success, setSuccess] = React.useState('');

  const setField = (field: keyof FormState) => (value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!form.fname.trim() || !form.lname.trim() || !form.username.trim() || !form.pass.trim()) {
      setError('First name, last name, username and password are required.');
      setSuccess('');
      return;
    }
    if (registered.some((s) => s.username.toLowerCase() === form.username.trim().toLowerCase())) {
      setError(`Username "${form.username}" is already taken. Try another one.`);
      setSuccess('');
      return;
    }
    if (!form.grade) {
      setError('Please choose a grade.');
      setSuccess('');
      return;
    }
    if (!form.section) {
      setError('Please choose a section.');
      setSuccess('');
      return;
    }

    const newStudentId =
      registered.reduce((max, s) => Math.max(max, s.student_id), 0) + 1;
    const newStudent: Student = {
      student_id: newStudentId,
      username: form.username.trim(),
      password: form.pass,
      fname: form.fname.trim(),
      lname: form.lname.trim(),
      grade: Number(form.grade),
      section: Number(form.section),
      address: form.address.trim() || '—',
      gender: form.gender,
      email_address: form.email.trim() || `${form.username.trim()}@school.com`,
      date_of_birth: form.date_of_birth || '—',
      date_of_joined: `${SETTING.current_year}-01-01 09:00:00`,
      parent_fname: form.parent_fname.trim() || '—',
      parent_lname: form.parent_lname.trim() || '—',
      parent_phone_number: form.parent_phone_number.trim() || '—',
    };

    setRegistered((prev) => [...prev, newStudent]);
    setError('');
    setSuccess(
      `New student registered successfully — ID ${newStudent.student_id}, @${newStudent.username}, class ${classLabel(
        newStudent.grade,
        newStudent.section,
      )}.`,
    );
    setForm(emptyForm);
  };

  return (
    <SectionShell
      role="Registrar Office"
      active="Add Student"
      links={REGISTRAR_NAV_LINKS}
    >
      <Button component={Link} href={REGISTRAR_HOME} variant="contained" color="secondary" sx={{ mb: 3 }}>
        Go Back to dashboard
      </Button>

      <Paper elevation={1} sx={{ maxWidth: 600, p: { xs: 2.5, sm: 4 } }}>
        <Typography variant="h5" component="h1">
          Add New Student
        </Typography>
        <Divider sx={{ my: 2 }} />

        {error ? (
          <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>
            {error}
          </Alert>
        ) : null}
        {success ? (
          <Alert severity="success" sx={{ mb: 2 }} onClose={() => setSuccess('')}>
            {success}
          </Alert>
        ) : null}

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                label="First name"
                size="small"
                fullWidth
                required
                value={form.fname}
                onChange={(e) => setField('fname')(e.target.value)}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                label="Last name"
                size="small"
                fullWidth
                required
                value={form.lname}
                onChange={(e) => setField('lname')(e.target.value)}
              />
            </Grid>
            <Grid size={12}>
              <TextField
                label="Address"
                size="small"
                fullWidth
                value={form.address}
                onChange={(e) => setField('address')(e.target.value)}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 7 }}>
              <TextField
                label="Email address"
                type="email"
                size="small"
                fullWidth
                value={form.email}
                onChange={(e) => setField('email')(e.target.value)}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 5 }}>
              <TextField
                label="Date of birth"
                type="date"
                size="small"
                fullWidth
                slotProps={{ inputLabel: { shrink: true } }}
                value={form.date_of_birth}
                onChange={(e) => setField('date_of_birth')(e.target.value)}
              />
            </Grid>

            <Grid size={12}>
              <FormControl>
                <FormLabel sx={{ fontSize: 14 }}>Gender</FormLabel>
                <RadioGroup
                  row
                  name="gender"
                  value={form.gender}
                  onChange={(e) => setField('gender')(e.target.value)}
                >
                  <FormControlLabel value="Male" control={<Radio size="small" />} label="Male" />
                  <FormControlLabel value="Female" control={<Radio size="small" />} label="Female" />
                </RadioGroup>
              </FormControl>
            </Grid>

            <Divider sx={{ width: '100%', my: 1 }} />

            <Grid size={12}>
              <TextField
                label="Username"
                size="small"
                fullWidth
                required
                value={form.username}
                onChange={(e) => setField('username')(e.target.value)}
              />
            </Grid>
            <Grid size={12}>
              <TextField
                label="Password"
                size="small"
                fullWidth
                required
                value={form.pass}
                onChange={(e) => setField('pass')(e.target.value)}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <Button
                          startIcon={<CasinoIcon />}
                          onClick={(e) => {
                            e.preventDefault();
                            setField('pass')(makePass(4));
                          }}
                        >
                          Random
                        </Button>
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </Grid>

            <Divider sx={{ width: '100%', my: 1 }} />

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                label="Parent first name"
                size="small"
                fullWidth
                value={form.parent_fname}
                onChange={(e) => setField('parent_fname')(e.target.value)}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                label="Parent last name"
                size="small"
                fullWidth
                value={form.parent_lname}
                onChange={(e) => setField('parent_lname')(e.target.value)}
              />
            </Grid>
            <Grid size={12}>
              <TextField
                label="Parent phone number"
                size="small"
                fullWidth
                value={form.parent_phone_number}
                onChange={(e) => setField('parent_phone_number')(e.target.value)}
              />
            </Grid>

            <Divider sx={{ width: '100%', my: 1 }} />

            <Grid size={12}>
              <FormControl>
                <FormLabel sx={{ fontSize: 14 }}>Grade</FormLabel>
                <RadioGroup
                  row
                  name="grade"
                  value={form.grade}
                  onChange={(e) => setField('grade')(e.target.value)}
                >
                  {GRADES.map((g) => (
                    <FormControlLabel
                      key={g.grade_id}
                      value={String(g.grade_id)}
                      control={<Radio size="small" />}
                      label={`${g.grade_code}-${g.grade}`}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid size={12}>
              <FormControl>
                <FormLabel sx={{ fontSize: 14 }}>Section</FormLabel>
                <RadioGroup
                  row
                  name="section"
                  value={form.section}
                  onChange={(e) => setField('section')(e.target.value)}
                >
                  {SECTIONS.map((s) => (
                    <FormControlLabel
                      key={s.section_id}
                      value={String(s.section_id)}
                      control={<Radio size="small" />}
                      label={s.section}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>

          <Button type="submit" variant="contained" size="large" sx={{ mt: 3 }}>
            Register
          </Button>
        </Box>
      </Paper>

      {/* Session registry — proves the local-state addition */}
      <Typography variant="h6" component="h2" sx={{ mt: 5, mb: 1 }}>
        Students in this session ({registered.length})
      </Typography>
      <Box sx={{ maxHeight: 380, overflowY: 'auto', border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
        <TableContainer>
          <Table size="small" stickyHeader aria-label="Registered students">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 700 }}>#</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>ID</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>First Name</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Last Name</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Username</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Class</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {registered.map((student, index) => (
                <TableRow key={student.student_id} hover>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{student.student_id}</TableCell>
                  <TableCell>
                    <MuiLink
                      component={Link}
                      href={`${REGISTRAR_VIEW}?student_id=${student.student_id}`}
                      underline="hover"
                    >
                      {student.fname}
                    </MuiLink>
                  </TableCell>
                  <TableCell>{student.lname}</TableCell>
                  <TableCell>{student.username}</TableCell>
                  <TableCell>{classLabel(student.grade, student.section)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
        Demo only — registrations live in local state and reset on reload.
      </Typography>
    </SectionShell>
  );
}
