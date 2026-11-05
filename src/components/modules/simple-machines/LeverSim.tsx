'use client';

/**
 * Lever simulation — 1:1 port of the lever panel in
 * /home/z/fuhademy/students/simple-machines-module/ (index.html + script.js).
 *
 * Exact original behaviour (script.js `updateLever`):
 *   fulcrumX  = -260 + 520 * (fulcrumPct / 100)
 *   leftDist  = |(-120) - fulcrumX| / 10        // scaled units
 *   rightDist = |  140  - fulcrumX| / 10
 *   leftT     = leftF  * leftDist
 *   rightT    = rightF * rightDist
 *   netT      = rightT - leftT
 *   |netT| < 0.5  -> "Status: Balanced"        (beam rotate 0)
 *   netT  > 0     -> "Status: Right side down" (beam rotate 8)
 *   otherwise     -> "Status: Left side down"  (beam rotate -8)
 * The weights stay at their original x offsets (-120 / 140), exactly like
 * the original script which pins them via setAttribute.
 */

import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';

const BRAND = '#0b63b1';

function updateLever(fulcrumPct: number, leftF: number, rightF: number) {
  const fulcrumX = -260 + 520 * (fulcrumPct / 100);
  const leftX = -120;
  const rightX = 140;
  const leftDist = Math.abs(leftX - fulcrumX) / 10;
  const rightDist = Math.abs(rightX - fulcrumX) / 10;

  const leftT = Number((leftF * leftDist).toFixed(2));
  const rightT = Number((rightF * rightDist).toFixed(2));
  const netT = Number((rightT - leftT).toFixed(2));

  let status = 'Status: Balanced';
  let rotation = 0;
  if (Math.abs(netT) >= 0.5) {
    if (netT > 0) {
      status = 'Status: Right side down';
      rotation = 8;
    } else {
      status = 'Status: Left side down';
      rotation = -8;
    }
  }
  return { leftT, rightT, netT: Math.abs(netT), status, rotation };
}

export default function LeverSim() {
  const [fulcrumPct, setFulcrumPct] = React.useState(50);
  const [leftWeight, setLeftWeight] = React.useState(20);
  const [rightWeight, setRightWeight] = React.useState(20);

  const { leftT, rightT, netT, status, rotation } = updateLever(fulcrumPct, leftWeight, rightWeight);

  const sliderSx = {
    color: BRAND,
    '& .MuiSlider-thumb': { '&:hover, &.Mui-focusVisible': { boxShadow: `0 0 0 8px rgba(11,99,177,0.16)` } },
  } as const;

  return (
    <Box
      sx={{
        display: 'flex',
        gap: 1.5,
        flexDirection: { xs: 'column', md: 'row' },
      }}
    >
      {/* SVG simulation (same viewBox / geometry as the original) */}
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <svg
          viewBox="0 0 600 200"
          preserveAspectRatio="xMidYMid meet"
          aria-label="Lever simulation"
          role="img"
          style={{
            width: '100%',
            height: 220,
            border: '1px solid #e1e7ef',
            borderRadius: 6,
            display: 'block',
          }}
        >
          <rect x={0} y={140} width={600} height={20} fill="#444" />
          <polygon points="290,140 310,140 300,110" fill="#6b4" />
          <g
            style={{
              transform: `translate(300px, 120px) rotate(${rotation}deg)`,
              transition: 'transform 0.25s ease-out',
            }}
          >
            <rect x={-260} y={-8} width={520} height={16} rx={4} fill="#2196f3" />
            <circle cx={-120} cy={24} r={12} fill="#ff5722" />
            <circle cx={140} cy={24} r={12} fill="#ff5722" />
          </g>
          <text x={10} y={20} fontSize={14} fill="#0b2545">
            {status}
          </text>
        </svg>
      </Box>

      {/* Controls */}
      <Box sx={{ width: { xs: '100%', md: 300 }, flexShrink: 0 }}>
        <Typography component="label" htmlFor="lever-fulcrum" sx={{ display: 'block', my: 1, fontSize: 14 }}>
          Fulcrum position (% from left): <strong>{fulcrumPct}</strong>
        </Typography>
        <Slider
          id="lever-fulcrum"
          value={fulcrumPct}
          min={10}
          max={90}
          step={1}
          onChange={(_, v) => setFulcrumPct(v as number)}
          sx={sliderSx}
          valueLabelDisplay="auto"
          aria-label="Fulcrum position percent from left"
        />

        <Typography component="label" htmlFor="lever-left" sx={{ display: 'block', my: 1, fontSize: 14 }}>
          Left weight (N): <strong>{leftWeight}</strong>
        </Typography>
        <Slider
          id="lever-left"
          value={leftWeight}
          min={0}
          max={50}
          step={1}
          onChange={(_, v) => setLeftWeight(v as number)}
          sx={sliderSx}
          valueLabelDisplay="auto"
          aria-label="Left weight in newtons"
        />

        <Typography component="label" htmlFor="lever-right" sx={{ display: 'block', my: 1, fontSize: 14 }}>
          Right weight (N): <strong>{rightWeight}</strong>
        </Typography>
        <Slider
          id="lever-right"
          value={rightWeight}
          min={0}
          max={50}
          step={1}
          onChange={(_, v) => setRightWeight(v as number)}
          sx={sliderSx}
          valueLabelDisplay="auto"
          aria-label="Right weight in newtons"
        />

        <Box className="readouts" sx={{ mt: 2 }}>
          <Typography sx={{ my: 0.75, fontSize: 14 }}>
            Left torque: <strong>{leftT.toFixed(2)}</strong> N·m
          </Typography>
          <Typography sx={{ my: 0.75, fontSize: 14 }}>
            Right torque: <strong>{rightT.toFixed(2)}</strong> N·m
          </Typography>
          <Typography sx={{ my: 0.75, fontSize: 14 }}>
            Net torque: <strong>{netT.toFixed(2)}</strong> N·m
          </Typography>
        </Box>

        <Typography className="hint" sx={{ color: '#666', fontSize: 14, mt: 1 }}>
          Move the fulcrum and change weights. Predict which side will tip.
        </Typography>
      </Box>
    </Box>
  );
}
