import { createRequire } from 'node:module';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
const require = createRequire(import.meta.url);
const { chromium } = require(
  process.env.PLAYWRIGHT_PACKAGE ||
    'C:/Users/Administrator/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright',
);
const origin = process.env.BASE_URL || 'http://127.0.0.1:3000';
const folder = path.resolve('output/implementation');
const temp = path.resolve('.sites-runtime/browser-tmp');
await mkdir(temp, { recursive: true });
process.env.TEMP = temp;
process.env.TMP = temp;
const browser = await chromium.launch({ headless: true });
const results = [];
const errors = [];
async function test(name, action) {
  try {
    await action();
    results.push({ name, ok: true });
  } catch (e) {
    errors.push({ name, message: e.message });
    results.push({ name, ok: false });
  }
}
try {
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    reducedMotion: 'reduce',
  });
  const page = await context.newPage();
  page.on('pageerror', (e) =>
    errors.push({ name: 'runtime', message: e.message }),
  );
  await test('mobile menu keyboard focus and escape', async () => {
    await page.goto(origin, { waitUntil: 'networkidle' });
    const toggle = page.getByRole('button', { name: '打开导航' });
    await toggle.focus();
    await page.keyboard.press('Enter');
    await page.waitForFunction(
      () =>
        document.activeElement === document.querySelector('#main-navigation a'),
    );
    assert.equal(await page.locator('#main-navigation').isVisible(), true);
    await page.keyboard.press('Escape');
    assert.equal(
      await page
        .getByRole('button', { name: '打开导航' })
        .getAttribute('aria-expanded'),
      'false',
    );
    assert.equal(
      await page.evaluate(() => document.activeElement?.className),
      'menu-toggle',
    );
  });
  await test('case filters return matching results', async () => {
    await page.goto(origin + '/projects', { waitUntil: 'networkidle' });
    assert.equal(await page.locator('.project-card').count(), 34);
    await page.getByRole('button', { name: '文化公共', exact: true }).click();
    assert.equal(await page.locator('.project-card').count(), 7);
    await page.getByRole('button', { name: '交通建筑', exact: true }).click();
    assert.equal(await page.locator('.project-card').count(), 1);
    assert.match(await page.locator('.project-card').innerText(), /深圳机场/);
  });
  await test('trial intent, copy refresh, clipboard failure fallback', async () => {
    await page.goto(origin + '/contact?intent=trial&product=BCV', {
      waitUntil: 'networkidle',
    });
    assert.equal(await page.locator('#contact-intent').inputValue(), 'trial');
    assert.equal(await page.locator('#contact-product').inputValue(), 'BCV');
    await page.evaluate(() =>
      Object.defineProperty(navigator, 'clipboard', {
        configurable: true,
        value: {
          writeText: async (text) => {
            window.__testCopied = text;
          },
        },
      }),
    );
    await page
      .locator('#contact-message')
      .fill('希望了解移动端模型剖切与现场测量功能。');
    await page.locator('#contact-name').fill('测试人员');
    await page
      .getByRole('button', { name: '复制需求内容', exact: true })
      .click();
    assert.equal(
      await page
        .getByRole('button', { name: '已复制需求', exact: true })
        .count(),
      1,
    );
    assert.match(
      await page.evaluate(() => window.__testCopied),
      /BCV 内测申请/,
    );
    await page.locator('#contact-company').fill('独立测试夹具');
    assert.equal(
      await page
        .getByRole('button', { name: '复制需求内容', exact: true })
        .count(),
      1,
    );
    await page.evaluate(() =>
      Object.defineProperty(navigator, 'clipboard', {
        configurable: true,
        value: {
          writeText: async () => {
            throw new Error('fixture-denied');
          },
        },
      }),
    );
    await page
      .getByRole('button', { name: '复制需求内容', exact: true })
      .click();
    assert.equal(await page.locator('#copy-body').isVisible(), true);
    assert.match(await page.locator('#copy-body').inputValue(), /独立测试夹具/);
  });
  await test('video controls receive focus and playback starts', async () => {
    await page.goto(origin + '/resources', { waitUntil: 'networkidle' });
    assert.equal(
      await page.locator('video').first().getAttribute('preload'),
      'none',
    );
    await page
      .getByRole('button', { name: '播放彼慕智造公司宣传片', exact: true })
      .click();
    await page.waitForFunction(
      () => document.querySelector('video')?.currentTime > 0,
      {},
      { timeout: 15000 },
    );
    assert.equal(
      await page.evaluate(() => document.activeElement?.tagName),
      'VIDEO',
    );
    assert.ok(
      await page
        .locator('video')
        .first()
        .evaluate((v) => Math.abs(v.duration - 200) < 0.1),
    );
    await page
      .locator('video')
      .first()
      .evaluate((v) => v.pause());
  });
  await test('English portfolio search, categories and detail links', async () => {
    await page.goto(origin + '/en/projects', { waitUntil: 'networkidle' });
    assert.equal(await page.locator('.project-card').count(), 34);
    await page
      .getByRole('button', { name: 'Culture and Civic', exact: true })
      .click();
    assert.equal(await page.locator('.project-card').count(), 7);
    await page.locator('.filter-button').first().click();
    await page.locator('#portfolio-query').fill('Deqing');
    assert.equal(await page.locator('.project-card').count(), 1);
    assert.equal(
      await page.locator('.project-card').getAttribute('href'),
      '/en/projects/deqing',
    );
    await page.locator('#portfolio-query').fill('深圳');
    assert.equal(await page.locator('.project-card').count(), 1);
    assert.match(await page.locator('.project-card').innerText(), /Shenzhen/);
    await page.locator('#portfolio-query').fill('no-such-project-987');
    assert.equal(await page.locator('.project-card').count(), 0);
    assert.equal(await page.locator('.portfolio-empty').isVisible(), true);
    await page
      .getByRole('button', { name: 'Clear search', exact: true })
      .click();
    assert.equal(await page.locator('.project-card').count(), 34);
  });
  await test('language switch preserves route, intent and anchor', async () => {
    await page.goto(origin + '/contact?intent=trial&product=BCV#main-content', {
      waitUntil: 'networkidle',
    });
    await page.locator('.language-switch a[hreflang="en"]').click();
    await page.waitForURL(
      '**/en/contact?intent=trial&product=BCV#main-content',
    );
    await page.waitForFunction(
      () => document.querySelector('#contact-intent')?.value === 'trial',
    );
    assert.equal(await page.locator('html').getAttribute('lang'), 'en');
    assert.equal(await page.locator('#contact-intent').inputValue(), 'trial');
    assert.equal(await page.locator('#contact-product').inputValue(), 'BCV');
    await page.evaluate(() =>
      Object.defineProperty(navigator, 'clipboard', {
        configurable: true,
        value: {
          writeText: async (text) => {
            window.__testCopied = text;
          },
        },
      }),
    );
    await page.locator('#contact-name').fill('测试人员');
    await page
      .locator('#contact-message')
      .fill('English and 中文 input preserved.');
    await page
      .getByRole('button', { name: 'Copy enquiry', exact: true })
      .click();
    const body = await page.evaluate(() => window.__testCopied);
    assert.match(body, /Enquiry type.*BCV beta application/);
    assert.match(body, /Name.*测试人员/);
    assert.match(body, /English and 中文 input preserved\./);
    await page.locator('.language-switch a[hreflang="zh-CN"]').click();
    await page.waitForURL('**/contact?intent=trial&product=BCV#main-content');
    assert.equal(await page.locator('html').getAttribute('lang'), 'zh-CN');
  });
  await test('BCDC platform links use the authorized address', async () => {
    await page.goto(origin + '/en/products/bcdc', { waitUntil: 'networkidle' });
    const links = page.locator('a[href="http://146.56.217.147:5556/"]');
    assert.equal(await links.count(), 3);
    assert.equal(
      await page.locator('a.platform-link').getAttribute('target'),
      '_blank',
    );
  });
  await test('unknown English route is localized and has HTTP 404', async () => {
    const response = await page.goto(origin + '/en/page-that-does-not-exist', {
      waitUntil: 'networkidle',
    });
    assert.equal(response.status(), 404);
    assert.equal(await page.locator('html').getAttribute('lang'), 'en');
    assert.match(
      await page.locator('main').innerText(),
      /This page has not been built yet/,
    );
  });
  await test('unknown route has HTTP 404', async () => {
    const response = await page.request.get(
      origin + '/page-that-does-not-exist',
    );
    assert.equal(response.status(), 404);
  });
  await context.close();
} finally {
  await browser.close();
}
const report = {
  checkedAt: new Date().toISOString(),
  baseUrl: origin,
  ok: !errors.length,
  mode: 'isolated headless local tests; clipboard mocked; no emails submitted',
  results,
  errors,
};
await mkdir(folder, { recursive: true });
await writeFile(
  path.join(folder, 'interaction-checks.json'),
  JSON.stringify(report, null, 2),
);
console.log(JSON.stringify(report));
if (errors.length) process.exitCode = 1;
