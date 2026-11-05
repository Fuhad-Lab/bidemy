'use client';

/**
 * T² vs L scatter chart with optional linear-fit overlay.
 *
 * The original page used Chart.js (CDN). Since no chart library may be added
 * to the project (package.json is shared/locked), this component re-creates
 * the exact same chart on a plain <canvas>: linear axes titled
 * "Length (m)" / "T² (s²)", light grid (rgba(15,23,42,0.06)), measurement
 * points in #2563eb (r≈5) and the fit line in #10b981, plus a legend.
 */

import * as React from 'react';
import Box from '@mui/material/Box';
import type { XYPoint } from './physics';

interface Props {
  points: XYPoint[];
  fit: { a: number; b: number } | null;
}

const MARGIN = { top: 16, right: 16, bottom: 42, left: 56 };

function niceTicks(min: number, max: number): number[] {
  const span = max - min || 1;
  const step = Math.pow(10, Math.floor(Math.log10(span / 5)));
  const err = (span / 5) / step;
  const mult = err >= 7.5 ? 10 : err >= 3.5 ? 5 : err >= 1.5 ? 2 : 1;
  const s = step * mult;
  const start = Math.ceil(min / s) * s;
  const ticks: number[] = [];
  for (let v = start; v <= max + 1e-9; v += s) ticks.push(Number(v.toFixed(10)));
  return ticks;
}

export default function T2VsLChart({ points, fit }: Props) {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const wrapRef = React.useRef<HTMLDivElement | null>(null);

  const draw = React.useCallback(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    const cssW = Math.max(220, wrap.clientWidth);
    const cssH = 220;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(cssW * dpr);
    canvas.height = Math.round(cssH * dpr);
    canvas.style.width = `${cssW}px`;
    canvas.style.height = `${cssH}px`;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, cssW, cssH);

    const plotW = cssW - MARGIN.left - MARGIN.right;
    const plotH = cssH - MARGIN.top - MARGIN.bottom;

    // Domain (pad 10% like Chart.js "nice" bounds)
    const xs = points.map((p) => p.x);
    const ys = points.map((p) => p.y);
    let xMin = Math.min(...xs, 0);
    let xMax = Math.max(...xs, 1);
    let yMin = Math.min(...ys, 0);
    let yMax = Math.max(...ys, 1);
    if (points.length === 0) {
      xMax = 3;
      yMax = 4;
    }
    const padX = (xMax - xMin) * 0.1 || 0.5;
    const padY = (yMax - yMin) * 0.1 || 0.5;
    xMin = Math.max(0, xMin - padX);
    xMax = xMax + padX;
    yMin = Math.max(0, yMin - padY);
    yMax = yMax + padY;

    const px = (x: number) => MARGIN.left + ((x - xMin) / (xMax - xMin)) * plotW;
    const py = (y: number) => MARGIN.top + plotH - ((y - yMin) / (yMax - yMin)) * plotH;

    // Grid + ticks
    ctx.strokeStyle = 'rgba(15,23,42,0.06)';
    ctx.fillStyle = '#0f172a';
    ctx.font = '10px Inter, sans-serif';
    ctx.lineWidth = 1;
    for (const t of niceTicks(xMin, xMax)) {
      const X = px(t);
      ctx.beginPath();
      ctx.moveTo(X, MARGIN.top);
      ctx.lineTo(X, MARGIN.top + plotH);
      ctx.stroke();
      ctx.textAlign = 'center';
      ctx.fillText(String(t), X, MARGIN.top + plotH + 14);
    }
    for (const t of niceTicks(yMin, yMax)) {
      const Y = py(t);
      ctx.beginPath();
      ctx.moveTo(MARGIN.left, Y);
      ctx.lineTo(MARGIN.left + plotW, Y);
      ctx.stroke();
      ctx.textAlign = 'right';
      ctx.fillText(String(t), MARGIN.left - 6, Y + 3);
    }

    // Axes lines
    ctx.strokeStyle = 'rgba(15,23,42,0.25)';
    ctx.beginPath();
    ctx.moveTo(MARGIN.left, MARGIN.top);
    ctx.lineTo(MARGIN.left, MARGIN.top + plotH);
    ctx.lineTo(MARGIN.left + plotW, MARGIN.top + plotH);
    ctx.stroke();

    // Axis titles
    ctx.fillStyle = '#475569';
    ctx.font = '600 11px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Length (m)', MARGIN.left + plotW / 2, cssH - 8);
    ctx.save();
    ctx.translate(12, MARGIN.top + plotH / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText('T² (s²)', 0, 0);
    ctx.restore();

    if (points.length === 0) {
      ctx.fillStyle = '#64748b';
      ctx.font = '12px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Enter measurements and press "Plot T² vs L"', MARGIN.left + plotW / 2, MARGIN.top + plotH / 2);
      return;
    }

    // Fit line
    if (fit) {
      const x1 = Math.min(...xs);
      const x2 = Math.max(...xs);
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(px(x1), py(fit.a * x1 + fit.b));
      ctx.lineTo(px(x2), py(fit.a * x2 + fit.b));
      ctx.stroke();
    }

    // Measurement points
    ctx.fillStyle = '#2563eb';
    for (const p of points) {
      ctx.beginPath();
      ctx.arc(px(p.x), py(p.y), 5, 0, Math.PI * 2);
      ctx.fill();
    }
  }, [points, fit]);

  React.useEffect(() => {
    draw();
    const wrap = wrapRef.current;
    if (!wrap || typeof ResizeObserver === 'undefined') return;
    const ro = new ResizeObserver(() => draw());
    ro.observe(wrap);
    return () => ro.disconnect();
  }, [draw]);

  return (
    <Box>
      <div ref={wrapRef} style={{ width: '100%' }}>
        <canvas ref={canvasRef} aria-label="Scatter chart of T squared versus length" role="img" />
      </div>
      <Box sx={{ display: 'flex', gap: 2, mt: 1, alignItems: 'center', flexWrap: 'wrap' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
          <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#2563eb' }} />
          <Box component="span" sx={{ fontSize: 12, color: '#334155' }}>
            Measurements
          </Box>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
          <Box sx={{ width: 16, height: 2, bgcolor: '#10b981' }} />
          <Box component="span" sx={{ fontSize: 12, color: '#334155' }}>
            Linear fit
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
