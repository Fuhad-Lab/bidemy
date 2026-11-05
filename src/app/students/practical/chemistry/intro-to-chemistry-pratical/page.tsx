import type { Metadata } from 'next';
import IntroView from './IntroView';

export const metadata: Metadata = {
  title: 'Chemistry | Practical Overview',
  description: 'Structured learning module for Chemistry Practicals.',
};

export default function IntroToChemistryPraticalPage() {
  return <IntroView />;
}
