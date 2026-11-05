'use client';

/**
 * Sticky notes — port of sticky-notes.html. Notes live in a drag-free
 * responsive grid (original used absolutely-positioned notes; the migration
 * keeps add/delete and adds a tidier MUI grid). Persisted per subject in
 * localStorage (original key: `teacherNotes`).
 */

import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import AddBoxIcon from '@mui/icons-material/AddBox';
import CloseIcon from '@mui/icons-material/Close';
import StickyNote2Icon from '@mui/icons-material/StickyNote2';
import { useLocalList } from './useLocalList';
import { DEMO_STICKY_NOTES } from '@/data/teachers/demo-content';

interface Note {
  id: string;
  text: string;
  color: string;
  rotation: number;
}

const PASTELS = ['#fff59d', '#f8bbd0', '#b3e5fc', '#c8e6c9', '#ffe0b2', '#e1bee7'];
const ROTATIONS = [-1.4, 1.1, -0.7, 0.9, -1.1, 1.4];

const FALLBACK = ['Plan next week’s topics.', 'Call parents on Friday.'];

export default function StickyNotesTool({ subject }: { subject: string }) {
  const seed = React.useMemo<Note[]>(() => {
    const texts = DEMO_STICKY_NOTES[subject] ?? FALLBACK;
    return texts.map((text, i) => ({
      id: `n-${i}`,
      text,
      color: PASTELS[i % PASTELS.length],
      rotation: ROTATIONS[i % ROTATIONS.length],
    }));
  }, [subject]);

  const [notes, setNotes] = useLocalList<Note>(`fuhademy-teacherNotes-${subject}`, seed);
  const [draft, setDraft] = React.useState('');

  const addNote = () => {
    const value = draft.trim();
    if (!value) return;
    setNotes((prev) => [
      {
        id: `n-${Date.now()}`,
        text: value,
        color: PASTELS[Math.floor(Math.random() * PASTELS.length)],
        rotation: ROTATIONS[Math.floor(Math.random() * ROTATIONS.length)],
      },
      ...prev,
    ]);
    setDraft('');
  };

  return (
    <Box>
      <TextField
        fullWidth
        multiline
        minRows={2}
        size="small"
        label="Write a note…"
        placeholder="Pin a reminder to your dashboard"
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) addNote();
        }}
        helperText="Ctrl/⌘ + Enter to add quickly"
      />
      <Box sx={{ mt: 1.5, mb: 2.5 }}>
        <Button variant="contained" onClick={addNote} startIcon={<AddBoxIcon />}>
          Add Note
        </Button>
      </Box>

      {notes.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 6, color: 'text.secondary' }}>
          <StickyNote2Icon sx={{ fontSize: 44, mb: 1, opacity: 0.5 }} />
          <Typography variant="body2">No sticky notes yet — pin your first one above.</Typography>
        </Box>
      ) : (
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
            },
            gap: 2,
          }}
        >
          {notes.map((note) => (
            <Box
              key={note.id}
              sx={{
                position: 'relative',
                bgcolor: note.color,
                color: 'rgba(0,0,0,0.8)',
                borderRadius: 1.5,
                p: 2,
                pt: 3,
                minHeight: 120,
                boxShadow: '0 4px 10px rgba(45,59,69,0.14)',
                transform: `rotate(${note.rotation}deg)`,
                transition: 'transform 0.2s ease',
                '&:hover': { transform: 'rotate(0deg) scale(1.02)', zIndex: 2 },
                wordBreak: 'break-word',
                whiteSpace: 'pre-wrap',
              }}
            >
              <IconButton
                size="small"
                aria-label={`Delete note: ${note.text.slice(0, 40)}`}
                onClick={() => setNotes((prev) => prev.filter((n) => n.id !== note.id))}
                sx={{
                  position: 'absolute',
                  top: 2,
                  right: 2,
                  color: 'rgba(0,0,0,0.45)',
                  '&:hover': { color: '#d32f2f', bgcolor: 'rgba(0,0,0,0.06)' },
                }}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
              <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
                {note.text}
              </Typography>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
}
