# Fuentes base - Laboratorio Codex

## Uso de este archivo

Este registro contiene exclusivamente fuentes oficiales de OpenAI utilizadas para explicar Codex. Cada revisión debe comprobar la vigencia de la URL y registrar cualquier cambio funcional relevante en `versionado`.

## Registro inicial

| Fuente oficial | Uso en el laboratorio | Fecha de revisión | Estado |
| --- | --- | --- | --- |
| [Documentación de Codex](https://developers.openai.com/codex/) | Concepto general, superficies y operación | 2026-07-15 | Verificada |
| [Buenas prácticas para Codex](https://learn.chatgpt.com/guides/best-practices) | Contexto de tarea, instrucciones, pruebas y revisión | 2026-07-15 | Verificada |
| [Prompting para Codex](https://learn.chatgpt.com/docs/prompting) | Objetivo, contexto, restricciones y formato de entrega | 2026-07-15 | Verificada |
| [Aprobaciones y seguridad](https://learn.chatgpt.com/docs/agent-approvals-security) | Sandbox, aprobaciones, red y operación segura | 2026-07-15 | Verificada |

## Principios confirmados

- Codex es un agente de programación capaz de escribir, comprender, revisar y depurar código.
- Una tarea eficaz define propósito, alcance, archivos relevantes, restricciones y qué significa estar terminada.
- `AGENTS.md` permite conservar instrucciones prácticas y reutilizables del repositorio.
- Las pruebas y la revisión forman parte del ciclo de trabajo, no son una actividad opcional posterior.
- El sandbox determina lo que el agente puede hacer técnicamente; la política de aprobación determina cuándo debe consultar antes de una acción.
- Los permisos deben mantenerse ajustados al riesgo y ampliarse solo cuando sea necesario.

## Regla de mantenimiento

- No agregar blogs, videos de terceros, foros ni fuentes no oficiales.
- Verificar las páginas antes de una actualización sustantiva del laboratorio.
- No convertir ejemplos variables de producto en promesas permanentes.
- Registrar fecha, cambio observado y documento afectado.
