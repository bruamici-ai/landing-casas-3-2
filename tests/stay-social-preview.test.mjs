// Integration check: npm run build && node --test tests/stay-social-preview.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

test('built stay HTML offers a public branded image before executing guest JavaScript', () => {
  const html = readFileSync(new URL('../dist/estadia/index.html', import.meta.url), 'utf8');
  const head = html.slice(html.indexOf('<head>'), html.indexOf('</head>'));
  const tags = [...head.matchAll(/<meta\s+[^>]*>/g)].map(([tag]) => Object.fromEntries(
    [...tag.matchAll(/([\w:-]+)="([^"]*)"/g)].map(([, key, value]) => [key, value])));
  const meta = key => tags.find(tag => tag.property === key || tag.name === key)?.content;
  const image = new URL(meta('og:image'));
  assert.equal(image.protocol, 'https:');
  assert.equal(image.pathname, '/brand/mi-estadia-preview-v1.png');
  assert.equal(image.search, '');
  assert.equal(meta('og:image:secure_url'), image.href);
  assert.equal(meta('og:image:type'), 'image/png');
  assert.equal(meta('twitter:image'), image.href);
  assert.equal(meta('twitter:card'), 'summary_large_image');
  assert.equal(meta('robots'), 'noindex, nofollow');
  assert.equal(meta('referrer'), 'no-referrer');
  // Do not replace the private destination with a generic canonical URL.
  assert.equal(meta('og:url'), undefined);
  assert.match(meta('og:title'), /Mi estadía/);
  const png = readFileSync(new URL(`../dist${image.pathname}`, import.meta.url));
  assert.equal(png.subarray(0, 8).toString('hex'), '89504e470d0a1a0a');
  assert.equal(png.readUInt32BE(16), Number(meta('og:image:width')));
  assert.equal(png.readUInt32BE(20), Number(meta('og:image:height')));
  assert.equal(png.readUInt32BE(16), 1200);
  assert.equal(png.readUInt32BE(20), 630);
  assert.ok(png.length < 300_000);
});
