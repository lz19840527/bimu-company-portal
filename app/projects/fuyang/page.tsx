import type { Metadata } from 'next';
import { ProjectDetail } from '@/components/portal/project-detail';
import { getProject } from '@/lib/projects';

const project = getProject('fuyang');
export const metadata: Metadata = {
  title: `${project.name}｜工程实践｜彼慕智造 BIMU`,
  description: project.summary,
  alternates: { canonical: '/projects/fuyang' },
};
export default function FuyangPage() {
  return <ProjectDetail project={project} />;
}
