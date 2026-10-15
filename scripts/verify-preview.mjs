import assert from 'node:assert/strict';
import { inlineScriptHashes } from './csp.mjs';

const origin = process.argv[2] ?? 'http://localhost:3011';
for (const route of ['/', '/es', '/pt', '/missing-hardening-check', '/missing-hardening-check.html']) {
  const response = await fetch(new URL(route, origin), { headers: { 'Accept-Language': 'en' } });
  const html = await response.text();
  const policy = response.headers.get('content-security-policy-report-only') ?? '';
  assert.equal(response.headers.get('x-content-type-options'), 'nosniff');
  assert.equal(response.headers.get('referrer-policy'), 'strict-origin-when-cross-origin');
  assert.equal(response.headers.get('permissions-policy'), 'camera=(), microphone=(), geolocation=()');
  assert.equal(response.headers.get('content-security-policy'), "frame-ancestors 'none'");
  assert.equal(response.headers.get('access-control-allow-origin'), 'https://stefanocintioli.vercel.app');
  assert.ok(policy.includes("connect-src 'self' https://formsubmit.co"));
  assert.ok(!/script-src[^;]*(unsafe-inline|unsafe-eval)/.test(policy));
  const hashes = inlineScriptHashes(html);
  const missing = hashes.filter(hash => !policy.includes(hash));
  assert.deepEqual(missing, [], `${route}: returned inline scripts must be authorized`);
  if (route === '/es' || route === '/pt') {
    const cookie = response.headers.get('set-cookie') ?? '';
    assert.ok(/NEXT_LOCALE=/.test(cookie), `${route}: locale cookie emitted`);
    assert.ok(/; Secure/i.test(cookie), `${route}: Secure cookie`);
    assert.ok(/; HttpOnly/i.test(cookie), `${route}: HttpOnly cookie`);
  }
  if (!route.startsWith('/missing')) {
    assert.equal(response.status, 200);
    assert.ok(/id="hero-heading"[^>]*>Stefano Cintioli<\/h1>/.test(html));
    assert.ok(!/href="#about"|id="about"/.test(html));
    for (const locale of ['en', 'es', 'pt', 'x-default']) assert.ok(html.includes(`hrefLang="${locale}"`), `${route}: hreflang ${locale}`);
  } else assert.equal(response.status, 404);
  console.log(`${route}: status ${response.status}; security headers, ${hashes.length} script hashes${route === '/es' || route === '/pt' ? ', Secure+HttpOnly cookie' : ''} verified.`);
}

const favicon = await fetch(new URL('/favicon.ico', origin));
assert.equal(favicon.status, 200);
assert.ok(favicon.headers.get('content-type')?.startsWith('image/'));
console.log('/favicon.ico: valid static icon, status 200.');
