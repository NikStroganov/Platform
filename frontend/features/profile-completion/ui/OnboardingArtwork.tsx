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
        <Box key={src} sx={{ position: "absolute", left, top, width, height, transform: `rotate(${rotate}deg)`, opacity: { xs: src === "chart" ? 0.45 : 0.22, md: src === "chart" ? 0.65 : 0.45 } }}>
          <Box component="img" src={`/onboarding/intro-anonymous-${src}.png`} alt="" sx={{ width, height, display: "block", objectFit: "cover" }} />
          <Box sx={{ position: "absolute", inset: 0, background }} />
        </Box>
      ))}
    </Box>
  );
}

const welcomeArtwork = [
  { src: "chart", left: 4.996, top: 20.824, width: 683.334, height: 243.606, rotate: -1 },
  { src: "card-left", left: 51.337, top: -4.421, width: 263.629, height: 246.255, rotate: 2 },
  { src: "card-center", left: 225.834, top: 34.105, width: 263.629, height: 246.255, rotate: -2 },
  { src: "card-right", left: 364.338, top: 12.204, width: 263.629, height: 246.255, rotate: 4 },
];

// Derive motion endpoints from the existing artwork geometry, including its
// rotated welcome canvas. No prototype positions or responsive layout are used.
function pictureTransform(index: number, spread: boolean, welcomeScale: number, endScale: number, welcomeTop: number) {
  const start = welcomeArtwork[index];
  const end = artwork[index];
  const angle = 2 * Math.PI / 180;
  const localX = start.left + start.width / 2 - 689 / 2;
  const localY = start.top + start.height / 2;
  const centerX = spread ? (end.left + end.width / 2 - 720) * endScale : (Math.cos(angle) * localX - Math.sin(angle) * localY) * welcomeScale;
  const centerY = spread ? (end.top + end.height / 2) * endScale : welcomeTop + (Math.sin(angle) * localX + Math.cos(angle) * localY) * welcomeScale;
  return `translate3d(${centerX - start.width / 2}px, ${centerY - start.height / 2}px, 0) rotate(${spread ? end.rotate : start.rotate + 2}deg) scale(${spread ? endScale : welcomeScale})`;
}

export function IntroArtwork({ spread }: { spread: boolean }) {
  return (
    <Box aria-hidden data-testid="intro-artwork" data-spread={spread} sx={{ position: "absolute", left: "50%", top: 0, width: 0, height: 0, zIndex: 1, pointerEvents: "none" }}>
      {welcomeArtwork.map(({ src, width, height }, index) => (
        <Box key={src} data-testid={`intro-picture-${src}`} sx={{
          position: "absolute", left: 0, top: 0, width, height,
          transform: {
            xs: pictureTransform(index, spread, 0.45, 0.65, 320),
            sm: pictureTransform(index, spread, 0.75, 0.65, 320),
            md: pictureTransform(index, spread, 1, 1, 316),
          },
          opacity: spread ? { xs: index === 0 ? 0.45 : 0.22, md: index === 0 ? 0.65 : 0.45 } : 1,
          transition: spread ? "transform 1500ms cubic-bezier(.45,0,.18,1), opacity 650ms cubic-bezier(.4,0,.2,1) 850ms" : "none",
          "@media (prefers-reduced-motion: reduce)": { transition: "none" },
        }}>
          <Box component="img" src={`/onboarding/intro-welcome-${src}.png`} alt="" sx={{ width: "100%", height: "100%", display: "block", objectFit: "cover" }} />
          <Box data-testid="intro-picture-gradient" sx={{ position: "absolute", inset: 0, background: artwork[index].background, opacity: spread ? 1 : 0, transition: spread ? "opacity 1100ms cubic-bezier(.4,0,.2,1) 400ms" : "none", "@media (prefers-reduced-motion: reduce)": { transition: "none" } }} />
        </Box>
      ))}
    </Box>
  );
}
