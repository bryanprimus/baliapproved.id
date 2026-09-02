import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const area = process.argv[2];

if (!area) {
  console.error("Usage: node scripts/export-ig-highlight.mjs <area>");
  process.exit(1);
}

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "exports", "ig", "highlights");
const outPng = path.join(outDir, `${area}.png`);
const url = `http://localhost:4321/ig/highlight/${area}`;

const playwrightPath =
  process.env.PLAYWRIGHT_MODULE ??
  `${process.env.HOME}/.npm/_npx/e41f203b7505f1fb/node_modules/playwright/index.mjs`;
const executablePath =
  process.env.PLAYWRIGHT_CHROME ??
  `${process.env.HOME}/Library/Caches/ms-playwright/chromium-1234/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing`;

const { chromium } = await import(playwrightPath);

await mkdir(outDir, { recursive: true });

const browser = await chromium.launch({
  executablePath,
  headless: true,
});

const page = await browser.newPage({
  viewport: { width: 1080, height: 1080 },
  deviceScaleFactor: 2,
  colorScheme: "light",
});

await page.emulateMedia({ colorScheme: "light" });
await page.goto(url, { waitUntil: "networkidle", timeout: 30000 });
await page.addStyleTag({
  content: "astro-dev-toolbar{display:none!important}",
});
await page.evaluate(() => document.fonts.ready);

await page.screenshot({
  path: outPng,
  type: "png",
  animations: "disabled",
  clip: { x: 0, y: 0, width: 1080, height: 1080 },
});

await browser.close();

console.log(`Wrote ${outPng}`);
