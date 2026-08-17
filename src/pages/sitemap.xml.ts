import type { APIRoute } from 'astro';

const routes = [
  '/', '/la-casa-frente-al-parque', '/casa-avellaneda', '/servicios',
  '/servicios/traslados', '/servicios/compras-previas', '/servicios/degustaciones',
  '/servicios/parrillero', '/servicios/detalles-regionales', '/servicios/otro',
  '/normas-penalidades'
];

export const GET: APIRoute = ({ site }) => {
  const base = site ?? new URL('https://experiencia-mendoza.vercel.app');
  const urls = routes.map((route) => `<url><loc>${new URL(route, base).href}</loc></url>`).join('');
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' }
  });
};
