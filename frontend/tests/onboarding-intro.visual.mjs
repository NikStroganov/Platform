import { chromium } from "playwright";
import { spawn } from "node:child_process";
import fs from "node:fs";
import net from "node:net";
import path from "node:path";
import os from "node:os";

function getFreePort() {
  return new Promise((resolve, reject) => {
    const server = net.createServer();
    server.unref();
    server.on("error", reject);
    server.listen(0, "127.0.0.1", () => {
      const address = server.address();
      server.close(() => {
        if (address && typeof address === "object") {
          resolve(address.port);
        } else {
          reject(new Error("Could not resolve a free port for Next dev server"));
        }
      });
    });
  });
}

const providedAppUrl = process.env.APP_URL;
const port = process.env.ONBOARDING_TEST_PORT ?? String(await getFreePort());
const appUrl = providedAppUrl ?? `http://localhost:${port}`;
const onboardingUrl = `${appUrl}/onboarding`;
const screenshotPath = path.join(os.tmpdir(), "platform-onboarding-review", "intro-test-first-slide.png");

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

function expectOpacityNear(actual, expected, message) {
  expectNear(Number(actual), expected, 0.01, message);
}
async function canReachServer() {
  try {
    const response = await fetch(appUrl, { signal: AbortSignal.timeout(1000) });
    return response.status < 500;
  } catch {
    return false;
  }
}

async function waitForServer(server) {
  const startedAt = Date.now();

  while (Date.now() - startedAt < 60000) {
    if (await canReachServer()) {
      return;
    }

    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  throw new Error(`Next dev server did not become ready at ${appUrl}. Dev server output:\n${server?.output ?? "<no server output>"}`);
}

function startDevServer() {
  if (providedAppUrl) {
    return null;
  }

  const child = spawn(process.execPath, ["node_modules/next/dist/bin/next", "dev", "-p", port], {
    cwd: process.cwd(),
    stdio: ["ignore", "pipe", "pipe"],
    windowsHide: true,
  });

  child.output = "";
  child.stdout?.on("data", (chunk) => {
    child.output += chunk.toString();
  });
  child.stderr?.on("data", (chunk) => {
    child.output += chunk.toString();
  });

  return child;
}

function getIntroMetrics() {
  function sceneMetrics(nodeId) {
    const scene = document.querySelector(`[data-node-id="${nodeId}"]`);
    const fadeLayer = scene?.parentElement;
    const rect = scene?.getBoundingClientRect();

    return {
      exists: Boolean(scene),
      layerOpacity: fadeLayer ? getComputedStyle(fadeLayer).opacity : null,
      rect: rect
        ? {
            x: Math.round(rect.x),
            y: Math.round(rect.y),
            w: Math.round(rect.width),
            h: Math.round(rect.height),
          }
        : null,
    };
  }

  return {
    welcome: sceneMetrics("2031:6237"),
    anonymous: sceneMetrics("2031:5313"),
  };
}

const server = startDevServer();
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
await page.addInitScript(() => {
  window.localStorage.setItem("access_token", "playwright-access-token");
  window.localStorage.setItem("refresh_token", "playwright-refresh-token");
});

try {
  await waitForServer(server);
  const response = await page.goto(onboardingUrl, { waitUntil: "domcontentloaded" });
  if (!response || response.status() >= 400) {
    throw new Error(`Onboarding page returned ${response?.status() ?? "no response"}. Body:\n${(await page.locator("body").innerText()).slice(0, 2000)}\nDev server output:\n${server?.output ?? "<no server output>"}`);
  }
  try {
    await page.waitForSelector('[data-node-id="2031:6237"]', { state: "attached", timeout: 30000 });
  } catch (error) {
    throw new Error(`Welcome slide selector was not attached. Body:\n${(await page.locator("body").innerText()).slice(0, 2000)}\nDev server output:\n${server?.output ?? "<no server output>"}\nOriginal error:\n${error}`);
  }

  const initialMetrics = await page.evaluate(getIntroMetrics);

  expectEqual(initialMetrics.welcome.exists, true, "welcome slide scene exists");
  expectEqual(initialMetrics.anonymous.exists, true, "anonymous slide scene exists");
  expectOpacityNear(initialMetrics.welcome.layerOpacity, 1, "welcome slide is visible on first render");
  expectOpacityNear(initialMetrics.anonymous.layerOpacity, 0, "anonymous slide is hidden on first render");
  expectNear(initialMetrics.welcome.rect.w, 1440, 1, "welcome scene keeps Figma width at desktop viewport");
  expectNear(initialMetrics.welcome.rect.h, 900, 1, "welcome scene keeps Figma height at desktop viewport");

  fs.mkdirSync(path.dirname(screenshotPath), { recursive: true });
  await page.screenshot({ path: screenshotPath, fullPage: false });

  await page.waitForFunction(() => getComputedStyle(document.querySelector('[data-node-id="2031:5313"]').parentElement).opacity === "1", undefined, { timeout: 10000 });
  const afterTimerMetrics = await page.evaluate(getIntroMetrics);
  expectOpacityNear(afterTimerMetrics.welcome.layerOpacity, 0, "timer hides welcome slide");
  expectOpacityNear(afterTimerMetrics.anonymous.layerOpacity, 1, "timer reveals anonymity slide");
  expectEqual(await page.locator('[data-testid^="intro-debug-"]').count(), 0, "intro does not expose debug controls");
  await page.getByRole("button", { name: "Идем дальше", exact: true }).click();
  await page.getByPlaceholder("Введи свой никнейм").waitFor();
  expectEqual(await page.getByRole("tab", { selected: true }).getAttribute("aria-label"), "Шаг 1", "continue opens nickname step");
  console.log(JSON.stringify({ appUrl, initialMetrics, afterTimerMetrics }, null, 2));
  console.log(`Saved screenshot: ${screenshotPath}`);
} finally {
  await browser.close();

  if (server) {
    server.kill();
  }
}
