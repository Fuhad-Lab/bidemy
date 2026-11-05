import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getStudentRoutes, getPage, getHub } from '@/lib/content';
import ContentPageView from '@/components/site/ContentPageView';
import HubView from '@/components/site/HubView';
import SimView from '@/components/site/SimView';

interface RouteProps {
  params: Promise<{ slug: string[] }>;
}

/**
 * Catch-all route mirroring the original site's page structure:
 * /students/subjects/chemistry/foundations/atomic-structure/ etc.
 * All routes are statically generated from the extraction manifest.
 * The catch-all is mounted under /students/, so `slug` holds the path
 * segments AFTER the /students/ prefix.
 */

export function generateStaticParams(): { slug: string[] }[] {
  return getStudentRoutes()
    .filter((route) => route.startsWith('/students/'))
    .map((route) => ({
      slug: route
        .replace(/^\/students\//, '')
        .replace(/^\/+/, '')
        .replace(/\/+$/, '')
        .split('/')
        .filter(Boolean),
    }));
}

function toRoute(slug: string[]): string {
  return '/students/' + slug.join('/') + '/';
}

export async function generateMetadata({ params }: RouteProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getPage(toRoute(slug));
  if (!page) return { title: 'Bidemy' };
  return {
    title: page.title,
    description: page.description || undefined,
  };
}

export default async function StudentContentPage({ params }: RouteProps) {
  const { slug } = await params;
  const route = toRoute(slug);

  const hub = getHub(route);
  if (hub) return <HubView hub={hub} />;

  const page = getPage(route);
  if (!page) notFound();

  if (page.kind === 'sim') return <SimView page={page} />;
  return <ContentPageView page={page} />;
}
