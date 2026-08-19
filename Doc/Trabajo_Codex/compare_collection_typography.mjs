import {chromium}from"playwright";
const browser=await chromium.launch({headless:true,channel:"chrome"}),page=await browser.newPage({viewport:{width:1440,height:900}});
const result={};
for(const[name,url]of Object.entries({computerUse:"http://127.0.0.1:8770/laboratorios/computer-use/index.html",conectores:"http://127.0.0.1:8770/laboratorios/conectores/index.html",coleccion:"http://127.0.0.1:8770/coleccion-academica-zyron-ai/index.html"})){await page.goto(url);result[name]=await page.evaluate(()=>{const read=s=>{const e=document.querySelector(s);if(!e)return null;const c=getComputedStyle(e);return{selector:s,color:c.color,font:c.fontFamily,size:c.fontSize,weight:c.fontWeight,lineHeight:c.lineHeight,text:e.textContent.trim().slice(0,80)}};return{h1:read("h1"),h2:read("h2"),h3:read("h3"),body:read("body")}})}
await browser.close();console.log(JSON.stringify(result,null,2));
