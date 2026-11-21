import assert from 'node:assert/strict';
import { test } from 'node:test';
import { stayManifestResponse } from '../src/server/stay-manifest.mjs';
const response = token => stayManifestResponse(new URL('https://example.invalid/estadia.webmanifest?' + new URLSearchParams({ token })));
test('installed shortcuts return to their own stay and have separate identities', async () => {
  const first = await response('a'.repeat(43)).json();
  const second = await response('b'.repeat(43)).json();
  assert.equal(first.start_url, '/estadia?token=' + 'a'.repeat(43));
  assert.notEqual(first.id, second.id);
  assert.equal(first.id.includes('a'.repeat(43)), false);
  assert.equal(first.scope, '/estadia');
  assert.equal(first.display, 'standalone');
  assert.equal(first.shortcuts, undefined);
  assert.deepEqual(first.icons.map(icon => icon.sizes), ['192x192', '512x512']);
});
test('personal manifests cannot be cached and reject malformed links', async () => {
  assert.equal(response('a'.repeat(43)).headers.get('Cache-Control'), 'private, no-store');
  for (const token of ['', 'short', '../bad', 'a'.repeat(161), '<script>'.repeat(8)]) {
    assert.equal(response(token).status, 400);
  }
});

test('Vercel manifest handler preserves no-store, status and HTTP semantics', async t => {
  const { createServer } = await import('node:http');
  const { default: handler } = await import('../api/estadia-manifest.mjs');
  const server = createServer((request, reply) => void handler(request, reply));
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  t.after(() => new Promise(resolve => server.close(resolve)));
  const base = 'http://127.0.0.1:' + server.address().port + '/api/estadia-manifest';
  const valid = base + '?token=' + 'c'.repeat(43);
  const get = await fetch(valid);
  assert.equal(get.status, 200);
  assert.equal(get.headers.get('Cache-Control'), 'private, no-store');
  assert.match(get.headers.get('Content-Type'), /application\/manifest\+json/);
  assert.equal((await get.json()).start_url, '/estadia?token=' + 'c'.repeat(43));
  const head = await fetch(valid, { method: 'HEAD' });
  assert.equal(head.status, 200);
  assert.equal(await head.text(), '');
  assert.equal((await fetch(base)).status, 400);
  const post = await fetch(valid, { method: 'POST' });
  assert.equal(post.status, 405);
  assert.equal(post.headers.get('Allow'), 'GET, HEAD');
});
