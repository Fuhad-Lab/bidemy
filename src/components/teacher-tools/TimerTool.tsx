'use client';

/**
 * Stopwatch tool — faithful port of the original timer.html script
 * (Start / Pause / Reset, HH:MM:SS display, accumulate elapsed time with
 * Date.now() deltas so it stays accurate across tab throttling).
 */

import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

function format(ms: number): string {
  const sec = Math.floor(ms / 1000) % 60;
  const min = Math.floor(ms / 60000) % 60;
  const hr = Math.floor(ms / 3600000);
  const pad = (n: number) => n.toString().padStart(2, '0');
  return `${pad(hr)}:${pad(min)}:${pad(sec)}`;
}

export default function TimerTool() {
  const [elapsed, setElapsed] = React.useState(0);
  const [running, setRunning] = React.useState(false);
  const lastRef = React.useRef<number>(0);

  React.useEffect(() => {
    if (!running) return;
    lastRef.current = Date.now();
    const id = window.setInterval(() => {
      const now = Date.now();
      setElapsed((prev) => prev + (now - lastRef.current));
      lastRef.current = now;
    }, 100);
    return () => window.clearInterval(id);
  }, [running]);

  const canPause = running;
  const canReset = elapsed !== 0;

  return (
    <Box sx={{ textAlign: 'center' }}>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Track lesson time, group work or timed drills. Keeps counting while you
        switch tabs — pause when you are done.
      </Typography>

      <Paper
        variant="outlined"
        sx={{
          py: 5,
          mb: 3,
          borderRadius: 3,
          bgcolor: 'background.default',
          border: '1px dashed rgba(45,59,69,0.2)',
        }}
      >
        <Typography
          component="div"
          role="timer"
          aria-live="off"
          sx={{
            fontFamily: "'Inter', monospace",
            fontSize: { xs: '2.4rem', sm: '3rem' },
            fontWeight: 700,
            letterSpacing: 2,
            fontVariantNumeric: 'tabular-nums',
            color: running ? 'primary.main' : 'text.primary',
          }}
        >
          {format(elapsed)}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {running ? 'Running…' : canReset ? 'Paused' : 'Ready'}
        </Typography>
      </Paper>

      <Stack sx={{ justifyContent: "center", flexWrap: "wrap" }} direction="row" spacing={1.5}>
        <Button
          variant="contained"
          onClick={() => setRunning(true)}
          disabled={running}
          startIcon={<PlayArrowIcon />}
          sx={{ px: 3, py: 1.2 }}
        >
          Start
        </Button>
        <Button
          variant="contained"
          color="warning"
          onClick={() => setRunning(false)}
          disabled={!canPause}
          startIcon={<PauseIcon />}
          sx={{ px: 3, py: 1.2 }}
        >
          Pause
        </Button>
        <Button
          variant="outlined"
          color="error"
          onClick={() => {
            setRunning(false);
            setElapsed(0);
          }}
          disabled={!canReset}
          startIcon={<RestartAltIcon />}
          sx={{ px: 3, py: 1.2 }}
        >
          Reset
        </Button>
      </Stack>
    </Box>
  );
}
