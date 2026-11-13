import type { OnboardingDto } from "@/lib/api/gen/data-contracts";

export type WorkFormat = OnboardingDto["workFormat"];
export type SeniorityLevel = OnboardingDto["seniorityLevel"];
export type CurrencyCode = OnboardingDto["currency"];

export type SelectedDisplay = {
  label: string;
  colorHex?: string;
  logoUrl?: string;
};

export type ProfileCompletionState = {
  nickname: string;
  companyId: string;
  countryId: string;
  cityId: string;
  workFormat: WorkFormat | "";
  professionId: string;
  seniorityLevel: SeniorityLevel | "";
  hasCompanyGrade: boolean;
  companyGrade: string;
  workExperienceYears: string;
  salary: string;
  hasBonus: boolean;
  bonus: string;
  currency: CurrencyCode;
  skills: string[];
  display: {
    company?: SelectedDisplay;
    country?: SelectedDisplay;
    city?: SelectedDisplay;
    profession?: SelectedDisplay;
    workFormat?: SelectedDisplay;
    seniorityLevel?: SelectedDisplay;
  };
};

export type ProfileCompletionStepId =
  | "intro"
  | "nickname"
  | "company"
  | "location"
  | "profession"
  | "seniority"
  | "compensation"
  | "skills"
  | "review";

export type ProfileCompletionStep = {
  id: ProfileCompletionStepId;
  title: string;
  description?: string;
  primaryLabel?: string;
  progressVisible?: boolean;
  canContinue: (state: ProfileCompletionState) => boolean;
};

export const initialProfileCompletionState: ProfileCompletionState = {
  nickname: "",
  companyId: "",
  countryId: "",
  cityId: "",
  workFormat: "OFFICE",
  professionId: "",
  seniorityLevel: "",
  hasCompanyGrade: false,
  companyGrade: "",
  workExperienceYears: "",
  salary: "",
  hasBonus: false,
  bonus: "",
  currency: "RUB",
  skills: [],
  display: {},
};

export const profileCompletionSteps: ProfileCompletionStep[] = [
  {
    id: "intro",
    title: "Мы хотим показать реальные данные",
    description: "Ответьте на несколько вопросов о работе. Данные сохраняются анонимно.",
    primaryLabel: "Начать",
    progressVisible: false,
    canContinue: () => true,
  },
  {
    id: "nickname",
    title: "Добро пожаловать на CareIT",
    description: "Мы используем никнеймы, чтобы данные были полностью анонимными.",
    canContinue: (state) => state.nickname.trim().length >= 2,
  },
  {
    id: "company",
    title: "Актуальная компания",
    description: "Нужна для аналитики рынка, не для раскрытия вашей личности.",
    canContinue: (state) => Boolean(state.companyId),
  },
  {
    id: "location",
    title: "Город и формат работы",
    description: "Так сравнения зарплат и условий становятся точнее.",
    canContinue: (state) => {
      const isRussia = state.countryId === "20000000-0000-4000-8000-000000000001" || state.display.country?.label === "Россия";

      return Boolean(state.countryId && state.workFormat && (!isRussia || state.cityId));
    },
  },
  {
    id: "profession",
    title: "Профессия",
    description: "Выберите специализацию, в которой работаете сейчас.",
    canContinue: (state) => Boolean(state.professionId),
  },
  {
    id: "seniority",
    title: "Уровень в профессии и период работы",
    description: "Подберите ближайший грейд и укажите общий опыт.",
    canContinue: (state) => Boolean(state.seniorityLevel && state.workExperienceYears.trim()) && Number(state.workExperienceYears) >= 0,
  },
  {
    id: "compensation",
    title: "Зарплата",
    description: "Укажите регулярный доход и бонус, если он есть.",
    canContinue: (state) => Boolean(state.salary.trim()) && Number(state.salary) >= 0 && (!state.hasBonus || (Boolean(state.bonus.trim()) && Number(state.bonus) >= 0)),
  },
  {
    id: "skills",
    title: "Навыки",
    description: "Добавьте ключевые навыки, чтобы профиль был точнее.",
    canContinue: (state) => state.skills.length > 0 && state.skills.length <= 20,
  },
  {
    id: "review",
    title: "Это все, честно! Осталось только свериться",
    primaryLabel: "Сохранить",
    canContinue: (state) => profileCompletionSteps.every((step) => step.id === "review" || step.canContinue(state)),
  },
];
