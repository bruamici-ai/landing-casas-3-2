import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const source = readFileSync(new URL('../src/client/landing-analytics.js', import.meta.url), 'utf8').replace('export function', 'function');
const website = '11111111-1111-4111-8111-111111111111';
function harness(path = '/', options = {}) {
  let now = 0, timerId = 0, observer;
  const sent = [], scripts = [], documentEvents = {}, windowEvents = {}, timers = new Map();
  const hero = {};
  class Element {
    constructor(attributes = {}, parent = '') { this.attributes = attributes; this.parent = parent; }
    closest(selector) { if (selector === 'a[href]' && this.attributes.href) return this; if (selector === '[data-open-gallery]' && this.attributes.gallery) return this; return selector === this.parent ? this : null; }
    getAttribute(name) { return this.attributes[name] ?? null; }
  }
  const setTimeout = (fn, delay) => { const id = ++timerId; timers.set(id, {fn, at:now + delay}); return id; };
  const clearTimeout = id => timers.delete(id);
  const document = {
    visibilityState:'visible', addEventListener:(name, fn) => documentEvents[name] = fn,
    querySelectorAll:selector => selector.includes('.hero-basic') ? [hero] : [],
    createElement:() => ({dataset:{},addEventListener(name,fn){this[name]=fn;}}),
    head:{append(script){scripts.push(script);if(!options.blocked)script.load();}}
  };
  class IntersectionObserver {
    constructor(callback) { observer = callback; }
    observe() {}
  }
  const window = {umami:{track(payload){sent.push(payload);return Promise.resolve();}},innerHeight:800,IntersectionObserver,
    addEventListener:(name, fn) => windowEvents[name] = fn};
  const hostname = options.hostname || 'experiencias-mendoza.vercel.app';
  const config = {websiteId:website,stayWebsiteId:'6ea792cd-4df8-457d-b5ab-162e517c88b8',scriptUrl:'https://cloud.umami.is/script.js',environment:'production',services:{traslados:'Traslados'},...options.config};
  const sandbox = {document,window,Element,IntersectionObserver,setTimeout,clearTimeout,Date:{now:()=>now},URL,navigator:{language:'es'},screen:{width:1000,height:800},location:{hostname,pathname:path,origin:'https://'+hostname,href:'https://'+hostname+path+'?token=PRIVATE_TOKEN'},config};
  vm.createContext(sandbox);vm.runInContext(source+'\nstartLandingAnalytics(config);',sandbox);
  return {sent,scripts,
    advance(ms){now+=ms;for(const [id,timer] of [...timers])if(timer.at<=now){timers.delete(id);timer.fn();}},
    click(attributes,parent){documentEvents.click({target:new Element(attributes,parent)});windowEvents.click();},
    showSection(){observer([{target:hero,isIntersecting:true,intersectionRect:{height:400},boundingClientRect:{height:1500}}]);},
    hide(){document.visibilityState='hidden';documentEvents.visibilitychange();},
    show(){document.visibilityState='visible';documentEvents.visibilitychange();},
    close(){windowEvents.pagehide();}
  };
}
test('public tracking uses a dedicated site, clean paths and readable properties', () => {
  const h = harness('/la-casa-frente-al-parque');h.close();
  assert.equal(h.sent.length,3);
  for(const item of h.sent){assert.equal(item.website,website);assert.equal(item.url,'/la-casa-frente-al-parque');assert.equal(item.referrer,'');assert.equal(JSON.stringify(item).includes('PRIVATE_'),false);}
  assert.equal(h.sent[1].name,'Visitó la web de las casas');
  assert.equal(h.sent[1].data.Casa,'La Casa Frente al Parque');
  assert.equal(h.sent[1].data.Entorno,'Producción');
  assert.equal(h.scripts[0].dataset.autoTrack,'false');
});
test('private routes, previews and a reused Mi estadia site stay excluded', () => {
  for(const path of ['/estadia','/estadia/private-token','/portal/parque','/parque/ficha','/avellaneda/resenas','/unlisted'])assert.equal(harness(path).scripts.length,0);
  for(const hostname of ['localhost','preview.vercel.app'])assert.equal(harness('/',{hostname}).scripts.length,0);
  assert.equal(harness('/',{config:{websiteId:'invalid'}}).scripts.length,0);
  assert.equal(harness('/',{config:{stayWebsiteId:website}}).scripts.length,0);
});
test('clicks classify houses, services, gallery and WhatsApp without destinations or messages', () => {
  const h = harness();
  h.click({href:'/casa-avellaneda?name=PRIVATE_NAME'});
  h.click({gallery:true});
  h.click({href:'https://wa.me/PRIVATE_PHONE?text=PRIVATE_MESSAGE'},'.hero');
  h.click({href:'/servicios/traslados'});
  h.click({href:'https://wa.me/PRIVATE_PHONE?text=PRIVATE_MESSAGE','data-service-link':'traslados'});
  assert.equal(h.sent[2].data['Casa elegida'],'Casa Avellaneda');
  assert.equal(h.sent[3].name,'Abrió la galería de fotos');
  assert.equal(h.sent[4].name,'Abrió WhatsApp para consultar');
  assert.equal(h.sent[4].data['Ubicación del botón'],'Presentación');
  assert.equal(h.sent[5].data.Servicio,'Traslados');
  assert.equal(h.sent[6].name,'Consultó un servicio por WhatsApp');
  assert.equal(JSON.stringify(h.sent).includes('PRIVATE_'),false);
});
test('sections require visible time and emit at most once including tall sections', () => {
  const h = harness();h.showSection();h.advance(1000);h.hide();h.advance(10000);
  assert.equal(h.sent.filter(x=>x.name==='Consultó una sección de la web').length,0);
  h.show();h.advance(2000);h.showSection();h.advance(2000);
  assert.equal(h.sent.filter(x=>x.name==='Consultó una sección de la web').length,1);
});
test('active time caps idle gaps and remains single after returning from background', () => {
  const h = harness();h.advance(20*60000);h.click({href:'/irrelevant'});h.advance(10000);h.hide();h.advance(60*60000);h.show();h.close();
  const times = h.sent.filter(x=>x.name==='Tiempo activo en la web');
  assert.equal(times.length,1);assert.equal(times[0].data['Tiempo activo'],'1 a 3 minutos');
});
test('a blocked tracker never prevents the page from continuing', () => {
  const h = harness('/',{blocked:true});assert.equal(h.sent.length,0);
});
