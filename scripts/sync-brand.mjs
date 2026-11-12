// Run from this repository: node scripts/sync-brand.mjs <ADMCasas checkout>
import { createHash } from 'node:crypto';
import { cp, mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { resolve, join } from 'node:path';
const source = fileURLToPath(new URL('../public/brand/', import.meta.url));
const tokens = await readFile(join(source, 'tokens.css'), 'utf8');
const motionStart = tokens.indexOf('/* Architectural reveal');
if (motionStart < 0) throw new Error('Missing canonical brand motion styles.');
const motionCss = tokens.slice(motionStart)
  .replace(/\.em-brand\s*\{/g,'svg{')
  .replaceAll('.em-brand[data-animated="true"]:not([data-motion-approved="true"]) ', '')
  .replaceAll('.em-brand[data-animated="true"] ', '');
// Rebuild standalone exports from the two canonical vector drawings.
for (const name of ['horizontal', 'mark']) {
  const svg = await readFile(join(source, `${name}.svg`), 'utf8');
  for (const [tone, color] of Object.entries({ dark: '#173d34', light: '#f6f3eb', mono: '#000000' })) {
    await writeFile(join(source, `${name}-${tone}.svg`), svg
      .replaceAll('var(--brand-mountain, #7e9186)', tone === 'dark' ? '#7e9186' : tone === 'light' ? '#aab8ab' : color)
      .replaceAll('var(--brand-sun, #c99d4e)', tone === 'dark' ? '#c99d4e' : color)
      .replaceAll('var(--brand-water, #c4dfda)', tone === 'dark' ? '#c4dfda' : 'none')
      .replaceAll('currentColor', color));
  }
  const animated = svg.replace('role="img"', `style="color:#173d34" role="img"`)
    .replace('><g', `><style>${motionCss}</style><g`);
  await writeFile(join(source, `${name}-animated.svg`), animated);
  const malbec = svg.replace('role="img"', 'style="color:#173d34;--brand-house:#661a30" role="img"');
  await writeFile(join(source, `${name}-malbec.svg`), malbec);
  await writeFile(join(source, `${name}-malbec-animated.svg`), malbec.replace('><g', `><style>${motionCss}</style><g`));

}
const faviconMark=await readFile(join(source,'mark.svg'),'utf8');
const faviconStyle='svg{color:#173d34;--brand-mountain:#7e9186;--brand-sun:#c99d4e;--brand-water:#c4dfda}@media(prefers-color-scheme:dark){svg{color:#f6f3eb;--brand-mountain:#aab8ab;--brand-sun:#f6f3eb;--brand-water:none}}';
await writeFile(join(source,'favicon.svg'),faviconMark.replace('role="img" aria-label="Experiencias Mendoza"','').replace('><g',`><style>${faviconStyle}</style><g`));
const checkout = process.argv[2];
if (!checkout) { console.log('Generated canonical brand SVG exports.'); process.exit(0); }
const pkg = JSON.parse(await readFile(resolve(checkout, 'frontend/package.json'), 'utf8'));
if (pkg.name !== 'frontend' || !pkg.dependencies?.vue) throw new Error('Expected the ADMCasas Vue frontend.');
const target = resolve(checkout, 'frontend/public/brand');
await mkdir(target, { recursive: true });
const files = (await readdir(source)).filter(name => /\.(svg|css|js|json)$/.test(name));
for (const name of files) await cp(join(source, name), join(target, name));
const vueAssets=resolve(checkout,'frontend/src/assets/brands/em');
await mkdir(vueAssets,{recursive:true});
for(const name of ['horizontal.svg','mark.svg','tokens.css','identity.json'])await cp(join(source,name),join(vueAssets,name));
console.log(`Synced ${files.length} brand assets to ${target} and Vue assets`);

// Refresh only the existing private Experiencias Mendoza manual entry.
const manual=(await readFile(new URL('../MANUAL_MARCA.md',import.meta.url),'utf8')).replace(/\r\n/g,'\n');
const registryPath=resolve(checkout,'backend/app/resources/brand_manuals.json');
const registry=JSON.parse(await readFile(registryPath,'utf8'));
const entry=registry.manuals.find(item=>item.id==='experiencias-mendoza');
if(!entry)throw new Error('Existing Experiencias Mendoza manual entry is required.');
Object.assign(entry,{version:manual.match(/^Versión ([\d.]+)/m)[1],snapshot_date:'2026-11-12',status:'Aplicación autorizada',description:'Firma existente solicitada para landing, Mi estadía y portales; muestra en loop con pausa. Implementación y publicación se verifican por separado.',sha256:createHash('sha256').update(manual).digest('hex')});
await writeFile(resolve(checkout,'backend/app/resources/manual_experiencias_mendoza.md'),manual);
await writeFile(registryPath,JSON.stringify(registry,null,2)+'\n');
