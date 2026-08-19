# Estado del Proyecto - ZYRON PRIMUS

## Fecha
2026-07-06

## Ajuste realizado
Los paneles laterales ZYRON Orbit dejan de aparecer en la primera pantalla y se muestran a partir de la segunda pantalla.

## Motivo
El usuario observó que el panel lateral tapaba información importante en la portada. Visualmente funciona mejor cuando aparece en la segunda sección, como en la captura de referencia.

## Qué se hizo

- Se agregó control por scroll en `js/app.js` mediante la clase `is-orbit-visible` en el body.
- Se ocultaron los paneles `.zyron-side-orbit` mientras el usuario está en la primera pantalla.
- Se activan al superar aproximadamente el 82% de la altura visible de la ventana.
- Se mantuvo intacto el diseño, contenido y navegación.
- Se actualizó la caché a `20260706-orbit-second-screen-1`.

## Archivos modificados

- `index.html`
- `css/style.css`
- `js/app.js`

## Validaciones

- `node --check js/app.js`: correcto.
- Versión de caché confirmada en `index.html`.
- Lógica `is-orbit-visible` confirmada en CSS y JS.
- Búsqueda de caracteres rotos `Ã`, `Â`, `â`, `�`: sin resultados.

## Pendiente

- Revisar visualmente con Ctrl+F5 para confirmar que el punto de aparición coincide exactamente con la segunda sección deseada.
- Si el usuario lo quiere aún más abajo, ajustar el umbral `0.82` a un valor mayor.
