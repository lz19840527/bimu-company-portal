import type { Metadata } from 'next';
import Template from '@/components/portal/templates/about';
export const metadata: Metadata = {
  title: '关于彼慕',
  description:
    '江苏彼慕智造建筑科技有限公司，专注幕墙、复杂建筑表皮与建筑数字化技术服务，以工程经验推动数字工法与自研产品。',
  alternates: { canonical: '/about' },
};
export default function Page() {
  return <Template />;
}
