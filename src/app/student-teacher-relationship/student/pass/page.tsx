'use client';

import * as React from 'react';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import CasinoIcon from '@mui/icons-material/Casino';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import SectionShell from '@/components/relationship/SectionShell';
import { STUDENT_NAV_LINKS } from '@/components/relationship/nav-links';
import { STUDENT_PASS } from '@/components/relationship/routes';
import { DEMO_STUDENT_ID, getStudentById } from '@/data/relationship/demo-data';

/**
 * Port of Student/pass.php — change password form for the demo student.
 * Demo-only: the "old password" is validated against the seed data
 * (password123) and nothing is persisted.
 */

function makePass(length: number): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i += 1) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

export default function StudentPassPage() {
  const student = getStudentById(DEMO_STUDENT_ID)!;
  const [oldPass, setOldPass] = React.useState('');
  const [newPass, setNewPass] = React.useState('');
  const [confirmPass, setConfirmPass] = React.useState('');
  const [showNew, setShowNew] = React.useState(false);
  const [error, setError] = React.useState('');
  const [success, setSuccess] = React.useState('');

  const handleRandom = () => {
    const generated = makePass(4);
    setNewPass(generated);
    setConfirmPass(generated);
    setError('');
    setSuccess('');
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (oldPass !== student.password) {
      setError(`Old password is not correct. (Demo hint: the seeded password is "${student.password}")`);
      setSuccess('');
      return;
    }
    if (newPass.trim().length < 4) {
      setError('New password must be at least 4 characters long.');
      setSuccess('');
      return;
    }
    if (newPass !== confirmPass) {
      setError('New password and confirmation do not match.');
      setSuccess('');
      return;
    }
    setError('');
    setSuccess('Password changed successfully (demo only — not persisted).');
    setOldPass('');
    setNewPass('');
    setConfirmPass('');
  };

  return (
    <SectionShell role="Student" active="Change Password" links={STUDENT_NAV_LINKS}>
      <Paper elevation={1} sx={{ maxWidth: 500, mx: 'auto', p: { xs: 2.5, sm: 4 } }}>
        <Typography variant="h5" component="h1">
          Change Password
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

        <Stack component="form" spacing={2} onSubmit={handleSubmit} noValidate>
          <TextField
            label="Old password"
            type="password"
            size="small"
            fullWidth
            required
            value={oldPass}
            onChange={(e) => setOldPass(e.target.value)}
          />
          <TextField
            label="New password"
            type={showNew ? 'text' : 'password'}
            size="small"
            fullWidth
            required
            value={newPass}
            onChange={(e) => setNewPass(e.target.value)}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      size="small"
                      onClick={() => setShowNew((show) => !show)}
                      aria-label={showNew ? 'Hide new password' : 'Show new password'}
                    >
                      {showNew ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                    </IconButton>
                    <Button size="small" startIcon={<CasinoIcon />} onClick={handleRandom}>
                      Random
                    </Button>
                  </InputAdornment>
                ),
              },
            }}
          />
          <TextField
            label="Confirm new password"
            type={showNew ? 'text' : 'password'}
            size="small"
            fullWidth
            required
            value={confirmPass}
            onChange={(e) => setConfirmPass(e.target.value)}
          />
          <Button type="submit" variant="contained" size="large">
            Change
          </Button>
        </Stack>
      </Paper>

      <Alert severity="info" sx={{ maxWidth: 500, mx: 'auto', mt: 2 }}>
        Demo session for @{student.username} — the Random button fills both fields, like the
        original form.
      </Alert>
    </SectionShell>
  );
}
