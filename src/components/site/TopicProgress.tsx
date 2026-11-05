'use client';

/**
 * TopicProgress — MUI replacement for the original TopicTracker progress UI.
 * Tracks section viewing via IntersectionObserver over `section[id]` elements
 * inside the topic article (same sections list as the original tracker config)
 * and quiz completion via localStorage. Backend-free.
 */

import * as React from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';

export default function TopicProgress({
  tracker,
  quiz,
}: {
  tracker: { topicId: string | null; sections: string[]; quizRequired: boolean; topicTitle?: string | null } | null;
  quiz: { topicId: string | null } | null;
}) {
  const sections = tracker?.sections || [];
  const topicId = tracker?.topicId || quiz?.topicId || 'topic';
  const storageKey = 'bidemy-progress-' + topicId;

  const [viewed, setViewed] = React.useState<string[]>([]);
  const [quizDone, setQuizDone] = React.useState(false);

  React.useEffect(() => {
    try {
      const raw = window.localStorage.getItem(storageKey);
      if (raw) {
        const parsed = JSON.parse(raw) as { sections?: string[]; quizDone?: boolean };
        setViewed(parsed.sections || []);
        setQuizDone(!!parsed.quizDone);
      }
    } catch {
      /* ignore */
    }

    const markViewed = (id: string) => {
      setViewed((prev) => {
        if (prev.includes(id)) return prev;
        const nextList = [...prev, id];
        try {
          window.localStorage.setItem(
            storageKey,
            JSON.stringify({ sections: nextList, quizDone }),
          );
        } catch {
          /* ignore */
        }
        return nextList;
      });
    };

    /* observe section[id] blocks inside the article */
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && entry.target.id) markViewed(entry.target.id);
        }
      },
      { rootMargin: '0px 0px -20% 0px', threshold: 0.05 },
    );
    document.querySelectorAll('section[id]').forEach((el) => observer.observe(el));

    const onQuizComplete = () => {
      setQuizDone(true);
      setViewed((prev) => {
        try {
          window.localStorage.setItem(
            storageKey,
            JSON.stringify({ sections: prev, quizDone: true }),
          );
        } catch {
          /* ignore */
        }
        return prev;
      });
    };
    window.addEventListener('bidemy-quiz-complete', onQuizComplete);

    return () => {
      observer.disconnect();
      window.removeEventListener('bidemy-quiz-complete', onQuizComplete);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storageKey]);

  /* mirror the original topic-complete-btn behaviour: it only becomes
     clickable once every section has been viewed (and the quiz passed
     when the topic has one). */
  React.useEffect(() => {
    if (sections.length === 0) return;
    const btn = document.getElementById('topic-complete-btn') as HTMLButtonElement | null;
    if (!btn) return;
    const sectionPct2 = Math.round((viewed.length / sections.length) * 100);
    const ready = viewed.length >= sections.length && (!quiz?.topicId || quizDone);
    btn.disabled = !ready;
    btn.textContent = ready
      ? 'Topic Complete ✓'
      : 'Complete (' + sectionPct2 + '% viewed)';
  }, [viewed.length, sections.length, quizDone, quiz]);

  if (sections.length === 0) return null;

  const sectionPct = Math.round((viewed.length / sections.length) * 100);
  const overall = Math.min(
    100,
    Math.round(
      (viewed.length / sections.length) * (quiz?.topicId ? 80 : 100) +
        (quizDone && quiz?.topicId ? 20 : 0),
    ),
  );

  return (
    <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1.25 }} aria-label="Topic progress">
      <Typography sx={{ fontSize: 13, color: '#64748b', whiteSpace: 'nowrap' }}>
        {overall}% Complete
      </Typography>
      <Box sx={{ width: 96, height: 8, borderRadius: 4, overflow: 'hidden', background: '#e5e7eb' }}>
        <LinearProgress
          variant="determinate"
          value={overall}
          sx={{
            height: 8,
            borderRadius: 4,
            background: 'transparent',
            '& .MuiLinearProgress-bar': {
              background: 'linear-gradient(to right, #60a5fa, #6366f1)',
            },
          }}
        />
      </Box>
      <Box component="span" sx={{ display: 'none' }} data-sections={sectionPct} />
    </Box>
  );
}
