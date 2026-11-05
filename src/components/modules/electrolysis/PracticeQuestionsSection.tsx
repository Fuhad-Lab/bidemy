'use client';

/**
 * "Practice Questions" section of the Electrolysis module.
 * Ported 1:1 from the original index.html + its inline `toggleHint(id)`
 * behaviour: every question part has a "Show Hint" toggle. The original
 * "Submit for Review" button had no handler; it is wired to a local
 * (client-side only) confirmation so the control is functional without a
 * backend.
 */

import * as React from 'react';
import EditIcon from '@mui/icons-material/Edit';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import TextField from '@mui/material/TextField';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

interface QuestionPart {
  key: string;
  label: string;
  prompt: string;
  hint: string;
}

interface QuestionDef {
  id: string;
  number: number;
  accent: 'purple' | 'blue';
  title: string;
  intro?: string;
  parts: QuestionPart[];
}

const QUESTIONS: QuestionDef[] = [
  {
    id: 'q1',
    number: 1,
    accent: 'purple',
    title: 'Electrolysis of Molten Lead(II) Bromide',
    parts: [
      { key: 'q1a', label: 'a', prompt: 'What is produced at the cathode?', hint: 'Think about what happens to Pb²⁺ ions at the negative electrode.' },
      { key: 'q1b', label: 'b', prompt: 'Write the half equation for the reaction at the anode.', hint: 'Remember that Br⁻ ions are oxidized at the anode.' },
      { key: 'q1c', label: 'c', prompt: 'Calculate the mass of lead produced when a current of 2.0A passes for 30 minutes.', hint: 'Use m = (It × M)/(nF) where F = 96,500 C/mol' },
    ],
  },
  {
    id: 'q2',
    number: 2,
    accent: 'blue',
    title: 'Understanding Electrolytes',
    intro: 'Explain why:',
    parts: [
      { key: 'q2a', label: 'a', prompt: 'Pure water does not conduct electricity', hint: 'Consider the concentration of H⁺ and OH⁻ ions in pure water.' },
      { key: 'q2b', label: 'b', prompt: 'Sodium chloride solution conducts electricity', hint: 'Think about what happens to NaCl when dissolved in water.' },
      { key: 'q2c', label: 'c', prompt: 'Different products are obtained when concentrated and dilute sodium chloride solutions are electrolyzed', hint: 'Consider how concentration affects the competition between ions at each electrode.' },
    ],
  },
];

const ACCENT = {
  purple: { text: '#9333ea', chipBg: '#f3e8ff', border: '#a855f7', headerBg: '#faf5ff' },
  blue: { text: '#2563eb', chipBg: '#dbeafe', border: '#3b82f6', headerBg: '#eff6ff' },
} as const;

export default function PracticeQuestionsSection() {
  const [openHints, setOpenHints] = React.useState<Record<string, boolean>>({});
  const [answers, setAnswers] = React.useState('');
  const [submitted, setSubmitted] = React.useState(false);

  const toggleHint = (key: string) =>
    setOpenHints((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" sx={{ color: '#111827', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box component="span" sx={{ display: 'inline-flex', color: '#a855f7', '& svg': { fontSize: 28 } }}>
            <EditIcon />
          </Box>
          Practice Questions
        </Typography>
        <Typography sx={{ color: '#4b5563', mt: 1 }}>
          IGCSE and WAEC level questions to test your understanding
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        {QUESTIONS.map((q) => {
          const accent = ACCENT[q.accent];
          return (
            <Paper key={q.id} elevation={0} sx={{ borderRadius: 2, overflow: 'hidden', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
              <Box sx={{ p: 3, bgcolor: accent.headerBg, borderLeft: 4, borderColor: accent.border }}>
                <Box
                  sx={{
                    display: 'inline-block',
                    px: 1,
                    py: 0.25,
                    fontSize: 12,
                    fontWeight: 500,
                    color: accent.text,
                    bgcolor: accent.chipBg,
                    borderRadius: 1,
                    mb: 1,
                  }}
                >
                  Question {q.number}
                </Box>
                <Typography sx={{ fontSize: 18, fontWeight: 500, color: '#111827' }}>{q.title}</Typography>
              </Box>

              <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
                {q.intro && <Typography sx={{ color: '#374151', fontWeight: 500 }}>{q.intro}</Typography>}
                {q.parts.map((part) => (
                  <Box key={part.key} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                    <Box
                      sx={{
                        px: 1,
                        py: 0.25,
                        fontSize: 12,
                        fontWeight: 500,
                        color: accent.text,
                        bgcolor: accent.chipBg,
                        borderRadius: 1,
                        mt: '2px',
                      }}
                    >
                      {part.label}
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography sx={{ color: '#1f2937' }}>{part.prompt}</Typography>
                      <Box sx={{ mt: 1, p: 1.5, bgcolor: '#f9fafb', borderRadius: 2 }}>
                        <Button
                          size="small"
                          onClick={() => toggleHint(part.key)}
                          sx={{ fontSize: 14, color: accent.text, minWidth: 0, px: 0.5, '&:hover': { bgcolor: 'transparent' } }}
                        >
                          {openHints[part.key] ? 'Hide Hint' : 'Show Hint'}
                        </Button>
                        <Collapse in={!!openHints[part.key]}>
                          <Typography sx={{ mt: 1, fontSize: 14, color: '#4b5563' }}>{part.hint}</Typography>
                        </Collapse>
                      </Box>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Paper>
          );
        })}

        {/* Submission section */}
        <Box sx={{ bgcolor: '#f9fafb', borderRadius: 2, p: 3 }}>
          <Typography sx={{ fontSize: 18, fontWeight: 500, color: '#111827', mb: 2 }}>Submit Your Answers</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              multiline
              rows={6}
              placeholder="Type your answers here..."
              value={answers}
              onChange={(e) => setAnswers(e.target.value)}
              sx={{
                '& .MuiOutlinedInput-root': {
                  bgcolor: '#fff',
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#a855f7' },
                },
              }}
            />
            <Button
              variant="contained"
              onClick={() => setSubmitted(true)}
              sx={{ bgcolor: '#9333ea', px: 3, alignSelf: 'flex-start', '&:hover': { bgcolor: '#7e22ce' } }}
            >
              Submit for Review
            </Button>
          </Box>
        </Box>
      </Box>

      <Snackbar
        open={submitted}
        autoHideDuration={4000}
        onClose={() => setSubmitted(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setSubmitted(false)} severity="success" variant="filled" sx={{ width: '100%' }}>
          Your answers have been saved locally for review.
        </Alert>
      </Snackbar>
    </Box>
  );
}
