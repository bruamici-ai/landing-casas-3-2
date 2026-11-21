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
