#!/usr/bin/env node
// Usage: node scripts/check-site.mjs
// PowerShell: $env:BASE_URL='http://localhost:3000'; node scripts/check-site.mjs
// HTTP-only checks of the rendered portal; no browser or external requests.
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

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
const outputPath = fileURLToPath(
  new URL('../output/implementation/http-checks.json', import.meta.url),
);
const report = {
  checkedAt: new Date().toISOString(),
  baseUrl: process.env.BASE_URL || 'http://localhost:3000',
  ok: false,
  summary: {},
  pages: [],
  assets: [],
  errors: [],
  warnings: [],
};
const pages = new Map();
const assets = new Map();
const links = new Map();
const issueKeys = new Set();
let base;

function issue(level, code, source, detail, target) {
  const entry = { code, source, detail, ...(target ? { target } : {}) };
  const key = JSON.stringify([level, entry]);
  if (!issueKeys.has(key)) {
    issueKeys.add(key);
    report[level].push(entry);
  }
}

function label(value) {
  const url = new URL(value, base);
  return url.origin === base.origin
    ? `${url.pathname}${url.search}${url.hash}`
    : url.href;
}

function decodeEntities(value) {
  const named = { amp: '&', quot: '"', apos: "'", lt: '<', gt: '>', nbsp: ' ' };
  return value.replace(
    /&(#x[\da-f]+|#\d+|amp|quot|apos|lt|gt|nbsp);/gi,
    (entity, key) => {
      if (!key.startsWith('#')) return named[key.toLowerCase()];
      const numeric =
        key[1].toLowerCase() === 'x'
          ? parseInt(key.slice(2), 16)
          : Number(key.slice(1));
      return numeric > 0 && numeric <= 0x10ffff
        ? String.fromCodePoint(numeric)
        : entity;
    },
  );
}

function attrs(tag) {
  const values = {};
  const body = tag.replace(/^<\/?[\w:-]+/, '').replace(/\/?\s*>$/, '');
  for (const match of body.matchAll(
    /([^\s=/>]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+)))?/g,
  )) {
    values[match[1].toLowerCase()] = decodeEntities(
      match[2] ?? match[3] ?? match[4] ?? '',
    );
  }
  return values;
}

function privateHost(host) {
  const name = host
    .toLowerCase()
    .replace(/^\[|\]$/g, '')
    .replace(/\.$/, '');
  if (
    name === 'localhost' ||
    name.endsWith('.localhost') ||
    name.endsWith('.local')
  )
    return true;
  if (
    name === '::' ||
    name === '::1' ||
    /^(?:fc|fd)[\da-f]{2}:|^fe[89ab][\da-f]:/.test(name)
  )
    return true;
  if (name.startsWith('::ffff:')) return privateHost(name.slice(7));
  const parts = name.split('.').map(Number);
  if (
    parts.length !== 4 ||
    parts.some((part) => !Number.isInteger(part) || part < 0 || part > 255)
  )
    return false;
  const [a, b] = parts;
  return (
    a === 0 ||
    a === 10 ||
    a === 127 ||
    (a === 169 && b === 254) ||
    (a === 172 && b >= 16 && b <= 31) ||
    (a === 192 && b === 168) ||
    (a === 100 && b >= 64 && b <= 127)
  );
}

function resolveReference(raw, pageUrl) {
  const value = raw.trim();
  let decoded = value;
  try {
    decoded = decodeURIComponent(value);
  } catch {
    /* URL parsing reports malformed references below. */
  }
  if (
    /^(?:file:|[a-z]:[\\/]|\\\\)/i.test(decoded) ||
    /(?:^|\/)[a-z]:[\\/]/i.test(decoded) ||
    /^\/(?:Users|home|mnt|Volumes)\//i.test(decoded)
  ) {
    issue(
      'errors',
      'local_path',
      label(pageUrl),
      'A rendered URL contains a local filesystem path.',
      value,
    );
    return null;
  }
  if (/^(?:mailto:|tel:|data:|blob:)/i.test(value)) return null;
  let url;
  try {
    url = new URL(value, pageUrl);
  } catch {
    issue(
      'errors',
      'invalid_url',
      label(pageUrl),
      'A rendered URL cannot be parsed.',
      value,
    );
    return null;
  }
  // Check explicit hosts before excluding external links. Relative localhost URLs are expected in local checks.
  if (/^(?:https?:)?\/\//i.test(value) && privateHost(url.hostname)) {
    issue(
      'errors',
      'internal_test_host',
      label(pageUrl),
      'A rendered URL exposes a local or private test host.',
      value,
    );
    return null;
  }
  if (!['http:', 'https:'].includes(url.protocol)) {
    issue(
      'errors',
      'unsupported_url',
      label(pageUrl),
      `Unexpected URL protocol ${url.protocol}`,
      value,
    );
    return null;
  }
  return url.origin === base.origin ? url : null;
}

function assetKind(url) {
  const extension = extname(url.pathname).toLowerCase();
  if (
    [
      '.jpg',
      '.jpeg',
      '.png',
      '.webp',
      '.avif',
      '.gif',
      '.svg',
      '.ico',
    ].includes(extension)
  )
    return 'image';
  if (['.mp4', '.webm', '.mov', '.m4v', '.ogv'].includes(extension))
    return 'video';
  if (['.mp3', '.m4a', '.wav', '.ogg', '.flac'].includes(extension))
    return 'audio';
  if (extension === '.vtt') return 'captions';
  if (extension === '.pdf') return 'pdf';
  return null;
}

function addAsset(url, kind, source) {
  url.hash = '';
  const key = url.href;
  if (!assets.has(key))
    assets.set(key, { url: key, kinds: new Set(), sources: new Set() });
  assets.get(key).kinds.add(kind);
  assets.get(key).sources.add(source);
}

async function request(url, options = {}) {
  let current = new URL(url);
  for (let redirects = 0; redirects <= 5; redirects += 1) {
    const response = await fetch(current, {
      ...options,
      redirect: 'manual',
      signal: AbortSignal.timeout(15000),
      headers: {
        'User-Agent': 'BIMU-Portal-HTTP-Check/1.0',
        ...options.headers,
      },
    });
    if (![301, 302, 303, 307, 308].includes(response.status)) return response;
    const location = response.headers.get('location');
    await response.body?.cancel();
    if (!location)
      throw new Error(
        `HTTP ${response.status} redirect has no Location header`,
      );
    current = new URL(location, current);
    if (current.origin !== base.origin)
      throw new Error(
        `Internal URL redirects to a different origin: ${current.origin}`,
      );
  }
  throw new Error('More than five redirects');
}

async function readText(response, limit = 4 * 1024 * 1024) {
  if (!response.body) return '';
  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let size = 0;
  let text = '';
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > limit) {
      await reader.cancel();
      throw new Error(`Text response exceeds ${limit} bytes`);
    }
    text += decoder.decode(value, { stream: true });
  }
  return text + decoder.decode();
}

function inspectHtml(html, pageUrl) {
  // React's serialized payload can contain markup-looking strings. Only inspect actual document tags.
  const document = html
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1\s*>/gi, '');
  const tags = [
    ...document.matchAll(/<\/?[a-z][\w:-]*\b(?:"[^"]*"|'[^']*'|[^'">])*>/gi),
  ].map(([raw]) => ({
    raw,
    name: raw.match(/^<\/?([\w:-]+)/)[1].toLowerCase(),
    closing: raw.startsWith('</'),
    attributes: attrs(raw),
  }));
  const opening = tags.filter((tag) => !tag.closing);
  const ids = new Set(opening.map((tag) => tag.attributes.id).filter(Boolean));
  for (const tag of opening)
    if (tag.name === 'a' && tag.attributes.name) ids.add(tag.attributes.name);
  const source = label(pageUrl);
  const mainCount = opening.filter((tag) => tag.name === 'main').length;
  const mainContentCount = opening.filter(
    (tag) => tag.name === 'main' && tag.attributes.id === 'main-content',
  ).length;
  const h1Count = opening.filter((tag) => tag.name === 'h1').length;
  const titles = [
    ...document.matchAll(/<title\b[^>]*>([\s\S]*?)<\/title\s*>/gi),
  ].map((match) => decodeEntities(match[1]).trim());
  const descriptions = opening
    .filter(
      (tag) =>
        tag.name === 'meta' &&
        tag.attributes.name?.toLowerCase() === 'description',
    )
    .map((tag) => tag.attributes.content?.trim() || '');
  if (mainCount !== 1 || mainContentCount !== 1)
    issue(
      'errors',
      'main_landmark',
      source,
      `Expected one main#main-content; found ${mainCount} main and ${mainContentCount} matching landmarks.`,
    );
  if (h1Count !== 1)
    issue('errors', 'h1_count', source, `Expected one h1; found ${h1Count}.`);
  if (titles.length !== 1 || !titles[0])
    issue('errors', 'page_title', source, 'Expected one nonempty title.');
  if (descriptions.length !== 1 || !descriptions[0])
    issue(
      'errors',
      'page_description',
      source,
      'Expected one nonempty description meta tag.',
    );

  let mediaKind = null;
  let mediaCount = 0;
  for (const tag of tags) {
    const { name, attributes: attributes } = tag;
    if (tag.closing) {
      if (name === 'video' || name === 'audio') mediaKind = null;
      continue;
    }
    if (name === 'video' || name === 'audio') {
      mediaKind = name;
      mediaCount += 1;
      if (attributes.preload?.toLowerCase() !== 'none')
        issue(
          'errors',
          'media_preload',
          source,
          `${name} must explicitly use preload="none".`,
        );
    }
    for (const attribute of ['href', 'src', 'poster', 'action', 'formaction']) {
      if (!(attribute in attributes)) continue;
      const url = resolveReference(attributes[attribute], pageUrl);
      if (!url) continue;
      let kind = assetKind(url);
      if (attribute === 'poster') kind = 'poster';
      else if (name === 'img') kind = 'image';
      else if (name === 'track') kind = 'captions';
      else if (name === 'video' || name === 'audio') kind = name;
      else if (name === 'source' && mediaKind) kind = mediaKind;
      else if (
        name === 'link' &&
        /(?:^|\s)(?:icon|apple-touch-icon)(?:\s|$)/.test(attributes.rel || '')
      )
        kind = 'image';
      if (kind) addAsset(url, kind, source);
      else if (attribute === 'href' && (name === 'a' || name === 'area')) {
        const key = `${source}\n${url.href}`;
        links.set(key, { source, url: url.href });
      }
    }
    for (const attribute of ['srcset', 'imagesrcset']) {
      if (
        !attributes[attribute] ||
        attributes[attribute].trim().startsWith('data:')
      )
        continue;
      for (const candidate of attributes[attribute].split(',')) {
        const value = candidate.trim().split(/\s+/)[0];
        if (!value) continue;
        const url = resolveReference(value, pageUrl);
        if (url) addAsset(url, 'image', source);
      }
    }
    for (const match of (attributes.style || '').matchAll(
      /url\(\s*["']?([^"')]+)["']?\s*\)/gi,
    )) {
      const url = resolveReference(match[1], pageUrl);
      if (url) addAsset(url, 'image', source);
    }
  }
  return {
    ids,
    title: titles[0] || '',
    description: descriptions[0] || '',
    mainCount,
    mainContentCount,
    h1Count,
    mediaCount,
  };
}

async function checkPage(url) {
  const pageUrl = new URL(url);
  pageUrl.hash = '';
  const key = pageUrl.href;
  if (pages.has(key)) return pages.get(key);
  const result = { url: label(key), status: null };
  pages.set(key, result);
  try {
    const response = await request(key);
    result.status = response.status;
    if (response.status !== 200)
      issue(
        'errors',
        'page_status',
        result.url,
        `Expected HTTP 200; received ${response.status}.`,
      );
    if (
      !response.headers.get('content-type')?.toLowerCase().includes('text/html')
    ) {
      await response.body?.cancel();
      issue(
        'errors',
        'page_content_type',
        result.url,
        'Expected text/html for an internal page.',
      );
      return result;
    }
    Object.assign(
      result,
      inspectHtml(await readText(response), response.url || key),
    );
  } catch (error) {
    result.requestFailed = true;
    issue('errors', 'page_request_failed', result.url, error.message);
  }
  return result;
}

async function parallel(items, fn, concurrency = 4) {
  let next = 0;
  await Promise.all(
    Array.from({ length: Math.min(concurrency, items.length) }, async () => {
      while (next < items.length) {
        const index = next++;
        await fn(items[index]);
      }
    }),
  );
}

function inspectVtt(text) {
  const normalized = text.replace(/^\uFEFF/, '').replace(/\r\n?/g, '\n');
  if (
    !/^WEBVTT(?:[ \t][^\n]*)?\n/.test(normalized) ||
    normalized.split('\n')[0].includes('-->')
  )
    throw new Error('Missing or invalid WEBVTT header.');
  const blocks = normalized.split(/\n[ \t]*\n+/);
  if (blocks.length < 2 || blocks[0].includes('-->'))
    throw new Error('Expected a blank line after the WEBVTT header.');
  let cueCount = 0;
  let previousStart = -1;
  let duration = 0;
  function seconds(timestamp) {
    if (!/^(?:\d{2,}:)?[0-5]\d:[0-5]\d\.\d{3}$/.test(timestamp))
      throw new Error(`Invalid cue timestamp: ${timestamp}`);
    const parts = timestamp.split(':').map(Number);
    return parts.reduce((value, part) => value * 60 + part, 0);
  }
  for (const block of blocks.slice(1)) {
    if (
      !block.trim() ||
      /^(?:NOTE(?:[ \t\n]|$)|STYLE(?:\n|$)|REGION(?:\n|$))/.test(block)
    )
      continue;
    const lines = block.split('\n');
    if (!lines[0].includes('-->')) lines.shift();
    const timing = lines.shift()?.match(/^(\S+)\s+-->\s+(\S+)(?:[ \t]+.*)?$/);
    if (!timing)
      throw new Error(`Cue ${cueCount + 1} has no valid timing line.`);
    const start = seconds(timing[1]);
    const end = seconds(timing[2]);
    if (end <= start || start < previousStart)
      throw new Error(`Cue ${cueCount + 1} has invalid timing order.`);
    if (!lines.join('\n').trim() || lines.join('\n').includes('-->'))
      throw new Error(`Cue ${cueCount + 1} has an empty or invalid payload.`);
    previousStart = start;
    duration = Math.max(duration, end);
    cueCount += 1;
  }
  if (!cueCount) throw new Error('The subtitle file contains no cues.');
  return { cueCount, durationSeconds: Number(duration.toFixed(3)) };
}

async function checkAsset(asset) {
  const result = {
    url: label(asset.url),
    kinds: [...asset.kinds].sort(),
    status: null,
  };
  report.assets.push(result);
  try {
    const response = await request(asset.url, { method: 'HEAD' });
    result.status = response.status;
    result.contentType = response.headers.get('content-type') || '';
    const length = response.headers.get('content-length');
    if (length !== null) result.bytes = Number(length);
    if (response.status !== 200) {
      issue(
        'errors',
        'asset_status',
        [...asset.sources].join(', '),
        `HEAD expected HTTP 200; received ${response.status}.`,
        result.url,
      );
      return;
    }
    if (/text\/html/i.test(result.contentType) || result.bytes === 0)
      issue(
        'errors',
        'asset_invalid_response',
        result.url,
        'The asset is empty or returned HTML instead of media.',
      );
    if (asset.kinds.has('captions')) {
      const captions = await request(asset.url);
      if (captions.status !== 200) {
        await captions.body?.cancel();
        throw new Error(`Subtitle GET returned HTTP ${captions.status}`);
      }
      try {
        result.vtt = inspectVtt(await readText(captions, 1024 * 1024));
      } catch (error) {
        issue('errors', 'invalid_vtt', result.url, error.message);
      }
    }
    if (asset.kinds.has('video')) {
      try {
        const range = await request(asset.url, {
          headers: { Range: 'bytes=0-1' },
        });
        const contentRange = range.headers.get('content-range') || '';
        result.range = {
          status: range.status,
          supported:
            range.status === 206 && /^bytes 0-1\/\d+$/.test(contentRange),
        };
        await range.body?.cancel(); // Never download the full movie when a server ignores Range.
        if (!result.range.supported)
          issue(
            'warnings',
            'video_range_not_supported',
            result.url,
            `Range bytes=0-1 returned HTTP ${range.status} with Content-Range ${contentRange || '(missing)'}.`,
          );
      } catch (error) {
        result.range = { supported: false };
        issue(
          'warnings',
          'video_range_request_failed',
          result.url,
          error.message,
        );
      }
    }
  } catch (error) {
    issue(
      'errors',
      'asset_request_failed',
      [...asset.sources].join(', '),
      error.message,
      result.url,
    );
  }
}

async function run() {
  base = new URL(report.baseUrl);
  if (
    !['http:', 'https:'].includes(base.protocol) ||
    base.username ||
    base.password
  )
    throw new Error(
      'BASE_URL must be an HTTP(S) URL without embedded credentials.',
    );
  base = new URL(base.origin);
  report.baseUrl = base.origin;
  // Fail promptly if there is no server, instead of issuing thirteen redundant connection attempts.
  const home = await checkPage(new URL('/', base));
  if (home.requestFailed) return;
  await parallel(routes.slice(1), (route) => checkPage(new URL(route, base)));
  while (true) {
    const missing = [
      ...new Set(
        [...links.values()].map((link) => {
          const url = new URL(link.url);
          url.hash = '';
          return url.href;
        }),
      ),
    ].filter((url) => !pages.has(url));
    if (!missing.length) break;
    if (pages.size + missing.length > 100) {
      issue(
        'errors',
        'crawl_limit',
        '/',
        'Internal links exceed the 100-page safety limit; link validation is incomplete.',
      );
      break;
    }
    await parallel(missing, checkPage);
  }
  for (const link of links.values()) {
    const url = new URL(link.url);
    const fragment = url.hash.slice(1).split(':~:text=')[0];
    url.hash = '';
    const target = pages.get(url.href);
    if (!target || target.status !== 200 || !target.ids) {
      issue(
        'errors',
        'unreachable_internal_link',
        link.source,
        'Linked internal page did not return a valid HTML page with HTTP 200.',
        label(link.url),
      );
      continue;
    }
    let id = fragment;
    try {
      id = decodeURIComponent(fragment);
    } catch {
      /* An invalid encoded fragment cannot match a rendered ID. */
    }
    if (id && id.toLowerCase() !== 'top' && !target.ids.has(id))
      issue(
        'errors',
        'missing_fragment',
        link.source,
        `No element with id or anchor name "${id}" exists on the linked page.`,
        label(link.url),
      );
  }
  await parallel([...assets.values()], checkAsset);
}

try {
  await run();
} catch (error) {
  issue('errors', 'check_failed', 'configuration', error.message);
} finally {
  report.pages = [...pages.values()].map(
    ({ ids: _ids, requestFailed: _requestFailed, ...page }) => page,
  );
  report.assets.sort((a, b) => a.url.localeCompare(b.url));
  report.ok =
    report.errors.length === 0 &&
    routes.every(
      (route) =>
        pages.get(new URL(route, base || 'http://localhost:3000').href)
          ?.status === 200,
    );
  report.summary = {
    requiredRoutes: routes.length,
    pagesChecked: pages.size,
    internalLinksChecked: links.size,
    assetsChecked: report.assets.length,
    videoRangeSupported: report.assets.filter((asset) => asset.range?.supported)
      .length,
    videoRangeChecked: report.assets.filter((asset) => asset.range).length,
    errors: report.errors.length,
    warnings: report.warnings.length,
  };
  await mkdir(dirname(outputPath), { recursive: true });
  await writeFile(outputPath, `${JSON.stringify(report, null, 2)}\n`, 'utf8');
  console.log(
    JSON.stringify({ ok: report.ok, ...report.summary, report: outputPath }),
  );
  for (const error of report.errors)
    console.error(
      `[${error.code}] ${error.source}: ${error.detail}${error.target ? ` (${error.target})` : ''}`,
    );
  process.exitCode = report.ok ? 0 : 1;
}
