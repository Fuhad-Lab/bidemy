'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControlLabel from '@mui/material/FormControlLabel';
import GlobalStyles from '@mui/material/GlobalStyles';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Select from '@mui/material/Select';
import Snackbar from '@mui/material/Snackbar';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import CalculateIcon from '@mui/icons-material/Calculate';
import CloseIcon from '@mui/icons-material/Close';
import CortexAIWidget from '@/components/practicals/CortexAIWidget';
import {
  ANALYTE_COLORS,
  ELEMENT_MASSES,
  INDICATOR_COMPATIBILITY,
  PROCEDURE_DETAILS,
  PROCEDURE_STEPS,
  QUESTION_ENDPOINTS,
  SETUP_ENDPOINTS,
  STEP_TASKS,
  TITRANT_COLORS,
  TITRANT_TYPES,
  TRIAL_LABELS,
  WAEC_QUESTIONS,
  getIndicatorColor,
} from './waecData';

/**
 * Interactive React port of waec-titration-practicalv3.html.
 *
 * Original DOM/JS behaviour is reproduced with React state:
 *  - Learning mode: 7 guided procedure steps, apparatus animations, popups
 *  - Practice mode: WAEC question bank (2000-2004, 2020-2023) with exam timer,
 *    save/load answers (localStorage)
 *  - Calculation Helper popover (molarity, purity, moles, molar mass)
 *  - Rough + 3 accurate titration trials with trial tracker and endpoint popups
 *
 * No backend/API involved — everything is client-side.
 */

type Col = 'rough' | '1' | '2' | '3';
const COLS: Col[] = ['rough', '1', '2', '3'];

type ExperimentState = {
  buretteRinsed: boolean;
  pipetteRinsed: boolean;
  buretteFilled: boolean;
  titrantAdded: boolean;
  analyteAdded: boolean;
  indicatorAdded: boolean;
  titrantSelected: string;
  analyteSelected: string;
  indicatorSelected: string;
  titrantType: string;
  endpointReached: boolean;
  trialsCompleted: boolean;
};

const initialExp = (): ExperimentState => ({
  buretteRinsed: false,
  pipetteRinsed: false,
  buretteFilled: false,
  titrantAdded: false,
  analyteAdded: false,
  indicatorAdded: false,
  titrantSelected: '',
  analyteSelected: '',
  indicatorSelected: '',
  titrantType: '',
  endpointReached: false,
  trialsCompleted: false,
});

type Droplet = { id: number; color: string; left: string; top: number };

type DialogState = {
  title: string;
  message: string;
  variant?: 'normal' | 'titration';
  onProceed?: () => void;
} | null;

const EXAM_SECONDS = 2 * 60 * 60 + 45 * 60; // 2h45m
const AUTO_TITRATION_DELAY = 900; // ms between drops + swirl

function formatTime(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

function calcResultBox(lines: { main: string; sub?: string }): React.ReactNode {
  return (
    <Box
      sx={{
        mt: 1,
        p: 1,
        borderRadius: 1,
        backgroundColor: '#f0fdf4',
        border: '1px solid #bbf7d0',
        color: '#166534',
        fontSize: '0.85rem',
      }}
    >
      <Typography variant="body2" sx={{ fontWeight: 600, color: '#166534' }}>
        Result:
      </Typography>
      <Typography variant="body2">{lines.main}</Typography>
      {lines.sub ? (
        <Typography variant="caption" sx={{ color: '#15803d', display: 'block', mt: 0.5 }}>
          {lines.sub}
        </Typography>
      ) : null}
    </Box>
  );
}

export default function WaecTitrationSimulator() {
  /* ------------------------------- mode ------------------------------- */
  const [mode, setMode] = React.useState<'learning' | 'practice'>('learning');
  const modeDescription =
    mode === 'learning'
      ? 'Tutorial mode with step-by-step guidance. Perfect for learning the titration process.'
      : 'Solve actual WAEC practical questions. No tutorials - test your skills in exam conditions.';

  /* --------------------------- exam timer ----------------------------- */
  const [remaining, setRemaining] = React.useState(EXAM_SECONDS);
  const [timerRunning, setTimerRunning] = React.useState(false);
  const [timerDialog, setTimerDialog] = React.useState<string | null>(null);
  const timerRef = React.useRef(remaining);
  timerRef.current = remaining;

  React.useEffect(() => {
    if (!timerRunning) return;
    const iv = window.setInterval(() => {
      const next = timerRef.current - 1;
      setRemaining(next);
      if (next === 900) setTimerDialog('15 minutes remaining!');
      if (next === 300) setTimerDialog('5 minutes remaining!');
      if (next <= 0) {
        setRemaining(0);
        setTimerRunning(false);
        setTimerDialog('Time is up! Please submit your work.');
      }
    }, 1000);
    return () => window.clearInterval(iv);
  }, [timerRunning]);

  const resetTimer = () => {
    setTimerRunning(false);
    setRemaining(EXAM_SECONDS);
  };

  /* --------------------------- simulator state ------------------------ */
  const [currentStep, setCurrentStep] = React.useState(1);
  const [glasswareCleaned, setGlasswareCleaned] = React.useState<Record<string, boolean>>({
    burette: false,
    pipette: false,
    flask: false,
  });
  const [cleanedNotes, setCleanedNotes] = React.useState<Record<string, string>>({});
  const [exp, setExp] = React.useState<ExperimentState>(initialExp);
  const [currentVolume, setCurrentVolume] = React.useState(50.0);
  const [cumulativeDispensed, setCumulativeDispensed] = React.useState(0.0);
  const [dropVolume, setDropVolume] = React.useState(0.5);
  const [endpointVolume, setEndpointVolume] = React.useState(24.8);
  const [buretteColor, setBuretteColor] = React.useState('transparent');
  const [flaskColor, setFlaskColor] = React.useState('transparent');
  const [cleaningItem, setCleaningItem] = React.useState<string | null>(null);
  const [rinsingItem, setRinsingItem] = React.useState<string | null>(null);
  const [filling, setFilling] = React.useState(false);
  const [measuring, setMeasuring] = React.useState(false);
  const [flaskRot, setFlaskRot] = React.useState(0);
  const [droplets, setDroplets] = React.useState<Droplet[]>([]);
  const [autoTitrating, setAutoTitrating] = React.useState(false);

  /* readings */
  const [finals, setFinals] = React.useState<Record<Col, string>>({
    rough: '',
    '1': '',
    '2': '',
    '3': '',
  });
  const [initials, setInitials] = React.useState<Record<Col, string>>({
    rough: '0.00',
    '1': '10.00',
    '2': '0.00',
    '3': '15.00',
  });
  const [used, setUsed] = React.useState<Record<Col, string>>({
    rough: '',
    '1': '',
    '2': '',
    '3': '',
  });
  const [avgVolume, setAvgVolume] = React.useState('');
  const [activeTrial, setActiveTrial] = React.useState<Col | null>('rough');
  const [highlightCol, setHighlightCol] = React.useState<Col | null>(null);
  const [endpointDisplay, setEndpointDisplay] = React.useState<{ label: string; value: string } | null>(
    null,
  );

  /* ui */
  const [snack, setSnack] = React.useState<string | null>(null);
  const [dialog, setDialog] = React.useState<DialogState>(null);
  const [guideFlash, setGuideFlash] = React.useState(false);
  const guideRef = React.useRef<HTMLDivElement | null>(null);
  const dropletSeq = React.useRef(0);

  /* preferences (localStorage) */
  const [autoAdvance, setAutoAdvance] = React.useState(false);
  const [skipPopup, setSkipPopup] = React.useState(false);
  React.useEffect(() => {
    try {
      setAutoAdvance(window.localStorage.getItem('sim_auto_advance_steps') === '1');
      setSkipPopup(window.localStorage.getItem('sim_auto_proceed_immediate') === '1');
    } catch {
      /* storage unavailable */
    }
  }, []);
  const savePref = (key: string, value: boolean) => {
    try {
      window.localStorage.setItem(key, value ? '1' : '0');
    } catch {
      /* ignore */
    }
  };

  /* practice mode question + answers */
  const [year, setYear] = React.useState('2023');
  const [answers, setAnswers] = React.useState<Record<string, string>>({});
  const [answersStatus, setAnswersStatus] = React.useState('');

  /* calculators */
  const [calcAnchor, setCalcAnchor] = React.useState<HTMLElement | null>(null);
  const [calcOpen, setCalcOpen] = React.useState(false);
  const [gpl, setGpl] = React.useState('');
  const [mmass, setMmass] = React.useState('');
  const [molarityResult, setMolarityResult] = React.useState<React.ReactNode>(null);
  const [actualMass, setActualMass] = React.useState('');
  const [theoreticalMass, setTheoreticalMass] = React.useState('');
  const [purityResult, setPurityResult] = React.useState<React.ReactNode>(null);
  const [concIn, setConcIn] = React.useState('');
  const [volIn, setVolIn] = React.useState('');
  const [molesResult, setMolesResult] = React.useState<React.ReactNode>(null);
  const [elementSel, setElementSel] = React.useState('');
  const [atomsIn, setAtomsIn] = React.useState(1);
  const [formula, setFormula] = React.useState<{ element: string; mass: number; atoms: number }[]>([]);
  const [massResult, setMassResult] = React.useState<React.ReactNode>(null);

  /* ------------------------- shared helpers --------------------------- */

  const expRef = React.useRef(exp);
  expRef.current = exp;
  const finalsRef = React.useRef(finals);
  finalsRef.current = finals;
  const cumRef = React.useRef(cumulativeDispensed);
  cumRef.current = cumulativeDispensed;
  const volRef = React.useRef(currentVolume);
  volRef.current = currentVolume;
  const endpointRef = React.useRef(endpointVolume);
  endpointRef.current = endpointVolume;

  const feedback = (message: string) => setSnack(message);

  const getNextEmptyFinalCol = (state: Record<Col, string> = finalsRef.current): Col | null => {
    for (const c of COLS) {
      if (!state[c] || state[c].trim() === '') return c;
    }
    return null;
  };

  const highlightNextFinalCol = (col: Col | null = getNextEmptyFinalCol()) => {
    setHighlightCol(col);
  };

  const computeAverage = (usedState: Record<Col, string>) => {
    const arr = [usedState['1'], usedState['2'], usedState['3']]
      .map((v) => parseFloat(v))
      .filter((v) => !Number.isNaN(v));
    if (arr.length === 0) {
      setAvgVolume('');
      return;
    }
    const sum = arr.reduce((s, x) => s + x, 0);
    setAvgVolume((sum / arr.length).toFixed(2));
  };

  const computeUsed = (col: Col, finVal: string, initVal: string) => {
    const iVal = parseFloat(initVal);
    const fVal = parseFloat(finVal);
    const next = { ...used, [col]: !Number.isNaN(iVal) && !Number.isNaN(fVal) ? (fVal - iVal).toFixed(2) : '' };
    setUsed(next);
    computeAverage(next);
  };

  const spawnDroplet = (color: string, left: string, top: number) => {
    const id = ++dropletSeq.current;
    setDroplets((d) => [...d, { id, color, left, top }]);
    window.setTimeout(() => setDroplets((d) => d.filter((x) => x.id !== id)), 1000);
  };

  const displayEndpointReading = (value: string, trialKey: Col | null) => {
    setEndpointDisplay({ label: TRIAL_LABELS[trialKey ?? ''] || 'Final', value });
  };

  const moveGuideFlash = () => {
    try {
      guideRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setGuideFlash(true);
      window.setTimeout(() => setGuideFlash(false), 600);
    } catch {
      /* ignore */
    }
  };

  /* --------------------------- step navigation ------------------------ */

  const moveToStep = (n: number) => {
    const step = Math.max(1, Math.min(7, Math.round(n)));
    setCurrentStep(step);
  };

  const moveToNextStep = () => {
    setCurrentStep((s) => {
      const next = Math.min(7, s + 1);
      return next;
    });
    moveGuideFlash();
  };

  /* auto-trigger recommended control for the current step */
  const autoTriggerForStep = (step: number) => {
    switch (step) {
      case 2:
        if (expRef.current.titrantSelected) rinseBurette();
        else feedback('Please choose a titrant before rinsing the burette');
        break;
      case 3:
        if (expRef.current.analyteSelected) rinsePipette();
        else feedback('Please choose an analyte (base) before rinsing the pipette.');
        break;
      case 4:
        if (expRef.current.buretteRinsed) fillBurette();
        else feedback('Rinse the burette first (select titrant and rinse).');
        break;
      case 5:
        if (expRef.current.analyteSelected) measureAnalyte();
        else feedback('Please choose an analyte (base) before measuring.');
        break;
      case 6:
        if (expRef.current.indicatorSelected) addIndicator();
        else feedback('Please choose an indicator before adding it.');
        break;
      case 7:
        feedback('Use "Add Drop" to dispense titrant. Swirl frequently.');
        break;
      default:
        break;
    }
  };
  const autoTriggerRef = React.useRef(autoTriggerForStep);
  autoTriggerRef.current = autoTriggerForStep;

  /* ------------------------ step popup (dialog) ----------------------- */

  const showStepPopup = (message: string, opts?: { critical?: boolean }) => {
    if (mode === 'practice' && !opts?.critical) return;
    if (skipPopup) {
      moveToNextStep();
      if (autoAdvance)
        window.setTimeout(() => autoTriggerRef.current(currentStep + 1 > 7 ? 7 : currentStep + 1), 250);
      return;
    }
    setDialog({ title: 'Step completed', message });
  };

  /* ------------------------------ actions ----------------------------- */

  const cleanGlassware = (item: 'burette' | 'pipette' | 'flask') => {
    if (mode === 'learning' && currentStep !== 1) {
      feedback('Complete the current step first!');
      return;
    }
    setCleaningItem(item);
    window.setTimeout(() => setCleaningItem(null), 1000);
    feedback(`Cleaning ${item} with distilled water...`);

    const nextCleaned = { ...glasswareCleaned, [item]: true };
    setGlasswareCleaned(nextCleaned);
    setCleanedNotes((prev) => ({
      ...prev,
      [item]: `In the actual WAEC practical: Rinse the ${item} thoroughly with distilled water 2-3 times.`,
    }));

    const allClean = Object.values(nextCleaned).every(Boolean);
    const msg = allClean
      ? 'All glassware cleaned. Ensure no contamination before proceeding. Proceed to next step?'
      : `${item.charAt(0).toUpperCase() + item.slice(1)} cleaned. Proceed when ready.`;
    window.setTimeout(() => showStepPopup(msg), 500);
  };

  const rinseBurette = () => {
    if (currentStep !== 2 || !exp.titrantSelected) {
      feedback(exp.titrantSelected ? 'Complete the current step first!' : 'Select a titrant first!');
      return;
    }
    setRinsingItem('burette');
    window.setTimeout(() => setRinsingItem(null), 1500);
    feedback(`Rinsing burette with ${exp.titrantSelected}...`);
    setExp((e) => ({ ...e, buretteRinsed: true }));
    // brief flash of rinse colour
    setBuretteColor('rgba(147, 197, 253, 0.3)');
    window.setTimeout(() => setBuretteColor('transparent'), 1500);
    window.setTimeout(
      () => showStepPopup(`Burette rinsed with ${exp.titrantSelected}. Proceed to next step?`),
      1600,
    );
  };

  const rinsePipette = () => {
    if (currentStep !== 3) {
      feedback('Complete the current step first!');
      return;
    }
    if (!exp.analyteSelected) {
      feedback('Please select an analyte (base) from the dropdown before rinsing the pipette.');
      return;
    }
    setRinsingItem('pipette');
    window.setTimeout(() => setRinsingItem(null), 1500);
    feedback('Rinsing pipette with analyte solution...');
    setExp((e) => ({ ...e, pipetteRinsed: true }));
    window.setTimeout(() => showStepPopup('Pipette rinsed with analyte solution. Proceed to next step?'), 1600);
  };

  const fillBurette = () => {
    if (currentStep !== 4 || !exp.buretteRinsed) {
      feedback(exp.buretteRinsed ? 'Complete the current step first!' : 'Rinse burette first!');
      return;
    }
    setFilling(true);
    window.setTimeout(() => setFilling(false), 2000);
    // colour from centralised titrant map
    setBuretteColor(TITRANT_COLORS[exp.titrantSelected] || 'rgba(250, 204, 21, 0.5)');
    setCurrentVolume(50.0);
    feedback(`Filling burette with ${exp.titrantSelected}...`);
    setExp((e) => ({ ...e, buretteFilled: true, titrantAdded: true }));
    window.setTimeout(
      () => showStepPopup(`Burette filled with ${exp.titrantSelected}. Proceed to next step?`),
      2600,
    );
  };

  const measureAnalyte = () => {
    if (currentStep !== 5) {
      feedback('Complete the current step first!');
      return;
    }
    if (!exp.analyteSelected) {
      feedback('Select an analyte (base) from the dropdown before measuring.');
      return;
    }
    setMeasuring(true);
    window.setTimeout(() => {
      feedback('Drawing up 25cm³ of analyte...');
      setMeasuring(false);
      window.setTimeout(() => {
        setFlaskColor(ANALYTE_COLORS[exp.analyteSelected] || 'rgba(147,197,253,0.3)');
        feedback(`Delivering ${exp.analyteSelected} to flask...`);
      }, 1500);
    }, 1000);
    setExp((e) => ({ ...e, analyteAdded: true }));
    window.setTimeout(
      () => showStepPopup('Analyte measured and delivered to flask. Proceed to next step?'),
      3100,
    );
  };

  const addIndicator = () => {
    if (currentStep !== 6 || !exp.indicatorSelected) {
      feedback(exp.indicatorSelected ? 'Complete previous steps first!' : 'Select an indicator first!');
      return;
    }
    const concentrated = getIndicatorColor(exp.indicatorSelected, true);
    spawnDroplet(concentrated, 'calc(28% + 8px)', 130);
    window.setTimeout(() => spawnDroplet(concentrated, 'calc(28% + 24px)', 130), 300);
    feedback(`Adding ${exp.indicatorSelected} (2 drops)...`);

    window.setTimeout(() => {
      setFlaskColor(getIndicatorColor(exp.indicatorSelected));
      setExp((e) => ({ ...e, indicatorAdded: true }));
      showStepPopup('Indicator added (2 drops) and fixed for this setup. Proceed to next step?');
    }, 1400);
  };

  const stopAutoTitration = () => {
    setAutoTitrating(false);
  };

  const updateFlaskColor = (cum: number) => {
    const indicator = expRef.current.indicatorSelected;
    const base =
      indicator === 'Methyl orange'
        ? 'rgba(255,165,0,0.5)'
        : getIndicatorColor(indicator) || 'rgba(147,197,253,0.3)';
    const endpointColor =
      indicator === 'Methyl orange'
        ? 'rgba(255,255,0,0.6)'
        : getIndicatorColor(indicator, true) || 'rgba(52,211,153,0.9)';

    const atEndpoint = Math.abs(cum - endpointRef.current) <= 0.2;

    if (atEndpoint && !expRef.current.endpointReached) {
      setFlaskColor(endpointColor);
      setExp((e) => ({ ...e, endpointReached: true }));
      stopAutoTitration();
      feedback('Color change observed! Record your final reading.');

      const nextEmpty = getNextEmptyFinalCol();
      const trialLabel = TRIAL_LABELS[nextEmpty ?? ''] || String(nextEmpty);
      const isRough = nextEmpty === 'rough';
      highlightNextFinalCol(nextEmpty);
      setActiveTrial(nextEmpty);

      let instruction = `Endpoint reached!\n\n`;
      instruction += `IMPORTANT: This is your ${trialLabel} titration.\n`;
      instruction += `Record the final burette reading now in the highlighted "${trialLabel}" column.`;
      if (isRough) {
        instruction += ` This rough titration helps you estimate where the endpoint lies for the following accurate titrations.`;
      }
      instruction += `\n\nAfter recording the reading:\n1) Click Proceed\n2) Refill the burette\n3) Perform the next titration`;
      const remainingCols = COLS.filter((c) => c !== 'rough' && !(finalsRef.current[c] || '').trim());
      if (remainingCols.length > 0 && !isRough) {
        instruction += `\n\nYou still need to complete: ${remainingCols.map((c) => TRIAL_LABELS[c]).join(', ')}.`;
      } else if (remainingCols.length === 0 && !isRough) {
        instruction += `\n\nYou have collected all accurate titrations. Click Submit Readings when finished.`;
      }

      setDialog({
        title: 'Endpoint reached!',
        message: instruction,
        variant: 'titration',
        onProceed: () => {
          const val = (volRef.current || 50 - cumRef.current).toFixed(2);
          displayEndpointReading(val, nextEmpty);
          prepareForNextTrial();
        },
      });
    } else if (expRef.current.endpointReached) {
      setFlaskColor(endpointColor);
    } else {
      setFlaskColor(base);
    }

    if (atEndpoint) feedback('Approaching end point...');
  };

  const addDrop = (isAuto = false) => {
    if (currentStep !== 7) {
      feedback('Complete previous steps first!');
      return;
    }
    // In learning mode the Add Drop button toggles an automatic titration
    if (!isAuto && mode === 'learning') {
      if (autoTitrating) {
        stopAutoTitration();
        return;
      }
      addDrop(true);
      swirl();
      setAutoTitrating(true);
      return;
    }

    const newCum = +(cumRef.current + dropVolume).toFixed(2);
    setCumulativeDispensed(newCum);
    setCurrentVolume(Math.max(0, 50.0 - newCum));
    spawnDroplet(buretteColor || 'rgba(250, 204, 21, 0.9)', 'calc(28% + 16px)', 60);
    feedback(`Dispensed ${newCum.toFixed(2)} cm³`);
    updateFlaskColor(newCum);
  };

  const addDropRef = React.useRef(addDrop);
  addDropRef.current = addDrop;
  const swirlRef = React.useRef<() => void>(() => {});
  const endpointReachedRef = React.useRef(exp.endpointReached);
  endpointReachedRef.current = exp.endpointReached;
  const modeRef = React.useRef(mode);
  modeRef.current = mode;

  /* automatic titration loop (learning mode) */
  React.useEffect(() => {
    if (!autoTitrating) return;
    const iv = window.setInterval(() => {
      if (modeRef.current !== 'learning') {
        setAutoTitrating(false);
        return;
      }
      if (endpointReachedRef.current) {
        setAutoTitrating(false);
        return;
      }
      addDropRef.current(true);
      swirlRef.current();
    }, AUTO_TITRATION_DELAY);
    return () => window.clearInterval(iv);
  }, [autoTitrating]);

  const swirl = () => {
    setFlaskRot(20);
    feedback('Mixing solution...');
    window.setTimeout(() => setFlaskRot(-20), 200);
    window.setTimeout(() => setFlaskRot(0), 400);
  };
  swirlRef.current = swirl;

  /* ------------------------- reagent selection ------------------------ */

  const selectTitrant = (value: string) => {
    if (!value) {
      setExp((e) => ({ ...e, titrantSelected: '', titrantAdded: false }));
      setBuretteColor('transparent');
      return;
    }
    setExp((e) => ({
      ...e,
      titrantSelected: value,
      titrantType: TITRANT_TYPES[value] || '',
      // original quirk kept: titrantAdded set only while on step 5
      titrantAdded: currentStep === 5 ? true : e.titrantAdded,
    }));
    setBuretteColor(TITRANT_COLORS[value] || 'rgba(250, 204, 21, 0.5)');
  };

  const selectIndicator = (value: string) => {
    if (exp.indicatorAdded) {
      feedback('Indicator is fixed for this setup and cannot be changed.');
      return;
    }
    if (!value) {
      setExp((e) => ({ ...e, indicatorSelected: '' }));
      return;
    }
    const tType =
      exp.titrantType || (exp.titrantSelected.includes('KMnO4') ? 'oxidizer' : '');
    const allowed = INDICATOR_COMPATIBILITY[value] || [];
    if (tType && !allowed.includes(tType)) {
      feedback(
        `${value} is not the best choice with the selected titrant (${exp.titrantSelected || 'unknown'}). Choose a compatible indicator (e.g. ${allowed.join(' or ') || 'KMnO4'}).`,
      );
      setExp((e) => ({ ...e, indicatorSelected: '' }));
      return;
    }
    const setupKey =
      exp.titrantSelected === 'KMnO4' ? 'KMnO4 + none' : `${exp.titrantSelected} + ${value}`;
    setEndpointVolume(SETUP_ENDPOINTS[setupKey] || 24.8);
    setExp((e) => ({ ...e, indicatorSelected: value, endpointReached: false }));
  };

  const selectAnalyte = (value: string) => {
    setExp((e) => ({ ...e, analyteSelected: value }));
  };

  /* ------------------------- trials & readings ------------------------ */

  const prepareForNextTrial = () => {
    setCumulativeDispensed(0.0);
    setExp((e) => ({ ...e, endpointReached: false }));

    const next = getNextEmptyFinalCol();
    if (!next) {
      setExp((e) => ({ ...e, trialsCompleted: true }));
      feedback(
        'All titrations completed (Rough, 1st, 2nd, 3rd). Controls disabled — click Submit Readings to compute volumes and average.',
      );
      highlightNextFinalCol(null);
      setActiveTrial(null);
      moveToStep(7);
      return;
    }

    // re-enable controls needed for the next titration
    setExp((e) => ({
      ...e,
      buretteFilled: false,
      titrantAdded: false,
      analyteAdded: false,
      indicatorAdded: false,
    }));
    highlightNextFinalCol(next);
    setActiveTrial(next);
    feedback(
      'Prepared for the next trial: refill the burette and measure fresh analyte before performing the next titration. Record the final reading in the highlighted column.',
    );
    moveToStep(4);
  };

  const onFinalChange = (col: Col, value: string) => {
    const next = { ...finals, [col]: value };
    setFinals(next);
    finalsRef.current = next;
    computeUsed(col, value, initials[col]);
    // when all trials recorded, show the column instructions
    const allFilled = COLS.every((c) => (next[c] || '').trim() !== '');
    if (allFilled) {
      setDialog({
        title: 'Step completed',
        message: `You have final readings for Rough, 1st, 2nd and 3rd titrations.

Please enter the corresponding INITIAL and FINAL burette readings for each trial:
- Initial volume: the reading on the burette BEFORE you start the titration (record to 2 d.p.).
- Final volume: the reading AFTER the colour change is observed and titration stopped (record to 2 d.p.).
- Volume used: Final - Initial (the simulator will compute this when you click Submit Readings).

Column guidance:
- Rough: a preliminary titration to estimate the endpoint (coarse). Record its initial and final readings here.
- 1st Reading, 2nd Reading, 3rd Reading: perform accurate titrations — take care with dropwise addition near the endpoint. These three are used to compute the average (ignore Rough for average).

When you have entered the INITIAL and FINAL readings for each column, click "Submit Readings" to compute the volumes used and the average.`,
      });
    }
    setActiveTrial(getNextEmptyFinalCol(next));
  };

  const onInitialChange = (col: Col, value: string) => {
    const next = { ...initials, [col]: value };
    setInitials(next);
    computeUsed(col, finals[col], value);
  };

  const submitReadings = () => {
    const nextUsed = { ...used };
    COLS.forEach((col) => {
      const iVal = parseFloat(initials[col]);
      const fVal = parseFloat(finals[col]);
      nextUsed[col] =
        !Number.isNaN(iVal) && !Number.isNaN(fVal) ? (fVal - iVal).toFixed(2) : '';
    });
    setUsed(nextUsed);
    computeAverage(nextUsed);
    setSnack('Readings submitted. Average computed from 1st-3rd readings.');
  };

  /* --------------------------- practice mode -------------------------- */

  const loadWaecQuestion = (y: string) => {
    const question = WAEC_QUESTIONS[y];
    if (!question) return;
    setYear(y);
    setEndpointVolume(QUESTION_ENDPOINTS[y] || 24.8);
    // load any saved answers for this year
    try {
      const raw = window.localStorage.getItem(`waec_answers_${y}`);
      if (raw) {
        const payload = JSON.parse(raw);
        const next: Record<string, string> = {};
        if (payload && payload.answers) {
          Object.keys(payload.answers).forEach((k) => {
            next[`${y}-${k}`] = payload.answers[k] || '';
          });
          setAnswers(next);
          setAnswersStatus(`Loaded saved answers (${new Date(payload.savedAt).toLocaleString()}).`);
        } else {
          setAnswers({});
          setAnswersStatus('No saved answers found.');
        }
      } else {
        setAnswers({});
        setAnswersStatus('No saved answers for this year.');
      }
    } catch {
      setAnswers({});
      setAnswersStatus('Failed to load saved answers.');
    }
  };

  const saveAnswers = () => {
    const question = WAEC_QUESTIONS[year];
    if (!question) return;
    const payload: { year: string; savedAt: number; answers: Record<string, string> } = {
      year,
      savedAt: Date.now(),
      answers: {},
    };
    question.requirements.forEach((_, i) => {
      payload.answers[i] = answers[`${year}-${i}`] ?? '';
    });
    try {
      window.localStorage.setItem(`waec_answers_${year}`, JSON.stringify(payload));
      setAnswersStatus('Answers saved locally.');
    } catch {
      setAnswersStatus('Failed to save answers (storage error).');
    }
  };

  const submitAnswers = () => {
    saveAnswers();
    try {
      window.localStorage.setItem(`waec_answers_${year}_submitted`, '1');
      setAnswersStatus('Answers submitted (saved locally).');
    } catch {
      setAnswersStatus('Failed to submit answers.');
    }
  };

  /* ---------------------------- mode switch --------------------------- */

  const resetSimulator = () => {
    setAutoTitrating(false);
    setCurrentStep(1);
    setGlasswareCleaned({ burette: false, pipette: false, flask: false });
    setCleanedNotes({});
    setExp(initialExp());
    setCurrentVolume(50.0);
    setCumulativeDispensed(0.0);
    setFinals({ rough: '', '1': '', '2': '', '3': '' });
    setUsed({ rough: '', '1': '', '2': '', '3': '' });
    setAvgVolume('');
    setBuretteColor('transparent');
    setFlaskColor('transparent');
    setDroplets([]);
    setEndpointDisplay(null);
    setHighlightCol(null);
  };

  const switchMode = (next: 'learning' | 'practice') => {
    if (next === mode) return;
    setMode(next);
    resetSimulator();
    if (next === 'learning') {
      setActiveTrial('rough');
      moveToStep(1);
      setTimerRunning(false);
    } else {
      loadWaecQuestion(year);
      resetTimer();
    }
  };

  /* ---------------------------- calculators --------------------------- */

  const calculateMolarity = () => {
    const g = parseFloat(gpl);
    const m = parseFloat(mmass);
    if (Number.isNaN(g) || Number.isNaN(m)) {
      setMolarityResult(<Typography variant="body2" sx={{ color: '#dc2626' }}>Please enter valid numbers</Typography>);
      return;
    }
    if (m <= 0) {
      setMolarityResult(<Typography variant="body2" sx={{ color: '#dc2626' }}>Molar mass must be greater than zero</Typography>);
      return;
    }
    const molarity = g / m;
    setMolarityResult(
      calcResultBox({
        main: `Molarity = ${molarity.toFixed(3)} mol dm⁻³`,
        sub: 'Formula: Molarity = g dm⁻³ ÷ Molar mass',
      }),
    );
  };

  const calculatePurity = () => {
    const a = parseFloat(actualMass);
    const t = parseFloat(theoreticalMass);
    if (Number.isNaN(a) || Number.isNaN(t)) {
      setPurityResult(<Typography variant="body2" sx={{ color: '#dc2626' }}>Please enter valid numbers</Typography>);
      return;
    }
    if (t <= 0) {
      setPurityResult(<Typography variant="body2" sx={{ color: '#dc2626' }}>Theoretical mass must be greater than zero</Typography>);
      return;
    }
    const purity = (a / t) * 100;
    setPurityResult(
      calcResultBox({
        main: `Percentage purity = ${purity.toFixed(2)}%`,
        sub: 'Formula: % purity = (Actual mass ÷ Theoretical mass) × 100',
      }),
    );
  };

  const calculateMoles = () => {
    const c = parseFloat(concIn);
    const v = parseFloat(volIn);
    if (Number.isNaN(c) || Number.isNaN(v)) {
      setMolesResult(<Typography variant="body2" sx={{ color: '#dc2626' }}>Please enter valid numbers</Typography>);
      return;
    }
    if (c < 0 || v < 0) {
      setMolesResult(<Typography variant="body2" sx={{ color: '#dc2626' }}>Values cannot be negative</Typography>);
      return;
    }
    const moles = c * (v / 1000);
    setMolesResult(
      calcResultBox({
        main: `Number of moles = ${moles.toFixed(4)} mol`,
        sub: 'Formula: Moles = Molarity × (Volume in cm³ ÷ 1000)',
      }),
    );
  };

  const addElementToFormula = () => {
    if (!elementSel) return;
    const mass = ELEMENT_MASSES[elementSel];
    setFormula((f) => [...f, { element: elementSel, mass, atoms: atomsIn || 1 }]);
    setMassResult(null);
  };

  const calculateMolarMass = () => {
    if (formula.length === 0) {
      setMassResult(<Typography variant="body2" sx={{ color: '#dc2626' }}>Please add elements first</Typography>);
      return;
    }
    const total = formula.reduce((sum, { mass, atoms }) => sum + mass * atoms, 0);
    setMassResult(
      calcResultBox({
        main: `Molar mass = ${total.toFixed(1)} g mol⁻¹`,
        sub: `Calculation: ${formula.map(({ element, mass, atoms }) => `${element} (${mass} × ${atoms})`).join(' + ')}`,
      }),
    );
  };

  /* ------------------------------ render ------------------------------ */

  const question = WAEC_QUESTIONS[year];
  const actionDisabled = exp.trialsCompleted;
  const meniscusTop = ((50 - currentVolume) / 50) * 100;
  const buretteFillPct = (currentVolume / 50) * 100;

  const actionButton = (
    key: string,
    label: string,
    onClick: () => void,
    color: string,
    done: boolean,
    doneLabel: string,
    disabledExtra = false,
  ) => (
    <Button
      key={key}
      onClick={onClick}
      disabled={done || disabledExtra || actionDisabled}
      variant="contained"
      size="small"
      sx={{
        width: '100%',
        backgroundColor: done ? '#22c55e' : color,
        '&:hover': { backgroundColor: done ? '#16a34a' : color },
        '&.Mui-disabled': { backgroundColor: '#d1d5db', color: '#6b7280' },
      }}
    >
      {done ? doneLabel : label}
    </Button>
  );

  const readingCell = (col: Col, kind: 'final' | 'initial' | 'used') => {
    const value = kind === 'final' ? finals[col] : kind === 'initial' ? initials[col] : used[col];
    const highlight = kind === 'final' && highlightCol === col;
    return (
      <Box
        sx={
          highlight
            ? { boxShadow: '0 0 0 4px rgba(250, 204, 21, 0.45)', borderRadius: 1 }
            : undefined
        }
      >
        <TextField
          value={value}
          onChange={(e) => {
            const v = e.target.value;
            if (kind === 'final') onFinalChange(col, v);
            else if (kind === 'initial') onInitialChange(col, v);
          }}
          placeholder="-"
          size="small"
          fullWidth
          slotProps={kind === 'used' ? { input: { readOnly: true } } : undefined}
          sx={{
            backgroundColor: kind === 'used' ? '#f8fafc' : 'transparent',
            '& .MuiInputBase-input': { py: 0.5, fontSize: '0.85rem' },
          }}
        />
      </Box>
    );
  };

  return (
    <PracticalsGlobalStyles>
      <Box sx={{ p: { xs: 1, md: 2 }, backgroundColor: '#f3f4f6', minHeight: '100vh' }}>
        <Box sx={{ maxWidth: 1280, mx: 'auto' }}>
          {/* ------------- Header with Calculator ------------- */}
          <Paper
            elevation={3}
            sx={{
              p: 2,
              mb: 3,
              borderRadius: '10px',
              color: '#fff',
              background: 'linear-gradient(90deg, #0d9488 0%, #2563eb 100%)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 2,
              flexWrap: 'wrap',
            }}
          >
            <Box>
              <Typography variant="h5" component="h1" sx={{ fontWeight: 700, color: '#fff' }}>
                WAEC Chemistry Practical - Titration
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                Master titration techniques with interactive simulation and real WAEC questions
              </Typography>
            </Box>
            <Button
              onClick={(e) => {
                setCalcAnchor(e.currentTarget);
                setCalcOpen(true);
              }}
              startIcon={<CalculateIcon />}
              sx={{
                backgroundColor: '#fff',
                color: '#2563eb',
                fontWeight: 600,
                whiteSpace: 'nowrap',
                '&:hover': { backgroundColor: '#f1f5f9' },
              }}
            >
              Calculator
            </Button>
          </Paper>

          {/* ------------- Calculation helper popover ------------- */}
          <CalcPopover
            open={calcOpen}
            anchor={calcAnchor}
            onClose={() => setCalcOpen(false)}
            mui={
              <>
                {/* Molarity */}
                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                  Molarity Calculator
                </Typography>
                <TextField
                  size="small"
                  fullWidth
                  type="number"
                  label="g/dm³"
                  value={gpl}
                  onChange={(e) => setGpl(e.target.value)}
                  sx={{ mb: 1 }}
                />
                <TextField
                  size="small"
                  fullWidth
                  type="number"
                  label="Molar mass"
                  value={mmass}
                  onChange={(e) => setMmass(e.target.value)}
                  sx={{ mb: 1 }}
                />
                <Button fullWidth variant="contained" onClick={calculateMolarity} sx={{ mb: 1 }}>
                  Calculate Molarity
                </Button>
                {molarityResult}
                <Divider sx={{ my: 2 }} />
                {/* Purity */}
                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                  Percentage Purity
                </Typography>
                <TextField
                  size="small"
                  fullWidth
                  type="number"
                  label="Actual mass"
                  value={actualMass}
                  onChange={(e) => setActualMass(e.target.value)}
                  sx={{ mb: 1 }}
                />
                <TextField
                  size="small"
                  fullWidth
                  type="number"
                  label="Theoretical mass"
                  value={theoreticalMass}
                  onChange={(e) => setTheoreticalMass(e.target.value)}
                  sx={{ mb: 1 }}
                />
                <Button fullWidth variant="contained" onClick={calculatePurity} sx={{ mb: 1 }}>
                  Calculate Purity
                </Button>
                {purityResult}
                <Divider sx={{ my: 2 }} />
                {/* Moles */}
                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                  Number of Moles
                </Typography>
                <TextField
                  size="small"
                  fullWidth
                  type="number"
                  label="Molarity"
                  value={concIn}
                  onChange={(e) => setConcIn(e.target.value)}
                  sx={{ mb: 1 }}
                />
                <TextField
                  size="small"
                  fullWidth
                  type="number"
                  label="Volume (cm³)"
                  value={volIn}
                  onChange={(e) => setVolIn(e.target.value)}
                  sx={{ mb: 1 }}
                />
                <Button fullWidth variant="contained" onClick={calculateMoles} sx={{ mb: 1 }}>
                  Calculate Moles
                </Button>
                {molesResult}
                <Divider sx={{ my: 2 }} />
                {/* Molar mass */}
                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                  Molar Mass Calculator
                </Typography>
                <Select
                  size="small"
                  fullWidth
                  displayEmpty
                  value={elementSel}
                  onChange={(e) => setElementSel(e.target.value as string)}
                  sx={{ mb: 1 }}
                  renderValue={(v) => (v ? String(v) : 'Select element')}
                >
                  <MenuItem value="" disabled>
                    Select element
                  </MenuItem>
                  {Object.entries(ELEMENT_MASSES).map(([el, mass]) => (
                    <MenuItem key={el} value={el}>
                      {el} ({mass})
                    </MenuItem>
                  ))}
                </Select>
                <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                  <TextField
                    size="small"
                    type="number"
                    label="# atoms"
                    value={atomsIn}
                    onChange={(e) => setAtomsIn(parseInt(e.target.value, 10) || 1)}
                    sx={{ flex: 1 }}
                  />
                  <Button variant="contained" color="success" onClick={addElementToFormula}>
                    Add
                  </Button>
                </Box>
                <Box
                  sx={{
                    p: 1,
                    border: '1px solid #e5e7eb',
                    borderRadius: 1,
                    minHeight: 40,
                    backgroundColor: '#f8fafc',
                    mb: 1,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  {formula.length === 0 ? (
                    <Typography variant="caption" sx={{ color: '#9ca3af' }}>
                      Add elements to calculate molar mass
                    </Typography>
                  ) : (
                    <Typography variant="body1">
                      {formula.map(({ element, atoms }, i) => (
                        <span key={`${element}-${i}`}>
                          {element}
                          {atoms > 1 ? <sub>{atoms}</sub> : null}
                        </span>
                      ))}
                    </Typography>
                  )}
                  {formula.length > 0 ? (
                    <Button size="small" color="error" onClick={() => setFormula([])}>
                      Clear
                    </Button>
                  ) : null}
                </Box>
                <Button fullWidth variant="contained" onClick={calculateMolarMass} sx={{ mb: 1 }}>
                  Calculate Molar Mass
                </Button>
                {massResult}
              </>
            }
          />

          {/* ------------- Mode selector ------------- */}
          <Paper elevation={1} sx={{ p: 2, mb: 3 }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 2,
                flexDirection: { xs: 'column', sm: 'row' },
              }}
            >
              <Button
                onClick={() => switchMode('learning')}
                sx={{
                  px: 3,
                  py: 1.5,
                  borderRadius: '10px',
                  color: '#fff',
                  backgroundColor: mode === 'learning' ? '#0d9488' : '#4b5563',
                  boxShadow: mode === 'learning' ? '0 0 0 3px rgba(13,148,136,0.3)' : 'none',
                  '&:hover': { backgroundColor: mode === 'learning' ? '#0f766e' : '#374151' },
                  display: 'block',
                }}
              >
                Learning Mode
                <Typography variant="caption" component="div" sx={{ opacity: 0.8 }}>
                  Step-by-step tutorial with guidance
                </Typography>
              </Button>
              <Button
                onClick={() => switchMode('practice')}
                sx={{
                  px: 3,
                  py: 1.5,
                  borderRadius: '10px',
                  color: '#fff',
                  backgroundColor: mode === 'practice' ? '#0d9488' : '#4b5563',
                  boxShadow: mode === 'practice' ? '0 0 0 3px rgba(13,148,136,0.3)' : 'none',
                  '&:hover': { backgroundColor: mode === 'practice' ? '#0f766e' : '#374151' },
                  display: 'block',
                }}
              >
                Practice Mode
                <Typography variant="caption" component="div" sx={{ opacity: 0.8 }}>
                  Real WAEC practical questions
                </Typography>
              </Button>
            </Box>
            <Typography variant="body2" sx={{ mt: 2, textAlign: 'center', color: '#4b5563' }}>
              {modeDescription}
            </Typography>
          </Paper>

          {/* ------------- Practice mode question bank ------------- */}
          {mode === 'practice' ? (
            <Paper elevation={1} sx={{ p: 3, mb: 3 }}>
              {/* Exam timer */}
              <Paper
                variant="outlined"
                sx={{ p: 2, mb: 3, borderColor: '#fde68a', backgroundColor: '#fffbeb' }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: 1,
                  }}
                >
                  <Box>
                    <Typography component="span" sx={{ fontWeight: 600 }}>
                      Time Remaining:
                    </Typography>
                    <Typography
                      component="span"
                      sx={{ ml: 1, fontFamily: 'monospace', fontWeight: 700 }}
                    >
                      {formatTime(remaining)}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button
                      size="small"
                      variant="contained"
                      color="success"
                      disabled={timerRunning}
                      onClick={() => setTimerRunning(true)}
                    >
                      Start
                    </Button>
                    <Button
                      size="small"
                      variant="contained"
                      color="warning"
                      disabled={!timerRunning}
                      onClick={() => setTimerRunning(false)}
                    >
                      Pause
                    </Button>
                    <Button
                      size="small"
                      variant="contained"
                      color="error"
                      onClick={resetTimer}
                    >
                      Reset
                    </Button>
                  </Box>
                </Box>
                <Typography variant="caption" sx={{ color: '#6b7280', display: 'block', mt: 1 }}>
                  Standard WAEC practical duration: 2 hours 45 minutes
                </Typography>
              </Paper>

              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, flexWrap: 'wrap', gap: 1 }}>
                <Typography variant="h6">WAEC Chemistry Practical Question</Typography>
                <Select
                  size="small"
                  value={year}
                  onChange={(e) => loadWaecQuestion(e.target.value as string)}
                  sx={{ minWidth: 200 }}
                >
                  {Object.keys(WAEC_QUESTIONS)
                    .sort((a, b) => Number(b) - Number(a))
                    .map((y) => (
                      <MenuItem key={y} value={y}>
                        WASSCE June {y}
                      </MenuItem>
                    ))}
                </Select>
              </Box>

              {question ? (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Paper
                    variant="outlined"
                    sx={{ p: 2, backgroundColor: '#eff6ff', borderColor: '#dbeafe' }}
                  >
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      <strong>Given:</strong>
                    </Typography>
                    <Typography variant="body2">{question.given}</Typography>
                    {question.data ? (
                      <Typography
                        variant="caption"
                        component="div"
                        sx={{ mt: 1, fontFamily: 'monospace', color: '#475569' }}
                      >
                        Given:{' '}
                        {Object.entries(question.data)
                          .map(([k, v]) => `${k} = ${v}`)
                          .join(', ')}
                      </Typography>
                    ) : null}
                  </Paper>

                  <Box>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      <strong>Requirements:</strong>
                    </Typography>
                    <ol style={{ margin: 0, paddingLeft: 24 }}>
                      {question.requirements.map((req, i) => (
                        <li key={i}>
                          <Typography variant="body2" component="span">
                            {req}
                          </Typography>
                        </li>
                      ))}
                    </ol>
                  </Box>

                  <Box>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      <strong>Reaction:</strong>
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        p: 1.5,
                        backgroundColor: '#f8fafc',
                        borderRadius: 1,
                        fontFamily: 'monospace',
                      }}
                    >
                      {question.reaction}
                    </Typography>
                  </Box>

                  {/* Student answer form */}
                  <Paper variant="outlined" sx={{ p: 2 }}>
                    <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 600 }}>
                      Your Answers
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                      {question.requirements.map((req, i) => (
                        <Box key={i}>
                          <Typography variant="body2" sx={{ fontWeight: 500, mb: 0.5 }}>
                            {i + 1}. {req}
                          </Typography>
                          <TextField
                            multiline
                            rows={3}
                            fullWidth
                            placeholder="Type your answer here..."
                            value={answers[`${year}-${i}`] ?? ''}
                            onChange={(e) =>
                              setAnswers((a) => ({ ...a, [`${year}-${i}`]: e.target.value }))
                            }
                          />
                        </Box>
                      ))}
                    </Box>
                    <Box sx={{ mt: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                      <Button variant="contained" onClick={saveAnswers}>
                        Save Answers
                      </Button>
                      <Button variant="contained" color="success" onClick={submitAnswers}>
                        Submit Answers
                      </Button>
                      <Button
                        variant="contained"
                        color="inherit"
                        onClick={() => loadWaecQuestion(year)}
                      >
                        Load Saved
                      </Button>
                    </Box>
                    {answersStatus ? (
                      <Typography variant="caption" sx={{ display: 'block', mt: 1, color: '#6b7280' }}>
                        {answersStatus}
                      </Typography>
                    ) : null}
                  </Paper>

                  <Paper
                    variant="outlined"
                    sx={{ p: 2, backgroundColor: '#fefce8', borderColor: '#fde68a' }}
                  >
                    <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
                      Important Notes:
                    </Typography>
                    <ul style={{ margin: 0, paddingLeft: 20 }}>
                      <li>Record all burette readings to 2 decimal places</li>
                      <li>Record your pipette volume</li>
                      <li>Perform one rough and three accurate titrations</li>
                      <li>Show all calculations in your answer book</li>
                    </ul>
                  </Paper>
                </Box>
              ) : null}
            </Paper>
          ) : null}

          {/* ------------- Procedure steps (learning mode) ------------- */}
          {mode === 'learning' ? (
            <Box sx={{ mb: 3 }}>
              <Paper elevation={1} sx={{ p: 2 }}>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Procedure Steps
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    gap: 1,
                    alignItems: 'center',
                    overflowX: 'auto',
                    py: 0.5,
                  }}
                >
                  {PROCEDURE_STEPS.map((label, i) => {
                    const stepNo = i + 1;
                    const active = currentStep === stepNo;
                    return (
                      <Box
                        key={stepNo}
                        component="button"
                        onClick={() => moveToStep(stepNo)}
                        sx={{
                          whiteSpace: 'nowrap',
                          px: 1.5,
                          py: 0.75,
                          borderRadius: 999,
                          border: '1px solid',
                          borderColor: active ? '#059669' : '#f59e0b',
                          backgroundColor: active ? '#d1fae5' : '#fef3c7',
                          color: active ? '#065f46' : '#92400e',
                          fontWeight: 600,
                          fontSize: '0.95rem',
                          flex: '0 0 auto',
                          cursor: 'pointer',
                          boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
                          transition: 'transform 120ms ease-out',
                          '&:hover': { transform: 'translateY(-2px)' },
                        }}
                      >
                        {label}
                      </Box>
                    );
                  })}
                </Box>

                {/* Step-by-step guide */}
                <Box
                  ref={guideRef}
                  sx={{
                    mt: 2,
                    p: 2,
                    borderRadius: '8px',
                    fontSize: '0.95rem',
                    color: '#0f172a',
                    background: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)',
                    border: '1px solid rgba(15, 23, 42, 0.04)',
                    boxShadow: guideFlash ? '0 0 0 4px rgba(16,185,129,0.25)' : 'none',
                    transition: 'box-shadow 0.3s',
                  }}
                >
                  <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 600 }}>
                    Step-by-step guide — how to use the simulator
                  </Typography>
                  <Box
                    dangerouslySetInnerHTML={{
                      __html:
                        PROCEDURE_DETAILS[currentStep] ||
                        '<em>No details available for this step.</em>',
                    }}
                  />
                  <Box sx={{ mt: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    <Button size="small" variant="contained" onClick={() => moveToStep(1)}>
                      Show Step 1
                    </Button>
                    <Button size="small" variant="contained" color="inherit" onClick={() => moveToStep(7)}>
                      Jump to Titration
                    </Button>
                  </Box>
                  <Box sx={{ mt: 2 }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={autoAdvance}
                          onChange={(e) => {
                            setAutoAdvance(e.target.checked);
                            savePref('sim_auto_advance_steps', e.target.checked);
                          }}
                        />
                      }
                      label={
                        <Typography variant="body2">
                          Auto-advance steps when completed (show confirmation popup)
                        </Typography>
                      }
                    />
                    <Typography variant="caption" sx={{ color: '#9ca3af', display: 'block' }}>
                      When enabled, the guide will show a confirmation popup and then advance the
                      guide. To skip the popup entirely, enable &quot;Auto-proceed&quot; below.
                    </Typography>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={skipPopup}
                          onChange={(e) => {
                            setSkipPopup(e.target.checked);
                            savePref('sim_auto_proceed_immediate', e.target.checked);
                          }}
                        />
                      }
                      label={
                        <Typography variant="body2">
                          Auto-proceed (skip confirmation popup)
                        </Typography>
                      }
                    />
                    <Typography variant="caption" sx={{ color: '#9ca3af', display: 'block' }}>
                      When enabled, the simulator will immediately proceed to the next step and
                      auto-trigger the recommended action.
                    </Typography>
                  </Box>
                </Box>
              </Paper>
            </Box>
          ) : null}

          {/* ------------- Simulation grid ------------- */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' },
              gap: 3,
            }}
          >
            {/* Apparatus */}
            <Paper elevation={1} sx={{ p: 2 }}>
              <Box
                sx={{
                  position: 'relative',
                  minHeight: { xs: 380, md: 600 },
                  backgroundColor: '#f3f4f6',
                  borderRadius: '8px',
                  overflow: 'hidden',
                }}
              >
                {/* Stand */}
                <Box
                  sx={{
                    position: 'absolute',
                    left: '25%',
                    top: 0,
                    bottom: 0,
                    width: 32,
                    backgroundColor: '#374151',
                  }}
                />

                {/* Burette */}
                <Box
                  className={
                    rinsingItem === 'burette'
                      ? 'waecRinsing'
                      : cleaningItem === 'burette'
                        ? 'waecCleaning'
                        : undefined
                  }
                  sx={{
                    position: 'absolute',
                    left: '28%',
                    top: { xs: 30, md: 50 },
                    width: 40,
                    height: { xs: 300, md: 400 },
                    border: '2px solid #93c5fd',
                  }}
                >
                  <Box
                    className={filling ? 'waecFilling' : undefined}
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: `${buretteFillPct}%`,
                      backgroundColor: buretteColor,
                      transition: 'height 0.5s, background-color 0.5s',
                      transformOrigin: 'bottom',
                    }}
                  />
                  {/* meniscus */}
                  <Box
                    sx={{
                      position: 'absolute',
                      width: '100%',
                      height: 2,
                      backgroundColor: '#93c5fd',
                      top: `${meniscusTop}%`,
                      transition: 'top 0.5s',
                    }}
                  />
                  {/* reading scale */}
                  <Box
                    sx={{
                      position: 'absolute',
                      right: -26,
                      top: 0,
                      height: '100%',
                      width: 22,
                      fontSize: 11,
                      color: '#64748b',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                    }}
                  >
                    {[50, 45, 40, 35, 30, 25, 20, 15, 10, 5, 0].map((v) => (
                      <span key={v}>{v}</span>
                    ))}
                  </Box>
                </Box>

                {/* Pipette */}
                <Box
                  className={
                    rinsingItem === 'pipette'
                      ? 'waecRinsing'
                      : cleaningItem === 'pipette'
                        ? 'waecCleaning'
                        : undefined
                  }
                  sx={{
                    position: 'absolute',
                    left: '45%',
                    top: { xs: 110, md: 150 },
                    width: 20,
                    height: { xs: 240, md: 300 },
                    border: '2px solid #93c5fd',
                    transition: 'transform 0.4s',
                    transform: measuring ? 'translateX(50px)' : 'translateX(0)',
                  }}
                />

                {/* Conical flask */}
                <Box
                  className={cleaningItem === 'flask' ? 'waecCleaning' : undefined}
                  sx={{
                    position: 'absolute',
                    left: '28%',
                    bottom: { xs: 30, md: 50 },
                    width: { xs: 120, md: 150 },
                    height: { xs: 160, md: 200 },
                    border: '2px solid #93c5fd',
                    borderTop: 'none',
                    borderRadius: '0 0 75px 75px',
                    transition: 'transform 0.2s',
                    transform: `rotate(${flaskRot}deg)`,
                  }}
                >
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: 2,
                      left: 2,
                      right: 2,
                      height: { xs: 56, md: 80 },
                      backgroundColor: flaskColor,
                      borderRadius: '0 0 73px 73px',
                      transition: 'background-color 0.4s',
                    }}
                  />
                </Box>

                {/* Droplets */}
                {droplets.map((d) => (
                  <Box
                    key={d.id}
                    className="waecDroplet"
                    sx={{
                      position: 'absolute',
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      backgroundColor: d.color,
                      left: d.left,
                      top: d.top,
                      pointerEvents: 'none',
                    }}
                  />
                ))}

                {/* Working area */}
                <Box
                  sx={{
                    position: 'absolute',
                    right: 12,
                    top: 12,
                    width: 200,
                    backgroundColor: 'rgba(255,255,255,0.9)',
                    p: 1,
                    borderRadius: '6px',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                    fontSize: 13,
                  }}
                >
                  <Typography variant="caption" sx={{ fontWeight: 700 }}>
                    Working Area
                  </Typography>
                  <Box sx={{ mt: 1, fontSize: '0.8rem', color: '#374151' }}>
                    <div>
                      Titrant:{' '}
                      {exp.titrantSelected ? <strong>{exp.titrantSelected}</strong> : <em>None</em>}
                    </div>
                    <div>
                      Analyte:{' '}
                      {exp.analyteSelected ? <strong>{exp.analyteSelected}</strong> : <em>None</em>}
                    </div>
                    <div>
                      Indicator:{' '}
                      {exp.indicatorSelected ? (
                        <strong>{exp.indicatorSelected}</strong>
                      ) : (
                        <em>None</em>
                      )}
                    </div>
                  </Box>
                </Box>
              </Box>
            </Paper>

            {/* Controls + Readings */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Paper elevation={1} sx={{ p: 2 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                  Reagents
                </Typography>
                <InputLabel htmlFor="titrant-select" sx={{ fontSize: '0.85rem' }}>
                  Titrant
                </InputLabel>
                <Select
                  id="titrant-select"
                  size="small"
                  fullWidth
                  displayEmpty
                  value={exp.titrantSelected}
                  onChange={(e) => selectTitrant(e.target.value as string)}
                  sx={{ mb: 1.5 }}
                  renderValue={(v) => (v ? String(v) : '-- choose titrant --')}
                >
                  <MenuItem value="" disabled>
                    -- choose titrant --
                  </MenuItem>
                  <MenuItem disabled sx={{ fontWeight: 700, fontSize: '0.8rem', color: '#6b7280' }}>
                    Acids
                  </MenuItem>
                  {['HCl', 'H2SO4', 'HNO3', 'CH3COOH'].map((t) => (
                    <MenuItem key={t} value={t}>
                      {t} (0.1M)
                    </MenuItem>
                  ))}
                </Select>

                <InputLabel htmlFor="indicator-select" sx={{ fontSize: '0.85rem' }}>
                  Indicator
                </InputLabel>
                <Select
                  id="indicator-select"
                  size="small"
                  fullWidth
                  displayEmpty
                  value={exp.indicatorSelected}
                  disabled={exp.indicatorAdded}
                  onChange={(e) => selectIndicator(e.target.value as string)}
                  sx={{ mb: 1.5 }}
                  renderValue={(v) => (v ? String(v) : '-- choose indicator --')}
                >
                    <MenuItem value="" disabled>
                      -- choose indicator --
                    </MenuItem>
                    <MenuItem value="Phenolphthalein">Phenolphthalein</MenuItem>
                    <MenuItem value="Methyl orange">Methyl orange</MenuItem>
                    <MenuItem value="KMnO4 (self-indicating)">KMnO4 (self-indicating)</MenuItem>
                </Select>

                <InputLabel htmlFor="analyte-select" sx={{ fontSize: '0.85rem' }}>
                  Analyte (to pipette)
                </InputLabel>
                <Select
                  id="analyte-select"
                  size="small"
                  fullWidth
                  displayEmpty
                  value={exp.analyteSelected}
                  onChange={(e) => selectAnalyte(e.target.value as string)}
                  renderValue={(v) => (v ? String(v) : '-- choose analyte (base) --')}
                >
                  <MenuItem value="" disabled>
                    -- choose analyte (base) --
                  </MenuItem>
                  <MenuItem value="NaOH">NaOH (0.1M)</MenuItem>
                  <MenuItem value="KOH">KOH (0.1M)</MenuItem>
                  <MenuItem value="Ca(OH)2">Ca(OH)2 (0.1M)</MenuItem>
                </Select>

                <Typography variant="subtitle1" sx={{ fontWeight: 600, mt: 2, mb: 1 }}>
                  Actions
                </Typography>
                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: 1,
                  }}
                >
                  {actionButton(
                    'clean-burette',
                    'Clean Burette',
                    () => cleanGlassware('burette'),
                    '#3b82f6',
                    !!glasswareCleaned.burette,
                    '✓ Burette Cleaned',
                  )}
                  {actionButton(
                    'clean-pipette',
                    'Clean Pipette',
                    () => cleanGlassware('pipette'),
                    '#3b82f6',
                    !!glasswareCleaned.pipette,
                    '✓ Pipette Cleaned',
                  )}
                  {actionButton(
                    'clean-flask',
                    'Clean Flask',
                    () => cleanGlassware('flask'),
                    '#3b82f6',
                    !!glasswareCleaned.flask,
                    '✓ Flask Cleaned',
                  )}
                  {actionButton(
                    'rinse-burette',
                    'Rinse Burette',
                    rinseBurette,
                    '#eab308',
                    exp.buretteRinsed,
                    '✓ Burette Rinsed',
                  )}
                  {actionButton(
                    'rinse-pipette',
                    'Rinse Pipette',
                    rinsePipette,
                    '#a855f7',
                    exp.pipetteRinsed,
                    '✓ Pipette Rinsed',
                  )}
                  {actionButton(
                    'fill-burette',
                    'Fill Burette',
                    fillBurette,
                    '#ca8a04',
                    exp.buretteFilled,
                    '✓ Burette Filled',
                  )}
                  {actionButton(
                    'measure-analyte',
                    'Measure 25cm³',
                    measureAnalyte,
                    '#9333ea',
                    exp.analyteAdded,
                    '✓ Analyte Measured',
                  )}
                  {actionButton(
                    'add-indicator',
                    'Add Indicator',
                    addIndicator,
                    '#ec4899',
                    exp.indicatorAdded,
                    '✓ Indicator Added',
                  )}
                  <Button
                    onClick={() => addDrop()}
                    disabled={actionDisabled}
                    variant="contained"
                    size="small"
                    sx={{
                      width: '100%',
                      backgroundColor: autoTitrating ? '#dc2626' : '#22c55e',
                      '&:hover': {
                        backgroundColor: autoTitrating ? '#b91c1c' : '#16a34a',
                      },
                      '&.Mui-disabled': { backgroundColor: '#d1d5db', color: '#6b7280' },
                    }}
                  >
                    {autoTitrating ? 'Stop Auto' : 'Add Drop'}
                  </Button>
                  <Button
                    onClick={swirl}
                    disabled={autoTitrating || actionDisabled}
                    variant="contained"
                    size="small"
                    sx={{
                      width: '100%',
                      backgroundColor: '#6366f1',
                      '&:hover': { backgroundColor: '#4f46e5' },
                      '&.Mui-disabled': { backgroundColor: '#d1d5db', color: '#6b7280' },
                    }}
                  >
                    Swirl Flask
                  </Button>
                </Box>

                {/* cleaned notes */}
                {Object.entries(cleanedNotes).map(([item, note]) => (
                  <Typography
                    key={item}
                    variant="caption"
                    sx={{ display: 'block', mt: 0.5, color: '#6b7280', fontStyle: 'italic' }}
                  >
                    {note}
                  </Typography>
                ))}

                {/* Simulation controls (bound in the original JS) */}
                <Divider sx={{ my: 2 }} />
                <Typography variant="caption" sx={{ color: '#6b7280' }}>
                  Simulation settings
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, mt: 0.5 }}>
                  <TextField
                    label="Drop volume (cm³)"
                    type="number"
                    size="small"
                    value={dropVolume}
                    onChange={(e) => {
                      const v = parseFloat(e.target.value);
                      if (!Number.isNaN(v) && v > 0) setDropVolume(v);
                    }}
                    fullWidth
                  />
                  <TextField
                    label="Endpoint volume (cm³)"
                    type="number"
                    size="small"
                    value={endpointVolume}
                    onChange={(e) => {
                      const v = parseFloat(e.target.value);
                      if (!Number.isNaN(v) && v > 0) setEndpointVolume(v);
                    }}
                    fullWidth
                  />
                </Box>
              </Paper>

              {/* Readings */}
              <Paper elevation={1} sx={{ p: 2 }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    mb: 1.5,
                    p: 1,
                    borderRadius: 1,
                    border: '1px solid',
                    borderColor: activeTrial === 'rough' ? '#f59e0b' : '#10b981',
                    backgroundColor: activeTrial === 'rough' ? '#fff7ed' : '#ecfeff',
                  }}
                >
                  <Typography variant="body2" sx={{ fontWeight: 600, color: '#92400e' }}>
                    Active trial:
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 700, color: '#065f46' }}>
                    {activeTrial ? TRIAL_LABELS[activeTrial] : '—'}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{ ml: 'auto', color: '#6b7280' }}
                  >
                    {activeTrial === 'rough'
                      ? 'Fill Rough first, then 1st → 2nd → 3rd'
                      : activeTrial
                        ? 'Perform this accurate titration and record the final reading'
                        : ''}
                  </Typography>
                </Box>

                {endpointDisplay ? (
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      mb: 1.5,
                      p: 1,
                      borderRadius: 1,
                      border: '1px solid #e5e7eb',
                      backgroundColor: '#fff',
                    }}
                  >
                    <Typography variant="body2" sx={{ flex: 1 }}>
                      <strong>Endpoint ({endpointDisplay.label}):</strong>{' '}
                      <span style={{ fontFamily: 'monospace' }}>{endpointDisplay.value} cm³</span>
                    </Typography>
                    <Button
                      size="small"
                      aria-label="Dismiss endpoint"
                      onClick={() => setEndpointDisplay(null)}
                      startIcon={<CloseIcon />}
                    >
                      Dismiss
                    </Button>
                  </Box>
                ) : null}

                <Typography variant="h6" sx={{ mb: 1 }}>
                  Burette Readings
                </Typography>
                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      <TableRow sx={{ backgroundColor: '#f9fafb' }}>
                        <TableCell sx={{ border: '1px solid #e5e7eb' }}>&nbsp;</TableCell>
                        {COLS.map((c) => (
                          <TableCell
                            key={c}
                            align="center"
                            sx={{ border: '1px solid #e5e7eb', fontSize: '0.8rem' }}
                          >
                            {TRIAL_LABELS[c]}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell sx={{ border: '1px solid #e5e7eb', fontWeight: 500 }}>
                          Final volume
                        </TableCell>
                        {COLS.map((c) => (
                          <TableCell key={c} sx={{ border: '1px solid #e5e7eb', p: 0.5 }}>
                            {readingCell(c, 'final')}
                          </TableCell>
                        ))}
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ border: '1px solid #e5e7eb', fontWeight: 500 }}>
                          Initial volume
                        </TableCell>
                        {COLS.map((c) => (
                          <TableCell key={c} sx={{ border: '1px solid #e5e7eb', p: 0.5 }}>
                            {readingCell(c, 'initial')}
                          </TableCell>
                        ))}
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ border: '1px solid #e5e7eb', fontWeight: 500 }}>
                          Volume A used
                        </TableCell>
                        {COLS.map((c) => (
                          <TableCell key={c} sx={{ border: '1px solid #e5e7eb', p: 0.5 }}>
                            {readingCell(c, 'used')}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>

                <Button
                  fullWidth
                  variant="contained"
                  color="success"
                  onClick={submitReadings}
                  sx={{ mt: 2 }}
                >
                  Submit Readings
                </Button>
                {avgVolume ? (
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    Average volume used: <strong>{avgVolume} cm³</strong>
                  </Typography>
                ) : null}
              </Paper>
            </Box>
          </Box>

          {/* Current task line (original #current-task element) */}
          <Typography variant="body2" sx={{ mt: 2, color: '#64748b' }}>
            Current task: {STEP_TASKS[currentStep - 1]}
          </Typography>
        </Box>
      </Box>

      {/* --------------------------- dialogs --------------------------- */}
      <Dialog
        open={dialog !== null}
        onClose={() => setDialog(null)}
        aria-live="polite"
        PaperProps={{
          sx:
            dialog?.variant === 'titration'
              ? {
                  borderTop: '4px solid #dc2626',
                  backgroundColor: '#fff5f5',
                }
              : undefined,
        }}
      >
        <DialogTitle sx={dialog?.variant === 'titration' ? { color: '#b91c1c' } : undefined}>
          {dialog?.variant === 'titration' ? 'Action required' : dialog?.title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ whiteSpace: 'pre-line', color: dialog?.variant === 'titration' ? '#7f1d1d' : undefined }}>
            {dialog?.message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialog(null)}>Close</Button>
          <Button
            variant="contained"
            color={dialog?.variant === 'titration' ? 'error' : 'success'}
            onClick={() => {
              const proceed = dialog?.onProceed;
              setDialog(null);
              proceed?.();
            }}
          >
            Proceed
          </Button>
        </DialogActions>
      </Dialog>

      {/* exam timer alerts */}
      <Dialog open={timerDialog !== null} onClose={() => setTimerDialog(null)}>
        <DialogTitle>Exam timer</DialogTitle>
        <DialogContent>
          <DialogContentText>{timerDialog}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={() => setTimerDialog(null)}>
            OK
          </Button>
        </DialogActions>
      </Dialog>

      {/* feedback snackbar (replaces the original floating feedback popups) */}
      <Snackbar
        open={snack !== null}
        autoHideDuration={2200}
        onClose={(_e, reason) => {
          if (reason !== 'clickaway') setSnack(null);
        }}
        message={snack ?? ''}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />

      {/* Cortex AI floating chat (ported from the original page) */}
      <CortexAIWidget />
    </PracticalsGlobalStyles>
  );
}

/* ------------------------------- styles -------------------------------- */

function PracticalsGlobalStyles({ children }: { children: React.ReactNode }) {
  return (
    <>
      <GlobalStyles
        styles={{
          '@keyframes waecClean': {
            '0%': { transform: 'scale(1)' },
            '25%': { transform: 'scale(1.05)', backgroundColor: 'rgba(147,197,253,0.2)' },
            '75%': { transform: 'scale(1.05)', backgroundColor: 'rgba(147,197,253,0.2)' },
            '100%': { transform: 'scale(1)', backgroundColor: 'transparent' },
          },
          '@keyframes waecRinse': {
            '0%': { transform: 'rotate(0deg)' },
            '25%': { transform: 'rotate(45deg)' },
            '75%': { transform: 'rotate(-45deg)' },
            '100%': { transform: 'rotate(0deg)' },
          },
          '@keyframes waecFill': {
            '0%': { transform: 'scaleY(0)' },
            '100%': { transform: 'scaleY(1)' },
          },
          '@keyframes waecDropFall': {
            '0%': { transform: 'translateY(0)', opacity: 1 },
            '100%': { transform: 'translateY(180px)', opacity: 0.3 },
          },
          '.waecCleaning': { animation: 'waecClean 1s ease-in-out' },
          '.waecRinsing': { animation: 'waecRinse 1.5s ease-in-out' },
          '.waecFilling': { animation: 'waecFill 2s ease-in-out' },
          '.waecDroplet': { animation: 'waecDropFall 1s linear' },
        }}
      />
      {children}
    </>
  );
}

/* --------------------------- calc popover ------------------------------ */

function CalcPopover({
  open,
  anchor,
  onClose,
  mui,
}: {
  open: boolean;
  anchor: HTMLElement | null;
  onClose: () => void;
  mui: React.ReactNode;
}) {
  return (
    <Paper
      elevation={8}
      sx={{
        position: 'fixed',
        top: 96,
        right: 20,
        width: 320,
        maxWidth: 'calc(100% - 40px)',
        maxHeight: '70vh',
        overflowY: 'auto',
        zIndex: 1300,
        p: 2,
        display: open ? 'block' : 'none',
      }}
      role="dialog"
      aria-label="Calculation Helper"
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 1,
        }}
      >
        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
          Calculation Helper
        </Typography>
        <Button size="small" onClick={onClose} aria-label="Close calculator">
          <CloseIcon fontSize="small" />
        </Button>
      </Box>
      {mui}
    </Paper>
  );
}
