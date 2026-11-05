/**
 * Data extracted verbatim from waec-titration-practicalv3.html
 * (WAEC question bank, endpoint tables, colour maps, procedure guide).
 */

export type WaecQuestion = {
  given: string;
  requirements: string[];
  reaction: string;
  data?: Record<string, string | number>;
};

export const WAEC_QUESTIONS: Record<string, WaecQuestion> = {
  '2023': {
    given: 'A is a solution of HCl containing 7.30 g dm⁻³. B is a solution containing 10.6 g dm⁻³ of Na₂CO₃.',
    requirements: [
      'Calculate the concentration of A in mol dm⁻³',
      'Calculate the concentration of B in mol dm⁻³',
      'Calculate the number of moles of CO₂ produced',
      'Calculate the mass of NaCl formed',
    ],
    reaction: '2HCl (aq) + Na₂CO₃ (aq) → 2NaCl (aq) + H₂O (l) + CO₂ (g)',
    data: { H: 1, O: 16, Na: 23, Cl: 35.5, C: 12 },
  },
  '2022': {
    given: 'A is 0.150 mol dm⁻³ H₂SO₄ solution. B is a solution of NaOH containing x g dm⁻³.',
    requirements: [
      'Calculate the concentration of B in mol dm⁻³',
      'Calculate x',
      'Calculate the mass of Na₂SO₄ formed',
    ],
    reaction: 'H₂SO₄ (aq) + 2NaOH (aq) → Na₂SO₄ (aq) + 2H₂O (l)',
    data: { H: 1, O: 16, Na: 23, S: 32 },
  },
  '2021': {
    given: 'A is a solution of Na₂S₂O₃. B is a solution of iodine containing 2.0 g of KIO₃ per dm³.',
    requirements: [
      'Calculate the concentration of iodine in mol dm⁻³',
      'Calculate the mass of Na₂S₂O₃ that would react',
    ],
    reaction: '2Na₂S₂O₃ → Na₂S₄O₆ + 2NaI',
    data: { Na: 23, S: 32, O: 16, I: 127 },
  },
  '2020': {
    given: 'A is 0.100 mol dm⁻³ H₂SO₄. B contains 4.0 g of KOH per dm³.',
    requirements: [
      'Calculate the concentration of B in mol dm⁻³',
      'Calculate the mass of K₂SO₄ formed',
      'Calculate the percentage yield if 3.8g was obtained',
    ],
    reaction: 'H₂SO₄ (aq) + 2KOH (aq) → K₂SO₄ (aq) + 2H₂O (l)',
    data: { H: 1, O: 16, K: 39, S: 32 },
  },
  '2004': {
    given: 'A is a solution of HCl containing 5.0 g dm⁻³. B is a solution of impure KOH containing 6.50 g dm⁻³.',
    requirements: [
      'Calculate the concentration of A in mol dm⁻³',
      'Calculate the concentration of B in mol dm⁻³',
      'Calculate the percentage purity of KOH in B',
      'Calculate the mass of NaCl formed',
    ],
    reaction: 'HCl (aq) + KOH (aq) → KCl (aq) + H₂O (l)',
    data: { H: 1, C: 12.0, O: 16.0, K: 39.0, Cl: 35.5, KOH: '56.0 mol⁻¹' },
  },
  '2003': {
    given: 'A is a solution of HCl containing 7.30 g dm⁻³. B is a solution of X₂CO₃ containing 10.6 g dm⁻³.',
    requirements: [
      'Calculate the concentration of A in mol dm⁻³',
      'Calculate the concentration of B in mol dm⁻³',
      'Calculate the molar mass of X₂CO₃',
      'Calculate the relative atomic mass of X',
    ],
    reaction: 'X₂CO₃ + 2HCl → 2XCl + H₂O + CO₂',
    data: { H: 1, C: 12, O: 16, Cl: '35.5 mol⁻¹' },
  },
  '2002': {
    given: 'A is 0.125 mol dm⁻³ H₂SO₄ solution. B is an aqueous solution containing x g dm⁻³ of KOH.',
    requirements: [
      'Calculate the average volume of A used',
      'Calculate the concentration of B in mol dm⁻³',
      'Calculate the concentration of B in g dm⁻³',
      'Calculate the value of x',
    ],
    reaction: 'H₂SO₄ (aq) + 2KOH(aq) → K₂SO₄(aq) + 2H₂O(l)',
    data: { H: 1, O: 16, K: 39 },
  },
  '2001': {
    given: 'A is 0.100 mol dm⁻³ HCl solution. B is a solution containing 6.0 g dm⁻³ of KHCOO.',
    requirements: [
      'Calculate the concentration of KHCOO in mol dm⁻³',
      'Calculate the concentration of H₂SO₄ in mol dm⁻³ in the mixture',
      'Calculate the percentage by mass of KHCOO in the mixture',
    ],
    reaction: 'HCl (aq) + KHCOO (aq) → KCl (aq) + H₂O (l) + CO₂ (g)',
  },
  '2000': {
    given:
      'A is a solution of HCl containing 6.0 g dm⁻³. B is a solution containing B g dm⁻³ of potassium trioxocarbonate (IV).',
    requirements: [
      'Calculate the concentration of HCl in mol dm⁻³',
      'Calculate the concentration of K₂CO₃ in mol dm⁻³',
      'Calculate the concentration of potassium ions in mol dm⁻³ of B',
      'Calculate the value of B in g dm⁻³',
    ],
    reaction: '2HCl (aq) + K₂CO₃ (aq) → 2KCl (aq) + H₂O (l) + CO₂ (g)',
    data: { H: 1, Cl: 35.5, K: 39, C: 12, O: 16 },
  },
};

/** Default endpoint volumes per WAEC question year. */
export const QUESTION_ENDPOINTS: Record<string, number> = {
  '2004': 24.8, // HCl + KOH
  '2003': 25.2, // HCl + X₂CO₃
  '2002': 12.4, // H₂SO₄ + 2KOH
  '2001': 24.9, // HCl + KHCOO
  '2000': 24.8, // 2HCl + K₂CO₃
};

/** Endpoint volumes for titrant + indicator setups (cm³). */
export const SETUP_ENDPOINTS: Record<string, number> = {
  'HCl + Methyl orange': 24.8,
  'H2SO4 + Methyl orange': 12.4,
  'HNO3 + Methyl orange': 24.8,
  'CH3COOH + Methyl orange': 25.2,
  'KOH + Phenolphthalein': 25.0,
  'NaOH + Phenolphthalein': 24.9,
  'Ca(OH)2 + Phenolphthalein': 12.45,
  'KMnO4 + none': 24.75, // KMnO4 is self-indicating
};

/** Centralised titrant colour map (used across the simulator). */
export const TITRANT_COLORS: Record<string, string> = {
  HCl: 'rgba(220, 38, 38, 0.7)', // Bright red for HCl
  H2SO4: 'rgba(234, 88, 12, 0.7)', // Orange-red for H2SO4
  HNO3: 'rgba(190, 24, 93, 0.7)', // Purple-red for HNO3
  CH3COOH: 'rgba(251, 146, 60, 0.7)', // Orange for weak acid
  NaOH: 'rgba(37, 99, 235, 0.7)', // Deep blue for NaOH
  KOH: 'rgba(5, 150, 105, 0.7)', // Teal for KOH
  'Ca(OH)2': 'rgba(6, 182, 212, 0.7)', // Cyan for Ca(OH)2
  KMnO4: 'rgba(147, 51, 234, 0.7)', // Purple for KMnO4
};

export const TITRANT_TYPES: Record<string, string> = {
  HCl: 'acid',
  H2SO4: 'acid',
  HNO3: 'acid',
  CH3COOH: 'acid',
  NaOH: 'base',
  KOH: 'base',
  'Ca(OH)2': 'base',
  KMnO4: 'oxidizer',
};

/** Compatibility map: which titrant types each indicator suits. */
export const INDICATOR_COMPATIBILITY: Record<string, string[]> = {
  Phenolphthalein: ['base'],
  'Methyl orange': ['acid'],
  'KMnO4 (self-indicating)': ['acid', 'base', 'oxidizer'],
};

export function getIndicatorColor(indicator: string, concentrated = false): string {
  const colors: Record<string, string> = {
    Phenolphthalein: concentrated ? 'rgba(244,114,182,0.9)' : 'rgba(244,114,182,0.3)',
    'Methyl orange': concentrated ? 'rgba(255,165,0,0.9)' : 'rgba(255,165,0,0.5)',
    'KMnO4 (self-indicating)': concentrated ? 'rgba(167,139,250,0.9)' : 'rgba(167,139,250,0.3)',
  };
  return colors[indicator] || (concentrated ? 'rgba(52,211,153,0.9)' : 'rgba(52,211,153,0.3)');
}

/** Faint analyte colours used when the base is delivered to the flask. */
export const ANALYTE_COLORS: Record<string, string> = {
  NaOH: 'rgba(37, 99, 235, 0.25)',
  KOH: 'rgba(5,150,105,0.25)',
  'Ca(OH)2': 'rgba(6,182,212,0.20)',
};

/** Procedure guide — step details (HTML strings kept from the source). */
export const PROCEDURE_DETAILS: Record<number, string> = {
  1: '<strong>1. Clean all glassware</strong> — Use the "Clean Burette", "Clean Pipette" and "Clean Flask" buttons to rinse with distilled water. Wait until each button shows a ✓ and is disabled before moving on.',
  2: '<strong>2. Rinse burette with titrant</strong> — Select the titrant from the "Titrant" dropdown, then click "Rinse Burette" to simulate coating the burette\u2019s interior.',
  3: '<strong>3. Rinse pipette with analyte</strong> — Select the analyte from the "Analyte (to pipette)" dropdown first, then click "Rinse Pipette" to clean the pipette with the chosen analyte.',
  4: '<strong>4. Set up and fill burette</strong> — Click "Fill Burette" to top up the burette. Make sure the initial reading is recorded in the readings table (usually 0.00 after setting).',
  5: '<strong>5. Select analyte and measure</strong> — Choose the analyte (base) from the "Analyte (to pipette)" dropdown, then use "Measure 25cm³" to draw the chosen analyte into the pipette and deliver it to the conical flask. Confirm the flask shows the analyte colour.',
  6: '<strong>6. Add indicator</strong> — Choose "Methyl orange" (or the required indicator) and click "Add Indicator". The flask will show the indicator\u2019s base colour.',
  7: '<strong>7. Perform titration</strong> — Use "Add Drop" to dispense titrant. Each click dispenses the configured drop volume. Swirl after a few drops using "Swirl Flask". Stop when the persistent colour change is observed (the guide shows the target endpoint volume). Record final burette reading in the table.',
};

export const PROCEDURE_STEPS: string[] = [
  '1. Clean all glassware with distilled water',
  '2. Rinse burette with titrant solution',
  '3. Rinse pipette with analyte solution',
  '4. Fill burette with titrant',
  '5. Select analyte (base) & measure 25cm³',
  '6. Add indicator to conical flask',
  '7. Perform titration',
];

export const STEP_TASKS: string[] = [
  'Clean all glassware thoroughly with distilled water',
  'Rinse burette with titrant solution',
  'Rinse pipette with analyte solution',
  'Fill burette with titrant',
  'Select analyte (base) and measure 25cm³',
  'Add indicator to conical flask',
  'Perform titration',
];

export const TRIAL_LABELS: Record<string, string> = {
  rough: 'Rough',
  '1': '1st Reading',
  '2': '2nd Reading',
  '3': '3rd Reading',
};

export const ELEMENT_MASSES: Record<string, number> = {
  H: 1,
  C: 12,
  N: 14,
  O: 16,
  Na: 23,
  Mg: 24,
  P: 31,
  S: 32,
  Cl: 35.5,
  K: 39,
  Ca: 40,
};
