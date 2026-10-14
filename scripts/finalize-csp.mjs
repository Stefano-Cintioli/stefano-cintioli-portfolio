import { readdir, readFile, writeFile, access } from 'node:fs/promises';
import path from 'node:path';
import { inlineScriptHashes, withHashes } from './csp.mjs';

async function htmlFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  return (await Promise.all(entries.map(entry => {
    const file = path.join(dir, entry.name);
    return entry.isDirectory() ? htmlFiles(file) : entry.name.endsWith('.html') ? [file] : [];
  }))).flat();
}

// Next's production server and the Vercel Next builder consume this generated
// routes-manifest AFTER our build command completes. Hash actual emitted script
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
      // Common hash union must stay under typical CDN header limits.
      if (Buffer.byteLength(header.value) > 7000) throw new Error('CSP exceeds 7 KB; split policies by route');
      updated++;
    }
  }
}
if (!updated) throw new Error('Report-only CSP not found in Next header manifest');
// New adapter output bypasses routes-manifest. Fail closed rather than silently
// deploy an unhashed policy if this project migrates to that adapter.
try {
  await access('.next/output/config.json');
  throw new Error('New Next adapter output detected; update CSP finalization for output/config.json before deploying');
} catch (error) {
  if (error.code !== 'ENOENT') throw error;
}
await writeFile(manifestPath, JSON.stringify(manifest));
console.log(`CSP finalized: ${new Set(hashes).size} inline hashes across ${files.length} HTML pages.`);
