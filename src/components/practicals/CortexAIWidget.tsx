'use client';

import * as React from 'react';
import Image from 'next/image';
import { Box, IconButton, Paper } from '@mui/material';

/**
 * Cortex AI floating chat widget — port of the floating button + popup iframe
 * found on the original WAEC titration practical pages.
 *
 * The AI service itself is a third-party embed (unchanged from the source);
 * no backend code is involved in this widget.
 */
const CORTEX_ICON = '/site/students/practical/chemistry/cortex-ai.svg';
const CORTEX_CHAT_URL = 'https://app.edcafe.ai/chatbots/69071564fd623b831789af02';

export default function CortexAIWidget() {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <IconButton
        aria-label={open ? 'Close Cortex AI chat' : 'Open Cortex AI chat'}
        onClick={() => setOpen((v) => !v)}
        sx={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          zIndex: 1200,
          width: 72,
          height: 72,
          p: 0,
          borderRadius: '16px',
          overflow: 'hidden',
          boxShadow: '0 4px 16px rgba(0,0,0,0.20)',
          transition: 'transform 0.18s cubic-bezier(.4,2,.6,1), box-shadow 0.18s',
          '&:hover': {
            transform: 'scale(1.12)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.28)',
            backgroundColor: 'transparent',
          },
          '&:active': { transform: 'scale(0.96)' },
          backgroundColor: 'transparent',
        }}
      >
        <Image src={CORTEX_ICON} alt="Cortex AI" width={72} height={72} />
      </IconButton>

      {open ? (
        <Paper
          elevation={8}
          sx={{
            position: 'fixed',
            bottom: 104,
            right: 20,
            width: { xs: 'calc(100vw - 40px)', sm: 380 },
            height: 500,
            borderRadius: '12px',
            overflow: 'hidden',
            zIndex: 1200,
          }}
        >
          <iframe
            src={CORTEX_CHAT_URL}
            title="Cortex AI chat"
            style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
          />
        </Paper>
      ) : null}
    </>
  );
}
