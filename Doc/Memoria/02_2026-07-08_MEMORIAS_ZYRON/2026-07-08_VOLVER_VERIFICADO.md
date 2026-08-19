# 2026-07-08 - Volver verificado

- Se reescribió la lógica de regreso para guardar URL completa, hash y scroll exacto.
- Se cubren enlaces internos #..., enlaces a páginas .html, y regreso desde zyron-ai-lab-en-proceso.html.
- Al volver a index.html, el scroll se restaura varias veces después de cargar para evitar que el navegador lo reemplace por el salto de hash.
- Se actualizó la caché a $version.
