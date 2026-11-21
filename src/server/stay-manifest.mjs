import { createHash } from 'node:crypto';

export function stayManifestResponse(url) {
  const headers = {
    'Content-Type': 'application/manifest+json; charset=utf-8',
    'Cache-Control': 'private, no-store',
    'Referrer-Policy': 'no-referrer',
    'X-Robots-Tag': 'noindex, nofollow',
    'X-Content-Type-Options': 'nosniff',
  };
  const token = url.searchParams.get('token') || '';
  if (!/^[A-Za-z0-9_-]{32,160}$/.test(token)) return new Response('{}', { status: 400, headers });
  // App IDs ignore fragments; distinguish stays without exposing the bearer in the ID.
  const id = createHash('sha256').update(token).digest('hex');
  return new Response(JSON.stringify({
    id: '/estadia?acceso=' + id,
    name: 'Mi estadía · Experiencias Mendoza',
    short_name: 'Mi estadía',
    description: 'Tu acceso personal a la información de tu estadía.',
    lang: 'es-AR',
    start_url: '/estadia?token=' + encodeURIComponent(token),
    scope: '/estadia',
    display: 'standalone',
    background_color: '#f5efe7',
    theme_color: '#661a30',
    icons: [192, 512].map(size => ({ src: '/stay-icons/icon-' + size + '.png', sizes: size + 'x' + size, type: 'image/png', purpose: 'any' })),
  }), { headers });
}
