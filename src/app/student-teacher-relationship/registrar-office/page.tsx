'use client';

import * as React from 'react';
import Link from 'next/link';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import SearchIcon from '@mui/icons-material/Search';
import SectionShell from '@/components/relationship/SectionShell';
import { REGISTRAR_NAV_LINKS } from '@/components/relationship/nav-links';
import {
  REGISTRAR_ADD,
  REGISTRAR_SEARCH,
  REGISTRAR_VIEW,
  ROLE_CHOOSER_ROUTE,
} from '@/components/relationship/routes';
import {
  CLASSES,
  GRADES,
  REGISTRAR,
  SETTING,
  STUDENTS,
} from '@/data/relationship/demo-data';

/**
 * Registrar Office home — port of RegistrarOffice/index.php's big dark
 * buttons ("Register Student", "All Students", "Logout") expanded into
 * action cards plus quick registry stats.
 */

const actions = [
  {
    key: 'add',
    label: 'Register Student',
    description: 'Open the registration form (first name, section, parent details…).',
    href: REGISTRAR_ADD,
    icon: <PersonAddIcon sx={{ fontSize: 44 }} />,
    color: 'primary.main' as const,
  },
  {
    key: 'search',
    label: 'Search Students',
    description: 'Search the registry by name, username or ID and open any record.',
    href: REGISTRAR_SEARCH,
    icon: <SearchIcon sx={{ fontSize: 44 }} />,
    color: 'secondary.main' as const,
  },
  {
    key: 'view',
    label: 'View Student',
    description: 'Pick a student and inspect their profile and grade history.',
    href: REGISTRAR_VIEW,
    icon: <PersonSearchIcon sx={{ fontSize: 44 }} />,
    color: 'success.main' as const,
  },
];

const stats = [
  { label: 'Registered students', value: STUDENTS.length },
  { label: 'School classes', value: CLASSES.length },
  { label: 'Grade levels', value: GRADES.length },
  { label: 'Current year', value: String(SETTING.current_year) },
];

export default function RegistrarHomePage() {
  return (
    <SectionShell
      role="Registrar Office"
      active="Dashboard"
      maxWidth={1000}
      links={REGISTRAR_NAV_LINKS}
    >
      <Stack spacing={1} sx={{ mb: 4 }}>
        <Chip
          label={`${REGISTRAR.fname} ${REGISTRAR.lname} · ${REGISTRAR.role}`}
          color="warning"
          sx={{ alignSelf: 'flex-start', fontWeight: 700 }}
        />
        <Typography variant="h4" component="h1">
          Registrar Office
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage the student registry of {SETTING.school_name} — school year {SETTING.current_year}, semester{' '}
          {SETTING.current_semester}.
        </Typography>
      </Stack>

      {/* Quick registry stats */}
      <Grid container spacing={2} component="section" aria-label="Registry statistics" sx={{ mb: 4 }}>
        {stats.map((stat) => (
          <Grid key={stat.label} size={{ xs: 6, sm: 3 }}>
            <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider', height: '100%' }}>
              <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                <Typography variant="h5" component="p" sx={{ fontWeight: 800 }}>
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

      {/* Action cards — the big dark buttons of the original */}
      <Grid container spacing={3} component="section" aria-label="Registrar actions">
        {actions.map((action) => (
          <Grid key={action.key} size={{ xs: 12, sm: 6, md: 4 }} sx={{ display: 'flex' }}>
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
              <CardActionArea component={Link} href={action.href} sx={{ height: '100%' }}>
                <CardContent sx={{ p: 3, display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <Box
                    aria-hidden
                    sx={{
                      width: 64,
                      height: 64,
                      borderRadius: 3,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      bgcolor: '#212529',
                      color: '#fff',
                      mb: 2,
                    }}
                  >
                    {action.icon}
                  </Box>
                  <Typography variant="h6" component="h2" sx={{ fontWeight: 700 }}>
                    {action.label}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, mb: 2, flexGrow: 1 }}>
                    {action.description}
                  </Typography>
                  <Typography variant="caption" sx={{ color: action.color, fontWeight: 700 }}>
                    Open →
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Logout — mirrors the btn-warning block of the original dashboard */}
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mt: 5 }}>
        <Button
          component={Link}
          href={ROLE_CHOOSER_ROUTE}
          variant="contained"
          color="warning"
          size="large"
          startIcon={<LogoutIcon />}
        >
          Logout (back to role chooser)
        </Button>
      </Stack>
    </SectionShell>
  );
}
