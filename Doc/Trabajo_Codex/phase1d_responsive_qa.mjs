import fs from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright";
const base="http://127.0.0.1:8766";
const evidence="C:/Users/ASUS/Desktop/Empresa Zyron/ZYRON PRIMUS/Doc/Evidencia/2026-07-26_LIVE_FASE_1D";
await fs.mkdir(evidence,{recursive:true});
const browser=await chromium.launch({headless:true,channel:"chrome"});
const report={screens:[],downloads:[],official:[],checks:{}};
for(const [name,width,height] of [["escritorio",1440,900],["tableta",768,1024],["movil",390,844]]){
 const page=await browser.newPage({viewport:{width,height}});
 await page.goto(`${base}/laboratorios/live/index.html`,{waitUntil:"networkidle"});
 const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>document.documentElement.clientWidth);
 const offenders=await page.evaluate(()=>[...document.querySelectorAll("body *")].filter(el=>el.getBoundingClientRect().right>document.documentElement.clientWidth+1).slice(0,12).map(el=>({tag:el.tagName,cls:el.className,text:(el.textContent||"").trim().slice(0,60),right:Math.round(el.getBoundingClientRect().right)})));
 const headings=await page.locator("h1,h2,h3").evaluateAll(xs=>xs.map(x=>x.tagName));
 const ids=await page.locator("[id]").evaluateAll(xs=>xs.map(x=>x.id));
 const duplicates=ids.filter((x,i)=>ids.indexOf(x)!==i);
 const links=await page.locator("a[href]").count();
 await page.screenshot({path:path.join(evidence,`${name}-${width}x${height}.png`),fullPage:true});
 report.screens.push({name,width,height,overflow,offenders,links,headings:headings.length,duplicateIds:duplicates});
 await page.close();
}
const page=await browser.newPage({viewport:{width:1440,height:900}});
await page.goto(`${base}/laboratorios/live/index.html`,{waitUntil:"networkidle"});
const downloads=await page.locator('a[download]').evaluateAll(xs=>xs.map(x=>x.href));
for(const url of downloads){
 const res=await page.request.get(url);report.downloads.push({url,status:res.status(),contentType:res.headers()["content-type"],size:(await res.body()).length});
}
const official=await page.locator('#fuentes a[href^="https://"]').evaluateAll(xs=>xs.map(x=>x.href));
for(const url of official){
 try{const res=await page.request.get(url,{timeout:30000});report.official.push({url,status:res.status()});}
 catch(e){report.official.push({url,status:"ERROR",error:String(e)});}
}
report.checks={
 h1:await page.locator("h1").count(),
 faq:await page.locator("#faq article").count(),
 modules:await page.locator("#modulos article").count(),
 downloads:downloads.length,
 focusVisible:await page.evaluate(()=>getComputedStyle(document.querySelector(".ai-lab-local-index a")).outlineStyle!==undefined),
 title:await page.title(),
 state:await page.locator(".openai-research-objective").innerText()
};
await fs.writeFile(path.join(evidence,"qa-live.json"),JSON.stringify(report,null,2),"utf8");
await browser.close();
console.log(JSON.stringify(report,null,2));
