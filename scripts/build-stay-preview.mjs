// Run with the existing Astro toolchain; no additional dependencies required.
import sharp from 'sharp';
import { readFile, writeFile } from 'node:fs/promises';
const logo = (await readFile(new URL('../public/brand/horizontal-dark.svg', import.meta.url), 'utf8'))
  .replace('<svg ', '<svg x="130" y="186" width="940" height="184" ');
const card = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#f5efe7"/>
  <rect x="32" y="32" width="1136" height="566" rx="24" fill="none" stroke="#c99d4e" stroke-width="2"/>
  ${logo}
  <path d="M500 420H700" stroke="#c99d4e" stroke-width="2"/>
  <text x="600" y="492" text-anchor="middle" fill="#173d34" font-family="Georgia,serif" font-size="42">Mi estadía</text>
</svg>`;
await writeFile(new URL('../public/brand/mi-estadia-preview-v1.png', import.meta.url), await sharp(Buffer.from(card)).png().toBuffer());
