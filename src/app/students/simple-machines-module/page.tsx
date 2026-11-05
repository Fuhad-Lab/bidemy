import type { Metadata } from 'next';
import ModuleProviders from '@/components/modules/ModuleProviders';
import SimpleMachinesModule from '@/components/modules/simple-machines/SimpleMachinesModule';

export const metadata: Metadata = {
  title: 'Simple Machines — Interactive Tutorial',
  description:
    'Interactive simple machines module: lever torque simulation, frictionless inclined-plane simulation and a quick self-check quiz.',
};

export default function SimpleMachinesModulePage() {
  return (
    <ModuleProviders>
      <SimpleMachinesModule backHref="/students/" />
    </ModuleProviders>
  );
}
