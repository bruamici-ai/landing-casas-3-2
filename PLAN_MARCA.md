# Aplicación de marca (11/11/2026)

Solicitud: logo existente en landing, Mi estadía y portales de comisionistas, y muestra en loop en el manual. Se parte de 3c82942, se reutiliza public/brand del checkout mi-estadia y se conservan los recorridos publicados. Sin dependencias nuevas ni cambios de datos. Ver punto de recuperación coordinado en docs/PLAN_ACCION.md de ADMCasas, checkout em-brand-rollout. Implementación verificada: build con Astro 5.18.1, 25 pruebas y revisión de las superficies a 1440/390 (evidencia en .local/em-brand-surfaces de ADMCasas); publicación pendiente de autorización específica para este alcance.

Ajuste solicitado: dibujar la arquitectura una sola vez y alternar día/noche (24 s), con sol, luna, ventanales y piscina iluminados. Se conservan controles y firmas estáticas. Implementado y verificado en manual a 1440/390, incluido segundo amanecer sin redibujar; exportaciones SVG sincronizadas con ADMCasas. Sin publicación.
