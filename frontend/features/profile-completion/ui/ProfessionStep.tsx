"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { AppStepper } from "@/components/shared/app-stepper";
import { SearchInput, type SearchInputOption } from "@/components/shared/search-input";
import { SpecialityButtons, type SpecialityButtonItem } from "@/components/shared/speciality-buttons";
import { AppButton } from "@/components/ui/app-button";

const sceneWidth = 1440;
const sceneHeight = 900;
const title = "\u041a\u0435\u043c \u0440\u0430\u0431\u043e\u0442\u0430\u0435\u0448\u044c?";
const description = "\u0412\u044b\u0431\u0435\u0440\u0438 \u0438\u0437 \u0441\u043f\u0438\u0441\u043a\u0430 \u043e\u0434\u043d\u0443 \u043f\u0440\u043e\u0444\u0435\u0441\u0441\u0438\u044e \u043a\u0435\u043c \u0442\u044b \u0440\u0430\u0431\u043e\u0442\u0430\u0435\u0448\u044c \u043f\u0440\u044f\u043c\u043e \u0441\u0435\u0439\u0447\u0430\u0441";
const placeholder = "\u041d\u0430\u0437\u0432\u0430\u043d\u0438\u0435 \u043f\u0440\u043e\u0444\u0435\u0441\u0441\u0438\u0438";
const nextLabel = "\u0414\u0430\u043b\u0435\u0435";
const loadingLabel = "\u0421\u043e\u0445\u0440\u0430\u043d\u044f\u0435\u043c...";

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

function CareItLogo() {
  return (
    <Box data-testid="onboarding-frame-logo" sx={{ position: "absolute", top: 16, left: "50%", transform: "translateX(-50%)", width: 115, height: 48 }}>
      <Box component="img" src="/onboarding/careit-logo-mark.svg" alt="" sx={{ position: "absolute", left: 8.77, top: 7, width: 31.45, height: 34 }} />
      <Typography sx={{ position: "absolute", left: 48.5, top: 12, color: "#111111", fontSize: 18, fontWeight: 700, lineHeight: "24px" }}>CareIT</Typography>
    </Box>
  );
}

export function ProfessionStep({ inputValue, selectedValue, items, options, canContinue, loading, error, currentStep, stepCount, onInputChange, onOptionSelect, onProfessionSelect, onNext, onStepSelect }: ProfessionStepProps) {
  return (
    <Box component="main" sx={{ minHeight: "100vh", bgcolor: "#f6f7f9", display: "grid", placeItems: "center", overflow: "hidden", position: "relative" }}>
      <CareItLogo />
      <AppStepper count={stepCount} value={currentStep} onChange={onStepSelect} sx={{ position: "absolute", top: 88, left: "50%", transform: "translateX(-50%)", zIndex: 2 }} />

      <Box sx={{ width: sceneWidth, height: sceneHeight, position: "relative", transform: { xs: "scale(calc(100vw / 1440))", md: "scale(min(calc(100vw / 1440), calc(100vh / 900)))" }, transformOrigin: "center", flexShrink: 0, bgcolor: "#f6f7f9" }} data-node-id="2031:5773">
        <Box sx={{ position: "absolute", top: 176, left: 500, width: 440, display: "grid", gap: 2, textAlign: "center" }}>
          <Typography sx={{ color: "#111111", fontSize: 24, fontWeight: 600, lineHeight: "32px" }}>{title}</Typography>
          <Typography sx={{ color: "#adadad", fontSize: 14, fontWeight: 500, lineHeight: "20px" }}>{description}</Typography>
        </Box>

        <Box sx={{ position: "absolute", top: 328, left: "50%", width: 800, transform: "translateX(-50%)", display: "grid", gap: 3 }}>
          <SearchInput value={inputValue} options={options} showOptionsOnFocus clearable placeholder={placeholder} onChange={(event) => onInputChange(event.currentTarget.value)} onOptionSelect={onOptionSelect} sx={{ width: "100%" }} />
          <SpecialityButtons items={items} value={selectedValue} onChange={onProfessionSelect} sx={{ width: "100%" }} />
          {error ? <Typography role="alert" sx={{ color: "#ff4d4f", fontSize: 14, fontWeight: 700, lineHeight: "20px", textAlign: "center" }}>{error}</Typography> : null}
        </Box>
      </Box>

      <AppButton appStyle="figma" onClick={onNext} disabled={!canContinue || loading} sx={{ position: "absolute", left: "50%", bottom: { xs: 32, md: 80 }, transform: "translateX(-50%)", width: { xs: "calc(100vw - 32px)", md: 548 }, maxWidth: 548, zIndex: 2, bgcolor: "#3d82ff", "&.Mui-disabled": { bgcolor: "#3d82ff", color: "#ffffff", opacity: 0.5 } }}>
        {loading ? loadingLabel : nextLabel}
      </AppButton>
    </Box>
  );
}
