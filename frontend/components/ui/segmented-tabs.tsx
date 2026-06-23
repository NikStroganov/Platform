"use client";

import * as React from "react";

import Box, { type BoxProps } from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";

export type SegmentedTabsProps = Omit<BoxProps, "onChange"> & {
  value: number;
  count: number;
  onChange: (event: React.SyntheticEvent, value: number) => void;
  ariaLabel?: string;
  getTabLabel?: (index: number) => string;
  segmentWidth?: number | string;
  segmentHeight?: number | string;
};

const activeColor = "#1CA2D3";
const inactiveColor = "rgba(179, 195, 200, 0.45)";
const inactiveHoverColor = "rgba(179, 195, 200, 0.7)";

function clampValue(value: number, max: number) {
  return Math.min(Math.max(value, 0), max);
}

export function SegmentedTabs({
  value,
  count,
  onChange,
  ariaLabel = "Tabs",
  getTabLabel = (index) => `Tab ${index + 1}`,
  segmentWidth = 100,
  segmentHeight = 8,
  sx,
  ...props
}: SegmentedTabsProps) {
  const lastIndex = Math.max(count - 1, 0);
  const selectedValue = clampValue(value, lastIndex);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    let nextValue: number | null = null;

    if (event.key === "ArrowRight") {
      nextValue = selectedValue === lastIndex ? 0 : selectedValue + 1;
    }

    if (event.key === "ArrowLeft") {
      nextValue = selectedValue === 0 ? lastIndex : selectedValue - 1;
    }

    if (event.key === "Home") {
      nextValue = 0;
    }

    if (event.key === "End") {
      nextValue = lastIndex;
    }

    if (nextValue === null || nextValue === selectedValue) {
      return;
    }

    event.preventDefault();
    onChange(event, nextValue);
  };

  return (
    <Box
      role="tablist"
      aria-label={ariaLabel}
      sx={[
        {
          display: "flex",
          alignItems: "center",
          gap: "12px",
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...props}
    >
      {Array.from({ length: count }).map((_, index) => {
        const selected = index === selectedValue;

        return (
          <ButtonBase
            key={index}
            role="tab"
            aria-label={getTabLabel(index)}
            aria-selected={selected}
            tabIndex={selected ? 0 : -1}
            disableRipple
            onClick={(event) => onChange(event, index)}
            onKeyDown={handleKeyDown}
            sx={{
              width: segmentWidth,
              height: segmentHeight,
              minWidth: segmentWidth,
              borderRadius: "32px",
              bgcolor: selected ? activeColor : inactiveColor,
              flexShrink: 0,
              transition: (theme) =>
                theme.transitions.create(["background-color", "outline-color"], {
                  duration: theme.transitions.duration.shorter,
                }),
              "&:hover": {
                bgcolor: selected ? activeColor : inactiveHoverColor,
              },
              "&:focus-visible": {
                outline: `2px solid ${activeColor}`,
                outlineOffset: 4,
              },
            }}
          />
        );
      })}
    </Box>
  );
}
