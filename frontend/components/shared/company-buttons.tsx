"use client";

import Box, { type BoxProps } from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import Typography from "@mui/material/Typography";

import { alphaHex, resolveHexColor } from "@/components/shared/color-utils";

export type CompanyButtonItem = {
  value: string;
  label: string;
  logoUrl?: string;
  colorHex?: string;
  backgroundHex?: string;
};

export type CompanyButtonsProps = Omit<BoxProps, "onChange"> & {
  items: CompanyButtonItem[];
  value?: string;
  onChange?: (value: string) => void;
};

export function CompanyButtons({ items, value, onChange, sx, ...props }: CompanyButtonsProps) {
  return (
    <Box
      sx={[{ display: "flex", flexWrap: "wrap", gap: 2, alignItems: "flex-start" }, ...(Array.isArray(sx) ? sx : [sx])]}
      {...props}
    >
      {items.map((item) => {
        const accent = resolveHexColor(item.colorHex, "#1ca2d3");
        const selected = value === item.value;
        const background = item.backgroundHex ?? alphaHex(item.colorHex, "#1ca2d3", 0.15);

        return (
          <ButtonBase
            key={item.value}
            disableRipple
            aria-pressed={selected}
            onClick={() => onChange?.(item.value)}
            sx={{
              width: 120,
              minHeight: 120,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 1,
              p: 2,
              borderRadius: "24px",
              border: "1px solid",
              borderColor: alphaHex(item.colorHex, "#1ca2d3", selected ? 0.6 : 0.2),
              bgcolor: background,
              color: accent,
              transition: "transform 160ms ease, border-color 160ms ease",
              "&:hover": { transform: "translateY(-1px)" },
              "&:focus-visible": { outline: `2px solid ${accent}`, outlineOffset: 3 },
            }}
          >
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: "32px",
                overflow: "hidden",
                bgcolor: alphaHex(item.colorHex, "#1ca2d3", 0.18),
                display: "grid",
                placeItems: "center",
                fontWeight: 700,
              }}
            >
              {item.logoUrl ? (
                <Box component="img" src={item.logoUrl} alt="" sx={{ width: "100%", height: "100%", objectFit: "cover" }} />
              ) : (
                item.label.slice(0, 1)
              )}
            </Box>
            <Typography sx={{ fontSize: 16, fontWeight: 600, lineHeight: "28px" }}>{item.label}</Typography>
          </ButtonBase>
        );
      })}
    </Box>
  );
}
