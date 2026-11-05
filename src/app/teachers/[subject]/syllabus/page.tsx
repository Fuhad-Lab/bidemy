import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ToolPageShell from '@/components/teacher-tools/ToolPageShell';
import SyllabusView from '@/components/teacher-tools/SyllabusView';
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
  return { title: `Syllabus — ${getSubject(subject).label} Teacher` };
}

export default async function SubjectSyllabusPage({ params }: PageProps) {
  const { subject } = await params;
  if (!TEACHER_SUBJECT_IDS.includes(subject)) notFound();
  return (
    <ToolPageShell
      subject={subject}
      title="Syllabus"
      subtitle={`${getSubject(subject).label} · migrated from the original syllabus-${subject}.html page`}
      maxWidth={800}
    >
      <SyllabusView subject={subject} />
    </ToolPageShell>
  );
}
