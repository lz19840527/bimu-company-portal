import ts from 'typescript';
import { readFileSync, writeFileSync, mkdirSync, readdirSync } from 'node:fs';
import path from 'node:path';
const files = [];
function scan(dir) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) scan(p);
    else if (p.endsWith('page.tsx') || dir === 'components/portal')
      files.push(p);
  }
}
scan('app');
scan('components/portal');
files.push('lib/products.ts', 'lib/projects.ts');
const all = new Map();
function normalize(s) {
  return s
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/([\u3400-\u9fff]) ([\u3400-\u9fff])/g, '$1$2');
}
for (const f of files) {
  const ast = ts.createSourceFile(
    f,
    readFileSync(f, 'utf8'),
    ts.ScriptTarget.Latest,
    true,
    f.endsWith('.tsx') ? ts.ScriptKind.TSX : ts.ScriptKind.TS,
  );
  function visit(n) {
    if (
      ts.isStringLiteral(n) ||
      ts.isNoSubstitutionTemplateLiteral(n) ||
      ts.isJsxText(n) ||
      ts.isTemplateHead(n) ||
      ts.isTemplateMiddle(n) ||
      ts.isTemplateTail(n)
    ) {
      const s = normalize(n.text);
      if (/[\u3400-\u9fff]/.test(s)) {
        if (!all.has(s)) all.set(s, []);
        all.get(s).push(f);
      }
    }
    ts.forEachChild(n, visit);
  }
  visit(ast);
}
mkdirSync('output/localization', { recursive: true });
const rows = [...all].map(([zh, files]) => ({
  zh,
  files: [...new Set(files)],
}));
writeFileSync(
  'output/localization/strings.json',
  JSON.stringify(rows, null, 2),
);
const products = rows.filter((r) => r.files.includes('lib/products.ts'));
const projects = rows.filter((r) => r.files.includes('lib/projects.ts'));
const common = rows.filter(
  (r) => !products.includes(r) && !projects.includes(r),
);
for (const [name, data] of Object.entries({ products, projects, common }))
  writeFileSync(
    `output/localization/${name}-strings.json`,
    JSON.stringify(data, null, 2),
  );
console.log(
  JSON.stringify({
    total: rows.length,
    products: products.length,
    projects: projects.length,
    common: common.length,
  }),
);
