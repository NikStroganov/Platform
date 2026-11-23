"use client";

import Box from "@mui/material/Box";

import { CompanyButtons, type CompanyButtonItem } from "@/components/shared/company-buttons";
import { FieldInput } from "@/components/shared/field-input";

import { OnboardingScreen } from "./OnboardingScreen";

const title = "\u0422\u0432\u043e\u044f \u043a\u043e\u043c\u043f\u0430\u043d\u0438\u044f?";
const description =
  "\u0423\u043a\u0430\u0437\u044b\u0432\u0430\u0439 \u043a\u043e\u043c\u043f\u0430\u043d\u0438\u044e, \u0432 \u043a\u043e\u0442\u043e\u0440\u043e\u0439 \u0442\u044b \u0440\u0430\u0431\u043e\u0442\u0430\u0435\u0448\u044c \u043f\u0440\u044f\u043c\u043e \u0441\u0435\u0439\u0447\u0430\u0441 \u0438\u043b\u0438 \u0442\u0432\u043e\u0435 \u043f\u043e\u0441\u043b\u0435\u0434\u043d\u0435\u0435 \u043c\u0435\u0441\u0442\u043e \u0440\u0430\u0431\u043e\u0442\u044b";
const placeholder = "\u041d\u0430\u0437\u0432\u0430\u043d\u0438\u0435 \u043a\u043e\u043c\u043f\u0430\u043d\u0438\u0438";

export type CompanyStepProps = {
  inputValue: string;
  selectedValue: string;
  items: CompanyButtonItem[];
  canContinue: boolean;
  loading?: boolean;
  error?: string;
  currentStep: number;
  stepCount: number;
  onInputChange: (value: string) => void;
  onCompanySelect: (value: string) => void;
  onNext: () => void;
  onStepSelect: (index: number) => void;
};

export function CompanyStep({ inputValue, selectedValue, items, canContinue, loading, error, currentStep, stepCount, onInputChange, onCompanySelect, onNext, onStepSelect }: CompanyStepProps) {
  return (
    <OnboardingScreen nodeId="2238:7051" title={title} description={description} canContinue={canContinue} loading={loading} error={error} currentStep={currentStep} stepCount={stepCount} onNext={onNext} onStepSelect={onStepSelect}>
      <Box sx={{ display: "grid", gap: 3 }}>
        <FieldInput value={inputValue} onChange={(event) => onInputChange(event.currentTarget.value)} onKeyDown={(event) => { if (event.key === "Enter" && canContinue && !loading) onNext(); }} placeholder={placeholder} prefixImageSrc="/onboarding/company-search.svg" sx={{ width: "100%", "& .MuiOutlinedInput-root": { gap: 2 }, "& .MuiInputAdornment-positionStart, & .MuiInputAdornment-positionStart img": { width: 28, height: 28 } }} />
        <CompanyButtons items={items} value={selectedValue} onChange={onCompanySelect} sx={{ justifyContent: "center", width: "100%", "& > button": { minHeight: 116, p: "15px" } }} />
      </Box>
    </OnboardingScreen>
  );
}
