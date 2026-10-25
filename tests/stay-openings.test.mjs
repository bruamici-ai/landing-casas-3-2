import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const source = readFileSync(new URL('../src/pages/estadia.astro', import.meta.url), 'utf8');
const code = source.slice(source.indexOf('      let openingRequest'), source.indexOf('      const analyticsSections'));
function harness({ preview=false, excluded=false, failFirst=false, failAll=false } = {}) {
  const sent=[];
  const sandbox={
    searchParams:new URLSearchParams(preview?'revision=1':''),
    localStorage:{getItem:()=>excluded?'excluded':null},
    crypto:{randomUUID:()=> 'b4eaef40-f6da-4fb4-a297-71021ceddfb3'},
    apiBase:'/estadia-api', token:'SYNTHETIC_TOKEN', encodeURIComponent, JSON,
    fetch:async(url,options)=>{sent.push({url,...options});return {ok:!failAll&&(!failFirst||sent.length>1)};},
  };
  vm.createContext(sandbox);
  vm.runInContext(code,sandbox);
  return {sent,async open(stay={}){vm.runInContext(`recordPortalOpening(${JSON.stringify(stay)})`,sandbox);await vm.runInContext('openingRequest',sandbox);}};
}
test('one successful page load registers once independently of Umami',async()=>{
  const h=harness();await h.open();await h.open();assert.equal(h.sent.length,1);
  assert.equal(h.sent[0].method,'POST');assert.equal(h.sent[0].credentials,'omit');
  assert.deepEqual(JSON.parse(h.sent[0].body),{visita:'b4eaef40-f6da-4fb4-a297-71021ceddfb3'});
});
test('administrator previews, exclusions and synthetic stays are not counted',async()=>{
  for(const options of [{preview:true},{excluded:true}]){const h=harness(options);await h.open();assert.equal(h.sent.length,0);}
  const h=harness();await h.open({test_only:true});assert.equal(h.sent.length,0);
});
test('retry reuses visit ID and persistent failures do not break the loaded portal',async()=>{
  for(const options of [{failFirst:true},{failAll:true}]){
    const h=harness(options);await h.open();assert.equal(h.sent.length,2);assert.equal(h.sent[0].body,h.sent[1].body);
  }
});
test('registration happens only after the real portal is displayed',()=>{
  const ready=source.indexOf('            portal.hidden = false;');
  const record=source.indexOf('            recordPortalOpening(stay);');
  assert(record>ready);assert(record<source.indexOf('.catch(showError)',ready));
});
