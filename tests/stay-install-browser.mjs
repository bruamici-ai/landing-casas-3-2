// Browser helper reused from landing/tests/central-house-browser.mjs.
// Optional real Chrome checks. Synthetic network responses, no database writes.
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
async function browserPage(url, intercept) {
 const endpoint=await(await fetch((process.env.CHROME_CDP_URL||'http://127.0.0.1:9267')+'/json/version')).json();
 const ws=new WebSocket(endpoint.webSocketDebuggerUrl);await new Promise(resolve=>ws.addEventListener('open',resolve,{once:true}));
 let closing=false;let id=0;const calls=new Map(),errors=[];
 const send=(method,params={},sessionId)=>new Promise((resolve,reject)=>{const key=++id,timer=setTimeout(()=>{calls.delete(key);reject(Error('CDP timeout '+method))},20000);calls.set(key,{resolve,reject,timer});ws.send(JSON.stringify({id:key,method,params,...(sessionId?{sessionId}:{})}))});
 ws.addEventListener('message',async event=>{const message=JSON.parse(event.data),pending=calls.get(message.id);if(pending){clearTimeout(pending.timer);calls.delete(message.id);message.error?pending.reject(Error(message.error.message)):pending.resolve(message.result)}
  if(closing)return;
  if(message.method==='Network.responseReceived'&&message.params.response.status>=400)errors.push({status:message.params.response.status,path:new URL(message.params.response.url).pathname});
  if(message.method==='Network.loadingFailed')errors.push({failed:message.params.errorText,type:message.params.type});
  if(message.method==='Runtime.exceptionThrown')errors.push(message.params.exceptionDetails.exception?.description||message.params.exceptionDetails.text);
  if(message.method==='Page.javascriptDialogOpening')await send('Page.handleJavaScriptDialog',{accept:false},message.sessionId);
  if(message.method==='Fetch.requestPaused'){try {
   const {request,requestId}=message.params;const response=await intercept?.(request);
   if(response)await send('Fetch.fulfillRequest',{requestId,responseCode:response.status||200,responseHeaders:[{name:'Content-Type',value:response.type||'application/json'}],body:Buffer.from(response.body||'').toString('base64')},message.sessionId);
   else if(request.url.startsWith('https://res.cloudinary.com/synthetic/image/upload/'))await send('Fetch.fulfillRequest',{requestId,responseCode:200,responseHeaders:[{name:'Content-Type',value:'image/svg+xml'}],body:Buffer.from('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 900"><rect width="1200" height="900" fill="#d8c4b3"/><rect x="150" y="300" width="900" height="500" rx="30" fill="#7e6263"/><path d="M80 340L600 70l520 270" fill="#53675a"/><text x="600" y="620" text-anchor="middle" fill="white" font-size="60">Foto ficticia</text></svg>').toString('base64')},message.sessionId);
   else if(!request.url.startsWith(new URL(url).origin))await send('Fetch.failRequest',{requestId,errorReason:'BlockedByClient'},message.sessionId);
   else await send('Fetch.continueRequest',{requestId},message.sessionId);
   } catch(error) { if (!String(error).includes('Invalid InterceptionId')) throw error; }
  }
 });
 const {browserContextId}=await send('Target.createBrowserContext');
 const {targetId}=await send('Target.createTarget',{url:'about:blank',browserContextId});const {sessionId}=await send('Target.attachToTarget',{targetId,flatten:true});
 const command=(method,params)=>send(method,params,sessionId);
 await command('Page.enable');await command('Network.enable');await command('Runtime.enable');await command('Fetch.enable',{patterns:[{urlPattern:'*'}]});
 const evaluate=async expression=>{const result=await command('Runtime.evaluate',{expression,awaitPromise:true,returnByValue:true,userGesture:true});if(result.exceptionDetails)throw Error(result.exceptionDetails.exception?.description||result.exceptionDetails.text);return result.result.value};
 const wait=async expression=>{for(let i=0;i<160;i++){if(await evaluate(expression))return;await new Promise(resolve=>setTimeout(resolve,150))}throw Error('Browser wait: '+expression)};
 await command('Page.navigate',{url});
 return {command,evaluate,wait,errors,close:async()=>{closing=true;await command('Fetch.disable');await send('Target.disposeBrowserContext',{browserContextId});for(const pending of calls.values()){clearTimeout(pending.timer);pending.resolve({})}calls.clear();ws.close()}};
}
async function capture(page,name){const {data}=await page.command('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});await fs.writeFile(path.join(os.tmpdir(),name),Buffer.from(data,'base64'))}






const base='http://127.0.0.1:5248', token='s'.repeat(43);
const intercept = request => request.url.includes('/estadia-api/estadia/') ? {body:JSON.stringify({casa:'parque',nombre:'Huésped de prueba',check_in:'2026-11-20',check_out:'2026-11-25',timezone:'America/Argentina/Mendoza'})} : null;
let page=await browserPage(base+'/estadia?token='+token,intercept);
try {
  await page.wait("document.querySelector('[data-stay-install]')?.open");
  const manifest=await page.command('Page.getAppManifest');
  assert.equal(manifest.errors.length,0);
  const parsed=JSON.parse(manifest.data);
  assert.equal(parsed.start_url,'/estadia?token='+token);
  for (const width of [1366,390]) {
    await page.command('Emulation.setDeviceMetricsOverride',{width,height:844,deviceScaleFactor:1,mobile:width<500});
    assert.equal(await page.evaluate("document.documentElement.scrollWidth<=innerWidth+1"),true);
    assert.equal(await page.evaluate("(()=>{const r=document.querySelector('[data-stay-install]').getBoundingClientRect();return r.left>=0&&r.right<=innerWidth&&r.bottom<=innerHeight})()"),true);
    await capture(page,'stay-install-'+width+'.png');
  }
  await page.command('Input.dispatchKeyEvent',{type:'keyDown',key:'Escape',code:'Escape',windowsVirtualKeyCode:27,nativeVirtualKeyCode:27});
  await page.command('Input.dispatchKeyEvent',{type:'keyUp',key:'Escape',code:'Escape',windowsVirtualKeyCode:27,nativeVirtualKeyCode:27});
  await page.wait("document.querySelector('[data-stay-install]')?.open === false");
  await page.command('Page.reload');
  await page.wait("document.querySelector('[data-portal]')?.hidden === false");
  await new Promise(resolve=>setTimeout(resolve,1800));
  assert.equal(await page.evaluate("document.querySelector('[data-stay-install]').open"),false);
  // Simulate the browser event: native install consumes it exactly once.
  await page.evaluate("(()=>{window.installCalls=0;const e=new Event('beforeinstallprompt',{cancelable:true});e.prompt=async()=>{window.installCalls++};e.userChoice=Promise.resolve({outcome:'dismissed'});window.dispatchEvent(e);document.querySelector('[data-stay-save]').click();document.querySelector('[data-stay-install-native]').click()})()");
  await page.wait("document.querySelector('[data-stay-install]')?.open === false");
  assert.equal(await page.evaluate('window.installCalls'),1);
  await page.evaluate("document.querySelector('[data-stay-save]').click()");
  assert.equal(await page.evaluate("document.querySelector('[data-stay-install-native]').hidden"),true);
  await page.evaluate("window.dispatchEvent(new Event('appinstalled'))");
  assert.equal(await page.evaluate("document.querySelector('[data-stay-save]').hidden"),true);
} finally {await page.close()}
page=await browserPage(base+'/estadia?token=invalid',intercept);
try {
  await page.wait("document.querySelector('[data-error]')?.hidden === false");
  assert.equal(await page.evaluate("document.querySelector('[data-stay-save]').hidden"),true);
  assert.equal(await page.evaluate("!!document.querySelector('link[rel=manifest]')"),false);
} finally {await page.close()}
page=await browserPage(base+'/estadia?token='+token,request=>request.url.includes('/estadia-api/estadia/')?{status:404,body:'{}'}:null);
try {
  await page.wait("document.querySelector('[data-error]')?.hidden === false");
  assert.equal(await page.evaluate("document.querySelector('[data-stay-save]').hidden"),true);
  assert.equal(await page.evaluate("document.querySelector('[data-stay-install]').open"),false);
} finally {await page.close()}
page=await browserPage(base+'/estadia?token='+token,intercept);
try {
  await page.command('Emulation.setUserAgentOverride',{userAgent:'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 Version/18.0 Mobile/15E148 Safari/604.1'});
  await page.command('Page.reload');
  await page.wait("document.querySelector('[data-stay-install]')?.open");
  assert.equal(await page.evaluate("document.querySelector('[data-stay-install-help]').textContent.includes('Compartir')"),true);
  await page.command('Page.addScriptToEvaluateOnNewDocument',{source:"Object.defineProperty(navigator,'standalone',{value:true})"});
  await page.command('Page.reload');
  await page.wait("document.querySelector('[data-portal]')?.hidden === false");
  await new Promise(resolve=>setTimeout(resolve,1800));
  assert.equal(await page.evaluate("document.querySelector('[data-stay-save]').hidden"),true);
  assert.equal(await page.evaluate("document.querySelector('[data-stay-install]').open"),false);
} finally {await page.close()}
console.log('Stay install: manifest parsed by Chrome, mobile/desktop layout, Escape, session dismissal, one-use native prompt, appinstalled, iOS, standalone, malformed and revoked links passed. Synthetic responses only.');
