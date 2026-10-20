import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const source = readFileSync(new URL('../src/pages/estadia.astro', import.meta.url), 'utf8');
const analytics = source.slice(source.indexOf('      const analyticsSections'), source.indexOf('      const showError'));
const website = '6ea792cd-4df8-457d-b5ab-162e517c88b8';
function harness(hostname = 'experiencias-mendoza.vercel.app', blocked = false, id = website) {
  let now = 0;
  const sent = [], scripts = [], docEvents = {}, winEvents = {};
  const document = { visibilityState:'visible', addEventListener:(name,fn) => docEvents[name] = fn,
    getElementById:() => null, querySelectorAll:() => [],
    createElement:() => ({ dataset:{}, addEventListener(name,fn) { this[name] = fn; } }),
    head:{append(script) { scripts.push(script); if (!blocked) script.load(); }} };
  const window = { umami:{track(payload) { sent.push(payload); return Promise.resolve(); }},
    addEventListener:(name,fn) => winEvents[name] = fn };
  const sandbox = {document,window,location:{hostname,href:'https://'+hostname+'/estadia/PRIVATE_TOKEN?token=PRIVATE_TOKEN'},
    navigator:{language:'es'},screen:{width:1000,height:800},Date:{now:() => now},Promise,
    umamiWebsiteId:id,umamiScriptUrl:'https://cloud.umami.is/script.js',umamiEnvironment:'production',
    companionToggle:null,companion:null,IntersectionObserver:class {observe() {}}};
  vm.createContext(sandbox);
  vm.runInContext(analytics + '\nsetupAnalytics({casa:"parque",channel:"direct",nombre:"PRIVATE_NAME"},"during");', sandbox);
  return {sent,scripts,advance(ms) {now += ms;},interact() {winEvents.click();},
    hide() { document.visibilityState = 'hidden'; docEvents.visibilitychange(); },
    show() { document.visibilityState = 'visible'; docEvents.visibilitychange(); },
    close() {winEvents.pagehide();}};
}
test('all pageviews and events use the real website ID and exclude private URL and guest data', () => {
  const h = harness(); h.advance(10000); h.hide();
  assert.equal(h.sent.length,3);
  for (const payload of h.sent) {
    assert.equal(payload.website,website); assert.equal(payload.url,'/estadia'); assert.equal(payload.referrer,'');
    assert.equal(JSON.stringify(payload).includes('PRIVATE_'),false);
  }
  assert.equal(h.sent[1].name,'portal_opened');
  assert.equal(h.scripts[0].dataset.autoTrack,'false');
});
test('active time caps idle gaps and emits once even after returning from background', () => {
  const h = harness(); h.advance(20*60000); h.interact(); h.advance(10000); h.hide();
  assert.equal(h.sent.at(-1).data.duration_bucket,'1_to_3m');
  h.advance(60*60000); h.show(); h.advance(20000); h.close();
  assert.equal(h.sent.filter(x => x.name === 'active_time_recorded').length,1);
});
test('time starts after validation and includes recent visible interaction', () => {
  const h = harness();
  for(let i=0;i<4;i++){h.advance(45000);h.interact();}
  h.close(); assert.equal(h.sent.at(-1).data.duration_bucket,'3_to_10m');
});
test('production tracking stays off on local and preview domains or malformed IDs', () => {
  for(const host of ['localhost','127.0.0.1','preview.vercel.app']) assert.equal(harness(host).scripts.length,0);
  assert.equal(harness('experiencias-mendoza.vercel.app',false,'- '+website).scripts.length,0);
});
test('a blocked tracker does not emit or throw', () => {
  const h = harness('experiencias-mendoza.vercel.app',true);
  assert.equal(h.sent.length,0);
});
