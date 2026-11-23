export const catalogId = number => `00000000-0000-4000-8000-${String(number).padStart(12, "0")}`;

export async function mockOnboardingApi(page) {
  const state = { completed: false, failStatus: false, failCatalogs: false, failNickname: false, calls: [], saved: null };
  await page.route("**/api/v1/**", async route => {
    const request = route.request();
    const url = new URL(request.url());
    state.calls.push({ path: url.pathname, query: Object.fromEntries(url.searchParams), authorization: request.headers().authorization });
    const reply = data => route.fulfill({ json: { success: true, data } });
    const fail = () => route.fulfill({ status: 503, json: { success: false } });
    switch (url.pathname) {
      case "/api/v1/onboarding/status":
        if (state.failStatus) { state.failStatus = false; return fail(); }
        return reply({ completed: state.completed });
      case "/api/v1/onboarding/nickname/availability":
        if (state.failNickname) { state.failNickname = false; return fail(); }
        return reply({ nickname: url.searchParams.get("nickname"), available: url.searchParams.get("nickname") !== "Skannek" });
      case "/api/v1/catalog/companies/top":
        if (state.failCatalogs) return fail();
        return reply([{ companyId: catalogId(1), name: "Компания API" }]);
      case "/api/v1/catalog/professions/top":
        return reply([{ professionId: catalogId(2), name: "Frontend API" }, { professionId: catalogId(3), name: "Backend API" }]);
      case "/api/v1/catalog/cities/top":
        return reply([{ cityId: catalogId(4), name: "Москва" }]);
      case "/api/v1/catalog/options/work-formats":
        return reply([{ code: "OFFICE", label: "Офис" }, { code: "REMOTE", label: "Удаленно" }]);
      case "/api/v1/catalog/options/seniority-levels":
        return reply([{ code: "INTERN", label: "Стажер" }, { code: "JUNIOR", label: "Джун" }]);
      case "/api/v1/catalog/skills/top":
        if (url.searchParams.get("professionId") === catalogId(2)) {
          await new Promise(resolve => setTimeout(resolve, 700));
          return reply([{ skillId: catalogId(6), name: "Frontend Skill" }]);
        }
        return reply([{ skillId: catalogId(7), name: "Backend Skill" }]);
      case "/api/v1/search_result": {
        const type = url.searchParams.get("type");
        const items = type === "COUNTRY" ? [{ id: catalogId(8), name: "Казахстан", type }]
          : type === "COMPANY" ? [{ id: catalogId(9), name: "Новая компания", type }]
          : type === "SKILL" ? [{ id: catalogId(10), name: "Новый навык API", type }]
          : [];
        return reply({ items, type, query: url.searchParams.get("query"), hasNext: false });
      }
      case "/api/v1/onboarding":
        state.saved = request.postDataJSON();
        state.completed = true;
        return reply(null);
      case "/api/v1/userProfile/loginZoneRest":
        return reply({});
      default: throw new Error(`Unexpected API request: ${request.method()} ${url}`);
    }
  });
  return state;
}
