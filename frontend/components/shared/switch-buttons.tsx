"use client";

import Box, { type BoxProps } from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";

import { resolveHexColor } from "@/components/shared/color-utils";

export type SwitchButtonsOption = {
  value: string;
  label: string;
};

export type SwitchButtonsProps = Omit<BoxProps, "onChange"> & {
  options: SwitchButtonsOption[];
  value: string;
  onChange?: (value: string) => void;
  activeColorHex?: string;
};

export function SwitchButtons({ options, value, onChange, activeColorHex, sx, ...props }: SwitchButtonsProps) {
  const active = resolveHexColor(activeColorHex, "#3d82ff");

  return (
    <Box
      sx={[
        { display: "flex", gap: 0.5, p: 0.5, bgcolor: "#ffffff", borderRadius: "64px", width: "100%", maxWidth: 800 },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...props}
    >
      {options.map((option) => {
        const selected = option.value === value;

        return (
          <ButtonBase
            key={option.value}
            disableRipple
            aria-pressed={selected}
            onClick={() => onChange?.(option.value)}
            sx={{
              flex: "1 1 0",
              minWidth: 0,
              height: 56,
              borderRadius: "100px",
              px: 2,
              bgcolor: selected ? active : "transparent",
              color: selected ? "#ffffff" : "#111111",
              fontSize: 20,
              fontWeight: 500,
              lineHeight: "28px",
              transition: "background-color 160ms ease",
              "&:focus-visible": { outline: `2px solid ${active}`, outlineOffset: 3 },
            }}
          >
            {option.label}
          </ButtonBase>
        );
      })}
    </Box>
  );
}
