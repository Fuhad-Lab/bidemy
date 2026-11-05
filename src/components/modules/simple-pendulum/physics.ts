/**
 * Physics helpers for the Simple Pendulum practical.
 * Ported 1:1 from /home/z/fuhademy/students/practical/physics/simple-pendulum.html
 * (inline <script>): RK4 integrator, energy model, linear regression and
 * stopwatch formatting.
 */

export const G = 9.81; // m/s²

export interface DataSample {
  t: number;
  theta: number;
  omega: number;
  ke: number;
  pe: number;
  total: number;
}

export interface XYPoint {
  x: number;
  y: number;
}

export function toRad(d: number): number {
  return (d * Math.PI) / 180;
}

export function toDeg(r: number): number {
  return (r * 180) / Math.PI;
}

/**
 * One RK4 step of the damped pendulum:
 *   dtheta/dt = omega
 *   domega/dt = -(g/L)·sin(theta) - c_linear·omega - k_drag·omega·|omega|
 * (linear damping scaled by inverse mass + quadratic drag), exactly like the
 * original `rk4_step`.
 */
export function rk4Step(
  theta: number,
  omega: number,
  dt: number,
  gOverL: number,
  cLinear: number,
  kDrag: number,
): [number, number] {
  const f = (th: number, w: number): [number, number] => {
    const drag = kDrag * w * Math.abs(w); // quadratic drag, opposes motion
    return [w, -gOverL * Math.sin(th) - cLinear * w - drag];
  };

  const k1 = f(theta, omega);
  const k2 = f(theta + 0.5 * dt * k1[0], omega + 0.5 * dt * k1[1]);
  const k3 = f(theta + 0.5 * dt * k2[0], omega + 0.5 * dt * k2[1]);
  const k4 = f(theta + dt * k3[0], omega + dt * k3[1]);

  const thNew = theta + (dt / 6) * (k1[0] + 2 * k2[0] + 2 * k3[0] + k4[0]);
  const wNew = omega + (dt / 6) * (k1[1] + 2 * k2[1] + 2 * k3[1] + k4[1]);
  return [thNew, wNew];
}

/** PE = m g L (1 - cos θ), KE = ½ m L² ω² (original `computeEnergies`). */
export function computeEnergies(
  theta: number,
  omega: number,
  m: number,
  L: number,
): { ke: number; pe: number; total: number } {
  const pe = m * G * L * (1 - Math.cos(theta));
  const ke = 0.5 * m * L * L * omega * omega;
  return { ke, pe, total: ke + pe };
}

/** Simple least-squares fit (original `linearFit`). Returns slope/intercept. */
export function linearFit(points: XYPoint[]): { a: number; b: number } | null {
  const n = points.length;
  if (n === 0) return null;
  let sx = 0;
  let sy = 0;
  let sxx = 0;
  let sxy = 0;
  for (const p of points) {
    sx += p.x;
    sy += p.y;
    sxx += p.x * p.x;
    sxy += p.x * p.y;
  }
  const denom = n * sxx - sx * sx;
  if (Math.abs(denom) < 1e-12) return null;
  const a = (n * sxy - sx * sy) / denom;
  const b = (sy - a * sx) / n;
  return { a, b };
}

/** mm:ss.mmm stopwatch format (original `formatTime`/`fmtTime`). */
export function formatTime(ms: number): string {
  const s = Math.floor(ms / 1000);
  const msRem = ms % 1000;
  const mm = Math.floor(s / 60);
  const ss = s % 60;
  return `${String(mm).padStart(2, '0')}:${String(ss).padStart(2, '0')}.${String(msRem).padStart(3, '0')}`;
}
