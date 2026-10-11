import type { Metadata } from 'next';
import { PageHero } from '@/components/portal/ui';
import ContactComposer from '@/components/portal/contact-composer';
export const metadata: Metadata = {
  title: '项目咨询与产品演示',
  description:
    '联系彼慕智造，沟通工程技术服务、BCDT与BCDC产品演示、BCV内测及技术支持。',
  alternates: { canonical: '/contact' },
};
export default function ContactPage() {
  return (
    <main id="main-content">
      <PageHero
        eyebrow="CONTACT / 联系彼慕"
        title="从一次专业的对话开始。"
        description="告诉我们你的项目、工作场景或产品需求，一起明确下一步。"
      />
      <ContactComposer />
    </main>
  );
}
