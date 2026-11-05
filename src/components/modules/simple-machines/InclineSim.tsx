'use client';

/**
 * Inclined-plane simulation — 1:1 port of the incline panel in
 * /home/z/fuhademy/students/simple-machines-module/ (script.js `updateIncline`).
 *
 * Exact original behaviour:
 *   angleDeg ∈ [0..80], mass ∈ [0.1..10] (step 0.1), g = 9.81
 *   downhill force = (mass * g * sin(θ)).toFixed(2)   [N]
 *   acceleration   = (g * sin(θ)).toFixed(3)          [m/s²]
 *   plane group    translate(100,200) rotate(-θ)
 *   block slide    slide = min(1, angle/80); x = 40 + slide*220
 *
 * Deviation (bug fix, documented in the migration report): the original set a
 * rotation on BOTH the plane rect and its parent group (double rotation,
 * letting the block visually detach from the plane at large angles). Here the
 * rotation is applied once at group level and the block slides along the
 * plane surface, which is the clearly intended visual.
 */

import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';

const BRAND = '#0b63b1';
const G = 9.81;

export default function InclineSim() {
  const [angleDeg, setAngleDeg] = React.useState(30);
  const [mass, setMass] = React.useState(1);

  const angleRad = (angleDeg * Math.PI) / 180;
  const downhill = Number((mass * G * Math.sin(angleRad)).toFixed(2));
  const accel = Number((G * Math.sin(angleRad)).toFixed(3));

  const slide = Math.min(1, angleDeg / 80);
  const blockX = 40 + slide * 220;
  const blockY = -44; // rests on the plane surface (group is rotated with the plane)

  const sliderSx = { color: BRAND } as const;

  return (
    <Box sx={{ display: 'flex', gap: 1.5, flexDirection: { xs: 'column', md: 'row' } }}>
      {/* SVG simulation (same viewBox / geometry as the original) */}
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <svg
          viewBox="0 0 600 240"
          preserveAspectRatio="xMidYMid meet"
          aria-label="Inclined plane"
          role="img"
          style={{
            width: '100%',
            height: 220,
            border: '1px solid #e1e7ef',
            borderRadius: 6,
            display: 'block',
          }}
        >
          <rect x={0} y={200} width={600} height={40} fill="#6c6c6c" />
          <g
            style={{
              transform: `translate(100px, 200px) rotate(${-angleDeg}deg)`,
              transition: 'transform 0.25s ease-out',
            }}
          >
            <rect x={0} y={-8} width={360} height={12} fill="#8d6e63" />
            <rect
              x={blockX}
              y={blockY}
              width={40}
              height={40}
              fill="#ffeb3b"
              style={{ transition: 'x 0.25s ease-out' }}
            />
          </g>
          <text x={10} y={20} fontSize={14} fill="#0b2545">
            Angle: {angleDeg}°
          </text>
        </svg>
      </Box>

      {/* Controls */}
      <Box sx={{ width: { xs: '100%', md: 300 }, flexShrink: 0 }}>
        <Typography component="label" htmlFor="incline-angle" sx={{ display: 'block', my: 1, fontSize: 14 }}>
          Angle (degrees): <strong>{angleDeg}°</strong>
        </Typography>
        <Slider
          id="incline-angle"
          value={angleDeg}
          min={0}
          max={80}
          step={1}
          onChange={(_, v) => setAngleDeg(v as number)}
          sx={sliderSx}
          valueLabelDisplay="auto"
          aria-label="Incline angle in degrees"
        />

        <Typography component="label" htmlFor="incline-mass" sx={{ display: 'block', my: 1, fontSize: 14 }}>
          Mass (kg): <strong>{mass.toFixed(1)}</strong>
        </Typography>
        <Slider
          id="incline-mass"
          value={mass}
          min={0.1}
          max={10}
          step={0.1}
          onChange={(_, v) => setMass(v as number)}
          sx={sliderSx}
          valueLabelDisplay="auto"
          aria-label="Block mass in kilograms"
        />

        <Box className="readouts" sx={{ mt: 2 }}>
          <Typography sx={{ my: 0.75, fontSize: 14 }}>
            Downhill force: <strong>{downhill.toFixed(2)}</strong> N
          </Typography>
          <Typography sx={{ my: 0.75, fontSize: 14 }}>
            Acceleration (no friction): <strong>{accel.toFixed(3)}</strong> m/s²
          </Typography>
        </Box>

        <Typography className="hint" sx={{ color: '#666', fontSize: 14, mt: 1 }}>
          Try low and high angles and watch how acceleration changes.
        </Typography>
      </Box>
    </Box>
  );
}
