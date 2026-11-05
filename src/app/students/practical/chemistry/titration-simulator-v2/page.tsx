import type { Metadata } from 'next';
import TitrationSimulatorLab from '@/components/practicals/chemistry/TitrationSimulatorLab';

export const metadata: Metadata = {
  title: 'Chemistry Titration Simulator',
  description:
    'Click-to-place titration simulator with droplet animation, live volume readout and readings table.',
};

export default function TitrationSimulatorV2Page() {
  return (
    <TitrationSimulatorLab
      title="Chemistry Titration Simulator"
      subtitle="Place the apparatus, add your solutions and run the titration drop by drop."
    />
  );
}
