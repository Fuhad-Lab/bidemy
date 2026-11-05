/**
 * Demo content for the teacher tools — seeded into local component state the
 * first time a tool is opened (persisted per-subject in localStorage, exactly
 * like the original pages' localStorage keys, e.g. `teacherTodos`).
 */

import type { TeacherTool } from './subjects';

export interface DemoLessonPlan {
  id: string;
  title: string;
  date: string; // ISO date
  details: string;
}

export interface DemoTodo {
  id: string;
  text: string;
  completed: boolean;
}

export interface DemoQuickLink {
  id: string;
  url: string;
  label: string;
}

type PerSubject<T> = Record<string, T[]>;

const lesson = (
  id: string,
  title: string,
  date: string,
  details: string,
): DemoLessonPlan => ({ id, title, date, details });

export const DEMO_LESSON_PLANS: PerSubject<DemoLessonPlan[]> = {
  accounting: [
    lesson('acc-1', 'Nature and Significance of Accounting', '2025-05-12', 'Introduce bookkeeping vs accounting, users of accounting information and the accounting conventions. Practice: classify a list of transactions.'),
    lesson('acc-2', 'The Ledger and Trial Balance', '2025-05-15', 'Post simple transactions to ledger accounts and extract a trial balance. Objectives: apply the double entry principle.'),
  ],
  biology: [
    lesson('bio-1', 'Variety of Organisms — Cell Structure', '2025-05-12', 'Plant vs animal cells, organelles and their functions. Microscope lab demo included.'),
    lesson('bio-2', 'Ecology — Food Webs', '2025-05-16', 'Trophic levels, energy flow, and human impact on ecosystems. Draw a local food web.'),
  ],
  chemistry: [
    lesson('chem-1', 'Separation of Mixtures', '2025-05-12', 'Demonstrate filtration, evaporation and simple distillation. Objectives: distinguish pure from impure substances.'),
    lesson('chem-2', 'Gas Laws — Boyle and Charles', '2025-05-15', 'Kinetic theory recap, then derive and apply PV = k and V/T = k with worked examples.'),
  ],
  commerce: [
    lesson('com-1', 'Meaning and Scope of Commerce', '2025-05-12', 'Characteristics and functions of commerce; relationship between commerce and other fields.'),
    lesson('com-2', 'Home Trade vs Foreign Trade', '2025-05-14', 'Retail and wholesale trade; documents used in home trade.'),
  ],
  economics: [
    lesson('eco-1', 'Economics as a Science', '2025-05-12', 'Wants, scarcity, choice, scale of preference and opportunity cost. Activity: construct a scale of preference.'),
    lesson('eco-2', 'Demand and Supply', '2025-05-15', 'Law of demand, supply schedules and equilibrium price determination.'),
  ],
  english: [
    lesson('eng-1', 'Comprehension — Narrative Passage', '2025-05-12', 'SECTION A practice: identify topic sentences, make inferences and deduce the writer’s intention.'),
    lesson('eng-2', 'Lexis — Antonyms & Synonyms', '2025-05-15', 'SECTION B drill: sentence interpretation, antonyms, synonyms and sentence completion.'),
  ],
  government: [
    lesson('gov-1', 'Basic Concepts in Government', '2025-05-12', 'Power, authority, legitimacy, sovereignty; state vs nation. Students define each concept with examples.'),
    lesson('gov-2', 'Arms of Government', '2025-05-16', 'Separation of powers and checks and balances among the executive, legislature and judiciary.'),
  ],
  literature: [
    lesson('lit-1', 'DRAMA — Types & Techniques', '2025-05-12', 'Tragedy, comedy, tragicomedy, melodrama, farce and opera; dramatic techniques overview.'),
    lesson('lit-2', 'Figures of Speech in Poetry', '2025-05-15', 'Identify simile, metaphor, personification and irony in selected poems.'),
  ],
  mathematics: [
    lesson('math-1', 'Number Bases', '2025-05-12', 'Operations in different number bases from 2 to 10; conversion including fractional parts.'),
    lesson('math-2', 'Fractions, Decimals & Percentages', '2025-05-15', 'Significant figures, decimal places, percentage errors and simple interest calculations.'),
  ],
  physics: [
    lesson('phy-1', 'Measurements & Units', '2025-05-12', 'Vernier, micrometer, measuring cylinder; fundamental and derived quantities; errors and standard form.'),
    lesson('phy-2', 'Motion & Forces', '2025-05-16', 'Linear motion, Newton’s laws, momentum and impulse; simple harmonic motion intro.'),
  ],
};

export const DEMO_TODOS: PerSubject<DemoTodo[]> = {
  accounting: [
    { id: 't-1', text: 'Mark Ledger & Trial Balance exercise', completed: false },
    { id: 't-2', text: 'Print cash-book worksheets for SS2', completed: true },
    { id: 't-3', text: 'Prepare mid-term grading sheet', completed: false },
  ],
  biology: [
    { id: 't-1', text: 'Set up microscope for cell lab', completed: false },
    { id: 't-2', text: 'Collect food-web assignments', completed: true },
    { id: 't-3', text: 'Book laboratory for dissection class', completed: false },
  ],
  chemistry: [
    { id: 't-1', text: 'Prepare distillation demo apparatus', completed: false },
    { id: 't-2', text: 'Grade gas laws problem set', completed: false },
    { id: 't-3', text: 'Restock litmus paper supply', completed: true },
  ],
  commerce: [
    { id: 't-1', text: 'Collect home-trade document charts', completed: false },
    { id: 't-2', text: 'Update scheme of work', completed: false },
  ],
  economics: [
    { id: 't-1', text: 'Review scale-of-preference activity', completed: false },
    { id: 't-2', text: 'Photocopy demand & supply charts', completed: true },
    { id: 't-3', text: 'Submit lesson notes for week 6', completed: false },
  ],
  english: [
    { id: 't-1', text: 'Mark comprehension passages (SS1)', completed: false },
    { id: 't-2', text: 'Prepare oral forms listening drill', completed: false },
    { id: 't-3', text: 'Return lexis test scripts', completed: true },
  ],
  government: [
    { id: 't-1', text: 'Update current affairs board', completed: false },
    { id: 't-2', text: 'Prepare separation-of-powers quiz', completed: false },
  ],
  literature: [
    { id: 't-1', text: 'Select poems for figures-of-speech class', completed: false },
    { id: 't-2', text: 'Book audio-visual room for drama screening', completed: true },
    { id: 't-3', text: 'Grade literature assignments', completed: false },
  ],
  mathematics: [
    { id: 't-1', text: 'Mark number-base conversion drills', completed: false },
    { id: 't-2', text: 'Prepare percentage-error worksheet', completed: true },
    { id: 't-3', text: 'Plan remedial class for SS3', completed: false },
  ],
  physics: [
    { id: 't-1', text: 'Calibrate vernier callipers for practical', completed: false },
    { id: 't-2', text: 'Mark motion & forces test', completed: false },
    { id: 't-3', text: 'Reserve SHM demonstration kit', completed: true },
  ],
};

export const DEMO_STICKY_NOTES: PerSubject<string[]> = {
  accounting: ['Remember: next PTA day — show class ledger project.', 'Cash-book test moved to Friday.'],
  biology: ['Lab prep: rinse beakers for osmosis demo.', 'Photosynthesis field walk — Thursday.'],
  chemistry: ['Order more litmus paper!', 'Gas laws quiz — revise Boyle & Charles.'],
  commerce: ['Invite guest trader for career talk.', 'Collect foreign-trade document samples.'],
  economics: ['Bring newspapers for demand/supply headlines.', 'Staff meeting — Tuesday 3pm.'],
  english: ['Cloze test texts due to HOD by Friday.', 'Reading: The Lekki Headmaster — chapters 1-2.'],
  government: ['Update current affairs wall chart.', 'Mock exam: sections 1-3 only.'],
  literature: ['Drama screening — get projector remote.', 'Collect production fee receipts.'],
  mathematics: ['SS2 remedial — Tuesdays after break.', 'Check WAEC past questions on indices.'],
  physics: ['Charge stopwatch batteries for practical.', 'Submit lab inventory to exam office.'],
};

export const DEMO_QUICK_LINKS: PerSubject<DemoQuickLink[]> = {
  accounting: [
    { id: 'l-1', url: 'https://en.wikipedia.org/wiki/Accounting', label: 'Accounting — Wikipedia' },
    { id: 'l-2', url: 'https://jamb.gov.ng/Syllabus', label: 'JAMB UTME Syllabus' },
    { id: 'l-3', url: 'https://www.khanacademy.org/economics-finance-domain', label: 'Khan Academy — Finance' },
  ],
  biology: [
    { id: 'l-1', url: 'https://en.wikipedia.org/wiki/Biology', label: 'Biology — Wikipedia' },
    { id: 'l-2', url: 'https://jamb.gov.ng/Syllabus', label: 'JAMB UTME Syllabus' },
    { id: 'l-3', url: 'https://www.khanacademy.org/science/biology', label: 'Khan Academy — Biology' },
  ],
  chemistry: [
    { id: 'l-1', url: 'https://en.wikipedia.org/wiki/Chemistry', label: 'Chemistry — Wikipedia' },
    { id: 'l-2', url: 'https://jamb.gov.ng/Syllabus', label: 'JAMB UTME Syllabus' },
    { id: 'l-3', url: 'https://www.khanacademy.org/science/chemistry', label: 'Khan Academy — Chemistry' },
  ],
  commerce: [
    { id: 'l-1', url: 'https://en.wikipedia.org/wiki/Commerce', label: 'Commerce — Wikipedia' },
    { id: 'l-2', url: 'https://jamb.gov.ng/Syllabus', label: 'JAMB UTME Syllabus' },
  ],
  economics: [
    { id: 'l-1', url: 'https://en.wikipedia.org/wiki/Economics', label: 'Economics — Wikipedia' },
    { id: 'l-2', url: 'https://jamb.gov.ng/Syllabus', label: 'JAMB UTME Syllabus' },
    { id: 'l-3', url: 'https://www.khanacademy.org/economics-finance-domain', label: 'Khan Academy — Economics' },
  ],
  english: [
    { id: 'l-1', url: 'https://jamb.gov.ng/Syllabus', label: 'JAMB Use of English Syllabus' },
    { id: 'l-2', url: 'https://www.bbc.co.uk/learningenglish', label: 'BBC Learning English' },
  ],
  government: [
    { id: 'l-1', url: 'https://en.wikipedia.org/wiki/Political_science', label: 'Political Science — Wikipedia' },
    { id: 'l-2', url: 'https://jamb.gov.ng/Syllabus', label: 'JAMB UTME Syllabus' },
  ],
  literature: [
    { id: 'l-1', url: 'https://en.wikipedia.org/wiki/Literature', label: 'Literature — Wikipedia' },
    { id: 'l-2', url: 'https://www.poetryfoundation.org', label: 'Poetry Foundation' },
    { id: 'l-2b', url: 'https://jamb.gov.ng/Syllabus', label: 'JAMB UTME Syllabus' },
  ],
  mathematics: [
    { id: 'l-1', url: 'https://en.wikipedia.org/wiki/Mathematics', label: 'Mathematics — Wikipedia' },
    { id: 'l-2', url: 'https://jamb.gov.ng/Syllabus', label: 'JAMB UTME Syllabus' },
    { id: 'l-3', url: 'https://www.khanacademy.org/math', label: 'Khan Academy — Math' },
  ],
  physics: [
    { id: 'l-1', url: 'https://en.wikipedia.org/wiki/Physics', label: 'Physics — Wikipedia' },
    { id: 'l-2', url: 'https://jamb.gov.ng/Syllabus', label: 'JAMB UTME Syllabus' },
    { id: 'l-3', url: 'https://www.khanacademy.org/science/physics', label: 'Khan Academy — Physics' },
  ],
};

/** Sidebar model mirroring the original canvas-sidebar nav (emoji → Material Icons) */
export interface SidebarItem {
  tool: TeacherTool | 'theme' | 'student-area';
  label: string;
  icon: string; // Material icon name
  title: string;
}

export const SIDEBAR_ITEMS: SidebarItem[] = [
  { tool: 'dashboard', label: 'Dashboard', icon: 'Home', title: 'Dashboard' },
  { tool: 'sticky-notes', label: 'Sticky Notes', icon: 'StickyNote2', title: 'Sticky Notes' },
  { tool: 'todo-list', label: 'To-Do List', icon: 'Checklist', title: 'To-Do List' },
  { tool: 'timer', label: 'Timer', icon: 'Timer', title: 'Timer' },
  { tool: 'lesson-planner', label: 'Lesson Planner', icon: 'CalendarMonth', title: 'Lesson Planner' },
  { tool: 'quick-links', label: 'Quick Links', icon: 'Link', title: 'Quick Links' },
  { tool: 'syllabus', label: 'Syllabus', icon: 'MenuBook', title: 'Syllabus' },
  { tool: 'student-area', label: 'Student Area', icon: 'School', title: 'Students Section' },
  { tool: 'theme', label: 'Theme', icon: 'DarkMode', title: 'Toggle Dark/Light Mode' },
];

export const LIVE_SESSION_TOOLS = [
  { key: 'whiteboard', label: 'Whiteboard' },
  { key: 'photo', label: 'Add Photo' },
  { key: 'video', label: 'Add Video' },
  { key: 'notes', label: 'Lecture Notes' },
] as const;

export type LiveSessionToolKey = (typeof LIVE_SESSION_TOOLS)[number]['key'];
