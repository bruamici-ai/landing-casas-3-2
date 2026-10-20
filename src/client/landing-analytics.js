// Public-page reporting: no private routes, URL parameters, form data or link destinations.
export function startLandingAnalytics(config) {
  const uuid = /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/i;
  if (!uuid.test(config.websiteId || '') || !config.scriptUrl) return;
  if (config.environment !== 'audit' && (config.environment !== 'production' || location.hostname !== 'experiencias-mendoza.vercel.app')) return;
  const houses = {
    '/la-casa-frente-al-parque':'La Casa Frente al Parque',
    '/casa-avellaneda':'Casa Avellaneda'
  };
  const pages = {
    '/':'Inicio', ...houses, '/servicios':'Servicios', '/normas-penalidades':'Normas de las casas',
    ...Object.fromEntries(Object.entries(config.services || {}).map(([slug, title]) => [`/servicios/${slug}`, title]))
  };
  const path = location.pathname.replace(/\/$/, '') || '/';
  if (!Object.hasOwn(pages, path)) return;
  const context = {
    'Área':'Web de las casas', 'Página':pages[path],
    'Entorno':config.environment === 'audit' ? 'Auditoría' : 'Producción',
    ...(houses[path] ? { 'Casa':houses[path] } : {})
  };
  const payload = (name, data = {}) => ({
    website:config.websiteId, hostname:location.hostname, language:navigator.language,
    screen:`${screen.width}x${screen.height}`, url:path, title:pages[path], referrer:'',
    ...(name ? { name, data:{ ...context, ...data } } : {})
  });
  const track = (name, data = {}) => {
    try { Promise.resolve(window.umami.track(payload(name, data))).catch(() => {}); } catch {}
  };
  const script = document.createElement('script');
  script.defer = true;
  script.src = config.scriptUrl;
  script.referrerPolicy = 'no-referrer';
  script.dataset.websiteId = config.websiteId;
  script.dataset.autoTrack = 'false';
  script.dataset.autoPageview = 'false';
  script.dataset.excludeSearch = 'true';
  script.dataset.landingTracker = 'true';
  script.addEventListener('load', () => {
    if (!window.umami) return;
    track();
    track('Visitó la web de las casas');

    const sections = [
      ['.hero-basic,.hero,.services-hero', 'Presentación'], ['.hosts-pro', 'Anfitriones'],
      ['.houses', 'Casas disponibles'], ['.overview', 'Descripción de la casa'],
      ['.details', 'Fotos y comodidades'], ['.amenities-block', 'Comodidades'],
      ['.moments-section', 'Experiencias en la casa'], ['.reviews', 'Opiniones de huéspedes'],
      ['#servicios,.services,.cards', 'Servicios'], ['.service-section', 'Detalle del servicio'],
      ['.final-cta', 'Consulta de disponibilidad']
    ];
    const seen = new Set();
    const nodes = new Map();
    const cancel = record => { clearTimeout(record.timer); record.timer = null; };
    const schedule = record => {
      if (seen.has(record.label) || record.timer || !record.visible || document.visibilityState !== 'visible') return;
      record.timer = setTimeout(() => {
        record.timer = null;
        if (record.visible && document.visibilityState === 'visible' && !seen.has(record.label)) {
          seen.add(record.label);
          track('Consultó una sección de la web', { 'Sección':record.label });
        }
      }, 2000);
    };
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(entries => entries.forEach(entry => {
        const record = nodes.get(entry.target);
        record.visible = entry.isIntersecting && entry.intersectionRect.height >= Math.min(entry.boundingClientRect.height * .5, window.innerHeight * .5);
        if (record.visible) schedule(record); else cancel(record);
      }), { threshold:[0,.1,.2,.3,.4,.5,.6,.7,.8,.9,1] });
      sections.forEach(([selector, label]) => document.querySelectorAll(`main ${selector.split(',').join(',main ')}`).forEach(node => {
        if (nodes.has(node)) return;
        nodes.set(node, { label, visible:false, timer:null });
        observer.observe(node);
      }));
    }

    document.addEventListener('click', event => {
      const target = event.target instanceof Element ? event.target : null;
      const gallery = target?.closest('[data-open-gallery]');
      if (gallery) { track('Abrió la galería de fotos'); return; }
      const link = target?.closest('a[href]');
      if (!link) return;
      let destination;
      try { destination = new URL(link.getAttribute('href'), location.origin); } catch { return; }
      if (['wa.me','api.whatsapp.com'].includes(destination.hostname)) {
        const service = link.getAttribute('data-service-link') || path.split('/servicios/')[1];
        if (service && Object.hasOwn(config.services, service)) {
          track('Consultó un servicio por WhatsApp', { 'Servicio':config.services[service] });
        } else {
          track('Abrió WhatsApp para consultar', { 'Ubicación del botón':link.closest('.hero') ? 'Presentación' : link.closest('.final-cta') ? 'Final de la página' : link.closest('header') ? 'Menú superior' : 'Página' });
        }
      } else if (destination.origin === location.origin) {
        const nextPath = destination.pathname.replace(/\/$/, '') || '/';
        if (Object.hasOwn(houses, nextPath)) track('Eligió ver una casa', { 'Casa elegida':houses[nextPath] });
        else if (nextPath.startsWith('/servicios/') && Object.hasOwn(pages, nextPath)) track('Eligió ver un servicio', { 'Servicio':pages[nextPath] });
      }
    });

    let lastTick = Date.now(), lastInteraction = lastTick, activeMs = 0;
    let visible = document.visibilityState === 'visible', sent = false;
    const accumulate = () => {
      const now = Date.now();
      if (visible) activeMs += Math.max(0, Math.min(now, lastInteraction + 60000) - lastTick);
      lastTick = now;
    };
    const sendTime = () => {
      accumulate();
      if (sent) return;
      sent = true;
      const minutes = activeMs / 60000;
      track('Tiempo activo en la web', { 'Tiempo activo':minutes < 1 ? 'Menos de 1 minuto' : minutes < 3 ? '1 a 3 minutos' : minutes < 10 ? '3 a 10 minutos' : 'Más de 10 minutos' });
    };
    ['click','keydown','touchstart','scroll'].forEach(name => window.addEventListener(name, () => { accumulate(); lastInteraction = Date.now(); }, { passive:true }));
    document.addEventListener('visibilitychange', () => {
      accumulate();
      visible = document.visibilityState === 'visible';
      nodes.forEach(record => { if (visible) schedule(record); else cancel(record); });
      if (!visible) sendTime(); else lastInteraction = Date.now();
    });
    window.addEventListener('pagehide', sendTime);
  }, { once:true });
  document.head.append(script);
}
