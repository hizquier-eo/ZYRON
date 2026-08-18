# Evidencia de corrección de rutas - Versión 0.10.1

Fecha: 2026-07-26

## Incidencia

El enlace `centros/ecosistemas-inteligentes/` podía mostrar un índice de directorio cuando la web se abría directamente desde Windows.

## Corrección

- Enlaces internos terminados en carpeta convertidos a destinos `index.html`.
- Enlace multimodelo corregido a `centros/ecosistemas-inteligentes/index.html#orquestacion-multimodelo`.
- Diseño, textos, clases y scripts conservados.

## Cobertura

- Archivos HTML modificados: 5.
- Enlaces normalizados: 85.
- Páginas HTML auditadas: 19.
- Referencias locales comprobadas: 324.
- Destinos inexistentes: 0.
- Anclas inexistentes: 0.
- Enlaces internos terminados en directorio: 0.

## Prueba real

Desde Mapa ZYRON:

1. `Centro de Ecosistemas Inteligentes` abrió `centros/ecosistemas-inteligentes/index.html`.
2. `Integración y orquestación multimodelo` abrió `centros/ecosistemas-inteligentes/index.html#orquestacion-multimodelo`.
3. El título de la sección quedó visible con un margen de 110 px bajo la barra fija.
4. No se registraron errores de consola.
