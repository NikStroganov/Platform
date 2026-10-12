"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { AppStepper } from "@/components/shared/app-stepper";
import CoinsStackedIconAsset from "@/components/shared/icon/icons/coins-stacked-03.svg";
import { FieldInput } from "@/components/shared/field-input";
import { SwitchButtons, type SwitchButtonsOption } from "@/components/shared/switch-buttons";
import { ToggleWithLabel } from "@/components/shared/toggle-with-label";
import { AppButton } from "@/components/ui/app-button";

const sceneWidth = 1440;
const sceneHeight = 900;
const coinsIconSrc = (CoinsStackedIconAsset as unknown as { src: string }).src;
const title = "\u0423\u0440\u043e\u0432\u0435\u043d\u044c \u0434\u043e\u0445\u043e\u0434\u0430";
const descriptionLine1 = "\u041e\u0431\u0449\u0438\u043c\u0438 \u0433\u0440\u0435\u0439\u0434\u0430\u043c\u0438 \u0430\u043d\u0430\u043b\u0438\u0437\u0438\u0440\u043e\u0432\u0430\u0442\u044c \u043b\u0435\u0433\u0447\u0435. \u0415\u0441\u043b\u0438 \u0432 \u0432\u0430\u0448\u0435\u0439 \u043a\u043e\u043c\u043f\u0430\u043d\u0438\u0438";
const descriptionLine2 = "\u043d\u0435 \u0442\u0430\u043a, \u043f\u043e\u0434\u0431\u0435\u0440\u0438\u0442\u0435 \u0431\u043b\u0438\u0436\u0430\u0439\u0448\u0438\u0439 \u043d\u0430 \u0432\u0430\u0448 \u0432\u0437\u0433\u043b\u044f\u0434";
const salaryPlaceholder = "\u0417\u0430\u0440\u043f\u043b\u0430\u0442\u0430";
const bonusPlaceholder = "\u0421\u0443\u043c\u043c\u0430 \u0431\u043e\u043d\u0443\u0441\u043e\u0432 \u0437\u0430 \u0433\u043e\u0434";
const bonusToggleLabel = "\u0423\u043a\u0430\u0437\u0430\u0442\u044c \u043f\u0440\u0435\u043c\u0438\u044e";
const nextLabel = "\u0414\u0430\u043b\u0435\u0435";
const loadingLabel = "\u0421\u043e\u0445\u0440\u0430\u043d\u044f\u0435\u043c...";

export type CompensationStepProps = {
  currency: string;
  salary: string;
  hasBonus: boolean;
  bonus: string;
  currencyOptions: SwitchButtonsOption[];
  canContinue: boolean;
  loading?: boolean;
  error?: string;
  currentStep: number;
  stepCount: number;
  onCurrencyChange: (value: string) => void;
  onSalaryChange: (value: string) => void;
  onHasBonusChange: (value: boolean) => void;
  onBonusChange: (value: string) => void;
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

export function CompensationStep({ currency, salary, hasBonus, bonus, currencyOptions, canContinue, loading, error, currentStep, stepCount, onCurrencyChange, onSalaryChange, onHasBonusChange, onBonusChange, onNext, onStepSelect }: CompensationStepProps) {
  const postfix = currency === "USD" ? "$" : "\u20bd";

  return (
    <Box component="main" sx={{ minHeight: "100vh", bgcolor: "#f6f7f9", display: "grid", placeItems: "center", overflow: "hidden", position: "relative" }}>
      <CareItLogo />
      <AppStepper count={stepCount} value={currentStep} onChange={onStepSelect} sx={{ position: "absolute", top: 88, left: "50%", transform: "translateX(-50%)", zIndex: 2 }} />

      <Box sx={{ width: sceneWidth, height: sceneHeight, position: "relative", transform: { xs: "scale(calc(100vw / 1440))", md: "scale(min(calc(100vw / 1440), calc(100vh / 900)))" }, transformOrigin: "center", flexShrink: 0, bgcolor: "#f6f7f9" }} data-node-id="2031:5473">
        <Box sx={{ position: "absolute", top: 176, left: "50%", width: 440, transform: "translateX(-50%)", display: "grid", gap: 3, textAlign: "center" }}>
          <Typography sx={{ color: "#111111", fontSize: 24, fontWeight: 600, lineHeight: "32px" }}>{title}</Typography>
          <Typography sx={{ color: "#adadad", fontSize: 14, fontWeight: 500, lineHeight: "20px" }}>{descriptionLine1}<br />{descriptionLine2}</Typography>
        </Box>

        <Box sx={{ position: "absolute", top: 320, left: "50%", width: 800, transform: "translateX(-50%)", display: "grid", gap: 3 }}>
          <SwitchButtons options={currencyOptions} value={currency} onChange={onCurrencyChange} />
          <FieldInput type="number" inputMode="numeric" value={salary} onChange={(event) => onSalaryChange(event.currentTarget.value)} placeholder={salaryPlaceholder} prefixImageSrc={coinsIconSrc} postfix={postfix} sx={{ width: "100%" }} />

          <Box sx={{ display: "grid", gap: 2, width: "100%" }}>
            <ToggleWithLabel label={bonusToggleLabel} checked={hasBonus} onChange={onHasBonusChange} sx={{ "& .MuiFormControlLabel-label": { fontSize: 14, lineHeight: "20px", width: 440 } }} />
            {hasBonus ? <FieldInput type="number" inputMode="numeric" value={bonus} onChange={(event) => onBonusChange(event.currentTarget.value)} placeholder={bonusPlaceholder} prefixImageSrc="/onboarding/compensation-gift-01.svg" postfix={postfix} sx={{ width: "100%" }} /> : null}
          </Box>

          {error ? <Typography role="alert" sx={{ color: "#ff4d4f", fontSize: 14, fontWeight: 700, lineHeight: "20px", textAlign: "center" }}>{error}</Typography> : null}
        </Box>
      </Box>

      <AppButton appStyle="figma" onClick={onNext} disabled={!canContinue || loading} sx={{ position: "absolute", left: "50%", bottom: { xs: 32, md: 80 }, transform: "translateX(-50%)", width: { xs: "calc(100vw - 32px)", md: 548 }, maxWidth: 548, zIndex: 2, bgcolor: "#3d82ff", "&.Mui-disabled": { bgcolor: "#3d82ff", color: "#ffffff", opacity: 0.5 } }}>
        {loading ? loadingLabel : nextLabel}
      </AppButton>
    </Box>
  );
}
