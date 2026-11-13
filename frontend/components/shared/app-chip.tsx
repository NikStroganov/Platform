"use client";

import Chip from "@mui/material/Chip";
import type { SxProps, Theme } from "@mui/material/styles";

import { resolveHexColor } from "@/components/shared/color-utils";

export type AppChipProps = {
  label: string;
  onDelete?: () => void;
  colorHex?: string;
  backgroundHex?: string;
  disabled?: boolean;
  onClick?: () => void;
  sx?: SxProps<Theme>;
};

export function AppChip({ label, onDelete, colorHex, backgroundHex, disabled, onClick, sx }: AppChipProps) {
  const textColor = resolveHexColor(colorHex, "#111111");

  return (
    <Chip
      label={label}
      onDelete={onDelete}
      disabled={disabled}
      onClick={onClick}
      sx={[{
        height: 36,
        borderRadius: "32px",
        bgcolor: backgroundHex ? resolveHexColor(backgroundHex, "#f2f2f2") : "#f2f2f2",
        color: textColor,
        px: 1,
        "& .MuiChip-label": {
          px: 1,
          fontSize: 16,
          fontWeight: 500,
          lineHeight: "24px",
        },
      }, ...(Array.isArray(sx) ? sx : [sx])]}
    />
  );
}
