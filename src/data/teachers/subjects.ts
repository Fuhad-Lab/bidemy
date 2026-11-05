/**
 * Registry of the 10 teacher subject dashboards migrated from
 * /home/z/fuhademy/teachers/<subject> dashboard/.
 *
 * Route model:
 *   /teachers/                       → index
 *   /teachers/teacher-confirmation/  → teacher-confirmation.html
 *   /teachers/[subject]/             → <subject>-live-session.html (+ dashboard links)
 *   /teachers/[subject]/<tool>/      → timer.html, todo-list.html, …
 */

export type TeacherTool =
  | 'dashboard'
  | 'lesson-planner'
  | 'timer'
  | 'todo-list'
  | 'sticky-notes'
  | 'quick-links'
  | 'syllabus';

export interface TeacherSubject {
  id: string;
  label: string;
  /** tailwind-free hex accents matching the original dashboard accents */
  color: string;
  gradient: string;
  icon: string; // Material Icon name hint (rendered by the mapper in components)
}

export const TEACHER_SUBJECTS: TeacherSubject[] = [
  { id: 'accounting', label: 'Accounting', color: '#f59e0b', gradient: 'linear-gradient(135deg, #f59e0b, #d97706)', icon: 'Calculate' },
  { id: 'biology', label: 'Biology', color: '#22c55e', gradient: 'linear-gradient(135deg, #4ade80, #16a34a)', icon: 'Biotech' },
  { id: 'chemistry', label: 'Chemistry', color: '#06b6d4', gradient: 'linear-gradient(135deg, #22d3ee, #0891b2)', icon: 'Science' },
  { id: 'commerce', label: 'Commerce', color: '#a855f7', gradient: 'linear-gradient(135deg, #c084fc, #9333ea)', icon: 'Storefront' },
  { id: 'economics', label: 'Economics', color: '#14b8a6', gradient: 'linear-gradient(135deg, #2dd4bf, #0d9488)', icon: 'TrendingUp' },
  { id: 'english', label: 'English', color: '#ef4444', gradient: 'linear-gradient(135deg, #f87171, #dc2626)', icon: 'MenuBook' },
  { id: 'government', label: 'Government', color: '#64748b', gradient: 'linear-gradient(135deg, #94a3b8, #475569)', icon: 'AccountBalance' },
  { id: 'literature', label: 'Literature', color: '#ec4899', gradient: 'linear-gradient(135deg, #f472b6, #db2777)', icon: 'AutoStories' },
  { id: 'mathematics', label: 'Mathematics', color: '#0ea5e9', gradient: 'linear-gradient(135deg, #38bdf8, #0284c7)', icon: 'Functions' },
  { id: 'physics', label: 'Physics', color: '#8b5cf6', gradient: 'linear-gradient(135deg, #a78bfa, #7c3aed)', icon: 'RocketLaunch' },
];

export const TEACHER_SUBJECT_IDS = TEACHER_SUBJECTS.map((s) => s.id);

export function isTeacherSubject(id: string): boolean {
  return TEACHER_SUBJECT_IDS.includes(id);
}

export function getSubject(id: string): TeacherSubject {
  return TEACHER_SUBJECTS.find((s) => s.id === id) ?? TEACHER_SUBJECTS[0];
}

export function subjectLabel(id: string): string {
  return getSubject(id).label;
}

/** Subject dashboard home (replicates <subject>-live-session.html) */
export function dashboardRoute(subject: string): string {
  return `/teachers/${subject}/`;
}

/** Tool page under a subject dashboard */
export function toolRoute(subject: string, tool: TeacherTool): string {
  if (tool === 'dashboard') return dashboardRoute(subject);
  return `/teachers/${subject}/${tool}/`;
}

export const TEACHER_CONFIRMATION_ROUTE = '/teachers/teacher-confirmation/';
export const TEACHERS_INDEX_ROUTE = '/teachers/';
/** The original teacher pages pulled helper assets from the students area */
export const STUDENT_AREA_ROUTE = '/students/student-dashboard/';

