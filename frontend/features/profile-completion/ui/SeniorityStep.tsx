"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { FieldInput } from "@/components/shared/field-input";
import { GradeSelect } from "@/components/shared/grade-select";
import { ToggleWithLabel } from "@/components/shared/toggle-with-label";

import { OnboardingScreen } from "./OnboardingScreen";

const title = "\u0423\u0440\u043e\u0432\u0435\u043d\u044c \u0432 \u043f\u0440\u043e\u0444\u0435\u0441\u0441\u0438\u0438 \u0438 \u043f\u0435\u0440\u0438\u043e\u0434 \u0440\u0430\u0431\u043e\u0442\u044b";
const descriptionLine1 = "\u041e\u0431\u0449\u0438\u043c\u0438 \u0433\u0440\u0435\u0439\u0434\u0430\u043c\u0438 \u0430\u043d\u0430\u043b\u0438\u0437\u0438\u0440\u043e\u0432\u0430\u0442\u044c \u043b\u0435\u0433\u0447\u0435. \u0415\u0441\u043b\u0438 \u0432 \u0432\u0430\u0448\u0435\u0439 \u043a\u043e\u043c\u043f\u0430\u043d\u0438\u0438";
const descriptionLine2 = "\u043d\u0435 \u0442\u0430\u043a, \u043f\u043e\u0434\u0431\u0435\u0440\u0438\u0442\u0435 \u0431\u043b\u0438\u0436\u0430\u0439\u0448\u0438\u0439 \u043d\u0430 \u0432\u0430\u0448 \u0432\u0437\u0433\u043b\u044f\u0434";
const toggleLabel = "\u0414\u043e\u043f\u043e\u043b\u043d\u0438\u0442\u0435\u043b\u044c\u043d\u043e \u0443\u043a\u0430\u0437\u0430\u0442\u044c \u0433\u0440\u0435\u0439\u0434 \u043f\u043e \u043f\u0440\u0430\u0432\u0438\u043b\u0430\u043c \u043a\u043e\u043c\u043f\u0430\u043d\u0438\u0438";
const gradePlaceholder = "\u041d\u0430\u0437\u0432\u0430\u043d\u0438\u0435 \u0438\u043b\u0438 \u043e\u0431\u043e\u0437\u043d\u0430\u0447\u0435\u043d\u0438\u0435 \u0433\u0440\u0435\u0439\u0434\u0430";
const experiencePlaceholder = "\u041d\u0430\u043f\u0440\u0438\u043c\u0435\u0440, 5";

export type SeniorityStepProps = {
  gradeOptions: string[];
  gradeValue: string;
  hasCompanyGrade: boolean;
  companyGrade: string;
  workExperienceYears: string;
  canContinue: boolean;
  loading?: boolean;
  error?: string;
  currentStep: number;
  stepCount: number;
  onGradeChange: (value: string) => void;
  onHasCompanyGradeChange: (value: boolean) => void;
  onCompanyGradeChange: (value: string) => void;
  onWorkExperienceYearsChange: (value: string) => void;
  onNext: () => void;
  onStepSelect: (index: number) => void;
};

export function SeniorityStep({ gradeOptions, gradeValue, hasCompanyGrade, companyGrade, workExperienceYears, canContinue, loading, error, currentStep, stepCount, onGradeChange, onHasCompanyGradeChange, onCompanyGradeChange, onWorkExperienceYearsChange, onNext, onStepSelect }: SeniorityStepProps) {
  return (
    <OnboardingScreen nodeId={hasCompanyGrade ? "2238:6803" : "2238:6857"} title={title} description={<>{descriptionLine1}<br />{descriptionLine2}</>} descriptionWidth={480} descriptionGap={24} contentGap={hasCompanyGrade ? 112 : 80} canContinue={canContinue} loading={loading} error={error} currentStep={currentStep} stepCount={stepCount} onNext={onNext} onStepSelect={onStepSelect}>
      <Box sx={{ display: "grid", gap: 6 }}>
        <GradeSelect options={gradeOptions} value={gradeValue} onChange={onGradeChange} previousIconSrc="/onboarding/grade-chevron-left.svg" nextIconSrc="/onboarding/grade-chevron-right.svg" sx={{ gap: { xs: 1.5, md: 4 }, "& > button": { width: { xs: 48, md: 64 }, height: { xs: 48, md: 64 } }, "& [role=option]": { fontSize: { xs: 16, md: 24 }, "&[aria-selected=true]": { fontSize: { xs: 32, md: 48 } } } }} />
        <Box sx={{ display: "grid", gap: 2 }}>
          <ToggleWithLabel label={toggleLabel} checked={hasCompanyGrade} onChange={onHasCompanyGradeChange} labelSx={{ fontSize: 14, lineHeight: "20px" }} />
          {hasCompanyGrade ? <FieldInput value={companyGrade} onChange={(event) => onCompanyGradeChange(event.currentTarget.value)} placeholder={gradePlaceholder} /> : null}
        </Box>
        <Box sx={{ display: "grid", gap: 1 }}>
          <FieldInput type="number" inputMode="numeric" value={workExperienceYears} onChange={(event) => onWorkExperienceYearsChange(event.currentTarget.value)} placeholder={experiencePlaceholder} postfix="лет" />
          <Typography sx={{ color: "#adadad", fontSize: 14, fontWeight: 500, lineHeight: "18px" }}>Если работаете меньше года, то указывайте «1»</Typography>
        </Box>
      </Box>
    </OnboardingScreen>
  );
}
