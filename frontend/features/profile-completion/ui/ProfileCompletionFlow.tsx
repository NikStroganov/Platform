"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { ChipInput, type ChipInputOption } from "@/components/shared/chip-input";
import { CityButtons, type CityButtonItem } from "@/components/shared/city-buttons";
import { CompanyButtons, type CompanyButtonItem } from "@/components/shared/company-buttons";
import { FieldInput } from "@/components/shared/field-input";
import { GradeSelect } from "@/components/shared/grade-select";
import { SearchInput, type SearchInputOption } from "@/components/shared/search-input";
import { SpecialityButtons, type SpecialityButtonItem } from "@/components/shared/speciality-buttons";
import { SwitchButtons, type SwitchButtonsOption } from "@/components/shared/switch-buttons";
import { ToggleWithLabel } from "@/components/shared/toggle-with-label";
import { api } from "@/lib/api/client";

import {
  checkNicknameAvailabilityMock,
  getSeniorityLevelsMock,
  getTopCitiesMock,
  getTopCompaniesMock,
  getTopProfessionsMock,
  getWorkFormatsMock,
  searchCatalogMock,
} from "../api/profile-completion-api";
import { buildOnboardingDto } from "../model/build-onboarding-dto";
import {
  initialProfileCompletionState,
  profileCompletionSteps,
  type ProfileCompletionState,
  type ProfileCompletionStepId,
  type SelectedDisplay,
} from "../model/profile-completion-types";
import { CompanyStep } from "./CompanyStep";
import { CompensationStep } from "./CompensationStep";
import { IntroFadeStep } from "./IntroFadeStep";
import { LocationStep } from "./LocationStep";
import { NicknameStep } from "./NicknameStep";
import { ProfessionStep } from "./ProfessionStep";
import { ProfileCompletionLayout } from "./ProfileCompletionLayout";
import { SeniorityStep } from "./SeniorityStep";
import { SkillsStep } from "./SkillsStep";
import { ReviewStep } from "./ReviewStep";

const visibleSteps = profileCompletionSteps.filter((step) => step.progressVisible !== false);
const visibleStepIds = new Set(visibleSteps.map((step) => step.id));

function makeDisplay(label: string, colorHex?: string, logoUrl?: string): SelectedDisplay {
  return { label, colorHex, logoUrl };
}

function findLabel(options: { value: string; label: string }[], value: string) {
  return options.find((option) => option.value === value)?.label ?? value;
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
  const [error, setError] = React.useState("");
  const [professionItems, setProfessionItems] = React.useState<SpecialityButtonItem[]>([]);
  const [companyItems, setCompanyItems] = React.useState<CompanyButtonItem[]>([]);
  const [cityItems, setCityItems] = React.useState<CityButtonItem[]>([]);
  const [workFormatOptions, setWorkFormatOptions] = React.useState<SwitchButtonsOption[]>([]);
  const [seniorityOptions, setSeniorityOptions] = React.useState<SwitchButtonsOption[]>([]);
  const [skillOptions, setSkillOptions] = React.useState<ChipInputOption[]>([]);
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

  React.useEffect(() => {
    let active = true;

    async function loadMockData() {
      const [professions, companies, cities, formats, seniority, skills, countries] = await Promise.all([
        getTopProfessionsMock(),
        getTopCompaniesMock(),
        getTopCitiesMock(),
        getWorkFormatsMock(),
        getSeniorityLevelsMock(),
        searchCatalogMock({ type: "SKILL", query: "", size: 50 }),
        searchCatalogMock({ type: "COUNTRY", query: "", size: 20 }),
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
      setSkillOptions(skills.map((item) => ({ value: item.id ?? item.name ?? "", label: item.name ?? "Навык" })));
      setCountrySearch(countries.map((item) => ({ value: item.id ?? item.name ?? "", label: item.name ?? "" })));
    }

    void loadMockData();

    return () => {
      active = false;
    };
  }, []);

  function updateState(patch: Partial<ProfileCompletionState>) {
    setState((current) => ({ ...current, ...patch }));
  }

  function updateDisplay(display: Partial<ProfileCompletionState["display"]>) {
    setState((current) => ({ ...current, display: { ...current.display, ...display } }));
  }

  function goToStep(index: number) {
    if (loading) return;
    const clamped = Math.min(Math.max(index, 0), profileCompletionSteps.length - 1);
    if (clamped <= maxStep) {
      setError("");
      setCurrentStep(clamped);
    }
  }

  async function handleNext() {
    if (loading) return;
    setError("");

    if (!canContinue) {
      setError("Заполните текущий шаг, чтобы продолжить");
      return;
    }

    if (step.id === "nickname") {
      setLoading(true);
      const result = await checkNicknameAvailabilityMock(state.nickname);
      setLoading(false);
      if (!result.available) {
        setError("Этот никнейм уже занят");
        return;
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

  function handleBack() {
    setError("");
    setCurrentStep((current) => Math.max(current - 1, 0));
  }

  function handleVisibleStepSelect(visibleIndex: number) {
    const target = profileCompletionSteps.findIndex((item) => item.id === visibleSteps[visibleIndex]?.id);
    goToStep(target);
  }

  async function handleSearch(type: "PROFESSION" | "COMPANY" | "COUNTRY" | "CITY", query: string) {
    const results = await searchCatalogMock({ type, query, size: 8 });
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
  }

  if (step.id === "intro") {
    return <IntroFadeStep onNext={handleNext} loading={loading} />;
  }

  if (step.id === "nickname") {
    return (
      <NicknameStep
        value={state.nickname}
        canContinue={canContinue}
        loading={loading}
        error={error}
        currentStep={Math.max(visibleStepIndex, 0)}
        stepCount={visibleSteps.length}
        onChange={(nickname) => updateState({ nickname })}
        onNext={handleNext}
        onStepSelect={handleVisibleStepSelect}
      />
    );
  }

  if (step.id === "company") {
    const filteredCompanyItems = companyQuery.trim()
      ? companyItems.filter((item) => item.label.toLowerCase().includes(companyQuery.trim().toLowerCase()))
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
          const item = companyItems.find((option) => option.value === value);
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
        options={skillOptions}
        currentStep={Math.max(visibleStepIndex, 0)}
        stepCount={visibleSteps.length}
        loading={loading}
        error={error}
        onChange={(skills) => updateState({ skills })}
        onNext={handleNext}
        onStepSelect={handleVisibleStepSelect}
      />
    );
  }

  if (step.id === "review") {
    return <ReviewStep state={state} skillOptions={skillOptions} currentStep={Math.max(visibleStepIndex, 0)} stepCount={visibleSteps.length} canContinue={canContinue} loading={loading} error={error} onNext={handleNext} onStepSelect={handleVisibleStepSelect} />;
  }

  const content = renderStepContent({
    stepId: step.id,
    state,
    updateState,
    updateDisplay,
    professionItems,
    companyItems,
    cityItems,
    workFormatOptions,
    seniorityOptions,
    skillOptions,
    professionSearch,
    companySearch,
    citySearch,
    handleSearch,
  });

  return (
    <ProfileCompletionLayout
      currentStep={Math.max(visibleStepIndex, 0)}
      stepCount={visibleSteps.length}
      title={step.title}
      description={step.description}
      primaryLabel={step.primaryLabel ?? "Продолжить"}
      canContinue={canContinue}
      loading={loading}
      error={error}
      showProgress={visibleStepIds.has(step.id)}
      onBack={handleBack}
      onNext={handleNext}
      onStepSelect={handleVisibleStepSelect}
    >
      {content}
    </ProfileCompletionLayout>
  );
}

type RenderContext = {
  stepId: ProfileCompletionStepId;
  state: ProfileCompletionState;
  updateState: (patch: Partial<ProfileCompletionState>) => void;
  updateDisplay: (display: Partial<ProfileCompletionState["display"]>) => void;
  professionItems: SpecialityButtonItem[];
  companyItems: CompanyButtonItem[];
  cityItems: CityButtonItem[];
  workFormatOptions: SwitchButtonsOption[];
  seniorityOptions: SwitchButtonsOption[];
  skillOptions: ChipInputOption[];
  professionSearch: SearchInputOption[];
  companySearch: SearchInputOption[];
  citySearch: SearchInputOption[];
  handleSearch: (type: "PROFESSION" | "COMPANY" | "COUNTRY" | "CITY", query: string) => Promise<void>;
};

function renderStepContent(ctx: RenderContext) {
  const { stepId, state, updateState, updateDisplay } = ctx;

  if (stepId === "intro") {
    return (
      <Box sx={{ width: 64, height: 64, borderRadius: "50%", bgcolor: "#3d82ff", display: "grid", placeItems: "center", color: "#ffffff", fontSize: 36, fontWeight: 700 }}>
        ✓
      </Box>
    );
  }

  if (stepId === "nickname") {
    return (
      <Box sx={{ width: "100%", maxWidth: 400 }}>
        <FieldInput value={state.nickname} onChange={(event) => updateState({ nickname: event.target.value })} placeholder="Введи свой никнейм" />
      </Box>
    );
  }

  if (stepId === "profession") {
    return (
      <Box sx={{ width: "100%", display: "grid", gap: 3 }}>
        <SearchInput
          value={state.display.profession?.label ?? ""}
          options={ctx.professionSearch}
          placeholder="Найти профессию"
          clearable
          onChange={(event) => void ctx.handleSearch("PROFESSION", event.target.value)}
          onOptionSelect={(option) => {
            updateState({ professionId: option.value });
            updateDisplay({ profession: makeDisplay(option.label, "#3d82ff") });
          }}
        />
        <SpecialityButtons
          items={ctx.professionItems}
          value={state.professionId}
          onChange={(value) => {
            updateState({ professionId: value });
            updateDisplay({ profession: makeDisplay(findLabel(ctx.professionItems, value), "#3d82ff") });
          }}
        />
      </Box>
    );
  }

  if (stepId === "company") {
    return (
      <Box sx={{ width: "100%", display: "grid", gap: 3 }}>
        <SearchInput
          value={state.display.company?.label ?? ""}
          options={ctx.companySearch}
          placeholder="Найти компанию"
          clearable
          onChange={(event) => void ctx.handleSearch("COMPANY", event.target.value)}
          onOptionSelect={(option) => {
            updateState({ companyId: option.value });
            updateDisplay({ company: makeDisplay(option.label, "#3d82ff") });
          }}
        />
        <CompanyButtons
          items={ctx.companyItems}
          value={state.companyId}
          onChange={(value) => {
            updateState({ companyId: value });
            updateDisplay({ company: makeDisplay(findLabel(ctx.companyItems, value), "#3d82ff") });
          }}
        />
      </Box>
    );
  }

  if (stepId === "location") {
    return (
      <Box sx={{ width: "100%", display: "grid", gap: 3 }}>
        <SearchInput
          value={state.display.city?.label ?? ""}
          options={ctx.citySearch}
          placeholder="Найти город"
          clearable
          onChange={(event) => void ctx.handleSearch("CITY", event.target.value)}
          onOptionSelect={(option) => {
            updateState({ cityId: option.value });
            updateDisplay({ city: makeDisplay(option.label, "#3d82ff") });
          }}
        />
        <CityButtons
          items={ctx.cityItems}
          value={state.cityId}
          onChange={(value) => {
            updateState({ cityId: value });
            updateDisplay({ city: makeDisplay(findLabel(ctx.cityItems, value), "#3d82ff") });
          }}
        />
        <SwitchButtons
          options={ctx.workFormatOptions}
          value={state.workFormat}
          onChange={(value) => {
            updateState({ workFormat: value as ProfileCompletionState["workFormat"] });
            updateDisplay({ workFormat: makeDisplay(findLabel(ctx.workFormatOptions, value)) });
          }}
        />
      </Box>
    );
  }

  if (stepId === "seniority") {
    return (
      <Box sx={{ width: "100%", display: "grid", gap: 4 }}>
        <GradeSelect
          options={ctx.seniorityOptions.map((option) => option.label)}
          value={state.display.seniorityLevel?.label ?? ctx.seniorityOptions[0]?.label ?? ""}
          onChange={(label) => {
            const option = ctx.seniorityOptions.find((item) => item.label === label);
            updateState({ seniorityLevel: (option?.value ?? "") as ProfileCompletionState["seniorityLevel"] });
            updateDisplay({ seniorityLevel: makeDisplay(label) });
          }}
        />
        <ToggleWithLabel label="Дополнительно указать грейд по правилам компании" checked={state.hasCompanyGrade} onChange={(checked) => updateState({ hasCompanyGrade: checked })} />
        {state.hasCompanyGrade ? (
          <FieldInput value={state.companyGrade} onChange={(event) => updateState({ companyGrade: event.target.value })} placeholder="Название или обозначение грейда" />
        ) : null}
        <FieldInput type="number" value={state.workExperienceYears} onChange={(event) => updateState({ workExperienceYears: event.target.value })} placeholder="Например, 5" postfix="лет" />
      </Box>
    );
  }

  if (stepId === "compensation") {
    return (
      <Box sx={{ width: "100%", display: "grid", gap: 3 }}>
        <SwitchButtons options={[{ value: "RUB", label: "Рубли" }, { value: "USD", label: "Доллары" }]} value={state.currency} onChange={(value) => updateState({ currency: value as ProfileCompletionState["currency"] })} />
        <FieldInput type="number" value={state.salary} onChange={(event) => updateState({ salary: event.target.value })} placeholder="Зарплата" postfix={state.currency === "RUB" ? "₽" : "$"} />
        <ToggleWithLabel label="Указать премию" checked={state.hasBonus} onChange={(checked) => updateState({ hasBonus: checked })} />
        {state.hasBonus ? (
          <FieldInput type="number" value={state.bonus} onChange={(event) => updateState({ bonus: event.target.value })} placeholder="Сумма бонусов за год" postfix={state.currency === "RUB" ? "₽" : "$"} />
        ) : null}
      </Box>
    );
  }

  if (stepId === "skills") {
    return (
      <Box sx={{ width: "100%", display: "grid", gap: 3 }}>
        <ChipInput active value={state.skills} options={ctx.skillOptions} onChange={(skills) => updateState({ skills })} />
      </Box>
    );
  }

  return (
    <Box sx={{ width: "100%", maxWidth: 520, display: "grid", gap: 2 }}>
      {[
        ["Никнейм", state.nickname],
        ["Профессия", state.display.profession?.label],
        ["Компания", state.display.company?.label],
        ["Город", state.display.city?.label],
        ["Формат", state.display.workFormat?.label],
        ["Грейд", state.display.seniorityLevel?.label],
        ["Опыт", state.workExperienceYears ? `${state.workExperienceYears} лет` : ""],
        ["Зарплата", state.salary ? `${state.salary} ${state.currency}` : ""],
      ].map(([label, value]) => (
        <Box key={label} sx={{ display: "flex", justifyContent: "space-between", gap: 3, borderBottom: "1px solid #e6e6e6", py: 1.5 }}>
          <Typography sx={{ color: "#5f6368", fontSize: 14, fontWeight: 600 }}>{label}</Typography>
          <Typography sx={{ fontSize: 16, fontWeight: 700, textAlign: "right" }}>{value || "Не указано"}</Typography>
        </Box>
      ))}
    </Box>
  );
}


