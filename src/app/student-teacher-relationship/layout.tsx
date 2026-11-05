import type { Metadata } from 'next';
import MuiProvider from '@/components/mui/MuiProvider';

export const metadata: Metadata = {
  title: 'Student–Teacher Relationship — Y School',
  description:
    'School management demo migrated from PHP/Bootstrap to Material UI: registrar office, teacher workspace and student area.',
};

export default function RelationshipLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // Material UI is scoped to this section, exactly like src/app/teachers/layout.tsx.
  return <MuiProvider flavour="relationship">{children}</MuiProvider>;
}
