import type { Metadata } from 'next';
import Template from '@/components/portal/templates/solutions';
export const metadata: Metadata = {
  title: '解决方案｜建筑数字工法与幕墙技术服务',
  description:
    '从招投标、施工深化、异形专项到竣工结算，了解彼慕智造的幕墙全过程技术服务与数字孪生定制方向。',
  alternates: { canonical: '/solutions' },
};
export default function Page() {
  return <Template />;
}
