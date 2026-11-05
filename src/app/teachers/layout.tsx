import type { Metadata } from 'next';
import MuiProvider from '@/components/mui/MuiProvider';

export const metadata: Metadata = {
  title: 'Teachers — JUANOVA CORTEX',
  description:
    'Per-subject teacher dashboards: live session, lesson planner, timer, to-do list, sticky notes, quick links and syllabus tracker.',
};

export default function TeachersLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // MUI is scoped to this section (the shared root layout belongs to the
  // main site workstream).
  return <MuiProvider flavour="teacher">{children}</MuiProvider>;
}
