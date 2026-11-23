import type { OnboardingDto } from "@/lib/api/gen/data-contracts";

import type { ProfileCompletionState } from "./profile-completion-types";
import { normalizeAmount } from "./onboarding-validation";

function parseNumber(value: string, fallback = 0): number {
  const parsed = Number(normalizeAmount(value).replace(",", "."));
  return Number.isFinite(parsed) ? parsed : fallback;
}

export function buildOnboardingDto(state: ProfileCompletionState): OnboardingDto {
  if (!state.nickname.trim()) {
    throw new Error("Введите никнейм");
  }

  if (!state.companyId || !state.countryId || !state.professionId || !state.seniorityLevel || !state.workFormat) {
    throw new Error("Заполните обязательные шаги профиля");
  }

  return {
    nickname: state.nickname.trim(),
    companyId: state.companyId,
    countryId: state.countryId,
    cityId: state.cityId || undefined,
    workFormat: state.workFormat,
    professionId: state.professionId,
    seniorityLevel: state.seniorityLevel,
    // TODO: Send companyGrade after the backend supports strings and the API client is regenerated.
    // Until then, keep the user's text in flow state and review only.
    workExperienceYears: parseNumber(state.workExperienceYears),
    salary: parseNumber(state.salary),
    bonus: state.hasBonus && state.bonus ? parseNumber(state.bonus) : undefined,
    currency: state.currency,
  };
}
