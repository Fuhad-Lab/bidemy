'use client';

/**
 * Electrolysis — Interactive Learning Module (full interactive port).
 *
 * Source: /home/z/fuhademy/students/chemistry-modules/electrolysis/
 * (index.html + script.js + style.css + content-styles.css)
 *
 * Ported behaviours (script.js + inline scripts in index.html):
 * - Section/tab navigation with fade-in transitions and URL-hash sync
 *   (#basic-principles, #simulations, ...) incl. browser hashchange.
 * - Per-section header description updates in the sticky header.
 * - Progress bar & percentage (original tracked module steps; here it
 *   reflects the sections the learner has visited, 0% on load).
 * - "Previous/Next Section" buttons at the end of Exam Tips walking the
 *   original `sectionOrder`.
 * - Practice-question hint toggles (toggleHint) and answer submission.
 * - Faraday calculator (calculateMass) with identical math/validation.
 * - Study tools: Electrolysis Calculator (jumps to Calculations) and
 *   My Notes (localStorage-backed, original button had no handler).
 * - The original page's `#answers` section was orphaned (present in HTML
 *   but unreachable); it is included here as an 8th nav item so the
 *   content remains reachable. Everything else is 1:1.
 *
 * Original links rewritten to Next routes with trailing slashes:
 *   ../index.html  ->  /students/chemistry-modules/
 */

import * as React from 'react';
import Link from 'next/link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CalculateIcon from '@mui/icons-material/Calculate';
import StickyNote2Icon from '@mui/icons-material/StickyNote2';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import ScienceIcon from '@mui/icons-material/Science';
import BoltIcon from '@mui/icons-material/Bolt';
import FactoryIcon from '@mui/icons-material/Factory';
import EditIcon from '@mui/icons-material/Edit';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import AssignmentIcon from '@mui/icons-material/Assignment';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Fade from '@mui/material/Fade';
import { ELECTROLYSIS_SECTIONS } from './sections-meta';
import {
  BasicPrinciplesSection,
  ElectrodeProcessesSection,
  IndustrialApplicationsSection,
  ExamTipsSection,
  AnswersSection,
} from './content-sections';
import SimulationsSection from './SimulationsSection';
import PracticeQuestionsSection from './PracticeQuestionsSection';
import CalculationsSection from './CalculationsSection';

const NOTES_STORAGE_KEY = 'electrolysis-module-notes';

function SectionIcon({ icon, size = 20 }: { icon: string; size?: number }) {
  const sx = { fontSize: size };
  switch (icon) {
    case 'book':
      return <MenuBookIcon sx={sx} />;
    case 'flask':
      return <ScienceIcon sx={sx} />;
    case 'bolt':
      return <BoltIcon sx={sx} />;
    case 'industry':
      return <FactoryIcon sx={sx} />;
    case 'pencil':
      return <EditIcon sx={sx} />;
    case 'calculator':
      return <CalculateIcon sx={sx} />;
    case 'lightbulb':
      return <LightbulbIcon sx={sx} />;
    default:
      return <AssignmentIcon sx={sx} />;
  }
}

export default function ElectrolysisModule() {
  const [activeId, setActiveId] = React.useState<string>(ELECTROLYSIS_SECTIONS[0].id);
  const [visited, setVisited] = React.useState<Set<string>>(
    () => new Set<string>([ELECTROLYSIS_SECTIONS[0].id]),
  );
  const [fadeKey, setFadeKey] = React.useState(0);
  const [notesOpen, setNotesOpen] = React.useState(false);
  const [notes, setNotes] = React.useState('');

  const sectionRefs = React.useRef<Record<string, HTMLElement | null>>({});

  // ----- Hash routing (mirrors the original inline navigation script) -----
  React.useEffect(() => {
    const applyHash = () => {
      const hash = window.location.hash.replace('#', '') || ELECTROLYSIS_SECTIONS[0].id;
      const known = ELECTROLYSIS_SECTIONS.some((s) => s.id === hash);
      const target = known ? hash : ELECTROLYSIS_SECTIONS[0].id;
      setActiveId(target);
      setVisited((prev) => new Set(prev).add(target));
    };
    applyHash();
    window.addEventListener('hashchange', applyHash);
    return () => window.removeEventListener('hashchange', applyHash);
  }, []);

  // ----- Notes (localStorage) -----
  React.useEffect(() => {
    try {
      const saved = window.localStorage.getItem(NOTES_STORAGE_KEY);
      if (saved !== null) setNotes(saved);
    } catch {
      /* storage unavailable — notes stay in memory */
    }
  }, []);

  const goToSection = React.useCallback((id: string, opts?: { pushHash?: boolean; scroll?: boolean }) => {
    const meta = ELECTROLYSIS_SECTIONS.find((s) => s.id === id);
    if (!meta) return;
    setActiveId(id);
    setFadeKey((k) => k + 1);
    setVisited((prev) => {
      if (prev.has(id)) return prev;
      const next = new Set(prev);
      next.add(id);
      return next;
    });
    if (opts?.pushHash !== false && typeof window !== 'undefined') {
      window.history.pushState(null, '', `#${id}`);
    }
    if (opts?.scroll !== false) {
      // Wait a tick so the section is mounted before scrolling.
      window.setTimeout(() => {
        sectionRefs.current[id]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 60);
    }
  }, []);

  const sectionOrder = ELECTROLYSIS_SECTIONS.map((s) => s.id);
  const currentIndex = sectionOrder.indexOf(activeId);
  const activeMeta = ELECTROLYSIS_SECTIONS[currentIndex] ?? ELECTROLYSIS_SECTIONS[0];

  const progress = Math.round((visited.size / ELECTROLYSIS_SECTIONS.length) * 100);

  const saveNotes = () => {
    try {
      window.localStorage.setItem(NOTES_STORAGE_KEY, notes);
    } catch {
      /* ignore */
    }
    setNotesOpen(false);
  };

  const renderSection = () => {
    switch (activeId) {
      case 'basic-principles':
        return <BasicPrinciplesSection />;
      case 'simulations':
        return <SimulationsSection />;
      case 'electrode-processes':
        return <ElectrodeProcessesSection />;
      case 'industrial-applications':
        return <IndustrialApplicationsSection />;
      case 'practice-questions':
        return <PracticeQuestionsSection />;
      case 'calculations':
        return <CalculationsSection />;
      case 'exam-tips':
        return (
          <ExamTipsSection
            onPrevious={() => goToSection(sectionOrder[Math.max(0, currentIndex - 1)])}
            onNext={() => goToSection(sectionOrder[Math.min(sectionOrder.length - 1, currentIndex + 1)])}
            canGoPrevious={currentIndex > 0}
            canGoNext={currentIndex < sectionOrder.length - 1}
          />
        );
      case 'answers':
        return <AnswersSection />;
      default:
        return <BasicPrinciplesSection />;
    }
  };

  return (
    <Box sx={{ bgcolor: '#f9fafb', minHeight: '100vh', color: '#111827' }}>
      {/* ------------------------------ Header ------------------------------ */}
      <Paper
        component="header"
        elevation={0}
        sx={{
          position: 'sticky',
          top: 0,
          zIndex: 40,
          bgcolor: '#fff',
          boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
        }}
      >
        <Box sx={{ maxWidth: 1280, mx: 'auto', px: { xs: 2, sm: 3, lg: 4 }, py: 2 }}>
          {/* Top row */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, minWidth: 0 }}>
              <IconButton
                component={Link}
                href="/students/chemistry-modules/"
                aria-label="Back to chemistry modules"
                sx={{ color: '#4b5563' }}
              >
                <ArrowBackIcon />
              </IconButton>
              <Box sx={{ minWidth: 0 }}>
                <Typography sx={{ fontSize: 20, fontWeight: 600, color: '#111827' }}>Electrolysis</Typography>
                <Typography id="section-description" sx={{ fontSize: 14, color: '#4b5563', mt: 0.25 }} noWrap>
                  {activeMeta.description}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography sx={{ fontSize: 14, color: '#6b7280', whiteSpace: 'nowrap' }}>
                Progress: <span>{progress}%</span>
              </Typography>
              <Box
                aria-label={`Module progress: ${progress}%`}
                role="progressbar"
                aria-valuenow={progress}
                aria-valuemin={0}
                aria-valuemax={100}
                sx={{ width: 128, bgcolor: '#e5e7eb', borderRadius: 999, height: 10, overflow: 'hidden', ml: 1 }}
              >
                <Box
                  sx={{
                    bgcolor: '#2563eb',
                    height: 10,
                    borderRadius: 999,
                    width: `${progress}%`,
                    transition: 'width 0.3s ease-in-out',
                  }}
                />
              </Box>
            </Box>
          </Box>

          {/* Main navigation */}
          <Box component="nav" sx={{ bgcolor: '#fff', borderBottom: 1, borderColor: '#e5e7eb', overflowX: 'auto' }}>
            <Box sx={{ display: 'flex', gap: 0.5, p: 1, minWidth: 'max-content' }}>
              {ELECTROLYSIS_SECTIONS.map((s, i) => {
                const isActive = s.id === activeId;
                return (
                  <Box
                    key={s.id}
                    component="a"
                    href={`#${s.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      goToSection(s.id);
                    }}
                    sx={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      px: 2,
                      py: 1,
                      borderRadius: 2,
                      transition: 'all 0.2s',
                      bgcolor: isActive ? s.activeBg : 'transparent',
                      cursor: 'pointer',
                      flexShrink: 0,
                      '&:hover': { bgcolor: isActive ? s.activeBg : 'rgba(0,0,0,0.03)' },
                      textDecoration: 'none',
                    }}
                  >
                    <Box
                      sx={{
                        width: 28,
                        height: 28,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '50%',
                        background: `linear-gradient(135deg, ${s.colorLight} 0%, ${s.color} 100%)`,
                        color: '#fff',
                        fontWeight: 600,
                        fontSize: 14,
                        boxShadow: 1,
                      }}
                    >
                      {i + 1}
                    </Box>
                    <Typography
                      component="span"
                      sx={{
                        ml: 1,
                        fontSize: 14,
                        fontWeight: 500,
                        color: isActive ? s.color : '#374151',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {s.label}
                    </Typography>
                  </Box>
                );
              })}
            </Box>
          </Box>
        </Box>
      </Paper>

      {/* ------------------------------ Content ------------------------------ */}
      <Box component="main" sx={{ maxWidth: 1280, mx: 'auto', px: { xs: 2, sm: 3, lg: 4 }, py: 4 }}>
        <Box sx={{ display: 'flex', gap: 4, alignItems: 'flex-start' }}>
          {/* Sidebar (desktop) */}
          <Box
            component="aside"
            sx={{
              width: 256,
              flexShrink: 0,
              display: { xs: 'none', lg: 'block' },
              position: 'sticky',
              top: 96,
            }}
          >
            <Paper elevation={0} sx={{ borderRadius: 3, boxShadow: '0 1px 2px rgba(0,0,0,0.05)', p: 3 }}>
              <Typography sx={{ fontWeight: 600, fontSize: 18, mb: 2 }}>Learning Steps</Typography>
              <Box component="nav" sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                {ELECTROLYSIS_SECTIONS.map((s, i) => {
                  const isActive = s.id === activeId;
                  return (
                    <Box
                      key={s.id}
                      component="a"
                      href={`#${s.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        goToSection(s.id);
                      }}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        px: 1.5,
                        py: 1,
                        borderRadius: 2,
                        color: isActive ? s.color : '#374151',
                        bgcolor: isActive ? s.activeBg : 'transparent',
                        textDecoration: 'none',
                        fontSize: 14,
                        transition: 'all 0.3s ease',
                        cursor: 'pointer',
                        '&:hover': { bgcolor: isActive ? s.activeBg : '#f9fafb' },
                      }}
                    >
                      <Box
                        sx={{
                          width: 24,
                          height: 24,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: '50%',
                          fontSize: 12,
                          bgcolor: isActive ? s.color : '#f3f4f6',
                          color: isActive ? '#fff' : '#4b5563',
                          transition: 'all 0.3s ease',
                          flexShrink: 0,
                        }}
                      >
                        {i + 1}
                      </Box>
                      <span>{s.label}</span>
                    </Box>
                  );
                })}
              </Box>

              <Box sx={{ mt: 4, pt: 3, borderTop: 1, borderColor: '#e5e7eb' }}>
                <Typography sx={{ fontWeight: 600, mb: 1.5 }}>Study Tools</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                  <Box
                    component="button"
                    onClick={() => goToSection('calculations', { pushHash: false })}
                    sx={{
                      width: '100%',
                      textAlign: 'left',
                      px: 2,
                      py: 1,
                      borderRadius: 2,
                      border: 'none',
                      bgcolor: 'transparent',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      fontSize: 14,
                      color: '#374151',
                      '&:hover': { bgcolor: '#f9fafb' },
                    }}
                  >
                    <CalculateIcon sx={{ color: '#3b82f6', fontSize: 20 }} />
                    <span>Electrolysis Calculator</span>
                  </Box>
                  <Box
                    component="button"
                    onClick={() => setNotesOpen(true)}
                    sx={{
                      width: '100%',
                      textAlign: 'left',
                      px: 2,
                      py: 1,
                      borderRadius: 2,
                      border: 'none',
                      bgcolor: 'transparent',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      fontSize: 14,
                      color: '#374151',
                      '&:hover': { bgcolor: '#f9fafb' },
                    }}
                  >
                    <StickyNote2Icon sx={{ color: '#eab308', fontSize: 20 }} />
                    <span>My Notes</span>
                  </Box>
                </Box>
              </Box>
            </Paper>
          </Box>

          {/* Main content area */}
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Paper
              elevation={0}
              sx={{
                borderRadius: 3,
                boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                p: { xs: 2.5, md: 4 },
                maxWidth: 800,
                mx: 'auto',
                width: '100%',
                overflowX: 'hidden',
              }}
            >
              <Fade key={fadeKey} in timeout={300}>
                <div>
                  <section
                    id={activeId}
                    ref={(el) => {
                      sectionRefs.current[activeId] = el;
                    }}
                    aria-label={activeMeta.label}
                  >
                    {renderSection()}
                  </section>
                </div>
              </Fade>
            </Paper>
          </Box>
        </Box>
      </Box>

      {/* ------------------------------ Notes dialog ------------------------------ */}
      <Dialog open={notesOpen} onClose={() => setNotesOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <StickyNote2Icon sx={{ color: '#eab308' }} /> My Notes
        </DialogTitle>
        <DialogContent dividers>
          <TextField
            multiline
            rows={8}
            fullWidth
            placeholder="Write your revision notes here…"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
          <Typography sx={{ fontSize: 12, color: '#6b7280', mt: 1 }}>
            Notes are saved in your browser (localStorage) — no account needed.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setNotesOpen(false)} color="inherit">
            Cancel
          </Button>
          <Button onClick={saveNotes} variant="contained">
            Save Notes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
