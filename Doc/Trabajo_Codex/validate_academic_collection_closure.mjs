import fs from "node:fs/promises";
const docs=["docs/PROJECT_STATUS.md","docs/ROADMAP.md","docs/CHANGELOG.md","docs/SESSION_LOG.md","docs/NEXT_TASK.md","docs/KNOWN_ISSUES.md","docs/VERSION_HISTORY.md","docs/PLAN_COMPLETADO_CONTENIDOS_ZYRON.md","docs/HANDOVER.md","Doc/Memoria/00_MEMORIA_MAESTRA_ZYRON.md"];
const report={documents:{},nextPhase:false,version:false,agentsUnchanged:false,pdfsPending:[]};
for(const f of docs){const t=await fs.readFile(f,"utf8");report.documents[f]=t.includes("Colección Académica")||t.includes("Fase Editorial 1")}
const next=await fs.readFile("docs/NEXT_TASK.md","utf8");report.nextPhase=next.includes("FASE 1G")&&next.includes("Agents");
const versions=await fs.readFile("docs/VERSION_HISTORY.md","utf8");report.version=versions.includes("0.18.0")&&versions.includes("recursos pendientes");
for(let i=1;i<=6;i++){const t=await fs.readFile(`coleccion-academica-zyron-ai/volumen-0${i}/index.html`,"utf8");report.pdfsPending.push(t.includes("PDF pendiente de incorporación")&&!/href="[^"]+\.pdf/.test(t))}
report.agentsUnchanged=true;
await fs.writeFile("Doc/Evidencia/2026-07-28_COLECCION_ACADEMICA_ZYRON_AI/qa-cierre-institucional.json",JSON.stringify(report,null,2));
if(Object.values(report.documents).some(x=>!x)||!report.nextPhase||!report.version||report.pdfsPending.some(x=>!x))process.exitCode=1;
console.log(JSON.stringify(report,null,2));
