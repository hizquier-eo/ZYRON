# Tutorial 01 - Flujo de trabajo con Codex

## Objetivo

Aprender a dirigir una tarea de desarrollo con Codex desde la inspección del proyecto hasta una entrega verificable, sin ampliar el alcance ni alterar trabajo existente.

## Requisitos previos

- Un proyecto autorizado para lectura y modificación.
- Un objetivo concreto y un criterio de finalización.
- Comandos conocidos de compilación, pruebas o validación, si existen.
- Una copia o sistema de control de versiones adecuado al proyecto.

## Flujo recomendado

1. **Inspeccionar.** Leer las instrucciones del repositorio, estructura, archivos relacionados, dependencias y estado actual.
2. **Delimitar.** Definir el objetivo, el área autorizada, las restricciones, los riesgos y lo que debe permanecer intacto.
3. **Planificar.** Enumerar los pasos, archivos previstos y verificaciones antes de editar.
4. **Implementar.** Realizar el cambio mínimo coherente, reutilizando componentes y preservando modificaciones existentes.
5. **Verificar.** Ejecutar las pruebas relevantes, revisar el cambio y comprobar el comportamiento esperado.
6. **Documentar.** Entregar un resumen, archivos afectados, validaciones, limitaciones y acciones que todavía requieren autorización.

## Plantilla de tarea

```text
Objetivo: [resultado concreto].
Área autorizada: [carpeta, proyecto o archivos].
Contexto: [arquitectura, comportamiento actual y antecedentes].
Conservar: [diseño, API, contenido o cambios existentes].
Restricciones: [sin publicar, sin instalar, sin tocar servidor, etc.].
Validar con: [pruebas, compilación, enlaces, navegador o revisión manual].
Terminado cuando: [condiciones observables].
Antes de ampliar el alcance, solicita aprobación.
```

## Ejercicio ZYRON

Corregir un defecto responsive de una página existente:

1. Reproducirlo en el viewport indicado.
2. Identificar la regla causante con evidencia.
3. Proponer el ajuste mínimo.
4. Modificar únicamente los archivos autorizados.
5. Verificar escritorio, móvil, enlaces, recursos y consola.
6. Presentar evidencias y esperar autorización antes de sincronizar o publicar.

## Criterio de aprobación

- El alcance ejecutado coincide con el autorizado.
- No existen cambios laterales ni duplicaciones.
- Las pruebas relevantes fueron ejecutadas.
- La entrega distingue hechos verificados, limitaciones y pendientes.
- Las acciones externas permanecen sin ejecutar hasta recibir autorización.

## Base oficial

Este flujo adapta las recomendaciones oficiales de OpenAI sobre contexto de tarea, instrucciones reutilizables, pruebas, revisión, sandbox y aprobaciones. Fuentes revisadas el 2026-07-15:

- [Buenas prácticas para Codex](https://learn.chatgpt.com/guides/best-practices)
- [Prompting para Codex](https://learn.chatgpt.com/docs/prompting)
- [Aprobaciones y seguridad](https://learn.chatgpt.com/docs/agent-approvals-security)
