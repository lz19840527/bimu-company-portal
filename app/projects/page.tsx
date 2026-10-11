import type { Metadata } from 'next';
import Template from '@/components/portal/templates/projects';
export const metadata: Metadata = {
  title: '工程实践',
  description:
    '了解德清科技新城、阜阳科技文化中心、温岭博物馆、深圳机场卫星厅的幕墙技术服务实践与公开成果。',
  alternates: { canonical: '/projects' },
};
export default function Page() {
  return <Template />;
}
