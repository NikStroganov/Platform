"use client";

import Box, { type BoxProps } from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";

import { resolveHexColor } from "@/components/shared/color-utils";

export type AppStepperProps = Omit<BoxProps, "onChange"> & {
  count: number;
  value: number;
  onChange?: (value: number) => void;
  activeColorHex?: string;
  inactiveColorHex?: string;
  getStepLabel?: (index: number) => string;
};

export function AppStepper({
  count,
  value,
  onChange,
  activeColorHex,
  inactiveColorHex,
  getStepLabel = (index) => `Шаг ${index + 1}`,
  sx,
  ...props
}: AppStepperProps) {
  const active = resolveHexColor(activeColorHex, "#3d82ff");
  const inactive = resolveHexColor(inactiveColorHex, "#b3c3c8");
  const selected = Math.min(Math.max(value, 0), Math.max(count - 1, 0));

  return (
    <Box
      role="tablist"
      sx={[
        { display: "flex", alignItems: "center", gap: "12px" },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...props}
    >
      {Array.from({ length: count }).map((_, index) => {
        const filled = index <= selected;

        return (
          <ButtonBase
            key={index}
            role="tab"
            aria-label={getStepLabel(index)}
            aria-selected={index === selected}
            disableRipple
            onClick={() => onChange?.(index)}
            sx={{
              width: 100,
              height: 8,
              flexShrink: 0,
              borderRadius: "32px",
              bgcolor: filled ? active : inactive,
              opacity: filled ? 1 : 0.45,
              transition: "background-color 160ms ease, opacity 160ms ease",
              "&:focus-visible": { outline: `2px solid ${active}`, outlineOffset: 4 },
            }}
          />
        );
      })}
    </Box>
  );
}
