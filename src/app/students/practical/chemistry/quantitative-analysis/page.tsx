import type { Metadata } from 'next';
import QuantitativeView from './QuantitativeView';

export const metadata: Metadata = {
  title: 'Chemistry Practicals — Quantitative Analysis',
  description:
    'Interactive simulations and guided practicals for titration and volumetric analysis.',
};

export default function QuantitativeAnalysisPage() {
  return <QuantitativeView />;
}
