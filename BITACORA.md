# Bitácora

## 2026-08-28

### Portal privado de presentación

- Se incorporó una ruta privada por casa que reutiliza el landing y sus mismas imágenes.
- El portal oculta contactos y botones de consulta, pero conserva los servicios como vidriera.
- Las imágenes reciben una marca de agua visible con el nombre entregado por ADM Casas.
- La generación y validación real de enlaces se trasladó a ADM Casas.

Registro breve de decisiones y cambios relevantes. Las entradas más recientes
se agregan arriba.

## 2026-08-15

### Hito: revisión visual y de contenido

- Se refinó la presentación de ambas casas y la comparación de servicios en el
  inicio, manteniendo la cantidad de prestaciones visibles.
- Se incorporó iconografía propia para datos clave, categorías y servicios.
- Se mejoró el recorrido de galería: las portadas de cada ambiente abren su
  sección correspondiente.
- Se simplificaron descripciones redundantes de comodidades.
- Se destacaron frases relevantes y los nombres de Bruno y Heliana en reseñas.
- Se actualizaron navegación, metadatos, analítica, sitemap, robots, página 404
  y documentación operativa.
- Se verificó la generación estática completa con `npm run build`.

### Privacidad de las propiedades

- Se retiraron las direcciones exactas de las fuentes de contenido y de las
  fichas del sitio.
- Se reemplazaron por descripciones generales de la zona.
- La dirección exacta queda reservada para huéspedes con reserva confirmada.

## 2026-08-14

### Revisión general

- Se confirmó que el proyecto es un sitio estático en Astro 5 para dos casas de
  alquiler temporario.
- No utiliza backend, base de datos ni autenticación.
- Las imágenes principales provienen de Cloudinary.
- Cada casa mantiene por separado su presentación, ficha y base de reseñas.
- Se decidió mantener una documentación liviana: `README.md`, `CONTENT.md` y
  esta bitácora.

### Limpieza de reseñas

Se excluyeron de la publicación y del cálculo de puntuaciones las siguientes
reseñas, conservándolas en los JSON para que el cambio sea reversible:

- Parque: `booking_016` y `booking_017`.
- Avellaneda: `airbnb_002`, `airbnb_005`, `booking_001`, `booking_008`,
  `booking_009`, `booking_027`, `booking_028` y `booking_029`.

La exclusión se implementó marcando esas entradas con `is_duplicate: true`.
Las demás reseñas identificadas durante la revisión permanecen publicadas.

### Verificación

- Los archivos JSON continuaron siendo válidos.
- La generación estática con `npm run build` finalizó correctamente.

## Formato para próximas entradas

```markdown
## AAAA-MM-DD

### Tema

- Qué cambió.
- Por qué se decidió.
- Cómo se verificó, si corresponde.
```
## 2026-08-28 — Ajustes finales de presentación

- Se ordenó la grilla de Momentos del día para evitar tarjetas aisladas en escritorio.
- En celulares, la sección La experiencia usa tarjetas de ancho completo.
- Cada imagen lateral del hero tiene su propio contenedor para que la marca de agua no se desplace entre fotos.
- El build estático fue verificado correctamente.
