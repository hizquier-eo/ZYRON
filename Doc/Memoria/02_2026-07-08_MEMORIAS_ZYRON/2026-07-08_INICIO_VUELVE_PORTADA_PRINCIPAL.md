# 2026-07-08 - Inicio vuelve a la portada principal

- Se corrigió la navegación para que los enlaces de Inicio / ZYRON vuelvan al comienzo absoluto de la página.
- Antes algunos accesos podían llegar a la sección interna #inicio, donde aparece el título de arquitectura del ecosistema.
- Ahora #top y #inicio se tratan como regreso a la portada principal mediante window.scrollTo({ top: 0 }).
- Se actualizó la caché a $version.
