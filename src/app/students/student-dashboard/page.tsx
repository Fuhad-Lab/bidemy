'use client';

/**
 * Student Dashboard — pixel-faithful recreation of
 * /students/student-dashboard.html from the original repo,
 * including the SUBJECTS_DATA list (icons, colors, topic counts)
 * defined inline in that page (dashboard.js in the mission brief).
 * All data is static/demo and everything is client-side.
 */

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  createTheme,
  ThemeProvider,
  Box,
  Drawer,
  IconButton,
  InputBase,
  Tooltip,
  Typography,
} from '@mui/material';

// Icons
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import StickyNote2Icon from '@mui/icons-material/StickyNote2';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import FunctionsIcon from '@mui/icons-material/Functions';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import VideocamIcon from '@mui/icons-material/Videocam';
import PsychologyIcon from '@mui/icons-material/Psychology';
import CoPresentIcon from '@mui/icons-material/CoPresent';
import LogoutIcon from '@mui/icons-material/Logout';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import CheckIcon from '@mui/icons-material/Check';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import ReplayIcon from '@mui/icons-material/Replay';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import CalculateIcon from '@mui/icons-material/Calculate';
import WavesIcon from '@mui/icons-material/Waves';
import ScienceIcon from '@mui/icons-material/Science';
import BiotechIcon from '@mui/icons-material/Biotech';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import StorefrontIcon from '@mui/icons-material/Storefront';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const theme = createTheme({
  palette: {
    primary: { main: '#3B82F6' },
    secondary: { main: '#6366F1' },
  },
  typography: {
    fontFamily: "'Plus Jakarta Sans','Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif",
  },
});

const FONT = "'Plus Jakarta Sans','Inter',system-ui,sans-serif";

// ============================================
// SUBJECT DATA — exact topics/gradients/links from
// the original dashboard (physics link normalized to
// /students/subjects/physics/ per the migration spec)
// ============================================
type Subject = {
  id: string;
  name: string;
  icon: React.ElementType;
  color: string;
  soft: string;
  gradient: string;
  topics: string[];
  link: string;
};

const SUBJECTS_DATA: Subject[] = [
  {
    id: 'mathematics',
    name: 'Mathematics',
    icon: CalculateIcon,
    color: '#ef4444',
    soft: '#fef2f2',
    gradient: 'linear-gradient(135deg,#f87171,#dc2626)',
    topics: [
      'Number Bases', 'Indices', 'Logarithms', 'Sets', 'Modular Arithmetic',
      'Algebraic Expressions', 'Simple Equations', 'Quadratic Equations',
      'Simultaneous Equations', 'Polynomials', 'Functions', 'Mensuration',
      'Geometry', 'Trigonometry', 'Vectors', 'Statistics', 'Probability',
      'Differentiation', 'Integration', 'Matrices',
    ],
    link: '/students/subjects/mathematics/',
  },
  {
    id: 'physics',
    name: 'Physics',
    icon: WavesIcon,
    color: '#f59e0b',
    soft: '#fffbeb',
    gradient: 'linear-gradient(135deg,#fbbf24,#d97706)',
    topics: [
      "Measurements", 'Motion', "Newton's Laws", 'Work, Energy, Power',
      'Momentum', 'Projectile Motion', 'Simple Harmonic Motion', 'Waves',
      'Sound', 'Light', 'Optics', 'Heat', 'Electricity', 'Magnetism',
      'Electromagnetic Induction', 'Modern Physics', 'Nuclear Physics',
    ],
    link: '/students/subjects/physics/',
  },
  {
    id: 'chemistry',
    name: 'Chemistry',
    icon: ScienceIcon,
    color: '#ec4899',
    soft: '#fdf2f8',
    gradient: 'linear-gradient(135deg,#f472b6,#db2777)',
    topics: [
      'Atomic Structure', 'Periodic Table', 'Chemical Bonding',
      'Chemical Reactions', 'Stoichiometry', 'States of Matter',
      'Gas Laws', 'Solutions', 'Acids and Bases', 'Electrochemistry',
      'Organic Chemistry', 'Environmental Chemistry', 'Nuclear Chemistry',
    ],
    link: '/students/subjects/chemistry/',
  },
  {
    id: 'biology',
    name: 'Biology',
    icon: BiotechIcon,
    color: '#22c55e',
    soft: '#f0fdf4',
    gradient: 'linear-gradient(135deg,#4ade80,#16a34a)',
    topics: [
      'Cell Structure', 'Cell Division', 'Nutrition', 'Photosynthesis',
      'Respiration', 'Transport', 'Excretion', 'Reproduction', 'Genetics',
      'Evolution', 'Ecology', 'Nervous System', 'Endocrine System',
    ],
    link: '/students/subjects/biology/',
  },
  {
    id: 'english',
    name: 'English Language',
    icon: MenuBookIcon,
    color: '#8b5cf6',
    soft: '#f5f3ff',
    gradient: 'linear-gradient(135deg,#a78bfa,#7c3aed)',
    topics: [
      'Parts of Speech', 'Sentence Structure', 'Tenses', 'Articles',
      'Punctuation', 'Comprehension', 'Summary Writing', 'Essay Writing',
      'Letter Writing', 'Vocabulary', 'Idioms', 'Figures of Speech',
    ],
    link: '/students/subjects/english/',
  },
  {
    id: 'economics',
    name: 'Economics',
    icon: QueryStatsIcon,
    color: '#06b6d4',
    soft: '#ecfeff',
    gradient: 'linear-gradient(135deg,#22d3ee,#0891b2)',
    topics: [
      'Basic Economic Concepts', 'Demand and Supply', 'Market Structures',
      'National Income', 'Money and Banking', 'Public Finance',
      'International Trade', 'Economic Development', 'Population',
    ],
    link: '/students/subjects/economics/',
  },
  {
    id: 'government',
    name: 'Government',
    icon: AccountBalanceIcon,
    color: '#f43f5e',
    soft: '#fff1f2',
    gradient: 'linear-gradient(135deg,#fb7185,#e11d48)',
    topics: [
      'Basic Concepts', 'Constitution', 'Arms of Government',
      'Federalism', 'Political Parties', 'Electoral Systems',
      'Public Administration', 'Local Government', 'Human Rights',
    ],
    link: '/students/subjects/government/',
  },
  {
    id: 'commerce',
    name: 'Commerce',
    icon: StorefrontIcon,
    color: '#14b8a6',
    soft: '#f0fdfa',
    gradient: 'linear-gradient(135deg,#2dd4bf,#0d9488)',
    topics: [
      'Introduction to Commerce', 'Trade', 'Business Units',
      'Business Management', 'Banking', 'Insurance', 'Transportation',
      'Communication', 'Marketing', 'Consumer Protection',
    ],
    link: '/students/subjects/commerce/',
  },
];

// Sidebar navigation (exact items/order/links per the migration spec;
// icon + color meanings carried over from the original Font Awesome sidebar)
const NAV_ITEMS: {
  label: string;
  href: string;
  icon: React.ElementType;
  color: string;
  active?: boolean;
}[] = [
  { label: 'Dashboard', href: '/students/student-dashboard/', icon: HomeIcon, color: '#38bdf8', active: true },
  { label: 'Live Session', href: '/students/student-live-session/', icon: VideocamIcon, color: '#c084fc' },
  { label: 'Mock Exams', href: '/students/mock-exams/', icon: AssignmentIcon, color: '#fbbf24' },
  { label: 'Video Library', href: '/students/video-library/', icon: PlayCircleIcon, color: '#fb7185' },
  { label: 'Digital Library', href: '/students/digital-library/', icon: FolderOpenIcon, color: '#22d3ee' },
  { label: 'Formula Bank', href: '/students/formula-bank/', icon: FunctionsIcon, color: '#2dd4bf' },
  { label: 'Smart Note', href: '/students/smart-note/', icon: StickyNote2Icon, color: '#facc15' },
  { label: 'Textbooks', href: '/students/textbooks/', icon: MenuBookIcon, color: '#818cf8' },
  { label: 'Study Plan', href: '/students/study-plan/', icon: CalendarMonthIcon, color: '#34d399' },
  { label: 'Notifications', href: '/students/notifications-supabase/', icon: NotificationsIcon, color: '#f472b6' },
];

const STUDY_TOOLS = [
  { label: 'Practice Tests', sub: 'JAMB, WAEC, NECO', icon: AssignmentIcon, gradient: 'linear-gradient(135deg,#3b82f6,#4f46e5)', href: '/students/mock-exams/' },
  { label: 'Video Lessons', sub: 'Visual learning', icon: PlayCircleIcon, gradient: 'linear-gradient(135deg,#f43f5e,#db2777)', href: '/students/video-library/' },
  { label: 'Smart Notes', sub: 'Quick revision', icon: StickyNote2Icon, gradient: 'linear-gradient(135deg,#f59e0b,#ea580c)', href: '/students/smart-note/' },
  { label: 'Formula Bank', sub: 'All formulas', icon: FunctionsIcon, gradient: 'linear-gradient(135deg,#10b981,#0d9488)', href: '/students/formula-bank/' },
  { label: 'Textbooks', sub: 'PDF resources', icon: MenuBookIcon, gradient: 'linear-gradient(135deg,#8b5cf6,#9333ea)', href: '/students/textbooks/' },
  { label: 'Study Plan', sub: 'Stay organized', icon: CalendarMonthIcon, gradient: 'linear-gradient(135deg,#0ea5e9,#0891b2)', href: '/students/study-plan/' },
  { label: 'Library', sub: 'All resources', icon: FolderOpenIcon, gradient: 'linear-gradient(135deg,#06b6d4,#2563eb)', href: '/students/digital-library/' },
  { label: 'Live Classes', sub: 'Join sessions', icon: VideocamIcon, gradient: 'linear-gradient(135deg,#ef4444,#e11d48)', href: '/students/student-live-session/' },
];

const ACTIVITIES = [
  { icon: CheckIcon, bg: '#d1fae5', color: '#10b981', title: 'Completed "Quadratic Equations" quiz', sub: 'Scored 85% • Mathematics', time: '2h ago' },
  { icon: PlayArrowIcon, bg: '#e0f2fe', color: '#0ea5e9', title: 'Watched "Newton\'s Laws of Motion"', sub: '15 min video • Physics', time: '4h ago' },
  { icon: StickyNote2Icon, bg: '#fef3c7', color: '#f59e0b', title: 'Created new note "Organic Chemistry"', sub: 'Smart Notes • Chemistry', time: 'Yesterday' },
  { icon: MenuBookIcon, bg: '#ede9fe', color: '#8b5cf6', title: 'Read "Comprehension Skills"', sub: '15 pages • English', time: '2 days ago' },
];

const QUOTES = [
  { text: 'The secret of getting ahead is getting started.', author: 'Mark Twain' },
  { text: 'Success is not final, failure is not fatal.', author: 'Winston Churchill' },
  { text: 'The only way to do great work is to love what you do.', author: 'Steve Jobs' },
  { text: 'Education is the most powerful weapon.', author: 'Nelson Mandela' },
  { text: 'The beautiful thing about learning is that no one can take it away from you.', author: 'B.B. King' },
  { text: 'It does not matter how slowly you go as long as you do not stop.', author: 'Confucius' },
  { text: 'The more that you read, the more things you will know.', author: 'Dr. Seuss' },
];

const TASKS = [
  { label: 'Complete Math exercise', initial: false },
  { label: 'Read Physics chapter 5', initial: false },
  { label: 'Watch Chemistry video', initial: true },
  { label: 'Practice English essay', initial: false },
];

// Demo user (static)
const USER = { name: 'Demo Student', level: 'SS 3' };

// ---------- Sidebar content (shared by desktop rail + mobile Drawer) ----------
function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        bgcolor: '#0f172a',
        color: '#e2e8f0',
        fontFamily: FONT,
      }}
    >
      {/* Logo */}
      <Box sx={{ p: 2.5, borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: '12px',
              background: 'linear-gradient(135deg,#0ea5e9,#06b6d4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 10px 15px -3px rgba(14,165,233,.35)',
              flexShrink: 0,
            }}
          >
            <PsychologyIcon sx={{ color: '#fff', fontSize: 24 }} />
          </Box>
          <Box>
            <Typography
              sx={{
                fontSize: '1.05rem',
                fontWeight: 700,
                background: 'linear-gradient(90deg,#7dd3fc,#67e8f9)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                lineHeight: 1.2,
              }}
            >
              JUANOVA CORTEX
            </Typography>
            <Typography sx={{ fontSize: '0.75rem', color: '#64748b' }}>
              Learning Platform
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Navigation */}
      <Box sx={{ flex: 1, overflowY: 'auto', p: 2 }}>
        <Box
          component="ul"
          sx={{
            listStyle: 'none',
            m: 0,
            p: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: 0.5,
          }}
        >
          {NAV_ITEMS.map((item) => {
            const ItemIcon = item.icon;
            return (
              <Box component="li" key={item.label}>
                <Link href={item.href} onClick={onNavigate} style={{ textDecoration: 'none' }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1.5,
                      px: 1.5,
                      py: 1.25,
                      borderRadius: '12px',
                      fontSize: '0.9rem',
                      fontWeight: item.active ? 600 : 400,
                      color: item.active ? '#f1f5f9' : '#cbd5e1',
                      bgcolor: item.active ? 'rgba(14,165,233,0.18)' : 'transparent',
                      boxShadow: item.active ? 'inset 0 0 0 1px rgba(14,165,233,0.35)' : 'none',
                      transition: 'background-color .2s ease, color .2s ease',
                      '&:hover': {
                        bgcolor: item.active ? 'rgba(14,165,233,0.24)' : 'rgba(255,255,255,0.06)',
                        color: '#f1f5f9',
                      },
                    }}
                  >
                    <ItemIcon sx={{ fontSize: 20, color: item.color, width: 20 }} />
                    <span>{item.label}</span>
                  </Box>
                </Link>
              </Box>
            );
          })}
        </Box>
      </Box>

      {/* Bottom: user + teacher mode + logout */}
      <Box sx={{ p: 2, borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            p: 1.5,
            borderRadius: '12px',
            bgcolor: 'rgba(255,255,255,0.06)',
            mb: 1.5,
          }}
        >
          <AccountCircleIcon sx={{ fontSize: 40, color: '#38bdf8' }} />
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography
              sx={{
                fontWeight: 600,
                color: '#f1f5f9',
                fontSize: '0.9rem',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {USER.name}
            </Typography>
            <Typography sx={{ fontSize: '0.75rem', color: '#94a3b8' }}>{USER.level}</Typography>
          </Box>
        </Box>

        <Link href="/teachers/teacher-confirmation/" onClick={onNavigate} style={{ textDecoration: 'none' }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              px: 1.5,
              py: 1.1,
              borderRadius: '12px',
              fontSize: '0.9rem',
              color: '#cbd5e1',
              '&:hover': { bgcolor: 'rgba(255,255,255,0.06)', color: '#f1f5f9' },
            }}
          >
            <CoPresentIcon sx={{ fontSize: 20, color: '#fbbf24', width: 20 }} />
            <span>Teacher Mode</span>
          </Box>
        </Link>

        <Link href="/" onClick={onNavigate} style={{ textDecoration: 'none' }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              px: 1.5,
              py: 1.1,
              borderRadius: '12px',
              fontSize: '0.9rem',
              color: '#cbd5e1',
              '&:hover': { bgcolor: 'rgba(239,68,68,0.14)', color: '#f87171' },
            }}
          >
            <LogoutIcon sx={{ fontSize: 20, color: '#f87171', width: 20 }} />
            <span>Logout</span>
          </Box>
        </Link>
      </Box>
    </Box>
  );
}

// ---------- Subject card ----------
function SubjectCard({ subject }: { subject: Subject }) {
  const Icon = subject.icon;
  const total = subject.topics.length;
  const completed = 0; // original default (no backend)
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <Link href={subject.link} style={{ textDecoration: 'none', height: '100%' }}>
      <Box
        sx={{
          position: 'relative',
          overflow: 'hidden',
          bgcolor: '#fff',
          borderRadius: '16px',
          p: 2.5,
          border: '1px solid #e2e8f0',
          boxShadow: '0 1px 2px rgba(0,0,0,.05)',
          height: '100%',
          transition: 'all .4s cubic-bezier(.175,.885,.32,1.275)',
          '&:before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 4,
            background: subject.color,
          },
          '&:hover': {
            transform: 'translateY(-8px)',
            boxShadow: '0 25px 50px -12px rgba(0,0,0,.15)',
          },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2 }}>
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: '12px',
              background: subject.gradient,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 10px 15px -3px rgba(0,0,0,.1)',
            }}
          >
            <Icon sx={{ color: '#fff', fontSize: 22 }} />
          </Box>
          <Box
            sx={{
              fontSize: '0.7rem',
              fontWeight: 500,
              color: subject.color,
              bgcolor: subject.soft,
              px: 1,
              py: 0.5,
              borderRadius: '999px',
            }}
          >
            {total} Topics
          </Box>
        </Box>
        <Typography sx={{ fontWeight: 600, color: '#1e293b', mb: 0.5, fontSize: '0.95rem' }}>
          {subject.name}
        </Typography>
        <Typography sx={{ fontSize: '0.75rem', color: '#64748b', mb: 1.5 }}>
          {completed} of {total} completed
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box sx={{ flex: 1, height: 6, bgcolor: subject.soft, borderRadius: '999px', overflow: 'hidden' }}>
            <Box
              sx={{
                height: '100%',
                width: `${percentage}%`,
                bgcolor: subject.color,
                borderRadius: '999px',
                transition: 'width 1s ease',
              }}
            />
          </Box>
          <Typography sx={{ fontSize: '0.75rem', fontWeight: 500, color: subject.color }}>
            {percentage}%
          </Typography>
        </Box>
      </Box>
    </Link>
  );
}

// ---------- Page ----------
export default function StudentDashboardPage() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [greeting, setGreeting] = useState('Good Morning');
  const [dateLabel, setDateLabel] = useState('');
  const [quote, setQuote] = useState(QUOTES[0]);
  const [tasks, setTasks] = useState<boolean[]>(TASKS.map((t) => t.initial));

  // Exam countdown (original: JAMB 2026 — March 15, 2026, 08:00)
  const [countdown, setCountdown] = useState({ d: '--', h: '--', m: '--', s: '--' });
  useEffect(() => {
    const examDate = new Date('2026-03-15T08:00:00');
    const update = () => {
      const diff = examDate.getTime() - Date.now();
      if (diff <= 0) {
        setCountdown({ d: '0', h: '00', m: '00', s: '00' });
        return;
      }
      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((diff % (1000 * 60)) / 1000);
      setCountdown({
        d: String(d),
        h: String(h).padStart(2, '0'),
        m: String(m).padStart(2, '0'),
        s: String(s).padStart(2, '0'),
      });
    };
    update();
    const t = window.setInterval(update, 1000);
    return () => window.clearInterval(t);
  }, []);

  // Greeting + date (client only, avoids hydration mismatch)
  useEffect(() => {
    const t = window.setTimeout(() => {
      const hour = new Date().getHours();
      setGreeting(hour < 12 ? 'Good Morning' : hour < 17 ? 'Good Afternoon' : 'Good Evening');
      setDateLabel(
        new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })
      );
      setQuote(QUOTES[Math.floor(Math.random() * QUOTES.length)]);
    }, 0);
    return () => window.clearTimeout(t);
  }, []);

  // Focus timer (Pomodoro, like the original)
  const [secondsLeft, setSecondsLeft] = useState(25 * 60);
  const [timerRunning, setTimerRunning] = useState(false);
  useEffect(() => {
    if (!timerRunning) return;
    const t = window.setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          setTimerRunning(false);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => window.clearInterval(t);
  }, [timerRunning]);
  const timerLabel = `${String(Math.floor(secondsLeft / 60)).padStart(2, '0')}:${String(
    secondsLeft % 60
  ).padStart(2, '0')}`;
  const setTimer = (min: number) => {
    setTimerRunning(false);
    setSecondsLeft(min * 60);
  };

  // Weekly goal ring (static demo number)
  const weeklyGoal = 62;
  const ringOffset = 220 - (weeklyGoal / 100) * 220;

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          bgcolor: '#f8fafc',
          color: '#1e293b',
          fontFamily: FONT,
        }}
      >
        {/* ===== Desktop sidebar (dark navy, per migration spec) ===== */}
        <Box
          sx={{
            width: { md: 288, lg: 320 },
            flexShrink: 0,
            display: { xs: 'none', md: 'block' },
            position: 'fixed',
            left: 0,
            top: 0,
            height: '100%',
            bgcolor: '#0f172a',
            borderRight: '1px solid rgba(255,255,255,0.08)',
            zIndex: 40,
          }}
        >
          <SidebarContent />
        </Box>

        {/* ===== Mobile drawer ===== */}
        <Drawer
          anchor="left"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          slotProps={{ paper: { sx: { width: 280, bgcolor: '#0f172a' } } }}
        >
          <SidebarContent onNavigate={() => setDrawerOpen(false)} />
        </Drawer>

        {/* ===== Main column ===== */}
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            minWidth: 0,
            ml: { md: '288px', lg: '320px' },
          }}
        >
          {/* Top header */}
          <Box
            component="header"
            sx={{
              position: 'sticky',
              top: 0,
              zIndex: 30,
              bgcolor: 'rgba(255,255,255,0.8)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              borderBottom: '1px solid rgba(226,232,240,0.6)',
              px: { xs: 2, md: 3 },
              py: 2,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2 }}>
              <IconButton
                aria-label="Toggle sidebar"
                onClick={() => setDrawerOpen(true)}
                sx={{ display: { md: 'none' }, color: '#64748b' }}
              >
                <MenuIcon />
              </IconButton>

              <Box
                sx={{
                  flex: 1,
                  maxWidth: 576,
                  display: 'flex',
                  alignItems: 'center',
                  bgcolor: 'rgba(248,250,252,0.6)',
                  border: '1px solid #e2e8f0',
                  borderRadius: '12px',
                  px: 2,
                  py: 1,
                  '&:focus-within': {
                    borderColor: '#7dd3fc',
                    bgcolor: '#fff',
                    boxShadow: '0 0 0 3px rgba(186,230,253,0.6)',
                  },
                  transition: 'all .2s ease',
                }}
              >
                <SearchIcon sx={{ color: '#94a3b8', fontSize: 20, mr: 1 }} />
                <InputBase
                  placeholder="Search subjects, topics, resources..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  sx={{ flex: 1, fontSize: '0.9rem', color: '#1e293b' }}
                />
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Tooltip title="Notifications">
                  <Link href="/students/notifications-supabase/" style={{ textDecoration: 'none' }}>
                    <IconButton aria-label="Notifications" sx={{ color: '#64748b' }}>
                      <NotificationsIcon />
                      <Box
                        sx={{
                          position: 'absolute',
                          top: 8,
                          right: 8,
                          width: 10,
                          height: 10,
                          bgcolor: '#ef4444',
                          borderRadius: '50%',
                        }}
                      />
                    </IconButton>
                  </Link>
                </Tooltip>

                <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center', gap: 1.5 }}>
                  <Box sx={{ textAlign: 'right' }}>
                    <Typography sx={{ fontWeight: 600, color: '#1e293b', fontSize: '0.9rem', lineHeight: 1.2 }}>
                      {USER.name}
                    </Typography>
                    <Typography sx={{ fontSize: '0.75rem', color: '#64748b' }}>{USER.level}</Typography>
                  </Box>
                  <AccountCircleIcon sx={{ fontSize: 40, color: '#7dd3fc' }} />
                </Box>
              </Box>
            </Box>
          </Box>

          {/* Main body */}
          <Box component="main" sx={{ p: { xs: 2, md: 3 }, display: 'flex', flexDirection: 'column', gap: 3 }}>
            {/* Hero welcome */}
            <Box
              sx={{
                borderRadius: '24px',
                p: { xs: 3, md: 4 },
                color: '#fff',
                position: 'relative',
                overflow: 'hidden',
                background: 'linear-gradient(-45deg,#0ea5e9,#0284c7,#0891b2,#06b6d4)',
                backgroundSize: '400% 400%',
                animation: 'gradientFlow 15s ease infinite',
                '@keyframes gradientFlow': {
                  '0%': { backgroundPosition: '0% 50%' },
                  '50%': { backgroundPosition: '100% 50%' },
                  '100%': { backgroundPosition: '0% 50%' },
                },
              }}
            >
              {/* floating particles */}
              {[
                { size: 80, top: 40, right: 80, delay: '0s' },
                { size: 48, bottom: 80, right: 160, delay: '2s' },
                { size: 64, top: 80, right: '33%', delay: '4s' },
              ].map((p, i) => (
                <Box
                  key={i}
                  sx={{
                    position: 'absolute',
                    width: p.size,
                    height: p.size,
                    bgcolor: 'rgba(255,255,255,0.15)',
                    borderRadius: '50%',
                    top: p.top,
                    right: p.right,
                    bottom: p.bottom,
                    animation: `particleFloat 8s ease-in-out infinite`,
                    animationDelay: p.delay,
                    '@keyframes particleFloat': {
                      '0%,100%': { transform: 'translateY(0) rotate(0deg)', opacity: 0.7 },
                      '50%': { transform: 'translateY(-30px) rotate(180deg)', opacity: 0.3 },
                    },
                  }}
                />
              ))}

              <Box
                sx={{
                  position: 'relative',
                  zIndex: 10,
                  display: 'flex',
                  flexDirection: { xs: 'column', lg: 'row' },
                  alignItems: { lg: 'center' },
                  justifyContent: 'space-between',
                  gap: 4,
                }}
              >
                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2, flexWrap: 'wrap' }}>
                    <Box
                      sx={{
                        px: 2,
                        py: 0.75,
                        bgcolor: 'rgba(255,255,255,0.2)',
                        backdropFilter: 'blur(8px)',
                        borderRadius: '999px',
                        fontSize: '0.85rem',
                        fontWeight: 500,
                      }}
                    >
                      {greeting}
                    </Box>
                    <Typography sx={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem' }}>
                      {dateLabel}
                    </Typography>
                  </Box>
                  <Typography
                    variant="h1"
                    sx={{ fontSize: { xs: '1.75rem', md: '2.25rem' }, fontWeight: 700, mb: 1.5 }}
                  >
                    Welcome back, {USER.name}! 👋
                  </Typography>
                  <Typography sx={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.1rem', mb: 3, maxWidth: 480 }}>
                    Your learning journey continues. Every study session brings you closer to your goals.
                  </Typography>

                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
                    <Link href="/students/study-plan/" style={{ textDecoration: 'none' }}>
                      <Box
                        sx={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 1,
                          px: 2.5,
                          py: 1.25,
                          bgcolor: '#fff',
                          color: '#0284c7',
                          borderRadius: '12px',
                          fontWeight: 600,
                          fontSize: '0.9rem',
                          boxShadow: '0 10px 15px -3px rgba(0,0,0,.1)',
                        }}
                      >
                        <AddCircleIcon sx={{ fontSize: 20 }} />
                        New Study Plan
                      </Box>
                    </Link>
                    <Link href="/students/mock-exams/" style={{ textDecoration: 'none' }}>
                      <Box
                        sx={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 1,
                          px: 2.5,
                          py: 1.25,
                          bgcolor: 'rgba(255,255,255,0.2)',
                          backdropFilter: 'blur(8px)',
                          color: '#fff',
                          borderRadius: '12px',
                          fontWeight: 500,
                          fontSize: '0.9rem',
                          '&:hover': { bgcolor: 'rgba(255,255,255,0.3)' },
                        }}
                      >
                        <AssignmentIcon sx={{ fontSize: 20 }} />
                        Take Practice Test
                      </Box>
                    </Link>
                    <Link href="/students/video-library/" style={{ textDecoration: 'none' }}>
                      <Box
                        sx={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 1,
                          px: 2.5,
                          py: 1.25,
                          bgcolor: 'rgba(255,255,255,0.2)',
                          backdropFilter: 'blur(8px)',
                          color: '#fff',
                          borderRadius: '12px',
                          fontWeight: 500,
                          fontSize: '0.9rem',
                          '&:hover': { bgcolor: 'rgba(255,255,255,0.3)' },
                        }}
                      >
                        <PlayCircleIcon sx={{ fontSize: 20 }} />
                        Watch Videos
                      </Box>
                    </Link>
                  </Box>
                </Box>

                {/* Stats: streak + weekly goal */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box
                    sx={{
                      textAlign: 'center',
                      bgcolor: 'rgba(255,255,255,0.1)',
                      backdropFilter: 'blur(8px)',
                      borderRadius: '16px',
                      p: 2.5,
                    }}
                  >
                    <Box
                      sx={{
                        width: 64,
                        height: 64,
                        borderRadius: '16px',
                        background: 'linear-gradient(135deg,#fb923c,#ef4444)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mx: 'auto',
                        mb: 1.5,
                        boxShadow: '0 0 20px rgba(251,146,60,.6)',
                      }}
                    >
                      <LocalFireDepartmentIcon sx={{ color: '#fff', fontSize: 28 }} />
                    </Box>
                    <Typography sx={{ fontSize: '1.875rem', fontWeight: 700, color: '#fff', lineHeight: 1.2 }}>
                      7
                    </Typography>
                    <Typography sx={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem' }}>
                      Day Streak
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      textAlign: 'center',
                      bgcolor: 'rgba(255,255,255,0.1)',
                      backdropFilter: 'blur(8px)',
                      borderRadius: '16px',
                      p: 2.5,
                    }}
                  >
                    <Box sx={{ position: 'relative', width: 80, height: 80, mx: 'auto', mb: 1.5 }}>
                      <svg width="80" height="80" viewBox="0 0 80 80">
                        <circle cx="40" cy="40" r="35" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="6" />
                        <circle
                          cx="40"
                          cy="40"
                          r="35"
                          fill="none"
                          stroke="#fff"
                          strokeWidth="6"
                          strokeLinecap="round"
                          strokeDasharray="220"
                          strokeDashoffset={ringOffset}
                          transform="rotate(-90 40 40)"
                        />
                      </svg>
                      <Box
                        sx={{
                          position: 'absolute',
                          inset: 0,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '1.25rem',
                          fontWeight: 700,
                          color: '#fff',
                        }}
                      >
                        {weeklyGoal}%
                      </Box>
                    </Box>
                    <Typography sx={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem' }}>
                      Weekly Goal
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>

            {/* Exam countdown */}
            <Box
              sx={{
                borderRadius: '16px',
                p: 2.5,
                background: 'linear-gradient(135deg,#fffbeb,#fef3c7)',
                border: '1px solid #fde68a',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: 2,
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box
                    sx={{
                      width: 56,
                      height: 56,
                      bgcolor: '#f59e0b',
                      borderRadius: '16px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 10px 15px -3px rgba(245,158,11,.4)',
                    }}
                  >
                    <HourglassTopIcon sx={{ color: '#fff', fontSize: 26 }} />
                  </Box>
                  <Box>
                    <Typography
                      sx={{
                        fontSize: '0.7rem',
                        color: '#b45309',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        fontWeight: 500,
                      }}
                    >
                      Exam Countdown
                    </Typography>
                    <Typography sx={{ fontWeight: 700, color: '#78350f', fontSize: '1.1rem' }}>
                      JAMB 2026
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 3, md: 4 } }}>
                  {[
                    { v: countdown.d, l: 'Days' },
                    { v: countdown.h, l: 'Hours' },
                    { v: countdown.m, l: 'Minutes' },
                    { v: countdown.s, l: 'Seconds' },
                  ].map((u) => (
                    <Box key={u.l} sx={{ textAlign: 'center' }}>
                      <Typography sx={{ fontSize: '1.5rem', fontWeight: 700, color: '#b45309', lineHeight: 1.2 }}>
                        {u.v}
                      </Typography>
                      <Typography sx={{ fontSize: '0.7rem', color: '#d97706', fontWeight: 500 }}>
                        {u.l}
                      </Typography>
                    </Box>
                  ))}
                </Box>

                <Link href="/students/study-plan/" style={{ textDecoration: 'none' }}>
                  <Box
                    sx={{
                      px: 2,
                      py: 1,
                      bgcolor: '#f59e0b',
                      color: '#fff',
                      fontWeight: 500,
                      borderRadius: '12px',
                      fontSize: '0.85rem',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 1,
                      '&:hover': { bgcolor: '#d97706' },
                    }}
                  >
                    <CalendarMonthIcon sx={{ fontSize: 18 }} />
                    Set Exam Date
                  </Box>
                </Link>
              </Box>
            </Box>

            {/* Subjects */}
            <Box component="section">
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2.5, flexWrap: 'wrap', gap: 1 }}>
                <Box>
                  <Typography variant="h2" sx={{ fontSize: '1.25rem', fontWeight: 700, color: '#1e293b' }}>
                    Your Subjects
                  </Typography>
                  <Typography sx={{ fontSize: '0.85rem', color: '#64748b' }}>
                    Continue where you left off
                  </Typography>
                </Box>
                <Link
                  href="/students/digital-library/"
                  style={{
                    textDecoration: 'none',
                    fontSize: '0.85rem',
                    fontWeight: 500,
                    color: '#0284c7',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 4,
                  }}
                >
                  View All <ArrowForwardIcon sx={{ fontSize: 14 }} />
                </Link>
              </Box>

              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: {
                    xs: '1fr',
                    sm: 'repeat(2,1fr)',
                    lg: 'repeat(3,1fr)',
                    xl: 'repeat(4,1fr)',
                  },
                  gap: 2,
                }}
              >
                {SUBJECTS_DATA.map((s) => (
                  <SubjectCard key={s.id} subject={s} />
                ))}
              </Box>
            </Box>

            {/* Two-column layout */}
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '2fr 1fr' }, gap: 3 }}>
              {/* Left column */}
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, minWidth: 0 }}>
                {/* Study tools */}
                <Box component="section">
                  <Box sx={{ mb: 2.5 }}>
                    <Typography variant="h2" sx={{ fontSize: '1.25rem', fontWeight: 700, color: '#1e293b' }}>
                      Study Tools
                    </Typography>
                    <Typography sx={{ fontSize: '0.85rem', color: '#64748b' }}>
                      Everything you need to excel
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: 'grid',
                      gridTemplateColumns: { xs: 'repeat(2,1fr)', md: 'repeat(4,1fr)' },
                      gap: 2,
                    }}
                  >
                    {STUDY_TOOLS.map((tool) => {
                      const ToolIcon = tool.icon;
                      return (
                        <Link key={tool.label} href={tool.href} style={{ textDecoration: 'none' }}>
                          <Box
                            sx={{
                              bgcolor: '#fff',
                              borderRadius: '16px',
                              p: 2.5,
                              border: '1px solid #e2e8f0',
                              boxShadow: '0 1px 2px rgba(0,0,0,.05)',
                              textAlign: 'center',
                              height: '100%',
                              transition: 'all .4s cubic-bezier(.175,.885,.32,1.275)',
                              '&:hover': {
                                transform: 'translateY(-8px)',
                                boxShadow: '0 25px 50px -12px rgba(0,0,0,.15)',
                                '& .tool-icon': { transform: 'scale(1.1)' },
                              },
                            }}
                          >
                            <Box
                              className="tool-icon"
                              sx={{
                                width: 56,
                                height: 56,
                                mx: 'auto',
                                mb: 1.5,
                                background: tool.gradient,
                                borderRadius: '16px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                boxShadow: '0 10px 15px -3px rgba(0,0,0,.1)',
                                transition: 'transform .3s ease',
                              }}
                            >
                              <ToolIcon sx={{ color: '#fff', fontSize: 22 }} />
                            </Box>
                            <Typography sx={{ fontWeight: 600, color: '#1e293b', fontSize: '0.85rem' }}>
                              {tool.label}
                            </Typography>
                            <Typography sx={{ fontSize: '0.7rem', color: '#64748b', mt: 0.5 }}>
                              {tool.sub}
                            </Typography>
                          </Box>
                        </Link>
                      );
                    })}
                  </Box>
                </Box>

                {/* Recent activity */}
                <Box
                  sx={{
                    bgcolor: '#fff',
                    borderRadius: '16px',
                    border: '1px solid #e2e8f0',
                    boxShadow: '0 1px 2px rgba(0,0,0,.05)',
                    overflow: 'hidden',
                  }}
                >
                  <Box sx={{ p: 2.5, borderBottom: '1px solid #f1f5f9' }}>
                    <Typography variant="h2" sx={{ fontSize: '1.1rem', fontWeight: 700, color: '#1e293b' }}>
                      Recent Activity
                    </Typography>
                  </Box>
                  <Box sx={{ p: 2.5 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                      {ACTIVITIES.map((a) => {
                        const ActIcon = a.icon;
                        return (
                          <Box
                            key={a.title}
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 2,
                              p: 1.5,
                              borderRadius: '12px',
                              '&:hover': { bgcolor: '#f8fafc' },
                              transition: 'background-color .2s',
                            }}
                          >
                            <Box
                              sx={{
                                width: 40,
                                height: 40,
                                borderRadius: '50%',
                                bgcolor: a.bg,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}
                            >
                              <ActIcon sx={{ color: a.color, fontSize: 18 }} />
                            </Box>
                            <Box sx={{ flex: 1, minWidth: 0 }}>
                              <Typography sx={{ fontWeight: 500, color: '#1e293b', fontSize: '0.875rem' }}>
                                {a.title}
                              </Typography>
                              <Typography sx={{ fontSize: '0.7rem', color: '#64748b' }}>
                                {a.sub}
                              </Typography>
                            </Box>
                            <Typography sx={{ fontSize: '0.7rem', color: '#94a3b8', flexShrink: 0 }}>
                              {a.time}
                            </Typography>
                          </Box>
                        );
                      })}
                    </Box>
                  </Box>
                </Box>
              </Box>

              {/* Right column */}
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, minWidth: 0 }}>
                {/* Daily motivation */}
                <Box
                  sx={{
                    background: 'linear-gradient(135deg,#f0f9ff,#ecfeff)',
                    borderRadius: '16px',
                    p: 2.5,
                    border: '1px solid #bae6fd',
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: '12px',
                        bgcolor: '#0ea5e9',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <FormatQuoteIcon sx={{ color: '#fff', fontSize: 20 }} />
                    </Box>
                    <Box>
                      <Typography
                        sx={{ color: '#334155', fontStyle: 'italic', fontSize: '0.875rem', lineHeight: 1.6 }}
                      >
                        &ldquo;{quote.text}&rdquo;
                      </Typography>
                      <Typography sx={{ color: '#0284c7', fontSize: '0.75rem', fontWeight: 500, mt: 1 }}>
                        — {quote.author}
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                {/* Focus timer */}
                <Box
                  sx={{
                    bgcolor: '#fff',
                    borderRadius: '16px',
                    border: '1px solid #e2e8f0',
                    boxShadow: '0 1px 2px rgba(0,0,0,.05)',
                    overflow: 'hidden',
                  }}
                >
                  <Box sx={{ p: 2.5, borderBottom: '1px solid #f1f5f9' }}>
                    <Typography sx={{ fontWeight: 600, color: '#1e293b', fontSize: '1rem' }}>
                      Focus Timer
                    </Typography>
                    <Typography sx={{ fontSize: '0.75rem', color: '#64748b' }}>
                      Stay productive with Pomodoro
                    </Typography>
                  </Box>
                  <Box sx={{ p: 2.5 }}>
                    <Box sx={{ textAlign: 'center', mb: 2 }}>
                      <Typography sx={{ fontSize: '3rem', fontWeight: 700, color: '#1e293b', mb: 1, lineHeight: 1.1 }}>
                        {timerLabel}
                      </Typography>
                      <Typography sx={{ fontSize: '0.85rem', color: '#64748b' }}>Focus Session</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Box
                        component="button"
                        onClick={() => setTimerRunning((r) => !r)}
                        sx={{
                          flex: 1,
                          py: 1,
                          bgcolor: timerRunning ? '#f59e0b' : '#0ea5e9',
                          color: '#fff',
                          fontWeight: 500,
                          borderRadius: '12px',
                          fontSize: '0.85rem',
                          border: 'none',
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: 0.5,
                          fontFamily: FONT,
                          '&:hover': { bgcolor: timerRunning ? '#d97706' : '#0284c7' },
                        }}
                      >
                        {timerRunning ? <PauseIcon sx={{ fontSize: 16 }} /> : <PlayArrowIcon sx={{ fontSize: 16 }} />}
                        {timerRunning ? 'Pause' : 'Start'}
                      </Box>
                      <Box
                        component="button"
                        onClick={() => setTimer(25)}
                        aria-label="Reset timer"
                        sx={{
                          py: 1,
                          px: 2,
                          bgcolor: '#f1f5f9',
                          color: '#475569',
                          fontWeight: 500,
                          borderRadius: '12px',
                          fontSize: '0.85rem',
                          border: 'none',
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          '&:hover': { bgcolor: '#e2e8f0' },
                          fontFamily: FONT,
                        }}
                      >
                        <ReplayIcon sx={{ fontSize: 16 }} />
                      </Box>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mt: 1.5 }}>
                      {[15, 25, 45, 60].map((m) => (
                        <Box
                          key={m}
                          component="button"
                          onClick={() => setTimer(m)}
                          sx={{
                            px: 1.5,
                            py: 0.5,
                            fontSize: '0.7rem',
                            borderRadius: '999px',
                            border: 'none',
                            cursor: 'pointer',
                            fontFamily: FONT,
                            bgcolor: secondsLeft === m * 60 ? '#e0f2fe' : '#f1f5f9',
                            color: secondsLeft === m * 60 ? '#0284c7' : '#475569',
                            '&:hover': { bgcolor: '#e2e8f0' },
                          }}
                        >
                          {m}m
                        </Box>
                      ))}
                    </Box>
                  </Box>
                </Box>

                {/* Today's tasks */}
                <Box
                  sx={{
                    bgcolor: '#fff',
                    borderRadius: '16px',
                    border: '1px solid #e2e8f0',
                    boxShadow: '0 1px 2px rgba(0,0,0,.05)',
                    overflow: 'hidden',
                  }}
                >
                  <Box
                    sx={{
                      p: 2.5,
                      borderBottom: '1px solid #f1f5f9',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Typography sx={{ fontWeight: 600, color: '#1e293b', fontSize: '1rem' }}>
                      Today&rsquo;s Tasks
                    </Typography>
                    <Link
                      href="/students/study-plan/"
                      style={{ textDecoration: 'none', fontSize: '0.75rem', color: '#0284c7' }}
                    >
                      View All
                    </Link>
                  </Box>
                  <Box sx={{ p: 1.5 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                      {TASKS.map((task, i) => (
                        <Box
                          key={task.label}
                          onClick={() =>
                            setTasks((prev) => prev.map((v, idx) => (idx === i ? !v : v)))
                          }
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1.5,
                            p: 1,
                            borderRadius: '8px',
                            cursor: 'pointer',
                            '&:hover': { bgcolor: '#f8fafc' },
                          }}
                        >
                          <Box
                            sx={{
                              width: 20,
                              height: 20,
                              borderRadius: '6px',
                              border: tasks[i] ? 'none' : '2px solid #cbd5e1',
                              bgcolor: tasks[i] ? '#0ea5e9' : 'transparent',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexShrink: 0,
                            }}
                          >
                            {tasks[i] && <CheckIcon sx={{ color: '#fff', fontSize: 14 }} />}
                          </Box>
                          <Typography
                            sx={{
                              fontSize: '0.85rem',
                              color: tasks[i] ? '#94a3b8' : '#475569',
                              textDecoration: tasks[i] ? 'line-through' : 'none',
                            }}
                          >
                            {task.label}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
