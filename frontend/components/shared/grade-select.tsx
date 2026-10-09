"use client";

import Box, { type BoxProps } from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";

import { resolveHexColor } from "@/components/shared/color-utils";

export type GradeSelectProps = Omit<BoxProps, "onChange"> & {
  options: string[];
  value: string;
  onChange?: (value: string) => void;
  accentColorHex?: string;
};


function GradeArrow({ direction }: { direction: "left" | "right" }) {
  return (
    <Box
      aria-hidden
      sx={{
        width: 16,
        height: 16,
        borderTop: "3px solid currentColor",
        borderRight: "3px solid currentColor",
        transform: direction === "left" ? "rotate(-135deg)" : "rotate(45deg)",
      }}
    />
  );
}

export function GradeSelect({ options, value, onChange, accentColorHex, sx, ...props }: GradeSelectProps) {
  const accent = resolveHexColor(accentColorHex, "#3d82ff");
  const selectedIndex = Math.max(options.indexOf(value), 0);
  const previous = options[selectedIndex - 1];
  const next = options[selectedIndex + 1];

  return (
    <Box
      sx={[
        {
          display: "flex",
          alignItems: "center",
          gap: 4,
          width: "100%",
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...props}
    >
      <ButtonBase
        disableRipple
        disabled={!previous}
        aria-label="Предыдущий грейд"
        onClick={() => previous && onChange?.(previous)}
        sx={{
          width: 64,
          height: 64,
          flexShrink: 0,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "32px",
          border: "3px solid",
          borderColor: accent,
          color: accent,
          bgcolor: "#ffffff",
          transition: "background-color 160ms ease, opacity 160ms ease",
          "&:hover": { bgcolor: "rgba(61, 130, 255, 0.08)" },
          "&:focus-visible": { outline: `2px solid ${accent}`, outlineOffset: 3 },
          "&.Mui-disabled": { opacity: 0.35 },
        }}
      >
        <GradeArrow direction="left" />
      </ButtonBase>

      <Box
        sx={{
          flex: 1,
          minWidth: 0,
          overflow: "hidden",
          py: 1.5,
        }}
      >
        <Box
          role="listbox"
          aria-label="Выбор грейда"
          aria-activedescendant={`grade-${selectedIndex}`}
          sx={{
            position: "relative",
            height: 64,
            width: "100%",
          }}
        >
          {options.map((option, index) => {
            const selected = index === selectedIndex;
            const relativeIndex = index - selectedIndex;
            const distance = Math.abs(relativeIndex);
            const slotIndex = relativeIndex + 1;
            const left = `${slotIndex * 33.3333}%`;
            const justifyContent = relativeIndex < 0 ? "flex-start" : relativeIndex > 0 ? "flex-end" : "center";

            return (
              <ButtonBase
                key={option}
                id={`grade-${index}`}
                role="option"
                aria-selected={selected}
                disableRipple
                onClick={() => onChange?.(option)}
                sx={{
                  position: "absolute",
                  top: 0,
                  left,
                  width: "33.3333%",
                  height: 64,
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent,
                  color: selected ? "#111111" : "#adadad",
                  fontSize: selected ? 48 : 24,
                  fontWeight: 600,
                  lineHeight: selected ? "40px" : "32px",
                  whiteSpace: "nowrap",
                  opacity: distance > 1 ? 0 : 1,
                  pointerEvents: distance > 1 ? "none" : "auto",
                  transition:
                    "left 260ms cubic-bezier(0.2, 0, 0, 1), color 220ms ease, font-size 220ms ease, line-height 220ms ease, opacity 220ms ease",
                  "&:focus-visible": { outline: `2px solid ${accent}`, outlineOffset: 4 },
                }}
              >
                {option}
              </ButtonBase>
            );
          })}
        </Box>
      </Box>

      <ButtonBase
        disableRipple
        disabled={!next}
        aria-label="Следующий грейд"
        onClick={() => next && onChange?.(next)}
        sx={{
          width: 64,
          height: 64,
          flexShrink: 0,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "32px",
          border: "3px solid",
          borderColor: accent,
          color: accent,
          bgcolor: "#ffffff",
          transition: "background-color 160ms ease, opacity 160ms ease",
          "&:hover": { bgcolor: "rgba(61, 130, 255, 0.08)" },
          "&:focus-visible": { outline: `2px solid ${accent}`, outlineOffset: 3 },
          "&.Mui-disabled": { opacity: 0.35 },
        }}
      >
        <GradeArrow direction="right" />
      </ButtonBase>
    </Box>
  );
}




