import type { ProfileCompletionState } from "./profile-completion-types";

export const maxSkills = 20;

export function nicknameError(value: string): string {
  const length = value.trim().length;
  if (!length) return "";
  if (length < 2) return "Минимум 2 символа";
  if (length > 20) return "Максимум 20 символов";
  return "";
}

export function experienceError(value: string): string {
  if (!value.trim()) return "";
  if (!/^-?\d+$/.test(value.trim())) return "Указать можно только целое число";
  if (Number(value) < 1) return "Минимум 1 год";
  if (Number(value) > 80) return "Максимум 80 лет";
  return "";
}

export function companyGradeError(value: string): string {
  if (/[^a-zа-яё0-9 \[\]".,()_:;#*«»\-]/i.test(value)) {
    return 'Название грейда может содержать только латиницу, кириллицу, числа и знаки []"-.,()_:;#*«»';
  }
  return "";
}

// Amounts may contain grouping spaces, but never decimals or other signs.
export function normalizeAmount(value: string): string {
  return value.replace(/[ \u00a0\u202f]/g, "");
}

export function amountError(value: string, kind: "salary" | "bonus", currency: ProfileCompletionState["currency"]): string {
  if (!value.trim()) return "";
  const normalized = normalizeAmount(value);
  if (!/^\d+$/.test(normalized)) return "Только целые числа, без знаков";
  const amount = Number(normalized);
  // The Figma limits are specified for rubles; do not assume an exchange rate for USD.
  if (currency === "RUB") {
    if (kind === "salary" && amount < 28_000) return "Минимум 28 000";
    if (kind === "salary" && amount > 2_000_000) return "Максимум 2 000 000";
    if (kind === "bonus" && amount > 30_000_000) return "Максимум 30 000 000";
  }
  if (!Number.isSafeInteger(amount)) return "Только целые числа, без знаков";
  return "";
}

export function onboardingFieldErrors(state: ProfileCompletionState) {
  return {
    nickname: nicknameError(state.nickname),
    workExperienceYears: experienceError(state.workExperienceYears),
    companyGrade: state.hasCompanyGrade ? companyGradeError(state.companyGrade) : "",
    salary: amountError(state.salary, "salary", state.currency),
    bonus: state.hasBonus ? amountError(state.bonus, "bonus", state.currency) : "",
  };
}
