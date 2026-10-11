import type { Metadata } from 'next';
import Template from '@/components/portal/templates/resources';
export const metadata: Metadata = {
  title: '视频与资料',
  description:
    '观看彼慕智造公司宣传片与 BCDT、BCDC、BCV 真实界面演示，下载公司宣传册，了解产品适用范围。',
  alternates: { canonical: '/resources' },
};
export default function Page() {
  return <Template />;
}
