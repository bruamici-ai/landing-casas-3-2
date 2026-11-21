export function mountStayInstall() {
  const dialog = document.querySelector('[data-stay-install]');
  const trigger = document.querySelector('[data-stay-save]');
  const nativeButton = document.querySelector('[data-stay-install-native]');
  const help = document.querySelector('[data-stay-install-help]');
  const portal = document.querySelector('[data-portal]');
  const parts = location.pathname.split('/').filter(Boolean);
  const token = new URLSearchParams(location.search).get('token') || (parts[0] === 'estadia' ? parts[1] : '');
  if (!dialog || !trigger || !portal || !/^[A-Za-z0-9_-]{32,160}$/.test(token || '')) return;

  let prompt = null, installed = false, offered = false, dismissalKey = '';
  const standalone = () => matchMedia('(display-mode: standalone)').matches || navigator.standalone;
  const ios = /iphone|ipad|ipod/i.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  const android = /android/i.test(navigator.userAgent);
  const update = () => {
    nativeButton.hidden = !prompt;
    help.textContent = prompt ? 'Al continuar, tu navegador te pedirá confirmar la instalación.'
      : ios ? 'En Safari, tocá Compartir y luego “Agregar a inicio”. Si abriste el enlace dentro de WhatsApp o del correo, abrilo primero en Safari.'
      : android ? 'Abrí el menú de tu navegador y elegí “Agregar a la pantalla principal” o “Instalar aplicación”. Si estás dentro de WhatsApp o del correo, abrí este enlace en Chrome.'
      : 'En Chrome o Edge, abrí el menú del navegador y buscá la opción para instalar esta página como aplicación. En Safari para Mac, usá Archivo → Agregar al Dock.';
    trigger.hidden = installed || standalone() || portal.hidden;
  };
  window.addEventListener('beforeinstallprompt', event => {
    event.preventDefault();
    prompt = event;
    update();
  });
  window.addEventListener('appinstalled', () => {
    installed = true;
    prompt = null;
    dialog.close();
    update();
  });
  // This page has its own identity and launch URL; guest responses are not cached.
  const manifest = document.createElement('link');
  manifest.rel = 'manifest';
  manifest.href = '/api/estadia-manifest?' + new URLSearchParams({ token });
  document.head.append(manifest);
  const open = () => { update(); if (!trigger.hidden && !dialog.open) dialog.showModal(); };
  trigger.addEventListener('click', open);
  const remember = () => { try { if (dismissalKey) sessionStorage.setItem(dismissalKey, '1'); } catch {} };
  dialog.querySelectorAll('[data-stay-install-close]').forEach(button => button.addEventListener('click', () => dialog.close()));
  dialog.addEventListener('close', remember);
  nativeButton.addEventListener('click', async () => {
    if (!prompt) return;
    const current = prompt;
    prompt = null;
    try {
      await current.prompt();
      const choice = await current.userChoice;
      if (choice.outcome === 'accepted') installed = true;
      dialog.close();
    } catch {
      // Leave the platform instructions available when native installation fails.
    } finally { update(); }
  });
  const offer = async () => {
    update();
    if (portal.hidden || offered || installed || standalone()) return;
    offered = true;
    try {
      const hash = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(token));
      dismissalKey = 'stay-install:' + Array.from(new Uint8Array(hash), value => value.toString(16).padStart(2, '0')).join('');
      if (sessionStorage.getItem(dismissalKey)) return;
    } catch {}
    setTimeout(() => { if (!document.querySelector('dialog[open]')) open(); }, 1500);
  };
  new MutationObserver(offer).observe(portal, { attributes: true, attributeFilter: ['hidden'] });
  void offer();
}
