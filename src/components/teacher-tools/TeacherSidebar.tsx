'use client';

/**
 * Dark canvas sidebar replicated from the original teacher tool pages
 * (.canvas-sidebar: #1a2236 background, white logo tile, icon+label nav).
 *
 * Original hrefs → new routes:
 *   ../teacher-dashboard-<subject>.html → /teachers/<subject>/
 *   sticky-notes.html / todo-list.html / timer.html / lesson-planner.html /
 *   quick-links.html                    → /teachers/<subject>/<tool>/
 *   <subject>-live-session.html         → /teachers/<subject>/  (Host Live Session)
 *   #toggle-theme                       → functional dark/light toggle
 *   /students/js/live-session.js tie-in → /students/student-dashboard/ link
 *
 * On md+ it is a permanent 220px drawer (like the original); on small
 * screens it becomes a temporary drawer driven by an app bar button.
 */

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useMuiMode } from '@/components/mui/MuiProvider';
import { toolRoute } from '@/data/teachers/subjects';
import { SIDEBAR_ITEMS } from '@/data/teachers/demo-content';
import { getSubject } from '@/data/teachers/subjects';
import DynamicIcon from './DynamicIcon';

const DRAWER_WIDTH = 220;

interface TeacherSidebarProps {
  subject: string;
}

export default function TeacherSidebar({ subject }: TeacherSidebarProps) {
  const pathname = usePathname();
  const theme = useTheme();
  const { mode, toggleMode } = useMuiMode();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const info = getSubject(subject);

  const handleNav = () => setMobileOpen(false);

  const navList = (
    <Box
      sx={{
        height: '100%',
        width: DRAWER_WIDTH,
        bgcolor: '#1a2236',
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        py: 2,
        borderRight: '1px solid #232b3e',
      }}
      role="navigation"
      aria-label="Teacher tools"
    >
      <Box
        sx={{
          mx: 'auto',
          mb: 3,
          width: 56,
          height: 56,
          borderRadius: '16px',
          bgcolor: '#fff',
          color: '#1a2236',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 28,
          boxShadow: '0 2px 8px rgba(45,59,69,0.10)',
        }}
        title="Teacher Workspace"
        aria-hidden
      >
        🖼️
      </Box>
      <List sx={{ px: 1.2, gap: 0.4, display: 'flex', flexDirection: 'column' }}>
        {SIDEBAR_ITEMS.map((item) => {
          if (item.tool === 'theme') {
            return (
              <ListItemButton
                key="theme"
                onClick={toggleMode}
                sx={{
                  borderRadius: '10px',
                  minHeight: 48,
                  color: '#fff',
                  '&:hover': { bgcolor: '#fff', color: '#2d3b45' },
                }}
                aria-label="Toggle dark or light mode"
              >
                <ListItemIcon sx={{ minWidth: 36, color: 'inherit' }}>
                  <DynamicIcon
                    name={mode === 'light' ? 'DarkMode' : 'LightMode'}
                    fontSize="small"
                  />
                </ListItemIcon>
                <ListItemText
                  primary={mode === 'light' ? 'Dark Mode' : 'Light Mode'}
                  primaryTypographyProps={{ fontSize: 14, fontWeight: 600 }}
                />
              </ListItemButton>
            );
          }

          const href =
            item.tool === 'student-area'
              ? '/students/student-dashboard/'
              : toolRoute(subject, item.tool === 'dashboard' ? 'dashboard' : item.tool);
          const active = pathname === href || (item.tool === 'dashboard' && pathname === `/teachers/${subject}/`);
          const IconName =
            item.tool === 'dashboard' && pathname === `/teachers/${subject}/`
              ? 'Home'
              : item.icon;

          return (
            <ListItemButton
              key={item.tool}
              component={Link}
              href={href}
              onClick={handleNav}
              selected={active}
              sx={{
                borderRadius: '10px',
                minHeight: 48,
                color: '#fff',
                '&.Mui-selected, &.Mui-selected:hover, &:hover': {
                  bgcolor: '#fff',
                  color: '#2d3b45',
                  boxShadow: '0 2px 8px rgba(45,59,69,0.10)',
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 36, color: 'inherit' }}>
                <DynamicIcon name={IconName} fontSize="small" />
              </ListItemIcon>
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{ fontSize: 14, fontWeight: 600 }}
              />
            </ListItemButton>
          );
        })}
      </List>
      <Box sx={{ mt: 'auto', textAlign: 'center', px: 2 }}>
        <Divider sx={{ borderColor: 'rgba(255,255,255,0.12)', mb: 1.5 }} />
        <Typography variant="caption" sx={{ color: '#8fa1c7' }}>
          {info.label} Dashboard · Demo
        </Typography>
      </Box>
    </Box>
  );

  return (
    <>
      {!isDesktop && (
        <AppBar
          position="sticky"
          elevation={0}
          sx={{ bgcolor: '#1a2236', color: '#fff', display: { md: 'none' } }}
        >
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="Open teacher menu"
              onClick={() => setMobileOpen(true)}
              sx={{ mr: 1 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ fontWeight: 700 }}>
              {info.label} · Teacher Tools
            </Typography>
          </Toolbar>
        </AppBar>
      )}
      {/* permanent drawer on desktop */}
      <Box component="nav" sx={{ display: { xs: 'none', md: 'block' } }} aria-label="Teacher tools">
        <Drawer
          variant="permanent"
          open
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': {
              position: 'fixed',
              bgcolor: 'transparent',
              border: 'none',
            },
          }}
        >
          {navList}
        </Drawer>
      </Box>
      {/* temporary drawer on mobile */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { bgcolor: 'transparent', border: 'none' },
        }}
      >
        {navList}
      </Drawer>
    </>
  );
}
