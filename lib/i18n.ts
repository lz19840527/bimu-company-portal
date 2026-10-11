import common from './translations/common.en.json';
import product from './translations/products.en.json';
import projects from './translations/projects.en.json';
import extra from './translations/extra.en.json';
export type Locale = 'zh' | 'en';
export const messages: Record<string, string> = {
  ...product,
  ...projects,
  ...common,
  ...extra,
};
export function normalizeText(value: string) {
  return value
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/([\u3400-\u9fff]) ([\u3400-\u9fff])/g, '$1$2');
}
const replacements = Object.entries(messages)
  .filter(([key]) => /[\u3400-\u9fff]/.test(key) && key.length > 1)
  .sort((a, b) => b[0].length - a[0].length);
export function translateText(value: string, locale: Locale): string {
  if (locale === 'zh' || !/[\u3400-\u9fff]/.test(value)) return value;
  const normalized = normalizeText(value);
  const direct = messages[normalized] ?? messages[value];
  if (direct) return direct;
  let out = value;
  for (const [zh, en] of replacements)
    if (out.includes(zh)) out = out.split(zh).join(en);
  return out
    .replace(/，/g, ', ')
    .replace(/。/g, '.')
    .replace(/：/g, ': ')
    .replace(/；/g, '; ');
}
export function localePath(href: string, locale: Locale) {
  if (
    !href.startsWith('/') ||
    href.startsWith('//') ||
    /^\/(?:media|images|_next|api)(?:\/|$)/.test(href) ||
    /\.[a-z0-9]+(?:[?#]|$)/i.test(href)
  )
    return href;
  const unprefixed = href.replace(/^\/en(?=\/|[?#]|$)/, '') || '/';
  return locale === 'en'
    ? unprefixed === '/'
      ? '/en'
      : '/en' + unprefixed
    : unprefixed;
}
export const BCDC_URL = 'http://146.56.217.147:5556/';
