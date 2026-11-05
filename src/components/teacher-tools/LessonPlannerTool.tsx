'use client';

/**
 * Lesson planner — port of lesson-planner.html, upgraded from the original
 * single textarea into a structured form (title / date / details) that saves
 * plans to local state + localStorage (original key: `teacherPlans`).
 * Seeded with sample lesson plans derived from each subject's syllabus.
 */

import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EventNoteIcon from '@mui/icons-material/EventNote';
import { useLocalList } from './useLocalList';
import { DEMO_LESSON_PLANS } from '@/data/teachers/demo-content';

interface Plan {
  id: string;
  title: string;
  date: string;
  details: string;
}

export default function LessonPlannerTool({ subject }: { subject: string }) {
  const seed = React.useMemo(
    () =>
      DEMO_LESSON_PLANS[subject] ?? [
        {
          id: 'plan-demo',
          title: 'Demo lesson plan',
          date: new Date().toISOString().slice(0, 10),
          details: 'Describe your lesson plan here.',
        },
      ],
    [subject],
  );
  const [plans, setPlans] = useLocalList<Plan>(`fuhademy-teacherPlans-${subject}`, seed);

  const [title, setTitle] = React.useState('');
  const [date, setDate] = React.useState('');
  const [details, setDetails] = React.useState('');
  const [savedAt, setSavedAt] = React.useState<string | null>(null);

  const addLesson = () => {
    const t = title.trim();
    if (!t) return;
    setPlans((prev) => [
      {
        id: `plan-${Date.now()}`,
        title: t,
        date: date || new Date().toISOString().slice(0, 10),
        details: details.trim(),
      },
      ...prev,
    ]);
    setTitle('');
    setDate('');
    setDetails('');
    setSavedAt(new Date().toLocaleTimeString());
  };

  return (
    <Box>
      <Box
        component="form"
        onSubmit={(e) => {
          e.preventDefault();
          addLesson();
        }}
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '2fr 1fr' },
          gap: 2,
        }}
      >
        <TextField
          size="small"
          label="Lesson title"
          placeholder={`e.g. ${plans[0]?.title ?? 'New lesson'}`}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <TextField
          size="small"
          type="date"
          label="Date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          slotProps={{ inputLabel: { shrink: true } }}
        />
        <TextField
          size="small"
          fullWidth
          multiline
          minRows={3}
          sx={{ gridColumn: { sm: '1 / -1' } }}
          label="Lesson details / objectives"
          placeholder="Describe your lesson plan…"
          value={details}
          onChange={(e) => setDetails(e.target.value)}
        />
        <Stack
          direction="row"

          spacing={2}
          sx={{ alignItems: "center", gridColumn: { sm: '1 / -1' } }}
        >
          <Button
            type="submit"
            variant="contained"
            size="large"
            startIcon={<AddCircleIcon />}
          >
            Add Lesson
          </Button>
          {savedAt && (
            <Typography variant="caption" color="success.main">
              Saved to local state at {savedAt} ✓
            </Typography>
          )}
        </Stack>
      </Box>

      <Typography variant="subtitle2" sx={{ mt: 3, mb: 1.5, color: 'text.secondary' }}>
        Lesson plans ({plans.length})
      </Typography>
      <Stack spacing={2}>
        {plans.map((plan) => (
          <Card
            key={plan.id}
            variant="outlined"
            sx={{
              p: 2,
              display: 'flex',
              gap: 2,
              alignItems: 'flex-start',
              boxShadow: '0 1px 4px rgba(45,59,69,0.06)',
            }}
          >
            <Box sx={{ flexGrow: 1, minWidth: 0 }}>
              <Stack sx={{ flexWrap: "wrap", alignItems: "center" }} direction="row" spacing={1.5}>
                <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                  {plan.title}
                </Typography>
                {plan.date && (
                  <Chip
                    size="small"
                    icon={<EventNoteIcon />}
                    label={plan.date}
                    variant="outlined"
                  />
                )}
              </Stack>
              {plan.details && (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 1, whiteSpace: 'pre-wrap' }}
                >
                  {plan.details}
                </Typography>
              )}
            </Box>
            <IconButton
              aria-label={`Delete lesson: ${plan.title}`}
              onClick={() => setPlans((prev) => prev.filter((p) => p.id !== plan.id))}
              sx={{ color: '#d32f2f', flexShrink: 0 }}
            >
              <DeleteOutlineIcon />
            </IconButton>
          </Card>
        ))}
      </Stack>
    </Box>
  );
}
