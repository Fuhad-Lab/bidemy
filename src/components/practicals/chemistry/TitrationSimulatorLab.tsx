'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Slider from '@mui/material/Slider';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import GlobalStyles from '@mui/material/GlobalStyles';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import WaterDropIcon from '@mui/icons-material/WaterDrop';

/**
 * Interactive port of titration-simulator.html merged with the v2 features of
 * titration-simulator-v2.html (click-to-place equipment, droplet animation and
 * live volume readout).
 *
 * Everything runs client-side; no backend/API involved.
 * External PNG icons from the original were replaced with inline SVG drawings.
 */

/* ---------- inline SVG apparatus icons (replace flaticon PNGs) ---------- */

function BuretteIcon({ size = 64 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden>
      <rect x="27" y="4" width="10" height="40" rx="2" stroke="#60a5fa" strokeWidth="2.5" fill="#f0f9ff" />
      <rect x="28.5" y="6" width="7" height="30" fill="#fcd34d" />
      <path d="M32 44v6" stroke="#60a5fa" strokeWidth="2.5" />
      <circle cx="32" cy="53" r="3" fill="#60a5fa" />
      <path d="M24 10h6M24 18h6M24 26h6" stroke="#93c5fd" strokeWidth="1.5" />
    </svg>
  );
}

function FlaskIcon({ size = 64 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden>
      <path
        d="M26 6h12M30 6v18l14 26a6 6 0 0 1-5.2 9H25.2A6 6 0 0 1 20 50l14-26V6"
        stroke="#60a5fa"
        strokeWidth="2.5"
        strokeLinejoin="round"
        fill="rgba(240,249,255,0.6)"
      />
      <path d="M24 40h16l4.6 8.6A4 4 0 0 1 41 54H23a4 4 0 0 1-3.6-5.4L24 40Z" fill="#93c5fd" opacity="0.85" />
    </svg>
  );
}

function PipetteIcon({ size = 64 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden>
      <path d="M30 4h4v30c0 3-2 5-2 8v12a2 2 0 1 1-4 0V42c0-3-2-5-2-8V4Z" stroke="#60a5fa" strokeWidth="2.5" fill="#f0f9ff" />
      <circle cx="30" cy="16" r="4" fill="#93c5fd" opacity="0.7" />
      <path d="M36 8h6M36 16h6" stroke="#93c5fd" strokeWidth="1.5" />
    </svg>
  );
}

function StandIcon({ size = 64 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden>
      <rect x="8" y="52" width="48" height="6" rx="2" stroke="#475569" strokeWidth="2.5" fill="#e2e8f0" />
      <path d="M20 52V10" stroke="#475569" strokeWidth="3" />
      <rect x="18" y="20" width="14" height="4" rx="1" fill="#475569" />
      <circle cx="34" cy="22" r="3" fill="#93c5fd" />
    </svg>
  );
}

/* ------------------------------ data & helpers ------------------------------ */

type EquipmentType = 'burette' | 'flask' | 'pipette' | 'stand';
type SolutionType = 'solution-hno3' | 'solution-naoh';
type DragPayload = EquipmentType | SolutionType;

type Reading = { no: number; initial: string; final: string; used: string };

type SetupState = {
  stand: boolean;
  burette: boolean;
  flask: boolean;
  hno3: boolean;
  naoh: boolean;
};

type StatusType = 'hidden' | 'info' | 'warning' | 'ready';

const FLASK_COLORS = {
  start: '#f87171', // red — acidic start (v1 default)
  near: '#fcd34d', // yellow — near neutral
  basic: '#34d399', // green — basic
  loaded: '#93c5fd', // blue — analyte added (v2)
};

const EQUIPMENT_TRAY: { type: EquipmentType; label: string; icon: React.ReactNode }[] = [
  { type: 'burette', label: 'Burette', icon: <BuretteIcon /> },
  { type: 'flask', label: 'Flask', icon: <FlaskIcon /> },
  { type: 'pipette', label: 'Pipette', icon: <PipetteIcon /> },
  { type: 'stand', label: 'Burette Stand', icon: <StandIcon /> },
];

export type TitrationSimulatorLabProps = {
  title: string;
  subtitle: string;
};

export default function TitrationSimulatorLab({ title, subtitle }: TitrationSimulatorLabProps) {
  /* ------------------------------- state ------------------------------- */
  const [setup, setSetup] = React.useState<SetupState>({
    stand: false,
    burette: false,
    flask: false,
    hno3: false,
    naoh: false,
  });
  const [currentVolume, setCurrentVolume] = React.useState(50.0);
  const [isExperimentActive, setIsExperimentActive] = React.useState(false);
  const [flowRate, setFlowRate] = React.useState(1);
  const [readings, setReadings] = React.useState<Reading[]>([
    { no: 1, initial: '0.00', final: '—', used: '—' },
  ]);
  const [statusType, setStatusType] = React.useState<StatusType>('hidden');
  const [statusMsg, setStatusMsg] = React.useState('');
  const [flaskColor, setFlaskColor] = React.useState<string>(FLASK_COLORS.start);
  const [dragOver, setDragOver] = React.useState<string | null>(null);
  const [droplets, setDroplets] = React.useState<number[]>([]);
  const [avgVolume, setAvgVolume] = React.useState('');
  const [acidConcentration, setAcidConcentration] = React.useState('');
  const [saltMass, setSaltMass] = React.useState('');
  const [toast, setToast] = React.useState<string | null>(null);

  const dropletSeq = React.useRef(0);

  /* --------------------------- status helpers --------------------------- */

  const checkExperimentReadiness = (state: SetupState) => {
    if (Object.values(state).every(Boolean)) {
      setStatusType('ready');
      setStatusMsg('Ready to start titration');
      setIsExperimentActive(true);
    } else {
      const missing = Object.entries(state)
        .filter(([, v]) => !v)
        .map(([k]) => k);
      setStatusType('warning');
      setStatusMsg(`Missing: ${missing.join(', ')}`);
    }
  };

  const showMessage = (message: string) => {
    setStatusType('info');
    setStatusMsg(message);
  };

  /* ------------------------- equipment placement ------------------------ */

  const handleEquipmentPlacement = (type: DragPayload) => {
    const next = { ...setup };
    switch (type) {
      case 'stand':
        if (!next.stand) {
          next.stand = true;
          showMessage('Stand placed — now drop the burette here');
        }
        break;
      case 'burette':
        if (next.stand) {
          next.burette = true;
        } else {
          showMessage('Please set up the stand first');
        }
        break;
      case 'flask':
        next.flask = true;
        break;
      case 'solution-hno3':
        if (next.burette) {
          next.hno3 = true;
        } else {
          showMessage('Set up the burette first');
        }
        break;
      case 'solution-naoh':
        if (next.flask) {
          next.naoh = true;
        } else {
          showMessage('Set up the flask first');
        }
        break;
    }
    setSetup(next);
    checkExperimentReadiness(next);
  };

  /* ---------------------------- drag and drop --------------------------- */

  const onDragStart = (e: React.DragEvent, type: DragPayload) => {
    e.dataTransfer.setData('text/plain', type);
    e.dataTransfer.effectAllowed = 'move';
  };

  const onZoneDrop = (e: React.DragEvent, zone: string) => {
    e.preventDefault();
    setDragOver(null);
    const type = e.dataTransfer.getData('text/plain') as DragPayload;
    // Only burette/stand belong on the stand zone; flask on the flask zone;
    // solutions target the burette/flask liquids (same zones in this layout).
    if (zone === 'stand-zone' && (type === 'stand' || type === 'burette')) {
      handleEquipmentPlacement(type);
    } else if (zone === 'flask-zone' && type === 'flask') {
      handleEquipmentPlacement(type);
    } else if (zone === 'burette-liquid' && type === 'solution-hno3') {
      handleEquipmentPlacement(type);
    } else if (zone === 'flask-liquid' && type === 'solution-naoh') {
      handleEquipmentPlacement(type);
    }
  };

  /* ------------------------------- titrate ------------------------------ */

  const spawnDroplet = () => {
    const id = ++dropletSeq.current;
    setDroplets((d) => [...d, id]);
    window.setTimeout(() => {
      setDroplets((d) => d.filter((x) => x !== id));
    }, 1000);
  };

  const addDrop = () => {
    if (!isExperimentActive) return;
    const rate = flowRate;
    const next = Math.max(0, +(currentVolume - rate * 0.1).toFixed(2));
    setCurrentVolume(next);
    spawnDroplet();

    if (next < 25) {
      setFlaskColor(FLASK_COLORS.basic);
    } else if (next < 30) {
      setFlaskColor(FLASK_COLORS.near);
    }

    if (next <= 0) {
      setIsExperimentActive(false);
      setReadings((prev) => {
        const rows = [...prev];
        const pending = rows.find((r) => r.final === '—');
        if (pending) {
          return rows.map((r) =>
            r === pending ? { ...r, final: '0.00', used: '50.00' } : r,
          );
        }
        return [...rows, { no: rows.length + 1, initial: '50.00', final: '0.00', used: '50.00' }];
      });
    }
  };

  const reset = () => {
    setCurrentVolume(50.0);
    setFlaskColor(FLASK_COLORS.start);
    setIsExperimentActive(true);
    setStatusType('ready');
    setStatusMsg('Ready to start titration');
    setDroplets([]);
  };

  /* ---------------------------- calculations ---------------------------- */

  const submitReadings = () => {
    const volumes = readings
      .filter((r) => r.final !== '—')
      .map((r) => parseFloat(r.used))
      .filter((v) => !Number.isNaN(v));
    if (volumes.length === 0) {
      setToast('Please complete at least one titration');
      return;
    }
    const avg = volumes.reduce((a, b) => a + b, 0) / volumes.length;
    setAvgVolume(`${avg.toFixed(2)} cm³`);

    const concentration = (0.1 * avg) / 25.0; // M₁V₁ = M₂V₂
    setAcidConcentration(concentration.toFixed(4));

    const molarMass = 85; // g/mol for NaNO₃
    const mass = concentration * 0.25 * molarMass;
    setSaltMass(`${mass.toFixed(4)} g`);
    setToast('Readings submitted');
  };

  /* ------------------------------- render ------------------------------- */

  const buretteLiquidHeight = Math.max(0, currentVolume * 2);

  return (
    <PracticalsLabStyles>
      <Box sx={{ backgroundColor: '#f9fafb', minHeight: '100vh', py: 4 }}>
        <Container maxWidth="xl">
          {/* Header */}
          <Box component="header" sx={{ textAlign: 'center', mb: 4 }}>
            <Typography variant="h4" component="h1" sx={{ color: '#111827' }}>
              {title}
            </Typography>
            <Typography variant="body1" sx={{ color: '#4b5563', mt: 1 }}>
              {subtitle}
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'grid',
              gap: 4,
              gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
              alignItems: 'start',
            }}
          >
            {/* ------------------------- Left column ------------------------- */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <Paper elevation={1} sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Titration Setup
                </Typography>

                {/* Equipment tray */}
                <Box
                  sx={{
                    backgroundColor: '#f3f4f6',
                    borderRadius: '8px',
                    p: 2,
                    display: 'flex',
                    gap: 2,
                    flexWrap: 'wrap',
                    mb: 2,
                  }}
                >
                  {EQUIPMENT_TRAY.map((item) => (
                    <Paper
                      key={item.type}
                      elevation={0}
                      draggable
                      onDragStart={(e) => onDragStart(e, item.type)}
                      onClick={() => handleEquipmentPlacement(item.type)}
                      sx={{
                        cursor: 'grab',
                        userSelect: 'none',
                        p: 1,
                        borderRadius: '8px',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                        textAlign: 'center',
                        transition: 'transform 0.2s',
                        '&:hover': { transform: 'scale(1.05)' },
                      }}
                    >
                      {item.icon}
                      <Typography variant="caption" component="p">
                        {item.label}
                      </Typography>
                    </Paper>
                  ))}
                </Box>

                {/* Lab bench */}
                <Box
                  sx={{
                    background: '#8b5e3c',
                    borderRadius: '8px',
                    p: 2,
                    mb: 2,
                  }}
                >
                  <Box sx={{ position: 'relative', minHeight: 480 }}>
                    {/* Stand / burette drop zone + apparatus */}
                    <Box
                      onDragOver={(e) => {
                        e.preventDefault();
                        setDragOver('stand-zone');
                      }}
                      onDragLeave={() => setDragOver(null)}
                      onDrop={(e) => onZoneDrop(e, 'stand-zone')}
                      sx={{
                        position: 'absolute',
                        left: '18%',
                        top: 0,
                        width: 176,
                        height: '100%',
                        border: '2px dashed',
                        borderColor: dragOver === 'stand-zone' ? '#3b82f6' : '#d1d5db',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor:
                          dragOver === 'stand-zone' ? 'rgba(59,130,246,0.08)' : 'transparent',
                        transition: 'background-color 0.2s, border-color 0.2s',
                      }}
                    >
                      {!setup.stand && (
                        <Typography variant="body2" sx={{ color: '#e5e7eb' }}>
                          Drop Stand Here (or click the tray)
                        </Typography>
                      )}
                      {setup.stand && !setup.burette && (
                        <Typography variant="body2" sx={{ color: '#e5e7eb' }}>
                          Drop Burette Here
                        </Typography>
                      )}
                      {setup.stand && setup.burette && (
                        <Box className="buretteRig" sx={{ position: 'relative' }}>
                          {/* Stand rod */}
                          <Box
                            sx={{
                              position: 'absolute',
                              left: -70,
                              top: -20,
                              bottom: -20,
                              width: 10,
                              backgroundColor: '#4a5568',
                              borderRadius: 2,
                            }}
                          />
                          {/* Clamp */}
                          <Box
                            sx={{
                              position: 'absolute',
                              left: -32,
                              top: 40,
                              width: 36,
                              height: 12,
                              backgroundColor: '#2d3748',
                              borderRadius: 1,
                            }}
                          />
                          {/* Burette tube */}
                          <Box
                            onDragOver={(e) => {
                              e.preventDefault();
                              setDragOver('burette-liquid');
                            }}
                            onDragLeave={() => setDragOver(null)}
                            onDrop={(e) => onZoneDrop(e, 'burette-liquid')}
                            sx={{
                              position: 'relative',
                              width: 40,
                              height: 400,
                              backgroundColor: '#f0f9ff',
                              border: '2px solid #93c5fd',
                              borderRadius: '8px 8px 0 0',
                              overflow: 'visible',
                              cursor: 'pointer',
                            }}
                            onClick={() => handleEquipmentPlacement('solution-hno3')}
                          >
                            <Box
                              className="buretteLiquid"
                              sx={{
                                position: 'absolute',
                                bottom: 0,
                                left: 0,
                                right: 0,
                                height: `${buretteLiquidHeight}%`,
                                backgroundColor: setup.hno3 ? '#fcd34d' : 'transparent',
                                borderRadius: '6px 6px 0 0',
                                transition: 'height 0.5s ease-in-out',
                              }}
                            />
                            {/* scale */}
                            <Box
                              sx={{
                                position: 'absolute',
                                right: -22,
                                top: 0,
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                fontSize: 10,
                                color: '#f8fafc',
                              }}
                            >
                              {[50, 40, 30, 20, 10, 0].map((v) => (
                                <span key={v}>{v}</span>
                              ))}
                            </Box>
                            {/* jet */}
                            <Box
                              sx={{
                                position: 'absolute',
                                bottom: -14,
                                left: '50%',
                                transform: 'translateX(-50%)',
                                width: 4,
                                height: 14,
                                backgroundColor: '#93c5fd',
                                borderRadius: '0 0 2px 2px',
                              }}
                            />
                          </Box>
                        </Box>
                      )}
                    </Box>

                    {/* Flask drop zone + apparatus */}
                    <Box
                      onDragOver={(e) => {
                        e.preventDefault();
                        setDragOver('flask-zone');
                      }}
                      onDragLeave={() => setDragOver(null)}
                      onDrop={(e) => onZoneDrop(e, 'flask-zone')}
                      sx={{
                        position: 'absolute',
                        left: '55%',
                        bottom: 0,
                        width: 208,
                        height: 272,
                        border: '2px dashed',
                        borderColor: dragOver === 'flask-zone' ? '#3b82f6' : '#d1d5db',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'flex-end',
                        justifyContent: 'center',
                        backgroundColor:
                          dragOver === 'flask-zone' ? 'rgba(59,130,246,0.08)' : 'transparent',
                        transition: 'background-color 0.2s, border-color 0.2s',
                        pb: 2,
                      }}
                    >
                      {!setup.flask && (
                        <Typography variant="body2" sx={{ color: '#e5e7eb' }}>
                          Drop Flask Here
                        </Typography>
                      )}
                      {setup.flask && (
                        <Box
                          onDragOver={(e) => {
                            e.preventDefault();
                            setDragOver('flask-liquid');
                          }}
                          onDragLeave={() => setDragOver(null)}
                          onDrop={(e) => onZoneDrop(e, 'flask-liquid')}
                          sx={{
                            position: 'relative',
                            width: 200,
                            height: 250,
                            border: '2px solid #93c5fd',
                            borderRadius: '0 0 100px 100px',
                            borderTop: 'none',
                            cursor: 'pointer',
                            overflow: 'hidden',
                          }}
                          onClick={() => handleEquipmentPlacement('solution-naoh')}
                        >
                          <Box
                            className="flaskLiquid"
                            sx={{
                              position: 'absolute',
                              bottom: 0,
                              left: 0,
                              right: 0,
                              height: 100,
                              backgroundColor: setup.naoh ? flaskColor : 'transparent',
                              borderRadius: '0 0 98px 98px',
                              transition: 'background-color 0.5s ease-in-out',
                            }}
                          />
                        </Box>
                      )}
                    </Box>

                    {/* droplets */}
                    {droplets.map((id) => (
                      <Box
                        key={id}
                        className="labDroplet"
                        sx={{
                          position: 'absolute',
                          left: 'calc(18% + 86px)',
                          top: 414,
                          width: 8,
                          height: 8,
                          borderRadius: '50%',
                          backgroundColor: setup.hno3 ? '#fcd34d' : '#93c5fd',
                          pointerEvents: 'none',
                        }}
                      />
                    ))}

                    {/* status chip */}
                    {statusType !== 'hidden' && (
                      <Box
                        sx={{
                          position: 'absolute',
                          top: 16,
                          right: 16,
                          px: 2,
                          py: 1,
                          borderRadius: 999,
                          color: '#fff',
                          backgroundColor:
                            statusType === 'ready'
                              ? '#16a34a'
                              : statusType === 'warning'
                                ? '#dc2626'
                                : '#ca8a04',
                          fontSize: 14,
                          maxWidth: 260,
                        }}
                      >
                        {statusMsg}
                      </Box>
                    )}
                  </Box>
                </Box>

                {/* Solutions panel */}
                <Paper elevation={0} sx={{ p: 2, border: '1px solid #e5e7eb' }}>
                  <Typography variant="subtitle1" sx={{ mb: 1.5 }}>
                    Solutions
                  </Typography>
                  <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                    {(
                      [
                        { type: 'solution-hno3', name: 'HNO₃', desc: '5.00g in 500cm³', bg: '#fef9c3' },
                        { type: 'solution-naoh', name: 'NaOH', desc: 'Unknown concentration', bg: '#dbeafe' },
                      ] as const
                    ).map((sol) => (
                      <Paper
                        key={sol.type}
                        elevation={0}
                        draggable
                        onDragStart={(e) => onDragStart(e, sol.type)}
                        onClick={() => handleEquipmentPlacement(sol.type)}
                        sx={{
                          p: 1,
                          borderRadius: '8px',
                          backgroundColor: sol.bg,
                          textAlign: 'center',
                          cursor: 'grab',
                          userSelect: 'none',
                          boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
                          '&:hover': { transform: 'scale(1.03)' },
                          transition: 'transform 0.2s',
                        }}
                      >
                        <Typography variant="body2">{sol.name}</Typography>
                        <Typography variant="caption" sx={{ color: '#4b5563' }}>
                          {sol.desc}
                        </Typography>
                      </Paper>
                    ))}
                  </Box>
                  <Typography variant="caption" sx={{ color: '#6b7280', display: 'block', mt: 1 }}>
                    Tip: drag a solution onto the burette / flask liquid — or simply click it.
                  </Typography>
                </Paper>
              </Paper>

              {/* Controls */}
              <Paper elevation={1} sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2, flexWrap: 'wrap' }}>
                  <Button
                    variant="contained"
                    startIcon={<WaterDropIcon />}
                    onClick={addDrop}
                    disabled={!isExperimentActive}
                  >
                    Add Drop
                  </Button>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="body2" sx={{ color: '#4b5563' }}>
                      Volume:
                    </Typography>
                    <Typography component="span" sx={{ fontFamily: 'monospace', fontWeight: 600 }}>
                      {currentVolume.toFixed(2)} cm³
                    </Typography>
                  </Box>
                  <Button variant="contained" color="inherit" onClick={reset} startIcon={<RestartAltIcon />}>
                    Reset
                  </Button>
                </Box>
                <Box sx={{ mt: 3 }}>
                  <Typography variant="body2" sx={{ mb: 1, color: '#374151' }}>
                    Flow Rate
                  </Typography>
                  <Slider
                    value={flowRate}
                    onChange={(_, v) => setFlowRate(v as number)}
                    min={1}
                    max={10}
                    step={1}
                    marks
                    valueLabelDisplay="auto"
                    aria-label="Flow rate"
                  />
                </Box>
              </Paper>
            </Box>

            {/* ------------------------- Right column ------------------------- */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <Paper elevation={1} sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Burette Readings
                </Typography>
                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      <TableRow sx={{ backgroundColor: '#f3f4f6' }}>
                        <TableCell align="center">Reading No.</TableCell>
                        <TableCell align="center">Initial (cm³)</TableCell>
                        <TableCell align="center">Final (cm³)</TableCell>
                        <TableCell align="center">Volume Used (cm³)</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {readings.map((r) => (
                        <TableRow key={r.no}>
                          <TableCell align="center">{r.no}</TableCell>
                          <TableCell align="center">{r.initial}</TableCell>
                          <TableCell align="center">{r.final}</TableCell>
                          <TableCell align="center">{r.used}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>

              <Paper elevation={1} sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Calculations
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <TextField
                    label="Average Volume Used"
                    value={avgVolume}
                    slotProps={{ input: { readOnly: true } }}
                    size="small"
                  />
                  <TextField
                    label="Concentration of HNO₃ (mol dm⁻³)"
                    value={acidConcentration}
                    slotProps={{ input: { readOnly: true } }}
                    size="small"
                  />
                  <TextField
                    label="Mass of NaNO₃ formed (g)"
                    value={saltMass}
                    slotProps={{ input: { readOnly: true } }}
                    size="small"
                  />
                </Box>
              </Paper>

              <Paper elevation={1} sx={{ p: 3 }}>
                <Button
                  fullWidth
                  variant="contained"
                  color="success"
                  onClick={submitReadings}
                >
                  Submit Readings
                </Button>
              </Paper>
            </Box>
          </Box>
        </Container>

        {/* transient toast (replaces the original alert()) */}
        {toast ? (
          <Box
            role="status"
            sx={{
              position: 'fixed',
              bottom: 24,
              left: '50%',
              transform: 'translateX(-50%)',
              backgroundColor: '#1f2937',
              color: '#fff',
              px: 3,
              py: 1.5,
              borderRadius: '8px',
              boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
              zIndex: 1500,
            }}
            onClick={() => setToast(null)}
          >
            {toast}
          </Box>
        ) : null}
      </Box>
    </PracticalsLabStyles>
  );
}

/** Keyframes for the falling droplet animation (v2 feature). */
function PracticalsLabStyles({ children }: { children: React.ReactNode }) {
  return (
    <>
      <GlobalStyles
        styles={{
          '@keyframes labDropFall': {
            '0%': { transform: 'translateY(0)', opacity: 1 },
            '100%': { transform: 'translateY(120px)', opacity: 0.4 },
          },
          '.labDroplet': {
            animation: 'labDropFall 1s linear',
          },
        }}
      />
      {children}
    </>
  );
}
