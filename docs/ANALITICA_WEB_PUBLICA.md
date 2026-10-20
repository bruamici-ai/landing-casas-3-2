# Analítica del sitio público

Usa un sitio de Umami independiente del portal Mi estadía. Configurar `PUBLIC_UMAMI_LANDING_WEBSITE_ID`, conservando `PUBLIC_UMAMI_SCRIPT_URL` y `PUBLIC_UMAMI_ENVIRONMENT`. Si el ID coincide con el de Mi estadía, el tracker público no se activa.

Se miden Inicio, las dos páginas de casas, Servicios, sus detalles publicados y Normas. Se excluyen rutas privadas, internas y desconocidas, local y previews. Solo se envía la ruta pública permitida: nunca query, hash, referrer completo, destinos externos, teléfonos, mensajes ni formularios.

Eventos en español: Visitó la web de las casas, Consultó una sección de la web, Eligió ver una casa, Abrió la galería de fotos, Abrió WhatsApp para consultar, Eligió ver un servicio, Consultó un servicio por WhatsApp y Tiempo activo en la web. Página, Casa, Casa elegida, Sección, Servicio, Ubicación del botón, Entorno y Tiempo activo son valores fijos del sitio; no provienen de textos ingresados por visitantes. Un clic a WhatsApp no confirma conversación ni reserva.

Las secciones requieren dos segundos de visibilidad, con umbral adaptado a secciones más altas que la pantalla. El tiempo activo descuenta pestañas ocultas e inactividad superior a un minuto, y se registra una vez por carga al primer ocultamiento o salida. La medición es opcional y no bloquea enlaces o galerías si Umami falla.

Para el panel administrativo, crear un Share con Overview y Events y configurar `UMAMI_LANDING_SHARE_URL` exclusivamente en el backend de ADMCasas. No guardar enlaces reales de Share en Git.

Validación: `node --test tests/landing-analytics.test.mjs tests/stay-analytics.test.mjs`, build y auditoría de red con el script real del proveedor. Probar ambas casas, Inicio, clics, exclusión de rutas privadas y funcionamiento con tracker bloqueado.
