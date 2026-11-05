'use client';

/**
 * Simple Pendulum — WAEC-style physics practical (full interactive port).
 *
 * Source: /home/z/fuhademy/students/practical/physics/simple-pendulum.html
 *
 * Ported behaviours (inline <script> of the original page):
 * - Canvas pendulum simulation integrated with RK4 (damped pendulum:
 *   linear damping/mass + quadratic drag), 50 Hz data sampling, motion trail.
 * - Start / Pause / Reset, simulation timer (auto start/stop on motion) and
 *   live energy readouts (KE / PE / Total with animated bars).
 * - Controls: length, mass, initial angle, damping, bob radius, drag Cd and
 *   the "Auto environment" checkbox (estimates air drag & pivot friction and
 *   disables manual damping), exactly like `computeAutoCoeffs()`.
 * - Oscillation counting (sign-crossing detection) with N target input.
 * - CSV export of the logged samples (time,theta,omega,ke,pe,total).
 * - WAEC measurement table (6 rows) with validation, "Use L", per-row Clear,
 *   Clear All (confirm) and "Plot T² vs L": scatter + linear fit + estimated
 *   g = 4π²/slope (original `linearFit` + fit text).
 * - Analysis card with Chart / Table tabs; on mobile the analysis opens as a
 *   bottom-sheet panel via a floating toggle (original mobile behaviour).
 *
 * Documented deviations:
 * - Chart.js is replaced by a dependency-free canvas chart (same look).
 * - `alert()`/`confirm()` are replaced by MUI Snackbar / Dialog.
 * - Length input max is 300 cm (the original text and canvas assumed 3.0 m
 *   while the original input had max=100 — a bug; instructions say "up to
 *   3.0 m").
 * - Datasheet PDF & sample CSV links added to the nav bar as instructed
 *   (/site/students/practical/physics/...), plus a "counted oscillations"
 *   readout so the original counting logic is visible.
 */

import * as React from 'react';
import Link from 'next/link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Drawer from '@mui/material/Drawer';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import RefreshIcon from '@mui/icons-material/Refresh';
import DownloadIcon from '@mui/icons-material/Download';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import DescriptionIcon from '@mui/icons-material/Description';
import CloseIcon from '@mui/icons-material/Close';
import TableChartIcon from '@mui/icons-material/TableChart';
import InsightsIcon from '@mui/icons-material/Insights';
import { useMediaQuery } from '@mui/material';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';

import {
  G,
  rk4Step,
  computeEnergies,
  linearFit,
  formatTime,
  toRad,
  type DataSample,
  type XYPoint,
} from './physics';
import T2VsLChart from './T2VsLChart';
import MeasurementTable, { computeRowValues, type MeasRow, type MeasErrors } from './MeasurementTable';

/* ----------------------------- constants ----------------------------- */

const SAMPLE_HZ = 50;
const MOTION_START_THRESHOLD = 0.002;
const MOTION_STOP_TIMEOUT = 0.8; // s
const TRAIL_MAX = 600;
const EMPTY_ROWS: MeasRow[] = Array.from({ length: 6 }, () => ({ L: '', N: '20', t1: '', t2: '' }));

/* --------------------------- small UI pieces --------------------------- */

function NumberField({
  label,
  value,
  min,
  max,
  step,
  disabled,
  caption,
  onChange,
  ariaLabel,
}: {
  label: string;
  value: string | number;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  caption?: string;
  onChange: (v: string) => void;
  ariaLabel: string;
}) {
  return (
    <Box sx={{ mb: 1.5 }}>
      <Typography component="label" sx={{ display: 'block', fontSize: 12, color: '#475569', mb: 0.5 }}>
        {label}
      </Typography>
      <TextField
        type="number"
        fullWidth
        disabled={disabled}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label={ariaLabel}
        slotProps={{
          htmlInput: { min, max, step },
          input: { sx: { fontSize: 14, py: 0.5, bgcolor: '#fff' } },
        }}
      />
      {caption !== undefined && <Typography sx={{ fontSize: 14, mt: 0.5 }}>{caption}</Typography>}
    </Box>
  );
}

function EnergyBar({ label, value, pct, gradient }: { label: string; value: string; pct: number; gradient: string }) {
  return (
    <Box>
      <Typography sx={{ fontSize: 12, color: '#64748b', mb: 0.5 }}>{label}</Typography>
      <Typography sx={{ fontSize: 14, fontWeight: 500, fontVariantNumeric: 'tabular-nums' }}>{value}</Typography>
      <Box sx={{ mt: 1, bgcolor: '#eef2ff', height: 8, borderRadius: 999, overflow: 'hidden' }}>
        <Box
          sx={{
            height: 8,
            borderRadius: 999,
            width: `${pct}%`,
            background: gradient,
            transition: 'width 150ms linear',
          }}
        />
      </Box>
    </Box>
  );
}

/* ------------------------------ main module ------------------------------ */

interface Readouts {
  ke: number;
  pe: number;
  te: number;
  osc: number;
  timerMs: number;
}

const ZERO_READOUTS: Readouts = { ke: 0, pe: 0, te: 0, osc: 0, timerMs: 0 };

export default function SimplePendulum() {
  /* ------------------------------ UI state ------------------------------ */
  const [lengthCm, setLengthCm] = React.useState(100);
  const [massKg, setMassKg] = React.useState(0.5);
  const [angleDeg, setAngleDeg] = React.useState(20);
  const [dampingVal, setDampingVal] = React.useState(0.02);
  const [bobRadiusCm, setBobRadiusCm] = React.useState(2.0);
  const [dragCdVal, setDragCdVal] = React.useState(0.47);
  const [autoEnv, setAutoEnv] = React.useState(false);
  const [oscCountN, setOscCountN] = React.useState(20);
  const [running, setRunning] = React.useState(false);
  const [readouts, setReadouts] = React.useState<Readouts>(ZERO_READOUTS);

  const [rows, setRows] = React.useState<MeasRow[]>(EMPTY_ROWS);
  const [errors, setErrors] = React.useState<MeasErrors>({});
  const [tab, setTab] = React.useState<'chart' | 'table'>('chart');
  const [chartPoints, setChartPoints] = React.useState<XYPoint[]>([]);
  const [chartFit, setChartFit] = React.useState<{ a: number; b: number } | null>(null);
  const [fitResult, setFitResult] = React.useState('');
  const [clearDialogOpen, setClearDialogOpen] = React.useState(false);
  const [mobilePanelOpen, setMobilePanelOpen] = React.useState(false);
  const [snack, setSnack] = React.useState<{ open: boolean; message: string; severity: 'success' | 'warning' | 'error' | 'info' }>({
    open: false,
    message: '',
    severity: 'info',
  });

  const isMobile = useMediaQuery('(max-width:768px)');
  const stabTheme = createTheme(); // for useMediaQuery default theme

  /* --------------------------- physics refs --------------------------- */
  const thetaRef = React.useRef(toRad(20));
  const omegaRef = React.useRef(0);
  const LRef = React.useRef(1.0);
  const mRef = React.useRef(0.5);
  const dampingRef = React.useRef(0.02);
  const bobRadiusRef = React.useRef(2.0);
  const dragCdRef = React.useRef(0.47);
  const autoEnvRef = React.useRef(false);
  const autoCLinearRef = React.useRef(0);
  const autoKDragRef = React.useRef(0);

  const runningRef = React.useRef(false);
  const rafRef = React.useRef<number | null>(null);
  const lastTimeRef = React.useRef<number | null>(null);
  const accumulatedRef = React.useRef(0);
  const dataLogRef = React.useRef<DataSample[]>([]);
  const lastReadoutPushRef = React.useRef(0);

  const oscCountRef = React.useRef(0);
  const lastSignRef = React.useRef<number | null>(null);
  const oscTargetRef = React.useRef(20);
  const oscCountNRef = React.useRef(20);

  const timerRunningRef = React.useRef(false);
  const simStartRef = React.useRef(0);
  const simElapsedRef = React.useRef(0);
  const lastMotionTimeRef = React.useRef(0);

  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const canvasWrapRef = React.useRef<HTMLDivElement | null>(null);
  const instructionsRef = React.useRef<HTMLDivElement | null>(null);
  const simCardRef = React.useRef<HTMLDivElement | null>(null);

  /* ------------------------------ helpers ------------------------------ */

  const notify = (message: string, severity: 'success' | 'warning' | 'error' | 'info' = 'info') =>
    setSnack({ open: true, message, severity });

  const computeAutoCoeffs = React.useCallback(() => {
    const rCm = bobRadiusRef.current || 2.0;
    const r = rCm / 100.0;
    const area = Math.PI * r * r;
    autoCLinearRef.current = 0.02 / Math.max(0.001, mRef.current);
    const rho = 1.2;
    const Cd = dragCdRef.current || 0.47;
    autoKDragRef.current = ((0.5 * rho * Cd * area) / Math.max(0.001, mRef.current)) * 2.5;
  }, []);

  const pushReadouts = React.useCallback((force = false) => {
    const now = performance.now();
    if (!force && now - lastReadoutPushRef.current < 100) return;
    lastReadoutPushRef.current = now;
    const energies = computeEnergies(thetaRef.current, omegaRef.current, mRef.current, LRef.current);
    setReadouts({
      ke: energies.ke,
      pe: energies.pe,
      te: energies.total,
      osc: oscCountRef.current,
      timerMs: timerRunningRef.current ? Math.round(simElapsedRef.current) : Math.round(simElapsedRef.current),
    });
  }, []);

  const sampleAndLog = React.useCallback(
    (t: number) => {
      const energies = computeEnergies(thetaRef.current, omegaRef.current, mRef.current, LRef.current);
      dataLogRef.current.push({
        t,
        theta: thetaRef.current,
        omega: omegaRef.current,
        ke: energies.ke,
        pe: energies.pe,
        total: energies.total,
      });
      if (dataLogRef.current.length > TRAIL_MAX) dataLogRef.current.shift();
    },
    [],
  );

  /** Exact port of the original `drawScene` (plus DPR scaling). */
  const drawScene = React.useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const W = canvas.width / (window.devicePixelRatio || 1);
    const H = canvas.height / (window.devicePixelRatio || 1);
    ctx.setTransform(window.devicePixelRatio || 1, 0, 0, window.devicePixelRatio || 1, 0, 0);
    ctx.clearRect(0, 0, W, H);

    const cx = W / 2;
    const topPadding = 36;
    const maxL = 3.0;
    const availableHeight = H - topPadding - 40;
    const pxPerM = Math.max(80, Math.min(220, Math.floor(availableHeight / (maxL + 0.2))));
    const cy = topPadding;

    // pivot
    ctx.fillStyle = '#111827';
    ctx.beginPath();
    ctx.arc(cx, cy, 6, 0, Math.PI * 2);
    ctx.fill();

    const L = LRef.current;
    const theta = thetaRef.current;
    const px = cx + L * pxPerM * Math.sin(theta);
    const py = cy + L * pxPerM * Math.cos(theta);

    // motion trail (scaled with pxPerM so it matches the rod)
    const log = dataLogRef.current;
    if (log.length > 1) {
      ctx.strokeStyle = 'rgba(59,130,246,0.3)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      for (let i = 0; i < log.length; i++) {
        const x = cx + L * pxPerM * Math.sin(log[i].theta);
        const y = cy + L * pxPerM * Math.cos(log[i].theta);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
    }

    // rod
    ctx.strokeStyle = '#374151';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(px, py);
    ctx.stroke();

    // bob
    ctx.fillStyle = '#111827';
    ctx.beginPath();
    ctx.arc(px, py, 14, 0, Math.PI * 2);
    ctx.fill();
  }, []);

  /** Responsive canvas sizing (original `resizeCanvasToContainer`). */
  const resizeCanvas = React.useCallback(() => {
    const canvas = canvasRef.current;
    const wrap = canvasWrapRef.current;
    if (!canvas || !wrap) return;
    const w = Math.min(1100, wrap.clientWidth);
    const h = Math.max(280, Math.round((w * 9) / 14));
    const dpr = window.devicePixelRatio || 1;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    drawScene();
  }, [drawScene]);

  /* --------------------------- simulation loop --------------------------- */

  const startSimTimer = () => {
    if (timerRunningRef.current) return;
    simStartRef.current = performance.now() - simElapsedRef.current;
    timerRunningRef.current = true;
  };
  const stopSimTimer = () => {
    timerRunningRef.current = false;
  };

  const stepFrameRef = React.useRef<(now: number) => void>(() => {});

  const stepFrame = React.useCallback(
    (now: number) => {
      if (lastTimeRef.current == null) lastTimeRef.current = now;
      const dtMs = now - lastTimeRef.current;
      lastTimeRef.current = now;
      const dt = Math.min(0.05, dtMs / 1000);

      const cLinear = autoEnvRef.current
        ? autoCLinearRef.current
        : (dampingRef.current || 0) / Math.max(0.001, mRef.current);
      const kDrag = autoEnvRef.current ? autoKDragRef.current : 0.02 / Math.max(0.001, mRef.current);
      const gOverL = G / LRef.current;

      const substeps = Math.max(1, Math.floor(dt / (1 / 200)));
      const h = dt / substeps;
      for (let i = 0; i < substeps; i++) {
        const [th, w] = rk4Step(thetaRef.current, omegaRef.current, h, gOverL, cLinear, kDrag);
        thetaRef.current = th;
        omegaRef.current = w;
      }

      accumulatedRef.current += dt;
      const sampT = 1 / SAMPLE_HZ;
      if (accumulatedRef.current >= sampT) {
        const lastT = dataLogRef.current.length ? dataLogRef.current[dataLogRef.current.length - 1].t : 0;
        sampleAndLog(lastT + accumulatedRef.current);
        accumulatedRef.current = 0;
      }
      drawScene();

      // sim timer auto start/stop based on motion
      const motionLevel = Math.abs(omegaRef.current) + Math.abs(thetaRef.current) * 0.1;
      const nowSec = performance.now() / 1000;
      if (motionLevel > MOTION_START_THRESHOLD) {
        lastMotionTimeRef.current = nowSec;
        if (!timerRunningRef.current) startSimTimer();
      } else if (timerRunningRef.current && nowSec - lastMotionTimeRef.current > MOTION_STOP_TIMEOUT) {
        stopSimTimer();
      }
      if (timerRunningRef.current) {
        simElapsedRef.current = performance.now() - simStartRef.current;
      }

      // oscillation counting (zero crossing to positive side)
      const sign = Math.sign(thetaRef.current);
      if (lastSignRef.current !== null && sign > 0 && lastSignRef.current <= 0) {
        oscCountRef.current += 1;
      }
      lastSignRef.current = sign;

      pushReadouts();

      if (runningRef.current) {
        rafRef.current = requestAnimationFrame((t) => stepFrameRef.current(t));
      } else {
        rafRef.current = null;
      }
    },
    [drawScene, sampleAndLog, pushReadouts],
  );
  React.useEffect(() => {
    stepFrameRef.current = stepFrame;
  }, [stepFrame]);

  /* ------------------------------ actions ------------------------------ */

  const handleStart = () => {
    if (runningRef.current) return;
    runningRef.current = true;
    setRunning(true);
    lastTimeRef.current = null;
    if (dataLogRef.current.length === 0) sampleAndLog(0);
    oscCountRef.current = 0;
    lastSignRef.current = Math.sign(thetaRef.current);
    oscTargetRef.current = oscCountNRef.current || 20;
    rafRef.current = requestAnimationFrame(stepFrame);
  };

  const handlePause = () => {
    runningRef.current = false;
    setRunning(false);
    if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;
  };

  const handleReset = () => {
    runningRef.current = false;
    setRunning(false);
    if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;
    dataLogRef.current = [];
    thetaRef.current = toRad(angleDeg);
    omegaRef.current = 0;
    lastTimeRef.current = null;
    accumulatedRef.current = 0;
    oscCountRef.current = 0;
    lastSignRef.current = null;
    stopSimTimer();
    simElapsedRef.current = 0;
    setChartPoints([]);
    setChartFit(null);
    setReadouts(ZERO_READOUTS);
    drawScene();
  };

  const handleExportCsv = () => {
    const log = dataLogRef.current;
    if (log.length === 0) {
      notify('No data to export', 'warning');
      return;
    }
    let csv = 'time,theta,omega,ke,pe,total\n';
    for (const r of log) {
      csv += `${r.t.toFixed(6)},${r.theta.toFixed(6)},${r.omega.toFixed(6)},${r.ke.toFixed(6)},${r.pe.toFixed(6)},${r.total.toFixed(6)}\n`;
    }
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'pendulum-data.csv';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    notify(`Exported ${log.length} samples as pendulum-data.csv`, 'success');
  };

  /* --------------------------- control handlers --------------------------- */

  const handleLength = (v: string) => {
    const cm = parseFloat(v) || 0;
    setLengthCm(cm);
    LRef.current = cm / 100;
    drawScene();
  };
  const handleMass = (v: string) => {
    const m = parseFloat(v) || 0;
    setMassKg(m);
    mRef.current = m;
    if (autoEnvRef.current) computeAutoCoeffs();
  };
  const handleAngle = (v: string) => {
    const d = parseFloat(v) || 0;
    setAngleDeg(d);
    thetaRef.current = toRad(d);
    drawScene();
  };
  const handleDamping = (v: string) => {
    const d = parseFloat(v) || 0;
    setDampingVal(d);
    dampingRef.current = d;
  };
  const handleBobRadius = (v: string) => {
    const r = parseFloat(v) || 0;
    setBobRadiusCm(r);
    bobRadiusRef.current = r;
    if (autoEnvRef.current) computeAutoCoeffs();
  };
  const handleDragCd = (v: string) => {
    const c = parseFloat(v) || 0;
    setDragCdVal(c);
    dragCdRef.current = c;
    if (autoEnvRef.current) computeAutoCoeffs();
  };
  const handleAutoEnv = (checked: boolean) => {
    setAutoEnv(checked);
    autoEnvRef.current = checked;
    if (checked) computeAutoCoeffs();
    else {
      autoCLinearRef.current = 0;
      autoKDragRef.current = 0;
    }
  };
  const handleOscCount = (v: string) => {
    const n = parseInt(v, 10) || 1;
    setOscCountN(n);
    oscCountNRef.current = n;
  };

  /* ------------------------ measurement table logic ------------------------ */

  /** Same rules as the original `validateField`. Returns an error message or null. */
  const validateValue = (field: keyof MeasRow, raw: string): string | null => {
    const v = raw.trim();
    if (field === 'L') {
      const n = parseFloat(v);
      if (isNaN(n) || !isFinite(n) || n <= 0) return 'Enter L > 0';
    }
    if (field === 'N') {
      const n = parseFloat(v);
      if (isNaN(n) || !isFinite(n) || n < 1 || Math.floor(n) !== n) return 'N must be integer ≥ 1';
    }
    if (field === 't1' || field === 't2') {
      if (v === '') return null;
      const n = parseFloat(v);
      if (isNaN(n) || !isFinite(n) || n <= 0) return 'Enter time > 0';
    }
    return null;
  };

  const handleFieldChange = (rowIdx: number, field: keyof MeasRow, value: string) => {
    setRows((prev) => prev.map((r, i) => (i === rowIdx ? { ...r, [field]: value } : r)));
    const err = validateValue(field, value);
    setErrors((prev) => {
      const next = { ...prev };
      if (err) next[`${rowIdx}:${field}`] = err;
      else delete next[`${rowIdx}:${field}`];
      return next;
    });
  };

  const handleUseL = (rowIdx: number) => {
    const l = LRef.current.toFixed(3);
    setRows((prev) => prev.map((r, i) => (i === rowIdx ? { ...r, L: l } : r)));
    setErrors((prev) => {
      const next = { ...prev };
      (['L', 'N', 't1', 't2'] as const).forEach((f) => delete next[`${rowIdx}:${f}`]);
      return next;
    });
  };

  const handleClearRow = (rowIdx: number) => {
    setRows((prev) => prev.map((r, i) => (i === rowIdx ? { ...r, t1: '', t2: '' } : r)));
    setErrors((prev) => {
      const next = { ...prev };
      (['L', 'N', 't1', 't2'] as const).forEach((f) => delete next[`${rowIdx}:${f}`]);
      return next;
    });
  };

  const handleClearAll = () => {
    setClearDialogOpen(false);
    setRows(EMPTY_ROWS.map((r) => ({ ...r })));
    setErrors({});
    setFitResult('');
  };

  /** Original `readValidPoints` + `plotBtn` handler. */
  const handlePlot = () => {
    const pts: XYPoint[] = [];
    const invalidRows: number[] = [];
    const newErrors: MeasErrors = {};

    rows.forEach((row, idx) => {
      let rowOk = true;
      (['L', 'N', 't1', 't2'] as const).forEach((f) => {
        const err = validateValue(f, row[f]);
        if (err) {
          newErrors[`${idx}:${f}`] = err;
          rowOk = false;
        }
      });
      if (!rowOk) {
        invalidRows.push(idx + 1);
        return;
      }
      const Lval = parseFloat(row.L);
      const { T2 } = computeRowValues(row);
      const T2val = parseFloat(T2);
      if (!isNaN(Lval) && isFinite(Lval) && Lval > 0 && !isNaN(T2val) && isFinite(T2val) && T2val > 0) {
        pts.push({ x: Lval, y: T2val });
      }
    });

    setErrors(newErrors);

    if (invalidRows.length > 0) {
      notify('Please fix invalid inputs in rows: ' + invalidRows.join(', '), 'error');
      return;
    }
    if (pts.length < 2) {
      notify('Enter at least two valid (L, T^2) rows to plot.', 'warning');
      return;
    }

    const fit = linearFit(pts);
    setChartPoints(pts);
    setChartFit(fit);
    setTab('chart');
    if (fit && Math.abs(fit.a) > 1e-12) {
      const slope = fit.a; // slope = 4π²/g  →  g = 4π²/slope
      const gEst = (4 * Math.PI * Math.PI) / slope;
      setFitResult(
        `Linear fit: T² = ${slope.toFixed(4)}·L + ${fit.b.toFixed(4)} — estimated g = ${gEst.toFixed(3)} m/s²`,
      );
    } else {
      setFitResult('Could not compute fit (degenerate data).');
    }
  };

  /* ------------------------------ effects ------------------------------ */

  // initial canvas sizing + resize handling (original resize listener)
  React.useEffect(() => {
    resizeCanvas();
    const wrap = canvasWrapRef.current;
    if (!wrap || typeof ResizeObserver === 'undefined') return;
    const ro = new ResizeObserver(() => resizeCanvas());
    ro.observe(wrap);
    return () => ro.disconnect();
  }, [resizeCanvas]);

  // cleanup rAF on unmount
  React.useEffect(() => {
    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      runningRef.current = false;
    };
  }, []);

  /* --------------------------- derived values --------------------------- */

  const energyTotal = Math.max(readouts.te, 1e-6);
  const kePct = Math.min(100, Math.max(0, (readouts.ke / energyTotal) * 100));
  const pePct = Math.min(100, Math.max(0, (readouts.pe / energyTotal) * 100));
  const tePct = readouts.te > 0 ? 100 : 0;

  const lengthCaption = `${lengthCm.toFixed(1)} cm (${(lengthCm / 100).toFixed(2)} m)`;

  /* --------------------------- shared sub-views --------------------------- */

  const analysisPanel = (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 1 }}>
        <Box>
          <Typography sx={{ fontWeight: 500 }}>Analysis</Typography>
          <Typography sx={{ fontSize: 14, mt: 0.5, color: '#334155' }} className="hide-on-xs">
            Live chart and measurements for quick analysis.
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          <Button
            size="small"
            onClick={() => setTab('chart')}
            aria-pressed={tab === 'chart'}
            sx={{
              borderRadius: 2,
              fontWeight: 600,
              color: tab === 'chart' ? '#0f172a' : '#334155',
              bgcolor: tab === 'chart' ? 'linear-gradient(180deg, #eef2ff, #e0f2fe)' : 'transparent',
              backgroundImage: tab === 'chart' ? 'linear-gradient(180deg, #eef2ff, #e0f2fe)' : 'none',
              border: '1px solid',
              borderColor: tab === 'chart' ? 'rgba(37,99,235,0.15)' : 'rgba(15,23,42,0.06)',
              boxShadow: tab === 'chart' ? '0 6px 18px rgba(15,23,42,0.04)' : 'none',
            }}
            startIcon={tab === 'chart' ? <InsightsIcon /> : undefined}
          >
            Chart
          </Button>
          <Button
            size="small"
            onClick={() => setTab('table')}
            aria-pressed={tab === 'table'}
            sx={{
              borderRadius: 2,
              fontWeight: 600,
              color: tab === 'table' ? '#0f172a' : '#334155',
              backgroundImage: tab === 'table' ? 'linear-gradient(180deg, #eef2ff, #e0f2fe)' : 'none',
              border: '1px solid',
              borderColor: tab === 'table' ? 'rgba(37,99,235,0.15)' : 'rgba(15,23,42,0.06)',
              boxShadow: tab === 'table' ? '0 6px 18px rgba(15,23,42,0.04)' : 'none',
            }}
            startIcon={tab === 'table' ? <TableChartIcon /> : undefined}
          >
            Table
          </Button>
        </Box>
      </Box>

      <Box sx={{ mt: 1.5 }}>
        {tab === 'chart' && (
          <Box>
            <T2VsLChart points={chartPoints} fit={chartFit} />
            <Typography sx={{ fontSize: 14, mt: 1, color: '#334155' }} aria-live="polite">
              {fitResult}
            </Typography>
          </Box>
        )}
        {tab === 'table' && (
          <Box sx={{ mt: 1 }}>
            <MeasurementTable
              rows={rows}
              errors={errors}
              onFieldChange={handleFieldChange}
              onUseL={handleUseL}
              onClearRow={handleClearRow}
              onClearAll={() => setClearDialogOpen(true)}
              onPlot={handlePlot}
            />
          </Box>
        )}
      </Box>
    </Box>
  );

  const btnBaseSx = {
    borderRadius: '10px',
    fontWeight: 600,
    minHeight: 44,
  } as const;

  /* -------------------------------- render -------------------------------- */

  return (
    <MuiThemeProvider theme={stabTheme}>
      <Box sx={{ bgcolor: '#f1f5f9', minHeight: '100vh', color: '#1e293b' }}>
        {/* Top navigation */}
        <Box component="nav" sx={{ bgcolor: '#fff', borderBottom: 1, borderColor: '#e2e8f0' }}>
          <Box sx={{ maxWidth: 1152, mx: 'auto', px: { xs: 2, sm: 3 } }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                minHeight: 64,
                flexDirection: { xs: 'column', sm: 'row' },
                py: { xs: 1, sm: 0 },
                gap: 1,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, fontSize: 14, flexWrap: 'wrap' }}>
                <Link href="/students/" style={{ color: '#64748b', textDecoration: 'none' }}>
                  Physics Dashboard
                </Link>
                <Box component="span" sx={{ color: '#cbd5e1' }}>/</Box>
                <Link href="/students/practical/physics/" style={{ color: '#64748b', textDecoration: 'none' }}>
                  Experiments
                </Link>
                <Box component="span" sx={{ color: '#cbd5e1' }}>/</Box>
                <Box component="span" sx={{ color: '#0f172a', fontWeight: 500 }}>
                  Simple Pendulum
                </Box>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <IconButton
                  component="a"
                  href="/site/students/practical/physics/WAEC_Simple_Pendulum_DataSheet.pdf"
                  target="_blank"
                  rel="noreferrer"
                  title="WAEC Simple Pendulum datasheet (PDF)"
                  aria-label="Open WAEC datasheet PDF"
                  sx={{ color: '#64748b' }}
                >
                  <DescriptionIcon />
                </IconButton>
                <IconButton
                  component="a"
                  href="/site/students/practical/physics/pendulum-data.csv"
                  target="_blank"
                  rel="noreferrer"
                  title="Sample pendulum data (CSV)"
                  aria-label="Open sample pendulum data CSV"
                  sx={{ color: '#64748b' }}
                >
                  <DownloadIcon />
                </IconButton>
                <IconButton
                  title="View guide"
                  aria-label="View guide"
                  onClick={() => instructionsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                  sx={{ color: '#64748b' }}
                >
                  <MenuBookIcon />
                </IconButton>
              </Box>
            </Box>
          </Box>
        </Box>

        <Box component="main" sx={{ maxWidth: 1152, mx: 'auto', px: { xs: 1.5, sm: 2.5 }, py: 4 }}>
          {/* Header */}
          <Box component="header" sx={{ mb: 4 }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', lg: 'row' },
                alignItems: { xs: 'flex-start', lg: 'flex-start' },
                justifyContent: 'space-between',
                gap: 3,
              }}
            >
              <Box>
                <Typography variant="h4" sx={{ color: '#0f172a', fontWeight: 700, fontSize: { xs: '1.75rem', md: '2rem' } }}>
                  Simple Pendulum
                </Typography>
                <Typography sx={{ mt: 1, fontSize: 18, color: '#475569' }}>
                  Investigation: Relationship between period (T) and length (L)
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
                <Box
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    px: 1.5,
                    py: 0.75,
                    borderRadius: 999,
                    fontSize: 14,
                    fontWeight: 500,
                    color: '#1d4ed8',
                    bgcolor: 'linear-gradient(90deg, #eff6ff, #eef2ff)',
                    backgroundImage: 'linear-gradient(90deg, #eff6ff, #eef2ff)',
                    border: '1px solid #bfdbfe',
                    boxShadow: 1,
                  }}
                >
                  <CheckCircleIcon sx={{ fontSize: 18, mr: 0.75 }} />
                  WAEC-style Practical
                </Box>
                <Button
                  onClick={() =>
                    (simCardRef.current ?? instructionsRef.current)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                  }
                  sx={{
                    display: 'inline-flex',
                    px: 1.5,
                    py: 0.75,
                    borderRadius: 999,
                    fontSize: 14,
                    color: '#047857',
                    bgcolor: '#ecfdf5',
                    border: '1px solid #a7f3d0',
                    '&:hover': { bgcolor: '#d1fae5' },
                    minHeight: 36,
                  }}
                >
                  Start Experiment
                </Button>
              </Box>
            </Box>

            {/* Instructions card */}
            <Box
              ref={instructionsRef}
              sx={{
                mt: 3,
                p: { xs: 2, md: 2.5 },
                borderRadius: '14px',
                backgroundImage: 'linear-gradient(135deg, #eff6ff 0%, #eef2ff 100%)',
                border: '1px solid #bfdbfe',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
                <Box sx={{ flexShrink: 0, p: 1, bgcolor: '#dbeafe', borderRadius: 2 }}>
                  <InfoOutlinedIcon sx={{ color: '#1d4ed8', fontSize: 24 }} />
                </Box>
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography variant="h6" sx={{ color: '#0f172a' }}>
                    Instructions
                  </Typography>
                  <Box
                    component="ol"
                    sx={{ mt: 1.5, pl: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 1, fontSize: 14, color: '#334155' }}
                  >
                    {[
                      'Set the pendulum length L using the slider (choose between ~0.2 m and 3.0 m).',
                      'Use a real stopwatch. Choose N (e.g. 20) for the number of oscillations to time.',
                      'Displace the bob slightly and release. Start your real stopwatch and count N complete oscillations, then stop the stopwatch.',
                      'Enter the measured time as t₁ in the table for the chosen L and N.',
                      'Repeat the timing to obtain t₂ and enter it in the table.',
                      'Change L and repeat steps 2–5 for at least 5 different lengths.',
                      'After entering valid rows, click Plot T² vs L to see the scatter, linear fit, and an estimated g.',
                    ].map((step, i) => (
                      <Box component="li" key={i} sx={{ display: 'flex', alignItems: 'flex-start' }}>
                        <Box
                          sx={{
                            flexShrink: 0,
                            width: 24,
                            height: 24,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: '50%',
                            bgcolor: '#dbeafe',
                            color: '#1d4ed8',
                            fontWeight: 500,
                            fontSize: 12,
                            mr: 1,
                            mt: '1px',
                          }}
                        >
                          {i + 1}
                        </Box>
                        <span>
                          {i === 6 ? (
                            <>
                              After entering valid rows, click <strong>Plot T² vs L</strong> to see the scatter, linear
                              fit, and an estimated g.
                            </>
                          ) : (
                            step
                          )}
                        </span>
                      </Box>
                    ))}
                  </Box>
                  <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', gap: 1, fontSize: 14, flexWrap: 'wrap' }}>
                    <LightbulbOutlinedIcon sx={{ fontSize: 20, color: '#2563eb' }} />
                    <Box component="span" sx={{ color: '#475569', fontWeight: 500 }}>
                      Theory:
                    </Box>
                    <Box component="span" sx={{ color: '#334155' }}>
                      For small angles, T = 2π√(L/g) where g is acceleration due to gravity.
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>

          {/* Main grid */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', lg: 'repeat(12, 1fr)' },
              gap: 2,
              alignItems: 'stretch',
            }}
          >
            {/* Simulation card */}
            <Box ref={simCardRef} sx={{ gridColumn: { lg: 'span 8' }, display: 'flex', flexDirection: 'column' }}>
              <Paper sx={{ p: 2, borderRadius: 2, boxShadow: 1, flex: 1 }}>
                {/* Action buttons */}
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5, flexWrap: 'wrap', gap: 1 }}>
                  <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center', flexWrap: 'wrap' }}>
                    <Button
                      variant="contained"
                      onClick={handleStart}
                      disabled={running}
                      startIcon={<PlayArrowIcon />}
                      aria-label="Start Timer"
                      sx={{ ...btnBaseSx, bgcolor: '#2563eb', backgroundImage: 'linear-gradient(180deg,#2563eb,#1e40af)', '&:hover': { bgcolor: '#1d4ed8' } }}
                    >
                      Start Timer
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={handlePause}
                      disabled={!running}
                      startIcon={<PauseIcon />}
                      aria-label="Pause"
                      sx={btnBaseSx}
                    >
                      Pause
                    </Button>
                    <Button variant="outlined" onClick={handleReset} startIcon={<RefreshIcon />} aria-label="Reset" sx={btnBaseSx}>
                      Reset
                    </Button>
                    <Box sx={{ height: 24, borderRight: '1px solid #e2e8f0', mx: 0.5, display: { xs: 'none', sm: 'block' } }} />
                    <Button variant="outlined" onClick={handleExportCsv} startIcon={<DownloadIcon />} aria-label="Export Data" sx={btnBaseSx}>
                      Export Data
                    </Button>
                  </Box>
                  <Typography sx={{ fontSize: 14, color: '#475569', display: { xs: 'none', sm: 'block' } }}>
                    Use a real stopwatch to time N oscillations and enter the measured times into the table manually.
                  </Typography>
                </Box>

                {/* Sim layout */}
                <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', md: 'row' } }}>
                  <Box sx={{ width: '100%', flex: 1, minWidth: 0 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1, flexWrap: 'wrap', gap: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap' }}>
                        <Typography sx={{ fontSize: 14, fontWeight: 500 }}>Timer:</Typography>
                        <Typography sx={{ fontSize: 14, color: '#64748b', display: { xs: 'none', sm: 'block' } }}>
                          Use a real stopwatch; enter times manually into the table.
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                        <Typography component="label" sx={{ fontSize: 14, fontWeight: 500 }}>
                          Count
                        </Typography>
                        <TextField
                          type="number"
                          value={oscCountN}
                          onChange={(e) => handleOscCount(e.target.value)}
                          aria-label="Number of oscillations to count"
                          sx={{ width: 80 }}
                          slotProps={{ htmlInput: { min: 1, max: 200 }, input: { sx: { fontSize: 14, py: 0.5 } } }}
                        />
                        <Typography sx={{ fontSize: 12, color: '#475569' }}>oscillations</Typography>
                        <Typography sx={{ fontSize: 12, color: '#2563eb', fontWeight: 500 }} aria-live="polite">
                          Counted: {readouts.osc}/{oscCountN || 20}
                        </Typography>
                      </Box>
                    </Box>
                    <Box ref={canvasWrapRef} sx={{ width: '100%' }}>
                      <canvas
                        ref={canvasRef}
                        aria-label="Pendulum simulation canvas"
                        role="img"
                        style={{
                          width: '100%',
                          height: 'auto',
                          borderRadius: 12,
                          backgroundImage: 'linear-gradient(165deg, #f8fafc 0%, #eef2ff 100%)',
                          boxShadow: 'inset 0 2px 6px rgba(15,23,42,0.03)',
                          display: 'block',
                        }}
                      />
                    </Box>
                  </Box>

                  {/* Controls sidebar */}
                  <Box sx={{ width: { xs: '100%', md: 256 }, flexShrink: 0 }}>
                    <Box sx={{ bgcolor: '#f8fafc', p: 1.5, borderRadius: 2 }}>
                      <Typography sx={{ fontSize: 14, fontWeight: 500, mb: 1 }}>Controls</Typography>
                      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 1 }}>
                        <NumberField
                          label="Length (cm)"
                          value={lengthCm}
                          min={1}
                          max={300}
                          step={0.1}
                          caption={lengthCaption}
                          onChange={handleLength}
                          ariaLabel="Pendulum length in centimetres"
                        />
                        <NumberField
                          label="Mass (kg)"
                          value={massKg}
                          min={0.01}
                          max={5}
                          step={0.01}
                          caption={`${massKg.toFixed(2)} kg`}
                          onChange={handleMass}
                          ariaLabel="Pendulum mass in kilograms"
                        />
                        <NumberField
                          label="Initial angle (deg)"
                          value={angleDeg}
                          min={0.1}
                          max={90}
                          step={0.1}
                          caption={`${angleDeg}°`}
                          onChange={handleAngle}
                          ariaLabel="Initial angle in degrees"
                        />
                        <NumberField
                          label="Damping"
                          value={dampingVal}
                          min={0}
                          max={1}
                          step={0.01}
                          disabled={autoEnv}
                          caption={dampingVal.toFixed(2)}
                          onChange={handleDamping}
                          ariaLabel="Damping coefficient"
                        />
                        <NumberField
                          label="Bob radius (cm)"
                          value={bobRadiusCm}
                          min={0.5}
                          max={10}
                          step={0.1}
                          caption={`${bobRadiusCm.toFixed(1)} cm`}
                          onChange={handleBobRadius}
                          ariaLabel="Bob radius in centimetres"
                        />
                        <NumberField
                          label="Drag coefficient (Cd)"
                          value={dragCdVal}
                          min={0.1}
                          max={2.0}
                          step={0.01}
                          caption={dragCdVal.toFixed(2)}
                          onChange={handleDragCd}
                          ariaLabel="Drag coefficient"
                        />
                      </Box>

                      <Box sx={{ mt: 1 }}>
                        <FormControlLabel
                          control={<Checkbox checked={autoEnv} onChange={(e) => handleAutoEnv(e.target.checked)} size="small" />}
                          label={
                            <Typography sx={{ fontSize: 12, color: '#475569' }}>
                              Auto environment (estimate air drag &amp; pivot friction)
                            </Typography>
                          }
                          sx={{ m: 0, alignItems: 'flex-start' }}
                        />
                        <Typography sx={{ fontSize: 12, color: '#64748b', mt: 0.5 }}>
                          When enabled, the simulation estimates air drag and pivot friction from simple physical
                          assumptions; manual damping is disabled.
                        </Typography>
                      </Box>

                      <Box sx={{ mt: 2 }}>
                        <Typography sx={{ fontSize: 14, fontWeight: 500, mb: 1 }}>Energy (Joules)</Typography>
                        <Box sx={{ mt: 1.5 }}>
                          <Typography sx={{ fontSize: 14, fontWeight: 500, mb: 1 }}>Simulation Timer</Typography>
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 1.5,
                              bgcolor: '#f1f5f9',
                              px: 1.5,
                              py: 1,
                              borderRadius: 1.5,
                              boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.03)',
                            }}
                          >
                            <Typography
                              sx={{ fontFamily: 'ui-monospace, monospace', fontSize: 18, fontWeight: 500, color: '#1e293b' }}
                              aria-live="off"
                            >
                              {formatTime(readouts.timerMs)}
                            </Typography>
                          </Box>
                        </Box>
                        <Box
                          sx={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(3, 1fr)',
                            gap: 1,
                            bgcolor: '#f8fafc',
                            p: 1.5,
                            borderRadius: 1.5,
                            mt: 1.5,
                            boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.03)',
                          }}
                        >
                          <EnergyBar label="Kinetic" value={readouts.ke.toFixed(3)} pct={kePct} gradient="linear-gradient(90deg,#60a5fa,#2563eb)" />
                          <EnergyBar label="Potential" value={readouts.pe.toFixed(3)} pct={pePct} gradient="linear-gradient(90deg,#f9a8d4,#fb7185)" />
                          <EnergyBar label="Total" value={readouts.te.toFixed(3)} pct={tePct} gradient="linear-gradient(90deg,#86efac,#16a34a)" />
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Paper>
            </Box>

            {/* Analysis aside (desktop) */}
            <Box
              component="aside"
              sx={{
                gridColumn: { lg: 'span 4' },
                display: { xs: 'none', lg: 'block' },
              }}
            >
              <Box sx={{ position: 'sticky', top: 80, display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Paper sx={{ p: 2, borderRadius: 2, boxShadow: 1, flex: 1 }}>{analysisPanel}</Paper>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Mobile analysis toggle */}
        {!isMobile ? null : (
          <IconButton
            onClick={() => setMobilePanelOpen(true)}
            title="Open analysis"
            aria-label="Open analysis panel"
            sx={{
              position: 'fixed',
              right: 16,
              bottom: 18,
              zIndex: 90,
              borderRadius: 999,
              width: 48,
              height: 48,
              bgcolor: '#2563eb',
              color: '#fff',
              boxShadow: '0 8px 24px rgba(2,6,23,0.12)',
              '&:hover': { bgcolor: '#1d4ed8' },
            }}
          >
            <InsightsIcon />
          </IconButton>
        )}

        {/* Mobile analysis bottom sheet */}
        <Drawer
          anchor="bottom"
          open={mobilePanelOpen}
          onClose={() => setMobilePanelOpen(false)}
          sx={{ display: { lg: 'none' } }}
          PaperProps={{
            sx: {
              borderTopLeftRadius: '16px',
              borderTopRightRadius: '16px',
              maxHeight: '85vh',
              p: 2,
              bgcolor: '#fff',
            },
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <IconButton onClick={() => setMobilePanelOpen(false)} aria-label="Close analysis panel" size="small">
              <CloseIcon />
            </IconButton>
          </Box>
          {analysisPanel}
        </Drawer>

        {/* Clear-all confirmation (replaces original confirm()) */}
        <Dialog open={clearDialogOpen} onClose={() => setClearDialogOpen(false)}>
          <DialogTitle>Clear measurement table?</DialogTitle>
          <DialogContent>
            <Typography sx={{ fontSize: 14, color: '#475569' }}>
              All L, N and timing entries will be cleared. This cannot be undone.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setClearDialogOpen(false)} color="inherit">
              Cancel
            </Button>
            <Button onClick={handleClearAll} color="error" variant="contained">
              Clear All
            </Button>
          </DialogActions>
        </Dialog>

        {/* Snackbar notifications (replaces original alert()) */}
        <Snackbar
          open={snack.open}
          autoHideDuration={5000}
          onClose={() => setSnack((s) => ({ ...s, open: false }))}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert
            onClose={() => setSnack((s) => ({ ...s, open: false }))}
            severity={snack.severity}
            variant="filled"
            sx={{ width: '100%' }}
          >
            {snack.message}
          </Alert>
        </Snackbar>
      </Box>
    </MuiThemeProvider>
  );
}
