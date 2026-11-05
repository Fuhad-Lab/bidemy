'use client';

/**
 * Replica of teachers/teacher-confirmation.html — teacher ID gate followed by
 * subject selection, routing to that subject's dashboard home.
 *
 * Original behaviour preserved:
 *  - gate ID: `juatex@2025.NO.1` (invalid → error alert)
 *  - select subject → "Go to Teacher Dashboard" → teacher-dashboard-<subject>.html
 *    (now /teachers/<subject>/)
 *  - "Back to Homepage" → ../index.html (now /)
 */

import * as React from 'react';
import { useRouter } from 'next/navigation';
import NextLink from 'next/link';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import MuiLink from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import DashboardIcon from '@mui/icons-material/Dashboard';
import HomeIcon from '@mui/icons-material/Home';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import { TEACHER_SUBJECTS } from '@/data/teachers/subjects';

const CORRECT_ID = 'juatex@2025.NO.1';

export default function TeacherConfirmationPage() {
  const router = useRouter();
  const [unlocked, setUnlocked] = React.useState(false);
  const [teacherId, setTeacherId] = React.useState('');
  const [error, setError] = React.useState('');
  const [subject, setSubject] = React.useState('');
  const [subjectError, setSubjectError] = React.useState('');

  const submitId = (e: React.FormEvent) => {
    e.preventDefault();
    if (teacherId.trim() === CORRECT_ID) {
      setError('');
      setUnlocked(true);
    } else {
      setError('Invalid Teacher ID. Please try again. (Demo hint: juatex@2025.NO.1)');
    }
  };

  const goToDashboard = () => {
    if (!subject) {
      setSubjectError('Please select a subject before proceeding.');
      return;
    }
    router.push(`/teachers/${subject}/`);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: '#f9fafb',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: 6,
        px: 2,
      }}
    >
      <Container maxWidth="sm" disableGutters>
        <Card
          elevation={8}
          sx={{ borderRadius: 3, boxShadow: '0 20px 45px rgba(15,23,42,0.12)' }}
        >
          <CardContent sx={{ p: { xs: 3, sm: 4 }, textAlign: 'center' }}>
            {!unlocked ? (
              <Box component="section" aria-label="Teacher ID entry">
                <Typography variant="h4" component="h1" sx={{ fontWeight: 800, mb: 1.5 }}>
                  Enter Your Teacher ID
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  Please enter your unique ID to proceed.
                </Typography>
                <Box component="form" onSubmit={submitId} noValidate>
                  <TextField
                    fullWidth
                    label="Teacher ID"
                    placeholder="Enter Teacher ID"
                    value={teacherId}
                    onChange={(e) => setTeacherId(e.target.value)}
                    error={Boolean(error)}
                    helperText={error || 'Demo access — ID shown below'}
                    autoFocus
                    slotProps={{
                      input: { startAdornment: <VpnKeyIcon fontSize="small" sx={{ mr: 1, color: 'text.disabled' }} /> },
                    }}
                    sx={{ mb: 2 }}
                  />
                  <Button type="submit" fullWidth variant="contained" size="large" sx={{ borderRadius: 6, py: 1.3 }}>
                    Submit
                  </Button>
                </Box>
                <Alert severity="info" icon={false} sx={{ mt: 3, textAlign: 'left', fontSize: 13 }}>
                  NOTE: Only Teachers from JUANOVA CORTEX have access to the ID.
                  Want to become one of our teachers or apply for a role?{' '}
                  <MuiLink href="#" underline="hover" onClick={(e) => e.preventDefault()}>
                    CLICK HERE
                  </MuiLink>
                  <br />
                  Demo ID: <strong>{CORRECT_ID}</strong>
                </Alert>
              </Box>
            ) : (
              <Box component="section" aria-label="Subject selection">
                <Typography variant="h4" component="h1" sx={{ fontWeight: 800, mb: 1.5 }}>
                  Welcome, Teacher!
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  Thank you for confirming your role. We&apos;re excited to have you on board.
                </Typography>

                <TextField
                  select
                  fullWidth
                  label="Please select the subject you teach:"
                  value={subject}
                  onChange={(e) => {
                    setSubject(e.target.value);
                    setSubjectError('');
                  }}
                  error={Boolean(subjectError)}
                  helperText={subjectError}
                  sx={{ mb: 2, textAlign: 'left' }}
                >
                  <MenuItem value="">--Select a Subject--</MenuItem>
                  {TEACHER_SUBJECTS.map((s) => (
                    <MenuItem key={s.id} value={s.id}>
                      {s.label}
                    </MenuItem>
                  ))}
                </TextField>

                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  What would you like to do next?
                </Typography>

                <Stack spacing={2}>
                  <Button
                    variant="contained"
                    size="large"
                    startIcon={<DashboardIcon />}
                    onClick={goToDashboard}
                    sx={{ borderRadius: 6, py: 1.3 }}
                  >
                    Go to Teacher Dashboard
                  </Button>
                  <Button
                    component={NextLink}
                    href="/"
                    variant="outlined"
                    size="large"
                    startIcon={<HomeIcon />}
                    sx={{ borderRadius: 6, py: 1.3 }}
                  >
                    Back to Homepage
                  </Button>
                </Stack>
              </Box>
            )}
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}
