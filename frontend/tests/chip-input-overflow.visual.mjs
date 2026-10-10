import { chromium } from "playwright";

const storybookUrl = process.env.STORYBOOK_URL ?? "http://127.0.0.1:6007";
const storyUrl = storybookUrl + "/iframe.html?id=ui-designsystemcomponents--chip-input-overflow-story&viewMode=story";

function expectEqual(actual, expected, message) {
  if (actual !== expected) throw new Error(message + ": expected " + expected + ", got " + actual);
}

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 900, height: 720 }, deviceScaleFactor: 1 });

try {
  await page.goto(storyUrl, { waitUntil: "domcontentloaded" });
  await page.waitForSelector("[data-testid='chip-input-active']", { timeout: 30000 });

  const upperMetrics = await page.evaluate(() => {
    const viewport = document.querySelector("[data-testid='chip-input-chips-viewport']");
    const style = getComputedStyle(viewport);
    return {
      clientHeight: viewport.clientHeight,
      scrollHeight: viewport.scrollHeight,
      scrollTop: viewport.scrollTop,
      scrollbarWidth: style.scrollbarWidth,
      hasCustomScroller: Boolean(document.querySelector("[data-testid='chip-input-scroller']")),
    };
  });

  expectEqual(upperMetrics.clientHeight, 124, "upper chip viewport height matches Figma");
  if (upperMetrics.scrollHeight <= upperMetrics.clientHeight) throw new Error("upper chip viewport must overflow");
  expectEqual(upperMetrics.scrollTop, 0, "upper chip viewport starts at the first row");
  expectEqual(upperMetrics.scrollbarWidth, "thin", "upper chip viewport uses native thin scrollbar");
  expectEqual(upperMetrics.hasCustomScroller, false, "custom scrollbar is removed");

  await page.locator("[data-testid='chip-input-chips-viewport']").evaluate((element) => {
    element.scrollTop = element.scrollHeight;
  });
  await page.waitForFunction(() => {
    const viewport = document.querySelector("[data-testid='chip-input-chips-viewport']");
    return viewport.scrollTop > 0;
  });

  const searchInput = page.locator("[data-testid='chip-input-active'] input[type='text']");
  await searchInput.focus();
  await page.waitForSelector("[data-testid='chip-input-active-list']", { state: "visible", timeout: 30000 });

  const listMetrics = await page.evaluate(() => {
    const list = document.querySelector("[data-testid='chip-input-active-list']");
    const style = getComputedStyle(list);
    return {
      clientHeight: list.clientHeight,
      scrollHeight: list.scrollHeight,
      scrollbarWidth: style.scrollbarWidth,
      optionCount: document.querySelectorAll("[data-testid='chip-input-active-option']").length,
    };
  });

  expectEqual(listMetrics.optionCount, 22, "result list contains all overflow skills");
  if (listMetrics.scrollHeight <= listMetrics.clientHeight) throw new Error("result list must overflow");
  expectEqual(listMetrics.scrollbarWidth, "thin", "result list uses native thin scrollbar");

  const figmaOption = page.locator("[data-testid='chip-input-active-option']", { hasText: "Figma" });
  await figmaOption.click();
  await page.waitForFunction(() => document.querySelectorAll("[data-testid='chip-input-active-chip']").length === 21);
  expectEqual(await figmaOption.getAttribute("aria-selected"), "false", "unselecting a result removes its top chip");

  await figmaOption.click();
  await page.waitForFunction(() => document.querySelectorAll("[data-testid='chip-input-active-chip']").length === 22);
  expectEqual(await figmaOption.getAttribute("aria-selected"), "true", "selecting a result restores its top chip");

  await page.getByRole("button", { name: "\u0423\u0434\u0430\u043b\u0438\u0442\u044c Figma" }).click();
  await page.waitForFunction(() => document.querySelectorAll("[data-testid='chip-input-active-chip']").length === 21);
  expectEqual(await figmaOption.getAttribute("aria-selected"), "false", "deleting a top chip unselects its result");
} finally {
  await browser.close();
}
