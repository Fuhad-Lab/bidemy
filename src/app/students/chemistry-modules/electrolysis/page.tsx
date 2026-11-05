import type { Metadata } from 'next';
import ModuleProviders from '@/components/modules/ModuleProviders';
import ElectrolysisModule from '@/components/modules/electrolysis/ElectrolysisModule';

export const metadata: Metadata = {
  title: 'Electrolysis - Interactive Learning Module',
  description:
    'Interactive electrolysis module: basic principles, virtual simulations, electrode processes, industrial applications, practice questions, Faraday law calculations and exam tips for IGCSE & WAEC.',
};

export default function ElectrolysisPage() {
  return (
    <ModuleProviders>
      <ElectrolysisModule />
    </ModuleProviders>
  );
}
