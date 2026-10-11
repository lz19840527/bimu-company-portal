import type { Metadata } from 'next';
import { ProjectDetail } from '@/components/portal/project-detail';
import { getProject } from '@/lib/projects';

const project = getProject('wenling');
export const metadata: Metadata = {
  title: `${project.name}｜工程实践｜彼慕智造 BIMU`,
  description: project.summary,
  alternates: { canonical: '/projects/wenling' },
};
export default function WenlingPage() {
  return <ProjectDetail project={project} />;
}
