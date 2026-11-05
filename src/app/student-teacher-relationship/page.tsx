'use client';

import * as React from 'react';
import Link from 'next/link';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import MuiLink from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import SchoolIcon from '@mui/icons-material/School';
import PersonIcon from '@mui/icons-material/Person';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { REGISTRAR_HOME, ROLE_CHOOSER_ROUTE, STUDENT_HOME, TEACHER_HOME } from '@/components/relationship/routes';
import { SETTING } from '@/data/relationship/demo-data';

/**
 * Public landing page — port of the original index.php (welcome hero, about,
 * contact) merged with the role chooser from login.php's "Login As" select
 * (Admin / Teacher / Student / Registrar Office). The admin account is out of
 * scope of this migration, so the three managed roles are offered as cards.
 */

const roles = [
  {
    key: 'registrar',
    title: 'Registrar Office',
    description:
      'Register new students, search the student registry and inspect any student profile with grades.',
    href: REGISTRAR_HOME,
    icon: <AdminPanelSettingsIcon sx={{ fontSize: 44 }} />,
    color: '#0d6efd',
    cta: 'Enter Registrar Office',
  },
  {
    key: 'teacher',
    title: 'Teacher',
    description:
      'See your classes and students, then record assessment scores in the per-student grade editor.',
    href: TEACHER_HOME,
    icon: <SchoolIcon sx={{ fontSize: 44 }} />,
    color: '#198754',
    cta: 'Enter Teacher area',
  },
  {
    key: 'student',
    title: 'Student',
    description:
      'Follow your grade summary year by year and change your account password.',
    href: STUDENT_HOME,
    icon: <PersonIcon sx={{ fontSize: 44 }} />,
    color: '#ffc107',
    cta: 'Enter Student area',
  },
];

export default function RelationshipLandingPage() {
  const [contact, setContact] = React.useState({ email: '', fullName: '', message: '' });
  const [contactSent, setContactSent] = React.useState(false);
  const [contactError, setContactError] = React.useState('');

  const handleContactSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!contact.email.trim() || !contact.fullName.trim() || !contact.message.trim()) {
      setContactError('Please fill in your email, full name and message.');
      setContactSent(false);
      return;
    }
    setContactError('');
    setContactSent(true);
    setContact({ email: '', fullName: '', message: '' });
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#15181d', color: '#f5f6fa', display: 'flex', flexDirection: 'column' }}>
      {/* Top navbar — mirrors index.php's homeNav */}
      <AppBar position="static" elevation={0} sx={{ bgcolor: 'rgba(255,255,255,0.08)' }}>
        <Toolbar sx={{ gap: 2 }}>
          <Box
            aria-hidden
            sx={{
              width: 40,
              height: 40,
              borderRadius: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: '#ffc107',
              color: 'rgba(0,0,0,0.87)',
            }}
          >
            <SchoolIcon />
          </Box>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 700 }}>
            Y School
          </Typography>
          <Stack direction="row" spacing={{ xs: 0.5, sm: 2 }} component="nav" aria-label="Site navigation">
            <MuiLink href="#about" underline="none" sx={{ color: '#f5f6fa', display: { xs: 'none', sm: 'inline' } }}>
              About
            </MuiLink>
            <MuiLink href="#contact" underline="none" sx={{ color: '#f5f6fa', display: { xs: 'none', sm: 'inline' } }}>
              Contact
            </MuiLink>
            <MuiLink href="#roles" underline="none" sx={{ color: '#ffc107', fontWeight: 700 }}>
              Login
            </MuiLink>
          </Stack>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ flexGrow: 1, py: { xs: 5, md: 8 } }}>
        {/* Welcome hero */}
        <Stack
          component="section"
          spacing={2}
          sx={{ textAlign: 'center', py: { xs: 4, md: 6 }, alignItems: 'center' }}
        >
          <Box
            aria-hidden
            sx={{
              width: 100,
              height: 100,
              borderRadius: 6,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: '#ffc107',
              color: 'rgba(0,0,0,0.87)',
              boxShadow: '0 20px 50px rgba(0,0,0,0.45)',
            }}
          >
            <SchoolIcon sx={{ fontSize: 60 }} />
          </Box>
          <Typography
            variant="h3"
            component="h1"
            sx={{ fontFamily: "'Lobster', 'Georgia', cursive", fontSize: { xs: 36, sm: 51 } }}
          >
            Welcome to {SETTING.school_name}
          </Typography>
          <Typography
            component="p"
            sx={{
              color: '#222',
              bgcolor: 'rgba(255,255,255,0.55)',
              px: 1.5,
              py: 0.5,
              borderRadius: 1,
              fontWeight: 500,
            }}
          >
            {SETTING.slogan}
          </Typography>
          <Button
            component={Link}
            href="#roles"
            variant="contained"
            size="large"
            endIcon={<ArrowForwardIcon />}
            sx={{ mt: 1, px: 3, borderRadius: 6 }}
          >
            Choose your role
          </Button>
        </Stack>

        {/* About — mirrors the #about card */}
        <Box component="section" id="about" sx={{ py: { xs: 4, md: 6 }, scrollMarginTop: 90 }}>
          <Card sx={{ maxWidth: 640, mx: 'auto', bgcolor: 'rgba(255,255,255,0.5)', backdropFilter: 'blur(6px)' }}>
            <CardContent sx={{ display: 'flex', gap: 3, alignItems: 'flex-start', p: { xs: 2.5, md: 3 } }}>
              <Box
                aria-hidden
                sx={{
                  width: 72,
                  height: 72,
                  borderRadius: 4,
                  flexShrink: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  bgcolor: '#ffc107',
                  color: 'rgba(0,0,0,0.87)',
                }}
              >
                <SchoolIcon sx={{ fontSize: 40 }} />
              </Box>
              <Box>
                <Typography variant="h5" component="h2" sx={{ color: '#111', fontFamily: "'Lobster', 'Georgia', cursive" }}>
                  About Us
                </Typography>
                <Typography variant="body2" sx={{ color: '#222', mt: 1 }}>
                  {SETTING.about}
                </Typography>
                <Typography variant="caption" sx={{ color: 'rgba(0,0,0,0.55)', display: 'block', mt: 1.5 }}>
                  {SETTING.school_name} · migrated from PHP + Bootstrap to Material UI
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Box>

        {/* Role chooser — mirrors login.php's "Login As" select */}
        <Box component="section" id="roles" sx={{ py: { xs: 4, md: 6 }, scrollMarginTop: 90 }}>
          <Typography variant="h4" component="h2" sx={{ textAlign: 'center', mb: 1 }}>
            Login as
          </Typography>
          <Typography variant="body1" sx={{ textAlign: 'center', color: 'rgba(245,246,250,0.7)', mb: 4 }}>
            The demo keeps three sessions side by side — pick where you want to go.
          </Typography>
          <Grid container spacing={3} sx={{ justifyContent: 'center' }}>
            {roles.map((role) => (
              <Grid key={role.key} size={{ xs: 12, sm: 6, md: 4 }} sx={{ display: 'flex' }}>
                <Card
                  elevation={0}
                  sx={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    bgcolor: 'rgba(255,255,255,0.96)',
                    color: 'text.primary',
                    border: '1px solid rgba(255,255,255,0.25)',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                    '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 16px 34px rgba(0,0,0,0.4)' },
                  }}
                >
                  <CardActionArea component={Link} href={role.href} sx={{ height: '100%' }}>
                    <CardContent sx={{ p: 3, display: 'flex', flexDirection: 'column', height: '100%' }}>
                      <Box
                        aria-hidden
                        sx={{
                          width: 72,
                          height: 72,
                          borderRadius: 4,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          bgcolor: role.color,
                          color: role.key === 'student' ? 'rgba(0,0,0,0.87)' : '#fff',
                          mb: 2,
                        }}
                      >
                        {role.icon}
                      </Box>
                      <Typography variant="h6" component="h3" sx={{ fontWeight: 700 }}>
                        {role.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 1, mb: 2, flexGrow: 1 }}>
                        {role.description}
                      </Typography>
                      <Stack
                        direction="row"
                        spacing={0.5}
                        sx={{ color: role.color, alignItems: 'center' }}
                      >
                        <Typography variant="caption" sx={{ fontWeight: 700 }}>
                          {role.cta}
                        </Typography>
                        <ArrowForwardIcon sx={{ fontSize: 16 }} />
                      </Stack>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Contact — mirrors the #contact form of index.php */}
        <Box component="section" id="contact" sx={{ py: { xs: 4, md: 6 }, scrollMarginTop: 90 }}>
          <Card sx={{ maxWidth: 600, mx: 'auto', bgcolor: 'rgba(255,255,255,0.5)', backdropFilter: 'blur(6px)' }}>
            <CardContent sx={{ p: { xs: 2.5, md: 3 } }}>
              <Typography variant="h5" component="h2" sx={{ textAlign: 'center', color: '#111', fontFamily: "'Lobster', 'Georgia', cursive" }}>
                Contact Us
              </Typography>
              {contactError ? (
                <Alert severity="error" sx={{ mt: 2 }}>
                  {contactError}
                </Alert>
              ) : null}
              {contactSent ? (
                <Alert severity="success" sx={{ mt: 2 }}>
                  Message sent (demo only — nothing is stored).
                </Alert>
              ) : null}
              <Box component="form" onSubmit={handleContactSubmit} sx={{ mt: 2, display: 'grid', gap: 2 }}>
                <TextField
                  label="Email address"
                  type="email"
                  size="small"
                  fullWidth
                  value={contact.email}
                  onChange={(e) => setContact({ ...contact, email: e.target.value })}
                  helperText="We'll never share your email with anyone else."
                />
                <TextField
                  label="Full name"
                  size="small"
                  fullWidth
                  value={contact.fullName}
                  onChange={(e) => setContact({ ...contact, fullName: e.target.value })}
                />
                <TextField
                  label="Message"
                  multiline
                  rows={4}
                  fullWidth
                  value={contact.message}
                  onChange={(e) => setContact({ ...contact, message: e.target.value })}
                />
                <Button type="submit" variant="contained" sx={{ justifySelf: 'start' }}>
                  Send
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Container>

      <Divider sx={{ borderColor: 'rgba(255,255,255,0.15)' }} />
      <Box component="footer" sx={{ textAlign: 'center', py: 2.5, color: 'rgba(245,246,250,0.6)' }}>
        <Typography variant="caption" component="p">
          Copyright © {SETTING.current_year} {SETTING.school_name}. All rights reserved. ·{' '}
          <MuiLink component={Link} href={ROLE_CHOOSER_ROUTE} underline="hover" sx={{ color: '#ffc107' }}>
            Role chooser
          </MuiLink>
        </Typography>
      </Box>
    </Box>
  );
}
