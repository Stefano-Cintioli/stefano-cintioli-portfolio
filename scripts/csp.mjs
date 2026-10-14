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
  const result = policy.replace("script-src 'self'", `script-src 'self' ${[...new Set(hashes)].sort().join(' ')}`);
  if (Buffer.byteLength(result) > 7000) throw new Error('CSP exceeds 7 KB; split policies by route');
  return result;
}

/** Vercel's Next adapter uses Build Output API v3 header maps, not Next arrays. */
export function withVercelHashes(config, hashes) {
  if (!config || config.version !== 3 || !Array.isArray(config.routes)) throw new Error('Unsupported Vercel output format');
  let updated = 0;
  const routes = config.routes.map(route => {
    if (!route.headers) return route;
    if (typeof route.headers !== 'object' || Array.isArray(route.headers)) throw new Error('Unsupported Vercel output headers');
    const headers = { ...route.headers };
    for (const [key, value] of Object.entries(headers)) {
      if (key.toLowerCase() !== 'content-security-policy-report-only') continue;
      if (typeof value !== 'string') throw new Error('Vercel CSP must be a string');
      headers[key] = withHashes(value, hashes);
      updated++;
    }
    return { ...route, headers };
  });
  if (!updated) throw new Error('Report-only CSP not found in Vercel output');
  return { ...config, routes };
}
