"use client";

import type { ReactNode } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { AppStepper } from "@/components/shared/app-stepper";
import { AppButton } from "@/components/ui/app-button";

export function CareItLogo() {
  return (
    <Box data-testid="onboarding-frame-logo" sx={{ position: "absolute", top: 16, left: "50%", transform: "translateX(-50%)", width: 115, height: 48, zIndex: 2 }}>
      <Box component="img" src="/onboarding/careit-logo-mark.svg" alt="" sx={{ position: "absolute", left: 8.774, top: 7 }} />
      <Typography sx={{ position: "absolute", left: 48.5, top: 12, color: "#111111", fontSize: 18, fontWeight: 700, lineHeight: "24px" }}>CareIT</Typography>
    </Box>
  );
}

export type OnboardingNavigationProps = {
  currentStep: number;
  stepCount: number;
  loading?: boolean;
  error?: string;
  onNext: () => void;
  onStepSelect: (index: number) => void;
};

type OnboardingScreenProps = OnboardingNavigationProps & {
  children: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  descriptionWidth?: number;
  descriptionGap?: number;
  contentGap?: number;
  canContinue: boolean;
  primaryLabel?: string;
  loadingLabel?: string;
  nodeId: string;
};

// Keep the 1440 × 900 design's dimensions without scaling text or controls.
export function OnboardingScreen({ children, title, description, descriptionWidth = 392, descriptionGap = 16, contentGap = 80, canContinue, currentStep, stepCount, loading, error, onNext, onStepSelect, primaryLabel = "Далее", loadingLabel = "Сохраняем...", nodeId }: OnboardingScreenProps) {
  return (
    <Box component="main" data-node-id={nodeId} sx={{ position: "relative", minHeight: "100dvh", bgcolor: "#f6f7f9", color: "#111111", display: "flex", flexDirection: "column", alignItems: "center", pt: "144px", px: 2 }}>
      <CareItLogo />
      <AppStepper count={stepCount} value={currentStep} onChange={(index) => { if (!loading) onStepSelect(index); }} sx={{ position: "absolute", top: 88, left: "50%", transform: "translateX(-50%)", width: "min(884px, calc(100% - 32px))", gap: { xs: "8px", md: "12px" }, zIndex: 2, "& [role=tab]": { flex: 1, width: "auto", minWidth: 0, pointerEvents: loading ? "none" : "auto" } }} />
      {title ? (
        <Box component="header" sx={{ width: "100%", maxWidth: 480, display: "flex", flexDirection: "column", alignItems: "center", gap: `${descriptionGap}px`, textAlign: "center" }}>
          <Typography component="h1" sx={{ fontSize: 24, fontWeight: 600, lineHeight: "32px", width: "100%" }}>{title}</Typography>
          {description ? <Typography sx={{ width: "100%", maxWidth: descriptionWidth, color: "#adadad", fontSize: 14, fontWeight: 500, lineHeight: "20px" }}>{description}</Typography> : null}
        </Box>
      ) : null}
      <Box sx={{ width: "100%", maxWidth: 800, mt: title ? { xs: `${Math.min(contentGap, 48)}px`, md: `${contentGap}px` } : 0, position: "relative" }}>
        {children}
        {error ? <Typography role="alert" sx={{ mt: 2, color: "#ff4d4f", fontSize: 14, fontWeight: 500, lineHeight: "18px", textAlign: "center" }}>{error}</Typography> : null}
      </Box>
      <Box component="footer" sx={{ mt: "auto", pt: { xs: 6, md: 8.5 }, pb: { xs: "32px", md: "80px" }, width: "100%", display: "flex", justifyContent: "center", position: "relative", zIndex: 1 }}>
        <AppButton appStyle="figma" onClick={onNext} disabled={!canContinue || loading} sx={{ width: "100%", maxWidth: 480, height: 48, minHeight: 48, fontSize: 16, fontWeight: 500, lineHeight: "20px", bgcolor: "#3d82ff", "&.Mui-disabled": { bgcolor: "#3d82ff", color: "#ffffff", opacity: 0.5 } }}>{loading ? loadingLabel : primaryLabel}</AppButton>
      </Box>
    </Box>
  );
}
