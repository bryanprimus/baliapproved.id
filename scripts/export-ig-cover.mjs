import { spawnSync } from "node:child_process";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const id = process.argv[2];
const rawInput = process.argv[3];

if (!id) {
  console.error(
    "Usage: node scripts/export-ig-cover.mjs <place-id> [raw-photo-path]",
  );
  process.exit(1);
}

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "exports", "ig", id);
const outPng = path.join(outDir, "cover.png");
const stagedRaw = path.join(root, "public", "_ig-raw", `${id}.jpg`);
const url = `http://localhost:4321/ig/${id}`;

const playwrightPath =
  process.env.PLAYWRIGHT_MODULE ??
  `${process.env.HOME}/.npm/_npx/e41f203b7505f1fb/node_modules/playwright/index.mjs`;
const executablePath =
  process.env.PLAYWRIGHT_CHROME ??
  `${process.env.HOME}/Library/Caches/ms-playwright/chromium-1234/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing`;

const { chromium } = await import(playwrightPath);

await mkdir(outDir, { recursive: true });
await mkdir(path.dirname(stagedRaw), { recursive: true });

if (rawInput) {
  const convert = spawnSync(
    "sips",
    ["-s", "format", "jpeg", "-s", "formatOptions", "100", rawInput, "--out", stagedRaw],
    { stdio: "inherit" },
  );
  if (convert.status !== 0) {
    console.error("Failed to stage the raw cover photo as JPEG.");
    process.exit(convert.status ?? 1);
  }
}

const browser = await chromium.launch({
  executablePath,
  headless: true,
});

const page = await browser.newPage({
  viewport: { width: 1080, height: 1440 },
  deviceScaleFactor: 2,
  colorScheme: "light",
});

await page.emulateMedia({ colorScheme: "light" });
await page.goto(url, { waitUntil: "networkidle", timeout: 30000 });
await page.addStyleTag({
  content: "astro-dev-toolbar{display:none!important}",
});
await page.evaluate(() => document.fonts.ready);
await page.waitForFunction(() => {
  const img = document.querySelector("img.photo");
  return Boolean(img && img.complete && img.naturalWidth > 0);
});

const overflow = await page.evaluate(
  () => document.documentElement.scrollHeight - 1440,
);

if (overflow > 0) {
  console.warn(`Warning: slide overflowed by ${overflow}px`);
}

await page.screenshot({
  path: outPng,
  type: "png",
  animations: "disabled",
  clip: { x: 0, y: 0, width: 1080, height: 1440 },
});

await browser.close();

console.log(`Wrote ${outPng}`);
