"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { AppStepper } from "@/components/shared/app-stepper";
import { CityButtons, type CityButtonItem } from "@/components/shared/city-buttons";
import { SearchInput, type SearchInputOption } from "@/components/shared/search-input";
import { SwitchButtons, type SwitchButtonsOption } from "@/components/shared/switch-buttons";
import { AppButton } from "@/components/ui/app-button";

const sceneWidth = 1440;
const sceneHeight = 900;
const title = "\u0423\u043a\u0430\u0436\u0438 \u043e\u0444\u0438\u0441 \u0438 \u0444\u043e\u0440\u043c\u0430\u0442 \u0440\u0430\u0431\u043e\u0442\u044b";
const descriptionLine1 = "\u0412\u044b\u0431\u0435\u0440\u0438 \u0433\u043e\u0440\u043e\u0434, \u0432 \u043a\u043e\u0442\u043e\u0440\u043e\u043c \u043d\u0430\u0445\u043e\u0434\u0438\u0442\u0441\u044f";
const descriptionLine2 = "\u043e\u0442\u0434\u0435\u043b\u0435\u043d\u0438\u0435/\u043e\u0444\u0438\u0441, \u0433\u0434\u0435 \u0442\u044b \u0447\u0438\u0441\u043b\u0438\u0448\u044c\u0441\u044f \u043a\u0430\u043a \u0440\u0430\u0431\u043e\u0442\u043d\u0438\u043a";
const countryPlaceholder = "\u041d\u0430\u0437\u0432\u0430\u043d\u0438\u0435 \u0441\u0442\u0440\u0430\u043d\u044b";
const cityPlaceholder = "\u041d\u0430\u0437\u0432\u0430\u043d\u0438\u0435 \u0433\u043e\u0440\u043e\u0434\u0430";
const nextLabel = "\u0414\u0430\u043b\u0435\u0435";
const loadingLabel = "\u0421\u043e\u0445\u0440\u0430\u043d\u044f\u0435\u043c...";

export type LocationStepProps = {
  countryValue: string;
  cityValue: string;
  selectedCityValue: string;
  workFormatValue: string;
  countryOptions: SearchInputOption[];
  cityOptions: SearchInputOption[];
  cityItems: CityButtonItem[];
  workFormatOptions: SwitchButtonsOption[];
  showCityInput: boolean;
  canContinue: boolean;
  loading?: boolean;
  error?: string;
  currentStep: number;
  stepCount: number;
  onCountryInputChange: (value: string) => void;
  onCountrySelect: (option: SearchInputOption) => void;
  onCityInputChange: (value: string) => void;
  onCitySelect: (option: SearchInputOption) => void;
  onCityButtonSelect: (value: string) => void;
  onWorkFormatChange: (value: string) => void;
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

export function LocationStep({ countryValue, cityValue, selectedCityValue, workFormatValue, countryOptions, cityOptions, cityItems, workFormatOptions, showCityInput, canContinue, loading, error, currentStep, stepCount, onCountryInputChange, onCountrySelect, onCityInputChange, onCitySelect, onCityButtonSelect, onWorkFormatChange, onNext, onStepSelect }: LocationStepProps) {
  const switchTop = showCityInput ? 596 : 424;

  return (
    <Box component="main" sx={{ minHeight: "100vh", bgcolor: "#f6f7f9", display: "grid", placeItems: "center", overflow: "hidden", position: "relative" }}>
      <CareItLogo />
      <AppStepper count={stepCount} value={currentStep} onChange={onStepSelect} sx={{ position: "absolute", top: 88, left: "50%", transform: "translateX(-50%)", zIndex: 2 }} />

      <Box sx={{ width: sceneWidth, height: sceneHeight, position: "relative", transform: { xs: "scale(calc(100vw / 1440))", md: "scale(min(calc(100vw / 1440), calc(100vh / 900)))" }, transformOrigin: "center", flexShrink: 0, bgcolor: "#f6f7f9" }} data-node-id="2031:5666">
        <Box sx={{ position: "absolute", top: 176, left: 500, width: 440, display: "grid", gap: 2, textAlign: "center" }}>
          <Typography sx={{ color: "#111111", fontSize: 24, fontWeight: 600, lineHeight: "32px" }}>{title}</Typography>
          <Typography sx={{ color: "#adadad", fontSize: 14, fontWeight: 500, lineHeight: "20px" }}>{descriptionLine1}<br />{descriptionLine2}</Typography>
        </Box>

        <Box sx={{ position: "absolute", top: 312, left: "50%", width: 800, transform: "translateX(-50%)" }}>
          <SearchInput value={countryValue} options={countryOptions} showOptionsOnFocus clearable placeholder={countryPlaceholder} onChange={(event) => onCountryInputChange(event.currentTarget.value)} onOptionSelect={onCountrySelect} sx={{ width: "100%" }} />
        </Box>

        {showCityInput ? (
          <Box sx={{ position: "absolute", top: 424, left: "50%", width: 800, transform: "translateX(-50%)", display: "grid", gap: 3 }}>
            <SearchInput value={cityValue} options={cityOptions} showOptionsOnFocus clearable placeholder={cityPlaceholder} onChange={(event) => onCityInputChange(event.currentTarget.value)} onOptionSelect={onCitySelect} sx={{ width: "100%" }} />
            <CityButtons items={cityItems} value={selectedCityValue} onChange={onCityButtonSelect} sx={{ width: "100%" }} />
          </Box>
        ) : null}

        <Box sx={{ position: "absolute", top: switchTop, left: "50%", width: 800, transform: "translateX(-50%)" }}>
          <SwitchButtons options={workFormatOptions} value={workFormatValue} onChange={onWorkFormatChange} />
        </Box>

        {error ? <Typography role="alert" sx={{ position: "absolute", top: switchTop + 88, left: 0, right: 0, color: "#ff4d4f", fontSize: 14, fontWeight: 700, lineHeight: "20px", textAlign: "center" }}>{error}</Typography> : null}
      </Box>

      <AppButton appStyle="figma" onClick={onNext} disabled={!canContinue || loading} sx={{ position: "absolute", left: "50%", bottom: { xs: 32, md: 80 }, transform: "translateX(-50%)", width: { xs: "calc(100vw - 32px)", md: 548 }, maxWidth: 548, zIndex: 2, bgcolor: "#3d82ff", "&.Mui-disabled": { bgcolor: "#3d82ff", color: "#ffffff", opacity: 0.5 } }}>
        {loading ? loadingLabel : nextLabel}
      </AppButton>
    </Box>
  );
}
