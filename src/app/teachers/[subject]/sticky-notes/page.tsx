import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ToolPageShell from '@/components/teacher-tools/ToolPageShell';
import StickyNotesTool from '@/components/teacher-tools/StickyNotesTool';
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
  return { title: `Sticky Notes — ${getSubject(subject).label} Teacher` };
}

export default async function SubjectStickyNotesPage({ params }: PageProps) {
  const { subject } = await params;
  if (!TEACHER_SUBJECT_IDS.includes(subject)) notFound();
  return (
    <ToolPageShell
      subject={subject}
      title="Sticky Notes"
      subtitle={`${getSubject(subject).label} · pin reminders in a drag-free grid (saved on this device)`}
      maxWidth={860}
    >
      <StickyNotesTool subject={subject} />
    </ToolPageShell>
  );
}
