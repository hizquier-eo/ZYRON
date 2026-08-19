import fs from "node:fs/promises";
import {chromium}from"playwright";
const base="http://127.0.0.1:8768",out="Doc/Evidencia/2026-07-28_CONECTORES_FASE_1F/qa-activacion-final.json";
const browser=await chromium.launch({headless:true,channel:"chrome"}),page=await browser.newPage({viewport:{width:390,height:844}}),report={pages:{},documents:{},files:{}};
for(const[name,route]of Object.entries({laboratorio:"/laboratorios/conectores/index.html",centroOpenAI:"/centro-investigacion-openai.html",mapaZYRON:"/index.html"})){await page.goto(base+route,{waitUntil:"networkidle"});const text=await page.locator("body").textContent();report.pages[name]={status:(await page.request.get(base+route)).status(),active:text.includes("Conectores")&&text.includes("Activo"),overflow:await page.evaluate(()=>document.documentElement.scrollWidth>document.documentElement.clientWidth)}}
await page.goto(base+"/laboratorios/conectores/index.html");report.pages.laboratorio.externalSecure=await page.locator('#fuentes a[href^="https://"]').evaluateAll(xs=>xs.every(x=>x.target==="_blank"&&x.rel.includes("noopener")&&x.rel.includes("noreferrer")));
const docs=["docs/PROJECT_STATUS.md","docs/ROADMAP.md","docs/CHANGELOG.md","docs/SESSION_LOG.md","docs/NEXT_TASK.md","docs/KNOWN_ISSUES.md","docs/VERSION_HISTORY.md","docs/PLAN_COMPLETADO_CONTENIDOS_ZYRON.md","docs/HANDOVER.md","Doc/Memoria/00_MEMORIA_MAESTRA_ZYRON.md"];
for(const f of docs){const t=await fs.readFile(f,"utf8");report.documents[f]=f.endsWith("NEXT_TASK.md")?t.includes("FASE 1G")&&t.includes("Agents"):t.includes("Fase 1F")&&(t.includes("0.17.0")||f.endsWith("KNOWN_ISSUES.md"))}
const resources=(await fs.readdir("recursos/laboratorio-conectores")).filter(x=>/\.(docx|xlsx|pdf)$/i.test(x));report.files={resources:resources.length,expectedTen:resources.length===10};
await fs.writeFile(out,JSON.stringify(report,null,2));await browser.close();
if(Object.values(report.pages).some(x=>x.status!==200||!x.active||x.overflow)||Object.values(report.documents).some(x=>!x)||!report.files.expectedTen)process.exitCode=1;
console.log(JSON.stringify(report,null,2));
