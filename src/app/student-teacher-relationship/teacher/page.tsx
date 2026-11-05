'use client';

import * as React from 'react';
import Link from 'next/link';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import PersonIcon from '@mui/icons-material/Person';
import SectionShell from '@/components/relationship/SectionShell';
import { TEACHER_NAV_LINKS } from '@/components/relationship/nav-links';
import {
  STUDENT_HOME,
  TEACHER_CLASSES,
  TEACHER_STUDENT_GRADE,
  TEACHER_STUDENTS,
} from '@/components/relationship/routes';
import {
  SETTING,
  TEACHER,
  studentsOfTeacherClasses,
  teacherClasses,
  teacherSubjects,
} from '@/data/relationship/demo-data';

/**
 * Teacher home — port of Teacher/index.php's welcome + quick stats extended
 * with links to Classes / Students / Students Grade (the navbar.php links).
 */

export default function TeacherHomePage() {
  const classes = teacherClasses(TEACHER);
  const students = studentsOfTeacherClasses();
  const subjects = teacherSubjects(TEACHER);

  const stats = [
    { label: 'Assigned classes', value: String(classes.length) },
    { label: 'Students in classes', value: String(students.length) },
    { label: 'Subjects taught', value: String(subjects.length) },
    { label: 'School year / semester', value: `${SETTING.current_year} · ${SETTING.current_semester}` },
  ];

  return (
    <SectionShell role="Teacher" active="Dashboard" links={TEACHER_NAV_LINKS} maxWidth={1000}>
      <Stack spacing={1} sx={{ mb: 4 }}>
        <Chip label={`Logged in as @${TEACHER.username}`} color="success" sx={{ alignSelf: 'flex-start', fontWeight: 700 }} />
        <Typography variant="h4" component="h1">
          Welcome, {TEACHER.fname} {TEACHER.lname}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {SETTING.school_name} · school year {SETTING.current_year}, semester {SETTING.current_semester}.
        </Typography>
      </Stack>

      <Grid container spacing={2} component="section" aria-label="Teaching statistics" sx={{ mb: 4 }}>
        {stats.map((stat) => (
          <Grid key={stat.label} size={{ xs: 6, sm: 3 }}>
            <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider', height: '100%' }}>
              <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                <Typography variant="h5" component="p" sx={{ fontWeight: 800, fontSize: { xs: 18, sm: 24 } }}>
                  {stat.value}
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                  {stat.label}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 4 }}>
        <Button component={Link} href={TEACHER_CLASSES} variant="contained" size="large">
          My Classes
        </Button>
        <Button component={Link} href={TEACHER_STUDENTS} variant="outlined" size="large">
          My Students
        </Button>
        <Button component={Link} href={TEACHER_STUDENT_GRADE} variant="outlined" size="large" color="secondary">
          Add / Edit Grades
        </Button>
      </Stack>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider' }}>
            <CardContent sx={{ p: 3 }}>
              <Stack direction="row" spacing={2} sx={{ mb: 2, alignItems: 'center' }}>
                <Avatar sx={{ bgcolor: 'success.main', width: 56, height: 56 }}>
                  <PersonIcon />
                </Avatar>
                <Box>
                  <Typography variant="h6" component="h2">
                    {TEACHER.fname} {TEACHER.lname}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    @{TEACHER.username} · employee #{TEACHER.employee_number}
                  </Typography>
                </Box>
              </Stack>
              <Divider sx={{ mb: 1.5 }} />
              <List dense disablePadding>
                <ListItem disableGutters divider>
                  <Typography variant="body2" color="text.secondary" sx={{ width: 130 }}>
                    Qualification
                  </Typography>
                  <Typography variant="body2">{TEACHER.qualification}</Typography>
                </ListItem>
                <ListItem disableGutters divider>
                  <Typography variant="body2" color="text.secondary" sx={{ width: 130 }}>
                    Subjects
                  </Typography>
                  <Typography variant="body2">{subjects.map((s) => s.subject).join(', ')}</Typography>
                </ListItem>
                <ListItem disableGutters divider>
                  <Typography variant="body2" color="text.secondary" sx={{ width: 130 }}>
                    Phone
                  </Typography>
                  <Typography variant="body2">{TEACHER.phone_number}</Typography>
                </ListItem>
                <ListItem disableGutters divider>
                  <Typography variant="body2" color="text.secondary" sx={{ width: 130 }}>
                    Email
                  </Typography>
                  <Typography variant="body2">{TEACHER.email_address}</Typography>
                </ListItem>
                <ListItem disableGutters>
                  <Typography variant="body2" color="text.secondary" sx={{ width: 130 }}>
                    Date of joined
                  </Typography>
                  <Typography variant="body2">{TEACHER.date_of_joined}</Typography>
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider' }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" component="h2" sx={{ mb: 1.5 }}>
                What this demo covers
              </Typography>
              <Stack spacing={1.5}>
                <Typography variant="body2" color="text.secondary">
                  <strong>Classes</strong> — the classes assigned to you (G3-B, G1-A, KG1-C, G2-A) with student counts.
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Students</strong> — the roster of all students in your classes, jump straight into grading.
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Students Grade</strong> — the score editor: pick a student + subject and type up to five
                  “score / out-of” assessments.
                </Typography>
                <Button component={Link} href={STUDENT_HOME} variant="text" sx={{ alignSelf: 'flex-start' }}>
                  Curious what students see? Open the student area →
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </SectionShell>
  );
}
