# Memoria ZYRON PRIMUS - Video y caso visual ChatGPT

## Número de memoria

Memoria N.º 01

## Fecha

2026-07-21

## Fecha de creación del registro

21 de julio de 2026

## Ajustes realizados

Actualización del primer video de la sección Videos ZYRON e incorporación de un caso creativo visual exclusivo en la ficha de ChatGPT del Centro de Conocimiento.

## Qué se hizo

### Sustitución del primer video

- Se incorporó el archivo fuente `Construcción del cerebro con la IA.mp4` al proyecto con el nombre `assets/videos/zyron-construccion-del-cerebro-con-ia.mp4`.
- Se sustituyó únicamente el video de la primera tarjeta `Construcción del Cerebro Virtual`.
- La primera tarjeta ahora apunta a `assets/videos/zyron-construccion-del-cerebro-con-ia.mp4`.
- Las demás apariciones del video anterior se conservaron sin cambios.
- Se mantuvieron la miniatura, el título y el texto alternativo de la primera tarjeta.

### Caso creativo visual de ChatGPT

- Se incorporó la imagen `ChatGPT Image 21 jul 2026, 09_40_45.png` al proyecto con el nombre `assets/caso-creativo-zyron-chatgpt.png`.
- Se añadió un bloque titulado `Caso creativo ZYRON` dentro de la ficha de ChatGPT.
- El bloque quedó ubicado después de `Cuándo utilizar esta herramienta / Cuándo no utilizarla`.
- Se agregó el subtítulo `Identidad humana + inteligencia artificial` y una descripción institucional breve.
- La imagen se configuró con marco azul ZYRON, bordes redondeados, carga diferida y adaptación para computadora y móvil.
- El caso visual se muestra exclusivamente al seleccionar ChatGPT y se oculta al elegir cualquier otra herramienta.
- Se añadió un texto alternativo descriptivo para accesibilidad.

## Archivos modificados

- `index.html`
- `css/style.css`
- `js/app.js`

## Archivos incorporados

- `assets/videos/zyron-construccion-del-cerebro-con-ia.mp4`
- `assets/caso-creativo-zyron-chatgpt.png`

## Verificaciones realizadas

- Se confirmó que el nuevo video existe dentro de `assets/videos` y que la primera tarjeta utiliza su nueva ruta.
- Se confirmó que las demás referencias al video anterior permanecen intactas.
- Se comprobó la existencia y la ruta de la nueva imagen dentro de `assets`.
- Se verificaron la estructura HTML, los estilos responsive y la lógica que limita la imagen a la ficha de ChatGPT.
- Se ejecutó `node --check js/app.js` sin errores de sintaxis.

## Estado final

Los dos cambios solicitados quedaron integrados y respaldados en el proyecto. La presentación visual fue revisada y aprobada por el usuario.

## Recomendación de revisión

- Recargar la página con `Ctrl + F5` cuando se publique o se copie a otro entorno para evitar que la caché muestre versiones anteriores.
