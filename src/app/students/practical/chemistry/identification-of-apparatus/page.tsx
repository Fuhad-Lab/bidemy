import type { Metadata } from 'next';
import ApparatusView from './ApparatusView';

export const metadata: Metadata = {
  title: 'Chemistry | Practical Overview',
  description: 'Identification of laboratory apparatus with visual examples.',
};

export default function IdentificationOfApparatusPage() {
  return <ApparatusView />;
}
