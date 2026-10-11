'use client';
import {
  createContext,
  useContext,
  useMemo,
  cloneElement,
  isValidElement,
  Children,
  type ReactNode,
  type ReactElement,
} from 'react';
import { usePathname } from 'next/navigation';
import { translateText, localePath, type Locale } from '@/lib/i18n';
const Context = createContext<{
  locale: Locale;
  t: (s: string) => string;
  href: (s: string) => string;
}>({ locale: 'zh', t: (s) => s, href: (s) => s });
export function LocaleProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const locale: Locale = /^\/en(?:\/|$)/.test(pathname) ? 'en' : 'zh';
  const value = useMemo(
    () => ({
      locale,
      t: (s: string) => translateText(s, locale),
      href: (s: string) => localePath(s, locale),
    }),
    [locale],
  );
  return <Context.Provider value={value}>{children}</Context.Provider>;
}
export function useLocale() {
  return useContext(Context);
}
const attributes = [
  'alt',
  'title',
  'description',
  'eyebrow',
  'placeholder',
  'aria-label',
  'aria-description',
  'label',
  'recorded',
];
export function Localized({ children }: { children: ReactNode }) {
  const { locale, t, href } = useLocale();
  if (locale === 'zh') return children;
  function visit(node: ReactNode): ReactNode {
    if (typeof node === 'string') return t(node);
    if (Array.isArray(node)) return Children.map(node, visit);
    if (!isValidElement(node)) return node;
    const element = node as ReactElement<Record<string, unknown>>;
    const p = element.props;
    const next: Record<string, unknown> = {};
    for (const key of attributes)
      if (typeof p[key] === 'string') next[key] = t(p[key] as string);
    if (typeof p.href === 'string' && !p['data-language-switch'])
      next.href = href(p.href);
    if (p.children !== undefined)
      next.children = Children.map(p.children as ReactNode, visit);
    return cloneElement(element, next);
  }
  return visit(children);
}
