'use client';
import { Localized } from '@/components/portal/locale';
import { PageHero } from '@/components/portal/ui';
import ContactComposer from '@/components/portal/contact-composer';

export default function ContactPage() {
  return (
    <Localized>
      {
        <main id="main-content">
          <PageHero
            eyebrow="CONTACT / 联系彼慕"
            title="从一次专业的对话开始。"
            description="告诉我们你的项目、工作场景或产品需求，一起明确下一步。"
          />
          <ContactComposer />
        </main>
      }
    </Localized>
  );
}
