import fs from "node:fs/promises";
import { Workbook, SpreadsheetFile } from "@oai/artifact-tool";
const out=process.argv[2]; await fs.mkdir(out,{recursive:true});
const navy="#07182F", blue="#0B3B70", gold="#EBA03D", light="#E8EEF5", border="#AAB8C5";
function base(name,title,subtitle,lastCol){
  const wb=Workbook.create(); const s=wb.worksheets.add(name); s.showGridLines=false;
  s.getRange(`A1:${lastCol}1`).merge(); s.getRange("A1").values=[[title]]; s.getRange(`A1:${lastCol}1`).format={fill:navy,font:{bold:true,color:gold,size:18},horizontalAlignment:"center",verticalAlignment:"center"}; s.getRange(`A1:${lastCol}1`).format.rowHeight=34;
  s.getRange(`A2:${lastCol}2`).merge(); s.getRange("A2").values=[[subtitle]]; s.getRange(`A2:${lastCol}2`).format={fill:blue,font:{italic:true,color:"#FFFFFF"},horizontalAlignment:"center"};
  s.freezePanes.freezeRows(4); return {wb,s};
}
function header(r){r.format={fill:blue,font:{bold:true,color:"#FFFFFF"},horizontalAlignment:"center",verticalAlignment:"center",wrapText:true,borders:{preset:"all",style:"thin",color:border}}}
function body(r){r.format={wrapText:true,verticalAlignment:"center",borders:{preset:"all",style:"thin",color:border}}}

{
 const {wb,s}=base("Verificación","Lista de verificación para utilizar ChatGPT","ZYRON AI LAB · Versión 2026-07-26","F");
 const headers=["Número","Criterio","Cumple","No cumple","No aplica","Observaciones"]; const criteria=["Objetivo definido","Contexto suficiente","Restricciones claras","Formato solicitado","Protección de datos","Verificación de hechos","Revisión de fuentes","Identificación de información desactualizada","Corrección de errores","Aprobación humana","Registro de versiones","Calidad final del entregable"];
 s.getRange("A4:F4").values=[headers]; header(s.getRange("A4:F4"));
 s.getRange("A5:F16").values=criteria.map((c,i)=>[i+1,c,"","","",""]); body(s.getRange("A5:F16"));
 s.getRange("A5:A16").format.horizontalAlignment="center"; s.getRange("C5:E16").dataValidation={rule:{type:"list",values:["X",""]}};
 [8,34,12,12,12,38].forEach((w,i)=>s.getRangeByIndexes(0,i,16,1).format.columnWidth=w);
 s.tables.add("A4:F16",true,"ListaVerificacionChatGPT").style="TableStyleMedium2";
 const x=await SpreadsheetFile.exportXlsx(wb); await x.save(`${out}/lista-verificacion-chatgpt.xlsx`);
 const p=await wb.render({sheetName:"Verificación",range:"A1:F16",scale:1.2,format:"png"}); await fs.writeFile(`${out}/preview-lista.png`,new Uint8Array(await p.arrayBuffer()));
}
{
 const {wb,s}=base("Rúbrica","Rúbrica de evaluación del laboratorio ChatGPT","100 puntos · ZYRON AI LAB · Versión 2026-07-26","H");
 const h=["Criterio","Puntos máximos","Excelente","Competente","En desarrollo","Requiere revisión","Puntuación obtenida","Comentarios del evaluador"];
 const rows=[["Definición del problema",15],["Calidad de las instrucciones",20],["Uso del contexto",15],["Revisión e iteración",15],["Verificación de información",15],["Seguridad y privacidad",10],["Calidad del entregable",10]].map(([a,b])=>[a,b,"Dominio completo","Cumple lo esencial","Cumplimiento parcial","Debe rehacerse","", ""]);
 s.getRange("A4:H4").values=[h]; header(s.getRange("A4:H4")); s.getRange("A5:H11").values=rows; body(s.getRange("A5:H11"));
 s.getRange("A13:F13").merge(); s.getRange("A13").values=[["RESULTADO TOTAL"]]; s.getRange("G13").formulas=[["=SUM(G5:G11)"]];
 s.getRange("A14:F14").merge(); s.getRange("A14").values=[["PORCENTAJE FINAL"]]; s.getRange("G14").formulas=[["=G13/100"]]; s.getRange("G14").format.numberFormat="0%";
 s.getRange("A15:F15").merge(); s.getRange("A15").values=[["CONDICIÓN FINAL"]]; s.getRange("G15").formulas=[['=IF(G13>=90,"Excelente",IF(G13>=75,"Competente",IF(G13>=60,"En desarrollo","Requiere revisión")))']];
 body(s.getRange("A13:H15")); s.getRange("A13:A15").format.font={bold:true,color:blue};
 [27,11,18,18,18,18,13,28].forEach((w,i)=>s.getRangeByIndexes(0,i,15,1).format.columnWidth=w);
 s.tables.add("A4:H11",true,"RubricaChatGPT").style="TableStyleMedium2";
 const x=await SpreadsheetFile.exportXlsx(wb); await x.save(`${out}/rubrica-laboratorio-chatgpt.xlsx`);
 const p=await wb.render({sheetName:"Rúbrica",range:"A1:H15",scale:1,format:"png"}); await fs.writeFile(`${out}/preview-rubrica.png`,new Uint8Array(await p.arrayBuffer()));
}
{
 const {wb,s}=base("Iteraciones","Registro de iteraciones con ChatGPT","ZYRON AI LAB · Versión 2026-07-26","L");
 const h=["Número de iteración","Fecha","Objetivo","Prompt utilizado","Resultado recibido","Error o vacío detectado","Corrección solicitada","Fuente consultada","Resultado validado","Responsable","Estado","Observaciones"];
 s.getRange("A4:L4").values=[h]; header(s.getRange("A4:L4")); s.getRange("A5:L24").values=Array.from({length:20},(_,i)=>[i+1,"","","","","","","","","","",""]); body(s.getRange("A5:L24"));
 s.getRange("B5:B24").format.numberFormat="yyyy-mm-dd"; s.getRange("K5:K24").dataValidation={rule:{type:"list",values:["Pendiente","En revisión","Validado"]}};
 [9,12,20,35,32,27,27,24,17,18,16,25].forEach((w,i)=>s.getRangeByIndexes(0,i,24,1).format.columnWidth=w);
 s.tables.add("A4:L24",true,"RegistroIteracionesChatGPT").style="TableStyleMedium2";
 const r=wb.worksheets.add("Resumen final"); r.showGridLines=false; r.getRange("A1:B1").values=[["Campo","Resumen"]]; header(r.getRange("A1:B1"));
 const f=["Problema trabajado","Número total de iteraciones","Principales correcciones","Fuentes utilizadas","Riesgos detectados","Resultado aprobado","Responsable de validación","Fecha de cierre"];
 r.getRange("A2:B9").values=f.map(x=>[x,""]); body(r.getRange("A2:B9")); r.getRange("A2:A9").format={fill:light,font:{bold:true,color:blue},wrapText:true,borders:{preset:"all",style:"thin",color:border}}; r.getRange("A1:A9").format.columnWidth=30; r.getRange("B1:B9").format.columnWidth=65; r.getRange("B9").format.numberFormat="yyyy-mm-dd";
 const x=await SpreadsheetFile.exportXlsx(wb); await x.save(`${out}/registro-iteraciones-chatgpt.xlsx`);
 const p1=await wb.render({sheetName:"Iteraciones",range:"A1:L12",scale:.8,format:"png"}); await fs.writeFile(`${out}/preview-iteraciones.png`,new Uint8Array(await p1.arrayBuffer()));
 const p2=await wb.render({sheetName:"Resumen final",range:"A1:B9",scale:1.2,format:"png"}); await fs.writeFile(`${out}/preview-resumen.png`,new Uint8Array(await p2.arrayBuffer()));
}
