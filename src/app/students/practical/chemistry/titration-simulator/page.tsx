import type { Metadata } from 'next';
import TitrationSimulatorLab from '@/components/practicals/chemistry/TitrationSimulatorLab';

export const metadata: Metadata = {
  title: 'Chemistry Practical Simulator - Titration',
  description: 'Titration of HNO₃ with NaOH — interactive chemistry practical simulator.',
};

export default function TitrationSimulatorPage() {
  return (
    <TitrationSimulatorLab
      title="Chemistry Practical Simulator"
      subtitle="Titration of HNO₃ with NaOH"
    />
  );
}
