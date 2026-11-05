import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ToolPageShell from '@/components/teacher-tools/ToolPageShell';
import QuickLinksTool from '@/components/teacher-tools/QuickLinksTool';
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
  return { title: `Quick Links — ${getSubject(subject).label} Teacher` };
}

export default async function SubjectQuickLinksPage({ params }: PageProps) {
  const { subject } = await params;
  if (!TEACHER_SUBJECT_IDS.includes(subject)) notFound();
  return (
    <ToolPageShell
      subject={subject}
      title="Quick Links"
      subtitle={`${getSubject(subject).label} · save teaching resources (open in new tab, delete anytime)`}
    >
      <QuickLinksTool subject={subject} />
    </ToolPageShell>
  );
}
