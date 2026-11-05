'use client';

/**
 * Login page — the original /general/ folder was removed from the old repo,
 * so this is a clean auth page built in the visual language of the site
 * (MUI card centered on the blue-50 → indigo-100 gradient).
 * Frontend only: submitting navigates to the student dashboard.
 */

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  createTheme,
  ThemeProvider,
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Divider,
  Tooltip,
  CircularProgress,
} from '@mui/material';

import MailOutlineIcon from '@mui/icons-material/MailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LoginIcon from '@mui/icons-material/Login';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SchoolIcon from '@mui/icons-material/School';

const theme = createTheme({
  palette: {
    primary: { main: '#3B82F6' },
    secondary: { main: '#6366F1' },
  },
  typography: {
    fontFamily: "'Plus Jakarta Sans','Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif",
  },
});

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const next: { email?: string; password?: string } = {};
    if (!email.trim()) next.email = 'Email is required';
    else if (!EMAIL_RE.test(email.trim())) next.email = 'Enter a valid email address';
    if (!password) next.password = 'Password is required';
    else if (password.length < 6) next.password = 'Password must be at least 6 characters';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate() || submitting) return;
    setSubmitting(true);
    // Frontend-only demo: brief delay then enter the dashboard
    window.setTimeout(() => {
      router.push('/students/student-dashboard/');
    }, 600);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 2,
          background: 'linear-gradient(180deg,#eff6ff 0%,#e0e7ff 100%)',
          fontFamily: "'Plus Jakarta Sans','Inter',system-ui,sans-serif",
        }}
      >
        <Box sx={{ width: '100%', maxWidth: 440 }}>
          <Link
            href="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              color: '#4b5563',
              textDecoration: 'none',
              fontWeight: 500,
              marginBottom: 12,
            }}
          >
            <ArrowBackIcon sx={{ fontSize: 18 }} />
            Back to home
          </Link>

          <Card
            elevation={0}
            sx={{
              borderRadius: '24px',
              boxShadow: '0 20px 50px rgba(66,88,160,0.12)',
              border: '1px solid rgba(59,130,246,0.12)',
              overflow: 'hidden',
            }}
          >
            <Box
              sx={{
                background: 'linear-gradient(135deg,#3B82F6 0%,#2563EB 60%,#4F46E5 100%)',
                color: '#fff',
                textAlign: 'center',
                py: 4,
                px: 3,
              }}
            >
              <Box
                component="img"
                src="/site/students/logo.svg"
                alt="FUHADEMY logo"
                sx={{
                  width: 56,
                  height: 56,
                  borderRadius: '50%',
                  bgcolor: '#0f172a',
                  p: 0.75,
                  mb: 1.5,
                }}
              />
              <Typography variant="h1" sx={{ fontSize: '1.5rem', fontWeight: 700 }}>
                Welcome Back
              </Typography>
              <Typography sx={{ opacity: 0.85, mt: 0.5, fontSize: '0.95rem' }}>
                Log in to continue your learning journey.
              </Typography>
            </Box>

            <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
              <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}
              >
                <TextField
                  id="email"
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={Boolean(errors.email)}
                  helperText={errors.email}
                  fullWidth
                  autoComplete="email"
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <MailOutlineIcon fontSize="small" sx={{ color: '#6b7280' }} />
                        </InputAdornment>
                      ),
                    },
                  }}
                />

                <TextField
                  id="password"
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  error={Boolean(errors.password)}
                  helperText={errors.password}
                  fullWidth
                  autoComplete="current-password"
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockOutlinedIcon fontSize="small" sx={{ color: '#6b7280' }} />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                            onClick={() => setShowPassword((s) => !s)}
                            edge="end"
                            size="small"
                          >
                            {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    },
                  }}
                />

                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  disabled={submitting}
                  startIcon={
                    submitting ? <CircularProgress size={18} color="inherit" /> : <LoginIcon />
                  }
                  sx={{
                    py: 1.4,
                    borderRadius: '999px',
                    fontWeight: 600,
                    textTransform: 'none',
                    fontSize: '1rem',
                    background: 'linear-gradient(135deg,#3B82F6 0%,#2563EB 100%)',
                    boxShadow: '0 4px 20px rgba(37,99,235,.25)',
                    '&:hover': {
                      background: 'linear-gradient(135deg,#2563EB 0%,#1D4ED8 100%)',
                    },
                  }}
                >
                  {submitting ? 'Logging in…' : 'Log In'}
                </Button>

                <Divider sx={{ my: 1 }}>
                  <Typography sx={{ color: '#9ca3af', fontSize: '0.8rem', px: 1 }}>
                    or continue with
                  </Typography>
                </Divider>

                {/* Visual-only social buttons (demo mode) */}
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Tooltip title="Demo mode" arrow>
                    <span style={{ flex: 1 }}>
                      <Button
                        fullWidth
                        variant="outlined"
                        disabled
                        startIcon={
                          <Box
                            sx={{
                              width: 20,
                              height: 20,
                              borderRadius: '50%',
                              bgcolor: '#EA4335',
                              color: '#fff',
                              fontSize: 12,
                              fontWeight: 700,
                              display: 'inline-flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            G
                          </Box>
                        }
                        sx={{
                          py: 1,
                          borderRadius: '12px',
                          textTransform: 'none',
                          color: '#374151',
                          borderColor: '#e5e7eb',
                        }}
                      >
                        Google
                      </Button>
                    </span>
                  </Tooltip>
                  <Tooltip title="Demo mode" arrow>
                    <span style={{ flex: 1 }}>
                      <Button
                        fullWidth
                        variant="outlined"
                        disabled
                        startIcon={
                          <Box
                            sx={{
                              width: 20,
                              height: 20,
                              borderRadius: '50%',
                              bgcolor: '#1877F2',
                              color: '#fff',
                              fontSize: 13,
                              fontWeight: 700,
                              display: 'inline-flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            f
                          </Box>
                        }
                        sx={{
                          py: 1,
                          borderRadius: '12px',
                          textTransform: 'none',
                          color: '#374151',
                          borderColor: '#e5e7eb',
                        }}
                      >
                        Facebook
                      </Button>
                    </span>
                  </Tooltip>
                </Box>

                <Typography sx={{ textAlign: 'center', color: '#4b5563', mt: 1 }}>
                  Don&rsquo;t have an account?{' '}
                  <Link
                    href="/general/signup/"
                    style={{ color: '#3B82F6', fontWeight: 600, textDecoration: 'none' }}
                  >
                    Sign Up
                  </Link>
                </Typography>
              </Box>
            </CardContent>
          </Card>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 1,
              mt: 3,
              color: '#6b7280',
              fontSize: '0.8rem',
            }}
          >
            <SchoolIcon sx={{ fontSize: 16 }} />
            100% free for students — no hidden costs.
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
