import type { Metadata } from 'next';
import TopicStubPage from '@/components/practicals/TopicStubPage';

export const metadata: Metadata = {
  title: 'Acid-Base Titration | Chemistry Practicals',
  description: 'Neutralisation titration between an acid and a base.',
};

const BASE = '/students/practical/chemistry';

export default function AcidBaseTitrationPage() {
  return (
    <TopicStubPage
      title="Acid-Base Titration"
      description="Neutralisation titration between an acid and a base using a suitable indicator."
      topicSlug="acid-base-titration"
      related={[
        { href: `${BASE}/titration-simulator/`, label: 'Titration Simulator' },
        { href: `${BASE}/waec-titration-practicalv3/`, label: 'WAEC Titration Practical v3' },
        { href: `${BASE}/quantitative-analysis/`, label: 'Quantitative Analysis' },
      ]}
    />
  );
}
