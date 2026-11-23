import { api } from "@/lib/api/client";
import type { SearchRequest } from "@/lib/api/gen/data-contracts";

function responseData<T>(response: { success?: boolean; data?: T }): T {
  if (response.success === false || response.data === undefined) {
    throw new Error("Onboarding API returned an unsuccessful or incomplete response");
  }
  return response.data;
}

export async function getOnboardingStatus() {
  const data = responseData((await api.getOnboardingStatus()).data);
  if (typeof data.completed !== "boolean") throw new Error("Missing onboarding status");
  return data.completed;
}

export async function checkNicknameAvailability(nickname: string) {
  const data = responseData((await api.checkNicknameAvailability({ nickname: nickname.trim() })).data);
  if (typeof data.available !== "boolean") throw new Error("Missing nickname availability");
  return data.available;
}

export async function getTopProfessions() {
  return responseData((await api.getTopProfessions()).data).filter(item => item.professionId && item.name);
}

export async function getTopCompanies() {
  return responseData((await api.getTopCompanies()).data).filter(item => item.companyId && item.name);
}

export async function getTopCities() {
  return responseData((await api.getTopCities()).data).filter(item => item.cityId && item.name);
}

export async function getWorkFormats() {
  return responseData((await api.getWorkFormats()).data).filter(item => item.code && item.label);
}

export async function getSeniorityLevels() {
  return responseData((await api.getSeniorityLevels()).data).filter(item => item.code && item.label);
}

export async function getTopSkills(professionId: string) {
  return responseData((await api.getTopSkills({ professionId })).data).filter(item => item.skillId && item.name);
}

export async function searchCatalog(request: SearchRequest) {
  // Spring binds @ModelAttribute from flat parameters. The generated client's
  // nested `request` argument would otherwise become request[type], etc.
  const query = { ...request, query: request.query.slice(0, 100), page: request.page ?? 0, size: request.size ?? 50 };
  const response = await api.search({ request: query }, {
    paramsSerializer: {
      serialize: () => new URLSearchParams({
        type: query.type, query: query.query, page: String(query.page), size: String(query.size),
      }).toString(),
    },
  });
  return (responseData(response.data).items ?? []).filter(item => item.id && item.name);
}
