# Analítica del sitio público

Puede usar el mismo sitio de Umami que Mi estadía cuando el plan limita la cantidad de sitios. Por defecto toma `PUBLIC_UMAMI_WEBSITE_ID`; opcionalmente `PUBLIC_UMAMI_LANDING_WEBSITE_ID` permite indicar otro sitio. Conserva `PUBLIC_UMAMI_SCRIPT_URL` y `PUBLIC_UMAMI_ENVIRONMENT`. El portal siempre registra la ruta virtual `/estadia` y la web pública registra únicamente sus rutas públicas permitidas.

Se miden Inicio, las dos páginas de casas, Servicios, sus detalles publicados y Normas. Se excluyen rutas privadas, internas y desconocidas, local y previews. Solo se envía la ruta pública permitida: nunca query, hash, referrer completo, destinos externos, teléfonos, mensajes ni formularios.

Eventos en español: Visitó la web de las casas, Consultó una sección de la web, Eligió ver una casa, Abrió la galería de fotos, Abrió WhatsApp para consultar, Eligió ver un servicio, Consultó un servicio por WhatsApp y Tiempo activo en la web. Página, Casa, Casa elegida, Sección, Servicio, Ubicación del botón, Entorno y Tiempo activo son valores fijos del sitio; no provienen de textos ingresados por visitantes. Un clic a WhatsApp no confirma conversación ni reserva.

Las secciones requieren dos segundos de visibilidad, con umbral adaptado a secciones más altas que la pantalla. El tiempo activo descuenta pestañas ocultas e inactividad superior a un minuto, y se registra una vez por carga al primer ocultamiento o salida. La medición es opcional y no bloquea enlaces o galerías si Umami falla.

El panel administrativo reutiliza `UMAMI_SHARE_URL` con filtros iniciales por ruta: Mi estadía incluye solo `/estadia`; Web de las casas excluye esa ruta. La ruta final de Umami Cloud `/analytics/us/share/<id>` conserva esos filtros, mientras que el enlace corto `/share/<id>` los pierde al redirigir. `UMAMI_SHARE_REGION` permite seleccionar `us` o `eu`. `UMAMI_LANDING_SHARE_URL` sigue siendo opcional si luego se dispone de otro Share. No guardar enlaces reales de Share en Git. La vista general sin filtrar de Umami reúne ambos usos; cada pestaña de ADMCasas aplica su filtro inicial, que el usuario puede cambiar o restaurar con Actualizar.

Validación: `node --test tests/landing-analytics.test.mjs tests/stay-analytics.test.mjs`, build y auditoría de red con el script real del proveedor. Probar ambas casas, Inicio, clics, exclusión de rutas privadas y funcionamiento con tracker bloqueado.
