/**
 * Section metadata for the Electrolysis interactive module.
 * Ported 1:1 from /home/z/fuhademy/students/chemistry-modules/electrolysis/index.html
 * (nav order, per-section header descriptions and the per-section active
 * colors defined in the original inline <style> blocks).
 */

export interface ElectrolysisSectionMeta {
  /** DOM id used by the original page (also used as URL hash) */
  id: string;
  /** Sidebar / tab label */
  label: string;
  /** Header description shown under the page title (original `sectionHeaders`) */
  description: string;
  /** Main accent color (text/active state) */
  color: string;
  /** Lighter companion used for gradients */
  colorLight: string;
  /** Active background tint */
  activeBg: string;
  /** Header icon (MUI icon component name rendered by the module) */
  icon: 'book' | 'flask' | 'bolt' | 'industry' | 'pencil' | 'calculator' | 'lightbulb' | 'assignment';
}

export const ELECTROLYSIS_SECTIONS: ElectrolysisSectionMeta[] = [
  {
    id: 'basic-principles',
    label: 'Basic Principles',
    description: 'Understanding the fundamental concepts of electrolysis',
    color: '#2563eb',
    colorLight: '#60a5fa',
    activeBg: 'rgb(239, 246, 255)',
    icon: 'book',
  },
  {
    id: 'simulations',
    label: 'Interactive Simulations',
    description: 'Hands-on virtual experiments to understand electrolysis processes',
    color: '#4f46e5',
    colorLight: '#818cf8',
    activeBg: 'rgb(238, 242, 255)',
    icon: 'flask',
  },
  {
    id: 'electrode-processes',
    label: 'Electrode Processes',
    description: 'Understanding ion behavior and discharge order at electrodes',
    color: '#7c3aed',
    colorLight: '#a78bfa',
    activeBg: 'rgb(245, 243, 255)',
    icon: 'bolt',
  },
  {
    id: 'industrial-applications',
    label: 'Industrial Applications',
    description: 'Real-world applications of electrolysis in industry',
    color: '#1f2937',
    colorLight: '#6b7280',
    activeBg: 'rgb(249, 250, 251)',
    icon: 'industry',
  },
  {
    id: 'practice-questions',
    label: 'Practice Questions',
    description: 'IGCSE and WAEC level questions to test your understanding',
    color: '#db2777',
    colorLight: '#f472b6',
    activeBg: 'rgb(253, 242, 248)',
    icon: 'pencil',
  },
  {
    id: 'calculations',
    label: 'Calculations',
    description: "Understanding and applying Faraday's Laws in electrolysis calculations",
    color: '#16a34a',
    colorLight: '#4ade80',
    activeBg: 'rgb(240, 253, 244)',
    icon: 'calculator',
  },
  {
    id: 'exam-tips',
    label: 'Exam Tips',
    description: 'Key points to focus on for IGCSE and WAEC examinations',
    color: '#ca8a04',
    colorLight: '#facc15',
    activeBg: 'rgb(254, 252, 232)',
    icon: 'lightbulb',
  },
  {
    id: 'answers',
    label: 'Answers',
    description: 'Answers & worked solutions for the practice questions',
    color: '#0d9488',
    colorLight: '#2dd4bf',
    activeBg: 'rgb(240, 253, 250)',
    icon: 'assignment',
  },
];
