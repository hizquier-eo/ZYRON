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
 const {wb,s}=base("Verificación","Lista de verificación para publicar un Site","ZYRON AI LAB · Versión 2026-07-26","F");
 const headers=["Número","Criterio","Cumple","No cumple","No aplica","Observaciones"]; const criteria=["Objetivo del sitio definido","Público identificado","Contenido aprobado","Navegación funcional","Enlaces internos correctos","Enlaces externos seguros","Imágenes disponibles","Texto alternativo","Contraste legible","Visualización móvil","Formularios probados","Política de privacidad","Consentimiento de datos","Dominio y alojamiento","Copia de respaldo","Responsable de aprobación","Fecha de publicación","Plan de mantenimiento"];
 s.getRange("A4:F4").values=[headers]; header(s.getRange("A4:F4"));
 s.getRange("A5:F22").values=criteria.map((c,i)=>[i+1,c,"","","",""]); body(s.getRange("A5:F22"));
 s.getRange("A5:A22").format.horizontalAlignment="center"; s.getRange("C5:E22").dataValidation={rule:{type:"list",values:["X",""]}};
 [8,34,12,12,12,38].forEach((w,i)=>s.getRangeByIndexes(0,i,22,1).format.columnWidth=w);
 s.tables.add("A4:F22",true,"ListaVerificacionSites").style="TableStyleMedium2";
 const x=await SpreadsheetFile.exportXlsx(wb); await x.save(`${out}/lista-verificacion-publicacion-sites.xlsx`);
 const p=await wb.render({sheetName:"Verificación",range:"A1:F22",scale:1.1,format:"png"}); await fs.writeFile(`${out}/preview-lista.png`,new Uint8Array(await p.arrayBuffer()));
}
{
 const {wb,s}=base("Rúbrica","Rúbrica de evaluación del laboratorio Sites","100 puntos · ZYRON AI LAB · Versión 2026-07-26","H");
 const h=["Criterio","Puntos máximos","Excelente","Competente","En desarrollo","Requiere revisión","Puntuación obtenida","Comentarios del evaluador"];
 const rows=[["Definición del propósito",15],["Arquitectura y navegación",15],["Calidad del contenido",15],["Diseño visual y coherencia",15],["Adaptación móvil",10],["Accesibilidad",10],["Funcionalidad y enlaces",10],["Seguridad, privacidad y publicación",10]].map(([a,b])=>[a,b,"Dominio completo","Cumple lo esencial","Cumplimiento parcial","Debe rehacerse","", ""]);
 s.getRange("A4:H4").values=[h]; header(s.getRange("A4:H4")); s.getRange("A5:H12").values=rows; body(s.getRange("A5:H12"));
 s.getRange("A14:F14").merge(); s.getRange("A14").values=[["RESULTADO TOTAL"]]; s.getRange("G14").formulas=[["=SUM(G5:G12)"]];
 s.getRange("A15:F15").merge(); s.getRange("A15").values=[["PORCENTAJE FINAL"]]; s.getRange("G15").formulas=[["=G14/100"]]; s.getRange("G15").format.numberFormat="0%";
 s.getRange("A16:F16").merge(); s.getRange("A16").values=[["CONDICIÓN FINAL"]]; s.getRange("G16").formulas=[['=IF(G14>=90,"Excelente",IF(G14>=75,"Competente",IF(G14>=60,"En desarrollo","Requiere revisión")))']];
 body(s.getRange("A14:H16")); s.getRange("A14:A16").format.font={bold:true,color:blue};
 [27,11,18,18,18,18,13,28].forEach((w,i)=>s.getRangeByIndexes(0,i,16,1).format.columnWidth=w);
 s.tables.add("A4:H12",true,"RubricaSites").style="TableStyleMedium2";
 const x=await SpreadsheetFile.exportXlsx(wb); await x.save(`${out}/rubrica-laboratorio-sites.xlsx`);
 const p=await wb.render({sheetName:"Rúbrica",range:"A1:H16",scale:1,format:"png"}); await fs.writeFile(`${out}/preview-rubrica.png`,new Uint8Array(await p.arrayBuffer()));
}
{
 const {wb,s}=base("Versiones","Registro de versiones y cambios del Site","ZYRON AI LAB · Versión 2026-07-26","K");
 const h=["Número de versión","Fecha","Página o sección","Cambio realizado","Motivo","Archivo modificado","Responsable","Revisión realizada","Estado","Fecha de aprobación","Observaciones"];
 s.getRange("A4:K4").values=[h]; header(s.getRange("A4:K4")); s.getRange("A5:K24").values=Array.from({length:20},(_,i)=>[i+1,"","","","","","","","","",""]); body(s.getRange("A5:K24"));
 s.getRange("B5:B24").format.numberFormat="yyyy-mm-dd"; s.getRange("J5:J24").format.numberFormat="yyyy-mm-dd"; s.getRange("I5:I24").dataValidation={rule:{type:"list",values:["Borrador","En revisión","Aprobado","Publicado"]}};
 [11,12,22,30,24,24,18,24,16,18,28].forEach((w,i)=>s.getRangeByIndexes(0,i,24,1).format.columnWidth=w);
 s.tables.add("A4:K24",true,"RegistroVersionesSites").style="TableStyleMedium2";
 const r=wb.worksheets.add("Resumen de publicación"); r.showGridLines=false; r.getRange("A1:B1").values=[["Campo","Resumen"]]; header(r.getRange("A1:B1"));
 const f=["Nombre del sitio","Versión publicada","Fecha","Dominio","Responsable","Archivos incluidos","Validaciones realizadas","Incidencias conocidas","Respaldo creado","Próxima revisión"];
 r.getRange("A2:B11").values=f.map(x=>[x,""]); body(r.getRange("A2:B11")); r.getRange("A2:A11").format={fill:light,font:{bold:true,color:blue},wrapText:true,borders:{preset:"all",style:"thin",color:border}}; r.getRange("A1:A11").format.columnWidth=30; r.getRange("B1:B11").format.columnWidth=65; r.getRange("B4").format.numberFormat="yyyy-mm-dd"; r.getRange("B11").format.numberFormat="yyyy-mm-dd";
 const x=await SpreadsheetFile.exportXlsx(wb); await x.save(`${out}/registro-versiones-sites.xlsx`);
 const p1=await wb.render({sheetName:"Versiones",range:"A1:K12",scale:.8,format:"png"}); await fs.writeFile(`${out}/preview-versiones.png`,new Uint8Array(await p1.arrayBuffer()));
 const p2=await wb.render({sheetName:"Resumen de publicación",range:"A1:B11",scale:1.2,format:"png"}); await fs.writeFile(`${out}/preview-resumen-publicacion.png`,new Uint8Array(await p2.arrayBuffer()));
}
