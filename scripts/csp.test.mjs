import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { inlineScriptHashes, reportOnlyPolicy, withHashes } from './csp.mjs';

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
