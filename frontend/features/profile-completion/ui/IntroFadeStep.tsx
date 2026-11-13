"use client";

import * as React from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { CareItLogo } from "./OnboardingScreen";
import { AnonymousArtwork, WelcomeArtwork } from "./OnboardingArtwork";
import { AppButton } from "@/components/ui/app-button";

const fadeMs = 900;
const firstSceneMs = 5000;
const welcomeTitle = "\u0414\u043e\u0431\u0440\u043e \u043f\u043e\u0436\u0430\u043b\u043e\u0432\u0430\u0442\u044c \u043d\u0430 CareIt! \u041c\u044b \u0434\u0435\u043b\u0430\u0435\u043c \u0440\u044b\u043d\u043e\u043a \u043f\u0440\u043e\u0437\u0440\u0430\u0447\u043d\u044b\u043c \u0438 \u043f\u043e\u043d\u044f\u0442\u043d\u044b\u043c";
const anonymousCopy = [
  "\u041c\u044b \u0445\u043e\u0442\u0438\u043c \u043f\u043e\u043a\u0430\u0437\u0430\u0442\u044c \u0440\u0435\u0430\u043b\u044c\u043d\u044b\u0435 \u0434\u0430\u043d\u043d\u044b\u0435,",
  "\u043f\u043e\u044d\u0442\u043e\u043c\u0443 \u0437\u0430\u0434\u0430\u0434\u0438\u043c \u0432\u043e\u043f\u0440\u043e\u0441\u044b \u043e \u0432\u0430\u0448\u0435\u0439 \u0440\u0430\u0431\u043e\u0442\u0435.",
  "\u041d\u043e \u0445\u0440\u0430\u043d\u0438\u043c \u0434\u0430\u043d\u043d\u044b\u0435 \u0438\u0441\u043a\u043b\u044e\u0447\u0438\u0442\u0435\u043b\u044c\u043d\u043e \u0430\u043d\u043e\u043d\u0438\u043c\u043d\u043e",
];
const nextLabel = "\u0418\u0434\u0435\u043c \u0434\u0430\u043b\u044c\u0448\u0435";

export function IntroFadeStep({ onNext, loading }: { onNext: () => void; loading?: boolean }) {
  const [activeSlide, setActiveSlide] = React.useState<"welcome" | "anonymous">("welcome");
  React.useEffect(() => {
    const timeout = window.setTimeout(() => setActiveSlide("anonymous"), firstSceneMs);
    return () => window.clearTimeout(timeout);
  }, []);
  const showAnonymous = activeSlide === "anonymous";
  return (
    <Box component="main" sx={{ minHeight: { xs: "max(680px, 100dvh)", md: "max(820px, 100dvh)" }, bgcolor: "#f6f7f9", overflow: "clip", position: "relative", color: "#111111" }}>
      <CareItLogo />
      <Box aria-hidden={showAnonymous} sx={{ position: "absolute", inset: 0, opacity: showAnonymous ? 0 : 1, transition: `opacity ${fadeMs}ms ease`, "@media (prefers-reduced-motion: reduce)": { transition: "none" } }}>
        <Box data-node-id="2031:6237" sx={{ position: "absolute", inset: 0 }}>
          <Typography component="h1" sx={{ position: "absolute", top: { xs: 160, md: 192 }, left: "50%", transform: "translateX(-50%)", width: "calc(100% - 32px)", maxWidth: 554, fontSize: 24, fontWeight: 600, lineHeight: "32px", textAlign: "center" }}>{welcomeTitle}</Typography>
          <Box sx={{ position: "absolute", top: { xs: 320, md: 316 }, left: "50%", transform: "translateX(-50%)" }}><WelcomeArtwork /></Box>
        </Box>
      </Box>
      <Box aria-hidden={!showAnonymous} sx={{ position: "absolute", inset: 0, opacity: showAnonymous ? 1 : 0, transition: `opacity ${fadeMs}ms ease`, "@media (prefers-reduced-motion: reduce)": { transition: "none" } }}>
        <Box data-node-id="2031:5313" sx={{ position: "absolute", inset: 0 }}>
          <AnonymousArtwork />
          <Box sx={{ position: "absolute", top: { xs: 240, md: 360 }, left: "50%", transform: "translateX(-50%)", width: "calc(100% - 32px)", maxWidth: 625, display: "flex", flexDirection: "column", alignItems: "center", gap: 2.5 }}>
            <Box sx={{ width: 64, height: 64, borderRadius: "120px", bgcolor: "#aff3b8", display: "grid", placeItems: "center" }}><Box component="img" src="/onboarding/intro-done-rounded.svg" alt="" /></Box>
            <Typography component="h1" sx={{ fontSize: 24, fontWeight: 600, lineHeight: "32px", textAlign: "center" }}>{anonymousCopy.map((line, i) => <React.Fragment key={line}>{i ? <br /> : null}{line}</React.Fragment>)}</Typography>
          </Box>
        </Box>
      </Box>
      <AppButton appStyle="figma" onClick={onNext} disabled={loading} sx={{ position: "absolute", left: "50%", bottom: { xs: 32, md: 80 }, transform: "translateX(-50%)", width: 201, height: 48, borderRadius: "12px", zIndex: 2 }}>{nextLabel}</AppButton>
    </Box>
  );
}
