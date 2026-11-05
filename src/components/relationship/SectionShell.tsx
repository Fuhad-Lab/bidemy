'use client';

import * as React from 'react';
import Link from 'next/link';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import SchoolIcon from '@mui/icons-material/School';
import { useMuiMode } from '@/components/mui/MuiProvider';
import { ROLE_CHOOSER_ROUTE } from '@/components/relationship/routes';

/**
 * Shared admin-panel chrome for every logged-in page of the migrated PHP app
 * (Student/inc/navbar.php, Teacher/inc/navbar.php, RegistrarOffice/*).
 *
 * The originals used `navbar navbar-dark bg-dark`; this recreates that as a
 * dark MUI AppBar plus a permanent sidebar (Drawer) on md+ screens holding the
 * same links as navbar.php, a "Back to role chooser" entry and a Logout entry
 * that returns to the public landing page (like logout.php did).
 */

export const DRAWER_WIDTH = 240;

export interface ShellNavLink {
  label: string;
  href: string;
  icon: React.ReactNode;
}

interface SectionShellProps {
  /** Role shown in the AppBar, e.g. "Registrar Office" */
  role: string;
  /** Sidebar links mirroring the section's navbar.php */
  links: ShellNavLink[];
  /** label of the currently active link */
  active: string;
  maxWidth?: number;
  children: React.ReactNode;
}

const drawerContent = (
  role: string,
  links: ShellNavLink[],
  active: string,
  onNavigate: () => void,
) => (
  <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
    <Toolbar sx={{ px: 2 }}>
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
          mr: 1.5,
        }}
      >
        <SchoolIcon />
      </Box>
      <Box>
        <Typography variant="subtitle1" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
          Y School
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {role}
        </Typography>
      </Box>
    </Toolbar>
    <Divider />
    <List sx={{ flexGrow: 1, pt: 1 }} component="nav" aria-label={`${role} navigation`}>
      {links.map((link) => {
        const isActive = link.label === active;
        return (
          <ListItemButton
            key={link.label}
            component={Link}
            href={link.href}
            selected={isActive}
            onClick={onNavigate}
            sx={{
              mx: 1,
              borderRadius: 2,
              mb: 0.5,
              '&.Mui-selected': {
                bgcolor: 'rgba(13, 110, 253, 0.12)',
                color: 'primary.main',
                '&:hover': { bgcolor: 'rgba(13, 110, 253, 0.18)' },
                '& .MuiListItemIcon-root': { color: 'primary.main' },
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 36 }}>{link.icon}</ListItemIcon>
            <Typography
              variant="body2"
              sx={{ fontWeight: isActive ? 700 : 500, color: isActive ? 'primary.main' : 'text.primary' }}
            >
              {link.label}
            </Typography>
          </ListItemButton>
        );
      })}
    </List>
    <Divider />
    <List component="nav" aria-label="Session actions" sx={{ py: 1 }}>
      <ListItemButton component={Link} href={ROLE_CHOOSER_ROUTE} onClick={onNavigate} sx={{ mx: 1, borderRadius: 2 }}>
        <ListItemIcon sx={{ minWidth: 36 }}>
          <ArrowBackIcon fontSize="small" />
        </ListItemIcon>
        <Typography variant="body2">Back to role chooser</Typography>
      </ListItemButton>
      <ListItemButton component={Link} href={ROLE_CHOOSER_ROUTE} onClick={onNavigate} sx={{ mx: 1, borderRadius: 2 }}>
        <ListItemIcon sx={{ minWidth: 36 }}>
          <LogoutIcon fontSize="small" />
        </ListItemIcon>
        <Typography variant="body2">Logout</Typography>
      </ListItemButton>
    </List>
  </Box>
);

export default function SectionShell({ role, links, active, maxWidth = 900, children }: SectionShellProps) {
  const { mode, toggleMode } = useMuiMode();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const closeDrawer = React.useCallback(() => setMobileOpen(false), []);
  const toggleDrawer = React.useCallback(() => setMobileOpen((open) => !open), []);

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          bgcolor: '#212529',
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar sx={{ gap: 1 }}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="Open navigation menu"
            onClick={toggleDrawer}
            sx={{ mr: 1, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Box
            aria-hidden
            sx={{
              width: 36,
              height: 36,
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
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 700, fontSize: { xs: 16, sm: 20 } }}>
            Y School · {role}
          </Typography>
          <Tooltip title={mode === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}>
            <IconButton color="inherit" onClick={toggleMode} aria-label="Toggle color mode">
              {mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
            </IconButton>
          </Tooltip>
          <IconButton
            color="inherit"
            component={Link}
            href={ROLE_CHOOSER_ROUTE}
            aria-label="Back to role chooser"
            edge="end"
          >
            <ArrowBackIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Permanent sidebar — md and up */}
      <Drawer
        variant="permanent"
        open
        sx={{
          display: { xs: 'none', md: 'block' },
          width: DRAWER_WIDTH,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: DRAWER_WIDTH,
            boxSizing: 'border-box',
            bgcolor: 'background.paper',
            borderRight: '1px solid',
            borderColor: 'divider',
          },
        }}
      >
        {drawerContent(role, links, active, closeDrawer)}
      </Drawer>

      {/* Temporary sidebar — small screens */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={closeDrawer}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { width: DRAWER_WIDTH, boxSizing: 'border-box' },
        }}
      >
        {drawerContent(role, links, active, closeDrawer)}
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          px: { xs: 2, sm: 3 },
          py: { xs: 3, md: 4 },
          width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
          maxWidth,
          mx: { md: 'auto' },
          minWidth: 0,
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
