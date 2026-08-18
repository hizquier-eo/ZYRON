import fs from "node:fs/promises";
import { chromium } from "playwright";

const base = "http://127.0.0.1:8767";
const browser = await chromium.launch({ headless: true, channel: "chrome" });
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
const report = { pages: {}, institutionalDocuments: {} };

for (const [name, route] of Object.entries({
  laboratorio: "/laboratorios/computer-use/index.html",
  centroOpenAI: "/centro-investigacion-openai.html",
  mapaZYRON: "/index.html",
})) {
  await page.goto(`${base}${route}`, { waitUntil: "networkidle" });
  const text = await page.locator("body").textContent();
  report.pages[name] = {
    status: (await page.request.get(`${base}${route}`)).status(),
    active: text.includes("Computer Use") && text.includes("Activo"),
    overflow: await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth),
  };
}

const docs = [
  "docs/PROJECT_STATUS.md", "docs/SESSION_LOG.md", "docs/CHANGELOG.md",
  "docs/ROADMAP.md", "docs/NEXT_TASK.md", "docs/KNOWN_ISSUES.md",
  "docs/VERSION_HISTORY.md", "docs/HANDOVER.md",
  "docs/PLAN_COMPLETADO_CONTENIDOS_ZYRON.md", "Doc/Memoria/00_MEMORIA_MAESTRA_ZYRON.md",
];
for (const file of docs) {
  const text = await fs.readFile(file, "utf8");
  report.institutionalDocuments[file] = file.endsWith("NEXT_TASK.md")
    ? text.includes("FASE 1F") && text.includes("Laboratorio Conectores")
    : text.includes("Fase 1E") && (text.includes("0.16.0") || file.endsWith("KNOWN_ISSUES.md"));
}

await fs.writeFile(
  "Doc/Evidencia/2026-07-26_COMPUTER_USE_FASE_1E/qa-activacion-final.json",
  JSON.stringify(report, null, 2)
);
await browser.close();

if (
  Object.values(report.pages).some((x) => x.status !== 200 || !x.active || x.overflow) ||
  Object.values(report.institutionalDocuments).some((x) => !x)
) process.exitCode = 1;

console.log(JSON.stringify(report, null, 2));
