'use client';
import { Localized } from '@/components/portal/locale';
import { ActionLink } from '@/components/portal/ui';
export default function NotFound() {
  return (
    <Localized>
      {
        <main id="main-content" className="not-found container">
          <p className="eyebrow">404 / 页面未找到</p>
          <h1>这个页面还没有建筑起来。</h1>
          <p>你可以返回首页，或了解彼慕的数字产品与工程实践。</p>
          <div className="hero-actions">
            <ActionLink href="/">返回首页</ActionLink>
            <ActionLink href="/products" secondary>
              了解数字产品
            </ActionLink>
          </div>
        </main>
      }
    </Localized>
  );
}
