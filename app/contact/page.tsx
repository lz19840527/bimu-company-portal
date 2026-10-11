import type { Metadata } from 'next';
import Template from '@/components/portal/templates/contact';
export const metadata: Metadata = {
  title: '项目咨询与产品演示',
  description:
    '联系彼慕智造，沟通工程技术服务、BCDT与BCDC产品演示、BCV内测及技术支持。',
  alternates: { canonical: '/contact' },
};
export default function Page() {
  return <Template />;
}
