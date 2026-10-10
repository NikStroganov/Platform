"use client";

import Box, { type BoxProps } from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";

import { alphaHex, resolveHexColor } from "@/components/shared/color-utils";

export type CityButtonItem = {
  value: string;
  label: string;
  colorHex?: string;
  backgroundHex?: string;
  borderHex?: string;
};

export type CityButtonsProps = Omit<BoxProps, "onChange"> & {
  items: CityButtonItem[];
  value?: string | string[];
  onChange?: (value: string) => void;
};

export function CityButtons({ items, value, onChange, sx, ...props }: CityButtonsProps) {
  return (
    <Box
      sx={[{ display: "flex", flexWrap: "wrap", gap: 2, alignItems: "flex-start" }, ...(Array.isArray(sx) ? sx : [sx])]}
      {...props}
    >
      {items.map((item) => {
        const accent = resolveHexColor(item.colorHex, "#4489dd");
        const selected = Array.isArray(value) ? value.includes(item.value) : value === item.value;
        const borderColor = item.borderHex ?? alphaHex(item.colorHex, "#4489dd", selected ? 0.45 : 0.2);
        const backgroundColor = item.backgroundHex ?? alphaHex(item.colorHex, "#4489dd", selected ? 0.22 : 0.15);

        return (
          <ButtonBase
            key={item.value}
            disableRipple
            aria-pressed={selected}
            onClick={() => onChange?.(item.value)}
            sx={{
              minHeight: 38,
              px: 2,
              py: 0.5,
              borderRadius: "12px",
              border: "1px solid",
              borderColor,
              bgcolor: backgroundColor,
              color: accent,
              fontFamily: "Manrope, var(--font-manrope), sans-serif",
              fontSize: 16,
              fontWeight: 600,
              lineHeight: "28px",
              whiteSpace: "nowrap",
              "&:focus-visible": { outline: `2px solid ${accent}`, outlineOffset: 3 },
            }}
          >
            {item.label}
          </ButtonBase>
        );
      })}
    </Box>
  );
}
