import { createHash } from 'node:crypto';

// TODO: enforce the full policy after a week of clean preview/production observations. Do not
// enforce this full policy without rechecking locale navigation, theme changes,
// form submission and the shader. frame-ancestors is enforced separately now.
export const reportOnlyPolicy = [
  "default-src 'self'",
  "script-src 'self'",
  // Existing next-themes, Radix, chart positioning and Paper inject inline styles.
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: https://i.ytimg.com",
  "font-src 'self'",
  "connect-src 'self' https://formsubmit.co",
  "frame-src https://www.youtube-nocookie.com",
  // MeshGradient is local WebGL2, not a worker/blob/wasm implementation.
  "worker-src 'none'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
].join('; ');

export function inlineScriptHashes(html) {
  return [...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)]
    .filter(([, attributes, body]) => !/\bsrc\s*=/i.test(attributes) && body.length)
    .map(([, , body]) => `'sha256-${createHash('sha256').update(body).digest('base64')}'`);
}

export function withHashes(policy, hashes) {
  if (!hashes.length) throw new Error('No prerendered script hashes found');
  if (!/script-src 'self'(?:;|$)/.test(policy)) throw new Error('Expected unhashed script-src directive missing');
  return policy.replace("script-src 'self'", `script-src 'self' ${[...new Set(hashes)].sort().join(' ')}`);
}
