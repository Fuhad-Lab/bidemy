import type { Metadata } from 'next';
import TopicStubPage from '@/components/practicals/TopicStubPage';

export const metadata: Metadata = {
  title: 'Qualitative Analysis | Chemistry Practicals',
  description: 'Salt analysis and chemical tests for identifying unknown compounds.',
};

const BASE = '/students/practical/chemistry';

export default function QlitativeAnalPage() {
  return (
    <TopicStubPage
      title="Qualitative Analysis"
      description="Salt analysis and chemical tests for identifying unknown compounds."
      topicSlug="qlitative-anal"
      related={[
        { href: `${BASE}/identification-of-apparatus/`, label: 'Identification of Apparatus' },
        { href: `${BASE}/waec-titration-practicalv3/`, label: 'WAEC Titration Practical v3' },
        { href: `${BASE}/`, label: 'Chemistry Practicals Hub' },
      ]}
    />
  );
}
