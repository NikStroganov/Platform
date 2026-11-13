"use client";

import Box from "@mui/material/Box";

import { CityButtons, type CityButtonItem } from "@/components/shared/city-buttons";
import { SearchInput, type SearchInputOption } from "@/components/shared/search-input";
import { SwitchButtons, type SwitchButtonsOption } from "@/components/shared/switch-buttons";

import { OnboardingScreen } from "./OnboardingScreen";

const title = "\u0423\u043a\u0430\u0436\u0438 \u043e\u0444\u0438\u0441 \u0438 \u0444\u043e\u0440\u043c\u0430\u0442 \u0440\u0430\u0431\u043e\u0442\u044b";
const descriptionLine1 = "\u0412\u044b\u0431\u0435\u0440\u0438 \u0433\u043e\u0440\u043e\u0434, \u0432 \u043a\u043e\u0442\u043e\u0440\u043e\u043c \u043d\u0430\u0445\u043e\u0434\u0438\u0442\u0441\u044f";
const descriptionLine2 = "\u043e\u0442\u0434\u0435\u043b\u0435\u043d\u0438\u0435/\u043e\u0444\u0438\u0441, \u0433\u0434\u0435 \u0442\u044b \u0447\u0438\u0441\u043b\u0438\u0448\u044c\u0441\u044f \u043a\u0430\u043a \u0440\u0430\u0431\u043e\u0442\u043d\u0438\u043a";
const countryPlaceholder = "\u041d\u0430\u0437\u0432\u0430\u043d\u0438\u0435 \u0441\u0442\u0440\u0430\u043d\u044b";
const cityPlaceholder = "\u041d\u0430\u0437\u0432\u0430\u043d\u0438\u0435 \u0433\u043e\u0440\u043e\u0434\u0430";

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

export function LocationStep({ countryValue, cityValue, selectedCityValue, workFormatValue, countryOptions, cityOptions, cityItems, workFormatOptions, showCityInput, canContinue, loading, error, currentStep, stepCount, onCountryInputChange, onCountrySelect, onCityInputChange, onCitySelect, onCityButtonSelect, onWorkFormatChange, onNext, onStepSelect }: LocationStepProps) {
  return (
    <OnboardingScreen nodeId="2238:7218" title={title} description={<>{descriptionLine1}<br />{descriptionLine2}</>} canContinue={canContinue} loading={loading} error={error} currentStep={currentStep} stepCount={stepCount} onNext={onNext} onStepSelect={onStepSelect}>
      <Box sx={{ display: "grid", gap: 6 }}>
        <SearchInput value={countryValue} options={countryOptions} showOptionsOnFocus clearable hideSearchIcon placeholder={countryPlaceholder} onChange={(event) => onCountryInputChange(event.currentTarget.value)} onOptionSelect={onCountrySelect} />
        {showCityInput ? (
          <Box sx={{ display: "grid", gap: 3 }}>
            <SearchInput value={cityValue} options={cityOptions} showOptionsOnFocus clearable placeholder={cityPlaceholder} onChange={(event) => onCityInputChange(event.currentTarget.value)} onOptionSelect={onCitySelect} />
            <CityButtons items={cityItems} value={selectedCityValue} onChange={onCityButtonSelect} sx={{ "& > button": { minHeight: 36, lineHeight: "24px" } }} />
          </Box>
        ) : null}
        <SwitchButtons options={workFormatOptions} value={workFormatValue} onChange={onWorkFormatChange} sx={{ "& > button": { fontSize: { xs: 16, sm: 20 } } }} />
      </Box>
    </OnboardingScreen>
  );
}
