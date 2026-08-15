import { defineConfig } from 'astro/config';

export default defineConfig({
  site: process.env.SITE_URL ?? 'https://landing-casas-3-2.vercel.app',
  redirects: {
    '/fla-casa-frente-al-parque': '/la-casa-frente-al-parque',
    '/fcasa-avellaneda': '/casa-avellaneda'
  }
});
