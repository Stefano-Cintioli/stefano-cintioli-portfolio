import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { inlineScriptHashes, reportOnlyPolicy, withHashes } from './csp.mjs';
import * as csp from './csp.mjs';

test('hashes exact inline script bytes, including JSON-LD, without authorizing external script tags', () => {
  const js = 'self.__next_f.push([1,"hello"]);\n';
  const json = '{"@type":"Person"}';
  const html = `<script src="/app.js">ignored</script><script>${js}</script><script type="application/ld+json">${json}</script><script></script>`;
  const expected = [js, json].map(body => `'sha256-${createHash('sha256').update(body).digest('base64')}'`);
  assert.deepEqual(inlineScriptHashes(html), expected);
});

test('deduplicates emitted hashes and leaves other source restrictions intact', () => {
  const hash = inlineScriptHashes('<script>test</script>')[0];
  const policy = withHashes(reportOnlyPolicy, [hash, hash]);
  assert.equal(policy.split(hash).length - 1, 1);
  assert.ok(policy.includes("connect-src 'self' https://formsubmit.co"));
  assert.ok(policy.includes("worker-src 'none'"));
  assert.ok(!/script-src[^;]*(unsafe-inline|unsafe-eval|blob:)/.test(policy));
});

test('fails on missing scripts or an unexpected header instead of publishing an ineffective hash policy', () => {
  assert.throws(() => withHashes(reportOnlyPolicy, []));
  assert.throws(() => withHashes("script-src *", ["'sha256-test'"]));
});

test('patches Vercel v3 header maps while preserving route order and unrelated configuration', () => {
  const config = { version: 3, images: { formats: ['image/avif'] }, routes: [
    { src: '^/.*$', headers: { 'X-Content-Type-Options': 'nosniff' }, continue: true },
    { src: '^/(?!_next/).*$', headers: { 'content-security-policy-report-only': reportOnlyPolicy }, continue: true, missing: [{ type: 'header', key: 'x-test' }] },
    { handle: 'filesystem' },
  ] };
  const before = structuredClone(config);
  const hash = inlineScriptHashes('<script>fixture</script>')[0];
  const result = csp.withVercelHashes(config, [hash]);
  assert.deepEqual(config, before, 'input is not mutated');
  assert.deepEqual(result.images, config.images);
  assert.deepEqual(result.routes[0], config.routes[0]);
  assert.deepEqual(result.routes[2], config.routes[2]);
  assert.deepEqual(result.routes[1].missing, config.routes[1].missing);
  assert.equal(result.routes[1].src, config.routes[1].src);
  assert.equal(result.routes[1].continue, true);
  assert.equal(result.routes[1].headers['content-security-policy-report-only'], withHashes(reportOnlyPolicy, [hash]));
});

test('rejects unknown Vercel output formats and missing or malformed CSP headers', () => {
  const hash = "'sha256-fixture'";
  assert.throws(() => csp.withVercelHashes(null, [hash]), /Vercel output/);
  assert.throws(() => csp.withVercelHashes({ version: 4, routes: [] }, [hash]), /Vercel output/);
  assert.throws(() => csp.withVercelHashes({ version: 3, routes: {} }, [hash]), /Vercel output/);
  assert.throws(() => csp.withVercelHashes({ version: 3, routes: [{ handle: 'filesystem' }] }, [hash]), /CSP not found/);
  assert.throws(() => csp.withVercelHashes({ version: 3, routes: [{ headers: { 'Content-Security-Policy-Report-Only': null } }] }, [hash]), /CSP must be a string/);
});
