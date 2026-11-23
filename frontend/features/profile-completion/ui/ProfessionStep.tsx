"use client";

import Box from "@mui/material/Box";

import { SearchInput, type SearchInputOption } from "@/components/shared/search-input";
import { SpecialityButtons, type SpecialityButtonItem } from "@/components/shared/speciality-buttons";

import { OnboardingScreen } from "./OnboardingScreen";

const title = "\u041a\u0435\u043c \u0440\u0430\u0431\u043e\u0442\u0430\u0435\u0448\u044c?";
const description = "\u0412\u044b\u0431\u0435\u0440\u0438 \u0438\u0437 \u0441\u043f\u0438\u0441\u043a\u0430 \u043e\u0434\u043d\u0443 \u043f\u0440\u043e\u0444\u0435\u0441\u0441\u0438\u044e \u043a\u0435\u043c \u0442\u044b \u0440\u0430\u0431\u043e\u0442\u0430\u0435\u0448\u044c \u043f\u0440\u044f\u043c\u043e \u0441\u0435\u0439\u0447\u0430\u0441";
const placeholder = "\u041d\u0430\u0437\u0432\u0430\u043d\u0438\u0435 \u043f\u0440\u043e\u0444\u0435\u0441\u0441\u0438\u0438";

export type ProfessionStepProps = {
  inputValue: string;
  selectedValue: string;
  items: SpecialityButtonItem[];
  options: SearchInputOption[];
  canContinue: boolean;
  loading?: boolean;
  error?: string;
  currentStep: number;
  stepCount: number;
  onInputChange: (value: string) => void;
  onOptionSelect: (option: SearchInputOption) => void;
  onProfessionSelect: (value: string) => void;
  onNext: () => void;
  onStepSelect: (index: number) => void;
};

export function ProfessionStep({ inputValue, selectedValue, items, options, canContinue, loading, error, currentStep, stepCount, onInputChange, onOptionSelect, onProfessionSelect, onNext, onStepSelect }: ProfessionStepProps) {
  return (
    <OnboardingScreen nodeId="2238:7331" title={title} description={description} canContinue={canContinue} loading={loading} error={error} currentStep={currentStep} stepCount={stepCount} onNext={onNext} onStepSelect={onStepSelect}>
      <Box sx={{ display: "grid", gap: 3 }}>
        <SearchInput value={inputValue} options={options} showOptionsOnFocus clearable placeholder={placeholder} onChange={(event) => onInputChange(event.currentTarget.value)} onOptionSelect={onOptionSelect} sx={{ width: "100%" }} />
        <SpecialityButtons items={items} value={selectedValue} onChange={onProfessionSelect} sx={{ width: "100%", "& > button": { px: "15px", py: "7px" } }} />
      </Box>
    </OnboardingScreen>
  );
}
