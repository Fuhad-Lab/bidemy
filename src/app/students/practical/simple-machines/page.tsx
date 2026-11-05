import type { Metadata } from 'next';
import ModuleProviders from '@/components/modules/ModuleProviders';
import SimpleMachinesModule from '@/components/modules/simple-machines/SimpleMachinesModule';

export const metadata: Metadata = {
  title: 'Simple Machines — Interactive Practical',
  description:
    'Hands-on simple machines practical: lever torque simulation, frictionless inclined-plane simulation and a quick self-check quiz.',
};

export default function PracticalSimpleMachinesPage() {
  return (
    <ModuleProviders>
      <SimpleMachinesModule backHref="/students/practical/" />
    </ModuleProviders>
  );
}
