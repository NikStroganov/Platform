"use client";

import Box, { type BoxProps } from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import Typography from "@mui/material/Typography";

import { alphaHex, resolveHexColor } from "@/components/shared/color-utils";

export type ChipSuggestionItem = {
  value: string;
  label: string;
  imageUrl?: string;
};

export type ChipSuggestionProps = Omit<BoxProps, "onChange"> & {
  items: ChipSuggestionItem[];
  onSelect?: (value: string) => void;
  colorHex?: string;
};

export function ChipSuggestion({ items, onSelect, colorHex, sx, ...props }: ChipSuggestionProps) {
  const accent = resolveHexColor(colorHex, "#3d82ff");

  return (
    <Box sx={[{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: 1, maxWidth: 800 }, ...(Array.isArray(sx) ? sx : [sx])]} {...props}>
      {items.map((item) => (
        <ButtonBase
          key={item.value}
          disableRipple
          onClick={() => onSelect?.(item.value)}
          sx={{ minHeight: 92, flexDirection: "column", gap: 2, p: 2, borderRadius: "16px", bgcolor: alphaHex(colorHex, "#3d82ff", 0.15), color: "#111111", "&:focus-visible": { outline: `2px solid ${accent}`, outlineOffset: 3 } }}
        >
          {item.imageUrl ? <Box component="img" src={item.imageUrl} alt="" sx={{ width: 24, height: 24, borderRadius: "50%", objectFit: "cover" }} /> : null}
          <Typography sx={{ fontSize: 16, fontWeight: 500, lineHeight: "24px" }}>{item.label}</Typography>
          <Box sx={{ color: accent, fontSize: 20, lineHeight: 1 }}>+</Box>
        </ButtonBase>
      ))}
    </Box>
  );
}
