"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { ChipInput, type ChipInputOption } from "@/components/shared/chip-input";
import { ChipSuggestion } from "@/components/shared/chip-suggestion";

import { AppButton } from "@/components/ui/app-button";
import { OnboardingScreen } from "./OnboardingScreen";

export const maxSkills = 20;

export type SkillsStepProps = {
  value: string[];
  options: ChipInputOption[];
  currentStep: number;
  stepCount: number;
  loading?: boolean;
  error?: string;
  onChange: (value: string[]) => void;
  onNext: () => void;
  onStepSelect: (index: number) => void;
};

export function SkillsStep({ value, options, currentStep, stepCount, loading, error, onChange, onNext, onStepSelect }: SkillsStepProps) {
  const suggestions = options.filter((option) => !value.includes(option.value)).slice(0, 8);
  return (
    <OnboardingScreen nodeId="2238:7440" title="Выбери свои навыки?" description="Выбери из списка одну професиию кем ты работаешь прямо сейчас" contentGap={24} canContinue={value.length > 0 && value.length <= maxSkills} currentStep={currentStep} stepCount={stepCount} loading={loading} error={error} onNext={onNext} onStepSelect={onStepSelect}>
      <Box sx={{ display: "grid", gap: value.length ? "8px" : "10px" }}>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 30 }}>
          <Typography data-testid="skills-count" aria-live="polite" sx={{ color: "#adadad", fontSize: 14, fontWeight: 500, lineHeight: "18px" }}>{value.length}/{maxSkills}</Typography>
          <AppButton variant="text" disabled={!value.length} onClick={() => onChange([])} sx={{ color: "#ff4d4f", fontSize: 14, fontWeight: 500, lineHeight: "22px", px: 1.5, py: 0.5, minWidth: 0, minHeight: 30, "&.Mui-disabled": { color: "#adadad" } }}>Очистить</AppButton>
        </Box>
        <ChipInput active value={value} options={options} onChange={onChange} maxItems={maxSkills} hideInputAtLimit maxVisibleHeight={124} deleteIconSrc="/onboarding/skills-x-close.svg" sx={{ width: "100%", minWidth: 0 }} />
      </Box>
      {value.length > 0 && suggestions.length > 0 ? (
        <Box sx={{ display: "grid", gap: 3, mt: 6 }}>
          <Typography component="h2" sx={{ color: "#111111", fontSize: 24, fontWeight: 600, lineHeight: "32px", textAlign: "center" }}>Похожие навыки</Typography>
          <ChipSuggestion items={suggestions} disabled={value.length >= maxSkills} onSelect={(skill) => onChange([...value, skill])} plusIconSrc="/onboarding/skills-plus.svg" sx={{ display: "flex", flexWrap: "wrap", width: "100%", "& > button": { minHeight: 40, flexDirection: "row", gap: 1, px: 2, py: 1, borderRadius: "24px", "&.Mui-disabled": { bgcolor: "#f2f2f2", color: "#adadad", "& p": { color: "#adadad" }, "& img": { opacity: 0.4 } } } }} />
        </Box>
      ) : null}
    </OnboardingScreen>
  );
}
