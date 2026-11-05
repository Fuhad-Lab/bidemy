'use client';

import * as React from 'react';
import Link from 'next/link';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import GroupsIcon from '@mui/icons-material/Groups';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import SectionShell from '@/components/relationship/SectionShell';
import { TEACHER_NAV_LINKS } from '@/components/relationship/nav-links';
import { studentsOfClassHref, TEACHER_STUDENTS } from '@/components/relationship/routes';
import {
  TEACHER,
  getGradeById,
  getSectionById,
  studentsInClass,
  teacherClasses,
} from '@/data/relationship/demo-data';

/**
 * Port of Teacher/classes.php — the classes assigned to the demo teacher,
 * presented as a card grid with student counts instead of the original table.
 */

export default function TeacherClassesPage() {
  const classes = React.useMemo(() => teacherClasses(TEACHER), []);

  return (
    <SectionShell role="Teacher" active="Classes" links={TEACHER_NAV_LINKS} maxWidth={1000}>
      <Typography variant="h4" component="h1" sx={{ mb: 0.5 }}>
        Classes
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Classes assigned to you, {TEACHER.fname} {TEACHER.lname} — pick one to see its students.
      </Typography>

      {classes.length > 0 ? (
        <Grid container spacing={3} component="section" aria-label="Assigned classes">
          {classes.map((cls) => {
            const grade = getGradeById(cls.grade);
            const section = getSectionById(cls.section);
            const students = studentsInClass(cls);
            return (
              <Grid key={cls.class_id} size={{ xs: 12, sm: 6, md: 4 }} sx={{ display: 'flex' }}>
                <Card
                  elevation={0}
                  sx={{
                    flex: 1,
                    border: '1px solid',
                    borderColor: 'divider',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                    '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 14px 30px rgba(0,0,0,0.12)' },
                  }}
                >
                  <CardActionArea component={Link} href={studentsOfClassHref(cls.class_id)} sx={{ height: '100%' }}>
                    <CardContent sx={{ p: 3, display: 'flex', flexDirection: 'column', height: '100%' }}>
                      <Box
                        aria-hidden
                        sx={{
                          width: 56,
                          height: 56,
                          borderRadius: 3,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          bgcolor: 'success.main',
                          color: '#fff',
                          mb: 2,
                        }}
                      >
                        <MenuBookIcon />
                      </Box>
                      <Typography variant="h5" component="h2" sx={{ fontWeight: 800 }}>
                        {cls.label}
                      </Typography>
                      <Stack direction="row" spacing={1} sx={{ mt: 1.5, flexWrap: 'wrap', gap: 1 }}>
                        <Chip label={grade ? `Grade ${grade.grade_code}-${grade.grade}` : 'Grade —'} size="small" variant="outlined" />
                        <Chip label={`Section ${section ? section.section : '—'}`} size="small" variant="outlined" />
                        <Chip
                          icon={<GroupsIcon />}
                          label={`${students.length} student${students.length === 1 ? '' : 's'}`}
                          size="small"
                          color="success"
                          variant="outlined"
                        />
                      </Stack>
                      <Stack
                        direction="row"
                        spacing={0.5}
                        sx={{ mt: 2.5, color: 'success.main', alignItems: 'center' }}
                      >
                        <Typography variant="caption" sx={{ fontWeight: 700 }}>
                          View students of class
                        </Typography>
                        <ArrowForwardIcon sx={{ fontSize: 14 }} />
                      </Stack>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      ) : (
        <Alert severity="info">Empty! No classes are assigned to this teacher.</Alert>
      )}

      <Button component={Link} href={TEACHER_STUDENTS} variant="text" sx={{ mt: 4 }}>
        Or browse all students of my classes →
      </Button>
    </SectionShell>
  );
}
