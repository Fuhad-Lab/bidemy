'use client';

/**
 * Quick links — port of quick-links.html. Add any URL, open in a new tab,
 * delete. Persisted per subject in localStorage (original key:
 * `teacherLinks`), seeded with subject-relevant study links.
 */

import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import AddLinkIcon from '@mui/icons-material/AddLink';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutlineOutlined';
import LaunchIcon from '@mui/icons-material/Launch';
import LinkIcon from '@mui/icons-material/Link';
import { useLocalList } from './useLocalList';
import { DEMO_QUICK_LINKS } from '@/data/teachers/demo-content';

interface QuickLink {
  id: string;
  url: string;
  label: string;
}

function normalizeUrl(input: string): string {
  const value = input.trim();
  if (!value) return '';
  if (/^https?:\/\//i.test(value)) return value;
  return `https://${value}`;
}

function hostOf(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return url;
  }
}

const FALLBACK: QuickLink[] = [
  { id: 'l-1', url: 'https://jamb.gov.ng/Syllabus', label: 'JAMB UTME Syllabus' },
];

export default function QuickLinksTool({ subject }: { subject: string }) {
  const seed = React.useMemo(
    () => DEMO_QUICK_LINKS[subject] ?? FALLBACK,
    [subject],
  );
  const [links, setLinks] = useLocalList<QuickLink>(
    `fuhademy-teacherLinks-${subject}`,
    seed,
  );
  const [draft, setDraft] = React.useState('');
  const [error, setError] = React.useState('');

  const addLink = () => {
    const url = normalizeUrl(draft);
    if (!draft.trim()) return;
    if (!/^https?:\/\/[^\s.]+\.[^\s]{2,}$/i.test(url)) {
      setError('Enter a valid URL, e.g. khanacademy.org/math');
      return;
    }
    setError('');
    setLinks((prev) => [
      { id: `l-${Date.now()}`, url, label: hostOf(url) },
      ...prev,
    ]);
    setDraft('');
  };

  return (
    <Box>
      <TextField
        fullWidth
        size="small"
        label="Paste or type a URL…"
        placeholder="e.g. https://khanacademy.org/math"
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') addLink();
        }}
        error={Boolean(error)}
        helperText={error || 'Links open in a new tab, like the original tool.'}
      />
      <Box sx={{ mt: 1.5, mb: 2 }}>
        <Button variant="contained" onClick={addLink} startIcon={<AddLinkIcon />}>
          Add Link
        </Button>
      </Box>

      {links.length === 0 ? (
        <Typography variant="body2" color="text.secondary" sx={{ py: 4, textAlign: 'center' }}>
          No quick links yet — add one above.
        </Typography>
      ) : (
        <Box
          sx={{
            border: '1px solid rgba(0,0,0,0.08)',
            borderRadius: 2,
            maxHeight: 380,
            overflowY: 'auto',
            '&::-webkit-scrollbar': { width: 8 },
            '&::-webkit-scrollbar-thumb': {
              background: 'rgba(45,59,69,0.25)',
              borderRadius: 4,
            },
          }}
        >
          <List dense disablePadding>
            {links.map((link) => (
              <ListItem
                key={link.id}
                secondaryAction={
                  <IconButton
                    edge="end"
                    aria-label={`Delete link: ${link.label}`}
                    onClick={() =>
                      setLinks((prev) => prev.filter((l) => l.id !== link.id))
                    }
                    sx={{ color: '#d32f2f' }}
                  >
                    <DeleteOutlineIcon />
                  </IconButton>
                }
                disablePadding
              >
                <ListItemButton
                  component={Link}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ pr: 7 }}
                >
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    <LinkIcon fontSize="small" color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary={link.label}
                    secondary={link.url}
                    primaryTypographyProps={{ fontWeight: 600 }}
                  />
                  <LaunchIcon fontSize="small" sx={{ color: 'text.disabled', ml: 1 }} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      )}

      <Box sx={{ mt: 2 }}>
        <Chip
          size="small"
          label={`${links.length} saved link${links.length === 1 ? '' : 's'}`}
          color="primary"
          variant="outlined"
        />
      </Box>
    </Box>
  );
}
