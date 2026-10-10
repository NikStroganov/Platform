"use client";

import Box, { type BoxProps } from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";

import { alphaHex, resolveHexColor } from "@/components/shared/color-utils";

export type SpecialityButtonItem = {
  value: string;
  label: string;
  colorHex?: string;
};

export type SpecialityButtonsProps = Omit<BoxProps, "onChange"> & {
  items: SpecialityButtonItem[];
  value?: string | string[];
  onChange?: (value: string) => void;
};

export function SpecialityButtons({ items, value, onChange, sx, ...props }: SpecialityButtonsProps) {
  return (
    <Box
      sx={[{ display: "flex", flexWrap: "wrap", gap: 2, alignItems: "flex-start" }, ...(Array.isArray(sx) ? sx : [sx])]}
      {...props}
    >
      {items.map((item) => {
        const accent = resolveHexColor(item.colorHex, "#1ca2d3");
        const selected = Array.isArray(value) ? value.includes(item.value) : value === item.value;

        return (
          <ButtonBase
            key={item.value}
            disableRipple
            aria-pressed={selected}
            onClick={() => onChange?.(item.value)}
            sx={{
              px: 2,
              py: 1,
              borderRadius: "32px",
              border: "1px solid",
              borderColor: alphaHex(item.colorHex, "#1ca2d3", selected ? 0.45 : 0.2),
              bgcolor: alphaHex(item.colorHex, "#1ca2d3", selected ? 0.22 : 0.15),
              color: accent,
              fontSize: 16,
              fontWeight: 600,
              lineHeight: "28px",
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
