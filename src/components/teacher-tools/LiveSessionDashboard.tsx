'use client';

/**
 * Teacher dashboard home — replica of each subject's <subject>-live-session.html
 * (the "modern-session" design): glass card over a blue gradient, tool tabs on
 * the left, video panel on the right.
 *
 * MIGRATION NOTES (per task rules):
 *  - The external 8x8.vc / Jitsi `external_api.js` was REMOVED; the live video
 *    area is now a static "Demo mode" panel.
 *  - The draw.chat iframe was replaced by a plain link (no external embeds).
 *  - All Tailwind classes were rebuilt with MUI components / sx.
 *  - The syllabus tracker grid at the bottom mirrors the links that the
 *    original teacher-dashboard-<subject>.html pages exposed for every subject.
 */

import * as React from 'react';
import Link from 'next/link';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloseIcon from '@mui/icons-material/Close';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import DynamicIcon from './DynamicIcon';
import {
  getSubject,
  TEACHER_SUBJECTS,
  toolRoute,
  TEACHERS_INDEX_ROUTE,
} from '@/data/teachers/subjects';
import { LIVE_SESSION_TOOLS } from '@/data/teachers/demo-content';
import type { LiveSessionToolKey } from '@/data/teachers/demo-content';
import { useLocalValue } from './useLocalList';

interface OpenTab {
  key: LiveSessionToolKey;
  title: string;
}

const WELCOME_TIP =
  'Use the tools on the right to open content — each tool opens as a tab so you can switch between them.';

export default function LiveSessionDashboard({ subject }: { subject: string }) {
  const info = getSubject(subject);
  const [tabs, setTabs] = React.useState<OpenTab[]>([]);
  const [activeTab, setActiveTab] = React.useState<LiveSessionToolKey | null>(null);
  const [demoMessage, setDemoMessage] = React.useState('');

  const [notes, setNotes] = useLocalValue(`live_notes_${subject}`, '');
  const notesRef = React.useRef<HTMLTextAreaElement | null>(null);

  // ---- tab management (port of the original tabs manager) ----------------
  const openTool = (key: LiveSessionToolKey, title: string) => {
    setTabs((prev) => (prev.some((t) => t.key === key) ? prev : [...prev, { key, title }]));
    setActiveTab(key);
  };

  const closeTab = (key: LiveSessionToolKey) => {
    setTabs((prev) => {
      const next = prev.filter((t) => t.key !== key);
      if (activeTab === key) {
        setActiveTab(next.length ? next[next.length - 1].key : null);
      }
      return next;
    });
  };

  const closeAll = () => {
    setTabs([]);
    setActiveTab(null);
  };

  const exportNotes = () => {
    try {
      const blob = new Blob([notes], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `notes-${subject}.txt`;
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      setDemoMessage('Export failed in this browser.');
    }
  };

  const popOut = () => {
    window.open(
      window.location.href,
      '_blank',
      'toolbar=0,location=0,menubar=0,width=900,height=700',
    );
  };

  const fullscreenRef = React.useRef<HTMLDivElement | null>(null);
  const toggleFullscreen = async () => {
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else await fullscreenRef.current?.requestFullscreen();
    } catch {
      setDemoMessage('Fullscreen is not available right now.');
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        p: { xs: 2, sm: 3, md: 4 },
        background:
          'linear-gradient(135deg, #dbeafe 0%, #e0e7ff 45%, #ffffff 100%)',
        position: 'relative',
      }}
    >
      {/* subtle cube pattern stand-in (original: transparenttextures cubes.png) */}
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          opacity: 0.5,
          backgroundImage:
            'radial-gradient(rgba(37,99,235,0.10) 1.2px, transparent 1.2px)',
          backgroundSize: '22px 22px',
        }}
      />

      <Box sx={{ position: 'relative', maxWidth: 1280, mx: 'auto', mb: 3 }}>
        <Stack sx={{ justifyContent: "space-between", flexWrap: "wrap" }} direction="row" gap={1}>
          <Button
            component={Link}
            href={TEACHERS_INDEX_ROUTE}
            startIcon={<ArrowBackIcon />}
            size="small"
            sx={{ color: '#1e3a8a' }}
          >
            All subjects
          </Button>
          <Chip
            size="small"
            label={`Teacher ID demo · juatex@2025.NO.1`}
            sx={{ bgcolor: 'rgba(255,255,255,0.6)', color: '#1e3a8a' }}
          />
        </Stack>
      </Box>

      <Paper
        elevation={0}
        sx={{
          position: 'relative',
          maxWidth: 1280,
          mx: 'auto',
          borderRadius: 6,
          p: { xs: 2.5, sm: 3.5, md: 4.5 },
          bgcolor: 'rgba(255,255,255,0.9)',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 24px 48px rgba(30,58,138,0.12)',
          border: '1px solid #dbe5ff',
          display: 'flex',
          gap: { xs: 2, md: 3 },
          flexDirection: { xs: 'column', lg: 'row' },
        }}
      >
        {/* ---------------- left: main area + tools aside ---------------- */}
        <Box sx={{ flex: 1, display: 'flex', gap: { xs: 2, md: 3 }, flexDirection: { xs: 'column', sm: 'row' } }}>
          <Box
            sx={{
              flex: 1,
              bgcolor: '#fff',
              borderRadius: 3,
              p: { xs: 1.5, sm: 2.5 },
              boxShadow: '0 2px 8px rgba(45,59,69,0.06)',
              minWidth: 0,
            }}
          >
            <Typography variant="h5" component="h1" sx={{ fontWeight: 700 }}>
              Live Session — {info.label}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Teacher view
            </Typography>

            <Stack
              direction="row"
             
             
             
              gap={1}
              sx={{ justifyContent: "space-between", flexWrap: "wrap", alignItems: "center", mt: 2 }}
            >
              <Typography variant="body2" color="text.secondary">
                Tools open as tabs — close them when done.
              </Typography>
              <Stack direction="row" spacing={1}>
                <Button size="small" variant="outlined" onClick={exportNotes} startIcon={<FileDownloadIcon />}>
                  Export Notes
                </Button>
                <Button size="small" color="error" onClick={closeAll} startIcon={<DeleteSweepIcon />}>
                  Close All
                </Button>
              </Stack>
            </Stack>

            {/* tabs row */}
            <Stack
              direction="row"
              spacing={1}
              sx={{
                mt: 2,
                mb: 1,
                overflowX: 'auto',
                p: 1,
                bgcolor: 'rgba(255,255,255,0.5)',
                borderRadius: 2,
                boxShadow: 'inset 0 1px 3px rgba(45,59,69,0.08)',
                minHeight: 44,
                alignItems: 'center',
              }}
              role="tablist"
              aria-label="Open session tools"
            >
              {tabs.length === 0 && (
                <Typography variant="caption" color="text.disabled" sx={{ px: 1 }}>
                  No tabs open — pick a tool on the right.
                </Typography>
              )}
              {tabs.map((tab) => (
                <Chip
                  key={tab.key}
                  role="tab"
                  aria-selected={activeTab === tab.key}
                  clickable
                  onClick={() => setActiveTab(tab.key)}
                  label={tab.title}
                  onDelete={() => closeTab(tab.key)}
                  deleteIcon={<CloseIcon />}
                  sx={{
                    px: 0.5,
                    fontWeight: 600,
                    bgcolor: activeTab === tab.key ? 'primary.main' : '#fff',
                    color: activeTab === tab.key ? '#fff' : 'text.primary',
                    '& .MuiChip-deleteIcon': {
                      color: activeTab === tab.key ? 'rgba(255,255,255,0.85)' : 'text.secondary',
                    },
                    boxShadow: '0 1px 3px rgba(45,59,69,0.12)',
                  }}
                />
              ))}
            </Stack>

            {/* tab content */}
            <Box sx={{ p: 1.5 }}>
              {activeTab === null && (
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    borderRadius: 4,
                    background: 'linear-gradient(135deg, #ffffff, #eff6ff)',
                    border: '1px solid rgba(37,99,235,0.12)',
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    Welcome
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    {WELCOME_TIP}
                  </Typography>
                  <Typography variant="caption" color="text.disabled" sx={{ display: 'block', mt: 2 }}>
                    Tip: open the Whiteboard, then export it as PNG to share with students.
                  </Typography>
                </Paper>
              )}
              {activeTab === 'whiteboard' && <WhiteboardPanel />}
              {activeTab === 'photo' && <PhotoPanel />}
              {activeTab === 'video' && <VideoPanel />}
              {activeTab === 'notes' && (
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>
                    Lecture Notes
                  </Typography>
                  <TextField
                    fullWidth
                    multiline
                    minRows={10}
                    inputRef={notesRef}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Type your lecture notes… (saved automatically on this device)"
                  />
                  <Typography variant="caption" color="text.disabled" sx={{ mt: 1, display: 'block' }}>
                    Autosaves to localStorage · key “live_notes_{subject}” (the original page used the same trick).
                  </Typography>
                </Box>
              )}
            </Box>
          </Box>

          {/* tools aside */}
          <Box sx={{ width: { sm: 200, md: 224 }, flexShrink: 0 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'text.secondary', mb: 1.5 }}>
              Tools
            </Typography>
            <Stack spacing={1.5}>
              {LIVE_SESSION_TOOLS.map((tool) => (
                <Button
                  key={tool.key}
                  onClick={() => openTool(tool.key, tool.label)}
                  fullWidth
                  sx={{
                    justifyContent: 'flex-start',
                    gap: 1.5,
                    px: 1.5,
                    py: 1,
                    borderRadius: 2.5,
                    color: 'text.primary',
                    bgcolor: '#fff',
                    boxShadow: '0 1px 4px rgba(45,59,69,0.10)',
                    '&:hover': { bgcolor: '#f8fafc' },
                    textTransform: 'none',
                  }}
                >
                  <Box
                    aria-hidden
                    sx={{
                      width: 36,
                      height: 36,
                      borderRadius: 1.5,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#fff',
                      background:
                        tool.key === 'whiteboard'
                          ? 'linear-gradient(135deg, #3b82f6, #6366f1)'
                          : tool.key === 'photo'
                            ? 'linear-gradient(135deg, #4ade80, #14b8a6)'
                            : tool.key === 'video'
                              ? 'linear-gradient(135deg, #f87171, #ec4899)'
                              : 'linear-gradient(135deg, #facc15, #f97316)',
                    }}
                  >
                    <DynamicIcon
                      name={
                        tool.key === 'whiteboard'
                          ? 'Edit'
                          : tool.key === 'photo'
                            ? 'PhotoLibrary'
                            : tool.key === 'video'
                              ? 'Videocam'
                              : 'Notes'
                      }
                      fontSize="small"
                    />
                  </Box>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {tool.label}
                  </Typography>
                </Button>
              ))}
            </Stack>
          </Box>
        </Box>

        {/* ---------------- right: video panel (Demo mode) ---------------- */}
        <Box sx={{ width: { lg: 420, xl: 480 }, flexShrink: 0 }}>
          <Box
            ref={fullscreenRef}
            sx={{
              position: 'relative',
              borderRadius: 6,
              overflow: 'hidden',
              minHeight: 320,
              height: { xs: 320, lg: 420 },
              background: 'linear-gradient(135deg, #111827, #1e3a8a, #2563eb)',
              border: '1px solid #bfdbfe',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              p: 3,
              textAlign: 'center',
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                top: 20,
                left: 20,
                bgcolor: 'rgba(255,255,255,0.2)',
                color: '#fff',
                px: 2.5,
                py: 1.2,
                borderRadius: 3,
                backdropFilter: 'blur(8px)',
                fontWeight: 700,
                fontSize: 18,
              }}
            >
              Live Video
            </Box>
            <Stack spacing={1.5} sx={{ alignItems: "center", color: '#e5e7eb', maxWidth: 300 }}>
              <DynamicIcon name="Videocam" sx={{ fontSize: 52, opacity: 0.85 }} />
              <Typography variant="h6" sx={{ color: '#fff', fontWeight: 700 }}>
                Demo mode
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.85 }}>
                The original page embedded an 8x8.vc (Jitsi) conference via an
                external API script. That integration has been removed in this
                offline demo — in production this panel hosts the live class.
              </Typography>
              {demoMessage && (
                <Typography variant="caption" sx={{ color: '#fca5a5' }}>
                  {demoMessage}
                </Typography>
              )}
            </Stack>
          </Box>
          <Stack direction="row" spacing={1.5} sx={{ justifyContent: "flex-end", mt: 2.5 }}>
            <Button
              variant="contained"
              color="secondary"
              onClick={() =>
                setDemoMessage('Screen sharing is disabled in demo mode (no external video API).')
              }
              sx={{ borderRadius: 4, px: 2.5, py: 1.2 }}
            >
              Share screen
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={toggleFullscreen}
              sx={{ borderRadius: 4, px: 2.5, py: 1.2 }}
            >
              Fullscreen
            </Button>
            <Button
              variant="contained"
              onClick={popOut}
              sx={{ borderRadius: 4, px: 2.5, py: 1.2, bgcolor: '#111827', '&:hover': { bgcolor: '#1f2937' } }}
            >
              Pop-out
            </Button>
          </Stack>
        </Box>
      </Paper>

      {/* -------- syllabus tracker + tool links (from teacher-dashboard-*.html) -------- */}
      <Paper
        elevation={0}
        sx={{
          position: 'relative',
          maxWidth: 1280,
          mx: 'auto',
          mt: 3,
          borderRadius: 5,
          p: { xs: 2.5, sm: 4 },
          bgcolor: 'rgba(255,255,255,0.9)',
          boxShadow: '0 12px 32px rgba(30,58,138,0.10)',
          border: '1px solid #dbe5ff',
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          Syllabus Tracker
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Jump to any class syllabus — mirrors the original dashboard’s syllabus grid.
        </Typography>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: 'repeat(2, 1fr)',
              sm: 'repeat(3, 1fr)',
              md: 'repeat(5, 1fr)',
            },
            gap: 1.5,
          }}
        >
          {TEACHER_SUBJECTS.map((s) => (
            <Button
              key={s.id}
              component={Link}
              href={toolRoute(s.id, 'syllabus')}
              sx={{
                py: 2,
                borderRadius: 3,
                color: '#fff',
                fontWeight: 700,
                letterSpacing: 0.5,
                fontSize: 12,
                background: s.gradient,
                '&:hover': { filter: 'brightness(1.08)' },
              }}
            >
              {s.label.toUpperCase()}
            </Button>
          ))}
        </Box>

        <Divider sx={{ my: 3 }} />

        <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1.5 }}>
          {info.label} tools
        </Typography>
        <Stack sx={{ flexWrap: "wrap" }} direction="row" gap={1}>
          {(
            [
              ['lesson-planner', 'Lesson Planner'],
              ['timer', 'Timer'],
              ['todo-list', 'To-Do List'],
              ['sticky-notes', 'Sticky Notes'],
              ['quick-links', 'Quick Links'],
              ['syllabus', 'Syllabus'],
            ] as const
          ).map(([tool, label]) => (
            <Button
              key={tool}
              component={Link}
              href={toolRoute(subject, tool)}
              variant="outlined"
              size="small"
              sx={{ borderRadius: 5 }}
            >
              {label}
            </Button>
          ))}
        </Stack>
      </Paper>
    </Box>
  );
}

/* ================= Whiteboard (canvas) ================= */
function WhiteboardPanel() {
  const wrapRef = React.useRef<HTMLDivElement | null>(null);
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const colorRef = React.useRef<HTMLInputElement | null>(null);
  const sizeRef = React.useRef<HTMLInputElement | null>(null);
  const drawing = React.useRef(false);
  const last = React.useRef({ x: 0, y: 0 });
  const [copyMsg, setCopyMsg] = React.useState('');

  const setupCanvas = React.useCallback(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const rect = wrap.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = 360 * dpr;
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = '360px';
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.scale(dpr, dpr);
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
    }
  }, []);

  React.useEffect(() => {
    setupCanvas();
    window.addEventListener('resize', setupCanvas);
    return () => window.removeEventListener('resize', setupCanvas);
  }, [setupCanvas]);

  const relPos = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const onPointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    drawing.current = true;
    last.current = relPos(e);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!drawing.current) return;
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;
    const pos = relPos(e);
    ctx.strokeStyle = colorRef.current?.value ?? '#111827';
    ctx.lineWidth = Number(sizeRef.current?.value ?? 2);
    ctx.beginPath();
    ctx.moveTo(last.current.x, last.current.y);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
    last.current = pos;
  };

  const stopDrawing = () => {
    drawing.current = false;
  };

  const clear = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (canvas && ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const exportPng = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const a = document.createElement('a');
    a.href = canvas.toDataURL('image/png');
    a.download = 'whiteboard.png';
    a.click();
  };

  const copyImage = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    try {
      const blob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob(resolve, 'image/png'),
      );
      if (blob && navigator.clipboard && 'write' in navigator.clipboard) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const item = new (window as any).ClipboardItem({ [blob.type]: blob });
        await navigator.clipboard.write([item]);
        setCopyMsg('Image copied to clipboard ✓');
      } else {
        setCopyMsg('Clipboard not supported — use Export PNG instead.');
      }
    } catch {
      setCopyMsg('Copy failed — use Export PNG instead.');
    }
  };

  return (
    <Box>
      <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>
        Whiteboard
      </Typography>
      <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap", mb: 1.5 }} useFlexGap>
        <Button variant="contained" size="small" onClick={exportPng}>
          Export PNG
        </Button>
        <Button variant="outlined" size="small" onClick={copyImage}>
          Copy Image
        </Button>
        <Button variant="contained" color="error" size="small" onClick={clear}>
          Clear
        </Button>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: 1 }}>
          <Typography variant="caption" color="text.secondary">Color</Typography>
          <input
            ref={colorRef}
            type="color"
            defaultValue="#111827"
            aria-label="Whiteboard color"
            style={{ width: 34, height: 28, border: '1px solid #d1d5db', borderRadius: 6, cursor: 'pointer' }}
          />
          <Typography variant="caption" color="text.secondary">Size</Typography>
          <input
            ref={sizeRef}
            type="range"
            min={1}
            max={24}
            defaultValue={2}
            aria-label="Whiteboard brush size"
            style={{ width: 90, accentColor: '#2563eb' }}
          />
        </Box>
      </Stack>
      <div ref={wrapRef} style={{ width: '100%' }}>
        <canvas
          ref={canvasRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={stopDrawing}
          onPointerCancel={stopDrawing}
          onPointerOut={stopDrawing}
          style={{
            touchAction: 'none',
            display: 'block',
            border: '1px solid #d1d5db',
            borderRadius: 10,
            cursor: 'crosshair',
            background: '#fff',
          }}
          aria-label="Whiteboard drawing canvas"
        />
      </div>
      {copyMsg && (
        <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
          {copyMsg}
        </Typography>
      )}
      <Typography variant="caption" color="text.disabled" sx={{ mt: 1, display: 'block' }}>
        The original page also embedded draw.chat in an iframe; use{' '}
        <a href="https://draw.chat/" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb' }}>
          draw.chat
        </a>{' '}
        in a new tab instead (no third-party embeds in the demo).
      </Typography>
    </Box>
  );
}

/* ================= Photo panel ================= */
function PhotoPanel() {
  const [preview, setPreview] = React.useState<{ url: string; name: string } | null>(null);

  React.useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview.url);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box>
      <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>
        Add Photo
      </Typography>
      <Button variant="contained" component="label" startIcon={<DynamicIcon name="PhotoLibrary" />}>
        Choose image
        <input
          type="file"
          accept="image/*"
          hidden
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (!file) return;
            if (preview) URL.revokeObjectURL(preview.url);
            setPreview({ url: URL.createObjectURL(file), name: file.name });
          }}
        />
      </Button>
      {preview ? (
        <Box sx={{ mt: 2 }}>
          <Typography variant="caption" color="text.secondary">
            {preview.name}
          </Typography>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={preview.url}
            alt="Selected teaching resource"
            style={{ width: '100%', borderRadius: 10, marginTop: 8 }}
          />
        </Box>
      ) : (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          Selected photo will show here.
        </Typography>
      )}
    </Box>
  );
}

/* ================= Video panel ================= */
function VideoPanel() {
  const [url, setUrl] = React.useState('');
  const [embedId, setEmbedId] = React.useState('');
  const [fileUrl, setFileUrl] = React.useState('');
  const [error, setError] = React.useState('');

  const handleUrl = () => {
    const value = url.trim();
    if (!value) return;
    const match = value.match(/(?:v=|youtu\.be\/|embed\/)([\w-]{11})/);
    if (match) {
      setEmbedId(match[1]);
      setError('');
    } else {
      setEmbedId('');
      setError('Paste a YouTube URL (youtu.be or youtube.com/watch?v=…).');
    }
  };

  return (
    <Box>
      <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>
        Add Video
      </Typography>
      <Stack sx={{ alignItems: "center" }} direction="row" spacing={1}>
        <TextField
          fullWidth
          size="small"
          placeholder="https://youtube.com/..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleUrl();
          }}
        />
        <Button variant="contained" onClick={handleUrl}>
          Load
        </Button>
      </Stack>
      {error && (
        <Typography variant="caption" color="error" sx={{ mt: 1, display: 'block' }}>
          {error}
        </Typography>
      )}
      <Typography variant="caption" color="text.disabled" sx={{ mt: 1, display: 'block' }}>
        You can open the video in a new window to share it via screen share.
      </Typography>

      {embedId && (
        <Box
          component="iframe"
          src={`https://www.youtube.com/embed/${embedId}`}
          title="YouTube preview"
          allowFullScreen
          sx={{
            width: '100%',
            height: 320,
            mt: 2,
            border: 0,
            borderRadius: 2,
            bgcolor: '#000',
          }}
        />
      )}

      <Divider sx={{ my: 2.5 }} />
      <Button variant="outlined" component="label" startIcon={<DynamicIcon name="Videocam" />}>
        Choose a video file
        <input
          type="file"
          accept="video/*"
          hidden
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (!file) return;
            setFileUrl((prev) => {
              if (prev) URL.revokeObjectURL(prev);
              return URL.createObjectURL(file);
            });
          }}
        />
      </Button>
      {fileUrl && (
        <Box
          component="video"
          controls
          src={fileUrl}
          sx={{ width: '100%', maxHeight: 340, mt: 2, borderRadius: 2, bgcolor: '#000' }}
        />
      )}
    </Box>
  );
}
