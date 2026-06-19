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
  const pollCount = await page.locator("[data-poll-id]").count();
  const disabledPollButtons = await page.locator(".poll-option:disabled").count();
  const pollStatuses = await page.locator("[data-poll-status]").evaluateAll((nodes) =>
    nodes.map((node) => node.textContent.trim())
  );

  const screenshotPath = path.resolve(__dirname, "..", "outputs", "presentation-preview.png");
  await page.screenshot({ path: screenshotPath, fullPage: false });

  const localPage = await browser.newPage({ viewport: { width: 1366, height: 768 } });
  const localConsoleErrors = [];
  localPage.on("console", (message) => {
    if (message.type() === "error") localConsoleErrors.push(message.text());
  });
  localPage.on("pageerror", (error) => localConsoleErrors.push(error.message));
  await localPage.goto("http://127.0.0.1:8000/?pollMode=local&pollUser=verify-a", { waitUntil: "networkidle" });
  const localButtonsBefore = await localPage.locator(".slide.active .poll-option:disabled").count();
  await localPage.locator(".slide.active .poll-option").first().click();
  const firstVoteText = await localPage.locator(".slide.active .poll-result").first().innerText();
  await localPage.locator(".slide.active .poll-option").nth(1).click();
  const changedVoteText = await localPage.locator(".slide.active .poll-result").first().innerText();
  const localStatus = await localPage.locator(".slide.active [data-poll-status]").innerText();
  const localScreenshotPath = path.resolve(__dirname, "..", "outputs", "presentation-preview-local-poll.png");
  await localPage.screenshot({ path: localScreenshotPath, fullPage: false });
  await browser.close();

  console.log(JSON.stringify({
    title1,
    counter1,
    title2,
    counter2,
    visibleSlides,
    pollCount,
    disabledPollButtons,
    pollStatuses,
    consoleErrors,
    screenshotPath,
    localPoll: {
      disabledButtonsBefore: localButtonsBefore,
      firstVoteText,
      changedVoteText,
      status: localStatus,
      consoleErrors: localConsoleErrors,
      screenshotPath: localScreenshotPath
    }
  }, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
