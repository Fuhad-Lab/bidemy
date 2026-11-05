'use client';

/**
 * Static content sections of the Electrolysis module, ported 1:1 from
 * /home/z/fuhademy/students/chemistry-modules/electrolysis/index.html.
 * Look & feel (colors, spacing, gradients) reproduces the original
 * Tailwind classes via MUI `sx` props. All content text is verbatim.
 */

import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutlineOutlined';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import ScienceIcon from '@mui/icons-material/Science';
import BoltIcon from '@mui/icons-material/Bolt';
import FactoryIcon from '@mui/icons-material/Factory';
import EditIcon from '@mui/icons-material/Edit';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import AssignmentIcon from '@mui/icons-material/Assignment';
import CalculateIcon from '@mui/icons-material/Calculate';
import SchoolIcon from '@mui/icons-material/School';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import PlayVideoIcon from '@mui/icons-material/PlayCircle';
import GroupsIcon from '@mui/icons-material/Groups';

const sectionHeaderSx = {
  mb: 3,
} as const;

function SectionHeader({
  icon,
  color,
  title,
  subtitle,
}: {
  icon: React.ReactNode;
  color: string;
  title: string;
  subtitle: string;
}) {
  return (
    <Box sx={sectionHeaderSx}>
      <Typography
        variant="h5"
        sx={{ color: '#111827', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1.5 }}
      >
        <Box component="span" sx={{ display: 'inline-flex', color, '& svg': { fontSize: 28 } }}>
          {icon}
        </Box>
        {title}
      </Typography>
      <Typography sx={{ color: '#4b5563', mt: 1 }}>{subtitle}</Typography>
    </Box>
  );
}

/* ------------------------------------------------------------------ */
/* 1) Basic Principles                                                 */
/* ------------------------------------------------------------------ */

const KEY_TERMS = [
  { term: 'Electrolyte', def: 'An ionic compound that conducts electricity when molten or in solution' },
  { term: 'Electrodes', def: 'The conductors through which electricity enters or leaves the electrolyte' },
  { term: 'Anode (+)', def: 'The positive electrode where oxidation occurs' },
  { term: 'Cathode (-)', def: 'The negative electrode where reduction occurs' },
];

export function BasicPrinciplesSection() {
  return (
    <Box>
      <SectionHeader
        icon={<MenuBookIcon />}
        color="#3b82f6"
        title="Basic Principles"
        subtitle="Understanding the fundamental concepts of electrolysis"
      />

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {/* Key Terms */}
        <Box sx={{ bgcolor: '#eff6ff', borderRadius: 2, p: 3 }}>
          <Typography sx={{ color: '#1e40af', fontWeight: 600, mb: 2, fontSize: 18 }}>
            Key Terms
          </Typography>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
              gap: 2,
            }}
          >
            {KEY_TERMS.map((kt) => (
              <Paper key={kt.term} elevation={0} sx={{ bgcolor: '#fff', p: 2, borderRadius: 2, boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
                <Typography sx={{ fontWeight: 500, color: '#2563eb' }}>{kt.term}</Typography>
                <Typography sx={{ fontSize: 14, color: '#4b5563', mt: 0.5 }}>{kt.def}</Typography>
              </Paper>
            ))}
          </Box>
        </Box>

        {/* Conductors: Electrons vs Ions */}
        <Paper elevation={0} sx={{ p: 3, borderRadius: 2, boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
          <Typography sx={{ color: '#111827', fontWeight: 600, mb: 1.5, fontSize: 18 }}>
            Conductors: Electrons vs. Ions
          </Typography>
          <Typography sx={{ fontSize: 14, color: '#374151' }}>
            How a substance conducts electricity is key for predicting electrolysis behaviour.
          </Typography>
          <Box component="ul" sx={{ pl: 3, mt: 1.5, fontSize: 14, color: '#374151', display: 'flex', flexDirection: 'column', gap: 1 }}>
            <li>
              <strong>Metals</strong> (e.g., Na, Cu, Mg): conduct via mobile electrons. The metal atoms themselves do not move.
            </li>
            <li>
              <strong>Electrolytes</strong> (e.g., molten PbI₂, aqueous NaOH): conduct via mobile ions (cations and anions); they must be molten or in solution.
            </li>
            <li>
              <strong>Non-conductors</strong>: ionic solids (ions locked in a lattice) and molecular substances (neutral molecules) do not conduct electricity in the solid state.
            </li>
          </Box>
        </Paper>

        <Paper elevation={0} sx={{ p: 3, borderRadius: 2, boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
          <Typography sx={{ color: '#111827', fontWeight: 600, mb: 1.5, fontSize: 18 }}>
            Electrolytes &amp; Electrodes
          </Typography>
          <Typography sx={{ fontSize: 14, color: '#374151' }}>
            Electrolytes can be <strong>strong</strong> (fully ionise in water, good conductors) or{' '}
            <strong>weak</strong> (partially ionise). Electrodes are either <strong>inert</strong> (graphite, Pt) or{' '}
            <strong>active</strong> (e.g., copper which may dissolve).
          </Typography>
          <Typography sx={{ fontSize: 14, color: '#374151', mt: 1.5 }}>
            <strong>Mnemonic:</strong> PANIC — Positive Anode, Negative Is Cathode. Anode = oxidation, Cathode = reduction.
          </Typography>
        </Paper>

        {/* Quick facts */}
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
          <Box
            sx={{
              p: 2,
              borderRadius: 2,
              background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
            }}
          >
            <Typography sx={{ fontWeight: 600, color: '#1e40af', mb: 1 }}>Essential Facts</Typography>
            {['Requires molten or dissolved ionic compounds', 'Uses direct current (DC) electricity'].map((t) => (
              <Box key={t} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, mt: 1 }}>
                <CheckCircleIcon sx={{ color: '#3b82f6', fontSize: 20, mt: '2px' }} />
                <Typography sx={{ fontSize: 14 }}>{t}</Typography>
              </Box>
            ))}
          </Box>
          <Box
            sx={{
              p: 2,
              borderRadius: 2,
              background: 'linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%)',
            }}
          >
            <Typography sx={{ fontWeight: 600, color: '#6d28d9', mb: 1 }}>Applications</Typography>
            {['Metal extraction and purification', 'Electroplating of metals'].map((t) => (
              <Box key={t} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, mt: 1 }}>
                <CheckCircleIcon sx={{ color: '#a855f7', fontSize: 20, mt: '2px' }} />
                <Typography sx={{ fontSize: 14 }}>{t}</Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

/* ------------------------------------------------------------------ */
/* 3) Electrode Processes                                              */
/* ------------------------------------------------------------------ */

const CATHODE_ORDER = [
  { n: 1, title: 'Group 1 Metal Ions', sub: 'Least easily discharged' },
  { n: 2, title: 'Group 2 Metal Ions', sub: 'Ca²⁺, Mg²⁺, etc.' },
  { n: 3, title: 'Other Metal Ions', sub: 'Group 3 onwards (Fe³⁺, Cu²⁺, etc.)' },
  { n: 4, title: 'Hydrogen Ions (H⁺)', sub: 'Forms H₂ gas' },
];

const ANODE_ORDER = [
  { n: 1, title: 'Halide Ions', sub: 'Cl⁻, Br⁻, I⁻ → Halogen gas' },
  { n: 2, title: 'Hydroxide Ions', sub: 'OH⁻ → O₂ + H₂O + e⁻' },
  { n: 3, title: 'Sulfate Ions', sub: 'SO₄²⁻ (usually unreactive)' },
];

export function ElectrodeProcessesSection() {
  return (
    <Box>
      <SectionHeader
        icon={<BoltIcon />}
        color="#eab308"
        title="Electrode Processes"
        subtitle="Understanding ion behavior and discharge order at electrodes"
      />

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
        {/* Cathode */}
        <Box sx={{ background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)', borderRadius: 2, p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
            <Box
              sx={{
                width: 40,
                height: 40,
                bgcolor: '#bfdbfe',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#1d4ed8',
                fontWeight: 500,
              }}
            >
              -
            </Box>
            <Typography sx={{ color: '#1e3a8a', fontWeight: 600, fontSize: 18 }}>At the Cathode (-)</Typography>
          </Box>
          <Paper elevation={0} sx={{ p: 2, borderRadius: 2, boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
            <Typography sx={{ fontWeight: 500, color: '#1e40af', mb: 1.5 }}>Order of Preferential Discharge</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              {CATHODE_ORDER.map((o) => (
                <Box key={o.n} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                  <Box
                    sx={{
                      bgcolor: '#dbeafe',
                      color: '#1d4ed8',
                      fontSize: 14,
                      fontWeight: 500,
                      px: 1,
                      py: 0.25,
                      borderRadius: 1,
                    }}
                  >
                    {o.n}
                  </Box>
                  <Box>
                    <Typography sx={{ fontWeight: 500, color: '#111827' }}>{o.title}</Typography>
                    <Typography sx={{ fontSize: 14, color: '#4b5563' }}>{o.sub}</Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Paper>
        </Box>

        {/* Anode */}
        <Box sx={{ background: 'linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)', borderRadius: 2, p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
            <Box
              sx={{
                width: 40,
                height: 40,
                bgcolor: '#fecaca',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#b91c1c',
                fontWeight: 500,
              }}
            >
              +
            </Box>
            <Typography sx={{ color: '#7f1d1d', fontWeight: 600, fontSize: 18 }}>At the Anode (+)</Typography>
          </Box>
          <Paper elevation={0} sx={{ p: 2, borderRadius: 2, boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
            <Typography sx={{ fontWeight: 500, color: '#991b1b', mb: 1.5 }}>Order of Preferential Discharge</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              {ANODE_ORDER.map((o) => (
                <Box key={o.n} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                  <Box
                    sx={{
                      bgcolor: '#fee2e2',
                      color: '#b91c1c',
                      fontSize: 14,
                      fontWeight: 500,
                      px: 1,
                      py: 0.25,
                      borderRadius: 1,
                    }}
                  >
                    {o.n}
                  </Box>
                  <Box>
                    <Typography sx={{ fontWeight: 500, color: '#111827' }}>{o.title}</Typography>
                    <Typography sx={{ fontSize: 14, color: '#4b5563' }}>{o.sub}</Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Paper>

          <Box sx={{ mt: 2, bgcolor: 'rgba(255,255,255,0.5)', borderRadius: 2, p: 2 }}>
            <Typography sx={{ fontWeight: 500, color: '#7f1d1d', mb: 1 }}>Important Note:</Typography>
            <Typography sx={{ fontSize: 14, color: '#991b1b' }}>
              The order may vary slightly depending on concentration and other factors. Always consider the specific
              conditions of the electrolysis setup.
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Migration & Discharge */}
      <Paper elevation={0} sx={{ mt: 3, p: 3, borderRadius: 2, boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
        <Typography sx={{ color: '#111827', fontWeight: 600, mb: 1.5, fontSize: 18 }}>Migration &amp; Discharge</Typography>
        <Typography sx={{ fontSize: 14, color: '#374151' }}>
          Cations (positive ions like Na⁺, Cu²⁺, H⁺) migrate to the cathode and are reduced (gain electrons). Anions
          (negative ions like Cl⁻, Br⁻, OH⁻) migrate to the anode and are oxidized (lose electrons).
        </Typography>
        <Box sx={{ mt: 1.5, fontSize: 14, color: '#374151' }}>
          <Typography sx={{ fontSize: 14, color: '#374151' }}>
            <strong>At the cathode (reduction):</strong> e.g., Cu²⁺ + 2e⁻ → Cu; 2H⁺ + 2e⁻ → H₂.
          </Typography>
          <Typography sx={{ fontSize: 14, color: '#374151', mt: 1 }}>
            <strong>At the anode (oxidation):</strong> e.g., 2Cl⁻ → Cl₂ + 2e⁻; 4OH⁻ → 2H₂O + O₂ + 4e⁻.
          </Typography>
        </Box>
      </Paper>

      {/* Preferential discharge rules */}
      <Paper elevation={0} sx={{ mt: 3, p: 3, borderRadius: 2, boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
        <Typography sx={{ color: '#111827', fontWeight: 600, mb: 1.5, fontSize: 18 }}>Rules: Who Gets Discharged?</Typography>
        <Typography sx={{ fontSize: 14, color: '#374151' }}>
          In aqueous electrolysis water supplies H⁺ and OH⁻; only one species is discharged at each electrode. Decide
          the product by applying these rules:
        </Typography>
        <Box component="ol" sx={{ pl: 3, mt: 1.5, fontSize: 14, color: '#374151', display: 'flex', flexDirection: 'column', gap: 1 }}>
          <li>
            <strong>Electrochemical series:</strong> at the cathode the least reactive (lowest) ion is discharged. Highly
            reactive metals will not be deposited from aqueous solutions (H⁺ is often discharged instead).
          </li>
          <li>
            <strong>Concentration:</strong> at the anode OH⁻ normally gives O₂, but concentrated halide ions (Cl⁻, Br⁻,
            I⁻) may be preferentially oxidized to halogen gas.
          </li>
          <li>
            <strong>Electrode nature:</strong> inert electrodes provide a surface only; active metal anodes can dissolve
            (e.g., copper anode → Cu²⁺ + 2e⁻).
          </li>
        </Box>
      </Paper>
    </Box>
  );
}

/* ------------------------------------------------------------------ */
/* 4) Industrial Applications                                          */
/* ------------------------------------------------------------------ */

export function IndustrialApplicationsSection() {
  return (
    <Box>
      <SectionHeader
        icon={<FactoryIcon />}
        color="#6b7280"
        title="Industrial Applications"
        subtitle="Real-world applications of electrolysis in industry"
      />

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {/* Aluminium */}
        <Paper elevation={0} sx={{ borderRadius: 2, overflow: 'hidden', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
          <Box sx={{ p: 3, background: 'linear-gradient(90deg, #f9fafb 0%, #f3f4f6 100%)' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 1 }}>
              <Typography sx={{ color: '#111827', fontWeight: 600, fontSize: 18 }}>Extraction of Aluminum</Typography>
              <Box
                sx={{
                  px: 1.5,
                  py: 0.5,
                  fontSize: 14,
                  fontWeight: 500,
                  color: '#4b5563',
                  bgcolor: '#e5e7eb',
                  borderRadius: 999,
                }}
              >
                Hall-Héroult Process
              </Box>
            </Box>
          </Box>
          <Box sx={{ p: 3 }}>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
              <Box>
                <Typography sx={{ fontWeight: 500, color: '#111827', mb: 1.5 }}>Process Components</Typography>
                {[
                  { bg: '#dbeafe', color: '#2563eb', icon: <ScienceIcon sx={{ fontSize: 12 }} />, title: 'Electrolyte', sub: 'Molten aluminum oxide (alumina) dissolved in cryolite' },
                  { bg: '#fee2e2', color: '#dc2626', icon: <BoltIcon sx={{ fontSize: 12 }} />, title: 'Temperature', sub: 'Around 950°C' },
                  { bg: '#f3e8ff', color: '#9333ea', icon: <FactoryIcon sx={{ fontSize: 12 }} />, title: 'Electrodes', sub: 'Carbon (graphite) electrodes' },
                ].map((c) => (
                  <Box key={c.title} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5, mb: 1.5 }}>
                    <Box
                      sx={{
                        width: 24,
                        height: 24,
                        borderRadius: '50%',
                        bgcolor: c.bg,
                        color: c.color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        mt: 0.5,
                      }}
                    >
                      {c.icon}
                    </Box>
                    <Box>
                      <Typography sx={{ fontWeight: 500, color: '#1f2937' }}>{c.title}</Typography>
                      <Typography sx={{ fontSize: 14, color: '#4b5563' }}>{c.sub}</Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
              <Box sx={{ bgcolor: '#f9fafb', borderRadius: 2, p: 2 }}>
                <Typography sx={{ fontWeight: 500, color: '#111827', mb: 1.5 }}>Products &amp; Reactions</Typography>
                <Paper elevation={0} sx={{ bgcolor: '#fff', p: 1.5, borderRadius: 1, boxShadow: '0 1px 2px rgba(0,0,0,0.05)', mb: 1.5 }}>
                  <Typography sx={{ fontSize: 14, fontWeight: 500, color: '#111827' }}>At Cathode:</Typography>
                  <Typography sx={{ fontSize: 14, color: '#4b5563' }}>Al³⁺ + 3e⁻ → Al (molten)</Typography>
                </Paper>
                <Paper elevation={0} sx={{ bgcolor: '#fff', p: 1.5, borderRadius: 1, boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
                  <Typography sx={{ fontSize: 14, fontWeight: 500, color: '#111827' }}>At Anode:</Typography>
                  <Typography sx={{ fontSize: 14, color: '#4b5563' }}>2O²⁻ → O₂ + 4e⁻</Typography>
                </Paper>
              </Box>
            </Box>
          </Box>
        </Paper>

        {/* Chloralkali */}
        <Paper elevation={0} sx={{ borderRadius: 2, overflow: 'hidden', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
          <Box sx={{ p: 3, background: 'linear-gradient(90deg, #f0fdf4 0%, #dcfce7 100%)' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 1 }}>
              <Typography sx={{ color: '#111827', fontWeight: 600, fontSize: 18 }}>Chloralkali Process</Typography>
              <Box
                sx={{
                  px: 1.5,
                  py: 0.5,
                  fontSize: 14,
                  fontWeight: 500,
                  color: '#16a34a',
                  bgcolor: '#dcfce7',
                  borderRadius: 999,
                }}
              >
                Membrane Cell
              </Box>
            </Box>
          </Box>
          <Box sx={{ p: 3 }}>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
              <Box>
                <Typography sx={{ fontWeight: 500, color: '#111827', mb: 1.5 }}>Process Overview</Typography>
                <Typography sx={{ fontSize: 14, color: '#4b5563' }}>
                  Electrolysis of brine (NaCl solution) to produce three valuable products used in various industries
                </Typography>
                <Box sx={{ bgcolor: '#f0fdf4', p: 2, borderRadius: 2, mt: 2 }}>
                  <Typography sx={{ fontWeight: 500, color: '#166534', mb: 1.5 }}>Key Features</Typography>
                  {[
                    'Environmentally friendly membrane process',
                    'High energy efficiency',
                    'Continuous production process',
                  ].map((f) => (
                    <Box key={f} sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <CheckCircleIcon sx={{ color: '#22c55e', fontSize: 18 }} />
                      <Typography sx={{ fontSize: 14, color: '#15803d' }}>{f}</Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
              <Box sx={{ bgcolor: '#f9fafb', borderRadius: 2, p: 2 }}>
                <Typography sx={{ fontWeight: 500, color: '#111827', mb: 1.5 }}>Products</Typography>
                {[
                  { icon: <ScienceIcon sx={{ color: '#eab308' }} />, title: 'Chlorine Gas (Cl₂)', sub: 'Used in water treatment and manufacturing' },
                  { icon: <BoltIcon sx={{ color: '#3b82f6' }} />, title: 'Hydrogen Gas (H₂)', sub: 'Fuel cells and chemical synthesis' },
                  { icon: <ScienceIcon sx={{ color: '#a855f7' }} />, title: 'Sodium Hydroxide (NaOH)', sub: 'Used in soap making and paper production' },
                ].map((p) => (
                  <Paper
                    key={p.title}
                    elevation={0}
                    sx={{ bgcolor: '#fff', p: 2, borderRadius: 1, boxShadow: '0 1px 2px rgba(0,0,0,0.05)', mb: 1.5 }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      {p.icon}
                      <Box>
                        <Typography sx={{ fontWeight: 500, color: '#111827' }}>{p.title}</Typography>
                        <Typography sx={{ fontSize: 14, color: '#4b5563' }}>{p.sub}</Typography>
                      </Box>
                    </Box>
                  </Paper>
                ))}
              </Box>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}

/* ------------------------------------------------------------------ */
/* 7) Exam Tips                                                        */
/* ------------------------------------------------------------------ */

function FocusCard({
  headerBg,
  logo,
  title,
  points,
  footerBg,
  footerTitle,
  footerColor,
  footerIcon,
  footerItems,
}: {
  headerBg: string;
  logo: React.ReactNode;
  title: string;
  points: { title: string; sub: string }[];
  footerBg: string;
  footerTitle: string;
  footerColor: string;
  footerIcon: React.ReactNode;
  footerItems: string[];
}) {
  return (
    <Paper elevation={0} sx={{ borderRadius: 2, overflow: 'hidden', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
      <Box sx={{ p: 3, background: headerBg }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          {logo}
          <Typography sx={{ color: '#111827', fontWeight: 600, fontSize: 18 }}>{title}</Typography>
        </Box>
      </Box>
      <Box sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {points.map((p, i) => (
            <Box key={p.title} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
              <Box
                sx={{
                  width: 24,
                  height: 24,
                  borderRadius: '50%',
                  bgcolor: footerBg,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  mt: 0.5,
                }}
              >
                <Typography sx={{ fontSize: 14, fontWeight: 500, color: footerColor }}>{i + 1}</Typography>
              </Box>
              <Box>
                <Typography sx={{ fontWeight: 500, color: '#111827' }}>{p.title}</Typography>
                <Typography sx={{ fontSize: 14, color: '#4b5563', mt: 0.5 }}>{p.sub}</Typography>
              </Box>
            </Box>
          ))}
        </Box>
        <Box sx={{ mt: 3, bgcolor: footerBg, borderRadius: 2, p: 2 }}>
          <Typography sx={{ fontWeight: 500, color: footerColor, mb: 1 }}>{footerTitle}</Typography>
          {footerItems.map((it) => (
            <Box key={it} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, mt: 1 }}>
              <Box component="span" sx={{ color: footerColor, mt: '2px', display: 'inline-flex', '& svg': { fontSize: 18 } }}>
                {footerIcon}
              </Box>
              <Typography sx={{ fontSize: 14, color: footerColor }}>{it}</Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Paper>
  );
}

export function ExamTipsSection({
  onPrevious,
  onNext,
  canGoPrevious,
  canGoNext,
}: {
  onPrevious: () => void;
  onNext: () => void;
  canGoPrevious: boolean;
  canGoNext: boolean;
}) {
  return (
    <Box>
      <SectionHeader
        icon={<LightbulbIcon />}
        color="#eab308"
        title="Exam Tips and Common Questions"
        subtitle="Key points to focus on for IGCSE and WAEC examinations"
      />

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
        <FocusCard
          headerBg="linear-gradient(90deg, #eff6ff 0%, #dbeafe 100%)"
          logo={<SchoolIcon sx={{ color: '#2563eb', fontSize: 40 }} />}
          title="IGCSE Focus Points"
          points={[
            { title: 'Molten vs Aqueous Electrolysis', sub: 'Understand key differences in products and processes' },
            { title: 'Ion Discharge Order', sub: 'Memorize preferential discharge sequence for both electrodes' },
            { title: 'Half Equations', sub: 'Practice writing and balancing oxidation and reduction equations' },
            { title: 'Industrial Applications', sub: 'Know the details of aluminum extraction and chloralkali process' },
          ]}
          footerBg="#eff6ff"
          footerTitle="Common Pitfalls"
          footerColor="#1e40af"
          footerIcon={<ErrorOutlineIcon />}
          footerItems={['Confusing cathode and anode processes', 'Forgetting state symbols in equations']}
        />

        <FocusCard
          headerBg="linear-gradient(90deg, #f0fdf4 0%, #dcfce7 100%)"
          logo={<SchoolIcon sx={{ color: '#16a34a', fontSize: 40 }} />}
          title="WAEC Focus Points"
          points={[
            { title: "Faraday's Laws Calculations", sub: 'Master quantitative aspects and unit conversions' },
            { title: 'Electroplating', sub: 'Understand process steps and industrial applications' },
            { title: 'Product Prediction', sub: 'Know expected products for common electrolytes' },
            { title: 'Practical Applications', sub: 'Be able to explain real-world uses and processes' },
          ]}
          footerBg="#f0fdf4"
          footerTitle="Examination Strategy"
          footerColor="#166534"
          footerIcon={<CheckCircleIcon />}
          footerItems={[
            'Start with calculation questions - they have fixed marks',
            'Include practical observations in your answers',
          ]}
        />
      </Box>

      <Box sx={{ mt: 3, bgcolor: '#fefce8', borderRadius: 2, p: 2 }}>
        <Typography sx={{ fontWeight: 500 }}>How to use these notes</Typography>
        <Typography sx={{ fontSize: 14, color: '#854d0e', mt: 1 }}>
          Before answering a question: identify if the electrolyte is molten or aqueous, list ions present (include
          H⁺/OH⁻ from water), then apply reactivity (for cathode), concentration (for anode), and electrode-nature rules
          to predict products and write half-equations.
        </Typography>
      </Box>

      {/* Section navigation (original buttons at the end of the exam-tips section) */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 4, mb: 2 }}>
        <Box
          component="button"
          onClick={onPrevious}
          disabled={!canGoPrevious}
          sx={(theme) => ({
            display: 'inline-flex',
            alignItems: 'center',
            gap: 1,
            px: 2,
            py: 1,
            borderRadius: 2,
            border: 'none',
            cursor: canGoPrevious ? 'pointer' : 'default',
            bgcolor: '#f3f4f6',
            color: '#374151',
            transition: theme.transitions.create(['background-color']),
            '&:hover': { bgcolor: canGoPrevious ? '#e5e7eb' : '#f3f4f6' },
            '&:disabled': { opacity: 0.55 },
          })}
        >
          <ChevronLeftIcon sx={{ fontSize: 18 }} />
          Previous Section
        </Box>
        <Box
          component="button"
          onClick={onNext}
          disabled={!canGoNext}
          sx={(theme) => ({
            display: 'inline-flex',
            alignItems: 'center',
            gap: 1,
            px: 2,
            py: 1,
            borderRadius: 2,
            border: 'none',
            cursor: canGoNext ? 'pointer' : 'default',
            bgcolor: '#2563eb',
            color: '#fff',
            transition: theme.transitions.create(['background-color']),
            '&:hover': { bgcolor: canGoNext ? '#1d4ed8' : '#2563eb' },
            '&:disabled': { opacity: 0.55 },
          })}
        >
          Next Section
          <ChevronRightIcon sx={{ fontSize: 18 }} />
        </Box>
      </Box>

      {/* Study resources */}
      <Paper elevation={0} sx={{ mt: 4, p: 3, borderRadius: 2, boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
        <Typography sx={{ color: '#111827', fontWeight: 600, mb: 2, fontSize: 18 }}>Additional Resources</Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 2 }}>
          {[
            { bg: '#fdf4ff', hoverBg: '#fae8ff', icon: <MenuBookIcon sx={{ color: '#a855f7', fontSize: 22 }} />, title: 'Past Papers', sub: 'Practice with previous exams' },
            { bg: '#eff6ff', hoverBg: '#dbeafe', icon: <PlayVideoIcon sx={{ color: '#3b82f6', fontSize: 22 }} />, title: 'Video Tutorials', sub: 'Visual explanations' },
            { bg: '#f0fdf4', hoverBg: '#dcfce7', icon: <GroupsIcon sx={{ color: '#22c55e', fontSize: 22 }} />, title: 'Study Groups', sub: 'Join discussion forums' },
          ].map((r) => (
            <Box
              key={r.title}
              component="a"
              href="#"
              onClick={(e) => e.preventDefault()}
              sx={{
                display: 'block',
                p: 2,
                borderRadius: 2,
                bgcolor: r.bg,
                textDecoration: 'none',
                transition: 'background-color 0.2s',
                '&:hover': { bgcolor: r.hoverBg },
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                {r.icon}
                <Box>
                  <Typography sx={{ fontWeight: 500, color: '#111827' }}>{r.title}</Typography>
                  <Typography sx={{ fontSize: 14, color: '#4b5563' }}>{r.sub}</Typography>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      </Paper>
    </Box>
  );
}

/* ------------------------------------------------------------------ */
/* 8) Answers & Worked Solutions                                       */
/* ------------------------------------------------------------------ */

export function AnswersSection() {
  return (
    <Box>
      <SectionHeader
        icon={<AssignmentIcon />}
        color="#14b8a6"
        title="Answers & Worked Solutions"
        subtitle="Concise theory, short answers and worked examples to help you answer the exam questions in your photos."
      />

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Paper elevation={0} sx={{ p: 3, borderRadius: 2, boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
          <Typography sx={{ fontWeight: 600, mb: 1.5, fontSize: 18 }}>Key Definitions</Typography>
          <Box component="ul" sx={{ pl: 3, display: 'flex', flexDirection: 'column', gap: 1, fontSize: 14, color: '#374151' }}>
            <li>
              <strong>Electrolyte</strong> — A substance that produces ions in solution or when molten and therefore
              conducts electricity.
            </li>
            <li>
              <strong>Electrode</strong> — A conductor (anode or cathode) through which current enters or leaves the
              electrolyte.
            </li>
            <li>
              <strong>Anode</strong> — The positive electrode where oxidation occurs (anions give up electrons).
            </li>
            <li>
              <strong>Cathode</strong> — The negative electrode where reduction occurs (cations gain electrons).
            </li>
            <li>
              <strong>Primary cell</strong> — A non-rechargeable electrochemical cell. <strong>Secondary cell</strong> — A
              rechargeable cell.
            </li>
          </Box>
        </Paper>

        <Paper elevation={0} sx={{ p: 3, borderRadius: 2, boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
          <Typography sx={{ fontWeight: 600, mb: 1.5, fontSize: 18 }}>Short Q&amp;A (extracted from common exam prompts)</Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2, fontSize: 14, color: '#374151' }}>
            <Box>
              <Typography sx={{ fontWeight: 500 }}>Why does pure water not conduct well?</Typography>
              <Typography sx={{ mt: 0.5, fontSize: 14, color: '#374151' }}>
                Pure water has a very low concentration of H₃O⁺/OH⁻ ions (autoionisation is 10⁻⁷ mol L⁻¹), so it is a
                poor conductor. Adding an electrolyte increases ion concentration and conductivity.
              </Typography>
            </Box>
            <Box>
              <Typography sx={{ fontWeight: 500 }}>Why does solid NaCl not conduct?</Typography>
              <Typography sx={{ mt: 0.5, fontSize: 14, color: '#374151' }}>
                Ions in a solid ionic lattice are fixed in place and cannot move; therefore solid NaCl does not conduct
                electricity. When molten or dissolved, ions are free to move and conduct.
              </Typography>
            </Box>
            <Box>
              <Typography sx={{ fontWeight: 500 }}>Predicting products at electrodes (short rules)</Typography>
              <Box component="ul" sx={{ pl: 3, mt: 0.5 }}>
                <li>
                  <strong>Cathode (reduction)</strong>: the least reactive metal ion (or H⁺ if metal is more reactive) is
                  discharged.
                </li>
                <li>
                  <strong>Anode (oxidation)</strong>: halide ions (Cl⁻, Br⁻, I⁻) are discharged in preference to OH⁻ when
                  present at sufficient concentration (concentrated halide → halogen gas). If halide is absent or dilute,
                  OH⁻ is oxidized to O₂.
                </li>
              </Box>
            </Box>
            <Box>
              <Typography sx={{ fontWeight: 500 }}>Effect of concentration (dilute vs concentrated NaCl)</Typography>
              <Typography sx={{ mt: 0.5, fontSize: 14, color: '#374151' }}>
                Concentrated brine (high [Cl⁻]) → chlorine gas at anode. Dilute NaCl (low [Cl⁻]) → oxygen at anode (from
                OH⁻ oxidation), hydrogen usually at cathode (from H⁺/water).
              </Typography>
            </Box>
          </Box>
        </Paper>

        <Paper elevation={0} sx={{ p: 3, borderRadius: 2, boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
          <Typography sx={{ fontWeight: 600, mb: 1.5, fontSize: 18 }}>Worked examples (from your photos)</Typography>

          <Typography sx={{ fontWeight: 500, mt: 1 }}>1) Electrolysis of molten lead(II) bromide (PbBr₂)</Typography>
          <Typography sx={{ fontSize: 14, color: '#374151', mt: 0.5 }}>
            Molten ionic compound — only ions present. At the cathode Pb²⁺ is reduced; at the anode Br⁻ is oxidized.
          </Typography>
          <Box sx={{ mt: 1, fontSize: 14, color: '#374151' }}>
            <Typography sx={{ fontSize: 14, color: '#374151' }}>
              <strong>Cathode:</strong> Pb²⁺ + 2e⁻ → Pb (s)
            </Typography>
            <Typography sx={{ fontSize: 14, color: '#374151' }}>
              <strong>Anode:</strong> 2Br⁻ → Br₂ (g) + 2e⁻
            </Typography>
          </Box>

          <Typography sx={{ fontWeight: 500, mt: 2 }}>3) Half-equations and observations for common cells</Typography>
          <Typography sx={{ fontSize: 14, color: '#374151', mt: 0.5 }}>
            <strong>Electrolysis of aqueous NaCl (dilute):</strong> Cathode: 2H₂O + 2e⁻ → H₂ + 2OH⁻ (hydrogen produced).
            Anode: 4OH⁻ → O₂ + 2H₂O + 4e⁻ (oxygen produced).
          </Typography>
          <Typography sx={{ fontSize: 14, color: '#374151', mt: 1 }}>
            <strong>Electrolysis of concentrated NaCl (brine):</strong> Anode: 2Cl⁻ → Cl₂ + 2e⁻ (chlorine produced).
            Cathode: H₂ as above (unless a less reactive metal ion is present).
          </Typography>

          <Typography sx={{ fontWeight: 500, mt: 2 }}>4) Graphite electrodes — advantages &amp; disadvantages</Typography>
          <Box component="ul" sx={{ pl: 3, mt: 0.5, fontSize: 14, color: '#374151' }}>
            <li>
              <strong>Advantages:</strong> inert (do not take part chemically in many electrolyses), inexpensive, good
              conductor.
            </li>
            <li>
              <strong>Disadvantages:</strong> can oxidise slowly at the anode (forming CO/CO₂ or causing electrode
              wear), may contaminate product in some cases and are brittle.
            </li>
          </Box>
        </Paper>

        <Paper elevation={0} sx={{ p: 3, borderRadius: 2, boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
          <Typography sx={{ fontWeight: 600, mb: 1.5, fontSize: 18 }}>Quick-reference table (products)</Typography>
          <TableContainer sx={{ overflowX: 'auto' }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  {['Electrolyte', 'Cathode (reduction)', 'Anode (oxidation)', 'Notes'].map((h) => (
                    <TableCell key={h} sx={{ fontWeight: 600, color: '#374151', py: 1 }}>
                      {h}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {[
                  { cells: ['Molten PbBr₂', 'Pb (s)', 'Br₂ (g)', 'Molten = only ions available'], bg: 'transparent' },
                  { cells: ['Aqueous NaCl (dilute)', 'H₂ (g)', 'O₂ (g)', 'OH⁻ oxidation at anode competes with Cl⁻'], bg: '#f9fafb' },
                  { cells: ['Aqueous NaCl (concentrated)', 'H₂ (g)', 'Cl₂ (g)', 'High [Cl⁻] favours chlorine evolution'], bg: 'transparent' },
                ].map((row, i) => (
                  <TableRow key={i} sx={{ bgcolor: row.bg }}>
                    {row.cells.map((c, j) => (
                      <TableCell key={j} sx={{ py: 1, color: '#374151' }}>
                        {c}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#0d9488' }}>
          <CalculateIcon sx={{ fontSize: 18 }} />
          <Typography sx={{ fontSize: 14 }}>
            Tip: practise the Faraday calculator in the{' '}
            <a href="#calculations" style={{ color: '#0d9488', fontWeight: 500 }}>
              Calculations section
            </a>{' '}
            until the m = ItM/nF steps feel automatic.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
