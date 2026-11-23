import { chromium } from "playwright";
import { spawn } from "node:child_process";
import assert from "node:assert/strict";
import net from "node:net";
import { mockOnboardingApi, catalogId } from "./helpers/onboarding-api-fixture.mjs";

const port = await new Promise(resolve => {
  const server = net.createServer();
  server.listen(0, "127.0.0.1", () => { const port = server.address().port; server.close(() => resolve(port)); });
});
const appUrl = process.env.APP_URL ?? `http://localhost:${port}`;
const server = process.env.APP_URL ? null : spawn(process.execPath, ["node_modules/next/dist/bin/next", "dev", "-p", String(port)], {
  cwd: process.cwd(), stdio: "ignore", windowsHide: true,
});
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, reducedMotion: "reduce" });
page.setDefaultTimeout(10000);
const runtimeErrors = [];
page.on("pageerror", error => runtimeErrors.push(error.message));
await page.addInitScript(() => localStorage.setItem("access_token", "playwright-access-token"));
const fixture = await mockOnboardingApi(page);
let releaseCatalogs;
const catalogsReady = new Promise(resolve => { releaseCatalogs = resolve; });
await page.route("**/api/v1/catalog/companies/top", async route => {
  await catalogsReady;
  await route.fallback();
});

try {
  const deadline = Date.now() + 60000;
  while (true) {
    try { if ((await fetch(appUrl)).status < 500) break; } catch { /* server starting */ }
    if (Date.now() > deadline) throw new Error("Next dev server did not start");
    await new Promise(resolve => setTimeout(resolve, 300));
  }
  fixture.failStatus = true;
  await page.goto(`${appUrl}/onboarding`);
  await page.getByText("Не удалось проверить статус профиля. Попробуйте ещё раз.").waitFor();
  await page.getByRole("button", { name: "Повторить", exact: true }).click();
  const nickname = page.getByPlaceholder("Введи свой никнейм");
  await nickname.waitFor();
  assert.equal(await page.getByText("Загружаем профиль", { exact: true }).count(), 0, "Onboarding renders while catalogs are still pending");
  releaseCatalogs();
  const next = page.getByRole("button", { name: "Далее", exact: true });
  const countryCalls = () => fixture.calls.filter(call => call.path.endsWith("search_result") && call.query.type === "COUNTRY");
  assert.equal(countryCalls().length, 0, "Countries are not requested on onboarding entry");
  await nickname.fill("Skannek");
  const nicknameCalls = () => fixture.calls.filter(call => call.path.endsWith("nickname/availability"));
  assert.equal(nicknameCalls().length, 0, "Typing does not check nickname availability");
  await nickname.blur();
  await page.getByText("Никнейм уже занят", { exact: true }).waitFor();
  fixture.failNickname = true;
  await nickname.fill(" Available ");
  await nickname.blur();
  await page.getByText("Не удалось проверить никнейм. Попробуйте ещё раз.").waitFor();
  assert(!(await next.isDisabled()), "Failed availability check releases loading state");
  await nickname.focus();
  await nickname.blur();
  await page.waitForResponse(response => response.url().includes("nickname/availability") && response.status() === 200);
  const checkedNicknameCalls = nicknameCalls().length;
  await next.click();
  await page.getByRole("button", { name: /Компания API$/ }).waitFor();
  assert.equal(nicknameCalls().length, checkedNicknameCalls, "Next reuses successful blur validation");
  const steps = page.getByRole("tab");
  await steps.nth(0).click();
  await nickname.fill("");
  await steps.nth(1).click();
  await page.getByText("Заполните текущий шаг, чтобы продолжить", { exact: true }).waitFor();
  assert.equal(await steps.nth(0).getAttribute("aria-selected"), "true", "Stepper blocks leaving an empty nickname");
  await nickname.fill("Skannek");
  await steps.nth(1).click();
  await page.getByText("Никнейм уже занят", { exact: true }).waitFor();
  assert.equal(await steps.nth(0).getAttribute("aria-selected"), "true", "Stepper checks nickname availability");
  await nickname.fill(" Available ");
  await steps.nth(1).click();
  await page.getByRole("button", { name: /Компания API$/ }).waitFor();
  await page.getByPlaceholder("Название компании").fill("Новая");
  await page.getByRole("button", { name: /Новая компания$/ }).click();
  await next.click();
  await page.getByPlaceholder("Название страны").fill("Каз");
  await page.getByRole("option", { name: "Казахстан", exact: true }).click();
  assert(countryCalls().some(call => call.query.query === "Каз"), "Countries load from user input");
  assert(countryCalls().every(call => call.query.query.trim()), "Country search never sends an empty query");
  await next.click();
  const firstTopRequest = page.waitForRequest(request => request.url().includes("skills/top") && request.url().includes(catalogId(2)));
  await page.getByRole("button", { name: "Frontend API", exact: true }).click();
  await firstTopRequest;
  await page.getByPlaceholder("Название профессии").fill("");
  await page.getByRole("heading").click();
  await page.getByRole("button", { name: "Backend API", exact: true }).click();
  await next.click();
  const experience = page.locator("#work-experience");
  for (const [value, error] of [
    ["0", "Минимум 1 год"],
    ["51", "Максимум 50 лет"],
    ["0.5", "Указать можно только целое число"],
  ]) {
    await experience.fill(value);
    await page.getByText(error, { exact: true }).waitFor();
    assert(await next.isDisabled(), `Invalid experience ${value} blocks continuation`);
  }
  for (const value of ["1", "50", "5"]) {
    await experience.fill(value);
    assert(!(await next.isDisabled()), `Backend-valid experience ${value} is accepted`);
  }
  await page.getByRole("switch").check();
  await page.locator("#company-grade").fill("IC5");
  await next.click();
  const salary = page.locator("#salary");
  await salary.fill("28 000");
  await page.getByRole("switch", { name: "Указать премию" }).check();
  const bonus = page.locator("#bonus");
  await bonus.fill("0");
  for (const currency of ["Рубли", "Доллары"]) {
    await page.getByRole("button", { name: currency, exact: true }).click();
    for (const field of [salary, bonus]) {
      for (const [value, error] of [
        ["-1", "Только целые числа, без знаков"],
        ["2 000 001", "Максимум 2 000 000"],
        ["0.1", "Только целые числа, без знаков"],
      ]) {
        await field.fill(value);
        await page.getByText(error, { exact: true }).waitFor();
        assert(await next.isDisabled(), `Invalid amount ${value} in ${currency} blocks continuation`);
      }
      const minimum = field === salary && currency === "Рубли" ? "28 000" : "0";
      for (const value of ["2 000 000", minimum]) {
        await field.fill(value);
        assert(!(await next.isDisabled()), `Backend-valid amount ${value} in ${currency} is accepted`);
      }
    }
  }
  await page.getByRole("button", { name: "Рубли", exact: true }).click();
  await salary.fill("27 999");
  await page.getByText("Минимум 28 000", { exact: true }).waitFor();
  assert(await next.isDisabled(), "The existing ruble salary minimum is preserved");
  await salary.fill("28 000");
  await bonus.fill("2 000 000");
  await next.click();
  const search = page.getByPlaceholder("Введите навык");
  const unknownSkillResponse = page.waitForResponse(response => response.url().includes("search_result") && new URL(response.url()).searchParams.get("query") === "Несуществующий навык");
  await search.fill("Несуществующий навык");
  await search.press("Enter");
  assert.equal(await page.getByTestId("skills-count").innerText(), "0/20", "Enter cannot add arbitrary text before search completes");
  await unknownSkillResponse;
  await page.getByText("Ничего не найдено", { exact: true }).waitFor();
  await search.press("Enter");
  assert.equal(await search.inputValue(), "Несуществующий навык", "Unmatched draft stays available for editing");
  assert.equal(await page.getByTestId("skills-count").innerText(), "0/20", "Enter cannot add an unknown skill");
  assert(await next.isDisabled(), "Unknown text does not satisfy the required skills step");
  await search.fill("");
  await page.getByRole("heading", { name: "Выбери свои навыки?", exact: true }).click();
  await page.getByRole("button", { name: "Backend Skill", exact: true }).click();
  assert.equal(await page.getByTestId("skills-count").innerText(), "1/20", "Catalog suggestions remain selectable");
  await search.fill("Новый");
  await page.getByRole("option", { name: "Новый навык API", exact: true }).click();
  assert.equal(await page.getByTestId("skills-count").innerText(), "2/20");
  await page.getByRole("button", { name: "Удалить Новый навык API", exact: true }).click();
  await search.fill("Новый навык API");
  await page.getByRole("option", { name: "Новый навык API", exact: true }).waitFor();
  await search.press("Enter");
  assert.equal(await page.getByTestId("skills-count").innerText(), "2/20", "Enter adds a matching catalog skill by ID");
  await search.fill("Новый навык API");
  await search.press("Enter");
  assert.equal(await page.getByTestId("skills-count").innerText(), "2/20", "Enter cannot duplicate a catalog skill");
  await page.waitForTimeout(750);
  assert.equal(await page.getByText("Frontend Skill", { exact: true }).count(), 0, "Stale top-skills response is ignored");
  await next.click();
  await page.getByText("Backend Skill", { exact: true }).waitFor();
  await page.getByText("Новый навык API", { exact: true }).waitFor();
  await page.getByTestId("review-profile-card").getByText(/IC5/).waitFor();
  await steps.nth(4).click();
  assert.equal(await page.locator("#company-grade").inputValue(), "IC5", "Text company grade survives navigation");
  await steps.nth(7).click();
  await steps.nth(1).click();
  await page.getByPlaceholder("Название компании").fill("");
  await steps.nth(0).click();
  await nickname.waitFor();
  await steps.nth(7).click();
  await page.getByText("Заполните текущий шаг, чтобы продолжить", { exact: true }).waitFor();
  assert.equal(await steps.nth(0).getAttribute("aria-selected"), "true", "Stepper cannot skip an invalid intermediate step");
  await steps.nth(1).click();
  await page.getByPlaceholder("Название компании").fill("Новая");
  await page.getByRole("button", { name: /Новая компания$/ }).click();
  await steps.nth(7).click();
  await page.getByText("Новый навык API", { exact: true }).waitFor();
  let failedSubmission;
  await page.route("**/api/v1/onboarding", async route => {
    failedSubmission = route.request().postDataJSON();
    await route.fulfill({ status: 503, json: { success: false } });
  }, { times: 1 });
  const save = page.getByRole("button", { name: "А теперь к графикам!", exact: true });
  await save.click();
  await page.getByText("Не удалось сохранить профиль. Попробуйте еще раз.", { exact: true }).waitFor();
  assert.equal(Object.hasOwn(failedSubmission, "companyGrade"), false, "Text grade is omitted even on failed submission");
  assert.deepEqual(failedSubmission.skillIds, [catalogId(7), catalogId(10)], "Save attempts include selected catalog skill IDs");
  await page.getByTestId("review-profile-card").getByText(/IC5/).waitFor();
  await steps.nth(4).click();
  assert.equal(await page.locator("#company-grade").inputValue(), "IC5", "Text company grade survives save failure");
  await steps.nth(7).click();
  await save.click();
  await page.waitForURL(`${appUrl}/`);
  assert.equal(fixture.saved.nickname, "Available");
  assert.equal(fixture.saved.companyId, catalogId(9));
  assert.equal(fixture.saved.professionId, catalogId(3));
  assert.equal(fixture.saved.countryId, catalogId(8));
  assert.equal(fixture.saved.workExperienceYears, 5);
  assert.equal(fixture.saved.salary, 28000);
  assert.equal(fixture.saved.bonus, 2000000);
  assert.equal(fixture.saved.currency, "RUB");
  assert.deepEqual(fixture.saved.skillIds, [catalogId(7), catalogId(10)], "Final POST preserves selected skill IDs after retry");
  assert.equal(Object.hasOwn(fixture.saved, "companyGrade"), false, "Company grade is absent from the saved DTO");
  const searchCalls = fixture.calls.filter(call => call.path.endsWith("search_result"));
  assert(searchCalls.some(call => call.query.type === "SKILL" && call.query.query === "Новый"));
  assert(searchCalls.every(call => call.query.type && !call.query["request[type]"]));
  assert(fixture.calls.every(call => call.authorization === "Bearer playwright-access-token"));
  await page.goto(`${appUrl}/onboarding`);
  await page.waitForURL(`${appUrl}/`);
  fixture.completed = false;
  await page.reload();
  await page.waitForURL(`${appUrl}/onboarding`);
  await nickname.waitFor();
  assert.deepEqual(runtimeErrors, []);
  console.log("PASS: status routing/retry, real catalog IDs, nickname availability/retry, profession skills/stale responses, remote skill/company search, DTO save.");
} catch (error) {
  console.error("Rendered page:", await page.locator("body").innerText());
  console.error("API calls:", fixture.calls);
  throw error;
} finally {
  await browser.close();
  server?.kill();
}
