import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import LiveSessionDashboard from '@/components/teacher-tools/LiveSessionDashboard';
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
  return {
    title: `Teacher Live Session — ${getSubject(subject).label}`,
    description: `${getSubject(subject).label} teacher dashboard: live session, whiteboard, notes and syllabus tracker.`,
  };
}

export default async function SubjectDashboardPage({ params }: PageProps) {
  const { subject } = await params;
  if (!TEACHER_SUBJECT_IDS.includes(subject)) notFound();
  return <LiveSessionDashboard subject={subject} />;
}
