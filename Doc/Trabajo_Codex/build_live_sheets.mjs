import fs from "node:fs/promises";
import { Workbook, SpreadsheetFile } from "@oai/artifact-tool";
const out="C:/Users/ASUS/Desktop/Empresa Zyron/ZYRON PRIMUS/recursos/laboratorio-live";
await fs.mkdir(out,{recursive:true});
const blue="#0B3F75",gold="#F0A22E",light="#EEF3F8",navy="#07152B";
function base(name,title,sub,last){
 const wb=Workbook.create(),s=wb.worksheets.add(name);
 s.getRange(`A1:${last}1`).merge();s.getRange("A1").values=[[title]];
 s.getRange(`A2:${last}2`).merge();s.getRange("A2").values=[[sub]];
 s.getRange("A1").format={font:{bold:true,size:18,color:gold},horizontalAlignment:"center",rowHeight:30};
 s.getRange("A2").format={font:{bold:true,size:10,color:blue},horizontalAlignment:"center",rowHeight:22};
 s.freezePanes.freezeRows(4);return{wb,s};
}
function head(r){r.format={fill:blue,font:{bold:true,color:"#FFFFFF"},horizontalAlignment:"center",verticalAlignment:"center",wrapText:true,rowHeight:30};}
function body(r){r.format={font:{color:navy,size:10},verticalAlignment:"top",wrapText:true,borders:{top:{style:"thin",color:"#AAB8C5"},bottom:{style:"thin",color:"#AAB8C5"},left:{style:"thin",color:"#AAB8C5"},right:{style:"thin",color:"#AAB8C5"}}};}
async function save(wb,name,previews){
 await (await SpreadsheetFile.exportXlsx(wb)).save(`${out}/${name}.xlsx`);
 for(const [sheet,range,file,scale] of previews){
  const b=await wb.render({sheetName:sheet,range,scale,format:"png"});
  await fs.writeFile(`${out}/${file}`,new Uint8Array(await b.arrayBuffer()));
 }
}
{
 const checks=["Objetivo y criterio de éxito definidos","Plan, región, aplicación y cuenta verificados","Opción Voice/Live/Advanced/Standard confirmada","Conexión y batería adecuadas","Micrófono probado","Auriculares o salida de audio adecuada","Espacio silencioso y privado","Permiso de micrófono limitado","Cámara autorizada solo si corresponde","Pantalla autorizada solo si corresponde","Notificaciones y ventanas sensibles cerradas","Consentimiento de terceros obtenido","Datos confidenciales retirados","Idioma y contexto definidos","Interrupción de emergencia conocida","Transcripción revisada","Fuentes y datos importantes validados","Micrófono, cámara y pantalla detenidos","Retención y eliminación revisadas","Resultado y observaciones registrados"];
 const {wb,s}=base("Verificación","Lista de verificación de audio, privacidad y permisos","20 controles · ZYRON AI LAB · 26-07-2026","F");
 s.getRange("A4:F4").values=[["N°","Control","Cumple","No cumple","No aplica","Observaciones"]];head(s.getRange("A4:F4"));
 s.getRange("A5:F24").values=checks.map((x,i)=>[i+1,x,"","","",""]);body(s.getRange("A5:F24"));
 s.getRange("C5:E24").dataValidation={rule:{type:"list",values:["X",""]}};[7,44,12,12,12,42].forEach((w,i)=>s.getRangeByIndexes(0,i,24,1).format.columnWidth=w);
 s.tables.add("A4:F24",true,"ListaLive").style="TableStyleMedium2";
 await save(wb,"lista-verificacion-audio-privacidad-permisos",[["Verificación","A1:F24","preview-lista-live.png",1]]);
}
{
 const rows=[["Definición del objetivo",15,"Objetivo, audiencia y éxito inequívocos"],["Preparación técnica y permisos",15,"Dispositivo, entorno y permisos verificados"],["Estructura y continuidad",15,"Diálogo ordenado y contextual"],["Interrupciones y correcciones",15,"Redirige, aclara y corrige"],["Aplicación profesional o educativa",10,"Uso pertinente y transferible"],["Privacidad y consentimiento",10,"Protección y autorización demostrables"],["Validación del resultado",10,"Datos, resumen y transcripción revisados"],["Registro y reflexión",10,"Trazabilidad y mejoras documentadas"]];
 const {wb,s}=base("Rúbrica","Rúbrica del Laboratorio ChatGPT Voice — experiencia Live","100 puntos · ZYRON AI LAB · 26-07-2026","H");
 s.getRange("A4:H4").values=[["Criterio","Máximo","Excelente","Competente","En desarrollo","Requiere revisión","Obtenido","Comentarios"]];head(s.getRange("A4:H4"));
 s.getRange("A5:H12").values=rows.map(([a,b,c])=>[a,b,c,"Cumple lo esencial","Cumplimiento parcial","Debe repetirse","",""]);body(s.getRange("A5:H12"));
 s.getRange("A14:F14").merge();s.getRange("A14").values=[["RESULTADO TOTAL"]];s.getRange("G14").formulas=[["=SUM(G5:G12)"]];
 s.getRange("A15:F15").merge();s.getRange("A15").values=[["PORCENTAJE"]];s.getRange("G15").formulas=[["=G14/100"]];s.getRange("G15").format.numberFormat="0%";
 s.getRange("A16:F16").merge();s.getRange("A16").values=[["CONDICIÓN"]];s.getRange("G16").formulas=[['=IF(G14>=90,"Excelente",IF(G14>=75,"Competente",IF(G14>=60,"En desarrollo","Requiere revisión")))']];
 body(s.getRange("A14:H16"));[28,10,28,20,20,20,12,28].forEach((w,i)=>s.getRangeByIndexes(0,i,16,1).format.columnWidth=w);s.tables.add("A4:H12",true,"RubricaLive").style="TableStyleMedium2";
 await save(wb,"rubrica-laboratorio-live",[["Rúbrica","A1:H16","preview-rubrica-live.png",.9]]);
}
{
 const {wb,s}=base("Registro","Registro de sesiones, objetivos, resultados y observaciones","No requiere guardar audio o video · ZYRON AI LAB · 26-07-2026","L");
 const h=["ID","Fecha","Objetivo","Opción Voice","Dispositivo","Permisos","Consentimiento","Resultado","Validación","Incidencias","Próximo paso","Responsable"];
 s.getRange("A4:L4").values=[h];head(s.getRange("A4:L4"));s.getRange("A5:L24").values=Array.from({length:20},(_,i)=>[i+1,"","","","","","","","","","",""]);body(s.getRange("A5:L24"));
 s.getRange("D5:D24").dataValidation={rule:{type:"list",values:["Live","Advanced","Standard","Dictation","Otra"]}};
 s.getRange("G5:G24").dataValidation={rule:{type:"list",values:["Sí","No","No aplica"]}};
 [7,12,24,15,16,18,16,24,20,20,20,18].forEach((w,i)=>s.getRangeByIndexes(0,i,24,1).format.columnWidth=w);s.tables.add("A4:L24",true,"RegistroLive").style="TableStyleMedium2";
 const r=wb.worksheets.add("Resumen");r.getRange("A1:B1").merge();r.getRange("A1").values=[["Resumen de sesión Voice/Live"]];r.getRange("A1").format={fill:blue,font:{bold:true,color:"#FFFFFF",size:16},horizontalAlignment:"center",rowHeight:28};
 const f=["Objetivo","Audiencia","Opción utilizada","Disponibilidad verificada","Permisos autorizados","Consentimiento","Resultado","Datos validados","Diferencias de transcripción","Incidencias","Decisiones humanas","Eliminación requerida"];
 r.getRange("A3:B14").values=f.map(x=>[x,""]);body(r.getRange("A3:B14"));r.getRange("A3:A14").format={fill:light,font:{bold:true,color:blue},wrapText:true};r.getRange("A1:A14").format.columnWidth=32;r.getRange("B1:B14").format.columnWidth=70;
 await save(wb,"registro-sesiones-live",[["Registro","A1:L24","preview-registro-live.png",.8],["Resumen","A1:B14","preview-resumen-live.png",1.1]]);
}
