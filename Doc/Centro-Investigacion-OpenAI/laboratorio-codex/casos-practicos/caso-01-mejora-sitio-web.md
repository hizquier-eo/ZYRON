# Caso práctico 01 - Mejora controlada de un sitio web

## Situación

Un sitio web existente presenta un corte responsive en un viewport concreto. El diseño, los colores, el contenido, la navegación y las dimensiones generales deben conservarse. El paquete para servidor no está autorizado.

## Objetivo

Localizar la causa, corregir únicamente el defecto y demostrar que el contenido queda dentro del ancho visible en escritorio y móvil.

## Flujo de trabajo

1. Leer las instrucciones del proyecto y confirmar el área autorizada.
2. Inspeccionar HTML, CSS, JavaScript, rutas y componentes relacionados.
3. Abrir la versión local mediante un servidor HTTP.
4. Reproducir el defecto en los viewports solicitados.
5. Medir el ancho del documento y localizar el elemento que excede el viewport.
6. Formular una hipótesis y seleccionar el ajuste mínimo compatible con la arquitectura.
7. Modificar solo el archivo necesario.
8. Repetir las verificaciones visuales y técnicas.
9. Actualizar la documentación interna obligatoria.
10. Entregar evidencias sin sincronizar ni publicar.

## Instrucción sugerida para Codex

```text
Inspecciona este proyecto antes de editar.
Corrige únicamente el corte responsive visible en [página] y [viewport].
Conserva diseño, contenido, colores, navegación y dimensiones generales.
No ocultes la causa con una regla global de overflow.
Reutiliza las reglas existentes y aplica el cambio mínimo.
Verifica ancho del documento, elementos cortados, enlaces, recursos y consola
en escritorio y móvil. No sincronices ni publiques.
```

## Entregable

- Diagnóstico respaldado por medidas.
- Archivo o archivos modificados.
- Resultado de las verificaciones.
- Evidencias visuales de escritorio y móvil.
- Declaración explícita de que el servidor no fue modificado.

## Riesgos a controlar

- Encubrir el problema con `overflow-x: hidden`.
- Corregir un viewport y romper otro.
- Alterar estilos globales no relacionados.
- Sobrescribir cambios existentes.
- Confundir validación local con autorización para publicar.

## Fuentes oficiales

Caso diseñado a partir de las prácticas oficiales de Codex sobre contexto, verificación, revisión y permisos, revisadas el 2026-07-15:

- [Buenas prácticas para Codex](https://learn.chatgpt.com/guides/best-practices)
- [Aprobaciones y seguridad](https://learn.chatgpt.com/docs/agent-approvals-security)
