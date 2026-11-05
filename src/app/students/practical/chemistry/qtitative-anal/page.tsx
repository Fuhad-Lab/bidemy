import type { Metadata } from 'next';
import QtitativeView from './QtitativeView';

export const metadata: Metadata = {
  title: 'Chemistry | Practical Overview',
  description: 'Structured learning module for Chemistry Practicals.',
};

export default function QtitativeAnalPage() {
  return <QtitativeView />;
}
