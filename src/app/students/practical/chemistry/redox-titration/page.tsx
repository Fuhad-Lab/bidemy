import type { Metadata } from 'next';
import TopicStubPage from '@/components/practicals/TopicStubPage';

export const metadata: Metadata = {
  title: 'Redox Titration | Chemistry Practicals',
  description: 'Oxidation–reduction titrations with self-indicating titrants.',
};

const BASE = '/students/practical/chemistry';

export default function RedoxTitrationPage() {
  return (
    <TopicStubPage
      title="Redox Titration"
      description="Oxidation–reduction titrations, e.g. potassium manganate(VII) against iron(II) solutions."
      topicSlug="redox-titration"
      related={[
        { href: `${BASE}/titration-simulator/`, label: 'Titration Simulator' },
        { href: `${BASE}/waec-titration-practicalv3/`, label: 'WAEC Titration Practical v3' },
        { href: `${BASE}/quantitative-analysis/`, label: 'Quantitative Analysis' },
      ]}
    />
  );
}
