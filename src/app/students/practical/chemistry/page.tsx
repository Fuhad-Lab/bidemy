import type { Metadata } from 'next';
import HubView from './HubView';

export const metadata: Metadata = {
  title: 'Chemistry | Practical Overview',
  description:
    'Interactive simulations and guided experiments for chemistry lab work.',
};

export default function ChemistryPracticalsPage() {
  return <HubView />;
}
