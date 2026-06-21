const path = require("node:path");
const { pathToFileURL } = require("node:url");

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
  await localPage.waitForFunction(() =>
    document.querySelector(".slide.active .poll-result")?.textContent.includes("1 票")
  );
  const firstVoteText = await localPage.locator(".slide.active .poll-result").first().innerText();
  await votePage.locator(".option").nth(1).click();
  await localPage.waitForFunction(() =>
    document.querySelector(".slide.active .poll-result")?.textContent.includes("0 票")
  );
  const changedVoteText = await localPage.locator(".slide.active .poll-result").first().innerText();

  // 驗證「重新計票」按鈕在本地測試模式下的效果
  localPage.once("dialog", (dialog) => dialog.accept());
  await localPage.locator(".slide.active .poll-reset-btn").click();

  // 等待學員端 UI 解鎖（沒有任何按鈕被選取）
  await votePage.waitForFunction(() => {
    return !document.querySelector(".option.selected");
  });

  const debugFillsText = await localPage.evaluate(() => {
    const fills = Array.from(document.querySelectorAll(".slide.active .poll-result > span:last-child"));
    return fills.map(span => span.textContent);
  });
  console.log("[Debug] Fills content right after resetBtn click:", debugFillsText);

  // 等待講師端統計歸零（所有選項票數都是 0 票）
  await localPage.waitForFunction(() => {
    const fills = Array.from(document.querySelectorAll(".slide.active .poll-result > span:last-child"));
    return fills.length > 0 && fills.every(span => span.textContent.includes("0 票"));
  }, null, { timeout: 5000 }).catch(async (e) => {
    const timeoutText = await localPage.evaluate(() => {
      const fills = Array.from(document.querySelectorAll(".slide.active .poll-result > span:last-child"));
      return fills.map(span => span.textContent);
    });
    console.log("[Debug] Fills content after 5s timeout:", timeoutText);
    throw e;
  });

  const localStatus = await localPage.locator(".slide.active [data-poll-status]").innerText();
  const localScreenshotPath = path.resolve(__dirname, "..", "outputs", "presentation-preview-local-poll.png");
  await localPage.screenshot({ path: localScreenshotPath, fullPage: false });
  const voteStatus = await votePage.locator("#status").innerText();
  await localPage.locator("#next").click();
  await votePage.locator("#emptyState").waitFor({ state: "visible" });
  const voteWaitingText = await votePage.locator("#emptyState").innerText();
  const voteScreenshotPath = path.resolve(__dirname, "..", "outputs", "student-vote-preview.png");
  await votePage.screenshot({ path: voteScreenshotPath, fullPage: true });

  const filePage = await localContext.newPage();
  const fileUrl = pathToFileURL(path.resolve(__dirname, "..", "app", "index.html"));
  fileUrl.searchParams.set("pollMode", "local");
  await filePage.goto(fileUrl.href, { waitUntil: "domcontentloaded" });
  await filePage.evaluate(() => {
    document.querySelectorAll(".slide").forEach((slide, index) => {
      slide.classList.toggle("active", index === 9);
    });
  });
  const fileModeLayout = await filePage.evaluate(() => {
    const slide = document.querySelectorAll(".slide")[9];
    const poll = slide.querySelector(".live-poll");
    const takeaway = slide.querySelector(".takeaway");
    const pollBounds = poll.getBoundingClientRect();
    const takeawayBounds = takeaway.getBoundingClientRect();
    return {
      voteLabel: slide.querySelector("[data-vote-url]").textContent,
      voteTarget: slide.querySelector("[data-vote-url]").title,
      noOverlap: pollBounds.bottom <= takeawayBounds.top
    };
  });
  await filePage.setViewportSize({ width: 1450, height: 825 });
  const redesignedSlidesLayout = await filePage.evaluate(() => [4, 11].map((slideIndex) => {
    const slides = Array.from(document.querySelectorAll(".slide"));
    slides.forEach((slide, index) => slide.classList.toggle("active", index === slideIndex));
    const slide = slides[slideIndex];
    const slideBounds = slide.getBoundingClientRect();
    const taskBounds = slide.querySelector(".teacher-task").getBoundingClientRect();
    const takeawayBounds = slide.querySelector(".takeaway").getBoundingClientRect();
    return {
      slide: slideIndex + 1,
      contentInside: taskBounds.bottom <= slideBounds.bottom,
      noOverlap: taskBounds.bottom <= takeawayBounds.top,
      gap: Math.round((takeawayBounds.top - taskBounds.bottom) * 10) / 10
    };
  }));
  if (redesignedSlidesLayout.some((result) => !result.contentInside || !result.noOverlap)) {
    throw new Error(`Redesigned slide layout overflow: ${JSON.stringify(redesignedSlidesLayout)}`);
  }
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
    },
    fileModeLayout,
    redesignedSlidesLayout
  }, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
