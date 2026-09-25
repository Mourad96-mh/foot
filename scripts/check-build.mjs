// Post-build QA: dictionary parity + per-page SEO checks on out/.
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import ar from '../i18n/ar.js';
import fr from '../i18n/fr.js';
import en from '../i18n/en.js';
import es from '../i18n/es.js';

let problems = 0;
const fail = (msg) => { problems++; console.log('  ✗', msg); };

// 1. Same keys (and same array lengths) in all dictionaries.
const shape = (o, p = '') =>
  Array.isArray(o) ? [`${p}[${o.length}]`, ...o.flatMap((v, i) => shape(v, `${p}[${i}]`))]
  : o && typeof o === 'object' ? Object.entries(o).flatMap(([k, v]) => shape(v, p ? `${p}.${k}` : k))
  : [p];
const base = new Set(shape(en));
for (const [name, d] of [['ar', ar], ['fr', fr], ['es', es]]) {
  const s = new Set(shape(d));
  for (const k of base) if (!s.has(k)) fail(`${name} missing ${k}`);
  for (const k of s) if (!base.has(k)) fail(`${name} extra ${k}`);
}
console.log(`dictionaries: ${base.size} keys checked`);

// 2. Built pages.
const walk = (d) => readdirSync(d).flatMap((f) => (statSync(join(d, f)).isDirectory() ? walk(join(d, f)) : [join(d, f)]));
const pages = walk('out').filter((f) => f.endsWith('index.html') && /^out[\\/](ar|fr|en|es)[\\/]/.test(f));
const decode = (s) => s.replace(/&#x27;|&#39;/g, "'").replace(/&amp;/g, '&').replace(/&quot;/g, '"');
const titles = new Map();
for (const f of pages) {
  const html = readFileSync(f, 'utf8');
  const head = html.slice(0, html.indexOf('</head>'));
  const title = decode((head.match(/<title[^>]*>([^<]*)<\/title>/) || [])[1] || '');
  const desc = decode((head.match(/<meta name="description" content="([^"]*)"/) || [])[1] || '');
  const h1 = (html.match(/<h1[\s>]/g) || []).length;
  const canon = (head.match(/<link rel="canonical" href="([^"]*)"/) || [])[1];
  const alts = (head.match(/hrefLang="[^"]+"/g) || []).length;
  const lang = (html.match(/<html lang="([^"]+)" dir="([^"]+)"/) || []).slice(1).join('/');
  const ld = (html.match(/application\/ld\+json/g) || []).length;
  const rel = f.split('\\').join('/');
  if (!title) fail(`${rel}: no title`);
  if (titles.has(title)) fail(`${rel}: duplicate title with ${titles.get(title)}`);
  titles.set(title, rel);
  if (title.length > 70) fail(`${rel}: title ${title.length} chars`);
  if (desc.length < 70 || desc.length > 170) fail(`${rel}: description ${desc.length} chars`);
  if (h1 !== 1) fail(`${rel}: ${h1} h1`);
  if (!canon) fail(`${rel}: no canonical`);
  if (alts !== 5) fail(`${rel}: ${alts} hreflang`);
  if (!lang) fail(`${rel}: no lang/dir`);
  if (ld < 1) fail(`${rel}: no JSON-LD`);
  if (!/og:image/.test(head)) fail(`${rel}: no og:image`);
  console.log(`${rel.padEnd(34)} ${String(title.length).padStart(3)}t ${String(desc.length).padStart(3)}d h1=${h1} ${lang} ${canon}`);
}

// 3. 404: a single <html>, and styles present.
const nf = readFileSync('out/404.html', 'utf8');
const htmlTags = (nf.match(/<html/g) || []).length;
console.log(`404.html: ${htmlTags} <html>, stylesheet=${/rel="stylesheet"/.test(nf)}`);
if (htmlTags !== 1) fail('404 has nested <html>');

console.log(problems ? `\n${problems} problem(s)` : '\nall checks passed');
process.exit(problems ? 1 : 0);
