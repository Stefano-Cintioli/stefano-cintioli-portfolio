import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { inlineScriptHashes, withHashes, withVercelHashes } from './csp.mjs';

async function htmlFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  return (await Promise.all(entries.map(entry => {
    const file = path.join(dir, entry.name);
    return entry.isDirectory() ? htmlFiles(file) : entry.name.endsWith('.html') ? [file] : [];
  }))).flat();
}

// Next's production server consumes routes-manifest. New Vercel adapters have
// already emitted output/config.json, which must also be patched. Hash actual script
// bytes (including RSC, theme bootstrap and JSON-LD) rather than weakening CSP or
// forcing dynamic, uncacheable HTML with per-request nonces.
const files = await htmlFiles('.next/server/app');
const hashes = (await Promise.all(files.map(async file => inlineScriptHashes(await readFile(file, 'utf8'))))).flat();
const manifestPath = '.next/routes-manifest.json';
const manifest = JSON.parse(await readFile(manifestPath, 'utf8'));
let updated = 0;
for (const route of manifest.headers ?? []) {
  for (const header of route.headers) {
    if (header.key.toLowerCase() === 'content-security-policy-report-only') {
      header.value = withHashes(header.value, hashes);
      updated++;
    }
  }
}
if (!updated) throw new Error('Report-only CSP not found in Next header manifest');
const adapterPath = '.next/output/config.json';
let adapter;
try {
  adapter = JSON.parse(await readFile(adapterPath, 'utf8'));
} catch (error) {
  if (error.code !== 'ENOENT') throw error;
}
if (adapter !== undefined) {
  const output = withVercelHashes(adapter, hashes);
  // The adapter copies these prerendered documents unchanged. Validate its
  // actual response files without authorizing HTML in bundled dependency docs.
  const adapterHtml = [];
  for (const [dir, filter] of [
    ['.next/output/static', () => true],
    ['.next/output/functions', file => file.endsWith('.prerender-fallback.html')],
  ]) {
    try { adapterHtml.push(...(await htmlFiles(dir)).filter(filter)); }
    catch (error) { if (error.code !== 'ENOENT') throw error; }
  }
  const allowed = new Set(hashes);
  for (const file of adapterHtml) {
    const missing = inlineScriptHashes(await readFile(file, 'utf8')).filter(hash => !allowed.has(hash));
    if (missing.length) throw new Error(`Adapter HTML has unauthorized inline scripts: ${file}`);
  }
  await writeFile(adapterPath, JSON.stringify(output));
  console.log(`Vercel v3 CSP finalized; ${adapterHtml.length} emitted HTML files verified.`);
}
await writeFile(manifestPath, JSON.stringify(manifest));
console.log(`CSP finalized: ${new Set(hashes).size} inline hashes across ${files.length} HTML pages.`);
