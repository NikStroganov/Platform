"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { AppChip } from "@/components/shared/app-chip";
import { CompanyLogo } from "@/components/shared/company-logo";
import { OnboardingScreen } from "./OnboardingScreen";
import type { ProfileCompletionState } from "../model/profile-completion-types";
import type { ChipInputOption } from "@/components/shared/chip-input";

type ReviewStepProps = {
  state: ProfileCompletionState;
  skillOptions: ChipInputOption[];
  currentStep: number;
  stepCount: number;
  canContinue: boolean;
  loading?: boolean;
  error?: string;
  onNext: () => void;
  onStepSelect: (index: number) => void;
};

const chipSx = {
  height: 28,
  border: "1px solid",
  borderColor: "currentColor",
  "& .MuiChip-label": { fontSize: 16, fontWeight: 600, lineHeight: "20px", whiteSpace: "normal", overflowWrap: "anywhere" },
  maxWidth: "100%",
};
const workFormatLabels = { OFFICE: "Офис", HYBRID: "Гибрид", REMOTE: "Удаленная работа" };
const pluralRules = new Intl.PluralRules("ru");

function experienceLabel(value: string) {
  const plural = pluralRules.select(Number(value));
  return `${value} ${plural === "one" ? "год" : plural === "few" ? "года" : "лет"} опыта`;
}

export function ReviewStep({ state, skillOptions, currentStep, stepCount, canContinue, loading, error, onNext, onStepSelect }: ReviewStepProps) {
  const [showAllSkills, setShowAllSkills] = useState(false);
  const skills = showAllSkills ? state.skills : state.skills.slice(0, 5);
  const formatter = new Intl.NumberFormat("ru-RU", { style: "currency", currency: state.currency, currencyDisplay: "narrowSymbol", minimumFractionDigits: 0, maximumFractionDigits: 2 });
  const money = (value: string) => formatter.format(Number(value.replace(",", ".")));
  const location = state.countryId === "20000000-0000-4000-8000-000000000001" ? state.display.city?.label : state.display.country?.label;
  const professionColor = state.display.profession?.colorHex ?? "#1ca2d3";

  return (
    <OnboardingScreen nodeId="2238:6969" canContinue={canContinue} loading={loading} error={error} currentStep={currentStep} stepCount={stepCount} onNext={onNext} onStepSelect={onStepSelect} primaryLabel="А теперь к графикам!">
      <Typography sx={{ position: "absolute", top: 44, left: "calc(50% - 541px)", width: 220, color: "#9e9fa3", fontSize: 16, fontWeight: 500, lineHeight: "20px", display: { xs: "none", lg: "block" } }}>Если что-то не так, всегда можно настроить заново!</Typography>
      <Box component="img" src="/onboarding/review-arrow.svg" alt="" sx={{ position: "absolute", top: -36, left: "calc(50% - 439px)", transform: "rotate(180deg)", display: { xs: "none", lg: "block" } }} />

      <Box sx={{ display: "flex", justifyContent: "center", mt: { xs: 0, md: "134px" } }}>
        <Box sx={{ width: "100%", maxWidth: 694, display: "flex", flexDirection: { xs: "column", md: "row" }, alignItems: { xs: "center", md: "stretch" }, justifyContent: "center", gap: 4 }}>
          <Box data-testid="review-profile-card" sx={{ width: 262, maxWidth: "100%", minHeight: 344, flexShrink: 0, border: "2px solid #ffe6c9", borderRadius: "32px", bgcolor: "#ffffff", position: "relative", overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: 3, py: 4, px: 3 }}>
            <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 262, height: 396, opacity: 0.2, filter: "blur(6.15px)", overflow: "hidden", pointerEvents: "none" }}>
              <Box component="img" src="/onboarding/review-card-background.png" alt="" sx={{ position: "absolute", height: "111.63%", width: "253.02%", maxWidth: "none", left: "-69.07%", top: "-6.49%" }} />
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1, width: "100%", position: "relative" }}>
              <Box sx={{ width: 100, height: 100, position: "relative" }}>
                <Box component="img" src="/onboarding/review-avatar.png" alt="" sx={{ width: 100, height: 100, position: "absolute", inset: 0 }} />
                <Box component="img" src="/onboarding/review-avatar-ring.svg" alt="" sx={{ width: 100, height: 100, position: "absolute", inset: 0 }} />
              </Box>
              <Box sx={{ display: "grid", gap: 0.5, textAlign: "center", width: "100%" }}>
                <Typography data-testid="review-nickname" sx={{ fontSize: 24, fontWeight: 600, lineHeight: "32px", overflowWrap: "anywhere" }}>{state.nickname}</Typography>
                <Typography sx={{ fontSize: 16, color: "#9e9fa3", fontWeight: 500, lineHeight: "20px" }}>{[location, experienceLabel(state.workExperienceYears)].filter(Boolean).join(", ")}</Typography>
                <Typography sx={{ fontSize: 16, color: "#9e9fa3", fontWeight: 500, lineHeight: "20px" }}>{state.workFormat ? workFormatLabels[state.workFormat] : ""}</Typography>
              </Box>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1, position: "relative", maxWidth: "100%" }}>
              <AppChip label={state.display.profession?.label ?? ""} colorHex={professionColor} backgroundHex={`${professionColor}26`} sx={{ ...chipSx, height: "auto", minHeight: 28, py: 0, borderColor: `${professionColor}33` }} />
              <AppChip label={[state.display.seniorityLevel?.label, state.hasCompanyGrade ? state.companyGrade : ""].filter(Boolean).join(" · ")} colorHex="#3f90cd" backgroundHex="#c4e0f8" sx={{ ...chipSx, borderColor: "#026db433" }} />
            </Box>
          </Box>

          <Box sx={{ width: { xs: "100%", md: 400 }, maxWidth: 400, minWidth: 0, display: "flex", flexDirection: "column", gap: 3 }}>
            <Typography component="h1" sx={{ fontSize: 24, fontWeight: 600, lineHeight: "32px" }}>Это все, честно!<br />Осталось только свериться</Typography>
            <Box sx={{ display: "grid", gap: 2 }}>
              <Box sx={{ bgcolor: "#ffffff", borderRadius: "32px", p: 1.5, display: "grid", gap: 1.5 }}>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, alignItems: "center", justifyContent: "center", minHeight: 28 }}>
                  <Typography sx={{ color: "#9e9fa3", fontSize: 16, lineHeight: "20px" }}>Актуальная компания</Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1, pl: 1, pr: 1.5, py: 0.5 }}>
                    {state.display.company?.logoUrl ? <CompanyLogo src={state.display.company.logoUrl} size={16} /> : null}
                    <Typography sx={{ color: state.display.company?.colorHex ?? "#e25050", fontSize: 16, fontWeight: 600, lineHeight: "20px", overflowWrap: "anywhere" }}>{state.display.company?.label}</Typography>
                  </Box>
                </Box>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                  {[{ value: state.salary, icon: "coins", label: "Зарплата" }, ...(state.hasBonus ? [{ value: state.bonus, icon: "gift", label: "Премия" }] : [])].map((item) => (
                    <Box key={item.icon} aria-label={`${item.label}: ${money(item.value)}`} sx={{ flex: "1 1 0", minWidth: 0, minHeight: 48, bgcolor: "#f6f7f9", borderRadius: "64px", display: "flex", alignItems: "center", gap: { xs: 1, md: 2 }, px: { xs: 1.5, md: 3 } }}>
                      <Box component="img" src={`/onboarding/review-${item.icon}.svg`} alt="" sx={{ width: 24, height: 24, flexShrink: 0 }} />
                      <Typography sx={{ color: "#3d82ff", fontSize: { xs: 14, md: 16 }, fontWeight: 600, lineHeight: "24px", overflowWrap: "anywhere" }}>{money(item.value)}</Typography>
                    </Box>
                  ))}
                </Box>
              </Box>

              <Box sx={{ bgcolor: "#ffffff", borderRadius: "32px", p: 1.5, display: "grid", gap: 1.5 }}>
                <Typography sx={{ color: "#9e9fa3", fontSize: 16, lineHeight: "20px", textAlign: "center", py: 0.5 }}>Навыки в профессии</Typography>
                <Box data-testid="review-skills" sx={{ display: "flex", flexWrap: "wrap", gap: 1, justifyContent: "center" }}>
                  {skills.map((skill) => {
                    const label = skillOptions.find((option) => option.value === skill)?.label ?? skill;
                    const color = label === "ChatGPT" ? "#d4561e" : label === "Композиция" ? "#b48302" : "#1ca2d3";
                    return <AppChip key={skill} label={label} colorHex={color} backgroundHex={`${color}26`} sx={{ ...chipSx, borderColor: `${color}33`, height: "auto", minHeight: 28, py: 0 }} />;
                  })}
                  {!showAllSkills && state.skills.length > 5 ? <AppChip label={`+${state.skills.length - 5}`} onClick={() => setShowAllSkills(true)} disabled={loading} colorHex="#b48302" backgroundHex="#f8edc4" sx={{ ...chipSx, borderColor: "#b4830233" }} /> : null}
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

    </OnboardingScreen>
  );
}
