'use client';

/**
 * Syllabus viewer — renders the structured content extracted from each
 * subject's original syllabus-<subject>.html page (JAMB UTME syllabi:
 * aims + numbered sections with Topics / Objectives).
 */

import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import BulletPointIcon from '@mui/icons-material/ArrowRight';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TargetIcon from '@mui/icons-material/TrackChanges';
import { SYLLABI } from '@/data/teachers/syllabi';
import { subjectLabel } from '@/data/teachers/subjects';

export default function SyllabusView({ subject }: { subject: string }) {
  const [expanded, setExpanded] = React.useState<string | false>(
    `section-0`,
  );
  const syllabus = SYLLABI[subject];

  if (!syllabus) {
    return (
      <Paper variant="outlined" sx={{ p: 3 }}>
        <Typography color="text.secondary">
          No syllabus content was found for {subjectLabel(subject)}.
        </Typography>
      </Paper>
    );
  }

  return (
    <Box>
      <Typography variant="h6" component="h2" sx={{ fontWeight: 700 }}>
        {syllabus.title}
      </Typography>
      <Box sx={{ mt: 1, mb: 1.5 }}>
        <Chip size="small" color="primary" variant="outlined" label={syllabus.source} />
      </Box>
      {syllabus.intro && (
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2, lineHeight: 1.7 }}>
          {syllabus.intro}
        </Typography>
      )}

      {syllabus.aims.length > 0 && (
        <Paper
          variant="outlined"
          sx={{ p: 2, mb: 3, bgcolor: 'background.default', borderRadius: 2 }}
        >
          <Typography variant="subtitle2" sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <TargetIcon fontSize="small" color="primary" /> Course objectives
          </Typography>
          <List dense disablePadding>
            {syllabus.aims.map((aim) => (
              <ListItem key={aim} disableGutters>
                <ListItemIcon sx={{ minWidth: 28 }}>
                  <BulletPointIcon fontSize="small" color="primary" />
                </ListItemIcon>
                <ListItemText primary={aim} primaryTypographyProps={{ variant: 'body2' }} />
              </ListItem>
            ))}
          </List>
        </Paper>
      )}

      {syllabus.note && (
        <Typography variant="caption" color="text.disabled" sx={{ display: 'block', mb: 2 }}>
          {syllabus.note}
        </Typography>
      )}

      <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
        {syllabus.sections.length} section{syllabus.sections.length === 1 ? '' : 's'}
      </Typography>
      <Divider sx={{ mb: 1.5 }} />

      <Box>
        {syllabus.sections.map((section, idx) => {
          const panelId = `section-${idx}`;
          return (
            <Accordion
              key={panelId}
              expanded={expanded === panelId}
              onChange={(_, isExpanded) => setExpanded(isExpanded ? panelId : false)}
              disableGutters
              elevation={0}
              sx={{
                border: '1px solid rgba(0,0,0,0.08)',
                borderRadius: '10px !important',
                mb: 1.2,
                overflow: 'hidden',
              }}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, fontSize: 15 }}>
                  {`${idx + 1}. ${section.title}`}
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ pt: 0 }}>
                {section.topics.length > 0 && (
                  <>
                    <Typography variant="overline" color="primary" sx={{ display: 'block' }}>
                      Topics
                    </Typography>
                    <List dense disablePadding sx={{ mb: 1.5 }}>
                      {section.topics.map((topic, i) => (
                        <ListItem key={`${panelId}-t-${i}`} disableGutters>
                          <ListItemIcon sx={{ minWidth: 26 }}>
                            <BulletPointIcon fontSize="small" sx={{ color: 'text.disabled' }} />
                          </ListItemIcon>
                          <ListItemText
                            primary={topic}
                            primaryTypographyProps={{ variant: 'body2' }}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </>
                )}
                {section.objectives.length > 0 && (
                  <>
                    <Typography variant="overline" color="secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <ArrowForwardIosIcon sx={{ fontSize: 11 }} /> Objectives
                    </Typography>
                    <List dense disablePadding>
                      {section.objectives.map((objective, i) => (
                        <ListItem key={`${panelId}-o-${i}`} disableGutters>
                          <ListItemIcon sx={{ minWidth: 26 }}>
                            <BulletPointIcon fontSize="small" sx={{ color: 'text.disabled' }} />
                          </ListItemIcon>
                          <ListItemText
                            primary={objective}
                            primaryTypographyProps={{ variant: 'body2' }}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </>
                )}
                {section.topics.length === 0 && section.objectives.length === 0 && (
                  <Typography variant="body2" color="text.disabled">
                    No topics listed for this section in the source page.
                  </Typography>
                )}
              </AccordionDetails>
            </Accordion>
          );
        })}
      </Box>
    </Box>
  );
}
