import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";

const storybookUrl = process.env.STORYBOOK_URL ?? "http://127.0.0.1:6007";
const storyUrl = `${storybookUrl}/iframe.html?id=ui-designsystemcomponents--chip-input-active-story&viewMode=story`;
const screenshotPath = path.join(process.cwd(), "test-results", "chip-input-active-story.png");
const placeholder = "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043d\u0430\u0432\u044b\u043a";
const skill4 = "\u041d\u0430\u0432\u044b\u043a 4";
const expectedOptions = ["Figma", "Adobe Photoshop", "\u041d\u0430\u0432\u044b\u043a 3", skill4, "\u041d\u0430\u0432\u044b\u043a 5"].join("|");

function expectEqual(actual, expected, message) {
  if (actual !== expected) {
    throw new Error(`${message}: expected ${expected}, got ${actual}`);
  }
}

function expectNear(actual, expected, tolerance, message) {
  if (Math.abs(actual - expected) > tolerance) {
    throw new Error(`${message}: expected ${expected} +/- ${tolerance}, got ${actual}`);
  }
}

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 900, height: 560 }, deviceScaleFactor: 1 });

try {
  await page.goto(storyUrl, { waitUntil: "domcontentloaded" });
  await page.waitForSelector("[data-testid='chip-input-active']", { timeout: 30000 });
  await page.waitForSelector("[data-testid='chip-input-active-chip']", { timeout: 30000 });

  const initialMetrics = await page.evaluate(() => {
    function rect(el) {
      const r = el.getBoundingClientRect();
      return {
        x: Math.round(r.x),
        y: Math.round(r.y),
        w: Math.round(r.width),
        h: Math.round(r.height),
      };
    }

    const input = document.querySelector("[data-testid='chip-input-active'] input[type='text']");
    const wrapper = document.querySelector("[data-testid='chip-input-active']");
    const top = document.querySelector("[data-testid='chip-input-active-top']");
    const chips = [...document.querySelectorAll("[data-testid='chip-input-active-chip']")];
    const topStyles = getComputedStyle(top);
    const inputStyles = getComputedStyle(input);

    return {
      wrapper: rect(wrapper),
      top: rect(top),
      chips: chips.map(rect),
      hasListbox: Boolean(document.querySelector("[data-testid='chip-input-active-list']")),
      placeholder: input.getAttribute("placeholder"),
      topStyles: {
        background: topStyles.backgroundColor,
        borderTopLeftRadius: topStyles.borderTopLeftRadius,
        borderTopRightRadius: topStyles.borderTopRightRadius,
        borderBottomLeftRadius: topStyles.borderBottomLeftRadius,
        borderBottomRightRadius: topStyles.borderBottomRightRadius,
        paddingLeft: topStyles.paddingLeft,
        paddingTop: topStyles.paddingTop,
        gap: topStyles.gap,
      },
      inputStyles: {
        fontSize: inputStyles.fontSize,
        fontWeight: inputStyles.fontWeight,
        lineHeight: inputStyles.lineHeight,
        color: inputStyles.color,
      },
    };
  });

  expectEqual(initialMetrics.wrapper.w, 800, "initial chip input width matches Figma");
  expectEqual(initialMetrics.wrapper.h, 128, "initial unfocused state hides dropdown");
  expectEqual(initialMetrics.top.w, 800, "initial top width matches Figma");
  expectEqual(initialMetrics.top.h, 128, "initial top height matches Figma");
  expectEqual(initialMetrics.hasListbox, false, "initial unfocused state does not render dropdown");
  expectEqual(initialMetrics.topStyles.background, "rgb(255, 255, 255)", "top background matches Figma");
  expectEqual(initialMetrics.topStyles.borderTopLeftRadius, "24px", "top left radius matches Figma");
  expectEqual(initialMetrics.topStyles.borderTopRightRadius, "24px", "top right radius matches Figma");
  expectEqual(initialMetrics.topStyles.borderBottomLeftRadius, "24px", "unfocused bottom left radius matches top radius");
  expectEqual(initialMetrics.topStyles.borderBottomRightRadius, "24px", "unfocused bottom right radius matches top radius");
  expectEqual(initialMetrics.topStyles.paddingLeft, "24px", "top horizontal padding matches Figma");
  expectEqual(initialMetrics.topStyles.paddingTop, "24px", "top vertical padding matches Figma");
  expectEqual(initialMetrics.topStyles.gap, "16px", "top content gap matches Figma");
  expectEqual(initialMetrics.chips.length, 2, "initial selected chip count matches Figma");
  expectEqual(initialMetrics.chips[0].h, 36, "selected chip height matches Figma");
  expectNear(initialMetrics.chips[0].y, initialMetrics.top.y + 24, 1, "selected chips align to top padding");
  expectEqual(initialMetrics.placeholder, placeholder, "placeholder text is decoded correctly");
  expectEqual(initialMetrics.inputStyles.fontSize, "20px", "search input font size matches Figma");
  expectEqual(initialMetrics.inputStyles.fontWeight, "500", "search input weight matches Figma");
  expectEqual(initialMetrics.inputStyles.lineHeight, "28px", "search input line-height matches Figma");

  const searchInput = page.locator("[data-testid='chip-input-active'] input[type='text']");
  await searchInput.focus();
  await page.waitForSelector("[data-testid='chip-input-active-option']", { timeout: 30000 });

  const focusedMetrics = await page.evaluate(() => {
    function rect(el) {
      const r = el.getBoundingClientRect();
      return {
        x: Math.round(r.x),
        y: Math.round(r.y),
        w: Math.round(r.width),
        h: Math.round(r.height),
      };
    }

    const wrapper = document.querySelector("[data-testid='chip-input-active']");
    const top = document.querySelector("[data-testid='chip-input-active-top']");
    const listbox = document.querySelector("[data-testid='chip-input-active-list']");
    const options = [...document.querySelectorAll("[data-testid='chip-input-active-option']")];
    const topStyles = getComputedStyle(top);
    const listboxStyles = getComputedStyle(listbox);

    return {
      wrapper: rect(wrapper),
      top: rect(top),
      listbox: rect(listbox),
      firstRow: rect(options[0]),
      selectedCount: options.filter((option) => option.getAttribute("aria-selected") === "true").length,
      optionLabels: options.map((option) => option.textContent.trim()),
      topStyles: {
        borderBottomLeftRadius: topStyles.borderBottomLeftRadius,
        borderBottomRightRadius: topStyles.borderBottomRightRadius,
      },
      listboxStyles: {
        background: listboxStyles.backgroundColor,
        borderTopColor: listboxStyles.borderTopColor,
        borderBottomLeftRadius: listboxStyles.borderBottomLeftRadius,
        borderBottomRightRadius: listboxStyles.borderBottomRightRadius,
      },
    };
  });

  expectEqual(focusedMetrics.wrapper.h, 429, "focused state shows dropdown");
  expectEqual(focusedMetrics.topStyles.borderBottomLeftRadius, "0px", "focused top bottom left radius joins dropdown");
  expectEqual(focusedMetrics.topStyles.borderBottomRightRadius, "0px", "focused top bottom right radius joins dropdown");
  expectEqual(focusedMetrics.listbox.w, 800, "dropdown width matches Figma");
  expectEqual(focusedMetrics.listboxStyles.borderTopColor, "rgb(222, 222, 222)", "dropdown separator matches Figma");
  expectEqual(focusedMetrics.listboxStyles.borderBottomLeftRadius, "48px", "dropdown bottom left radius matches Figma");
  expectEqual(focusedMetrics.listboxStyles.borderBottomRightRadius, "48px", "dropdown bottom right radius matches Figma");
  expectEqual(focusedMetrics.firstRow.h, 60, "option row height matches Figma");
  expectEqual(focusedMetrics.selectedCount, 2, "checkboxes sync with initial chips");
  expectEqual(focusedMetrics.optionLabels.join("|"), expectedOptions, "initial options match story data");

  await searchInput.fill("4");
  await page.waitForFunction(() => document.querySelectorAll("[data-testid='chip-input-active-option']").length === 1);
  expectEqual(await page.locator("[data-testid='chip-input-active-option']").innerText(), skill4, "search filters skills by label");

  await page.locator("[data-testid='chip-input-active-option']").click();
  await searchInput.fill("");
  await page.waitForFunction(() => document.querySelectorAll("[data-testid='chip-input-active-chip']").length === 3);
  expectEqual(await page.locator("[data-testid='chip-input-active-option'][aria-selected='true']").count(), 3, "checking an option adds a synced chip");

  await page.getByRole("button", { name: "\u0423\u0434\u0430\u043b\u0438\u0442\u044c Figma" }).click();
  await page.waitForFunction(() => document.querySelectorAll("[data-testid='chip-input-active-chip']").length === 2);
  const figmaSelected = await page.locator("[data-testid='chip-input-active-option']", { hasText: "Figma" }).getAttribute("aria-selected");
  expectEqual(figmaSelected, "false", "deleting a chip unchecks matching option");

  await page.mouse.click(10, 10);
  await page.waitForSelector("[data-testid='chip-input-active-list']", { state: "detached" });
  const closedBottomRadius = await page.locator("[data-testid='chip-input-active-top']").evaluate((element) => getComputedStyle(element).borderBottomLeftRadius);
  expectEqual(closedBottomRadius, "24px", "blur restores unfocused bottom radius");
  await searchInput.focus();
  await page.waitForSelector("[data-testid='chip-input-active-list']", { state: "visible" });

  fs.mkdirSync(path.dirname(screenshotPath), { recursive: true });
  await page.locator("body").screenshot({ path: screenshotPath });
  console.log(JSON.stringify({ initialMetrics, focusedMetrics }, null, 2));
  console.log(`Saved screenshot: ${screenshotPath}`);
} finally {
  await browser.close();
}