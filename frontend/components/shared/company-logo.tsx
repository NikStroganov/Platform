"use client";

import Box from "@mui/material/Box";

const crops: Record<string, { width: string; height: string; left: string; top: string }> = {
  "/onboarding/company-ozon.png": { width: "148.26%", height: "119.8%", left: "-24.13%", top: "-9.9%" },
  "/onboarding/company-wildberries.png": { width: "280.37%", height: "147.2%", left: "-90.19%", top: "-23.6%" },
  "/onboarding/company-samokat.png": { width: "168.75%", height: "162%", left: "-34.37%", top: "-31%" },
};

export function CompanyLogo({ src, size = 48 }: { src: string; size?: number }) {
  return (
    <Box sx={{ position: "relative", width: size, height: size, flexShrink: 0, borderRadius: "50%", overflow: "hidden" }}>
      <Box component="img" src={src} alt="" sx={{ position: "absolute", display: "block", maxWidth: "none", objectFit: "cover", ...(crops[src] ?? { width: "100%", height: "100%", left: 0, top: 0 }) }} />
    </Box>
  );
}
