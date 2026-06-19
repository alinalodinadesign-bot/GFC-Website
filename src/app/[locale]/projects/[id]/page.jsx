import { GFC_DATA } from '@/lib/data';
import { projectsContentRu } from '@/lib/projectsContentRu';
import ProjectDetailClient from './ProjectDetailClient';

export async function generateMetadata({ params }) {
  const { id, locale } = await params;
  const base = GFC_DATA.projects.find(x => x.id === id) || GFC_DATA.projects[0];
  const ru = locale === 'ru' ? projectsContentRu[base.id] : null;
  const p = ru ? { ...base, ...ru } : base;
  return {
    title: `${p.name} | GFC`,
    description: p.tagline || p.description?.[0] || p.description || '',
  };
}

export default function Page() {
  return <ProjectDetailClient />;
}
