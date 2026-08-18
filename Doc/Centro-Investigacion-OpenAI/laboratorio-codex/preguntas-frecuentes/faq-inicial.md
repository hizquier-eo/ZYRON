# Preguntas frecuentes - Laboratorio Codex

## Codex reemplaza la revisión humana?

No. Puede inspeccionar, implementar y verificar tareas, pero una persona debe revisar los cambios importantes, los resultados de pruebas y cualquier efecto externo antes de utilizar o publicar el resultado.

## Qué información necesita una tarea bien definida?

Propósito, alcance autorizado, contexto relevante, restricciones, formato de entrega y condiciones observables que indiquen cuándo está terminada.

## Qué diferencia existe entre sandbox y aprobación?

El sandbox limita técnicamente los recursos y ubicaciones disponibles. La política de aprobación define cuándo Codex debe solicitar permiso antes de ejecutar una acción, por ejemplo al salir del área autorizada o necesitar acceso de red.

## Debo permitir acceso completo para que Codex trabaje mejor?

No por defecto. OpenAI recomienda mantener permisos ajustados y conceder capacidades adicionales únicamente cuando la tarea las requiera y el riesgo sea comprendido.

## Cómo protege Codex los cambios existentes?

La tarea debe indicarle que inspeccione primero, respete el estado actual, evite operaciones destructivas y realice cambios enfocados. El usuario debe mantener además un respaldo o control de versiones apropiado.

## Puede publicar directamente una aplicación?

Solo cuando la publicación forme parte explícita del alcance autorizado. Preparar un paquete, validarlo y publicarlo son acciones distintas; una autorización para editar no implica autorización para desplegar.

## Qué validaciones debe ejecutar?

Las proporcionales al cambio: pruebas automatizadas, compilación, análisis estático, revisión del cambio, comprobación de enlaces o recursos y validación visual cuando exista interfaz.

## Qué ocurre si no puede ejecutar una prueba?

Debe indicar qué prueba faltó, por qué no fue posible ejecutarla, qué evidencia alternativa existe y qué riesgo residual permanece.

## Se pueden compartir secretos o credenciales en el prompt?

No deben incluirse datos sensibles si no son indispensables. Las credenciales deben gestionarse mediante mecanismos seguros del entorno y nunca incorporarse al código, documentación o evidencias.

## Para qué sirve AGENTS.md?

Sirve para conservar instrucciones reutilizables del repositorio, como estructura, convenciones, comandos de compilación y pruebas, restricciones y definición de finalización.

## Fuentes oficiales

- [Buenas prácticas para Codex](https://learn.chatgpt.com/guides/best-practices)
- [Prompting para Codex](https://learn.chatgpt.com/docs/prompting)
- [Aprobaciones y seguridad](https://learn.chatgpt.com/docs/agent-approvals-security)

Revisión: 2026-07-15.
