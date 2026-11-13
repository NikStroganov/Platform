"use client";

import Box from "@mui/material/Box";

const artwork = [
  { src: "chart", left: 381.196, top: 64.975, width: 683.334, height: 243.606, rotate: 1, background: "linear-gradient(180deg, #f6f7f9 10.892%, rgba(246,247,249,0) 100%)" },
  { src: "card-left", left: 197.948, top: 445.957, width: 263.629, height: 246.255, rotate: 4, background: "linear-gradient(219.459deg, rgba(246,247,249,0) 9.2745%, #f6f7f9 71.465%)" },
  { src: "card-bottom", left: 531, top: 610.547, width: 263.629, height: 246.255, rotate: 0, background: "linear-gradient(180deg, rgba(246,247,249,0) 0%, #f6f7f9 73.558%)" },
  { src: "card-right", left: 930.178, top: 513.496, width: 263.629, height: 246.255, rotate: 6, background: "linear-gradient(135.415deg, rgba(246,247,249,0) 6.4994%, #f6f7f9 67.198%)" },
];

export function AnonymousArtwork() {
  return (
    <Box aria-hidden sx={{ position: "absolute", top: 0, left: "50%", width: 1440, height: 900, transform: { xs: "translateX(-50%) scale(0.65)", md: "translateX(-50%)" }, transformOrigin: "top center", pointerEvents: "none" }}>
      {artwork.map(({ src, left, top, width, height, rotate, background }) => (
        <Box key={src} sx={{ position: "absolute", left, top, width, height, transform: `rotate(${rotate}deg)` }}>
          <Box component="img" src={`/onboarding/intro-anonymous-${src}.png`} alt="" sx={{ width, height, display: "block", objectFit: "cover" }} />
          <Box sx={{ position: "absolute", inset: 0, background }} />
        </Box>
      ))}
    </Box>
  );
}

export function WelcomeArtwork() {
  return (
    <Box aria-hidden sx={{ width: 689, height: 267, position: "relative", transform: { xs: "scale(0.45) rotate(2deg)", sm: "scale(0.75) rotate(2deg)", md: "rotate(2deg)" }, transformOrigin: "top center", pointerEvents: "none" }}>
      {[
        { src: "chart", left: 4.996, top: 20.824, width: 683.334, height: 243.606, rotate: -1 },
        { src: "card-left", left: 51.337, top: -4.421, width: 263.629, height: 246.255, rotate: 2 },
        { src: "card-center", left: 225.834, top: 34.105, width: 263.629, height: 246.255, rotate: -2 },
        { src: "card-right", left: 364.338, top: 12.204, width: 263.629, height: 246.255, rotate: 4 },
      ].map(({ src, left, top, width, height, rotate }) => <Box key={src} component="img" src={`/onboarding/intro-welcome-${src}.png`} alt="" sx={{ position: "absolute", left, top, width, height, transform: `rotate(${rotate}deg)`, objectFit: "cover" }} />)}
    </Box>
  );
}
