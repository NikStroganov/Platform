"use client";

import type { ReactNode } from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { AppStepper } from "@/components/shared/app-stepper";
import { AppButton } from "@/components/ui/app-button";

export type ProfileCompletionLayoutProps = {
  children: ReactNode;
  currentStep: number;
  stepCount: number;
  title: string;
  description?: string;
  primaryLabel: string;
  canContinue: boolean;
  loading?: boolean;
  error?: string;
  showProgress?: boolean;
  onBack: () => void;
  onNext: () => void;
  onStepSelect: (index: number) => void;
};

export function ProfileCompletionLayout({
  children,
  currentStep,
  stepCount,
  title,
  description,
  primaryLabel,
  canContinue,
  loading,
  error,
  showProgress = true,
  onBack,
  onNext,
  onStepSelect,
}: ProfileCompletionLayoutProps) {
  return (
    <Box
      component="main"
      sx={{
        minHeight: "100vh",
        bgcolor: "#f8f7fc",
        color: "#111111",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        px: { xs: 2, md: 5 },
        py: 2,
      }}
    >
      <Box sx={{ height: 48, display: "flex", alignItems: "center", gap: 1.5, fontSize: 20, fontWeight: 700 }}>
        <Box sx={{ width: 32, height: 32, borderRadius: "50%", bgcolor: "primary.main" }} />
        CareIT
      </Box>

      <Box sx={{ width: "100%", maxWidth: 884, minHeight: 28, mt: 3 }}>
        {showProgress ? (
          <AppStepper count={stepCount} value={currentStep} onChange={onStepSelect} sx={{ justifyContent: "center" }} />
        ) : null}
      </Box>

      <Box
        sx={{
          width: "100%",
          maxWidth: 800,
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 5,
          py: { xs: 5, md: 8 },
        }}
      >
        <Box sx={{ width: "100%", maxWidth: 520, textAlign: "center" }}>
          <Typography component="h1" sx={{ fontSize: { xs: 28, md: 32 }, fontWeight: 700, lineHeight: "40px" }}>
            {title}
          </Typography>
          {description ? (
            <Typography sx={{ mt: 2.5, color: "#5f6368", fontSize: 16, fontWeight: 500, lineHeight: "22px" }}>
              {description}
            </Typography>
          ) : null}
        </Box>

        <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>{children}</Box>

        {error ? (
          <Typography role="alert" sx={{ color: "error.main", fontSize: 14, fontWeight: 600, lineHeight: "20px" }}>
            {error}
          </Typography>
        ) : null}
      </Box>

      <Box sx={{ width: "100%", maxWidth: 548, display: "flex", gap: 2, pb: 8 }}>
        <AppButton appStyle="figma" variant="outlined" onClick={onBack} disabled={loading || currentStep === 0} sx={{ flex: 1 }}>
          Назад
        </AppButton>
        <AppButton appStyle="figma" onClick={onNext} disabled={!canContinue || loading} sx={{ flex: 2 }}>
          {loading ? "Подождите..." : primaryLabel}
        </AppButton>
      </Box>
    </Box>
  );
}
