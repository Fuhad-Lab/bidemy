'use client';

/**
 * TopicQuiz — MUI replacement for the original TopicQuiz JS module.
 * Behaviour parity: one question at a time, click an option, immediate
 * correct/incorrect feedback with explanation, score at the end with
 * pass/fail against the topic's passingScore, retry, and completion
 * recorded to localStorage (backend-free, replacing Supabase).
 */

import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import LinearProgress from '@mui/material/LinearProgress';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import ReplayIcon from '@mui/icons-material/Replay';
import QuizIcon from '@mui/icons-material/Quiz';
import type { PageQuiz } from '@/lib/content';

const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'];

export default function TopicQuiz({ quiz }: { quiz: PageQuiz }) {
  const total = quiz.questions.length;
  const [index, setIndex] = React.useState(0);
  const [picked, setPicked] = React.useState<number | null>(null);
  const [score, setScore] = React.useState(0);
  const [done, setDone] = React.useState(false);

  const q = quiz.questions[index];

  const recordCompletion = React.useCallback(
    (finalScore: number) => {
      try {
        const key = 'bidemy-quiz-' + (quiz.topicId || 'topic');
        const passed = (finalScore / total) * 100 >= quiz.passingScore;
        window.localStorage.setItem(
          key,
          JSON.stringify({ score: finalScore, total, passed, at: Date.now() }),
        );
        window.dispatchEvent(new CustomEvent('bidemy-quiz-complete', { bubbles: true }));
      } catch {
        /* storage unavailable */
      }
    },
    [quiz.topicId, quiz.passingScore, total],
  );

  const choose = (i: number) => {
    if (picked !== null) return;
    setPicked(i);
    if (i === q.correct) setScore((s) => s + 1);
  };

  const next = () => {
    if (index + 1 >= total) {
      const finalScore = score;
      setDone(true);
      recordCompletion(finalScore);
    } else {
      setIndex((n) => n + 1);
      setPicked(null);
    }
  };

  const retry = () => {
    setIndex(0);
    setPicked(null);
    setScore(0);
    setDone(false);
  };

  if (done) {
    const pct = Math.round((score / total) * 100);
    const passed = pct >= quiz.passingScore;
    return (
      <Card
        elevation={0}
        sx={{
          my: 3,
          border: '1px solid',
          borderColor: passed ? '#bbf7d0' : '#fecaca',
          background: passed ? '#f0fdf4' : '#fef2f2',
        }}
      >
        <CardContent sx={{ textAlign: 'center', py: 4 }}>
          {passed ? (
            <CheckCircleIcon color="success" sx={{ fontSize: 56, mb: 1 }} />
          ) : (
            <CancelIcon color="error" sx={{ fontSize: 56, mb: 1 }} />
          )}
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
            {passed ? 'Quiz passed!' : 'Not quite yet'}
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 2 }}>
            You scored {score} / {total} ({pct}%) — passing score is {quiz.passingScore}%
          </Typography>
          <Button
            variant="outlined"
            startIcon={<ReplayIcon />}
            onClick={retry}
            sx={{ mr: 1 }}
          >
            Try again
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      elevation={0}
      sx={{ my: 3, border: '1px solid #e0e7ff', background: '#f8faff' }}
      data-bidemy-quiz
    >
      <CardContent>
        <Stack direction="row" spacing={1} sx={{ alignItems: "center", mb: 1.5 }}>
          <QuizIcon sx={{ color: '#6366f1', fontSize: 22 }} />
          <Typography sx={{ fontWeight: 700, color: '#3730a3' }}>Knowledge Check</Typography>
          <Chip
            size="small"
            label={`Question ${index + 1} of ${total}`}
            sx={{ ml: 'auto', background: '#e0e7ff', color: '#3730a3', fontWeight: 600 }}
          />
        </Stack>
        <LinearProgress
          variant="determinate"
          value={((index + (picked !== null ? 1 : 0)) / total) * 100}
          sx={{ height: 6, borderRadius: 3, mb: 2.5, background: '#e0e7ff' }}
        />
        <Typography sx={{ fontWeight: 600, color: '#1f2937', mb: 2 }}>{q.question}</Typography>
        <Stack spacing={1}>
          {q.options.map((opt, i) => {
            const isCorrect = picked !== null && i === q.correct;
            const isWrongPick = picked === i && i !== q.correct;
            return (
              <Button
                key={i}
                fullWidth
                disableRipple={picked !== null}
                onClick={() => choose(i)}
                sx={{
                  justifyContent: 'flex-start',
                  textTransform: 'none',
                  textAlign: 'left',
                  px: 2,
                  py: 1.25,
                  borderRadius: 2,
                  border: '1px solid',
                  borderColor: isCorrect
                    ? '#16a34a'
                    : isWrongPick
                      ? '#dc2626'
                      : picked !== null
                        ? '#e5e7eb'
                        : '#c7d2fe',
                  background: isCorrect
                    ? '#f0fdf4'
                    : isWrongPick
                      ? '#fef2f2'
                      : picked !== null
                        ? '#f9fafb'
                        : '#ffffff',
                  color: '#1f2937',
                  '&:hover': {
                    borderColor: picked === null ? '#6366f1' : undefined,
                    background: picked === null ? '#eef2ff' : undefined,
                  },
                }}
                startIcon={
                  <Box
                    component="span"
                    sx={{
                      width: 26,
                      height: 26,
                      borderRadius: '50%',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 13,
                      fontWeight: 700,
                      flexShrink: 0,
                      background:
                        picked !== null && (isCorrect || isWrongPick)
                          ? isCorrect
                            ? '#16a34a'
                            : '#dc2626'
                          : '#e0e7ff',
                      color:
                        picked !== null && (isCorrect || isWrongPick)
                          ? '#ffffff'
                          : '#4338ca',
                    }}
                  >
                    {LETTERS[i]}
                  </Box>
                }
              >
                {opt}
              </Button>
            );
          })}
        </Stack>
        {picked !== null && (
          <Box
            sx={{
              mt: 2,
              p: 1.75,
              borderRadius: 2,
              background: picked === q.correct ? '#f0fdf4' : '#fef2f2',
              border: '1px solid',
              borderColor: picked === q.correct ? '#bbf7d0' : '#fecaca',
            }}
          >
            <Typography
              sx={{ fontWeight: 700, fontSize: 14, color: picked === q.correct ? '#166534' : '#991b1b', mb: 0.5 }}
            >
              {picked === q.correct ? '✓ Correct!' : '✗ Incorrect — correct answer: ' + LETTERS[q.correct]}
            </Typography>
            {q.explanation && (
              <Typography sx={{ fontSize: 14, color: '#374151' }}>{q.explanation}</Typography>
            )}
            <Box sx={{ textAlign: 'right', mt: 1 }}>
              <Button variant="contained" onClick={next}>
                {index + 1 >= total ? 'Finish Quiz' : 'Next Question'}
              </Button>
            </Box>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}
