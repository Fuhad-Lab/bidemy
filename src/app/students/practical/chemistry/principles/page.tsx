import type { Metadata } from 'next';
import PrinciplesView from './PrinciplesView';

export const metadata: Metadata = {
  title: 'Chemistry | Practical Overview',
  description: 'WAEC syllabus coverage for chemistry practicals.',
};

export default function PrinciplesPage() {
  return <PrinciplesView />;
}
