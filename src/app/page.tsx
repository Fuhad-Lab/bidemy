'use client';

/**
 * FUHADEMY landing page — pixel-faithful recreation of /index.html
 * from the original site (fuhademy repo), rebuilt with MUI only.
 */

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import Link from 'next/link';
import {
  createTheme,
  ThemeProvider,
  Box,
  Container,
  Typography,
  Button,
  IconButton,
  Collapse,
  Modal,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Tooltip,
} from '@mui/material';

// ---------- Icons (Material Icons equivalents of the original Font Awesome icons) ----------
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import StarIcon from '@mui/icons-material/Star';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import ChecklistIcon from '@mui/icons-material/Checklist';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import VideocamIcon from '@mui/icons-material/Videocam';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import CalculateIcon from '@mui/icons-material/Calculate';
import WavesIcon from '@mui/icons-material/Waves';
import ScienceIcon from '@mui/icons-material/Science';
import BiotechIcon from '@mui/icons-material/Biotech';
import AreaChartIcon from '@mui/icons-material/AreaChart';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import StorefrontIcon from '@mui/icons-material/Storefront';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import CoPresentIcon from '@mui/icons-material/CoPresent';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import PsychologyIcon from '@mui/icons-material/Psychology';
import QuizIcon from '@mui/icons-material/Quiz';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import InstallMobileIcon from '@mui/icons-material/InstallMobile';
import GroupsIcon from '@mui/icons-material/Groups';
import HandshakeIcon from '@mui/icons-material/Handshake';
import SchoolIcon from '@mui/icons-material/School';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PersonIcon from '@mui/icons-material/Person';
import WcIcon from '@mui/icons-material/Wc';
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement';
import MemoryIcon from '@mui/icons-material/Memory';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import GitHubIcon from '@mui/icons-material/GitHub';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import CommentIcon from '@mui/icons-material/Comment';

// ---------- Theme (colors + fonts of the original site) ----------
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
const GRADIENT_TEXT = {
  backgroundImage: 'linear-gradient(90deg,#2563EB 0%,#4F46E5 100%)',
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  color: 'transparent',
} as const;

// ---------- AOS-like entrance animation (IntersectionObserver fade-in) ----------
function FadeIn({
  children,
  delay = 0,
  sx,
}: {
  children: React.ReactNode;
  delay?: number;
  sx?: object;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      // Very old browsers: reveal immediately (deferred to avoid sync setState)
      const t = window.setTimeout(() => setVisible(true), 0);
      return () => window.clearTimeout(t);
    }
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            obs.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <Box
      ref={ref}
      sx={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : 'translateY(26px)',
        transition: `opacity .8s ease ${delay}ms, transform .8s ease ${delay}ms`,
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}

// ---------- Typing hook (Typed.js equivalent) ----------
function useTypewriter(words: string[]) {
  const [text, setText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[wordIndex % words.length];
    let timer: number;

    if (!deleting) {
      if (text.length < word.length) {
        timer = window.setTimeout(
          () => setText(word.slice(0, text.length + 1)),
          95
        );
      } else {
        timer = window.setTimeout(() => setDeleting(true), 1600);
      }
    } else if (text.length > 0) {
      timer = window.setTimeout(
        () => setText(word.slice(0, text.length - 1)),
        45
      );
    } else {
      timer = window.setTimeout(() => {
        setDeleting(false);
        setWordIndex((i) => (i + 1) % words.length);
      }, 250);
    }
    return () => window.clearTimeout(timer);
  }, [text, deleting, wordIndex, words]);

  return text;
}

// ---------- Data (exact content from the original HTML) ----------
const FEATURES = [
  {
    icon: SmartToyIcon,
    bg: '#dbeafe',
    color: '#2563eb',
    hoverBorder: '#bfdbfe',
    hoverColor: '#2563eb',
    title: 'AI-Powered Tutor',
    text: 'Get instant, step-by-step explanations for any question, 24/7. No more getting stuck on difficult concepts.',
  },
  {
    icon: ChecklistIcon,
    bg: '#dcfce7',
    color: '#16a34a',
    hoverBorder: '#bbf7d0',
    hoverColor: '#16a34a',
    title: 'Personalized Study Plans',
    text: 'Our AI analyzes your strengths and weaknesses to create a custom study roadmap that focuses on what you need most.',
  },
  {
    icon: DesignServicesIcon,
    bg: '#f3e8ff',
    color: '#9333ea',
    hoverBorder: '#e9d5ff',
    hoverColor: '#9333ea',
    title: 'Realistic Mock Exams',
    text: 'Practice with timed exams that mimic the format and difficulty of WAEC, NECO, and JAMB to eliminate exam-day surprises.',
  },
  {
    icon: VideocamIcon,
    bg: '#fee2e2',
    color: '#dc2626',
    hoverBorder: '#fecaca',
    hoverColor: '#dc2626',
    title: 'Live Tutor Sessions',
    text: 'Join group sessions or book one-on-one time with expert tutors for in-depth guidance and support.',
  },
  {
    icon: QueryStatsIcon,
    bg: '#fef9c3',
    color: '#ca8a04',
    hoverBorder: '#fef08a',
    hoverColor: '#ca8a04',
    title: 'Performance Analytics',
    text: "Track your progress with detailed reports that show you where you're improving and where to focus next.",
  },
  {
    icon: MenuBookIcon,
    bg: '#e0e7ff',
    color: '#4f46e5',
    hoverBorder: '#c7d2fe',
    hoverColor: '#4f46e5',
    title: 'Comprehensive Content Library',
    text: 'Access thousands of practice questions, video lessons, and study notes across all your subjects.',
  },
];

const SUBJECTS = [
  {
    name: 'Mathematics',
    tagline: 'Master calculations',
    icon: CalculateIcon,
    bg: '#e0e7ff',
    color: '#4f46e5',
    hoverBg: '#c7d2fe',
    border: '#c7d2fe',
    href: '/students/subjects/mathematics/',
  },
  {
    name: 'Physics',
    tagline: 'Natural phenomena',
    icon: WavesIcon,
    bg: '#f3e8ff',
    color: '#9333ea',
    hoverBg: '#e9d5ff',
    border: '#e9d5ff',
    href: '/students/subjects/physics/',
  },
  {
    name: 'Chemistry',
    tagline: 'Matter & reactions',
    icon: ScienceIcon,
    bg: '#dcfce7',
    color: '#16a34a',
    hoverBg: '#bbf7d0',
    border: '#bbf7d0',
    href: '/students/subjects/chemistry/',
  },
  {
    name: 'Biology',
    tagline: 'Life sciences',
    icon: BiotechIcon,
    bg: '#ccfbf1',
    color: '#0d9488',
    hoverBg: '#99f6e4',
    border: '#99f6e4',
    href: '/students/subjects/biology/',
  },
  {
    name: 'English',
    tagline: 'Perfect your language',
    icon: MenuBookIcon,
    bg: '#dbeafe',
    color: '#2563eb',
    hoverBg: '#bfdbfe',
    border: '#bfdbfe',
    href: '/students/subjects/english/',
  },
  {
    name: 'Economics',
    tagline: 'Market principles',
    icon: AreaChartIcon,
    bg: '#fef9c3',
    color: '#ca8a04',
    hoverBg: '#fef08a',
    border: '#fef08a',
    href: '/students/subjects/economics/',
  },
  {
    name: 'Government',
    tagline: 'Political systems',
    icon: AccountBalanceIcon,
    bg: '#fee2e2',
    color: '#dc2626',
    hoverBg: '#fecaca',
    border: '#fecaca',
    href: '/students/subjects/government/',
  },
  {
    name: 'Commerce',
    tagline: 'Trade & business',
    icon: StorefrontIcon,
    bg: '#fce7f3',
    color: '#db2777',
    hoverBg: '#fbcfe8',
    border: '#fbcfe8',
    href: '/students/subjects/commerce/',
  },
];

const HERO_SLIDES = [
  {
    title: 'Student Success Stories',
    caption: 'See how our platform transforms learning journeys',
    icon: EmojiEventsIcon,
    gradient: 'linear-gradient(135deg,#3B82F6 0%,#2563EB 60%,#4F46E5 100%)',
  },
  {
    title: 'AI-Powered Learning',
    caption: 'Experience personalized education at its best',
    icon: PsychologyIcon,
    gradient: 'linear-gradient(135deg,#6366F1 0%,#8B5CF6 100%)',
  },
  {
    title: 'Interactive Practice',
    caption: 'Prepare for success with realistic exam simulations',
    icon: QuizIcon,
    gradient: 'linear-gradient(135deg,#0EA5E9 0%,#3B82F6 100%)',
  },
];

const TIMELINE = [
  {
    title: 'Sign up & Onboard',
    text: 'Create your free account and tell us your exam and subject priorities. We craft a study plan for you.',
  },
  {
    title: 'Personalized Practice',
    text: 'Use the AI tutor for step-by-step help, take realistic mock exams, and review instant analytics.',
  },
  {
    title: 'Live Sessions & Dashboard',
    text: 'Attend live tutor sessions, track progress on your dashboard, and refine your study roadmap.',
  },
];

const FAQS = [
  {
    q: 'What exams do you cover?',
    a: 'We primarily focus on preparing students for major Nigerian secondary school examinations, including the West African Examinations Council (WAEC), National Examinations Council (NECO), and the Joint Admissions and Matriculation Board (JAMB) exams. Our content is tailored to their specific syllabi.',
  },
  {
    q: 'Is the AI Tutor available 24/7?',
    a: 'Yes, absolutely! Our AI Tutor is designed to be your round-the-clock study partner. You can ask questions, get explanations, and work through problems anytime, day or night, without having to wait for a human tutor.',
  },
  {
    q: 'Is this service really free?',
    a: 'Yes, absolutely. Our platform is completely free for all students. We are committed to breaking down barriers to education in Africa. Our mission is to provide high-quality learning tools to everyone, regardless of their financial situation. There are no hidden costs or subscription plans.',
  },
  {
    q: 'Can I use this on my phone?',
    a: 'Yes! Our platform is fully mobile-responsive, meaning you can access all features on your smartphone, tablet, or computer. Learn on the go, wherever you are.',
  },
];

const IMPACT_ITEMS = [
  {
    icon: SmartToyIcon,
    bg: '#dbeafe',
    color: '#2563eb',
    title: 'Personalized AI Tutoring',
    text: 'Every student gets tailored guidance, breaking barriers to quality education.',
  },
  {
    icon: InstallMobileIcon,
    bg: '#f3e8ff',
    color: '#9333ea',
    title: 'Access for All',
    text: 'Mobile-first, offline learning ensures even remote communities can benefit.',
  },
  {
    icon: CoPresentIcon,
    bg: '#dcfce7',
    color: '#16a34a',
    title: 'Teacher Empowerment',
    text: 'Tools and analytics help educators focus on what matters most—student growth.',
  },
  {
    icon: SchoolIcon,
    bg: '#fef9c3',
    color: '#ca8a04',
    title: 'Exam Success',
    text: 'Practice tests, instant feedback, and smart study plans boost pass rates for WAEC, JAMB, and NECO.',
  },
  {
    icon: GroupsIcon,
    bg: '#fee2e2',
    color: '#dc2626',
    title: 'Leadership Development',
    text: 'Beyond academics, we nurture future leaders with soft skills and innovation challenges.',
  },
  {
    icon: HandshakeIcon,
    bg: '#e0e7ff',
    color: '#4f46e5',
    title: 'Community Impact',
    text: 'Scholarships, mentorship, and peer support networks foster hope and ambition.',
  },
  {
    icon: QueryStatsIcon,
    bg: '#fce7f3',
    color: '#db2777',
    title: 'Scalable Change',
    text: "With sponsorship, we can reach millions, closing the education gap and unlocking Africa's potential.",
  },
];

const NAV_LINKS = [
  { label: 'Features', id: 'features' },
  { label: 'Subjects', id: 'subjects' },
  { label: 'Testimonials', id: 'testimonials' },
  { label: 'FAQ', id: 'faq' },
];

// ---------- Hero carousel (Swiper fade equivalent) ----------
function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = window.setInterval(
      () => setIndex((i) => (i + 1) % HERO_SLIDES.length),
      5000
    );
    return () => window.clearInterval(t);
  }, [paused]);

  const go = useCallback((dir: number) => {
    setIndex((i) => (i + dir + HERO_SLIDES.length) % HERO_SLIDES.length);
  }, []);

  return (
    <Box
      sx={{
        position: 'relative',
        zIndex: 10,
      }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <Box
        sx={{
          position: 'relative',
          borderRadius: '16px',
          overflow: 'hidden',
          boxShadow:
            '0 20px 25px -5px rgba(0,0,0,.1), 0 8px 10px -6px rgba(0,0,0,.1)',
          height: { xs: 300, sm: 400, lg: 500 },
        }}
      >
        {HERO_SLIDES.map((slide, i) => {
          const Icon = slide.icon;
          return (
            <Box
              key={slide.title}
              sx={{
                position: 'absolute',
                inset: 0,
                opacity: index === i ? 1 : 0,
                transition: 'opacity 1s ease',
                pointerEvents: index === i ? 'auto' : 'none',
                background: slide.gradient,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Icon
                sx={{
                  fontSize: { xs: 96, sm: 140 },
                  color: 'rgba(255,255,255,0.22)',
                  position: 'absolute',
                }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  bottom: 0,
                  px: { xs: 2, sm: 4 },
                  pb: { xs: 2.5, sm: 4 },
                  pt: 8,
                  background:
                    'linear-gradient(to top, rgba(0,0,0,0.35), transparent)',
                  color: '#fff',
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 600, fontSize: { xs: '1rem', sm: '1.25rem' } }}
                >
                  {slide.title}
                </Typography>
                <Typography
                  sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' }, opacity: 0.9 }}
                >
                  {slide.caption}
                </Typography>
              </Box>
            </Box>
          );
        })}

        {/* Prev / Next */}
        <IconButton
          aria-label="Previous slide"
          onClick={() => go(-1)}
          sx={{
            position: 'absolute',
            left: 8,
            top: '50%',
            transform: 'translateY(-50%)',
            color: '#fff',
            bgcolor: 'rgba(0,0,0,0.25)',
            '&:hover': { bgcolor: 'rgba(0,0,0,0.4)' },
          }}
        >
          <ChevronLeftIcon />
        </IconButton>
        <IconButton
          aria-label="Next slide"
          onClick={() => go(1)}
          sx={{
            position: 'absolute',
            right: 8,
            top: '50%',
            transform: 'translateY(-50%)',
            color: '#fff',
            bgcolor: 'rgba(0,0,0,0.25)',
            '&:hover': { bgcolor: 'rgba(0,0,0,0.4)' },
          }}
        >
          <ChevronRightIcon />
        </IconButton>

        {/* Pagination dots */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 10,
            left: 0,
            right: 0,
            display: 'flex',
            justifyContent: 'center',
            gap: 1,
          }}
        >
          {HERO_SLIDES.map((s, i) => (
            <Box
              key={s.title}
              onClick={() => setIndex(i)}
              sx={{
                width: 10,
                height: 10,
                borderRadius: '999px',
                cursor: 'pointer',
                background:
                  index === i
                    ? 'linear-gradient(90deg,#3B82F6,#60A5FA)'
                    : 'rgba(255,255,255,0.55)',
                boxShadow:
                  index === i ? '0 6px 18px rgba(59,130,246,0.45)' : 'none',
              }}
            />
          ))}
        </Box>
      </Box>

      {/* Decorative blobs */}
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          right: -48,
          width: 288,
          height: 288,
          borderRadius: '50%',
          background: 'linear-gradient(90deg,#60A5FA,#818CF8)',
          filter: 'blur(48px)',
          opacity: 0.2,
          zIndex: -1,
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: -48,
          left: -48,
          width: 288,
          height: 288,
          borderRadius: '50%',
          background: 'linear-gradient(90deg,#818CF8,#C084FC)',
          filter: 'blur(48px)',
          opacity: 0.2,
          zIndex: -1,
        }}
      />
    </Box>
  );
}

// ---------- Hero stat card ----------
function StatCard({
  value,
  label,
  color,
  bgColor,
  className,
}: {
  value: string;
  label: string;
  color: string;
  bgColor: string;
  className?: string;
}) {
  return (
    <Box
      className={className}
      sx={{
        position: 'relative',
        overflow: 'hidden',
        bgcolor: '#fff',
        borderRadius: { xs: '12px', sm: '16px' },
        p: { xs: 1.5, sm: 3 },
        boxShadow:
          '0 10px 15px -3px rgba(0,0,0,.1), 0 4px 6px -4px rgba(0,0,0,.1)',
        transition: 'all .3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 20px 25px -5px rgba(0,0,0,.1)',
          '& .stat-sweep': { transform: 'translateX(0)' },
          '& .stat-value': { transform: 'scale(1.1)' },
          '& .stat-orb': { transform: 'scale(1.5)' },
        },
        width: '100%',
      }}
    >
      {/* hover sweep */}
      <Box
        className="stat-sweep"
        sx={{
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(90deg,${bgColor},${bgColor})`,
          transform: 'translateX(-101%)',
          transition: 'transform .7s ease',
        }}
      />
      <Box sx={{ position: 'relative', zIndex: 10 }}>
        <Typography
          className="stat-value"
          sx={{
            display: 'block',
            fontSize: { xs: '1.5rem', sm: '2.5rem', lg: '3rem' },
            fontWeight: 700,
            color,
            mb: { xs: 0.25, sm: 1 },
            lineHeight: 1.1,
            transition: 'transform .3s ease',
          }}
        >
          {value}
        </Typography>
        <Typography
          sx={{
            color: '#4b5563',
            fontSize: { xs: '0.75rem', sm: '1rem' },
            fontWeight: 500,
          }}
        >
          {label}
        </Typography>
      </Box>
      <Box
        className="stat-orb"
        sx={{
          position: 'absolute',
          bottom: -16,
          right: -16,
          width: { xs: 48, sm: 80 },
          height: { xs: 48, sm: 80 },
          borderRadius: '50%',
          bgcolor: bgColor,
          opacity: 0.5,
          transition: 'transform .7s ease',
        }}
      />
    </Box>
  );
}

// ---------- Page ----------
export default function LandingPage() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [elevated, setElevated] = useState(false);
  const [impactOpen, setImpactOpen] = useState(false);
  const typed = useTypewriter(SUBJECTS.map((s) => s.name));

  // Navbar scroll effect (original adds shadow-md after 50px)
  useEffect(() => {
    const onScroll = () => setElevated(window.scrollY > 50);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Smooth scroll for anchor links with the original 100px offset
  const scrollToId = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 100;
    window.scrollTo({ top, behavior: 'smooth' });
  }, []);

  const pill = useMemo(
    () => ({
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '999px',
      px: 2,
      py: 1,
      fontWeight: 600,
      fontSize: '0.875rem',
    }),
    []
  );

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          fontFamily: FONT,
          bgcolor: '#f9fafb',
          color: '#1e293b',
          minHeight: '100%',
          overflowX: 'hidden',
        }}
      >
        {/* ================= Navbar ================= */}
        <Box
          component="header"
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 50,
            transition: 'box-shadow .3s ease',
            bgcolor: 'rgba(255,255,255,0.8)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            boxShadow: elevated
              ? '0 4px 6px -1px rgba(0,0,0,.1), 0 2px 4px -2px rgba(0,0,0,.1)'
              : '0 1px 2px 0 rgba(0,0,0,.05)',
          }}
        >
          <Container maxWidth="lg">
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                py: 2,
              }}
            >
              <Link
                href="/"
                style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none' }}
              >
                {/* Original used /assets/images/logo latest.png (not in repo) → old repo logo.svg */}
                <Box
                  component="img"
                  src="/site/students/logo.svg"
                  alt="JUANOVA CORTEX Logo"
                  sx={{
                    height: 40,
                    width: 40,
                    borderRadius: '50%',
                    bgcolor: '#0f172a',
                    objectFit: 'cover',
                    p: 0.5,
                  }}
                />
                <Typography
                  sx={{ fontSize: '1.5rem', fontWeight: 700, color: '#1f2937' }}
                >
                  Fuhademy
                </Typography>
              </Link>

              {/* Desktop links */}
              <Box
                component="ul"
                sx={{
                  display: { xs: 'none', md: 'flex' },
                  alignItems: 'center',
                  gap: 4,
                  listStyle: 'none',
                  m: 0,
                  p: 0,
                  fontWeight: 500,
                  color: '#4b5563',
                }}
              >
                {NAV_LINKS.map((l) => (
                  <Box
                    key={l.id}
                    component="li"
                    onClick={() => scrollToId(l.id)}
                    sx={{ cursor: 'pointer', '&:hover': { color: '#3B82F6' }, transition: 'color .2s' }}
                  >
                    {l.label}
                  </Box>
                ))}
              </Box>

              <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 2 }}>
                <Link
                  href="/general/login/"
                  style={{
                    color: '#3B82F6',
                    fontWeight: 600,
                    textDecoration: 'none',
                  }}
                >
                  Log In
                </Link>
                <Link href="/general/signup/" style={{ textDecoration: 'none' }}>
                  <Button
                    variant="contained"
                    sx={{
                      borderRadius: '999px',
                      px: 3,
                      py: 1,
                      textTransform: 'none',
                      fontWeight: 600,
                      background: 'linear-gradient(135deg,#3B82F6 0%,#2563EB 100%)',
                      boxShadow: '0 4px 20px rgba(37,99,235,.2)',
                      '&:hover': {
                        background: 'linear-gradient(135deg,#2563EB 0%,#1D4ED8 100%)',
                      },
                    }}
                  >
                    Get Started Free
                  </Button>
                </Link>
              </Box>

              {/* Mobile hamburger */}
              <IconButton
                aria-label="Open Menu"
                onClick={() => setMobileOpen((o) => !o)}
                sx={{ display: { md: 'none' }, zIndex: 50, color: '#374151' }}
              >
                {mobileOpen ? <CloseIcon fontSize="medium" /> : <MenuIcon fontSize="medium" />}
              </IconButton>
            </Box>
          </Container>

          {/* Mobile menu */}
          <Collapse in={mobileOpen} sx={{ display: { md: 'none' } }}>
            <Box
              sx={{
                bgcolor: '#fff',
                px: 2,
                pb: 2,
                borderTop: '1px solid #e5e7eb',
              }}
            >
              <Box
                component="ul"
                sx={{
                  listStyle: 'none',
                  m: 0,
                  p: 0,
                  mt: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 2,
                  fontWeight: 500,
                  color: '#4b5563',
                }}
              >
                {NAV_LINKS.map((l) => (
                  <Box
                    key={l.id}
                    component="li"
                    onClick={() => {
                      setMobileOpen(false);
                      // let the menu close first
                      window.setTimeout(() => scrollToId(l.id), 50);
                    }}
                    sx={{ cursor: 'pointer', '&:hover': { color: '#3B82F6' } }}
                  >
                    {l.label}
                  </Box>
                ))}
              </Box>
              <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Link href="/general/login/" style={{ textDecoration: 'none' }}>
                  <Button
                    fullWidth
                    variant="outlined"
                    sx={{
                      borderRadius: '999px',
                      py: 1,
                      px: 2,
                      borderColor: '#3B82F6',
                      color: '#3B82F6',
                      fontWeight: 600,
                      textTransform: 'none',
                      '&:hover': { bgcolor: '#eff6ff' },
                    }}
                  >
                    Log In
                  </Button>
                </Link>
                <Link href="/general/signup/" style={{ textDecoration: 'none' }}>
                  <Button
                    fullWidth
                    variant="contained"
                    sx={{
                      borderRadius: '999px',
                      py: 1,
                      px: 2,
                      fontWeight: 600,
                      textTransform: 'none',
                      background: 'linear-gradient(135deg,#3B82F6 0%,#2563EB 100%)',
                    }}
                  >
                    Get Started Free
                  </Button>
                </Link>
              </Box>
            </Box>
          </Collapse>
        </Box>

        {/* ================= Hero ================= */}
        <Box
          component="section"
          id="hero"
          sx={{
            position: 'relative',
            width: '100%',
            overflow: 'hidden',
            background: 'linear-gradient(to bottom,#f9fafb,#ffffff)',
            pt: { xs: '88px', sm: '104px' },
          }}
        >
          {/* faint dotted grid like the original bg-grid-pattern */}
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              opacity: 0.02,
              pointerEvents: 'none',
              backgroundImage: 'radial-gradient(#1e293b 1px, transparent 1px)',
              backgroundSize: '22px 22px',
            }}
          />
          <Box
            sx={{
              px: { xs: 1, sm: 2, lg: 4 },
              py: { xs: 6, sm: 7 },
              mx: 'auto',
              maxWidth: 1280,
            }}
          >
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', lg: '1fr 520px' },
                gap: { xs: 1, sm: 4 },
                alignItems: 'start',
              }}
            >
              {/* Left column */}
              <FadeIn sx={{ p: { xs: 0.5, sm: 0 } }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 3, sm: 4 } }}>
                  {/* UNESCO alert */}
                  <Box
                    sx={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      alignSelf: 'flex-start',
                      background: 'linear-gradient(90deg,#fef2f2,#fee2e2)',
                      border: '1px solid #fecaca',
                      borderRadius: '999px',
                      py: 1,
                      px: { xs: 1.5, sm: 2 },
                      maxWidth: '100%',
                    }}
                  >
                    <Box
                      sx={{
                        flexShrink: 0,
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        bgcolor: '#ef4444',
                        mr: 1,
                        animation: 'heroPulse 2s ease-in-out infinite',
                        '@keyframes heroPulse': {
                          '0%,100%': { opacity: 1, transform: 'scale(1)' },
                          '50%': { opacity: 0.55, transform: 'scale(1.25)' },
                        },
                      }}
                    />
                    <Typography
                      sx={{
                        color: '#dc2626',
                        fontWeight: 500,
                        fontSize: { xs: '0.75rem', sm: '0.875rem' },
                      }}
                    >
                      UNESCO Global Education Report: According to UNESCO, Sub-Saharan Africa has the highest rate of education exclusion in the world.
                    </Typography>
                  </Box>

                  <Typography
                    variant="h1"
                    sx={{
                      fontSize: { xs: '1.25rem', sm: '1.5rem', md: '1.875rem', lg: '2.25rem' },
                      fontWeight: 700,
                      color: '#111827',
                      lineHeight: 1.25,
                      m: 0,
                    }}
                  >
                    Let&rsquo;s Change The
                    <Box
                      component="span"
                      sx={{ position: 'relative', display: 'block', mt: 1 }}
                    >
                      <Box component="span" sx={{ ...GRADIENT_TEXT, display: 'inline-block' }}>
                        Story Together
                      </Box>
                      <svg
                        style={{
                          position: 'absolute',
                          bottom: 0,
                          left: 0,
                          width: '100%',
                          height: 12,
                          marginBottom: -4,
                          opacity: 0.3,
                        }}
                        viewBox="0 0 300 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M3 9C100.015 4.01984 197.03 4.01984 294.045 9"
                          stroke="#4F46E5"
                          strokeWidth="6"
                          strokeLinecap="round"
                        />
                      </svg>
                    </Box>
                  </Typography>

                  {/* Typed rotating line (Typed.js equivalent) */}
                  <Typography
                    aria-hidden
                    sx={{
                      fontWeight: 700,
                      fontSize: { xs: '1.05rem', sm: '1.25rem' },
                      color: '#2563EB',
                      mt: -1.5,
                      minHeight: '1.6em',
                    }}
                  >
                    Master{' '}
                    <Box component="span" sx={GRADIENT_TEXT}>
                      {typed}
                    </Box>
                    <Box
                      component="span"
                      sx={{
                        display: 'inline-block',
                        width: 2,
                        height: '1em',
                        bgcolor: '#4F46E5',
                        ml: 0.25,
                        verticalAlign: '-0.12em',
                        animation: 'caretBlink 1s step-end infinite',
                        '@keyframes caretBlink': {
                          '0%,100%': { opacity: 1 },
                          '50%': { opacity: 0 },
                        },
                      }}
                    />
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: { xs: '1rem', sm: '1.125rem' },
                      color: '#4b5563',
                      maxWidth: 640,
                    }}
                  >
                    Sub-Saharan Africa faces the world&rsquo;s highest education exclusion rate. We&rsquo;re transforming this challenge into an opportunity through AI-powered learning that&rsquo;s accessible to all. Join our mission to build Africa&rsquo;s future leaders.
                  </Typography>

                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: { xs: 'column', sm: 'row' },
                      gap: { xs: 1, sm: 2 },
                      width: '100%',
                    }}
                  >
                    {/* Migration spec: primary hero CTA enters the demo student dashboard */}
                    <Link href="/students/student-dashboard/" style={{ textDecoration: 'none' }}>
                      <Button
                        fullWidth
                        endIcon={<ArrowForwardIcon />}
                        sx={{
                          px: { xs: 3, sm: 4 },
                          py: { xs: 1.5, sm: 2 },
                          borderRadius: '999px',
                          color: '#fff',
                          fontWeight: 600,
                          fontSize: { xs: '0.875rem', sm: '1rem' },
                          textTransform: 'none',
                          background: 'linear-gradient(90deg,#2563EB 0%,#4F46E5 100%)',
                          '&:hover': {
                            background: 'linear-gradient(90deg,#1D4ED8 0%,#4338CA 100%)',
                            boxShadow: '0 10px 15px -3px rgba(0,0,0,.1)',
                          },
                          transition: 'all .3s ease',
                        }}
                      >
                        Start Learning Now
                      </Button>
                    </Link>
                    <Button
                      fullWidth
                      startIcon={<TrendingUpIcon />}
                      onClick={() => setImpactOpen(true)}
                      sx={{
                        px: { xs: 3, sm: 4 },
                        py: { xs: 1.5, sm: 2 },
                        borderRadius: '999px',
                        bgcolor: '#fff',
                        border: '1px solid #e5e7eb',
                        color: '#4b5563',
                        fontWeight: 600,
                        fontSize: { xs: '0.875rem', sm: '1rem' },
                        textTransform: 'none',
                        '&:hover': {
                          borderColor: '#93c5fd',
                          color: '#2563eb',
                          bgcolor: '#fff',
                        },
                        transition: 'all .3s ease',
                      }}
                    >
                      Discover Our Impact
                    </Button>
                  </Box>

                  {/* Stats grid + teacher CTA */}
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 3, sm: 5 } }}>
                    <Box
                      sx={{
                        display: 'grid',
                        gridTemplateColumns: { xs: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
                        gap: { xs: 1.5, sm: 3 },
                        maxWidth: { xs: 480, md: 'none' },
                        mx: 'auto',
                        width: '100%',
                      }}
                    >
                      <StatCard
                        value="95%"
                        label="Pass Rate"
                        color="#2563eb"
                        bgColor="rgba(59,130,246,0.08)"
                      />
                      <StatCard
                        value="24/7"
                        label="AI-Powered Support"
                        color="#9333ea"
                        bgColor="rgba(147,51,234,0.08)"
                      />
                      <StatCard
                        value="100+"
                        label="Expert Tutors"
                        color="#16a34a"
                        bgColor="rgba(22,163,74,0.08)"
                        className="stat-card-third"
                      />
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                      <Link
                        href="/teachers/teacher-confirmation/"
                        style={{ textDecoration: 'none' }}
                      >
                        <Box
                          sx={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 1.5,
                            color: '#4b5563',
                            fontSize: '1.05rem',
                            '&:hover': { color: '#2563eb', transform: 'translateY(-2px)' },
                            transition: 'all .3s ease',
                          }}
                        >
                          <CoPresentIcon sx={{ color: '#3B82F6' }} />
                          <Typography component="span" sx={{ fontWeight: 500, fontSize: '1.05rem', color: 'inherit' }}>
                            Are you a teacher?
                          </Typography>
                          <Typography
                            component="span"
                            sx={{
                              color: '#2563eb',
                              fontWeight: 500,
                              fontSize: '1.05rem',
                              display: 'inline-flex',
                              alignItems: 'center',
                            }}
                          >
                            Click here to get started
                            <ArrowRightIcon sx={{ ml: 1 }} />
                          </Typography>
                        </Box>
                      </Link>
                    </Box>
                  </Box>
                </Box>
              </FadeIn>

              {/* Right column: carousel */}
              <FadeIn delay={150}>
                <HeroCarousel />
              </FadeIn>
            </Box>
          </Box>
        </Box>

        {/* ================= Timeline / Roadmap ================= */}
        <Box component="section" id="timeline" sx={{ py: 8, bgcolor: '#f9fafb' }}>
          <FadeIn>
            <Box sx={{ textAlign: 'center', mb: 6, px: 2 }}>
              <Typography sx={{ color: '#3B82F6', fontWeight: 600, letterSpacing: 1 }}>
                ROADMAP
              </Typography>
              <Typography
                variant="h2"
                sx={{
                  fontSize: { xs: '1.875rem', md: '2.25rem' },
                  fontWeight: 700,
                  color: '#1f2937',
                  mt: 1,
                }}
              >
                How FUHADEMY Works
              </Typography>
              <Typography
                sx={{
                  color: '#4b5563',
                  maxWidth: 640,
                  mx: 'auto',
                  mt: 1,
                }}
              >
                A simple path from onboarding to exam success — personalized learning, practice, and progress tracking.
              </Typography>
            </Box>

            {/* horizontal line with 3 events */}
            <Box sx={{ position: 'relative', maxWidth: 1100, mx: 'auto', px: 2 }}>
              <Box
                sx={{
                  display: { xs: 'none', md: 'block' },
                  position: 'absolute',
                  top: 7,
                  left: '8%',
                  right: '8%',
                  height: 2,
                  background: 'linear-gradient(90deg,#93c5fd,#6366F1,#93c5fd)',
                  opacity: 0.6,
                }}
              />
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
                  gap: { xs: 4, md: 6 },
                  textAlign: { xs: 'left', md: 'center' },
                }}
              >
                {TIMELINE.map((ev) => (
                  <Box key={ev.title} sx={{ position: 'relative', pt: { md: 4 } }}>
                    <Box
                      sx={{
                        width: 16,
                        height: 16,
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg,#3B82F6,#2563EB)',
                        border: '3px solid #fff',
                        boxShadow: '0 0 0 3px rgba(59,130,246,.35)',
                        mb: 2,
                        display: { md: 'inline-block' },
                      }}
                    />
                    <Typography
                      variant="h4"
                      sx={{ fontWeight: 600, fontSize: '1.125rem', color: '#1f2937' }}
                    >
                      {ev.title}
                    </Typography>
                    <Typography
                      sx={{ color: '#6b7280', mt: 1, fontSize: '0.95rem', lineHeight: 1.6 }}
                    >
                      {ev.text}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </FadeIn>
        </Box>

        {/* ================= Features ================= */}
        <Box component="section" id="features" sx={{ py: 10, bgcolor: '#fff' }}>
          <Container maxWidth="lg">
            <FadeIn>
              <Box sx={{ textAlign: 'center', maxWidth: 720, mx: 'auto', mb: 8 }}>
                <Box sx={{ ...pill, bgcolor: '#dbeafe', color: '#2563eb', display: 'inline-flex', mb: 2 }}>
                  <StarIcon sx={{ fontSize: 18, mr: 1 }} />
                  OUR FEATURES
                </Box>
                <Typography
                  variant="h2"
                  sx={{
                    fontSize: { xs: '1.875rem', md: '2.25rem' },
                    fontWeight: 700,
                    ...GRADIENT_TEXT,
                    mt: 1,
                    mb: 2,
                  }}
                >
                  Everything You Need to Succeed
                </Typography>
                <Typography sx={{ fontSize: '1.125rem', color: '#4b5563' }}>
                  A complete toolkit to help you master any subject and ace your exams with confidence.
                </Typography>
              </Box>
            </FadeIn>

            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: 'repeat(2,1fr)', lg: 'repeat(3,1fr)' },
                gap: 4,
              }}
            >
              {FEATURES.map((f, i) => {
                const Icon = f.icon;
                return (
                  <FadeIn key={f.title} delay={i * 100}>
                    <Box
                      sx={{
                        borderRadius: '16px',
                        p: 3,
                        minHeight: 220,
                        display: 'flex',
                        flexDirection: 'column',
                        bgcolor: '#fff',
                        border: '1px solid #f1f5f9',
                        boxShadow: '0 12px 30px rgba(16,24,40,0.04)',
                        transition: 'all .25s ease',
                        height: '100%',
                        '&:hover': {
                          transform: 'translateY(-6px)',
                          boxShadow: '0 20px 48px rgba(16,24,40,0.08)',
                          borderColor: f.hoverBorder,
                          '& .feature-icon': { transform: 'scale(1.1)' },
                          '& .feature-title': { color: f.hoverColor },
                        },
                      }}
                    >
                      <Box
                        className="feature-icon"
                        sx={{
                          width: 56,
                          height: 56,
                          borderRadius: '12px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          bgcolor: f.bg,
                          color: f.color,
                          mb: 2,
                          transition: 'transform .25s ease',
                        }}
                      >
                        <Icon sx={{ fontSize: 28 }} />
                      </Box>
                      <Typography
                        className="feature-title"
                        variant="h3"
                        sx={{
                          fontSize: '1.25rem',
                          fontWeight: 700,
                          color: '#1f2937',
                          mb: 1.5,
                          transition: 'color .25s ease',
                        }}
                      >
                        {f.title}
                      </Typography>
                      <Typography sx={{ color: '#4b5563', lineHeight: 1.6 }}>
                        {f.text}
                      </Typography>
                    </Box>
                  </FadeIn>
                );
              })}
            </Box>
          </Container>
        </Box>

        {/* ================= Subjects ================= */}
        <Box
          component="section"
          id="subjects"
          sx={{ py: 10, background: 'linear-gradient(to bottom,#f9fafb,#ffffff)' }}
        >
          <Container maxWidth="lg">
            <FadeIn>
              <Box sx={{ textAlign: 'center', maxWidth: 720, mx: 'auto', mb: 8 }}>
                <Box sx={{ ...pill, bgcolor: '#e0e7ff', color: '#4f46e5', display: 'inline-flex', mb: 2 }}>
                  ALL SUBJECTS
                </Box>
                <Typography
                  variant="h2"
                  sx={{
                    fontSize: { xs: '1.875rem', md: '2.25rem' },
                    fontWeight: 700,
                    background: 'linear-gradient(90deg,#4F46E5 0%,#2563EB 100%)',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    mt: 1,
                    mb: 2,
                  }}
                >
                  Master Your Core Subjects
                </Typography>
                <Typography sx={{ fontSize: '1.125rem', color: '#4b5563' }}>
                  From sciences to arts, we&rsquo;ve got you covered with expert-curated content for all your exam needs.
                </Typography>
              </Box>
            </FadeIn>

            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: 'repeat(2,1fr)', md: 'repeat(4,1fr)' },
                gap: 3,
                maxWidth: 1152,
                mx: 'auto',
              }}
            >
              {SUBJECTS.map((s, i) => {
                const Icon = s.icon;
                return (
                  <FadeIn key={s.name} delay={i * 50} sx={{ height: '100%' }}>
                    <Link href={s.href} style={{ textDecoration: 'none', height: '100%' }}>
                      <Box
                        sx={{
                          bgcolor: '#fff',
                          p: 3,
                          borderRadius: '16px',
                          boxShadow:
                            '0 10px 15px -3px rgba(0,0,0,.1), 0 4px 6px -4px rgba(0,0,0,.1)',
                          border: '1px solid #f1f5f9',
                          height: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          textAlign: 'center',
                          transition: 'all .3s ease',
                          '&:hover': {
                            boxShadow: '0 20px 25px -5px rgba(0,0,0,.1)',
                            borderColor: s.border,
                            '& .subject-icon': { bgcolor: s.hoverBg },
                          },
                        }}
                      >
                        <Box
                          className="subject-icon"
                          sx={{
                            width: 64,
                            height: 64,
                            bgcolor: s.bg,
                            borderRadius: '16px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mb: 2,
                            transition: 'background-color .3s ease',
                          }}
                        >
                          <Icon sx={{ fontSize: 28, color: s.color }} />
                        </Box>
                        <Typography
                          variant="h3"
                          sx={{ fontWeight: 700, color: '#1f2937', mb: 1, fontSize: '1rem' }}
                        >
                          {s.name}
                        </Typography>
                        <Typography sx={{ fontSize: '0.875rem', color: '#6b7280' }}>
                          {s.tagline}
                        </Typography>
                      </Box>
                    </Link>
                  </FadeIn>
                );
              })}
            </Box>
          </Container>
        </Box>

        {/* ================= Programmer ================= */}
        <Box
          component="section"
          id="programmer"
          sx={{ py: 10, background: 'linear-gradient(to bottom,#f9fafb,#ffffff)' }}
        >
          <Container maxWidth="lg">
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 6,
                maxWidth: 1280,
                mx: 'auto',
              }}
            >
              {/* Left */}
              <FadeIn sx={{ flex: 1 }}>
                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3, flexWrap: 'wrap' }}>
                    <Typography
                      variant="h1"
                      sx={{
                        fontSize: { xs: '2rem', md: '2.75rem', lg: '3.25rem' },
                        fontWeight: 700,
                        color: '#111827',
                        m: 0,
                      }}
                    >
                      Meet{' '}
                      <Box component="span" sx={{ color: '#4f46e5' }}>
                        Our Programmer
                      </Box>
                    </Typography>
                    <Box
                      sx={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        px: 1.5,
                        py: 0.5,
                        borderRadius: '999px',
                        bgcolor: '#dcfce7',
                        color: '#15803d',
                      }}
                    >
                      <Box
                        sx={{
                          width: 8,
                          height: 8,
                          borderRadius: '50%',
                          bgcolor: '#22c55e',
                          mr: 1,
                        }}
                      />
                      Online Now
                    </Box>
                  </Box>

                  <Typography
                    variant="h2"
                    sx={{ fontSize: { xs: '1.5rem', md: '1.875rem' }, fontWeight: 700, color: '#374151', mb: 4 }}
                  >
                    The Mind Behind FUHADEMY
                  </Typography>

                  <Typography sx={{ fontSize: '1.125rem', color: '#4b5563', mb: 3 }}>
                    Visionary EdTech Founder &amp; Innovation Leader dedicated to revolutionizing education in Africa through cutting-edge technology and accessible learning solutions.
                  </Typography>

                  <Typography sx={{ fontSize: '1.125rem', color: '#4b5563', mb: 4 }}>
                    Driven by a passion for educational transformation, I combine entrepreneurial leadership with technological expertise to create scalable platforms that democratize quality education across Nigeria and beyond.
                  </Typography>

                  {/* Bio + skills */}
                  <Box
                    sx={{
                      display: 'grid',
                      gridTemplateColumns: { xs: '1fr', md: 'repeat(2,1fr)' },
                      gap: 3,
                      mb: 4,
                    }}
                  >
                    <Box
                      sx={{
                        bgcolor: '#fff',
                        p: 2,
                        borderRadius: '12px',
                        boxShadow: '0 1px 2px rgba(0,0,0,.05)',
                        border: '1px solid #f1f5f9',
                      }}
                    >
                      <Box
                        sx={{
                          display: 'grid',
                          gridTemplateColumns: 'repeat(2,1fr)',
                          gap: 1.5,
                          fontSize: '0.875rem',
                          color: '#4b5563',
                        }}
                      >
                        <Box sx={{ gridColumn: 'span 2', mb: 1 }}>
                          <AccountCircleIcon sx={{ fontSize: 20, mr: 1, verticalAlign: '-4px', color: '#4f46e5' }} />
                          <Typography component="span" sx={{ fontWeight: 600 }}>
                            Abdlrazaq Fuhad Desmond
                          </Typography>
                        </Box>
                        <Box>
                          <CalendarMonthIcon sx={{ fontSize: 18, mr: 1, verticalAlign: '-3px', color: '#2563eb' }} />
                          Oct 7, 2010
                        </Box>
                        <Box>
                          <PersonIcon sx={{ fontSize: 18, mr: 1, verticalAlign: '-3px', color: '#16a34a' }} />
                          Age: 16
                        </Box>
                        <Box>
                          <WcIcon sx={{ fontSize: 18, mr: 1, verticalAlign: '-3px', color: '#9333ea' }} />
                          Male
                        </Box>
                        <Box>
                          <SelfImprovementIcon sx={{ fontSize: 18, mr: 1, verticalAlign: '-3px', color: '#0d9488' }} />
                          Muslim
                        </Box>
                        <Box sx={{ gridColumn: 'span 2' }}>
                          <SchoolIcon sx={{ fontSize: 18, mr: 1, verticalAlign: '-3px', color: '#ea580c' }} />
                          Secoary school graduate
                        </Box>
                        <Box sx={{ gridColumn: 'span 2' }}>
                          <SchoolIcon sx={{ fontSize: 18, mr: 1, verticalAlign: '-3px', color: '#ea580c' }} />
                          Secoary School Leaving Year: 2026
                        </Box>
                      </Box>
                    </Box>

                    <Box
                      sx={{
                        bgcolor: '#fff',
                        p: 2,
                        borderRadius: '12px',
                        boxShadow: '0 1px 2px rgba(0,0,0,.05)',
                        border: '1px solid #f1f5f9',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                      }}
                    >
                      <Box>
                        <Typography sx={{ fontWeight: 600, color: '#1f2937', mb: 0.5, display: 'flex', alignItems: 'center' }}>
                          <MemoryIcon sx={{ fontSize: 18, mr: 1, color: '#4f46e5' }} />
                          Technical
                        </Typography>
                        <Typography sx={{ color: '#4b5563', fontSize: '0.875rem' }}>
                          Robotics, AI, Programming
                        </Typography>
                      </Box>
                      <Box>
                        <Typography sx={{ fontWeight: 600, color: '#1f2937', mb: 0.5, display: 'flex', alignItems: 'center' }}>
                          <LightbulbIcon sx={{ fontSize: 18, mr: 1, color: '#16a34a' }} />
                          Entrepreneurial
                        </Typography>
                        <Typography sx={{ color: '#4b5563', fontSize: '0.875rem' }}>
                          Visionary Thinking, Solution Building, Knowledge-seeking
                        </Typography>
                      </Box>
                      <Box>
                        <Typography sx={{ fontWeight: 600, color: '#1f2937', mb: 0.5, display: 'flex', alignItems: 'center' }}>
                          <GroupsIcon sx={{ fontSize: 18, mr: 1, color: '#2563eb' }} />
                          Leadership
                        </Typography>
                        <Typography sx={{ color: '#4b5563', fontSize: '0.875rem' }}>
                          Clarity, Persistence, Purpose-driven, Bold Thinking
                        </Typography>
                      </Box>
                    </Box>
                  </Box>

                  {/* Innovation & prayer */}
                  <Box
                    sx={{
                      background: 'linear-gradient(90deg,#6366F1 0%,#2563EB 100%)',
                      p: 2,
                      borderRadius: '12px',
                      boxShadow: '0 1px 2px rgba(0,0,0,.05)',
                      mb: 4,
                      color: '#fff',
                    }}
                  >
                    <Box sx={{ mb: 1.5 }}>
                      <Typography sx={{ fontWeight: 600, display: 'flex', alignItems: 'center', mb: 1 }}>
                        <RocketLaunchIcon sx={{ fontSize: 18, mr: 1 }} />
                        Innovation Focus
                      </Typography>
                      <Typography sx={{ fontSize: '0.875rem', opacity: 0.9 }}>
                        Humanoid Robots • EdTech Platforms • Engineering
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2, flexWrap: 'wrap' }}>
                      <Typography sx={{ fontSize: '0.875rem', opacity: 0.9, display: 'flex', alignItems: 'center' }}>
                        <StarIcon sx={{ fontSize: 16, mr: 1 }} />
                        Role Model: Elon Musk
                      </Typography>
                      <Typography sx={{ fontSize: '0.875rem', fontStyle: 'italic' }}>
                        &ldquo;By the grace of Allah, revolutionizing education&rdquo;
                      </Typography>
                    </Box>
                  </Box>

                  {/* Social */}
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <Tooltip title="github.com/Fuhad-Lab">
                      <IconButton
                        aria-label="GitHub"
                        href="https://github.com/Fuhad-Lab"
                        target="_blank"
                        rel="noopener"
                        sx={{
                          width: 48,
                          height: 48,
                          borderRadius: '50%',
                          bgcolor: '#f3f4f6',
                          color: '#4b5563',
                          '&:hover': { bgcolor: '#e0e7ff', color: '#4f46e5' },
                        }}
                      >
                        <GitHubIcon />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Box>
              </FadeIn>

              {/* Right — portrait placeholder (original fuhad.jpg not present in repo) */}
              <FadeIn delay={150} sx={{ flex: 1, width: '100%' }}>
                <Box
                  sx={{
                    background: 'linear-gradient(135deg,#f3f4f6,#ffffff)',
                    p: 3,
                    borderRadius: '24px',
                    boxShadow:
                      '0 20px 25px -5px rgba(0,0,0,.1), 0 8px 10px -6px rgba(0,0,0,.1)',
                  }}
                >
                  <Box
                    sx={{
                      height: { xs: 340, md: 500 },
                      borderRadius: '16px',
                      boxShadow: '0 10px 15px -3px rgba(0,0,0,.1)',
                      background: 'linear-gradient(160deg,#e0e7ff 0%,#dbeafe 50%,#ede9fe 100%)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 2,
                      color: '#6366f1',
                    }}
                  >
                    <AccountCircleIcon sx={{ fontSize: 120, opacity: 0.75 }} />
                    <Typography sx={{ fontWeight: 600, color: '#4f46e5' }}>
                      Abdlrazaq Fuhad Desmond
                    </Typography>
                    <Typography sx={{ fontSize: '0.875rem', color: '#6b7280' }}>
                      Visionary EdTech Founder
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(2,1fr)',
                      gap: 2,
                      mt: 3,
                    }}
                  >
                    <Box
                      sx={{
                        bgcolor: 'rgba(255,255,255,0.9)',
                        backdropFilter: 'blur(4px)',
                        p: 2,
                        borderRadius: '12px',
                        boxShadow: '0 10px 15px -3px rgba(0,0,0,.1)',
                      }}
                    >
                      <Typography sx={{ fontSize: '1.5rem', fontWeight: 700, color: '#4f46e5', mb: 0.5 }}>
                        Vision
                      </Typography>
                      <Typography sx={{ color: '#4b5563', fontSize: '0.875rem' }}>
                        EdTech Pioneer
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        bgcolor: 'rgba(255,255,255,0.9)',
                        backdropFilter: 'blur(4px)',
                        p: 2,
                        borderRadius: '12px',
                        boxShadow: '0 10px 15px -3px rgba(0,0,0,.1)',
                      }}
                    >
                      <Typography sx={{ fontSize: '1.5rem', fontWeight: 700, color: '#16a34a', mb: 0.5 }}>
                        Purpose
                      </Typography>
                      <Typography sx={{ color: '#4b5563', fontSize: '0.875rem' }}>
                        Impact Driven
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </FadeIn>
            </Box>
          </Container>
        </Box>

        {/* ================= Testimonials ================= */}
        <Box component="section" id="testimonials" sx={{ py: 10, bgcolor: '#fff' }}>
          <Container maxWidth="lg">
            <FadeIn>
              <Box sx={{ textAlign: 'center', maxWidth: 720, mx: 'auto', mb: 4 }}>
                <Typography sx={{ color: '#3B82F6', fontWeight: 600, letterSpacing: 1 }}>
                  TESTIMONIALS
                </Typography>
                <Typography
                  variant="h2"
                  sx={{
                    fontSize: { xs: '1.875rem', md: '2.25rem' },
                    fontWeight: 700,
                    color: '#1f2937',
                    mt: 1,
                    mb: 2,
                  }}
                >
                  What Our Students Say
                </Typography>
                <Typography sx={{ fontSize: '1.125rem', color: '#4b5563' }}>
                  Real stories from students who have transformed their grades with our platform.
                </Typography>
              </Box>
              {/* Original site shows the empty state */}
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  py: 6,
                }}
              >
                <Box sx={{ textAlign: 'center' }}>
                  <CommentIcon sx={{ fontSize: 40, color: '#d1d5db', mb: 2 }} />
                  <Typography sx={{ fontSize: '1.125rem', color: '#6b7280' }}>
                    No comments yet
                  </Typography>
                </Box>
              </Box>
            </FadeIn>
          </Container>
        </Box>

        {/* ================= FAQ ================= */}
        <Box component="section" id="faq" sx={{ py: 10, bgcolor: '#f9fafb' }}>
          <Container maxWidth="lg">
            <FadeIn>
              <Box sx={{ textAlign: 'center', maxWidth: 720, mx: 'auto', mb: 8 }}>
                <Typography sx={{ color: '#3B82F6', fontWeight: 600, letterSpacing: 1 }}>
                  QUESTIONS?
                </Typography>
                <Typography
                  variant="h2"
                  sx={{
                    fontSize: { xs: '1.875rem', md: '2.25rem' },
                    fontWeight: 700,
                    color: '#1f2937',
                    mt: 1,
                    mb: 2,
                  }}
                >
                  Frequently Asked Questions
                </Typography>
                <Typography sx={{ fontSize: '1.125rem', color: '#4b5563' }}>
                  Have questions? We&rsquo;ve got answers. If you can&rsquo;t find what you&rsquo;re looking for, feel free to contact us.
                </Typography>
              </Box>

              <Box sx={{ maxWidth: 768, mx: 'auto', display: 'flex', flexDirection: 'column', gap: 2 }}>
                {FAQS.map((f) => (
                  <Accordion
                    key={f.q}
                    disableGutters
                    elevation={0}
                    sx={{
                      bgcolor: '#fff',
                      borderRadius: '8px !important',
                      boxShadow: '0 1px 2px rgba(0,0,0,.06)',
                      border: '1px solid #f1f5f9',
                      overflow: 'hidden',
                      '&:before': { display: 'none' },
                    }}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      sx={{
                        px: 3,
                        py: 1,
                        '& .MuiAccordionSummary-content': { my: 2 },
                      }}
                    >
                      <Typography sx={{ fontSize: '1.125rem', fontWeight: 600, color: '#1f2937' }}>
                        {f.q}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ px: 3, pt: 0, pb: 3 }}>
                      <Typography sx={{ color: '#4b5563', lineHeight: 1.7 }}>{f.a}</Typography>
                    </AccordionDetails>
                  </Accordion>
                ))}
              </Box>
            </FadeIn>
          </Container>
        </Box>

        {/* ================= CTA ================= */}
        <Box
          component="section"
          sx={{ py: 10, bgcolor: '#3B82F6', color: '#fff', textAlign: 'center' }}
        >
          <Container maxWidth="lg">
            <FadeIn>
              <Typography
                variant="h2"
                sx={{
                  fontSize: { xs: '1.875rem', md: '2.25rem' },
                  fontWeight: 700,
                  mb: 2,
                }}
              >
                Ready to Achieve Your Best Scores?
              </Typography>
              <Typography
                sx={{
                  fontSize: { xs: '1.125rem', md: '1.25rem' },
                  maxWidth: 768,
                  mx: 'auto',
                  mb: 4,
                }}
              >
                Join thousands of successful students and start your journey to exam excellence today. Your future is just a click away.
              </Typography>
              <Link href="/general/signup/" style={{ textDecoration: 'none' }}>
                <Button
                  sx={{
                    bgcolor: '#fff',
                    color: '#3B82F6',
                    px: 4,
                    py: 1.5,
                    borderRadius: '50px',
                    fontWeight: 600,
                    fontSize: '1.125rem',
                    textTransform: 'none',
                    '&:hover': { bgcolor: '#f3f4f6' },
                  }}
                >
                  Get Started For Free
                </Button>
              </Link>
            </FadeIn>
          </Container>
        </Box>

        {/* ================= Footer ================= */}
        <Box component="footer" sx={{ bgcolor: '#1f2937', color: '#fff' }}>
          <Container maxWidth="lg" sx={{ py: 10 }}>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: 'repeat(4,1fr)' },
                gap: 4,
              }}
            >
              <Box sx={{ gridColumn: { md: 'span 1' } }}>
                <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none', marginBottom: 16 }}>
                  <Box
                    component="img"
                    src="/site/students/logo.svg"
                    alt="JUANOVA CORTEX Logo"
                    sx={{
                      height: 40,
                      width: 40,
                      borderRadius: '50%',
                      bgcolor: '#0f172a',
                      objectFit: 'cover',
                      p: 0.5,
                    }}
                  />
                  <Typography sx={{ fontSize: '1.25rem', fontWeight: 700 }}>
                    FUHADEMY
                  </Typography>
                </Link>
                <Typography sx={{ color: '#9ca3af' }}>
                  Your AI-powered partner for academic success.
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
                  {[
                    { icon: FacebookIcon, label: 'Facebook' },
                    { icon: TwitterIcon, label: 'Twitter' },
                    { icon: InstagramIcon, label: 'Instagram' },
                    { icon: LinkedInIcon, label: 'LinkedIn' },
                  ].map(({ icon: SocialIcon, label }) => (
                    <IconButton
                      key={label}
                      aria-label={label}
                      href="#"
                      size="small"
                      sx={{
                        color: '#9ca3af',
                        '&:hover': { color: '#fff' },
                      }}
                    >
                      <SocialIcon fontSize="small" />
                    </IconButton>
                  ))}
                </Box>
              </Box>

              {[
                {
                  title: 'Quick Links',
                  links: [
                    { label: 'Features', href: '#features', anchor: true },
                    { label: 'Subjects', href: '#subjects', anchor: true },
                    { label: 'Log In', href: '/general/login/' },
                    { label: 'Sign Up', href: '/general/signup/' },
                    { label: 'Teacher Portal', href: '/teachers/teacher-confirmation/' },
                  ],
                },
                {
                  title: 'Resources',
                  links: [
                    { label: 'Blog', href: '#' },
                    { label: 'FAQ', href: '#faq', anchor: true },
                    { label: 'Help Center', href: '#' },
                  ],
                },
                {
                  title: 'Legal',
                  links: [
                    { label: 'Terms of Service', href: '#' },
                    { label: 'Privacy Policy', href: '#' },
                  ],
                },
              ].map((col) => (
                <Box key={col.title}>
                  <Typography variant="h3" sx={{ fontWeight: 700, fontSize: '1.125rem', mb: 2 }}>
                    {col.title}
                  </Typography>
                  <Box
                    component="ul"
                    sx={{
                      listStyle: 'none',
                      m: 0,
                      p: 0,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 1,
                      color: '#9ca3af',
                    }}
                  >
                    {col.links.map((l) => {
                      const handleClick = l.anchor
                        ? (e: React.MouseEvent) => {
                            e.preventDefault();
                            const id = (l.href as string).slice(1);
                            const el = document.getElementById(id);
                            if (el) {
                              window.scrollTo({
                                top: el.getBoundingClientRect().top + window.scrollY - 100,
                                behavior: 'smooth',
                              });
                            }
                          }
                        : undefined;
                      return (
                        <Box
                          key={l.label}
                          component={l.href.startsWith('#') ? 'a' : Link}
                          {...(l.href.startsWith('#')
                            ? { href: l.href, onClick: handleClick }
                            : { href: l.href })}
                          sx={{
                            color: '#9ca3af',
                            textDecoration: 'none',
                            cursor: 'pointer',
                            '&:hover': { color: '#fff' },
                            transition: 'color .2s',
                          }}
                        >
                          {l.label}
                        </Box>
                      );
                    })}
                  </Box>
                </Box>
              ))}
            </Box>

            <Box
              sx={{
                mt: 6,
                borderTop: '1px solid #374151',
                pt: 4,
                textAlign: 'center',
                color: '#6b7280',
              }}
            >
              <Typography>&copy; 2026 FUHADEMY. All Rights Reserved.</Typography>
            </Box>
          </Container>
        </Box>

        {/* ================= Impact Modal ================= */}
        <Modal open={impactOpen} onClose={() => setImpactOpen(false)} aria-labelledby="impact-modal-title">
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%,-50%)',
              width: { xs: '92%', sm: 680, md: 896 },
              maxWidth: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              bgcolor: '#fff',
              borderRadius: '16px',
              boxShadow: 24,
              outline: 'none',
            }}
          >
            <Box
              sx={{
                position: 'relative',
                background: 'linear-gradient(90deg,#2563EB,#1D4ED8)',
                color: '#fff',
                p: 4,
                borderTopLeftRadius: 16,
                borderTopRightRadius: 16,
              }}
            >
              <Typography variant="h2" id="impact-modal-title" sx={{ fontSize: { xs: '1.75rem', sm: '2rem' }, fontWeight: 700 }}>
                How We Can Transform Africa
              </Typography>
              <IconButton
                aria-label="Close impact modal"
                onClick={() => setImpactOpen(false)}
                sx={{
                  position: 'absolute',
                  top: 16,
                  right: 16,
                  color: '#fff',
                  bgcolor: 'rgba(255,255,255,0.1)',
                  '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' },
                }}
              >
                <CloseIcon />
              </IconButton>
            </Box>

            <Box sx={{ p: 4, display: 'flex', flexDirection: 'column', gap: 3 }}>
              <Typography sx={{ fontSize: '1.125rem', color: '#374151' }}>
                This is more than an exam prep platform—it&rsquo;s a movement to empower African youth and revolutionize education across the continent. With the right support, here&rsquo;s what we can offer:
              </Typography>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {IMPACT_ITEMS.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Box key={item.title} sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                      <Box
                        sx={{
                          flexShrink: 0,
                          width: 32,
                          height: 32,
                          bgcolor: item.bg,
                          borderRadius: '8px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Icon sx={{ fontSize: 18, color: item.color }} />
                      </Box>
                      <Box>
                        <Typography sx={{ fontWeight: 600, fontSize: '1.125rem', color: '#111827' }}>
                          {item.title}
                        </Typography>
                        <Typography sx={{ color: '#374151' }}>{item.text}</Typography>
                      </Box>
                    </Box>
                  );
                })}
              </Box>

              <Box sx={{ mt: 2, textAlign: 'center' }}>
                <Typography sx={{ fontSize: '1.25rem', fontWeight: 600, color: '#2563eb' }}>
                  Together, we can build a brighter future for Africa.
                </Typography>
              </Box>
            </Box>
          </Box>
        </Modal>
      </Box>
    </ThemeProvider>
  );
}
