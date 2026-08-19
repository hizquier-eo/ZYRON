# KNOWN_ISSUES - ZYRON PRIMUS

## Resuelto 2026-07-26 - Lenguaje interno visible al visitante

- Se eliminaron expresiones que describían decisiones internas de implementación.
- El bloque comunica ahora capacidades y valor institucional.
- El encabezado móvil queda visible 110 px debajo de la barra fija.
- No se detectaron errores de navegación, consola ni desbordamiento.

## Validación 2026-07-26 - Contenido multimodelo definitivo

- Seis tarjetas equilibradas a 439 px en escritorio.
- Siete etapas visibles y contenidas.
- Móvil en una columna, sin desplazamiento horizontal.
- Tamaño mínimo observado: 13,12 px.
- Nueve enlaces externos seguros.
- Cero errores o advertencias de consola.
- No se detectaron incidencias abiertas.

## Resuelto 2026-07-26 - Índice de directorio al navegar

- Problema: los enlaces terminados en `/` podían mostrar el contenido de la carpeta al abrir el sitio mediante `file://`.
- Solución: destinos `index.html` explícitos en todas las rutas afectadas.
- Cobertura: Centro de Ecosistemas, Ecosistema OpenAI, Centro de Investigación y laboratorios.
- Estado: resuelto y validado; no quedan enlaces internos terminados en directorio.

## Validación 2026-07-26 - Orquestación multimodelo

- No se detectaron errores de consola ni desbordamiento horizontal.
- Las seis tarjetas y las seis etapas se muestran correctamente en escritorio y móvil.
- Los nueve enlaces externos incluyen apertura en pestaña nueva y atributos de seguridad.
- Las posiciones y puntuaciones de benchmarks no se fijan en el contenido porque pueden cambiar.
- La sincronización con `ZYRON PARA SERVIDOR` permanece pendiente de autorización; no es una incidencia técnica.

## Validación 2026-07-15 - Laboratorio Codex

- Página pública validada sin desplazamiento horizontal, contenido cortado, recursos fallidos ni errores de consola en 1440 x 900 y 390 x 844.
- Los seis documentos internos presentan codificación UTF-8 y estructura Markdown válida.
- No se detectaron incidencias abiertas propias de la Fase 3.
- La sincronización con `ZYRON PARA SERVIDOR` permanece pendiente de autorización y no constituye un error.

## Resuelto 2026-07-15 - Validacion movil AI LAB

- Navegacion general desplazada aproximadamente 3 px: resuelto.
- Seccion extensa con opacidad inicial insuficiente al navegar por ancla: resuelto.
- Boton flotante Mapa ZYRON superpuesto a la barra contextual: resuelto.
- Desplazamiento horizontal de pagina: no detectado.

## Resuelto 2026-07-15 - Corte del panel derecho AI LAB

- Problema: la reserva lateral heredada estrechaba AI LAB y producia corte visual del panel derecho en el viewport de evidencia.
- Solucion: ajustar el ancho responsive exclusivo de `#zyron-ai-lab.section`, conservando un carril para el boton Mapa ZYRON.
- Restriccion respetada: no se oculto el problema mediante `overflow-x: hidden`.

## Resuelto 2026-07-15 - Scrollbar horizontal AI LAB

- Problema: la barra inferior `.quick-nav` mostraba el scrollbar horizontal nativo.
- Solucion: ocultar solamente el indicador visual mediante propiedades estandar y WebKit, conservando el desplazamiento y el diseño.
- Validacion: escritorio y movil sin desbordamiento horizontal de pagina.

## Errores encontrados

### 2026-07-11 - Comando git no disponible

- Descripcion: la terminal no reconocio el comando `git`.
- Impacto: no se pudo consultar `git status`.
- Estado: pendiente.
- Mitigacion: se revisaron archivos por fecha, contenido y evidencias documentales.

### 2026-07-11 - Carpeta docs inexistente

- Descripcion: la carpeta `docs/` no existia al momento de aplicar la politica oficial.
- Impacto: no habia documentacion centralizada con los siete documentos exigidos.
- Estado: resuelto.
- Solucion: se creo la carpeta y los archivos oficiales.

## Problemas pendientes

- Falta prueba visual completa de todos los contenidos futuros de las paginas de laboratorio cuando se desarrollen.
- Falta verificar responsive final de las paginas principales.
- Falta completar contenido documental en 11 laboratorios restantes.
- Once paginas de laboratorio continúan como base funcional y su contenido completo está pendiente.
- Falta ampliar los documentos recien creados en `architecture/`, `decisions/`, `laboratory/` y `releases/` con mayor detalle historico.

## Mejoras futuras

- Crear plantillas Markdown reutilizables para cada contenedor documental.
- Agregar enlaces oficiales verificados con fecha de consulta.
- Crear indices automaticos por laboratorio.
- Vincular los archivos documentales desde la interfaz web si se desea exponerlos al usuario final.

## Limitaciones actuales

- El Centro OpenAI tiene base documental inicial en ChatGPT y Codex; los demás laboratorios conservan su estructura preparada.
- La validacion realizada fue tecnica basica; la validacion visual completa queda pendiente.
- Las rutas de laboratorio usan rutas relativas `laboratorios/.../` para compatibilidad local y equivalen a las rutas solicitadas `/laboratorios/...` en despliegue raiz.
- No hay automatizacion interna para actualizar `docs/`; debe mantenerse manualmente al cierre de cada sesion.
- La estructura `docs/` ya existe, pero todavia esta en fase base y requiere enriquecimiento progresivo.
- `HANDOVER.md` debe actualizarse manualmente al cierre de cada sesion hasta que exista una automatizacion documental.

## Pendientes despuÃ©s de la Fase 0

- Los 12 laboratorios no tienen desarrollo educativo completo.
- Los catÃ¡logos no contienen publicaciones autorizadas.
- Diplomas continÃºa como simulador.
- Existen fichas provisionales.
- No hay casos multimodelo pÃºblicos.
- Manual LoRA permanece en 0.5.

## Pendientes especÃ­ficos de ChatGPT

Faltan cinco archivos validados: plantilla de prompt, checklist, rÃºbrica descargable, guÃ­a de seguridad y registro de iteraciones. Hasta completarlos el laboratorio no debe figurar como `Activo`.

## Resolución 2026-07-26 — Recursos ChatGPT

El pendiente anterior queda resuelto. Los cinco recursos existen en diez archivos finales, sus enlaces apuntan a archivos locales reales y el laboratorio puede figurar como `Activo`. No quedan incidencias abiertas específicas de ChatGPT en la Fase 1A.1.

## Incidencias abiertas — Fase 1B Sites

Fase 1B ejecutada parcialmente por interpretación incorrecta. Contenido HTML y recursos conservados para revisión. Activación suspendida hasta corregir recursos, completar validaciones y recibir aprobación.

## Cierre de incidencias — Fase 1B.1

Las incidencias específicas de Sites quedaron resueltas: adaptación desigual, falta de sincronización PDF/XLSX, campos heredados, guía insuficiente, validación visual pendiente, validación XLSX pendiente, responsive, accesibilidad básica, HTTP 200, descargas y capturas. Los auxiliares externos al proyecto permanecen conservados para revisión administrativa y no afectan el contenido aprobado.

- Recursos DOCX, XLSX y PDF con adaptación desigual.
- PDF y XLSX no sincronizados en algunos recursos.
- Brief con campos heredados del Laboratorio ChatGPT.
- Guía de publicación segura insuficientemente adaptada.
- Falta de validación visual de DOCX y PDF.
- Falta de validación completa de hojas XLSX.
- Falta de prueba responsive real.
- Falta de prueba de accesibilidad.
- Falta de prueba HTTP 200.
- Falta de prueba manual de descargas.
- Falta de evidencia mediante capturas.
- Archivos auxiliares fuera de ZYRON PRIMUS pendientes de revisión.

## Fase 1C — Incidencias

No quedan incidencias abiertas específicas de Work. La disponibilidad de funciones, formatos, aplicaciones conectadas y almacenamiento depende del plan, plataforma y configuración; esta condición está documentada como limitación del producto.
