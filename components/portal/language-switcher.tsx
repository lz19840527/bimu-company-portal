'use client';
import { Localized } from '@/components/portal/locale';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { localePath } from '@/lib/i18n';
export function LanguageSwitcher() {
  const path = usePathname();
  const [query, setQuery] = useState('');
  useEffect(() => {
    setQuery(window.location.search + window.location.hash);
  }, [path]);
  const en = /^\/en(?:\/|$)/.test(path);
  return (
    <Localized>
      {
        <nav className="language-switch" aria-label="语言切换">
          <a
            href={localePath(path, 'zh') + query}
            data-language-switch="true"
            hrefLang="zh-CN"
            aria-current={!en ? 'page' : undefined}
          >
            中文
          </a>
          <span aria-hidden="true">/</span>
          <a
            href={localePath(path, 'en') + query}
            data-language-switch="true"
            hrefLang="en"
            aria-current={en ? 'page' : undefined}
          >
            EN
          </a>
        </nav>
      }
    </Localized>
  );
}
