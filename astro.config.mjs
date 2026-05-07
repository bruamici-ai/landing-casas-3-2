import { defineConfig } from 'astro/config';

export default defineConfig({
  site: process.env.SITE_URL ?? 'https://experienciasmendoza.com',
  redirects: {
    '/fla-casa-frente-al-parque': '/la-casa-frente-al-parque',
    '/fcasa-avellaneda': '/casa-avellaneda'
  }
});
