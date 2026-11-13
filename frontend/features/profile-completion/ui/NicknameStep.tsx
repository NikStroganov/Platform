"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { OnboardingScreen } from "./OnboardingScreen";
import { AnonymousArtwork } from "./OnboardingArtwork";
import { DottedBorderInput } from "@/components/ui/dotted-border-input";

const greetingLabel = "\u041f\u0440\u0438\u0432\u0435\u0442,";
const nicknamePlaceholder = "\u0412\u0432\u0435\u0434\u0438 \u0441\u0432\u043e\u0439 \u043d\u0438\u043a\u043d\u0435\u0439\u043c";
const helperBefore = "\u041c\u044b \u0438\u0441\u043f\u043e\u043b\u044c\u0437\u0443\u0435\u043c \u0438\u043c\u0435\u043d\u043d\u043e ";
const helperStrong = "\u043d\u0438\u043a\u043d\u0435\u0439\u043c\u044b, ";
const helperAfter = "\u0447\u0442\u043e\u0431\u044b \u0432\u0430\u0448\u0438";
const helperSecondLine = "\u0434\u0430\u043d\u043d\u044b\u0435 \u0431\u044b\u043b\u0438 \u043f\u043e\u043b\u043d\u043e\u0441\u0442\u044c\u044e \u0430\u043d\u043e\u043d\u0438\u043c\u043d\u044b\u043c\u0438";

type NicknameStepProps = {
  value: string;
  canContinue: boolean;
  loading?: boolean;
  error?: string;
  currentStep: number;
  stepCount: number;
  onChange: (value: string) => void;
  onNext: () => void;
  onStepSelect: (index: number) => void;
};

export function NicknameStep({ value, canContinue, loading, error, currentStep, stepCount, onChange, onNext, onStepSelect }: NicknameStepProps) {
  return (
    <OnboardingScreen nodeId="2238:6762" canContinue={canContinue} loading={loading} loadingLabel="Проверяем..." currentStep={currentStep} stepCount={stepCount} onNext={onNext} onStepSelect={onStepSelect}>
      <Box sx={{ position: "fixed", inset: 0, overflow: "hidden", pointerEvents: "none" }}><AnonymousArtwork /></Box>
      <Box sx={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center", gap: 3, pt: { xs: "96px", md: error ? "max(147px, calc(50dvh - 211px))" : "max(160px, calc(50dvh - 198px))" } }}>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 1, maxWidth: "100%" }}>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1.5, maxWidth: "100%", "& input": { width: { xs: "min(280px, calc(100vw - 135px))", sm: 280 }, height: 44, minHeight: 44, fontSize: { xs: 18, sm: 24 }, px: { xs: 1, sm: "20px" } } }}>
            <Typography component="h1" sx={{ color: "#111111", fontSize: 24, fontWeight: 600, lineHeight: "32px", whiteSpace: "nowrap" }}>{greetingLabel}</Typography>
            <DottedBorderInput aria-label={nicknamePlaceholder} aria-describedby={error ? "nickname-error" : undefined} aria-invalid={Boolean(error)} value={value} placeholder={nicknamePlaceholder} error={Boolean(error)} onChange={(event) => onChange(event.currentTarget.value)} onKeyDown={(event) => { if (event.key === "Enter" && canContinue && !loading) onNext(); }} />
          </Box>
          {error ? <Typography id="nickname-error" role="alert" sx={{ width: { xs: "min(280px, calc(100vw - 135px))", sm: 280 }, color: "#ff4d4f", fontSize: 14, fontWeight: 500, lineHeight: "18px" }}>{error}</Typography> : null}
        </Box>
        <Typography sx={{ color: "#adadad", fontSize: 14, fontWeight: 500, lineHeight: "20px", textAlign: "center" }}>{helperBefore}<Box component="span" sx={{ fontWeight: 800 }}>{helperStrong}</Box>{helperAfter}<br />{helperSecondLine}</Typography>
      </Box>
    </OnboardingScreen>
  );
}
