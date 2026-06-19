const path = require("node:path");

const playwrightCorePath = path.join(
  process.env.TEMP,
  "htmlpresentation-playwright-tools",
  "node_modules",
  "playwright-core"
);
const { chromium } = require(playwrightCorePath);
const baseUrl = process.env.PRESENTATION_BASE_URL || "http://127.0.0.1:8000";

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

  await page.goto(`${baseUrl}/app/`, { waitUntil: "domcontentloaded" });
  await page.locator("[data-poll-id]").first().waitFor();
  await page.waitForFunction(() => {
    const status = document.querySelector("[data-poll-status]")?.textContent || "";
    return !status.includes("正在準備投票");
  }, null, { timeout: 15000 }).catch(() => {});
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

  const localContext = await browser.newContext({ viewport: { width: 1366, height: 768 } });
  const localPage = await localContext.newPage();
  const localConsoleErrors = [];
  localPage.on("console", (message) => {
    if (message.type() === "error") localConsoleErrors.push(message.text());
  });
  localPage.on("pageerror", (error) => localConsoleErrors.push(error.message));
  await localPage.goto(`${baseUrl}/app/?pollMode=local&pollUser=verify-a`, { waitUntil: "domcontentloaded" });
  await localPage.locator("[data-poll-id]").first().waitFor();
  await localPage.locator("[data-vote-qr]").first().waitFor();
  const voteUrl = await localPage.locator("[data-vote-url]").first().innerText();
  const localButtonsBefore = await localPage.locator(".slide.active .poll-option:disabled").count();
  await localPage.locator(".slide.active .poll-option").first().click();
  const firstVoteText = await localPage.locator(".slide.active .poll-result").first().innerText();
  await localPage.locator(".slide.active .poll-option").nth(1).click();
  const changedVoteText = await localPage.locator(".slide.active .poll-result").first().innerText();
  const localStatus = await localPage.locator(".slide.active [data-poll-status]").innerText();
  const localScreenshotPath = path.resolve(__dirname, "..", "outputs", "presentation-preview-local-poll.png");
  await localPage.screenshot({ path: localScreenshotPath, fullPage: false });

  const votePage = await localContext.newPage();
  await votePage.setViewportSize({ width: 390, height: 844 });
  const voteConsoleErrors = [];
  votePage.on("console", (message) => {
    if (message.type() === "error") voteConsoleErrors.push(message.text());
  });
  votePage.on("pageerror", (error) => voteConsoleErrors.push(error.message));
  await votePage.goto(`${baseUrl}/app/vote.html?pollMode=local&pollUser=verify-b`, { waitUntil: "domcontentloaded" });
  await votePage.locator("#pollCard").waitFor({ state: "visible" });
  const voteQuestion = await votePage.locator("#question").innerText();
  await votePage.locator(".option").first().click();
  const voteStatus = await votePage.locator("#status").innerText();
  await localPage.locator("#next").click();
  await votePage.locator("#emptyState").waitFor({ state: "visible" });
  const voteWaitingText = await votePage.locator("#emptyState").innerText();
  const voteScreenshotPath = path.resolve(__dirname, "..", "outputs", "student-vote-preview.png");
  await votePage.screenshot({ path: voteScreenshotPath, fullPage: true });
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
      voteUrl,
      consoleErrors: localConsoleErrors,
      screenshotPath: localScreenshotPath
    },
    studentVotePage: {
      question: voteQuestion,
      status: voteStatus,
      waitingText: voteWaitingText,
      consoleErrors: voteConsoleErrors,
      screenshotPath: voteScreenshotPath
    }
  }, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
