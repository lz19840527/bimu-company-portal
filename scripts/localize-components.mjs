import ts from 'typescript';
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
const files = [];
function scan(dir) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) scan(p);
    else if (p.endsWith('.tsx') && !p.endsWith('locale.tsx')) files.push(p);
  }
}
scan('components/portal');
files.push('app/not-found.tsx');
for (const file of files) {
  let code = readFileSync(file, 'utf8');
  if (code.includes('import {Localized}')) continue;
  const ast = ts.createSourceFile(
    file,
    code,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX,
  );
  const edits = [];
  function jsx(n) {
    while (ts.isParenthesizedExpression(n)) n = n.expression;
    return (
      ts.isJsxElement(n) || ts.isJsxSelfClosingElement(n) || ts.isJsxFragment(n)
    );
  }
  function walk(n) {
    if (
      ts.isFunctionDeclaration(n) &&
      n.name &&
      /^[A-Z]/.test(n.name.text) &&
      n.body
    ) {
      function returns(x) {
        if (x !== n.body && ts.isFunctionLike(x)) return;
        if (ts.isReturnStatement(x) && x.expression && jsx(x.expression)) {
          edits.push({
            a: x.expression.getStart(ast),
            b: x.expression.getEnd(),
            value: '<Localized>{' + x.expression.getText(ast) + '}</Localized>',
          });
          return;
        }
        ts.forEachChild(x, returns);
      }
      returns(n.body);
    }
    ts.forEachChild(n, walk);
  }
  walk(ast);
  for (const e of edits.sort((a, b) => b.a - a.a))
    code = code.slice(0, e.a) + e.value + code.slice(e.b);
  if (edits.length) {
    code = code.replace(/^\s*['"]use client['"];\s*/, '');
    code =
      "'use client';\nimport {Localized} from '@/components/portal/locale';\n" +
      code;
    writeFileSync(file, code);
    console.log(file, edits.length);
  }
}
