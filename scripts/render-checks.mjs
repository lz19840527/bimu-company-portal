import { createRequire } from 'node:module';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
const require = createRequire(import.meta.url);
const { chromium } = require(
  process.env.PLAYWRIGHT_PACKAGE ||
    'C:/Users/Administrator/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright',
);
const origin = process.env.BASE_URL || 'http://localhost:3000';
const folder = path.resolve('output/implementation/render');
await mkdir(folder, { recursive: true });
const routes = [
  '/',
  '/solutions',
  '/products',
  '/products/bcdt',
  '/products/bcdc',
  '/products/bcv',
  '/projects',
  '/projects/deqing',
  '/projects/fuyang',
  '/projects/wenling',
  '/projects/shenzhen',
  '/resources',
  '/about',
  '/contact',
];
const results = [];
const errors = [];
const browser = await chromium.launch({ headless: true });
try {
  for (const width of [1440, 390]) {
    const context = await browser.newContext({
      viewport: { width, height: 960 },
      deviceScaleFactor: 1,
      reducedMotion: 'reduce',
    });
    const page = await context.newPage();
    page.on('pageerror', (e) =>
      errors.push({ url: page.url(), message: e.message }),
    );
    for (const route of routes) {
      await page.goto(origin + route, { waitUntil: 'networkidle' });
      await page.evaluate(async () => {
        await document.fonts.ready;
        for (const img of document.images) img.loading = 'eager';
        await Promise.all(
          [...document.images].map((img) =>
            img.complete
              ? Promise.resolve()
              : Promise.race([
                  new Promise((resolve) => {
                    img.addEventListener('load', resolve, { once: true });
                    img.addEventListener('error', resolve, { once: true });
                  }),
                  new Promise((resolve) => setTimeout(resolve, 8000)),
                ]),
          ),
        );
      });
      const layout = await page.evaluate(() => ({
        width: window.innerWidth,
        scrollWidth: document.documentElement.scrollWidth,
        h1: document.querySelector('h1')?.textContent,
        missingImages: [...document.images]
          .filter((i) => i.complete && !i.naturalWidth)
          .map((i) => i.getAttribute('src')),
        videoPreloads: [...document.querySelectorAll('video')].map(
          (v) => v.preload,
        ),
        overflowElements: [
          ...document.querySelectorAll('main *,header *,footer *'),
        ]
          .filter((e) => {
            const b = e.getBoundingClientRect();
            return (
              b.width > 0 &&
              (b.left < -1 || b.right > innerWidth + 1) &&
              getComputedStyle(e).position !== 'absolute' &&
              !e.closest('.product-comparison-wrap')
            );
          })
          .slice(0, 8)
          .map((e) => ({ tag: e.tagName, class: e.className })),
      }));
      if (layout.scrollWidth > width + 1 || layout.missingImages.length)
        errors.push({ route, width, ...layout });
      results.push({ route, width, ...layout });
      if (
        ['/', '/products/bcdt', '/projects', '/resources', '/contact'].includes(
          route,
        )
      )
        await page.screenshot({
          path: path.join(
            folder,
            (route === '/' ? 'home' : route.slice(1).replaceAll('/', '-')) +
              `-${width}.jpg`,
          ),
          fullPage: true,
          type: 'jpeg',
          quality: 78,
        });
    }
    await context.close();
  }
} finally {
  await browser.close();
}
const report = {
  checkedAt: new Date().toISOString(),
  mode: 'headless local rendering; no desktop UI or form submission',
  ok: errors.length === 0,
  results,
  errors,
};
await writeFile(
  path.join(folder, 'report.json'),
  JSON.stringify(report, null, 2),
);
console.log(
  JSON.stringify({ ok: report.ok, layouts: results.length, errors, folder }),
);
if (errors.length) process.exitCode = 1;
