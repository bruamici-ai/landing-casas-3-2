# Operación SEO

## Variables de entorno

- `SITE_URL`: dominio público completo, sin ruta. El dominio canónico es `https://experiencia-mendoza.vercel.app`.
- `PUBLIC_GA_MEASUREMENT_ID`: ID real de GA4 (formato `G-...`). Si no se define, el sitio no carga Google Analytics.

## Google Search Console

1. Crear una propiedad de tipo **Prefijo de URL** para `https://experiencia-mendoza.vercel.app/`.
2. Verificarla mediante etiqueta HTML o archivo HTML. No se puede usar la verificación DNS de `vercel.app` porque ese dominio pertenece a Vercel.
3. En **Sitemaps**, enviar `https://experiencia-mendoza.vercel.app/sitemap.xml`.
4. Inspeccionar las URLs de inicio, ambas casas y servicios después del despliegue.
5. Cuando se conecte el dominio propio, crear una nueva propiedad de tipo **Dominio** y verificarla mediante DNS.

## Google Analytics 4

1. Crear o reutilizar una propiedad y un flujo web de GA4.
2. Configurar `PUBLIC_GA_MEASUREMENT_ID` en Vercel con el ID real y volver a desplegar.
3. Verificar en DebugView/Realtime los eventos `whatsapp_click` y `consultation_click`.

## Google Business Profile

No se crea ni modifica desde este repositorio. Cuando haya un perfil oficial, mantener consistentes el nombre de marca, Mendoza y los canales de contacto. Su URL oficial puede incorporarse luego a `sameAs` en los datos estructurados.

## Datos pendientes

- Enlaces oficiales de Google Business Profile y redes sociales.
- Confirmación de si se desea publicar un teléfono general además de los WhatsApp específicos.
- Coordenadas o dirección pública: no se incluyeron para evitar revelar o inventar datos.
- Política deseada para `GPTBot`: no se modificó. `robots.txt` solo explicita el acceso de `OAI-SearchBot`.
