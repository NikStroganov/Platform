import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";

const storybookUrl = process.env.STORYBOOK_URL ?? "http://127.0.0.1:6007";
const storyUrl = `${storybookUrl}/iframe.html?id=ui-designsystemcomponents--field-input-story&viewMode=story`;
const screenshotPath = path.join(process.cwd(), "test-results", "field-input-story.png");

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
const page = await browser.newPage({ viewport: { width: 900, height: 500 }, deviceScaleFactor: 1 });

try {
  await page.goto(storyUrl, { waitUntil: "domcontentloaded" });
  await page.waitForSelector('input[placeholder="Зарплата"]', { timeout: 30000 });
  await page.waitForSelector('input[placeholder="Например, 5"]', { timeout: 30000 });

  const metrics = await page.evaluate(() => {
    function rect(el) {
      const r = el.getBoundingClientRect();
      return {
        x: Math.round(r.x),
        y: Math.round(r.y),
        w: Math.round(r.width),
        h: Math.round(r.height),
      };
    }

    function getField(placeholder) {
      const input = document.querySelector(`input[placeholder="${placeholder}"]`);
      const root = input.closest(".MuiOutlinedInput-root");
      const image = root.querySelector("img, svg");
      const divider = [...root.querySelectorAll("div")].find((element) => {
        const r = element.getBoundingClientRect();
        const styles = getComputedStyle(element);
        return Math.round(r.width) === 1 && Math.round(r.height) === 16 && styles.backgroundColor === "rgb(230, 230, 230)";
      });
      const endAdornment = root.querySelector(".MuiInputAdornment-positionEnd");
      const styles = getComputedStyle(root);
      const inputStyles = getComputedStyle(input);

      return {
        root: rect(root),
        input: rect(input),
        image: image ? rect(image) : null,
        divider: divider ? rect(divider) : null,
        endAdornment: endAdornment ? rect(endAdornment) : null,
        rootStyles: {
          background: styles.backgroundColor,
          borderRadius: styles.borderRadius,
          gap: styles.gap,
          paddingLeft: styles.paddingLeft,
          paddingRight: styles.paddingRight,
        },
        inputStyles: {
          fontSize: inputStyles.fontSize,
          fontWeight: inputStyles.fontWeight,
          lineHeight: inputStyles.lineHeight,
        },
      };
    }

    return {
      salary: getField("Зарплата"),
      years: getField("Например, 5"),
    };
  });

  fs.mkdirSync(path.dirname(screenshotPath), { recursive: true });
  await page.locator("body").screenshot({ path: screenshotPath });

  expectEqual(metrics.salary.root.w, 800, "salary width matches Figma");
  expectEqual(metrics.salary.root.h, 64, "salary height matches Figma");
  expectEqual(metrics.salary.rootStyles.background, "rgb(255, 255, 255)", "salary background matches Figma");
  expectEqual(metrics.salary.rootStyles.borderRadius, "64px", "salary radius matches Figma");
  expectEqual(metrics.salary.rootStyles.gap, "24px", "salary content gap matches Figma");
  expectEqual(metrics.salary.rootStyles.paddingLeft, "24px", "salary left padding matches Figma");
  expectEqual(metrics.salary.rootStyles.paddingRight, "24px", "salary right padding matches Figma");
  expectEqual(metrics.salary.image?.w, 32, "salary prefix image width matches Figma");
  expectEqual(metrics.salary.image?.h, 32, "salary prefix image height matches Figma");
  expectEqual(metrics.salary.divider?.w, 1, "salary divider width matches Figma");
  expectEqual(metrics.salary.divider?.h, 16, "salary divider height matches Figma");
  expectNear(metrics.salary.divider.y + metrics.salary.divider.h / 2, metrics.salary.root.y + metrics.salary.root.h / 2, 1, "salary divider is vertically centered");
  expectEqual(metrics.salary.inputStyles.fontSize, "20px", "salary input font size matches Figma");
  expectEqual(metrics.salary.inputStyles.fontWeight, "500", "salary input weight matches Figma");
  expectEqual(metrics.salary.inputStyles.lineHeight, "28px", "salary input line-height matches Figma");

  expectEqual(metrics.years.root.w, 800, "years width matches Figma");
  expectEqual(metrics.years.root.h, 64, "years height matches Figma");
  expectEqual(metrics.years.rootStyles.gap, "16px", "years content gap matches Figma");
  expectEqual(metrics.years.rootStyles.paddingLeft, "24px", "years left padding matches Figma");
  expectEqual(metrics.years.rootStyles.paddingRight, "24px", "years right padding matches Figma");
  expectEqual(metrics.years.divider, null, "years field does not render divider");
  expectEqual(metrics.years.inputStyles.fontSize, "20px", "years input font size matches Figma");
  expectEqual(metrics.years.inputStyles.fontWeight, "500", "years input weight matches Figma");
  expectEqual(metrics.years.inputStyles.lineHeight, "28px", "years input line-height matches Figma");

  console.log(JSON.stringify(metrics, null, 2));
  console.log(`Saved screenshot: ${screenshotPath}`);
} finally {
  await browser.close();
}
