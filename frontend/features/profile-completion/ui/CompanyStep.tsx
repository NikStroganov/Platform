"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { AppStepper } from "@/components/shared/app-stepper";
import { CompanyButtons, type CompanyButtonItem } from "@/components/shared/company-buttons";
import { FieldInput } from "@/components/shared/field-input";
import { AppButton } from "@/components/ui/app-button";

const sceneWidth = 1440;
const sceneHeight = 900;
const title = "\u0422\u0432\u043e\u044f \u043a\u043e\u043c\u043f\u0430\u043d\u0438\u044f?";
const description =
  "\u0423\u043a\u0430\u0437\u044b\u0432\u0430\u0439 \u043a\u043e\u043c\u043f\u0430\u043d\u0438\u044e, \u0432 \u043a\u043e\u0442\u043e\u0440\u043e\u0439 \u0442\u044b \u0440\u0430\u0431\u043e\u0442\u0430\u0435\u0448\u044c \u043f\u0440\u044f\u043c\u043e \u0441\u0435\u0439\u0447\u0430\u0441 \u0438\u043b\u0438 \u0442\u0432\u043e\u0435 \u043f\u043e\u0441\u043b\u0435\u0434\u043d\u0435\u0435 \u043c\u0435\u0441\u0442\u043e \u0440\u0430\u0431\u043e\u0442\u044b";
const placeholder = "\u041d\u0430\u0437\u0432\u0430\u043d\u0438\u0435 \u043a\u043e\u043c\u043f\u0430\u043d\u0438\u0438";
const nextLabel = "\u0414\u0430\u043b\u0435\u0435";
const loadingLabel = "\u0421\u043e\u0445\u0440\u0430\u043d\u044f\u0435\u043c...";

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

function CareItLogo() {
  return (
    <Box data-testid="onboarding-frame-logo" sx={{ position: "absolute", top: 16, left: "50%", transform: "translateX(-50%)", width: 115, height: 48 }}>
      <Box component="img" src="/onboarding/careit-logo-mark.svg" alt="" sx={{ position: "absolute", left: 8.77, top: 7, width: 31.45, height: 34 }} />
      <Typography sx={{ position: "absolute", left: 48.5, top: 12, color: "#111111", fontSize: 18, fontWeight: 700, lineHeight: "24px" }}>CareIT</Typography>
    </Box>
  );
}

export function CompanyStep({ inputValue, selectedValue, items, canContinue, loading, error, currentStep, stepCount, onInputChange, onCompanySelect, onNext, onStepSelect }: CompanyStepProps) {
  return (
    <Box component="main" sx={{ minHeight: "100vh", bgcolor: "#f6f7f9", display: "grid", placeItems: "center", overflow: "hidden", position: "relative" }}>
      <CareItLogo />
      <AppStepper count={stepCount} value={currentStep} onChange={onStepSelect} sx={{ position: "absolute", top: 88, left: "50%", transform: "translateX(-50%)", zIndex: 2 }} />

      <Box sx={{ width: sceneWidth, height: sceneHeight, position: "relative", transform: { xs: "scale(calc(100vw / 1440))", md: "scale(min(calc(100vw / 1440), calc(100vh / 900)))" }, transformOrigin: "center", flexShrink: 0, bgcolor: "#f6f7f9" }} data-node-id="2031:5612">
        <Box sx={{ position: "absolute", top: 176, left: 500, width: 440, display: "grid", gap: 2, textAlign: "center" }}>
          <Typography sx={{ color: "#111111", fontSize: 24, fontWeight: 600, lineHeight: "32px" }}>{title}</Typography>
          <Typography sx={{ color: "#adadad", fontSize: 14, fontWeight: 500, lineHeight: "20px" }}>{description}</Typography>
        </Box>

        <Box sx={{ position: "absolute", top: 414, left: "50%", width: 800, transform: "translateX(-50%)", display: "grid", gap: 3 }}>
          <FieldInput value={inputValue} onChange={(event) => onInputChange(event.currentTarget.value)} onKeyDown={(event) => { if (event.key === "Enter" && canContinue && !loading) { onNext(); } }} placeholder={placeholder} prefixImageSrc="/onboarding/company-search.svg" sx={{ width: "100%" }} />
          <CompanyButtons items={items} value={selectedValue} onChange={onCompanySelect} sx={{ justifyContent: "center", width: "100%" }} />
          {error ? <Typography role="alert" sx={{ color: "#ff4d4f", fontSize: 14, fontWeight: 700, lineHeight: "20px", textAlign: "center" }}>{error}</Typography> : null}
        </Box>
      </Box>

      <AppButton appStyle="figma" onClick={onNext} disabled={!canContinue || loading} sx={{ position: "absolute", left: "50%", bottom: { xs: 32, md: 80 }, transform: "translateX(-50%)", width: { xs: "calc(100vw - 32px)", md: 548 }, maxWidth: 548, zIndex: 2, bgcolor: "#3d82ff", "&.Mui-disabled": { bgcolor: "#3d82ff", color: "#ffffff", opacity: 0.5 } }}>
        {loading ? loadingLabel : nextLabel}
      </AppButton>
    </Box>
  );
}
