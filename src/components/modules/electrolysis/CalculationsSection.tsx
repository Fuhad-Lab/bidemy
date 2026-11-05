'use client';

/**
 * "Calculations in Electrolysis" section with the interactive Faraday
 * calculator. Ported 1:1 from the original index.html inline script:
 *
 *   mass = (current * (time_minutes * 60) * molarMass) / (valency * 96500)
 *   -> shown as `${mass.toFixed(3)} g`, or "Please fill all fields"
 *      when any value is missing/zero. Default result label: "0.00 g".
 */

import * as React from 'react';
import CalculateIcon from '@mui/icons-material/Calculate';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const FARADAY_CONSTANT = 96500; // C/mol

const VARIABLES = [
  { sym: 'm', name: 'Mass deposited', unit: 'Measured in grams (g)' },
  { sym: 'I', name: 'Current', unit: 'Measured in amperes (A)' },
  { sym: 't', name: 'Time', unit: 'Measured in seconds (s)' },
  { sym: 'M', name: 'Molar Mass', unit: 'In g/mol' },
  { sym: 'n', name: 'Valency of Ion', unit: 'Number of electrons transferred' },
  { sym: 'F', name: "Faraday's Constant", unit: '96,500 C/mol' },
];

export default function CalculationsSection() {
  const [current, setCurrent] = React.useState('');
  const [timeMinutes, setTimeMinutes] = React.useState('');
  const [molarMass, setMolarMass] = React.useState('');
  const [valency, setValency] = React.useState('');
  const [result, setResult] = React.useState('0.00 g');

  // Exact behaviour of the original `calculateMass()` inline script.
  const calculateMass = () => {
    const I = parseFloat(current);
    const t = (parseFloat(timeMinutes) || 0) * 60; // Convert to seconds
    const M = parseFloat(molarMass);
    const n = parseFloat(valency);

    if (I && t && M && n) {
      const mass = (I * t * M) / (n * FARADAY_CONSTANT);
      setResult(`${mass.toFixed(3)} g`);
    } else {
      setResult('Please fill all fields');
    }
  };

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" sx={{ color: '#111827', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box component="span" sx={{ display: 'inline-flex', color: '#22c55e', '& svg': { fontSize: 28 } }}>
            <CalculateIcon />
          </Box>
          Calculations in Electrolysis
        </Typography>
        <Typography sx={{ color: '#4b5563', mt: 1 }}>
          Understanding and applying Faraday&apos;s Laws in electrolysis calculations
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {/* Faraday's First Law */}
        <Paper elevation={0} sx={{ borderRadius: 2, overflow: 'hidden', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
          <Box sx={{ p: 3, background: 'linear-gradient(90deg, #f0fdf4 0%, #dcfce7 100%)' }}>
            <Typography sx={{ color: '#111827', fontWeight: 600, fontSize: 18 }}>Faraday&apos;s First Law</Typography>
            <Typography sx={{ fontSize: 14, color: '#4b5563', mt: 1 }}>
              The mass of a substance deposited or liberated at an electrode is directly proportional to the quantity of
              electricity passed through the electrolyte.
            </Typography>
          </Box>

          <Box sx={{ p: 3 }}>
            {/* Formula */}
            <Box sx={{ bgcolor: '#f9fafb', borderRadius: 2, p: 2, mb: 3 }}>
              <Typography sx={{ fontWeight: 500, color: '#111827', mb: 1.5 }}>Key Formula</Typography>
              <Box
                sx={{
                  fontFamily: "'Courier New', monospace",
                  bgcolor: '#fff',
                  p: 2,
                  borderRadius: 1,
                  boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                  textAlign: 'center',
                  overflowX: 'auto',
                }}
              >
                <Typography component="span" sx={{ fontSize: 20, fontWeight: 500, color: '#111827' }}>
                  m = (It × M)/(nF)
                </Typography>
              </Box>
            </Box>

            {/* Worked example */}
            <Paper elevation={0} sx={{ p: 2, borderRadius: 2, mb: 3 }}>
              <Typography sx={{ fontWeight: 500, color: '#111827', mb: 1 }}>Worked example: Mass of lead produced</Typography>
              <Typography sx={{ fontSize: 14, color: '#374151' }}>
                Calculate the mass of lead produced when a current of 2.0 A passes for 30 minutes during the electrolysis
                of PbBr<sub>2</sub> (Pb<sup>2+</sup> + 2e<sup>-</sup> → Pb).
              </Typography>
              <Box component="ul" sx={{ pl: 3, mt: 1, fontSize: 14, color: '#374151' }}>
                <li>I = 2.0 A</li>
                <li>t = 30 min = 30 × 60 = 1800 s</li>
                <li>M (Pb) = 207.2 g mol<sup>-1</sup></li>
                <li>n = 2</li>
                <li>F = 96,500 C mol<sup>-1</sup></li>
              </Box>
              <Typography sx={{ mt: 1, fontSize: 14, color: '#374151' }}>
                <strong>Calculation:</strong>
              </Typography>
              <Box
                sx={{
                  fontFamily: "'Courier New', monospace",
                  bgcolor: '#f3f4f6',
                  p: 1,
                  borderRadius: 1,
                  mt: 1,
                  overflowX: 'auto',
                  fontSize: 14,
                }}
              >
                m = (2.0 × 1800 × 207.2) / (2 × 96500) ≈ 3.87 g
              </Box>
              <Typography sx={{ fontSize: 14, color: '#4b5563', mt: 0.5 }}>
                So about 3.87 g of lead will be deposited.
              </Typography>
            </Paper>

            {/* Variables */}
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                {VARIABLES.slice(0, 3).map((v) => (
                  <Paper key={v.sym} elevation={0} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5, p: 1.5, borderRadius: 1, boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
                    <Typography component="span" sx={{ fontFamily: 'monospace', color: '#16a34a', fontWeight: 500 }}>
                      {v.sym}
                    </Typography>
                    <Box>
                      <Typography sx={{ fontWeight: 500, color: '#111827' }}>{v.name}</Typography>
                      <Typography sx={{ fontSize: 14, color: '#4b5563' }}>{v.unit}</Typography>
                    </Box>
                  </Paper>
                ))}
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                {VARIABLES.slice(3).map((v) => (
                  <Paper key={v.sym} elevation={0} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5, p: 1.5, borderRadius: 1, boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
                    <Typography component="span" sx={{ fontFamily: 'monospace', color: '#16a34a', fontWeight: 500 }}>
                      {v.sym}
                    </Typography>
                    <Box>
                      <Typography sx={{ fontWeight: 500, color: '#111827' }}>{v.name}</Typography>
                      <Typography sx={{ fontSize: 14, color: '#4b5563' }}>{v.unit}</Typography>
                    </Box>
                  </Paper>
                ))}
              </Box>
            </Box>
          </Box>
        </Paper>

        {/* Interactive calculator */}
        <Paper elevation={0} sx={{ borderRadius: 2, overflow: 'hidden', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
          <Box sx={{ p: 3, background: 'linear-gradient(90deg, #eff6ff 0%, #dbeafe 100%)' }}>
            <Typography sx={{ color: '#111827', fontWeight: 600, fontSize: 18 }}>Electrolysis Calculator</Typography>
            <Typography sx={{ fontSize: 14, color: '#4b5563', mt: 1 }}>
              Calculate mass of substance deposited during electrolysis
            </Typography>
          </Box>

          <Box sx={{ p: 3 }}>
            <Box
              component="form"
              onSubmit={(e) => {
                e.preventDefault();
                calculateMass();
              }}
              sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}
            >
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {[
                  { label: 'Current (A)', value: current, set: setCurrent, step: '0.1', min: 0 },
                  { label: 'Time (minutes)', value: timeMinutes, set: setTimeMinutes, step: '1', min: 0 },
                  { label: 'Molar Mass (g/mol)', value: molarMass, set: setMolarMass, step: '0.1', min: 0 },
                  { label: 'Valency', value: valency, set: setValency, step: '1', min: 1 },
                ].map((f) => (
                  <Box key={f.label}>
                    <Typography component="label" sx={{ display: 'block', fontSize: 14, fontWeight: 500, color: '#374151', mb: 0.5 }}>
                      {f.label}
                    </Typography>
                    <TextField
                      type="number"
                      fullWidth
                      inputProps={{ step: f.step, min: f.min }}
                      value={f.value}
                      onChange={(e) => f.set(e.target.value)}
                      sx={{ '& .MuiOutlinedInput-root': { '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#3b82f6' } } }}
                    />
                  </Box>
                ))}
              </Box>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{ bgcolor: '#2563eb', py: 1, '&:hover': { bgcolor: '#1d4ed8' } }}
                >
                  Calculate
                </Button>

                <Box sx={{ bgcolor: '#f9fafb', p: 2, borderRadius: 2 }}>
                  <Typography sx={{ fontWeight: 500, color: '#111827', mb: 1 }}>Result</Typography>
                  <Typography sx={{ fontSize: 28, fontWeight: 500, color: '#2563eb' }} aria-live="polite">
                    {result}
                  </Typography>
                </Box>

                <Box sx={{ bgcolor: '#fefce8', p: 2, borderRadius: 2 }}>
                  <Typography sx={{ fontWeight: 500, color: '#854d0e', mb: 1 }}>Quick Tips</Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                    {['Remember to convert time to seconds', 'Check valency of ions carefully', 'Use correct molar mass units'].map((tip) => (
                      <Typography key={tip} sx={{ fontSize: 14, color: '#a16207' }}>
                        • {tip}
                      </Typography>
                    ))}
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}
