'use client';

import * as React from 'react';
import Link from 'next/link';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import MuiLink from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import Paper from '@mui/material/Paper';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SearchIcon from '@mui/icons-material/Search';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SectionShell from '@/components/relationship/SectionShell';
import { REGISTRAR_NAV_LINKS } from '@/components/relationship/nav-links';
import {
  REGISTRAR_ADD,
  REGISTRAR_HOME,
  REGISTRAR_SEARCH,
  REGISTRAR_VIEW,
  registrarViewHref,
} from '@/components/relationship/routes';
import { classLabel, searchStudents } from '@/data/relationship/demo-data';

/**
 * Port of RegistrarOffice/student-search.php — a live search box that filters
 * the demo registry (name / username / email / ID) and a bordered results
 * table whose "View" action opens student-view/?student_id=N.
 */

const columns = [
  '#',
  'ID',
  'First Name',
  'Last Name',
  'Username',
  'Class',
  'Action',
] as const;

export default function StudentSearchPage() {
  const [searchKey, setSearchKey] = React.useState('');
  const results = React.useMemo(() => searchStudents(searchKey), [searchKey]);

  return (
    <SectionShell
      role="Registrar Office"
      active="Search Students"
      links={REGISTRAR_NAV_LINKS}
    >
      <Stack direction="row" spacing={1} sx={{ mb: 3, flexWrap: 'wrap', gap: 1 }}>
        <Button component={Link} href={REGISTRAR_ADD} variant="contained" color="secondary" startIcon={<PersonAddIcon />}>
          Add New Student
        </Button>
        <Button component={Link} href={REGISTRAR_HOME} variant="contained" color="secondary">
          Go Back
        </Button>
      </Stack>

      <Typography variant="h5" component="h1" sx={{ mb: 2 }}>
        Search Students
      </Typography>

      {/* Search box — mirrors the input-group form */}
      <Box
        component="form"
        onSubmit={(e) => e.preventDefault()}
        sx={{ mb: 3, display: 'flex', gap: 1, alignItems: 'center' }}
      >
        <TextField
          fullWidth
          size="small"
          placeholder="Search by name, username, email or ID…"
          value={searchKey}
          onChange={(e) => setSearchKey(e.target.value)}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
            },
            htmlInput: { 'aria-label': 'Search students' },
          }}
        />
        <Button type="submit" variant="contained" sx={{ whiteSpace: 'nowrap' }}>
          Search
        </Button>
      </Box>

      {results.length > 0 ? (
        <>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            {results.length} result{results.length === 1 ? '' : 's'} for “{searchKey || 'all students'}”
          </Typography>
          <TableContainer
            component={Paper}
            elevation={0}
            sx={{ border: '1px solid', borderColor: 'divider', maxHeight: 520, overflowY: 'auto' }}
          >
            <Table size="small" stickyHeader aria-label="Search results">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell key={column} sx={{ fontWeight: 700 }}>
                      {column}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {results.map((student, index) => (
                  <TableRow key={student.student_id} hover>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{student.student_id}</TableCell>
                    <TableCell>
                      <MuiLink
                        component={Link}
                        href={registrarViewHref(student.student_id)}
                        underline="hover"
                        sx={{ fontWeight: 600 }}
                      >
                        {student.fname}
                      </MuiLink>
                    </TableCell>
                    <TableCell>{student.lname}</TableCell>
                    <TableCell>{student.username}</TableCell>
                    <TableCell>{classLabel(student.grade, student.section)}</TableCell>
                    <TableCell>
                      <Button
                        component={Link}
                        href={registrarViewHref(student.student_id)}
                        size="small"
                        variant="outlined"
                        startIcon={<VisibilityIcon />}
                      >
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      ) : (
        <Alert severity="info">
          No Results Found — no student matches “{searchKey}”.{' '}
          <Button component={Link} href={REGISTRAR_SEARCH} size="small" color="secondary">
            Clear search
          </Button>
        </Alert>
      )}
    </SectionShell>
  );
}
