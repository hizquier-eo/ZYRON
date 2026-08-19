import fs from "node:fs";
import path from "node:path";
const root=process.cwd(),read=f=>fs.readFileSync(path.join(root,f),"utf8"),write=(f,t)=>fs.writeFileSync(path.join(root,f),t,"utf8");
function replaceRequired(file,before,after){const s=read(file);if(s.includes(after))return;if(!s.includes(before))throw new Error(`Texto no encontrado en ${file}: ${before}`);write(file,s.replace(before,after))}
function appendOnce(file,marker,block){const s=read(file);if(!s.includes(marker))write(file,`${s.trimEnd()}\n\n${block.trim()}\n`)}

replaceRequired("laboratorios/conectores/index.html","<b>Estado:</b> En desarrollo</p><p>Fuentes oficiales revisadas el 28 de julio de 2026.","<b>Estado:</b> Activo</p><p>Fuentes oficiales revisadas el 28 de julio de 2026.");
let page=read("laboratorios/conectores/index.html");
page=page.replace(/<a href="(https:\/\/[^"]+)">/g,'<a href="$1" target="_blank" rel="noopener noreferrer">');
write("laboratorios/conectores/index.html",page);
replaceRequired("centro-investigacion-openai.html","<span>Tiempo: 4 horas</span><span>Estado: En desarrollo</span></div><a class=\"ai-lab-card-enter\" href=\"laboratorios/conectores/index.html\"","<span>Tiempo: 4 horas</span><span>Estado: Activo</span></div><a class=\"ai-lab-card-enter\" href=\"laboratorios/conectores/index.html\"");
replaceRequired("centro-investigacion-openai.html","<b>Laboratorio Conectores</b><span>Categoría: Integraciones · Nivel: Intermedio · Estado: En desarrollo</span>","<b>Laboratorio Conectores</b><span>Categoría: Integraciones · Nivel: Intermedio · Estado: Activo</span>");
replaceRequired("index.html","Laboratorio Conectores · Integraciones · Intermedio · En desarrollo","Laboratorio Conectores · Integraciones · Intermedio · Activo");
write("docs/NEXT_TASK.md","# Próxima tarea\n\nFASE 1G — Laboratorio Agents.\n\nNo desarrollar Agents sin aprobación expresa.\n");
const shared="Conectores quedó completo y `Activo` con ocho módulos, tutorial, ejercicio, caso demostrativo ZYRON y cinco recursos sincronizados en diez archivos DOCX, XLSX y PDF. Se aprobaron inspección visual, estructura, responsive, accesibilidad básica, enlaces, descargas y fórmulas. Versión 0.17.0 aprobada. Próxima tarea: Fase 1G — Laboratorio Agents.";
appendOnce("docs/PROJECT_STATUS.md","Estado 2026-07-28 — Fase 1F aprobada",`## Estado 2026-07-28 — Fase 1F aprobada\n\n${shared}`);
appendOnce("docs/ROADMAP.md","Fase 1F — Concluida y aprobada",`## Fase 1F — Concluida y aprobada\n\n${shared}\n\nEvidencia: \`Doc/Evidencia/2026-07-28_CONECTORES_FASE_1F/\`.`);
appendOnce("docs/CHANGELOG.md","2026-07-28 — Fase 1F aprobada",`## 2026-07-28 — Fase 1F aprobada\n\n${shared}\n\nAgents no fue desarrollado y \`ZYRON PARA SERVIDOR\` no fue modificado.`);
appendOnce("docs/SESSION_LOG.md","2026-07-28 — Cierre de la Fase 1F","## 2026-07-28 — Cierre de la Fase 1F\n\nSe desarrolló y validó el Laboratorio Conectores, se corrigió el desbordamiento móvil y se sincronizó el estado `Activo` en página, Centro OpenAI y Mapa ZYRON. Se aprobó la versión 0.17.0 y se registró la Fase 1G — Laboratorio Agents. Agents no fue desarrollado y `ZYRON PARA SERVIDOR` no fue modificado.");
appendOnce("docs/KNOWN_ISSUES.md","Fase 1F — Incidencias","## Fase 1F — Incidencias\n\nNo quedan incidencias técnicas abiertas específicas de Conectores. La disponibilidad y las capacidades de búsqueda, sync y escritura dependen de plan, región, app, cuenta, administrador y configuración; esta condición está documentada.");
appendOnce("docs/VERSION_HISTORY.md","0.17.0 — 2026-07-28","## 0.17.0 — 2026-07-28\n\n**Aprobada.** Cierre de la Fase 1F. Incorpora Conectores activo, ocho módulos, tutorial, ejercicio, caso demostrativo ZYRON, cinco recursos en diez archivos sincronizados, fuentes oficiales y validaciones documentales, técnicas, HTTP, responsive y de accesibilidad básica. No incluye desarrollo de Agents.");
appendOnce("docs/PLAN_COMPLETADO_CONTENIDOS_ZYRON.md","Cierre Fase 1F — Laboratorio Conectores",`## Cierre Fase 1F — Laboratorio Conectores\n\n${shared}`);
appendOnce("docs/HANDOVER.md","Entrega posterior a la Fase 1F","## Entrega posterior a la Fase 1F\n\nConectores está `Activo` y la versión 0.17.0 está aprobada. Los descargables están en `recursos/laboratorio-conectores/` y las evidencias en `Doc/Evidencia/2026-07-28_CONECTORES_FASE_1F/`. La siguiente tarea es **FASE 1G — Laboratorio Agents**. No desarrollar Agents sin aprobación expresa. `ZYRON PARA SERVIDOR` no fue modificado.");
appendOnce("Doc/Memoria/00_MEMORIA_MAESTRA_ZYRON.md","2026-07-28: La Fase 1F","- 2026-07-28: La Fase 1F desarrolló y validó Conectores con ocho módulos, tutorial, ejercicio, caso ZYRON y cinco recursos en diez archivos sincronizados. Conectores cambia a `Activo`; versión 0.17.0 aprobada. Próxima tarea: Fase 1G — Laboratorio Agents. Agents no fue desarrollado y `ZYRON PARA SERVIDOR` permanece sin modificaciones. Memoria definitiva: `2026-07-28_FASE_1F_CONECTORES_DEFINITIVA.md`.");
console.log("Cierre Fase 1F aplicado.");
