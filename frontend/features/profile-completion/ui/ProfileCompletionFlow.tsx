"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

import type { ChipInputOption } from "@/components/shared/chip-input";
import type { CityButtonItem } from "@/components/shared/city-buttons";
import type { CompanyButtonItem } from "@/components/shared/company-buttons";
import type { SearchInputOption } from "@/components/shared/search-input";
import type { SpecialityButtonItem } from "@/components/shared/speciality-buttons";
import type { SwitchButtonsOption } from "@/components/shared/switch-buttons";
import { api } from "@/lib/api/client";

import {
  checkNicknameAvailability,
  getSeniorityLevels,
  getTopCities,
  getTopCompanies,
  getTopProfessions,
  getWorkFormats,
  getTopSkills,
  searchCatalog,
} from "../api/profile-completion-api";
import { buildOnboardingDto } from "../model/build-onboarding-dto";
import { onboardingFieldErrors } from "../model/onboarding-validation";
import {
  initialProfileCompletionState,
  profileCompletionSteps,
  type ProfileCompletionState,
  type SelectedDisplay,
} from "../model/profile-completion-types";
import { CompanyStep } from "./CompanyStep";
import { CompensationStep } from "./CompensationStep";
import { IntroFadeStep } from "./IntroFadeStep";
import { LocationStep } from "./LocationStep";
import { NicknameStep } from "./NicknameStep";
import { ProfessionStep } from "./ProfessionStep";
import { SeniorityStep } from "./SeniorityStep";
import { SkillsStep } from "./SkillsStep";
import { ReviewStep } from "./ReviewStep";

const visibleSteps = profileCompletionSteps.filter((step) => step.progressVisible !== false);

function makeDisplay(label: string, colorHex?: string, logoUrl?: string): SelectedDisplay {
  return { label, colorHex, logoUrl };
}

function findLabel(options: { value: string; label: string }[], value: string) {
  return options.find((option) => option.value === value)?.label ?? value;
}

function mergeSkills(previous: ChipInputOption[], next: ChipInputOption[]) {
  return [...new Map([...previous, ...next].map(option => [option.value, option])).values()];
}

function getProfessionAccent(name?: string) {
  const accents: Record<string, string> = {
    "\u041c\u043e\u0431\u0438\u043b\u044c\u043d\u044b\u0439 \u0440\u0430\u0437\u0440\u0430\u0431\u043e\u0442\u0447\u0438\u043a": "#1ca2d3",
    "Fullstack-\u0440\u0430\u0437\u0440\u0430\u0431\u043e\u0442\u0447\u0438\u043a": "#1ca2d3",
    "Frontend-\u0440\u0430\u0437\u0440\u0430\u0431\u043e\u0442\u0447\u0438\u043a": "#1ca2d3",
    "Backend-\u0440\u0430\u0437\u0440\u0430\u0431\u043e\u0442\u0447\u0438\u043a": "#1ca2d3",
    "\u0421\u0438\u0441\u0442\u0435\u043c\u043d\u044b\u0439 \u0430\u0434\u043c\u0438\u043d\u0438\u0441\u0442\u0440\u0430\u0442\u043e\u0440": "#d4561e",
    "\u0413\u0440\u0430\u0444\u0438\u0447\u0435\u0441\u043a\u0438\u0439 \u0434\u0438\u0437\u0430\u0439\u043d\u0435\u0440": "#b48302",
    "UX/UI \u0414\u0438\u0437\u0430\u0439\u043d\u0435\u0440": "#b48302",
    "QA-\u0438\u043d\u0436\u0435\u043d\u0435\u0440 (\u0442\u0435\u0441\u0442\u0438\u0440\u043e\u0432\u0449\u0438\u043a)": "#239e09",
    "DevOps-\u0438\u043d\u0436\u0435\u043d\u0435\u0440": "#239e09",
  };

  return accents[name ?? ""] ?? "#1ca2d3";
}

function getCityAccent(name?: string) {
  const accents: Record<string, string> = {
    "\u041c\u043e\u0441\u043a\u0432\u0430": "#e25050",
    "\u0421\u0430\u043d\u043a\u0442-\u041f\u0435\u0442\u0435\u0440\u0431\u0443\u0440\u0433": "#4489dd",
    "\u041a\u0430\u0437\u0430\u043d\u044c": "#b48302",
    "\u041d\u0438\u0436\u043d\u0438\u0439 \u041d\u043e\u0432\u0433\u043e\u0440\u043e\u0434": "#239e09",
  };

  return accents[name ?? ""] ?? "#4489dd";
}

const companyPalette: Record<string, { colorHex: string; backgroundHex: string; borderHex: string }> = {
  "Вконтакте": { colorHex: "#1ca2d3", backgroundHex: "#1ca2d326", borderHex: "#1ca2d333" },
  "Сбербанк": { colorHex: "#239e09", backgroundHex: "#37d31c26", borderHex: "#1cd32233" },
  "Дзен": { colorHex: "#757575", backgroundHex: "#eaeaea", borderHex: "#b4b4b433" },
  OZON: { colorHex: "#4489dd", backgroundHex: "#1c6ed326", borderHex: "#1c6ed333" },
  WildBerries: { colorHex: "#d546dc", backgroundHex: "#d31cc726", borderHex: "#c11cd333" },
  "Самокат": { colorHex: "#e25050", backgroundHex: "#b4020226", borderHex: "#b4020233" },
};

export function ProfileCompletionFlow() {
  const router = useRouter();
  const [state, setState] = React.useState<ProfileCompletionState>(initialProfileCompletionState);
  const [currentStep, setCurrentStep] = React.useState(0);
  const [maxStep, setMaxStep] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const [actionError, setError] = React.useState("");
  const nicknameCheck = React.useRef<{ nickname: string; promise: Promise<boolean> } | null>(null);
  const [professionItems, setProfessionItems] = React.useState<SpecialityButtonItem[]>([]);
  const [companyItems, setCompanyItems] = React.useState<CompanyButtonItem[]>([]);
  const [cityItems, setCityItems] = React.useState<CityButtonItem[]>([]);
  const [workFormatOptions, setWorkFormatOptions] = React.useState<SwitchButtonsOption[]>([]);
  const [seniorityOptions, setSeniorityOptions] = React.useState<SwitchButtonsOption[]>([]);
  const [skillOptions, setSkillOptions] = React.useState<ChipInputOption[]>([]);
  const [suggestedSkills, setSuggestedSkills] = React.useState<ChipInputOption[]>([]);
  const [skillSearch, setSkillSearch] = React.useState<ChipInputOption[]>([]);
  const [skillsQuery, setSkillsQuery] = React.useState("");
  const [catalogsError, setCatalogsError] = React.useState("");
  const [skillsError, setSkillsError] = React.useState("");
  const [skillsAttempt, setSkillsAttempt] = React.useState(0);
  const searchVersion = React.useRef<Record<string, number>>({});
  const [professionSearch, setProfessionSearch] = React.useState<SearchInputOption[]>([]);
  const [professionQuery, setProfessionQuery] = React.useState("");
  const [companySearch, setCompanySearch] = React.useState<SearchInputOption[]>([]);
  const [companyQuery, setCompanyQuery] = React.useState("");
  const [countrySearch, setCountrySearch] = React.useState<SearchInputOption[]>([]);
  const [countryQuery, setCountryQuery] = React.useState("");
  const [citySearch, setCitySearch] = React.useState<SearchInputOption[]>([]);
  const [cityQuery, setCityQuery] = React.useState("");

  const step = profileCompletionSteps[currentStep];
  const visibleStepIndex = visibleSteps.findIndex((item) => item.id === step.id);
  const canContinue = step.canContinue(state);
  const fieldErrors = onboardingFieldErrors(state);
  const error = actionError || catalogsError;

  React.useEffect(() => {
    let active = true;

    async function loadCatalogs() {
      try {
        const [professions, companies, cities, formats, seniority] = await Promise.all([
          getTopProfessions(),
          getTopCompanies(),
          getTopCities(),
          getWorkFormats(),
          getSeniorityLevels(),
        ]);

        if (!active) {
          return;
        }

        setProfessionItems(
          professions.map((item) => ({ value: item.professionId ?? "", label: item.name ?? "Профессия", colorHex: getProfessionAccent(item.name), backgroundHex: getProfessionAccent(item.name) === "#1ca2d3" ? undefined : item.backgroundColor })),
        );
        setCompanyItems(
          companies.map((item) => ({
            value: item.companyId ?? "",
            label: item.name ?? "Компания",
            logoUrl: item.logoKey,
            ...(companyPalette[item.name ?? ""] ?? { colorHex: "#3d82ff", backgroundHex: item.backgroundColor }),
          })),
        );
        setCityItems(cities.map((item) => ({ value: item.cityId ?? "", label: item.name ?? "Город", colorHex: getCityAccent(item.name), backgroundHex: item.backgroundColor })));
        setWorkFormatOptions(formats.map((item) => ({ value: item.code ?? "", label: item.label ?? item.code ?? "" })));
        setSeniorityOptions(seniority.map((item) => ({ value: item.code ?? "", label: item.label ?? item.code ?? "" })));
        const defaultSeniority = seniority[1] ?? seniority[0];
        if (defaultSeniority?.code) {
          setState((current) => current.seniorityLevel ? current : {
            ...current,
            seniorityLevel: defaultSeniority.code as ProfileCompletionState["seniorityLevel"],
            display: { ...current.display, seniorityLevel: makeDisplay(defaultSeniority.label ?? defaultSeniority.code ?? "") },
          });
        }
      } catch {
        if (active) setCatalogsError("Не удалось загрузить справочники. Попробуйте ещё раз.");
      }
    }

    void loadCatalogs();

    return () => {
      active = false;
    };
  }, []);

  React.useEffect(() => {
    if (!state.professionId) return;
    let active = true;
    getTopSkills(state.professionId).then(skills => {
      if (!active) return;
      const options = skills.map(item => ({ value: item.skillId!, label: item.name! }));
      setSuggestedSkills(options);
      setSkillOptions(current => mergeSkills(current, options));
      setSkillsError("");
    }).catch(() => {
      if (active) setSkillsError("Не удалось загрузить популярные навыки. Попробуйте ещё раз.");
    });
    return () => { active = false; };
  }, [state.professionId, skillsAttempt]);

  React.useEffect(() => {
    if (!skillsQuery.trim()) return;
    let active = true;
    const timer = window.setTimeout(() => {
      searchCatalog({ type: "SKILL", query: skillsQuery, size: 50 }).then(skills => {
        if (!active) return;
        const options = skills.map(item => ({ value: item.id!, label: item.name! }));
        setSkillSearch(options);
        setSkillOptions(current => mergeSkills(current, options));
        setSkillsError("");
      }).catch(() => {
        if (active) setSkillsError("Не удалось найти навыки. Попробуйте ещё раз.");
      });
    }, 250);
    return () => { active = false; window.clearTimeout(timer); };
  }, [skillsQuery, skillsAttempt]);

  function updateState(patch: Partial<ProfileCompletionState>) {
    setError("");
    if (patch.nickname !== undefined && patch.nickname.trim() !== state.nickname.trim()) {
      nicknameCheck.current = null;
    }
    if (patch.professionId !== undefined && patch.professionId !== state.professionId) {
      setSuggestedSkills([]);
      setSkillSearch([]);
      setSkillsQuery("");
      setSkillsError("");
    }
    setState((current) => ({ ...current, ...patch }));
  }

  function updateDisplay(display: Partial<ProfileCompletionState["display"]>) {
    setState((current) => ({ ...current, display: { ...current.display, ...display } }));
  }

  async function goToStep(index: number) {
    if (loading) return;
    const clamped = Math.min(Math.max(index, 0), profileCompletionSteps.length - 1);
    if (clamped > maxStep) return;

    setError("");
    if (clamped > currentStep) {
      const skippedSteps = profileCompletionSteps.slice(currentStep, clamped);
      if (skippedSteps.some((item) => !item.canContinue(state))) {
        setError("Заполните текущий шаг, чтобы продолжить");
        return;
      }

      if (skippedSteps.some((item) => item.id === "nickname")) {
        try {
          setLoading(true);
          if (!await validateNickname()) return;
        } finally {
          setLoading(false);
        }
      }
    }
    setCurrentStep(clamped);
  }

  function validateNickname(): Promise<boolean> {
    const nickname = state.nickname.trim();
    if (!nickname || fieldErrors.nickname) return Promise.resolve(false);
    if (nicknameCheck.current?.nickname === nickname) return nicknameCheck.current.promise;

    const check = { nickname, promise: Promise.resolve(false) };
    check.promise = checkNicknameAvailability(nickname).then((available) => {
      if (nicknameCheck.current !== check) return false;
      setError(available ? "" : "Никнейм уже занят");
      if (!available) nicknameCheck.current = null;
      return available;
    }).catch(() => {
      if (nicknameCheck.current === check) {
        nicknameCheck.current = null;
        setError("Не удалось проверить никнейм. Попробуйте ещё раз.");
      }
      return false;
    });
    nicknameCheck.current = check;
    return check.promise;
  }

  async function handleNext() {
    if (loading) return;
    setError("");

    if (!canContinue) {
      setError("Заполните текущий шаг, чтобы продолжить");
      return;
    }

    if (step.id === "nickname") {
      try {
        setLoading(true);
        if (!await validateNickname()) return;
      } catch {
        setError("Не удалось проверить никнейм. Попробуйте ещё раз.");
        return;
      } finally {
        setLoading(false);
      }
    }

    if (step.id === "review") {
      try {
        setLoading(true);
        const response = await api.saveOnboarding(buildOnboardingDto(state));
        if (response.data?.success === false) {
          throw new Error("Onboarding was not saved");
        }
        router.replace("/");
      } catch (submitError) {
        console.error("saveOnboarding failed", submitError);
        setError("Не удалось сохранить профиль. Попробуйте еще раз.");
      } finally {
        setLoading(false);
      }
      return;
    }

    const nextStep = Math.min(currentStep + 1, profileCompletionSteps.length - 1);
    setMaxStep((current) => Math.max(current, nextStep));
    setCurrentStep(nextStep);
  }

  function handleVisibleStepSelect(visibleIndex: number) {
    const target = profileCompletionSteps.findIndex((item) => item.id === visibleSteps[visibleIndex]?.id);
    void goToStep(target);
  }

  async function handleSearch(type: "PROFESSION" | "COMPANY" | "COUNTRY" | "CITY", query: string) {
    const version = (searchVersion.current[type] ?? 0) + 1;
    searchVersion.current[type] = version;
    try {
      const results = query.trim() ? await searchCatalog({ type, query, size: 8 }) : [];
      if (searchVersion.current[type] !== version) return;
      setError("");
      const options = results.map((item) => ({ value: item.id ?? item.name ?? "", label: item.name ?? "" }));

      if (type === "PROFESSION") {
        setProfessionSearch(options);
      } else if (type === "COMPANY") {
        setCompanySearch(options);
      } else if (type === "COUNTRY") {
        setCountrySearch(options);
      } else {
        setCitySearch(options);
      }
    } catch {
      if (searchVersion.current[type] === version) setError("Не удалось выполнить поиск. Попробуйте ещё раз.");
    }
  }

  if (step.id === "intro") {
    return <IntroFadeStep onNext={handleNext} />;
  }

  if (step.id === "nickname") {
    return (
      <NicknameStep
        value={state.nickname}
        canContinue={canContinue}
        loading={loading}
        error={fieldErrors.nickname || error}
        currentStep={Math.max(visibleStepIndex, 0)}
        stepCount={visibleSteps.length}
        onChange={(nickname) => updateState({ nickname })}
        onBlur={() => { void validateNickname(); }}
        onNext={handleNext}
        onStepSelect={handleVisibleStepSelect}
      />
    );
  }

  if (step.id === "company") {
    const filteredCompanyItems = companyQuery.trim()
      ? [...new Map([
          ...companyItems.filter((item) => item.label.toLowerCase().includes(companyQuery.trim().toLowerCase())),
          ...companySearch.map(option => companyItems.find(item => item.value === option.value) ?? { value: option.value, label: option.label }),
        ].map(item => [item.value, item])).values()]
      : companyItems;

    return (
      <CompanyStep
        inputValue={companyQuery}
        selectedValue={state.companyId}
        items={filteredCompanyItems}
        canContinue={canContinue}
        loading={loading}
        error={error}
        currentStep={Math.max(visibleStepIndex, 0)}
        stepCount={visibleSteps.length}
        onInputChange={(query) => {
          setCompanyQuery(query);
          if (state.companyId) {
            updateState({ companyId: "" });
          }
          void handleSearch("COMPANY", query);
        }}
        onCompanySelect={(value) => {
          const item = filteredCompanyItems.find((option) => option.value === value);
          updateState({ companyId: value });
          updateDisplay({ company: makeDisplay(item?.label ?? value, item?.colorHex, item?.logoUrl) });
          setCompanyQuery(item?.label ?? "");
        }}
        onNext={handleNext}
        onStepSelect={handleVisibleStepSelect}
      />
    );
  }

  if (step.id === "location") {
    const isRussia = countryQuery === "\u0420\u043e\u0441\u0441\u0438\u044f" && state.display.country?.label === "\u0420\u043e\u0441\u0441\u0438\u044f";

    return (
      <LocationStep
        countryValue={countryQuery}
        cityValue={cityQuery}
        selectedCityValue={state.cityId}
        workFormatValue={state.workFormat}
        countryOptions={countrySearch}
        cityOptions={citySearch}
        cityItems={cityItems}
        workFormatOptions={workFormatOptions}
        showCityInput={isRussia}
        canContinue={canContinue}
        loading={loading}
        error={error}
        currentStep={Math.max(visibleStepIndex, 0)}
        stepCount={visibleSteps.length}
        onCountryInputChange={(query) => {
          const matchesLoadedCountry = countrySearch.some((option) => option.label === query);
          setCountryQuery(query);
          if (query !== state.display.country?.label && !matchesLoadedCountry) {
            updateState({ countryId: "", cityId: "" });
            setCityQuery("");
          }
          void handleSearch("COUNTRY", query);
        }}
        onCountrySelect={(option) => {
          const isSelectedRussia = option.label === "\u0420\u043e\u0441\u0441\u0438\u044f";
          updateState({ countryId: option.value, cityId: isSelectedRussia ? state.cityId : "" });
          updateDisplay({ country: makeDisplay(option.label) });
          setCountryQuery(option.label);
          if (!isSelectedRussia) {
            setCityQuery("");
          }
        }}
        onCityInputChange={(query) => {
          const matchesLoadedCity = citySearch.some((option) => option.label === query) || cityItems.some((option) => option.label === query);
          setCityQuery(query);
          if (query !== state.display.city?.label && !matchesLoadedCity) {
            updateState({ cityId: "" });
          }
          void handleSearch("CITY", query);
        }}
        onCitySelect={(option) => {
          updateState({ cityId: option.value });
          updateDisplay({ city: makeDisplay(option.label, getCityAccent(option.label)) });
          setCityQuery(option.label);
        }}
        onCityButtonSelect={(value) => {
          const item = cityItems.find((option) => option.value === value);
          updateState({ cityId: value });
          updateDisplay({ city: makeDisplay(item?.label ?? value, item?.colorHex) });
          setCityQuery(item?.label ?? "");
        }}
        onWorkFormatChange={(value) => {
          updateState({ workFormat: value as ProfileCompletionState["workFormat"] });
          updateDisplay({ workFormat: makeDisplay(findLabel(workFormatOptions, value)) });
        }}
        onNext={handleNext}
        onStepSelect={handleVisibleStepSelect}
      />
    );
  }

  if (step.id === "profession") {
    const filteredProfessionItems = professionQuery.trim()
      ? professionItems.filter((item) => item.label.toLowerCase().includes(professionQuery.trim().toLowerCase()))
      : professionItems;

    return (
      <ProfessionStep
        inputValue={professionQuery}
        selectedValue={state.professionId}
        items={filteredProfessionItems}
        options={professionSearch}
        canContinue={canContinue}
        loading={loading}
        error={error}
        currentStep={Math.max(visibleStepIndex, 0)}
        stepCount={visibleSteps.length}
        onInputChange={(query) => {
          const matchesLoadedProfession = professionSearch.some((option) => option.label === query) || professionItems.some((option) => option.label === query);
          setProfessionQuery(query);
          if (query !== state.display.profession?.label && !matchesLoadedProfession) {
            updateState({ professionId: "" });
          }
          void handleSearch("PROFESSION", query);
        }}
        onOptionSelect={(option) => {
          updateState({ professionId: option.value });
          updateDisplay({ profession: makeDisplay(option.label, getProfessionAccent(option.label)) });
          setProfessionQuery(option.label);
        }}
        onProfessionSelect={(value) => {
          const item = professionItems.find((option) => option.value === value);
          updateState({ professionId: value });
          updateDisplay({ profession: makeDisplay(item?.label ?? value, item?.colorHex) });
          setProfessionQuery(item?.label ?? "");
        }}
        onNext={handleNext}
        onStepSelect={handleVisibleStepSelect}
      />
    );
  }

  if (step.id === "seniority") {
    const gradeOptions = seniorityOptions.map((option) => option.label);
    const selectedGradeLabel = state.display.seniorityLevel?.label ?? gradeOptions[1] ?? gradeOptions[0] ?? "";

    return (
      <SeniorityStep
        gradeOptions={gradeOptions}
        gradeValue={selectedGradeLabel}
        hasCompanyGrade={state.hasCompanyGrade}
        companyGrade={state.companyGrade}
        companyGradeError={fieldErrors.companyGrade}
        experienceError={fieldErrors.workExperienceYears}
        workExperienceYears={state.workExperienceYears}
        canContinue={canContinue}
        loading={loading}
        error={error}
        currentStep={Math.max(visibleStepIndex, 0)}
        stepCount={visibleSteps.length}
        onGradeChange={(label) => {
          const option = seniorityOptions.find((item) => item.label === label);
          updateState({ seniorityLevel: (option?.value ?? "") as ProfileCompletionState["seniorityLevel"] });
          updateDisplay({ seniorityLevel: makeDisplay(label) });
        }}
        onHasCompanyGradeChange={(checked) => {
          updateState({ hasCompanyGrade: checked, companyGrade: checked ? state.companyGrade : "" });
        }}
        onCompanyGradeChange={(companyGrade) => updateState({ companyGrade })}
        onWorkExperienceYearsChange={(workExperienceYears) => updateState({ workExperienceYears })}
        onNext={handleNext}
        onStepSelect={handleVisibleStepSelect}
      />
    );
  }

  if (step.id === "compensation") {
    const currencyOptions: SwitchButtonsOption[] = [
      { value: "RUB", label: "Рубли" },
      { value: "USD", label: "Доллары" },
    ];

    return (
      <CompensationStep
        currency={state.currency}
        salary={state.salary}
        salaryError={fieldErrors.salary}
        bonusError={fieldErrors.bonus}
        hasBonus={state.hasBonus}
        bonus={state.bonus}
        currencyOptions={currencyOptions}
        canContinue={canContinue}
        loading={loading}
        error={error}
        currentStep={Math.max(visibleStepIndex, 0)}
        stepCount={visibleSteps.length}
        onCurrencyChange={(value) => updateState({ currency: value as ProfileCompletionState["currency"] })}
        onSalaryChange={(salary) => updateState({ salary })}
        onHasBonusChange={(hasBonus) => updateState({ hasBonus, bonus: hasBonus ? state.bonus : "" })}
        onBonusChange={(bonus) => updateState({ bonus })}
        onNext={handleNext}
        onStepSelect={handleVisibleStepSelect}
      />
    );
  }

  if (step.id === "skills") {
    return (
      <SkillsStep
        value={state.skills}
        options={mergeSkills(skillOptions.filter(option => state.skills.includes(option.value)), skillsQuery.trim() ? skillSearch : suggestedSkills)}
        suggestionOptions={suggestedSkills}
        onInputChange={(query) => { setSkillsQuery(query); setSkillSearch([]); setSkillsError(""); }}
        onRetry={() => setSkillsAttempt(current => current + 1)}
        currentStep={Math.max(visibleStepIndex, 0)}
        stepCount={visibleSteps.length}
        loading={loading}
        error={skillsError || error}
        onChange={(skills) => { updateState({ skills }); setSkillsQuery(""); setSkillSearch([]); }}
        onNext={handleNext}
        onStepSelect={handleVisibleStepSelect}
      />
    );
  }

  if (step.id === "review") {
    return <ReviewStep state={state} skillOptions={skillOptions} currentStep={Math.max(visibleStepIndex, 0)} stepCount={visibleSteps.length} canContinue={canContinue} loading={loading} error={error} onNext={handleNext} onStepSelect={handleVisibleStepSelect} />;
  }
}
