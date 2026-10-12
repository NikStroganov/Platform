"use client";

import * as React from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { AppButton } from "@/components/ui/app-button";

const sceneWidth = 1440;
const sceneHeight = 900;
const fadeMs = 900;
const firstSceneMs = 5000;
const welcomeTitle = "\u0414\u043e\u0431\u0440\u043e \u043f\u043e\u0436\u0430\u043b\u043e\u0432\u0430\u0442\u044c \u043d\u0430 CareIt! \u041c\u044b \u0434\u0435\u043b\u0430\u0435\u043c \u0440\u044b\u043d\u043e\u043a \u043f\u0440\u043e\u0437\u0440\u0430\u0447\u043d\u044b\u043c \u0438 \u043f\u043e\u043d\u044f\u0442\u043d\u044b\u043c";
const anonymousCopy = [
  "\u041c\u044b \u0445\u043e\u0442\u0438\u043c \u043f\u043e\u043a\u0430\u0437\u0430\u0442\u044c \u0440\u0435\u0430\u043b\u044c\u043d\u044b\u0435 \u0434\u0430\u043d\u043d\u044b\u0435,",
  "\u043f\u043e\u044d\u0442\u043e\u043c\u0443 \u0437\u0430\u0434\u0430\u0434\u0438\u043c \u0432\u043e\u043f\u0440\u043e\u0441\u044b \u043e \u0432\u0430\u0448\u0435\u0439 \u0440\u0430\u0431\u043e\u0442\u0435.",
  "\u041d\u043e \u0445\u0440\u0430\u043d\u0438\u043c \u0434\u0430\u043d\u043d\u044b\u0435 \u0438\u0441\u043a\u043b\u044e\u0447\u0438\u0442\u0435\u043b\u044c\u043d\u043e \u0430\u043d\u043e\u043d\u0438\u043c\u043d\u043e",
];
const nextLabel = "\u0418\u0434\u0435\u043c \u0434\u0430\u043b\u044c\u0448\u0435";
const debugLabels = {
  welcome: "\u0421\u043b\u0430\u0439\u0434 1",
  anonymous: "\u0421\u043b\u0430\u0439\u0434 2",
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

function FigmaImage({ src, sx }: { src: string; sx: object }) {
  return <Box component="img" src={src} alt="" sx={{ position: "absolute", objectFit: "cover", pointerEvents: "none", ...sx }} />;
}

function WelcomeScene() {
  return (
    <Box sx={{ position: "absolute", inset: 0, bgcolor: "#f6f7f9" }} data-node-id="2031:6237">

      <Typography
        sx={{
          position: "absolute",
          top: 192,
          left: "50%",
          transform: "translateX(-50%)",
          width: 554,
          color: "#111111",
          fontSize: 24,
          fontWeight: 600,
          lineHeight: "32px",
          textAlign: "center",
        }}
      >
        {welcomeTitle}
      </Typography>

      <Box sx={{ position: "absolute", left: 381, top: 304, width: 698, height: 291, transform: "rotate(2deg)" }}>
        <FigmaImage src="/onboarding/intro-welcome-chart.png" sx={{ left: 3, top: 15, width: 687.48, height: 255.49, transform: "rotate(-1deg)" }} />
        <FigmaImage src="/onboarding/intro-welcome-card-left.png" sx={{ left: 56, top: -9, width: 280.16, height: 264.05, transform: "rotate(2deg)" }} />
        <FigmaImage src="/onboarding/intro-welcome-card-center.png" sx={{ left: 222, top: 39, width: 263.63, height: 246.26, transform: "rotate(-2deg)" }} />
        <FigmaImage src="/onboarding/intro-welcome-card-right.png" sx={{ left: 373, top: 3, width: 287.93, height: 272.46, transform: "rotate(4deg)" }} />
      </Box>
    </Box>
  );
}

function AnonymousScene() {
  return (
    <Box sx={{ position: "absolute", inset: 0, bgcolor: "#f6f7f9" }} data-node-id="2031:5313">

      <Box sx={{ position: "absolute", left: 383, top: 59, width: 687.48, height: 255.49, transform: "rotate(1deg)", overflow: "hidden" }}>
        <FigmaImage src="/onboarding/intro-anonymous-chart.png" sx={{ inset: 0, width: "100%", height: "100%" }} />
        <Box sx={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, #f6f7f9 10.9%, rgba(246,247,249,0) 100%)" }} />
      </Box>

      <Box sx={{ position: "absolute", left: 190, top: 437, width: 280.16, height: 264.05, transform: "rotate(4deg)", overflow: "hidden" }}>
        <FigmaImage src="/onboarding/intro-anonymous-card-left.png" sx={{ inset: 0, width: "100%", height: "100%" }} />
        <Box sx={{ position: "absolute", inset: 0, background: "linear-gradient(219deg, rgba(246,247,249,0) 9%, #f6f7f9 71%)" }} />
      </Box>

      <Box sx={{ position: "absolute", left: 531, top: 611, width: 263.63, height: 246.26, overflow: "hidden" }}>
        <FigmaImage src="/onboarding/intro-anonymous-card-bottom.png" sx={{ inset: 0, width: "100%", height: "100%" }} />
        <Box sx={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(246,247,249,0) 0%, #f6f7f9 73.5%)" }} />
      </Box>

      <Box sx={{ position: "absolute", left: 918, top: 500, width: 287.93, height: 272.46, transform: "rotate(6deg)", overflow: "hidden" }}>
        <FigmaImage src="/onboarding/intro-anonymous-card-right.png" sx={{ inset: 0, width: "100%", height: "100%" }} />
        <Box sx={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(246,247,249,0) 6.5%, #f6f7f9 67%)" }} />
      </Box>

      <Box sx={{ position: "absolute", top: 360, left: 407.5, width: 625, display: "flex", flexDirection: "column", alignItems: "center", gap: 2.5 }}>
        <Box sx={{ width: 64, height: 64, borderRadius: "120px", bgcolor: "#aff3b8", position: "relative" }}>
          <Box component="img" src="/onboarding/intro-done-rounded.svg" alt="" sx={{ position: "absolute", left: 8, top: 8, width: 48, height: 48 }} />
        </Box>
        <Typography sx={{ color: "#111111", fontSize: 24, fontWeight: 600, lineHeight: "32px", textAlign: "center" }}>
          {anonymousCopy[0]}
          <br />{anonymousCopy[1]}
          <br />{anonymousCopy[2]}
        </Typography>
      </Box>
    </Box>
  );
}

export function IntroFadeStep({ onNext, loading }: { onNext: () => void; loading?: boolean }) {
  const [activeSlide, setActiveSlide] = React.useState<"welcome" | "anonymous">("welcome");
  const debugTouchedRef = React.useRef(false);

  React.useEffect(() => {
    const timeout = window.setTimeout(() => {
      if (!debugTouchedRef.current) {
        setActiveSlide("anonymous");
      }
    }, firstSceneMs);

    return () => {
      window.clearTimeout(timeout);
    };
  }, []);

  function selectDebugSlide(slide: "welcome" | "anonymous") {
    debugTouchedRef.current = true;
    setActiveSlide(slide);
  }

  const showAnonymous = activeSlide === "anonymous";

  return (
    <Box component="main" sx={{ minHeight: "100vh", bgcolor: "#f6f7f9", display: "grid", placeItems: "center", overflow: "hidden", position: "relative" }}>
      <CareItLogo />

      <Box
        sx={{
          position: "absolute",
          top: 16,
          right: 16,
          zIndex: 3,
          display: "flex",
          gap: 0.5,
          p: 0.5,
          border: "1px solid #d7dce2",
          borderRadius: "12px",
          bgcolor: "rgba(255,255,255,0.82)",
          boxShadow: "0 8px 24px rgba(17,17,17,0.08)",
          backdropFilter: "blur(12px)",
        }}
      >
        {([
          ["welcome", debugLabels.welcome],
          ["anonymous", debugLabels.anonymous],
        ] as const).map(([slide, label]) => {
          const selected = activeSlide === slide;

          return (
            <Box
              key={slide}
              component="button"
              type="button"
              data-testid={"intro-debug-" + slide}
              onClick={() => selectDebugSlide(slide)}
              sx={{
                minWidth: 72,
                height: 32,
                px: 1.5,
                border: 0,
                borderRadius: "8px",
                bgcolor: selected ? "#111111" : "transparent",
                color: selected ? "#ffffff" : "#4b5563",
                cursor: "pointer",
                font: "inherit",
                fontSize: 13,
                fontWeight: 700,
                lineHeight: "18px",
              }}
            >
              {label}
            </Box>
          );
        })}
      </Box>
      <Box
        sx={{
          width: sceneWidth,
          height: sceneHeight,
          position: "relative",
          transform: { xs: "scale(calc(100vw / 1440))", md: "scale(min(calc(100vw / 1440), calc(100vh / 900)))" },
          transformOrigin: "center",
          flexShrink: 0,
        }}
      >
        <Box sx={{ position: "absolute", inset: 0, opacity: showAnonymous ? 0 : 1, transition: "opacity " + fadeMs + "ms ease" }}>
          <WelcomeScene />
        </Box>
        <Box sx={{ position: "absolute", inset: 0, opacity: showAnonymous ? 1 : 0, transition: "opacity " + fadeMs + "ms ease" }}>
          <AnonymousScene />
        </Box>
      </Box>

      <AppButton appStyle="figma" onClick={onNext} disabled={loading} sx={{ position: "absolute", left: "50%", bottom: { xs: 32, md: 80 }, transform: "translateX(-50%)", width: 201, zIndex: 2 }}>
        {nextLabel}
      </AppButton>
    </Box>
  );
}