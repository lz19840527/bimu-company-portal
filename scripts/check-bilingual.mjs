import { createRequire } from 'node:module';
import { readFileSync, mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';
const require = createRequire(import.meta.url);
const {
  chromium,
} = require('C:/Users/Administrator/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const base = process.env.BASE_URL || 'http://localhost:3000';
const portfolio = JSON.parse(readFileSync('lib/portfolio.json', 'utf8'));
const routes = [
  '',
  'solutions',
  'products',
  'products/bcdt',
  'products/bcdc',
  'products/bcv',
  'projects',
  'resources',
  'about',
  'contact',
  ...portfolio.map((p) => 'projects/' + p.slug),
];
const folder = path.resolve('output/localization');
mkdirSync(folder, { recursive: true });
const temp = path.resolve('.sites-runtime/browser-tmp');
mkdirSync(temp, { recursive: true });
process.env.TEMP = temp;
process.env.TMP = temp;
const browser = await chromium.launch({ headless: true });
const errors = [],
  missing = [],
  layouts = [];
try {
  const context = await browser.newContext({
    viewport: { width: 1440, height: 960 },
    reducedMotion: 'reduce',
  });
  const page = await context.newPage();
  page.on('pageerror', (e) =>
    errors.push({ url: page.url(), message: e.message }),
  );
  for (const route of routes) {
    const r = await page.goto(base + '/en' + (route ? '/' + route : ''), {
      waitUntil: 'networkidle',
    });
    const data = await page.evaluate(() => {
      const clone = document.querySelector('main')?.cloneNode(true);
      clone?.querySelectorAll('script,style').forEach((e) => e.remove());
      return {
        lang: document.documentElement.lang,
        text: clone?.textContent || '',
        overflow: document.documentElement.scrollWidth > innerWidth + 1,
        title: document.title,
      };
    });
    const han =
      data.text.match(/[^\n<>]{0,80}[\u3400-\u9fff][^\n<>]{0,100}/g) || [];
    if (han.length) missing.push({ route, strings: han });
    if (r.status() !== 200 || data.lang !== 'en' || data.overflow)
      errors.push({ route, status: r.status(), ...data, text: undefined });
    layouts.push({
      route,
      lang: data.lang,
      title: data.title,
      overflow: data.overflow,
    });
    if (['', 'projects', 'products/bcdc', 'contact'].includes(route))
      await page.screenshot({
        path: path.join(
          folder,
          'en-' + (route || 'home').replaceAll('/', '-') + '.jpg',
        ),
        type: 'jpeg',
        quality: 80,
        fullPage: true,
      });
  }
  await page.setViewportSize({ width: 390, height: 844 });
  for (const route of ['', 'projects', 'products/bcdc', 'contact']) {
    await page.goto(base + '/en' + (route ? '/' + route : ''), {
      waitUntil: 'networkidle',
    });
    const w = await page.evaluate(() => ({
      width: innerWidth,
      scroll: document.documentElement.scrollWidth,
    }));
    if (w.scroll > w.width + 1) errors.push({ route, mobile: true, ...w });
    await page.screenshot({
      path: path.join(
        folder,
        'en-mobile-' + (route || 'home').replaceAll('/', '-') + '.jpg',
      ),
      type: 'jpeg',
      quality: 80,
      fullPage: true,
    });
  }
  await context.close();
} finally {
  await browser.close();
}
const result = {
  ok: errors.length === 0 && missing.length === 0,
  checkedAt: new Date().toISOString(),
  routes: routes.length,
  portfolioProjects: portfolio.length,
  portfolioImages: portfolio.flatMap((p) => p.images).length,
  errors,
  missing,
  layouts,
};
writeFileSync(
  path.join(folder, 'bilingual-checks.json'),
  JSON.stringify(result, null, 2),
);
console.log(
  JSON.stringify({
    ok: result.ok,
    routes: routes.length,
    errors,
    missing: missing.slice(0, 12),
  }),
);
if (!result.ok) process.exitCode = 1;
