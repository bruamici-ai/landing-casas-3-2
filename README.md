# Experiencias Mendoza

Sitio estático para presentar dos casas de alquiler temporario en Mendoza:

- La Casa Frente al Parque
- Casa Avellaneda

También incluye información sobre servicios complementarios, normas de estadía,
fichas de las propiedades y reseñas de huéspedes.

## Tecnología

- Astro 5
- TypeScript
- Imágenes principales alojadas en Cloudinary
- Salida estática, apta para Vercel o cualquier hosting de archivos estáticos

No utiliza backend, base de datos ni autenticación.

## Uso local

```bash
npm install
npm run dev
```

Otros comandos disponibles:

```bash
npm run build
npm run preview
```

## Páginas principales

- `/`: presentación general de Experiencias Mendoza
- `/la-casa-frente-al-parque`: landing de Parque
- `/casa-avellaneda`: landing de Avellaneda
- `/servicios`: servicios adicionales
- `/normas-penalidades`: reglas comunes de estadía

Las rutas `/parque/*` y `/avellaneda/*` contienen fichas y consultas internas.

## Organización

```text
src/
  components/       Componentes visuales compartidos
  data/             Contenido general y datos de ambas casas
  layouts/          Estructura HTML y metadatos comunes
  pages/            Rutas del sitio
  utils/            Utilidades, incluida la optimización de Cloudinary
public/              Archivos públicos e imágenes locales
```

Para saber dónde cambiar textos, imágenes, teléfonos o reseñas, consultar
[CONTENT.md](./CONTENT.md). Las decisiones y cambios relevantes se registran en
[BITACORA.md](./BITACORA.md).

## Configuración del dominio

Astro utiliza `SITE_URL` cuando está definida. En caso contrario, el dominio
predeterminado es `https://experienciasmendoza.com`.
