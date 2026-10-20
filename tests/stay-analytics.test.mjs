import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const source = readFileSync(new URL('../src/pages/estadia.astro', import.meta.url), 'utf8');
const analytics = source.slice(source.indexOf('      const analyticsSections'), source.indexOf('      const showError'));
const website = '6ea792cd-4df8-457d-b5ab-162e517c88b8';
function harness(hostname = 'experiencias-mendoza.vercel.app', blocked = false, id = website, options = {}) {
  let now = 0, timerId = 0;
  const sent = [], scripts = [], docEvents = {}, winEvents = {};
  const timers = new Map(), observers = [];
  const listen = (events, name, fn) => { (events[name] ||= []).push(fn); };
  const emit = (events, name) => (events[name] || []).forEach(fn => fn());
  const content = {querySelector(selector) {
    if (selector.includes('status="active"')) return options.commerce === 'active' ? {} : null;
    return options.commerce && options.commerce !== 'upcoming' ? {} : null;
  }};
  const section = {querySelector:() => content};
  const commerceLinks = ['tasting','boards','maps','unknown'].map(action => ({
    click:null,
    getAttribute:name => ({'data-commerce':'almacen-de-sabores','data-commerce-action':action,href:'https://example.com/PRIVATE_MESSAGE'})[name] || null,
    addEventListener(name,fn){this[name]=fn;},
  }));
  const commerceOpen = {click:null,getAttribute:()=>'almacen-de-sabores',addEventListener(name,fn){this[name]=fn;}};
  const document = { visibilityState:'visible', addEventListener:(name,fn) => listen(docEvents,name,fn),
    getElementById:name => options.commerce && name === (options.commerce === 'upcoming' ? 'mendoza' : 'mendoza-preview') ? section : null, querySelectorAll:selector => options.links && selector === 'a' ? commerceLinks : options.links && selector === '[data-commerce-open]' ? [commerceOpen] : [],
    createElement:() => ({ dataset:{}, addEventListener(name,fn) { this[name] = fn; } }),
    head:{append(script) { scripts.push(script); if (!blocked) script.load(); }} };
  const window = { umami:{track(payload) { sent.push(payload); return Promise.resolve(); }},
    innerHeight:800,
    setTimeout:(fn,delay) => {const id=++timerId;timers.set(id,{fn,at:now+delay});return id;},
    clearTimeout:id => timers.delete(id),
    addEventListener:(name,fn) => listen(winEvents,name,fn) };
  class IntersectionObserver {
    constructor(callback){this.callback=callback;observers.push(this);}
    observe(target){this.target=target;}
    disconnect(){this.disconnected=true;}
  }
  window.IntersectionObserver=IntersectionObserver;
  const sandbox = {document,window,location:{hostname,href:'https://'+hostname+'/estadia/PRIVATE_TOKEN?token=PRIVATE_TOKEN'},
    navigator:{language:'es'},screen:{width:1000,height:800},Date:{now:() => now},Promise,
    umamiWebsiteId:id,umamiScriptUrl:'https://cloud.umami.is/script.js',umamiEnvironment:'production',
    companionToggle:null,companion:null,IntersectionObserver};
  vm.createContext(sandbox);
  vm.runInContext(analytics + '\nsetupAnalytics({casa:"parque",channel:"direct",nombre:"PRIVATE_NAME"},"during");', sandbox);
  return {sent,scripts,openCommerce:()=>commerceOpen.click(),commerceClick:index => commerceLinks[index].click(),advance(ms) {now += ms;for(const [id,timer] of [...timers])if(timer.at<=now){timers.delete(id);timer.fn();}},interact() {emit(winEvents,'click');},
    hide() { document.visibilityState = 'hidden'; emit(docEvents,'visibilitychange'); },
    show() { document.visibilityState = 'visible'; emit(docEvents,'visibilitychange'); },
    close() {emit(winEvents,'pagehide');},
    commerceVisible(visible=true,height=300,visibleHeight=200) {
      const observer=observers.find(observer=>observer.target===content);
      if(observer&&!observer.disconnected)observer.callback([{target:content,isIntersecting:visible,boundingClientRect:{height},intersectionRect:{width:600,height:visibleHeight}}]);
    }};
}
test('all pageviews and events use the real website ID and exclude private URL and guest data', () => {
  const h = harness(); h.advance(10000); h.hide();
  assert.equal(h.sent.length,3);
  for (const payload of h.sent) {
    assert.equal(payload.website,website); assert.equal(payload.url,'/estadia'); assert.equal(payload.referrer,'');
    assert.equal(JSON.stringify(payload).includes('PRIVATE_'),false);
  }
  assert.equal(h.sent[1].name,'Abrió Mi estadía');
  assert.equal(h.sent[1].data.Casa,'La Casa Frente al Parque');
  assert.equal(h.sent[1].data.Canal,'Directo');
  assert.equal(h.sent[1].data['Momento de la estadía'],'Durante la estadía');
  assert.equal(h.sent[1].data.Entorno,'Producción');
  assert.equal(h.scripts[0].dataset.autoTrack,'false');
});
test('active time caps idle gaps and emits once even after returning from background', () => {
  const h = harness(); h.advance(20*60000); h.interact(); h.advance(10000); h.hide();
  assert.equal(h.sent.at(-1).data['Tiempo activo'],'1 a 3 minutos');
  h.advance(60*60000); h.show(); h.advance(20000); h.close();
  assert.equal(h.sent.filter(x => x.name === 'Tiempo activo en la guía').length,1);
});
test('time starts after validation and includes recent visible interaction', () => {
  const h = harness();
  for(let i=0;i<4;i++){h.advance(45000);h.interact();}
  h.close(); assert.equal(h.sent.at(-1).data['Tiempo activo'],'3 a 10 minutos');
});
test('production tracking stays off on local and preview domains or malformed IDs', () => {
  for(const host of ['localhost','127.0.0.1','preview.vercel.app']) assert.equal(harness(host).scripts.length,0);
  assert.equal(harness('experiencias-mendoza.vercel.app',false,'- '+website).scripts.length,0);
});
test('a blocked tracker does not emit or throw', () => {
  const h = harness('experiencias-mendoza.vercel.app',true);
  assert.equal(h.sent.length,0);
});
test('commerce views require two seconds and distinguish the upcoming notice', () => {
  const h=harness(undefined,false,website,{commerce:'upcoming'});
  h.commerceVisible();h.advance(1999);
  assert.equal(h.sent.filter(x=>x.name==='Vio la sección de comercios asociados').length,0);
  h.advance(1);
  const event=h.sent.find(x=>x.name==='Vio la sección de comercios asociados');
  assert.equal(event.data['Contenido de la sección'],'Aviso de próxima apertura');
  assert.equal(event.data.Casa,'La Casa Frente al Parque');
  assert.equal(event.url,'/estadia');
  assert.equal(h.sent.find(x=>x.name==='Consultó una sección').data['Sección'],'Comercios asociados');
});
test('tall commerce catalogs are measurable on a small viewport without requiring half of the full catalog', () => {
  for(const [kind,label] of [['preview','Tarjetas de presentación'],['active','Catálogo con comercios activos']]) {
    const h=harness(undefined,false,website,{commerce:kind});
    h.commerceVisible(true,2400,400);h.advance(2000);
    assert.equal(h.sent.find(x=>x.name==='Vio la sección de comercios asociados').data['Contenido de la sección'],label);
    assert.equal(JSON.stringify(h.sent).includes('PRIVATE_'),false);
  }
});
test('brief glimpses and background time do not count commerce views; returning emits only once', () => {
  const h=harness(undefined,false,website,{commerce:'preview'});
  h.commerceVisible();h.advance(1000);h.commerceVisible(false);h.advance(3000);
  assert.equal(h.sent.filter(x=>x.name==='Vio la sección de comercios asociados').length,0);
  h.commerceVisible();h.advance(1000);h.hide();h.advance(10000);
  assert.equal(h.sent.filter(x=>x.name==='Vio la sección de comercios asociados').length,0);
  h.show();h.advance(2000);h.commerceVisible();h.advance(5000);h.hide();h.show();h.advance(3000);
  assert.equal(h.sent.filter(x=>x.name==='Vio la sección de comercios asociados').length,1);
});
test('commerce actions distinguish the local and offer without transmitting destinations or guest messages', () => {
  const h=harness(undefined,false,website,{commerce:'active',links:true});
  h.openCommerce();
  const opened=h.sent.find(x=>x.name==='Abrió la ficha de un comercio');
  assert.equal(opened.data.Comercio,'Almacén de Sabores');
  for(let i=0;i<4;i++)h.commerceClick(i);
  const events=h.sent.filter(x=>x.name==='Abrió una opción de un comercio');
  assert.equal(events.length,3);
  assert.deepEqual(events.map(x=>x.data['Opción del comercio']),['Coordinar degustación con el anfitrión','Consultar picadas con el anfitrión','Ver ubicación en Google Maps']);
  for(const event of events) {
    assert.equal(event.data.Comercio,'Almacén de Sabores');
    assert.equal(event.data.Casa,'La Casa Frente al Parque');
    assert.equal(event.url,'/estadia');
  }
  assert.equal(h.sent.filter(x=>x.name==='Abrió Maps o un contacto').length,0);
  assert.equal(JSON.stringify(h.sent).includes('PRIVATE_'),false);
});
