'use client';

import * as React from 'react';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import Paper from '@mui/material/Paper';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import {
  getSubjectById,
  gradeCalc,
  groupScoresByYear,
  parseResults,
  scoreTotals,
  type StudentScore,
} from '@/data/relationship/demo-data';

/**
 * Port of Student/grade.php — one bordered table per school year with
 * caption "Year - <year>", result chips ("10 / 15"), total and letter grade.
 */

const headCells = [
  'Course Code',
  'Course Title',
  'Results',
  'Total',
  'Grade',
  'Semester',
] as const;

interface GradesTablesProps {
  scores: StudentScore[];
}

export default function GradesTables({ scores }: GradesTablesProps) {
  if (scores.length === 0) {
    return (
      <Alert severity="info" sx={{ mt: 2 }}>
        No scores recorded yet.
      </Alert>
    );
  }

  const yearGroups = groupScoresByYear(scores);

  return (
    <Stack spacing={3} sx={{ mt: 2 }}>
      {yearGroups.map(({ year, rows }) => (
        <TableContainer
          key={year}
          component={Paper}
          elevation={0}
          sx={{ border: '1px solid', borderColor: 'divider', overflowX: 'auto' }}
        >
          <Box sx={{ px: 2, pt: 1.5, pb: 0.5 }}>
            <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: 700 }}>
              Year — {year}
            </Typography>
          </Box>
          <Table size="small" aria-label={`Grade summary for year ${year}`}>
            <TableHead>
              <TableRow>
                {headCells.map((cell) => (
                  <TableCell key={cell} sx={{ fontWeight: 700, whiteSpace: 'nowrap' }}>
                    {cell}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => {
                const subject = getSubjectById(row.subject_id);
                const { total, outOf } = scoreTotals(row.results);
                const percent = outOf > 0 ? Math.round((total / outOf) * 100) : 0;
                return (
                  <TableRow key={row.id} hover>
                    <TableCell sx={{ fontWeight: 600, whiteSpace: 'nowrap' }}>
                      {subject?.subject_code ?? '—'}
                    </TableCell>
                    <TableCell sx={{ whiteSpace: 'nowrap' }}>{subject?.subject ?? 'Unknown'}</TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={0.5} sx={{ flexWrap: 'wrap', gap: 0.5 }}>
                        {parseResults(row.results).map((pair, index) => (
                          <Chip
                            // results chunks are positional assessment entries
                            key={`${row.id}-${index}`}
                            size="small"
                            variant="outlined"
                            label={`${pair.score} / ${pair.outOf}`}
                            sx={{ fontFamily: 'monospace', fontSize: 12 }}
                          />
                        ))}
                      </Stack>
                    </TableCell>
                    <TableCell sx={{ fontWeight: 700, whiteSpace: 'nowrap' }}>
                      {total} / {outOf}
                    </TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>{gradeCalc(percent)}</TableCell>
                    <TableCell sx={{ whiteSpace: 'nowrap' }}>{row.semester}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      ))}
    </Stack>
  );
}
