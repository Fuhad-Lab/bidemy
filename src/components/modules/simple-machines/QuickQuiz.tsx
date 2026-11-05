'use client';

/**
 * Quick quiz — 1:1 port of the quiz panel in
 * /home/z/fuhademy/students/simple-machines-module/ (script.js `gradeQuiz`).
 *
 * Exact original behaviour:
 *   answers = { q1: 'a', q2: 'b', q3: 'b' }
 *   score = number of checked radios matching the key
 *   result text = `You scored ${score}/3.`
 *   color = green when 3/3, otherwise #b13b3b ; container aria-live="polite"
 */

import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

const BRAND = '#0b63b1';

const QUESTIONS = [
  {
    id: 'q1',
    prompt: 'Which expression gives torque?',
    options: [
      { value: 'a', label: 'Force × Distance' },
      { value: 'b', label: 'Force + Distance' },
      { value: 'c', label: 'Force / Distance' },
    ],
  },
  {
    id: 'q2',
    prompt: 'On a frictionless incline, acceleration down the slope is:',
    options: [
      { value: 'a', label: 'g·cos(theta)' },
      { value: 'b', label: 'g·sin(theta)' },
      { value: 'c', label: 'g' },
    ],
  },
  {
    id: 'q3',
    prompt: 'Two equal forces are applied at different distances from fulcrum. Which will produce larger torque?',
    options: [
      { value: 'a', label: 'The one closer to fulcrum' },
      { value: 'b', label: 'The one farther from fulcrum' },
      { value: 'c', label: 'They produce equal torque' },
    ],
  },
];

const ANSWER_KEY: Record<string, string> = { q1: 'a', q2: 'b', q3: 'b' };

export default function QuickQuiz() {
  const [choices, setChoices] = React.useState<Record<string, string>>({});
  const [result, setResult] = React.useState<{ text: string; correct: boolean } | null>(null);

  // Exact behaviour of the original `gradeQuiz()`.
  const gradeQuiz = () => {
    let score = 0;
    for (const q of ['q1', 'q2', 'q3']) {
      if (choices[q] && choices[q] === ANSWER_KEY[q]) score += 1;
    }
    setResult({ text: `You scored ${score}/3.`, correct: score === 3 });
  };

  return (
    <Box>
      <Box component="ol" sx={{ pl: 3, m: 0, display: 'flex', flexDirection: 'column', gap: 2.5 }}>
        {QUESTIONS.map((q) => (
          <Box component="li" key={q.id}>
            <Typography sx={{ mb: 0.5 }}>{q.prompt}</Typography>
            <RadioGroup
              aria-label={q.prompt}
              value={choices[q.id] ?? null}
              onChange={(e) => setChoices((prev) => ({ ...prev, [q.id]: e.target.value }))}
              sx={{ display: 'flex', flexDirection: 'column', gap: 0.25 }}
            >
              {q.options.map((opt) => (
                <FormControlLabel
                  key={opt.value}
                  value={opt.value}
                  control={<Radio size="small" sx={{ color: BRAND, '&.Mui-checked': { color: BRAND }, py: 0.25 }} />}
                  label={<Typography sx={{ fontSize: 14 }}>{opt.label}</Typography>}
                  sx={{ m: 0 }}
                />
              ))}
            </RadioGroup>
          </Box>
        ))}
      </Box>

      <Button
        variant="contained"
        onClick={gradeQuiz}
        sx={{
          mt: 2.5,
          bgcolor: BRAND,
          '&:hover': { bgcolor: '#09508f' },
          '&:active': { transform: 'translateY(1px)' },
        }}
      >
        Submit Answers
      </Button>

      <Box aria-live="polite" sx={{ mt: 1.5 }}>
        {result && (
          <Typography sx={{ fontWeight: 500, color: result.correct ? 'green' : '#b13b3b' }}>{result.text}</Typography>
        )}
      </Box>
    </Box>
  );
}
