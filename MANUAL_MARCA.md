# Experiencias Mendoza — Manual de marca y sistema de diseño

Versión 0.11 · 12 de noviembre de 2026 · Aplicación de la firma existente y muestra animada con dibujo inicial y ciclo día/noche.

Documento de referencia para el sitio, Mi estadía y la propuesta para comercios. Conserva las decisiones del usuario y las reglas de implementación existentes. El 11/11/2026 el usuario solicitó aplicar la firma existente a la landing, Mi estadía y los portales de comisionistas, y agregar su muestra animada en loop al manual. Esta aprobación de aplicación no autoriza rediseños adicionales ni constituye por sí sola un despliegue. El panel administrativo mantiene su identidad ADMCasas.

## Lectura y alcance compartidos

Este manual utiliza las mismas diez secciones que el de la otra marca del ecosistema. La estructura común facilita comparar reglas; cada marca conserva sus colores, fuentes, logotipos y usos.

| Estado | Interpretación |
| --- | --- |
| Implementado | Existe en las fuentes indicadas; no implica publicación ni aprobación visual |
| En revisión | Propuesta disponible para consulta, pendiente de criterio visual |
| Pendiente de aprobación | No completar por suposición ni crear variantes nuevas |
| Antecedente | Referencia previa; no reemplaza una regla vigente posterior |

Los acuerdos explícitos conservan su alcance. Aprobar una bajada no aprueba todo el diseño. Los valores declarados y los ejemplos locales no acreditan por sí solos la fuente renderizada, el contraste ni la revisión publicada. Las copias del centro de desarrollo se sincronizan desde el original y conservan su versión y fecha.

| Superficie | Identidad de referencia |
| --- | --- |
| Gestión, reservas, finanzas y cuentas | ADMCasas |
| Sitio de alojamientos y propuesta para comercios | Experiencias Mendoza |
| Mi estadía y formularios públicos | Variante implementada en esa superficie; no extrapolarla al panel |
| Desarrollo y revisión | Contenedor de consulta con diseño propio; no define las marcas |

## 01. Identidad de marca

**Nombre:** Experiencias Mendoza.

**Bajada exacta:** Casas grandes para alquiler temporario.

La propuesta se centra en alojarse en casas grandes en Mendoza. El paisaje, la naturaleza y las experiencias acompañan al alojamiento. La comunicación debe mostrar las casas y explicar con claridad qué ofrecen.

Escribir el nombre con mayúsculas iniciales en los textos. Mantener la bajada en forma de frase, sin convertirla en un bloque de mayúsculas. No sustituirla por «Casas de lujo en Mendoza» ni recuperar esa expresión como bajada de la marca.

### Dirección visual y estado de las decisiones

| Elemento | Criterio vigente | Estado |
| --- | --- | --- |
| Casa | Elemento principal del isotipo: volúmenes amplios, ventanales y piscina | Dirección solicitada por el usuario |
| Montaña | Referencia secundaria a Mendoza detrás de la casa | Acompañamiento del alojamiento |
| Bajada | «Casas grandes para alquiler temporario» | Texto solicitado por el usuario |
| Última composición | Residencia de volúmenes escalonados y piscina con montaña detrás, nombre y bajada separada | Aplicación solicitada por el usuario el 11/11/2026 |
| Casa diminuta dentro de montañas dominantes, sendero y bajada de letras diminutas | No reutilizar esa jerarquía | Propuestas anteriores reemplazadas |

Buscar una estética moderna, minimalista, elegante y profesional. Evitar acumulación de símbolos, efectos 3D, sombras sobre la marca y degradados decorativos en el logotipo.

### Imágenes y comunicación

Mostrar fotografías reales de las casas: amplitud de los ambientes, espacios compartidos, equipamiento, patios y detalles cuidados. Las montañas y otros paisajes aportan contexto de Mendoza; acompañan a la presentación de los alojamientos.

Usar un tono cercano, claro y cuidado, coherente con el voseo del sitio. Describir características verificables. Evitar promesas absolutas y no atribuir servicios, capacidad, beneficios o condiciones que no estén confirmados en la información de cada casa.

Ejemplos de redacción compatibles: «Casas grandes para alquiler temporario» y «Conocé los espacios y elegí tu casa en Mendoza».

## 02. Logotipo

La firma combina un isotipo de residencia con dos volúmenes, ventanales y piscina en primer plano y montaña detrás y el nombre en dos niveles: EXPERIENCIAS / MENDOZA. El nombre usa Plus Jakarta Sans Medium (500) convertido a contornos SVG. Ambas palabras comparten familia, peso, altura óptica y alineación izquierda; no reconstruir la firma con otra fuente o alterando sólo letras aisladas.

| Variante | Archivo base | Uso |
| --- | --- | --- |
| Horizontal | [horizontal.svg](public/brand/horizontal.svg) | Firma con símbolo y nombre |
| Compacta | [mark.svg](public/brand/mark.svg) | Iconos, avatares y espacios reducidos; sin bajada |
| Verde | `horizontal-dark.svg`, `mark-dark.svg` | Fondos claros |
| Clara | `horizontal-light.svg`, `mark-light.svg` | Fondos oscuros |
| Monocromática negra | `horizontal-mono.svg`, `mark-mono.svg` | Exportación a una tinta |
| Color del contexto | `tone="mono"` en los componentes | Hereda un color único con contraste suficiente |

Las exportaciones SVG contienen símbolo y nombre, **sin la bajada**. La bajada se añade como texto independiente mediante el componente para conservar legibilidad. Si se utiliza un SVG en una pieza gráfica externa, componer la frase aparte siguiendo estas reglas.

El favicon del sitio usa el mismo símbolo de casa con montaña detrás. El panel administrativo conserva su propia identidad ADMCasas; no se renombra por esta tarea.

### Aplicación y animación solicitadas el 11/11/2026

Se reutilizan los SVG canónicos horizontal y compacto, con la bajada existente. El manual incluye un dibujo inicial de la casa, paisaje y viñedos que se realiza una sola vez (4,2 segundos). Después se repite un ciclo de día/noche de 24 segundos: el sol recorre el cielo y se oculta; asciende la luna y se encienden los ventanales y la piscina; al amanecer las luces se apagan. La arquitectura permanece dibujada durante todos los ciclos. La cordillera se extiende hasta detrás de los viñedos y utiliza #7E9186, un verde grisáceo más oscuro. El usuario eligió continuar con el verde original el 12/11/2026. La alternativa malbec queda como antecedente, fuera de la muestra vigente. La casa conserva sus contornos verdes y fondo transparente también de noche; no se oscurece la fachada. El sol y la luna recorren casi todo el horizonte, desde los viñedos hasta el extremo derecho de la cordillera. Los pájaros se muestran de día y dan paso a estrellas de noche; se conservan las luces de ventanas y piscina. El cielo mantiene el fondo transparente, sin bloques oscuros; la luna usa un verde grisáceo visible sobre crema y las luces sugieren la noche. El nombre permanece legible durante el ciclo. Se puede pausar/reanudar; con movimiento reducido se muestra la firma completa sin animación automática y el botón permite iniciarla expresamente. Las cabeceras y pies utilizan por defecto la firma estática para acompañar la navegación.

Aplicaciones: cabecera y pie del sitio, casas y servicios; Mi estadía durante carga y estadía activa, guía y pie inverso; portales de comisionistas, generador de enlaces, medición y propuesta de comercios; formulario público de huéspedes. ADMCasas conserva su propia marca en gestión. No sustituir logos de comercios, fotografías ni las marcas de agua de los portales.

Fuente: `public/brand`, componente `BrandLogo.astro` y generador `scripts/sync-brand.mjs`. Las copias de ADMCasas se sincronizan mediante ese generador. El estado de publicación se verifica por separado de esta implementación.

## 03. Paleta cromática

### Identidad compartida del logotipo

| Color | Valor | Token | Uso |
| --- | --- | --- | --- |
| Agua suave | `#C4DFDA` | `--brand-water-soft` | Relleno interior de la pileta sobre fondos claros |
| Montaña clara | `#7E9186` | `--brand-mountain-light` | Cordillera secundaria con espacio respecto del techo |
| Verde profundo | `#173D34` | `--brand-forest` | Firma sobre fondos claros y superficies oscuras de marca |
| Crema | `#F6F3EB` | `--brand-cream` | Fondos claros y firma sobre verde |
| Vinotinto / malbec | `#661A30` | `--brand-wine` | Bajada y detalles pequeños sobre fondos claros |
| Dorado | `#C99D4E` | `--brand-gold` | Acentos decorativos moderados |

Usar verde sobre crema o la versión clara sobre verde. El usuario autorizó agregar detalles en vinotinto: se toma el malbec existente #661A30. Aplicarlo como acento secundario en la bajada, líneas finas y detalles de presentación; el símbolo y el nombre permanecen verdes. En fondos oscuros, la bajada sigue clara; en monocromía hereda la única tinta del conjunto. Evitar el dorado en texto pequeño sobre crema. Sobre fotografías, buscar una zona uniforme o una superficie de apoyo que permita leer la firma completa.

### Paleta editorial existente del sitio

El sitio y las guías mantienen su paleta malbec. Este trabajo no autoriza sustituirla globalmente por verde.

| Color existente | Valor | Función actual |
| --- | --- | --- |
| Malbec | `#661A30` | Color editorial y de interfaz |
| Malbec claro | `#6A2F42` | Variante existente |
| Malbec oscuro | `#5B0B25` | Títulos y acciones existentes |
| Dorado editorial | `#B8843D` | Acentos del sitio |
| Salvia | `#53675A` | Acompañamiento editorial |
| Superficie | `#FFFDFC` | Fondo claro |
| Tinta | `#2D2523` | Texto principal |

El PDF anterior usa esta base editorial. Se conserva como antecedente; no debe interpretarse como una versión actualizada del logotipo nuevo. Si se decide unificar ambas paletas, deberá revisarse expresamente como un cambio adicional.

## 04. Sistema tipográfico

| Familia | Pesos y estilo | Uso |
| --- | --- | --- |
| Plus Jakarta Sans | Normal 400, 500, 600, 700 | Texto, navegación, interfaz y bajada |
| Cormorant Garamond | Normal 500, 600, 700 | Títulos editoriales del sitio |
| Nombre en SVG | Plus Jakarta Sans Medium 500, convertida a contornos | EXPERIENCIAS y MENDOZA con la misma altura óptica y peso |

Conservar los pesos adicionales ya usados por el sitio cuando los requiera un componente. Usar fallbacks `system-ui, sans-serif` y `Georgia, serif`, respectivamente. La carga web existente usa `display=swap`.

Ambas familias tienen licencia SIL Open Font License 1.1: [Plus Jakarta Sans](https://github.com/google/fonts/blob/main/ofl/plusjakartasans/OFL.txt) y [Cormorant Garamond](https://github.com/google/fonts/blob/main/ofl/cormorantgaramond/OFL.txt). No se agregaron dependencias para la identidad.

## 05. Componentes de interfaz

Los componentes documentados son implementaciones existentes, no una nueva biblioteca visual.

| Componente / fuente | Uso y reglas |
| --- | --- |
| `src/components/BrandLogo.astro` | Firma horizontal o compacta; tonos dark/light/mono; tamaños sm/md/lg; bajada independiente; animación opcional, apagada por defecto |
| `public/brand/brand-logo.js` | Adaptador HTML de los mismos recursos; conservar alternativa sin JavaScript y texto de bajada |
| `src/pages/identidad.astro` | Muestra local de variantes y descargas; controles de pausa/repetición; no acredita publicación |
| `public/brand/tokens.css`, `.em-brand` | Proporción, ancho, separación, color por contexto y movimiento reducido |

La navegación, las tarjetas, formularios y llamadas a la acción del sitio conservan su paleta editorial existente. No se normalizan visualmente con los componentes administrativos de ADMCasas. No se ha establecido un catálogo global único para todos esos componentes: seguir el equivalente de la página y documentar cualquier decisión pendiente antes de ampliarlo.

## 06. Sistema visual

### Proporciones, espacio y bajada

- Conservar siempre la proporción original del SVG.
- Dejar un mínimo de 8 px libres alrededor del conjunto; aumentar ese margen en piezas grandes.
- Firma horizontal: 180 px como mínimo en web. Tamaños implementados: 180, 224 y 258 px.
- Isotipo: 32 px como mínimo. Tamaños implementados: 32, 44 y 64 px.
- Bajada: Plus Jakarta Sans, peso 400, tamaño web actual 11 px, interlineado 1.5 y separación de 12 px respecto del SVG.
- Mantener la frase centrada y sin espaciado artificial entre letras. Puede envolver de forma natural en móvil; no reducirla para forzar una sola línea.
- En navegación ajustada, usar la firma sin bajada. En la versión compacta se omite siempre.
- En impresión, comprobar la lectura al tamaño físico final; los mínimos web no son especificaciones de impresión.

No amontonar la bajada debajo de MENDOZA, incrustarla como letras minúsculas en el dibujo ni reducir la casa a un detalle dentro de montañas dominantes. La casa debe leerse primero y la montaña acompañarla.

### Versión animada en loop

La muestra de `/identidad` y del manual privado comparte el dibujo inicial único y el ciclo día/noche descritos en Logotipo, con controles de pausa/reanudación y firma completa sin animación ante `prefers-reduced-motion`. Las exportaciones `horizontal-animated.svg` y `mark-animated.svg` usan la misma secuencia. En la navegación y los adaptadores HTML se usa la firma estática; `animated` activa la muestra de movimiento. La aplicación del dibujo existente fue solicitada el 11/11/2026; su publicación se registra por separado.

### Composición conjunta vigente: casa, montaña y viñedo

El usuario aclara expresamente que solicita los tres elementos en un solo símbolo. La casa amplia con piscina continúa en primer plano y ocupa la mayor parte del isotipo. Los Andes quedan detrás y hileras de vides en espaldera se sitúan a la izquierda de la casa: líneas paralelas en perspectiva, con postes y alambres sencillos. No utilizar un racimo colgante. No reemplazar la casa por una marca de viñedo.

Casa, piscina e hileras de viñedo son verde profundo. La montaña usa verde grisáceo claro #7E9186 (sobre fondo oscuro: #AAB8AB), con trazos abiertos que terminan antes de tocar el techo. En la vista original de 64 unidades, la separación vertical más corta entre montaña y cubierta es de unas 2.4 unidades, antes de descontar el grosor de línea. El vinotinto se conserva en la bajada y los detalles de presentación. En las versiones clara y monocromática, todos los elementos conservan una sola tinta. La bajada sigue siendo «Casas grandes para alquiler temporario».

Los mismos SVG y el mismo componente sirven para todas las aplicaciones. La versión animada dibuja primero la casa (0–1.75 s); después la cordillera (desde 2.1 s), piscina (2.4 s), hileras de viñedo (desde 2.8 s), salida del sol detrás de la montaña (3.1–5.7 s) y postes (desde 3.35 s). Dos aves hacen un único paso entre 4.8 y 9.2 s y desaparecen; después sólo continúa el movimiento suave del agua. Se mantienen pausa, repetición y reproducción voluntaria cuando el dispositivo prefiere movimiento reducido. La composición visual sigue en revisión y no autoriza publicación.


El sol es un acento dorado en la versión a color, de radio 4.5 unidades (antes: 2.5). Asciende hasta 26 unidades y recorre el cielo horizontalmente desde detrás de un recorte con el perfil de la montaña: primero asoma una porción del disco y luego se ve completo antes de ocultarse. No simular la salida sólo con opacidad ni hacerlo atravesar el techo. Los recortes SVG reciben IDs únicos por instancia en Astro para evitar interferencias entre logotipos de una misma página. Las aves son exclusivas de la versión animada: no recargan el logotipo estático y repiten su paso en cada ciclo de la muestra. Las variantes monocromáticas mantienen una sola tinta y conservan los espacios entre casa y montaña.


Perspectiva del viñedo: mantener las hileras a la izquierda, con el mismo eje de profundidad que los laterales de la piscina (vector proporcional a +12, −10). Los extremos delanteros se alinean horizontalmente; los posteriores se escalonan junto al lateral de la casa. Los postes permanecen verticales y bajos (3 unidades), dejando separación respecto de la casa y la piscina. No reflejar sólo las hileras ni inclinar sus postes para moverlas de lado.


Continuidad del viñedo: las tres hileras avanzan desde la zona de piscina hasta el lateral de la casa. Conservar su eje paralelo a los lados de la piscina, sin reflejarlas. Los extremos posteriores se escalonan frente al corredor lateral, con al menos 7.3 unidades de separación horizontal respecto de la fachada. El isotipo compacto usa un encuadre de 80 × 52 unidades, con origen horizontal en −8, para dejar espacio a la plantación y la casa; la firma horizontal amplía sólo su margen izquierdo (encuadre −8, 0, 266, 52) y conserva el lettering.


Espacio lateral: las hileras se desplazan 4 unidades a la izquierda y 6 hacia el fondo en el dibujo, sin cambiar su inclinación ni sus postes. La franja libre respecto de la fachada aumenta de 3.3 a 7.3 unidades; el frente del viñedo queda más atrás que el borde delantero de la piscina. Conservar ese espacio en todas las variantes y en la animación.

## 07. Responsive

| Contexto | Comportamiento existente | Fuente |
| --- | --- | --- |
| Firma horizontal a ≤480 px | Ancho `min(180px,100%)`; conservar proporción y altura automática | `public/brand/tokens.css` |
| Compacta | Anchos de 32/44/64 px según tamaño; sin bajada | Mismo archivo y `BrandLogo.astro` |
| Muestra a ≤600 px | Variantes a una columna; muestras y acciones adaptadas; paleta permite envolver | `src/pages/identidad.astro` |
| Navegación ajustada | Omitir la bajada con `showTagline={false}`; conservar la firma y los enlaces | `BrandLogo.astro` y encabezados existentes |
| Preferencia de movimiento reducido | Muestra estática al iniciar; reproducción solo por acción explícita | `tokens.css` y controles de `/identidad` |

La bajada puede envolver naturalmente: no reducir su tamaño para forzar una línea. Los mínimos web no definen mínimos de impresión. Los demás breakpoints dependen de la página existente; no se introduce una escala responsive común con ADMCasas.

## 08. Aplicaciones

- Encabezados y navegación: firma horizontal; omitir la bajada cuando reste espacio a los enlaces o a la información de la casa.
- Pie y piezas de presentación: firma y bajada con su separación correspondiente.
- Mi estadía y portales: mantener visibles el nombre de la casa y las acciones existentes.
- Comercios: emplear los mismos recursos de marca, conservando el contenido y funcionamiento de la propuesta.
- Móvil: priorizar legibilidad, proporción y navegación. No esconder el nombre ni reducir la bajada hasta volverla ilegible.
- SEO, textos alternativos y referencias descriptivas: conservar el nombre como texto donde corresponda.

La muestra local de variantes está en `/identidad`, sin indexación. Sirve para revisar y descargar los recursos; no acredita publicación ni aprobación visual.

## 09. Buenas prácticas

Comprobar el nombre y la bajada exactos, el contraste, el margen libre y la lectura en el tamaño final. Verificar que no se deformen los SVG ni se tapen las acciones de navegación. Para cambios de implementación, revisar las variantes clara, oscura y monocromática, además de móvil y escritorio.

La publicación requiere autorización explícita. La aprobación del texto de la bajada no equivale a aprobación de toda la propuesta visual.

No mezclar los tokens verdes de la firma, la paleta editorial malbec y el azul del panel como si fueran un solo tema. Usar fotografías y contenidos verificables. Conservar los recursos vectoriales y evitar recomponer su lettering. Las propuestas anteriores con racimo colgante quedan reemplazadas por las hileras de viñedo descriptas en la sección 06.

## 10. Reglas para futuros desarrollos

La fuente única de los recursos es [public/brand](public/brand). La bajada se administra en [identity.json](public/brand/identity.json), y los tokens en [tokens.css](public/brand/tokens.css).

El componente Astro es [BrandLogo.astro](src/components/BrandLogo.astro). Para la página HTML de comercios se utiliza el adaptador [brand-logo.js](public/brand/brand-logo.js). Las copias de ADMCasas se generan desde este proyecto; no editarlas de forma independiente.

Las instrucciones técnicas, el comando de sincronización y el punto de recuperación están en [BRAND.md](BRAND.md). Este manual contiene las reglas vigentes; el historial de alternativas permanece en Git.

### Mantenimiento e interpretación

1. Consultar el componente y el token equivalente antes de crear una aplicación nueva de la marca.
2. Mantener los estados Implementado, En revisión, Pendiente de aprobación y Antecedente con el sentido común indicado al inicio.
3. Sincronizar la copia de consulta privada del manual desde este archivo. No corregir esa copia como si fuera otra fuente de verdad.
4. Actualizar versión y fecha cuando cambie una regla. Las diez secciones mantienen el mismo orden que ADMCasas; no trasladar sus valores visuales por simetría.
5. No regenerar el PDF histórico ni activar propuestas gráficas por el solo cambio de documentación. La publicación sigue requiriendo autorización explícita.

### Decisiones pendientes

La composición final y su animación conservan su revisión visual pendiente. Cualquier unificación futura de la paleta editorial y la paleta de la firma exige una decisión específica. El PDF histórico no acredita la nueva composición. La normalización documental no resuelve esos pendientes ni incorpora reglas de impresión ausentes.


Proporciones refinadas: separación horizontal de 6 unidades entre los frentes de las tres hileras (antes 4), sin acercar la hilera interior a la casa. La piscina amplía su lámina posterior de 46 a 52 unidades y su profundidad dibujada a 10, conservando la misma dirección de perspectiva (+6, −5). La ventana superior conserva sus dos paños e incorpora el montante exterior izquierdo que faltaba.


Lectura de la piscina: contorno exterior de 52 × 10 unidades en perspectiva, borde interior separado y superficie de agua #C4DFDA. Dos ondas suaves sustituyen la línea recta anterior para que no parezca una plataforma. La versión clara y la monocromática omiten el relleno de color y conservan borde y ondas. Las ondas se desplazan suavemente menos de una unidad durante la animación; no usar trazos discontinuos que parezcan marcas del suelo.


Tipografía de la firma · 27/10/2026: se reemplazan las letras geométricas manuales, cuyas C y S resultaban poco naturales, por los contornos originales de Plus Jakarta Sans Medium. EXPERIENCIAS y MENDOZA tienen 19 unidades de altura óptica, x=80 y 6 unidades de aire entre líneas. MENDOZA gana tamaño respecto de la versión anterior para que el nombre se lea como una única firma. La fuente y su licencia se conservan en `brand-source/`; la regeneración opcional está en `scripts/build-brand-wordmark.ps1`. El símbolo de casa, piscina, viñedo, montaña, sol y aves se conserva intacto. Propuesta tipográfica pendiente de revisión del usuario.
