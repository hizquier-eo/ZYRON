# Estado del Proyecto - ZYRON PRIMUS

## Fecha
2026-07-08

## Ajuste realizado
Corrección del video oficial ZYRON en portada para evitar recorte y permitir reproducción con audio.

## Qué se hizo

- Se cambió el video hero de `autoplay muted loop` a `controls playsinline`.
- Se cambió el encuadre de `object-fit: cover` a `object-fit: contain` para que no se corte el video.
- Se agregó fondo oscuro detrás del video para conservar estética cuando aparezcan bandas laterales o superior/inferior.
- Se desactivó la capa invisible de hotspots sobre el hero para que los controles del video sean utilizables.
- Se actualizó la caché a `20260708-hero-video-controls-1`.

## Archivos modificados

- `index.html`
- `css/style.css`

## Pendiente

- Revisar visualmente con Ctrl+F5.
- Si se quiere navegación clicable sobre el video, conviene agregar botones reales fuera del área de controles del reproductor.
