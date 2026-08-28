import { defineConfig } from 'astro/config';

export default defineConfig({
  site: process.env.SITE_URL ?? 'https://experiencias-mendoza.vercel.app',
  vite: {
    server: {
      proxy: {
        '/estadia-api': {
          target: process.env.ESTADIA_API_TARGET ?? 'http://127.0.0.1:8000',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/estadia-api/, '')
        }
      }
    }
  },
  redirects: {
    '/fla-casa-frente-al-parque': '/la-casa-frente-al-parque',
    '/fcasa-avellaneda': '/casa-avellaneda'
  }
});
