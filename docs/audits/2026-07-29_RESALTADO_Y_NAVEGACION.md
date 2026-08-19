# Evidencia de auditoría — resaltado y navegación

Fecha: 2026-07-29  
Alcance: sitio público local ZYRON PRIMUS, excluyendo copias históricas de `Doc/`, documentación y temporales.

## Solicitud atendida

Unificar en todas las páginas el uso de palabras clave amarillas y asegurar que los enlaces internos, especialmente la entrada y el retorno de Laboratorio Sites, no produzcan pérdidas de navegación.

## Diagnóstico inicial

- Se inventariaron 30 páginas HTML públicas.
- Solo `index.html` cargaba el resaltado automático existente en `js/app.js`.
- Las otras 29 páginas no ejecutaban ese sistema.
- 14 páginas no contenían ningún resaltado explícito.
- Laboratorio Sites era el único laboratorio completo sin navegación inferior `lab-progress-actions`.
- Se localizaron tres enlaces hacia el ancla inexistente `#mapa-sitio`; el identificador real es `#mapa-zyron`.
- No se encontraron archivos internos ni recursos embebidos ausentes.

## Correcciones realizadas

- Creado `js/site-quality.js` como sistema compartido.
- Incorporado el script en las 30 páginas públicas mediante rutas relativas válidas.
- Limitado el énfasis automático a un máximo de dos conceptos por bloque de contenido.
- Añadido registro de página de origen mediante `sessionStorage`.
- Añadido a Laboratorio Sites:
  - retorno a la página de origen;
  - laboratorio anterior Codex;
  - mapa de laboratorios;
  - laboratorio siguiente Work;
  - retorno seguro al Centro OpenAI cuando no existe origen válido.
- Corregidas las tres referencias `#mapa-sitio` por `#mapa-zyron`.

## Evidencia de validación final

- 30 de 30 páginas cargan `site-quality.js`.
- 0 rutas inválidas hacia el script compartido.
- 13 de 13 laboratorios contienen navegación inferior.
- 1.242 atributos `href` revisados.
- 0 archivos internos enlazados ausentes.
- 0 anclas internas inexistentes.
- 97 recursos `src` o `poster` revisados.
- 0 recursos embebidos ausentes.
- `node --check js/site-quality.js`: aprobado.
- `node --check js/app.js`: aprobado.

## Limitación registrada

La inspección visual automatizada del servidor local no pudo completarse porque el navegador integrado se ejecuta en un entorno de red aislado y rechazó la conexión a `127.0.0.1`. La validación final disponible cubrió sintaxis JavaScript, estructura HTML, presencia del script, rutas relativas, archivos físicos, anclas y navegación declarada.

## Archivos principales

- `js/site-quality.js`
- `index.html`
- `laboratorios/sites/index.html`
- `coleccion-academica-zyron-ai/index.html`
- `laboratorios/conectores/index.html`
- `laboratorios/computer-use/index.html`
- Todas las demás páginas HTML públicas, por incorporación del script compartido.

## Corrección complementaria solicitada por revisión visual

Una revisión visual posterior del usuario detectó que dos familias de tarjetas de la portada seguían sin mostrar amarillo:

- tarjetas enlazables de Doctrina ZYRON;
- tarjetas de Factores Estratégicos.

La causa fue una auditoría insuficiente: se comprobó la carga del script, pero no la cobertura de todos los elementos HTML reales. El código excluía textos contenidos dentro de enlaces y no incluía las frases almacenadas en elementos `<b>`.

Corrección aplicada:

- eliminada la exclusión general de contenido dentro de `<a>`;
- mantenida la exclusión de navegación, botones, código, fichas técnicas y pie de página;
- añadidos `.strategy-factor-grid b`, encabezados doctrinales y otros bloques institucionales;
- ampliado el vocabulario institucional;
- añadida una garantía de respaldo: todo párrafo o frase elegible de 24 caracteres o más que no coincida con el vocabulario recibe énfasis en su palabra significativa más larga;
- máximo de dos resaltados por bloque;
- caché actualizada a `site-quality.js?v=20260729-audit-3` en 30/30 páginas.

Revalidación posterior: 1.242 enlaces, cero incidencias internas y sintaxis JavaScript aprobada.

## Auditoría definitiva página por página — revisión audit-4

Después de una nueva instrucción del usuario se sustituyó la comprobación global por una matriz individual de las 30 páginas. Se creó el validador reproducible `docs/audits/audit_yellow_coverage.py`.

Regla vigente:

- todos los elementos `<p>` con contenido textual son seleccionados mediante `body p`;
- se conservan las frases institucionales de tarjeta en `<b>` y los encabezados doctrinales;
- se permiten párrafos dentro de enlaces;
- solo se excluyen navegación, botones, código, bloques `pre` y fichas técnicas;
- si el vocabulario principal no coincide, se resalta una palabra significativa mediante el mecanismo de respaldo;
- todas las páginas cargan `site-quality.js?v=20260729-audit-4`.

Resultado de la matriz:

- páginas revisadas individualmente: 30;
- párrafos encontrados: 954;
- párrafos con contenido textual: 953;
- frases institucionales de tarjeta: 18;
- párrafos con texto sin cobertura: 0;
- páginas sin el script vigente: 0;
- fallos totales: 0.

El único párrafo vacío es el marcador `<p></p>` del modal de imágenes de `index.html`; no contiene texto ni palabras susceptibles de resaltado.

Comando de repetición:

`python docs/audits/audit_yellow_coverage.py`
