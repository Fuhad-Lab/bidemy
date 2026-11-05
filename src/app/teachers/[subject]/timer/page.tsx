import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ToolPageShell from '@/components/teacher-tools/ToolPageShell';
import TimerTool from '@/components/teacher-tools/TimerTool';
import { TEACHER_SUBJECT_IDS, getSubject } from '@/data/teachers/subjects';

interface PageProps {
  params: Promise<{ subject: string }>;
}

export function generateStaticParams() {
  return TEACHER_SUBJECT_IDS.map((subject) => ({ subject }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { subject } = await params;
  if (!TEACHER_SUBJECT_IDS.includes(subject)) return { title: 'Subject not found' };
  return { title: `Timer — ${getSubject(subject).label} Teacher` };
}

export default async function SubjectTimerPage({ params }: PageProps) {
  const { subject } = await params;
  if (!TEACHER_SUBJECT_IDS.includes(subject)) notFound();
  return (
    <ToolPageShell
      subject={subject}
      title="Timer"
      subtitle={`${getSubject(subject).label} · classroom stopwatch (Start / Pause / Reset)`}
    >
      <TimerTool />
    </ToolPageShell>
  );
}
