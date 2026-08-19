import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const write = (file, text) => fs.writeFileSync(path.join(root, file), text, "utf8");

function replaceRequired(file, before, after) {
  const source = read(file);
  if (source.includes(after)) return;
  if (!source.includes(before)) throw new Error(`No se encontró el texto esperado en ${file}`);
  write(file, source.replace(before, after));
}

function appendOnce(file, marker, block) {
  const source = read(file);
  if (!source.includes(marker)) write(file, `${source.trimEnd()}\n\n${block.trim()}\n`);
}

replaceRequired(
  "laboratorios/computer-use/index.html",
  "<b>Estado:</b> En desarrollo</p><p>Fuentes oficiales revisadas el 26 de julio de 2026.",
  "<b>Estado:</b> Activo</p><p>Fuentes oficiales revisadas el 26 de julio de 2026."
);
replaceRequired(
  "centro-investigacion-openai.html",
  "<span>Tiempo: 4 horas</span><span>Estado: En desarrollo</span></div><a class=\"ai-lab-card-enter\" href=\"laboratorios/computer-use/index.html\"",
  "<span>Tiempo: 4 horas</span><span>Estado: Activo</span></div><a class=\"ai-lab-card-enter\" href=\"laboratorios/computer-use/index.html\""
);
replaceRequired(
  "centro-investigacion-openai.html",
  "<h3>Computer Use</h3><p>Automatización supervisada de navegador, escritorio, aplicaciones y tareas repetitivas.</p><b>Estado: base documental preparada</b>",
  "<h3>Computer Use</h3><p>Automatización supervisada de navegador, escritorio, aplicaciones y tareas repetitivas.</p><b>Estado: Activo</b>"
);
replaceRequired(
  "centro-investigacion-openai.html",
  "<b>Laboratorio Computer Use</b><span>Categoría: Automatización · Nivel: Intermedio · Estado: En desarrollo</span>",
  "<b>Laboratorio Computer Use</b><span>Categoría: Automatización · Nivel: Intermedio · Estado: Activo</span>"
);
replaceRequired(
  "index.html",
  "Laboratorio Computer Use · Automatización · Intermedio · En desarrollo",
  "Laboratorio Computer Use · Automatización · Intermedio · Activo"
);

write(
  "docs/NEXT_TASK.md",
  "# Próxima tarea\n\nFASE 1F — Laboratorio Conectores.\n\nNo desarrollar Conectores sin aprobación expresa.\n"
);

const shared =
  "Computer Use quedó completo y `Activo` con ocho módulos, tutorial, ejercicio, caso demostrativo ZYRON y cinco recursos sincronizados en diez archivos DOCX, XLSX y PDF. Se aprobaron la inspección visual y las validaciones técnicas, responsive, accesibilidad básica, enlaces y descargas. Versión 0.16.0 aprobada. Próxima tarea: Fase 1F — Laboratorio Conectores.";

appendOnce("docs/PROJECT_STATUS.md", "Estado 2026-07-28 — Fase 1E aprobada", `## Estado 2026-07-28 — Fase 1E aprobada\n\n${shared}`);
appendOnce("docs/ROADMAP.md", "Fase 1E — Concluida y aprobada", `## Fase 1E — Concluida y aprobada\n\n${shared}\n\nEvidencia: \`Doc/Evidencia/2026-07-26_COMPUTER_USE_FASE_1E/\`.`);
appendOnce("docs/KNOWN_ISSUES.md", "Fase 1E — Incidencias", "## Fase 1E — Incidencias\n\nNo quedan incidencias técnicas abiertas específicas de Computer Use. Su disponibilidad y alcance dependen de superficie, cuenta, plan, región, versión, permisos y configuración; las acciones sensibles requieren confirmación y supervisión humana.");
appendOnce("docs/PLAN_COMPLETADO_CONTENIDOS_ZYRON.md", "Cierre Fase 1E — Laboratorio Computer Use", `## Cierre Fase 1E — Laboratorio Computer Use\n\n${shared}`);
appendOnce("docs/HANDOVER.md", "Entrega posterior a la Fase 1E", "## Entrega posterior a la Fase 1E\n\nComputer Use está `Activo` y la versión 0.16.0 está aprobada. Los descargables están en `recursos/laboratorio-computer-use/` y las evidencias en `Doc/Evidencia/2026-07-26_COMPUTER_USE_FASE_1E/`. La siguiente tarea es **FASE 1F — Laboratorio Conectores**. No desarrollar Conectores sin aprobación expresa. `ZYRON PARA SERVIDOR` no fue modificado.");
appendOnce("docs/CHANGELOG.md", "2026-07-28 — Fase 1E aprobada", `## 2026-07-28 — Fase 1E aprobada\n\n${shared}\n\nConectores no fue desarrollado y \`ZYRON PARA SERVIDOR\` no fue modificado.`);
appendOnce("docs/SESSION_LOG.md", "2026-07-28 — Cierre de la Fase 1E", "## 2026-07-28 — Cierre de la Fase 1E\n\nSe reanudó el trabajo conservado, se aprobaron las evidencias ya generadas y se sincronizó el estado `Activo` en la página, Centro OpenAI y Mapa ZYRON. Se aprobó la versión 0.16.0 y se registró la Fase 1F — Laboratorio Conectores. Conectores no fue desarrollado y `ZYRON PARA SERVIDOR` no fue modificado.");
appendOnce("docs/VERSION_HISTORY.md", "0.16.0 — 2026-07-28", "## 0.16.0 — 2026-07-28\n\n**Aprobada.** Cierre de la Fase 1E. Incorpora Computer Use activo, ocho módulos, tutorial, ejercicio, caso demostrativo ZYRON, cinco recursos en diez archivos sincronizados, fuentes oficiales y validaciones documentales, técnicas, HTTP, responsive y de accesibilidad básica. No incluye desarrollo de Conectores.");
appendOnce("Doc/Memoria/00_MEMORIA_MAESTRA_ZYRON.md", "2026-07-28: La Fase 1E", "- 2026-07-28: La Fase 1E completó y validó Computer Use con ocho módulos, tutorial, ejercicio, caso demostrativo ZYRON y cinco recursos en diez archivos sincronizados. Computer Use cambia a `Activo`; versión 0.16.0 aprobada. Próxima tarea: Fase 1F — Laboratorio Conectores. Conectores no fue desarrollado y `ZYRON PARA SERVIDOR` permanece sin modificaciones. Memoria definitiva: `2026-07-28_FASE_1E_COMPUTER_USE_DEFINITIVA.md`.");

console.log("Cierre Fase 1E aplicado.");
