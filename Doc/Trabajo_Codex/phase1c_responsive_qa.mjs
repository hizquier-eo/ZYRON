import { chromium } from "playwright";
import fs from "node:fs/promises";
const url="http://127.0.0.1:8126/laboratorios/work/index.html";
const evidence="C:/Users/ASUS/Codex_Proyectos/CIVG 2026/phase1c_stage/Doc/Evidencia/2026-07-26_WORK_FASE_1C";
await fs.mkdir(evidence,{recursive:true});
const browser=await chromium.launch({headless:true,executablePath:"C:/Program Files/Google/Chrome/Application/chrome.exe"});
const profiles=[["desktop",1440,900],["tablet",768,1024],["mobile",390,844]],results=[];
for(const [name,width,height] of profiles){
 const page=await browser.newPage({viewport:{width,height}});
 const response=await page.goto(url,{waitUntil:"networkidle"});
 const audit=await page.evaluate(()=>{
  const ids=[...document.querySelectorAll("[id]")].map(e=>e.id);
  const links=[...document.links], headings=[...document.querySelectorAll("h1,h2,h3,h4,h5,h6")].map(h=>+h.tagName.slice(1));
  const jumps=[];for(let i=1;i<headings.length;i++)if(headings[i]>headings[i-1]+1)jumps.push([headings[i-1],headings[i]]);
  return {documentWidth:document.documentElement.scrollWidth,viewportWidth:innerWidth,horizontalOverflow:document.documentElement.scrollWidth>innerWidth+1,duplicateIds:[...new Set(ids.filter((x,i)=>ids.indexOf(x)!==i))],emptyLinks:links.filter(a=>!a.textContent.trim()).length,missingAlt:[...document.images].filter(i=>!i.hasAttribute("alt")||!i.alt.trim()).length,headingJumps:jumps,lang:document.documentElement.lang,hasMain:!!document.querySelector("main"),statusDeveloping:document.body.innerText.includes("Estado: En desarrollo")};
 });
 const keyboard=[];
 for(let i=0;i<12;i++){await page.keyboard.press("Tab");keyboard.push(await page.evaluate(()=>{const e=document.activeElement,s=getComputedStyle(e);return{tag:e.tagName.toLowerCase(),text:(e.textContent||"").trim().slice(0,50),visible:!!(e.offsetWidth||e.offsetHeight||e.getClientRects().length),focus:s.outlineStyle!=="none"||s.boxShadow!=="none"||s.borderColor!=="rgba(0, 0, 0, 0)"}}));}
 await page.screenshot({path:`${evidence}/work-${name}.png`,fullPage:true});
 results.push({profile:{name,width,height},httpStatus:response?.status(),...audit,keyboard});
 await page.close();
}
await browser.close();await fs.writeFile(`${evidence}/responsive-audit.json`,JSON.stringify(results,null,2));console.log(JSON.stringify(results,null,2));
