import fs from "node:fs/promises";
import { Workbook, SpreadsheetFile } from "@oai/artifact-tool";
const out="C:/Users/ASUS/Codex_Proyectos/CIVG 2026/phase1c_output";
await fs.mkdir(out,{recursive:true});
const blue="#0B3F75", gold="#F0A22E", light="#EEF3F8", navy="#07152B";
function base(name,title,sub,last){
 const wb=Workbook.create(); const s=wb.worksheets.add(name);
 s.getRange(`A1:${last}1`).merge(); s.getRange("A1").values=[[title]];
 s.getRange(`A2:${last}2`).merge(); s.getRange("A2").values=[[sub]];
 s.getRange("A1").format={font:{bold:true,size:18,color:gold},horizontalAlignment:"center",verticalAlignment:"center",rowHeight:30};
 s.getRange("A2").format={font:{bold:true,size:10,color:blue},horizontalAlignment:"center",rowHeight:22};
 s.freezePanes.freezeRows(4); return {wb,s};
}
function header(r){r.format={fill:blue,font:{bold:true,color:"#FFFFFF"},horizontalAlignment:"center",verticalAlignment:"center",wrapText:true,rowHeight:28};}
function body(r){r.format={font:{color:navy,size:10},verticalAlignment:"top",wrapText:true,borders:{top:{style:"thin",color:"#AAB8C5"},bottom:{style:"thin",color:"#AAB8C5"},left:{style:"thin",color:"#AAB8C5"},right:{style:"thin",color:"#AAB8C5"}}};}
{
 const {wb,s}=base("Verificación","Lista de verificación para trabajos con Work","20 controles · ZYRON AI LAB · Versión 2026-07-26","F");
 const checks=["Objetivo y audiencia definidos","Alcance y exclusiones confirmados","Preguntas de aclaración resueltas","Plan aprobado por una persona","Fuentes identificadas y vigentes","Archivos autorizados","Permisos mínimos aplicados","Datos sensibles excluidos o protegidos","Etapas y responsables registrados","Entregables intermedios revisados","Fórmulas y cálculos comprobados","Datos y unidades verificados","Enlaces y referencias correctos","Diseño y formato inspeccionados","Metadatos y comentarios revisados","Versiones y ubicación registradas","Formatos finales abiertos","Destinatarios confirmados","Copia de respaldo disponible","Aprobación final registrada"];
 s.getRange("A4:F4").values=[["N°","Criterio","Cumple","No cumple","No aplica","Observaciones"]]; header(s.getRange("A4:F4"));
 s.getRange("A5:F24").values=checks.map((x,i)=>[i+1,x,"","","",""]); body(s.getRange("A5:F24"));
 s.getRange("C5:E24").dataValidation={rule:{type:"list",values:["X",""]}}; [8,36,12,12,12,40].forEach((w,i)=>s.getRangeByIndexes(0,i,24,1).format.columnWidth=w);
 s.tables.add("A4:F24",true,"ListaWork").style="TableStyleMedium2";
 await (await SpreadsheetFile.exportXlsx(wb)).save(`${out}/lista-verificacion-work.xlsx`);
 await fs.writeFile(`${out}/preview-lista-work.png`,new Uint8Array(await (await wb.render({sheetName:"Verificación",range:"A1:F24",scale:1.05,format:"png"})).arrayBuffer()));
}
{
 const {wb,s}=base("Rúbrica","Rúbrica de evaluación del Laboratorio Work","100 puntos · ZYRON AI LAB · Versión 2026-07-26","H");
 const rows=[["Definición del encargo",15],["Planificación de etapas",15],["Investigación y fuentes",15],["Calidad de entregables",15],["Datos y fórmulas",10],["Trazabilidad",10],["Seguridad y permisos",10],["Validación profesional",10]].map(([a,b])=>[a,b,"Dominio completo","Cumple lo esencial","Cumplimiento parcial","Debe rehacerse","",""]);
 s.getRange("A4:H4").values=[["Criterio","Máximo","Excelente","Competente","En desarrollo","Requiere revisión","Obtenido","Comentarios"]]; header(s.getRange("A4:H4")); s.getRange("A5:H12").values=rows; body(s.getRange("A5:H12"));
 s.getRange("A14:F14").merge();s.getRange("A14").values=[["RESULTADO TOTAL"]];s.getRange("G14").formulas=[["=SUM(G5:G12)"]];
 s.getRange("A15:F15").merge();s.getRange("A15").values=[["PORCENTAJE FINAL"]];s.getRange("G15").formulas=[["=G14/100"]];s.getRange("G15").format.numberFormat="0%";
 s.getRange("A16:F16").merge();s.getRange("A16").values=[["CONDICIÓN FINAL"]];s.getRange("G16").formulas=[['=IF(G14>=90,"Excelente",IF(G14>=75,"Competente",IF(G14>=60,"En desarrollo","Requiere revisión")))']];
 body(s.getRange("A14:H16")); [28,10,18,18,18,18,12,28].forEach((w,i)=>s.getRangeByIndexes(0,i,16,1).format.columnWidth=w); s.tables.add("A4:H12",true,"RubricaWork").style="TableStyleMedium2";
 await (await SpreadsheetFile.exportXlsx(wb)).save(`${out}/rubrica-laboratorio-work.xlsx`);
 await fs.writeFile(`${out}/preview-rubrica-work.png`,new Uint8Array(await (await wb.render({sheetName:"Rúbrica",range:"A1:H16",scale:1,format:"png"})).arrayBuffer()));
}
{
 const {wb,s}=base("Registro","Registro de tareas, etapas, fuentes y entregables","ZYRON AI LAB · Versión 2026-07-26","L");
 const h=["ID","Etapa","Tarea","Fuente o archivo","Herramienta","Responsable","Estado","Entregable","Validación","Incidencia","Versión","Aprobación"];
 s.getRange("A4:L4").values=[h];header(s.getRange("A4:L4"));s.getRange("A5:L24").values=Array.from({length:20},(_,i)=>[i+1,"","","","","","","","","","",""]);body(s.getRange("A5:L24"));
 s.getRange("G5:G24").dataValidation={rule:{type:"list",values:["Pendiente","En curso","En revisión","Aprobado","Bloqueado"]}}; [7,12,22,22,16,16,14,20,18,18,10,14].forEach((w,i)=>s.getRangeByIndexes(0,i,24,1).format.columnWidth=w);s.tables.add("A4:L24",true,"RegistroWork").style="TableStyleMedium2";
 const r=wb.worksheets.add("Resumen de entrega"); r.getRange("A1:D1").merge();r.getRange("A1").values=[["Resumen de entrega Work"]];r.getRange("A1").format={fill:blue,font:{bold:true,color:"#FFFFFF",size:16},horizontalAlignment:"center",rowHeight:28};
 const fields=["Nombre del encargo","Responsable","Fecha","Objetivo","Fuentes utilizadas","Archivos producidos","Validaciones realizadas","Incidencias abiertas","Versión final","Aprobación final"];
 r.getRange("A3:B12").values=fields.map(x=>[x,""]);body(r.getRange("A3:B12"));r.getRange("A3:A12").format={fill:light,font:{bold:true,color:blue},wrapText:true};r.getRange("A1:A12").format.columnWidth=28;r.getRange("B1:B12").format.columnWidth=68;
 await (await SpreadsheetFile.exportXlsx(wb)).save(`${out}/registro-tareas-entregables-work.xlsx`);
 await fs.writeFile(`${out}/preview-registro-work.png`,new Uint8Array(await (await wb.render({sheetName:"Registro",range:"A1:L24",scale:.9,format:"png"})).arrayBuffer()));
 await fs.writeFile(`${out}/preview-resumen-work.png`,new Uint8Array(await (await wb.render({sheetName:"Resumen de entrega",range:"A1:B12",scale:1.2,format:"png"})).arrayBuffer()));
}
