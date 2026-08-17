import { defineConfig } from 'astro/config';

export default defineConfig({
  site: process.env.SITE_URL ?? 'https://landing-casas-3-2.vercel.app',
  vite: {
    server: {
      proxy: {
        '/estadia-api': {
          target: 'http://127.0.0.1:8000',
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
