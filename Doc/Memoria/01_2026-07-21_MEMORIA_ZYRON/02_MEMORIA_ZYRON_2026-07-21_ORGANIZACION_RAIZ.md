# Memoria ZYRON PRIMUS - Organización segura de la carpeta Empresa Zyron

## Número de memoria

Memoria N.º 02

## Fecha

2026-07-21

## Objetivo

Ordenar la carpeta `C:\Users\ASUS\Desktop\Empresa Zyron` sin mover ni modificar los archivos vinculados con la página web activa.

## Clasificación realizada

- Se creó `01_RECURSOS_MULTIMEDIA` con las subcarpetas `01_IMAGENES`, `02_VIDEOS`, `03_AUDIOS` y `04_SELLOS`.
- Se movió el audio suelto de WhatsApp a `01_RECURSOS_MULTIMEDIA\03_AUDIOS`.
- Se creó `02_DOCUMENTACION_Y_GESTION` con documentos generales, material de soporte, diplomas y hojas de cálculo.
- Las antiguas carpetas `Diploma` y `Diplomas` se conservaron como categorías separadas dentro de `03_DIPLOMAS`, evitando mezclar plantillas con documentación.
- Se creó `00_INDICE_ORGANIZACION_ZYRON.md` en la raíz con el mapa de organización y las carpetas protegidas.

## Carpetas protegidas que no se movieron

- `ZYRON PRIMUS`
- `ZYRON PARA SERVIDOR`
- `ZYRON RESPALDOS`
- `ZYRON FUENTES`
- `Codigo`
- `outputs`
- `xlsx_repair_work`
- `ZYRON_Mascota_ChatGPT_Work`
- `ZYRON Desktop Assistant`
- `.git`, `.agents` y `desktop.ini`

## Motivo de protección

Se detectaron rutas absolutas en scripts de `Codigo`, `outputs` y `xlsx_repair_work`, además de una referencia absoluta al proyecto `ZYRON_Mascota_ChatGPT_Work`. Las carpetas web y técnicas conservaron su ubicación para evitar errores de ejecución, publicación o carga de recursos.

## Verificaciones

- Se conservaron los 559 archivos originales.
- Se añadió únicamente el índice de organización y esta memoria de respaldo.
- Se confirmó que `ZYRON PRIMUS\index.html`, `css\style.css` y `js\app.js` continúan en sus rutas originales.
- Se ejecutó `node --check` sobre `ZYRON PRIMUS\js\app.js` sin errores.
- No se eliminó ni sobrescribió ningún archivo.

## Estado final

La raíz quedó más limpia y clasificada, mientras que los proyectos con dependencias y la página web permanecieron intactos.
