import type { Metadata } from 'next';
import { ProjectDetail } from '@/components/portal/project-detail';
import { getProject } from '@/lib/projects';

const project = getProject('deqing');
export const metadata: Metadata = {
  title: `${project.name}｜工程实践｜彼慕智造 BIMU`,
  description: project.summary,
  alternates: { canonical: '/projects/deqing' },
};
export default function DeqingPage() {
  return <ProjectDetail project={project} />;
}
