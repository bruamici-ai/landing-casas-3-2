# Guía rápida de contenido

Este archivo indica dónde editar el contenido del sitio sin recorrer todo el
código.

## Información general

`src/data/site.ts` contiene:

- marca y dominio principal;
- WhatsApp general;
- servicios adicionales;
- reglas y penalidades comunes.

## La Casa Frente al Parque

- Presentación, textos, WhatsApp e imágenes: `src/data/parque/house.ts`
- Capacidad y comodidades: `src/data/parque/ficha-casa-parque.json`
- Reseñas originales: `src/data/parque/la-casa-frente-al-parque-reviews.json`
- Selección y promedio de reseñas: `src/data/parque/reviews.ts`

## Casa Avellaneda

- Presentación, textos, WhatsApp e imágenes: `src/data/avellaneda/house.ts`
- Capacidad y comodidades: `src/data/avellaneda/ficha-casa-avellaneda.json`
- Reseñas originales: `src/data/avellaneda/casa-avellaneda-reviews.json`
- Selección y promedio de reseñas: `src/data/avellaneda/reviews.ts`

## Cómo se muestran las reseñas

Los módulos `reviews.ts`:

1. excluyen los registros marcados con `is_duplicate: true`;
2. calculan los promedios por plataforma con las reseñas restantes;
3. ordenan las reseñas por fecha;
4. muestran las 30 más recientes que tengan texto.

Para ocultar una reseña de forma reversible, cambiar su propiedad
`is_duplicate` a `true`. Para restaurarla, volverla a `false`.

## Imágenes

Las fotografías de las casas se referencian principalmente mediante URLs de
Cloudinary dentro de cada `house.ts`. Las imágenes locales de servicios están
en `public/services/` y las de anfitriones en `public/hosts/`.

## Privacidad de las ubicaciones

Las fichas públicas solo guardan una `zona` general. No agregar direcciones,
coordenadas, enlaces a mapas ni referencias que permitan identificar la puerta
de cada propiedad. La dirección exacta se comparte de manera privada después de
confirmar la reserva.


## Componentes compartidos

`src/components/HouseLanding.astro` arma ambas landings utilizando los datos de
cada casa. Los componentes de sus secciones están en `src/components/house/`.

Antes de publicar un cambio, ejecutar:

```bash
npm run build
```
