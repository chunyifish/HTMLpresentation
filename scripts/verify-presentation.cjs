const path = require("node:path");

const playwrightCorePath = path.join(
  process.env.TEMP,
  "htmlpresentation-playwright-tools",
  "node_modules",
  "playwright-core"
);
const { chromium } = require(playwrightCorePath);

async function main() {
  const browser = await chromium.launch({
    headless: true,
    executablePath: "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe"
  });
  const page = await browser.newPage({ viewport: { width: 1366, height: 768 } });
  const consoleErrors = [];

  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });
  page.on("pageerror", (error) => consoleErrors.push(error.message));

  await page.goto("http://127.0.0.1:8000/", { waitUntil: "networkidle" });
  const title1 = await page.locator(".slide.active h1, .slide.active h2").first().innerText();
  const counter1 = await page.locator("#counter").innerText();

  await page.locator("#next").click();
  const title2 = await page.locator(".slide.active h1, .slide.active h2").first().innerText();
  const counter2 = await page.locator("#counter").innerText();
  const visibleSlides = await page.locator(".slide.active").count();

  const screenshotPath = path.resolve(__dirname, "..", "outputs", "presentation-preview.png");
  await page.screenshot({ path: screenshotPath, fullPage: false });
  await browser.close();

  console.log(JSON.stringify({
    title1,
    counter1,
    title2,
    counter2,
    visibleSlides,
    consoleErrors,
    screenshotPath
  }, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
