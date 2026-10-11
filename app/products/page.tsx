import type { Metadata } from 'next';
import Template from '@/components/portal/templates/products';
export const metadata = {
  alternates: { canonical: '/products' },
  title: '数字产品｜BCDT · BCDC · BCV',
  description:
    '了解彼慕智造 BCDT 幕墙设计工具、BCDC 工程数据中心与 BCV 移动模型浏览器，选择适合设计、资料管理与现场核对的产品。',
};
export default function Page() {
  return <Template />;
}
