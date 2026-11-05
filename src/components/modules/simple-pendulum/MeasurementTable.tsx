'use client';

/**
 * WAEC-style measurement table for the Simple Pendulum practical.
 * Ported 1:1 from the original page's table builder (`makeRow`, `computeRow`,
 * `validateField`, "Use L", per-row Clear, Clear All, Plot T² vs L).
 * Row state lives in the parent so the Plot action can read every row.
 */

import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export interface MeasRow {
  L: string;
  N: string;
  t1: string;
  t2: string;
}

export type MeasErrors = Record<string, string>;

interface Props {
  rows: MeasRow[];
  errors: MeasErrors;
  onFieldChange: (rowIdx: number, field: keyof MeasRow, value: string) => void;
  onUseL: (rowIdx: number) => void;
  onClearRow: (rowIdx: number) => void;
  onClearAll: () => void;
  onPlot: () => void;
}

/** Same computation as the original `computeRow`. */
export function computeRowValues(row: MeasRow): { mean: string; T: string; T2: string } {
  const t1 = parseFloat(row.t1) || 0;
  const t2 = parseFloat(row.t2) || 0;
  const N = parseFloat(row.N) || 20;
  if (t1 > 0 && t2 > 0) {
    const mean = (t1 + t2) / 2;
    const T = mean / N;
    const T2 = T * T;
    return { mean: mean.toFixed(4), T: T.toFixed(4), T2: T2.toFixed(5) };
  }
  if (t1 > 0) {
    const mean = t1;
    const T = mean / N;
    const T2 = T * T;
    return { mean: mean.toFixed(4), T: T.toFixed(4), T2: T2.toFixed(5) };
  }
  return { mean: '', T: '', T2: '' };
}

const errTextSx = { color: '#ef4444', fontSize: 11, mt: 0.25, minHeight: 14 } as const;

export default function MeasurementTable({
  rows,
  errors,
  onFieldChange,
  onUseL,
  onClearRow,
  onClearAll,
  onPlot,
}: Props) {
  return (
    <Box>
      <Box sx={{ p: 1.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
          <Typography sx={{ fontWeight: 500 }}>Measurement Table</Typography>
        </Box>

        <Box
          sx={{
            overflowX: 'auto',
            WebkitOverflowScrolling: 'touch',
            borderRadius: 1,
            border: '1px solid #eef2ff',
            // custom scrollbar (original .custom-scrollbar)
            '&::-webkit-scrollbar': { width: 6, height: 6 },
            '&::-webkit-scrollbar-track': { background: '#f1f5f9', borderRadius: 3 },
            '&::-webkit-scrollbar-thumb': { background: '#cbd5e1', borderRadius: 3 },
          }}
        >
          <Table size="small" sx={{ minWidth: 640 }}>
            <TableHead>
              <TableRow sx={{ bgcolor: '#f8fafc' }}>
                {['S/N', 'L (m)', 'N', 't1 (s)', 't2 (s)', 'mean t (s)', 'T (s)', 'T² (s²)', 'Actions'].map((h) => (
                  <TableCell key={h} sx={{ p: 1, fontWeight: 600, color: '#475569', whiteSpace: 'nowrap' }}>
                    {h}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, i) => {
                const vals = computeRowValues(row);
                return (
                  <TableRow key={i} sx={{ '&:nth-of-type(even)': { bgcolor: '#fbfdff' } }}>
                    <TableCell sx={{ p: 0.5, fontSize: 12 }}>{i + 1}</TableCell>
                    <TableCell sx={{ p: 0.5 }}>
                      <TextField
                        value={row.L}
                        onChange={(e) => onFieldChange(i, 'L', e.target.value)}
                        placeholder="L"
                        error={!!errors[`${i}:L`]}
                        sx={{ width: 76, '& .MuiInputBase-input': { fontSize: 12, p: '6px' } }}
                        aria-label={`Row ${i + 1} length in metres`}
                      />
                      <Typography sx={errTextSx}>{errors[`${i}:L`] ?? ''}</Typography>
                    </TableCell>
                    <TableCell sx={{ p: 0.5 }}>
                      <TextField
                        value={row.N}
                        onChange={(e) => onFieldChange(i, 'N', e.target.value)}
                        error={!!errors[`${i}:N`]}
                        sx={{ width: 64, '& .MuiInputBase-input': { fontSize: 12, p: '6px' } }}
                        aria-label={`Row ${i + 1} number of oscillations`}
                      />
                      <Typography sx={errTextSx}>{errors[`${i}:N`] ?? ''}</Typography>
                    </TableCell>
                    <TableCell sx={{ p: 0.5 }}>
                      <TextField
                        value={row.t1}
                        onChange={(e) => onFieldChange(i, 't1', e.target.value)}
                        placeholder="t1"
                        error={!!errors[`${i}:t1`]}
                        sx={{ width: 64, '& .MuiInputBase-input': { fontSize: 12, p: '6px' } }}
                        aria-label={`Row ${i + 1} first timing`}
                      />
                      <Typography sx={errTextSx}>{errors[`${i}:t1`] ?? ''}</Typography>
                    </TableCell>
                    <TableCell sx={{ p: 0.5 }}>
                      <TextField
                        value={row.t2}
                        onChange={(e) => onFieldChange(i, 't2', e.target.value)}
                        placeholder="t2"
                        error={!!errors[`${i}:t2`]}
                        sx={{ width: 64, '& .MuiInputBase-input': { fontSize: 12, p: '6px' } }}
                        aria-label={`Row ${i + 1} second timing`}
                      />
                      <Typography sx={errTextSx}>{errors[`${i}:t2`] ?? ''}</Typography>
                    </TableCell>
                    <TableCell sx={{ p: 0.5 }}>
                      <TextField
                        value={vals.mean}
                        readOnly
                        sx={{
                          width: 72,
                          '& .MuiInputBase-input': { fontSize: 12, p: '6px', bgcolor: '#f8fafc' },
                          '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                        }}
                        aria-label={`Row ${i + 1} mean time`}
                      />
                    </TableCell>
                    <TableCell sx={{ p: 0.5 }}>
                      <TextField
                        value={vals.T}
                        readOnly
                        sx={{
                          width: 72,
                          '& .MuiInputBase-input': { fontSize: 12, p: '6px', bgcolor: '#f8fafc' },
                          '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                        }}
                        aria-label={`Row ${i + 1} period`}
                      />
                    </TableCell>
                    <TableCell sx={{ p: 0.5 }}>
                      <TextField
                        value={vals.T2}
                        readOnly
                        sx={{
                          width: 76,
                          '& .MuiInputBase-input': { fontSize: 12, p: '6px', bgcolor: '#f8fafc' },
                          '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                        }}
                        aria-label={`Row ${i + 1} period squared`}
                      />
                    </TableCell>
                    <TableCell sx={{ p: 0.5, whiteSpace: 'nowrap' }}>
                      <Button size="small" color="error" onClick={() => onClearRow(i)} sx={{ fontSize: 12, px: 0.5, minWidth: 0 }}>
                        Clear
                      </Button>
                      <Button size="small" onClick={() => onUseL(i)} sx={{ fontSize: 12, px: 0.5, minWidth: 0, ml: 0.5 }}>
                        Use L
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>

        <Paper
          elevation={0}
          sx={{
            bgcolor: '#f8fafc',
            mt: 1.5,
            p: 1.5,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 1,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Button variant="outlined" onClick={onClearAll} aria-label="Clear all measurements">
              Clear All
            </Button>
            <Button variant="contained" onClick={onPlot} aria-label="Plot measurements">
              Plot T² vs L
            </Button>
          </Box>
          <Typography sx={{ fontSize: 14, color: '#475569' }}>
            Click <strong>Plot</strong> after entering data.
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
}
