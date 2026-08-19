import { chromium } from "playwright";
import fs from "node:fs/promises";

const url = "http://127.0.0.1:8125/laboratorios/sites/index.html";
const evidenceDir =
  "C:/Users/ASUS/Codex_Proyectos/CIVG 2026/phase1b1_stage/Doc/Evidencia/2026-07-26_SITES_FASE_1B_1";
const profiles = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "mobile", width: 390, height: 844 },
];

await fs.mkdir(evidenceDir, { recursive: true });
const browser = await chromium.launch({
  headless: true,
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
});
const results = [];

for (const profile of profiles) {
  const page = await browser.newPage({
    viewport: { width: profile.width, height: profile.height },
  });
  const response = await page.goto(url, { waitUntil: "networkidle" });
  const audit = await page.evaluate(() => {
    const ids = [...document.querySelectorAll("[id]")].map((element) => element.id);
    const duplicateIds = [...new Set(ids.filter((id, index) => ids.indexOf(id) !== index))];
    const links = [...document.links];
    const headings = [...document.querySelectorAll("h1,h2,h3,h4,h5,h6")].map((heading) => ({
      level: Number(heading.tagName.slice(1)),
      text: heading.textContent.trim(),
    }));
    const headingJumps = [];
    for (let index = 1; index < headings.length; index += 1) {
      if (headings[index].level > headings[index - 1].level + 1) {
        headingJumps.push([headings[index - 1], headings[index]]);
      }
    }
    return {
      documentWidth: document.documentElement.scrollWidth,
      viewportWidth: innerWidth,
      horizontalOverflow: document.documentElement.scrollWidth > innerWidth + 1,
      duplicateIds,
      emptyLinks: links.filter((link) => !link.textContent.trim()).length,
      missingAlt: [...document.images].filter(
        (image) => image.getAttribute("alt") === null || !image.getAttribute("alt").trim(),
      ).length,
      headingJumps,
      hasMain: Boolean(document.querySelector("main")),
      language: document.documentElement.lang,
      title: document.title,
      overflowElements: [...document.querySelectorAll("body *")]
        .map((element) => {
          const box = element.getBoundingClientRect();
          return {
            tag: element.tagName.toLowerCase(),
            className: String(element.className || ""),
            id: element.id,
            left: Math.round(box.left),
            right: Math.round(box.right),
            width: Math.round(box.width),
            text: (element.textContent || "").trim().slice(0, 80),
          };
        })
        .filter((item) => item.right > innerWidth + 1 || item.left < -1)
        .slice(0, 30),
      localIndex: (() => {
        const navigation = document.querySelector(".ai-lab-local-index");
        return navigation
          ? {
              display: getComputedStyle(navigation).display,
              whiteSpace: getComputedStyle(navigation).whiteSpace,
              width: Math.round(navigation.getBoundingClientRect().width),
              links: [...navigation.querySelectorAll("a")].map((link) => ({
                text: link.textContent.trim(),
                display: getComputedStyle(link).display,
                whiteSpace: getComputedStyle(link).whiteSpace,
                width: Math.round(link.getBoundingClientRect().width),
              })),
            }
          : null;
      })(),
    };
  });
  const keyboardFocus = [];
  for (let index = 0; index < 12; index += 1) {
    await page.keyboard.press("Tab");
    keyboardFocus.push(
      await page.evaluate(() => {
        const active = document.activeElement;
        const style = getComputedStyle(active);
        return {
          tag: active.tagName.toLowerCase(),
          text: (active.textContent || "").trim().slice(0, 60),
          href: active.getAttribute?.("href") || "",
          visible: Boolean(active.offsetWidth || active.offsetHeight || active.getClientRects().length),
          focusIndicator:
            style.outlineStyle !== "none" ||
            style.boxShadow !== "none" ||
            style.borderColor !== "rgba(0, 0, 0, 0)",
        };
      }),
    );
  }
  await page.screenshot({
    path: `${evidenceDir}/02-sites-${profile.name}.png`,
    fullPage: true,
  });
  results.push({
    profile,
    httpStatus: response?.status() ?? null,
    ...audit,
    keyboardFocus,
  });
  await page.close();
}

await browser.close();
await fs.writeFile(
  `${evidenceDir}/responsive-audit.json`,
  JSON.stringify(results, null, 2),
  "utf8",
);
console.log(JSON.stringify(results, null, 2));
