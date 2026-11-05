import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ToolPageShell from '@/components/teacher-tools/ToolPageShell';
import TodoListTool from '@/components/teacher-tools/TodoListTool';
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
  return { title: `To-Do List — ${getSubject(subject).label} Teacher` };
}

export default async function SubjectTodoListPage({ params }: PageProps) {
  const { subject } = await params;
  if (!TEACHER_SUBJECT_IDS.includes(subject)) notFound();
  return (
    <ToolPageShell
      subject={subject}
      title="To-Do List"
      subtitle={`${getSubject(subject).label} · add, complete and delete tasks (saved on this device)`}
    >
      <TodoListTool subject={subject} />
    </ToolPageShell>
  );
}
