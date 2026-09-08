# Bitácora de Publicación — ZYRON PRIMUS

**Fecha:** 2026-08-19
**Repositorio:** https://github.com/hizquier-eo/ZYRON
**Rama:** main
**Costo total:** 0 USD

---

## Situación Inicial

- ZYRON PRIMUS no estaba controlado por Git.
- Existía un repositorio remoto `hizquier-eo/ZYRON` con 2 commits previos (637 archivos, sin videos grandes ni LFS).
- La carpeta `ZYRON GITHUB` contenía una `.git` válida pero no se movió al proyecto principal.

## Respaldo

- Creado: `ZYRON PRIMUS_BACKUP_20260819` (copia completa en `Empresa Zyron\`).

## Git (FASE 4-5)

- `git init` + rama `main`.
- `.gitignore`: excluye `.agents/`, `tmp/`, `node_modules/`, `.env`, `*.inspect.ndjson`, OS files, editor files, caches.
- `.gitattributes`: Git LFS para `assets/videos/zyron-construccion-del-cerebro-virtual.mp4` (676 MB).
- Historial remoto fusionado con `git merge -s ours` (sin force push, preserva commits previos).

## GitHub (FASE 8)

- Remoto conectado: `https://github.com/hizquier-eo/ZYRON.git`.
- Push de 4 commits (incluye fusión y servidor AI Studio).
- Video de 676 MB via Git LFS (gratuito en repositorio público).

## Archivos Ignorados

- `.agents/` — configuración de agentes local.
- `tmp/` — temporales (13 MB).
- `*.inspect.ndjson` — metadata de inspección de herramientas (18 archivos).

## Videos Grandes (FASE 7)

| Video | Tamaño | Acción |
|---|---|---|
| `zyron-construccion-del-cerebro-virtual.mp4` | 676 MB | Git LFS |
| `zyron-construccion-del-cerebro-con-ia.mp4` | 76 MB | Git normal |
| `zyron-ugma-conferencia-video-project.mp4` | 44 MB | Git normal |
| `zyron-ugma-grok-conferencia-primer-video.mp4` | 43 MB | Git normal |
| Resto (9 videos) | 2–5 MB c/u | Git normal |

Todos son referenciados desde `index.html` y se conservan intactos.

## Cambios Técnicos Realizados

1. `.gitignore` creado (nuevo).
2. `.gitattributes` creado (nuevo, para LFS).
3. `package.json` creado (nuevo, para Google AI Studio Build).
4. `server.js` creado (nuevo, servidor estático HTTP sin dependencias, usa `process.env.PORT`).

**Ningún archivo HTML, CSS, JS, imagen o documento original fue modificado.**

## Pruebas (FASE 9-10)

Servidor local (`node server.js`) verificado:

| Ruta | Status | Tipo MIME |
|---|---|---|
| `/` (index.html) | 200 | text/html |
| `css/style.css` | 200 | text/css |
| `js/app.js` | 200 | application/javascript |
| `laboratorios/chatgpt/index.html` | 200 | text/html |
| `assets/zyron-ai-brain.png` | 200 | image/png |
| `assets/videos/bienvenidaZyron.mp4` | 200 | video/mp4 |

## Auditoría de Referencias (FASE 6)

- Todos los `src=`, `href=`, `url()`, `data-video-src=` en `index.html` apuntan a archivos existentes.
- Subpáginas usan rutas relativas correctas (`../../css/style.css`, `../../assets/...`).
- Sin rutas absolutas de Windows.
- Sin problemas de mayúsculas/minúsculas.
- Sin llamadas `fetch()` en index.html.

## Estado de Google AI Studio (FASE 9)

- `npm start` ejecuta `node server.js`.
- El servidor sirve estáticamente todo el proyecto.
- Compatible con `process.env.PORT`.
- Sin dependencias externas (Node.js puro).

## Verificación Final (FASE 11)

- [x] `git status` limpio
- [x] Rama `main`
- [x] Remoto correcto: `hizquier-eo/ZYRON`
- [x] Sin secretos, API keys, contraseñas ni `.env`
- [x] Sin rutas privadas innecesarias
- [x] Navegación y recursos funcionando
- [x] Sin 404 críticos

---

## Actualización institucional — 2026-08-30

### Validación de credenciales

- Se incorporó en el bloque **Founder & CEO** el nuevo centro de **Validación de credenciales**.
- Se añadió acceso al validador externo de la credencial GPTZero:
  `https://certificado-henry-izquierdo.weiserizquierdo.chatgpt.site`.
- Se agregó una subventana para consultar la credencial corporativa ZYRON, ID interno `ZYR-001`.
- Se integraron las dos caras de la credencial como recursos permanentes:
  - `assets/credencial-corporativa-henry-frente.png`
  - `assets/credencial-corporativa-henry-reverso.png`
- Se verificó la carga correcta de ambas imágenes y el funcionamiento del desplegable.

### Corrección de contacto

- El correo electrónico de Deisy Mundarain fue actualizado en la página y en los índices de búsqueda.
- Dirección vigente: `deisymundarain3@gmail.com`.
- Se comprobó que no quedaran enlaces activos con la dirección anterior.

### Centro de contratos ZYRON

- Se creó la página institucional `contratos/index.html`.
- Se creó su hoja de estilos adaptable `css/contratos.css`.
- La página presenta dos documentos diferenciados:
  1. Contrato general de servicios profesionales.
  2. Contrato de servicios educativos y de formación.
- Cada contrato dispone de acciones para **ver** y **descargar** su PDF.
- Los documentos DOCX originales no fueron modificados; únicamente se convirtieron a PDF mediante Microsoft Word para conservar membrete, estructura y formato.

### Documentos PDF incorporados

| Documento | Páginas | Ruta pública |
|---|---:|---|
| Contrato general de servicios ZYRON | 12 | `assets/contratos/contrato-general-servicios-zyron.pdf` |
| Contrato de servicios de formación ZYRON | 14 | `assets/contratos/contrato-servicios-formacion-zyron.pdf` |

- También se conservaron copias de salida en `output/pdf/`.
- Ambos documentos usan tamaño Carta y fueron renderizados a imágenes para revisión visual.
- La revisión confirmó membretes, textos, pies de página y transiciones sin defectos visibles.

### Mapa ZYRON y búsqueda global

- Se añadió **Contratos institucionales ZYRON** a la biblioteca de recursos.
- Se incorporaron al Mapa ZYRON enlaces independientes para:
  - Página de contratos ZYRON.
  - Contrato general de servicios.
  - Contrato educativo y de formación.
- Se agregaron términos relacionados con contratos, cláusulas, servicios, educación, formación, capacitación, cursos, talleres, conferencias, laboratorios y entrenamiento.
- Se verificó que las búsquedas `contrato general servicios` y `contrato educativo` devuelvan el resultado correspondiente y abran directamente el PDF correcto.

### Verificación técnica

- [x] Nueva página de contratos accesible mediante HTTP local.
- [x] Ambos PDF disponibles desde la web.
- [x] Logo y recursos visuales sin enlaces rotos.
- [x] Sin errores de consola en la página de contratos.
- [x] Resultados nuevos disponibles desde el buscador del Mapa ZYRON.
- [x] Diseño adaptable para escritorio y dispositivos móviles.

### Certificaciones y credenciales profesionales · 2026-09-07

- Se integró el diploma de Henry Izquierdo en el bloque institucional del CEO.
- Nombre exacto: **Accredited Expert in Strategic Communication and Responsible AI for Organizations and Education**.
- Botón público: `VER DIPLOMA PDF` → `assets/GPTZero_Certificado_Henry_Izquierdo_Validado.pdf`.
- Se eliminó únicamente la copia idéntica de `output/pdf/` tras verificar SHA-256.

### Ajuste de presentación y enlaces · 2026-09-07

- Se restauró el encabezado principal `FOUNDER & CEO`.
- Se mantuvo `Certificaciones y credenciales profesionales` como encabezado interno.
- Se separaron los enlaces del certificado GPTZero y se retiró el botón exterior duplicado.
- Se dejó `Curso avanzado de ChatGPT` con su diploma PDF independiente.
- Se ajustó el nombre del CEO para mostrarse corrido en escritorio y adaptable en móvil.

### Fichas directivas · 2026-09-07

- Se colocaron los seis iconos de Henry en una fila horizontal debajo de su cargo.
- Se colocaron los cinco iconos de Deisy en una fila horizontal debajo de su cargo.
- Se mantuvo `Lic. Deisy Mundarain` completo en una sola línea, con adaptación móvil.
- Se publicó la actualización en el mismo Site: `https://zyron-ia.weiserizquierdo.chatgpt.site`.

### Piloto Sistema de Gestión y Validación de Diplomas · 2026-09-08

- Se preparó Worker+D1 con registro TEST `0001-TEST` y consulta pública por identificador aleatorio.
- Cédula y código privado quedan representados únicamente por hashes SHA-256 en el esquema D1.
- Se generó `assets/diploma-0001.pdf` con QR dirigido a la validación pública prevista.
- Se generó `outputs/diplomas/PLANTILLA_CARGA_DIPLOMAS_ZYRON.xlsx` con validación de condición.
- Se creó respaldo `outputs/diplomas/ZYRON_PRIMUS_respaldo_20260908.zip`.
- Despliegue pendiente de autenticación Cloudflare.
