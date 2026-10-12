"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { AppStepper } from "@/components/shared/app-stepper";
import { AppButton } from "@/components/ui/app-button";
import { DottedBorderInput } from "@/components/ui/dotted-border-input";

const sceneWidth = 1440;
const sceneHeight = 900;
const greetingLabel = "\u041f\u0440\u0438\u0432\u0435\u0442,";
const nicknamePlaceholder = "\u0412\u0432\u0435\u0434\u0438 \u0441\u0432\u043e\u0439 \u043d\u0438\u043a\u043d\u0435\u0439\u043c";
const helperBefore = "\u041c\u044b \u0438\u0441\u043f\u043e\u043b\u044c\u0437\u0443\u0435\u043c \u0438\u043c\u0435\u043d\u043d\u043e ";
const helperStrong = "\u043d\u0438\u043a\u043d\u0435\u0439\u043c\u044b, ";
const helperAfter = "\u0447\u0442\u043e\u0431\u044b \u0432\u0430\u0448\u0438";
const helperSecondLine = "\u0434\u0430\u043d\u043d\u044b\u0435 \u0431\u044b\u043b\u0438 \u043f\u043e\u043b\u043d\u043e\u0441\u0442\u044c\u044e \u0430\u043d\u043e\u043d\u0438\u043c\u043d\u044b\u043c\u0438";
const nextLabel = "\u0414\u0430\u043b\u0435\u0435";
const loadingLabel = "\u041f\u0440\u043e\u0432\u0435\u0440\u044f\u0435\u043c...";

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

function CareItLogo() {
  return (
    <Box data-testid="onboarding-frame-logo" sx={{ position: "absolute", top: 16, left: "50%", transform: "translateX(-50%)", width: 115, height: 48 }}>
      <Box component="img" src="/onboarding/careit-logo-mark.svg" alt="" sx={{ position: "absolute", left: 8.77, top: 7, width: 31.45, height: 34 }} />
      <Typography sx={{ position: "absolute", left: 48.5, top: 12, color: "#111111", fontSize: 18, fontWeight: 700, lineHeight: "24px" }}>
        CareIT
      </Typography>
    </Box>
  );
}

function BackgroundImage({ src, sx }: { src: string; sx: object }) {
  return <Box component="img" src={src} alt="" sx={{ position: "absolute", objectFit: "cover", pointerEvents: "none", ...sx }} />;
}

function DecorativeBackground() {
  return (
    <>
      <Box sx={{ position: "absolute", left: 383, top: 59, width: 687.48, height: 255.49, transform: "rotate(1deg)", overflow: "hidden" }}>
        <BackgroundImage src="/onboarding/intro-anonymous-chart.png" sx={{ inset: 0, width: "100%", height: "100%" }} />
        <Box sx={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, #f6f7f9 10.9%, rgba(246,247,249,0) 100%)" }} />
      </Box>

      <Box sx={{ position: "absolute", left: 189.68, top: 437.06, width: 280.16, height: 264.05, transform: "rotate(4deg)", overflow: "hidden" }}>
        <BackgroundImage src="/onboarding/intro-anonymous-card-left.png" sx={{ inset: 0, width: "100%", height: "100%" }} />
        <Box sx={{ position: "absolute", inset: 0, background: "linear-gradient(219deg, rgba(246,247,249,0) 9%, #f6f7f9 71%)" }} />
      </Box>

      <Box sx={{ position: "absolute", left: 531, top: 610.55, width: 263.63, height: 246.26, overflow: "hidden" }}>
        <BackgroundImage src="/onboarding/intro-anonymous-card-bottom.png" sx={{ inset: 0, width: "100%", height: "100%" }} />
        <Box sx={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(246,247,249,0) 0%, #f6f7f9 73.5%)" }} />
      </Box>

      <Box sx={{ position: "absolute", left: 918.03, top: 500.39, width: 287.93, height: 272.46, transform: "rotate(6deg)", overflow: "hidden" }}>
        <BackgroundImage src="/onboarding/intro-anonymous-card-right.png" sx={{ inset: 0, width: "100%", height: "100%" }} />
        <Box sx={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(246,247,249,0) 6.5%, #f6f7f9 67%)" }} />
      </Box>
    </>
  );
}

export function NicknameStep({ value, canContinue, loading, error, currentStep, stepCount, onChange, onNext, onStepSelect }: NicknameStepProps) {
  return (
    <Box component="main" sx={{ minHeight: "100vh", bgcolor: "#f6f7f9", display: "grid", placeItems: "center", overflow: "hidden", position: "relative" }}>
      <CareItLogo />

      <AppStepper
        count={stepCount}
        value={currentStep}
        onChange={onStepSelect}
        sx={{ position: "absolute", top: 88, left: "50%", transform: "translateX(-50%)", zIndex: 2 }}
      />

      <Box
        sx={{
          width: sceneWidth,
          height: sceneHeight,
          position: "relative",
          transform: { xs: "scale(calc(100vw / 1440))", md: "scale(min(calc(100vw / 1440), calc(100vh / 900)))" },
          transformOrigin: "center",
          flexShrink: 0,
          bgcolor: "#f6f7f9",
        }}
        data-node-id="2031:5331"
      >
        <DecorativeBackground />


        <Box sx={{ position: "absolute", top: 281, left: 0, right: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
          <Box sx={{ height: 44, display: "flex", alignItems: "center", justifyContent: "center", gap: 1.5 }}>
            <Typography sx={{ color: "#111111", fontSize: 24, fontWeight: 600, lineHeight: "32px", whiteSpace: "nowrap" }}>{greetingLabel}</Typography>
            <DottedBorderInput
              aria-label={nicknamePlaceholder}
              value={value}
              placeholder={nicknamePlaceholder}
              error={Boolean(error)}
              onChange={(event) => onChange(event.currentTarget.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter" && canContinue && !loading) {
                  onNext();
                }
              }}
            />
          </Box>

          <Typography sx={{ color: "#adadad", fontSize: 14, fontWeight: 500, lineHeight: "20px", textAlign: "center" }}>
            {helperBefore}
            <Box component="span" sx={{ fontWeight: 800 }}>
              {helperStrong}
            </Box>
            {helperAfter}
            <br />{helperSecondLine}
          </Typography>

          {error ? (
            <Typography role="alert" sx={{ color: "#ff4d4f", fontSize: 14, fontWeight: 700, lineHeight: "20px", textAlign: "center" }}>
              {error}
            </Typography>
          ) : null}
        </Box>
      </Box>

      <AppButton
        appStyle="figma"
        onClick={onNext}
        disabled={!canContinue || loading}
        sx={{
          position: "absolute",
          left: "50%",
          bottom: { xs: 32, md: 80 },
          transform: "translateX(-50%)",
          width: { xs: "calc(100vw - 32px)", md: 548 },
          maxWidth: 548,
          zIndex: 2,
          bgcolor: "#3d82ff",
          "&.Mui-disabled": {
            bgcolor: "#3d82ff",
            color: "#ffffff",
            opacity: 0.5,
          },
        }}
      >
        {loading ? loadingLabel : nextLabel}
      </AppButton>
    </Box>
  );
}