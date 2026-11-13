"use client";

import Box from "@mui/material/Box";

import { FieldInput } from "@/components/shared/field-input";
import { SwitchButtons, type SwitchButtonsOption } from "@/components/shared/switch-buttons";
import { ToggleWithLabel } from "@/components/shared/toggle-with-label";

import { OnboardingScreen } from "./OnboardingScreen";

const title = "Уровень дохода";
const descriptionLine1 = "\u041e\u0431\u0449\u0438\u043c\u0438 \u0433\u0440\u0435\u0439\u0434\u0430\u043c\u0438 \u0430\u043d\u0430\u043b\u0438\u0437\u0438\u0440\u043e\u0432\u0430\u0442\u044c \u043b\u0435\u0433\u0447\u0435. \u0415\u0441\u043b\u0438 \u0432 \u0432\u0430\u0448\u0435\u0439 \u043a\u043e\u043c\u043f\u0430\u043d\u0438\u0438";
const descriptionLine2 = "\u043d\u0435 \u0442\u0430\u043a, \u043f\u043e\u0434\u0431\u0435\u0440\u0438\u0442\u0435 \u0431\u043b\u0438\u0436\u0430\u0439\u0448\u0438\u0439 \u043d\u0430 \u0432\u0430\u0448 \u0432\u0437\u0433\u043b\u044f\u0434";
const salaryPlaceholder = "\u0417\u0430\u0440\u043f\u043b\u0430\u0442\u0430";
const bonusPlaceholder = "\u0421\u0443\u043c\u043c\u0430 \u0431\u043e\u043d\u0443\u0441\u043e\u0432 \u0437\u0430 \u0433\u043e\u0434";
const bonusToggleLabel = "\u0423\u043a\u0430\u0437\u0430\u0442\u044c \u043f\u0440\u0435\u043c\u0438\u044e";

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

export function CompensationStep({ currency, salary, hasBonus, bonus, currencyOptions, canContinue, loading, error, currentStep, stepCount, onCurrencyChange, onSalaryChange, onHasBonusChange, onBonusChange, onNext, onStepSelect }: CompensationStepProps) {
  const postfix = currency === "USD" ? "$" : "₽";
  const fieldSx = { width: "100%", "& .MuiOutlinedInput-root": { gap: 2 }, "& .MuiInputAdornment-positionStart, & .MuiInputAdornment-positionStart img": { width: 28, height: 28 } };
  return (
    <OnboardingScreen nodeId="2238:6911" title={title} description={<>{descriptionLine1}<br />{descriptionLine2}</>} descriptionWidth={480} descriptionGap={24} canContinue={canContinue} loading={loading} error={error} currentStep={currentStep} stepCount={stepCount} onNext={onNext} onStepSelect={onStepSelect}>
      <Box sx={{ display: "grid", gap: 3 }}>
        <SwitchButtons options={currencyOptions} value={currency} onChange={onCurrencyChange} />
        <FieldInput type="number" inputMode="numeric" value={salary} onChange={(event) => onSalaryChange(event.currentTarget.value)} placeholder={salaryPlaceholder} prefixImageSrc="/onboarding/compensation-coins.svg" postfix={postfix} sx={fieldSx} />
        <Box sx={{ display: "grid", gap: 2 }}>
          <ToggleWithLabel label={bonusToggleLabel} checked={hasBonus} onChange={onHasBonusChange} labelSx={{ fontSize: 14, lineHeight: "20px" }} />
          {hasBonus ? <FieldInput type="number" inputMode="numeric" value={bonus} onChange={(event) => onBonusChange(event.currentTarget.value)} placeholder={bonusPlaceholder} prefixImageSrc="/onboarding/compensation-gift-01.svg" postfix={postfix} sx={fieldSx} /> : null}
        </Box>
      </Box>
    </OnboardingScreen>
  );
}
