"use client";

import * as React from "react";

import { styled } from "@mui/material/styles";

export type DottedBorderInputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "size"
> & {
  fullWidth?: boolean;
  error?: boolean;
};

const primaryColor = "#1CA2D3";
const primaryHoverColor = "#148CB8";
const errorColor = "#ff4d4f";

function getDashedBorderImage(color: string) {
  const strokeColor = color.replace("#", "%23");

  return `url("data:image/svg+xml,%3Csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='0.5' y='0.5' width='99%25' height='99%25' rx='12' ry='12' fill='none' stroke='${strokeColor}' stroke-width='1' stroke-dasharray='10 7' stroke-linecap='round'/%3E%3C/svg%3E")`;
}

const DottedInput = styled("input", {
  shouldForwardProp: (prop) => prop !== "$fullWidth" && prop !== "$error",
})<{ $fullWidth?: boolean; $error?: boolean }>(({ theme, $fullWidth, $error }) => ({
  width: $fullWidth ? "100%" : 280,
  minHeight: 46,
  boxSizing: "border-box",
  padding: "6px 20px",
  borderRadius: 12,
  border: "1px solid transparent",
  backgroundColor: "transparent",
  backgroundImage: getDashedBorderImage($error ? errorColor : primaryColor),
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "100% 100%",
  color: $error ? theme.palette.error.main : primaryColor,
  fontFamily: "Manrope, var(--font-manrope), sans-serif",
  fontSize: 24,
  fontWeight: 600,
  lineHeight: "32px",
  textAlign: "center",
  outline: "none",
  transition: theme.transitions.create(["background-image", "color", "opacity"], {
    duration: theme.transitions.duration.shorter,
  }),
  "&::placeholder": {
    color: $error ? theme.palette.error.main : primaryColor,
    opacity: 0.5,
  },
  "&:hover": {
    backgroundImage: getDashedBorderImage($error ? errorColor : primaryHoverColor),
  },
  "&:focus": {
    backgroundImage: getDashedBorderImage($error ? errorColor : primaryColor),
    outline: "2px solid rgba(28, 162, 211, 0.24)",
    outlineOffset: 3,
  },
  "&:disabled": {
    cursor: "not-allowed",
    opacity: 0.45,
  },
}));

export const DottedBorderInput = React.forwardRef<
  HTMLInputElement,
  DottedBorderInputProps
>(function DottedBorderInput(
  { fullWidth = false, error = false, placeholder = "Enter nickname", ...props },
  ref,
) {
  return (
    <DottedInput
      ref={ref}
      $fullWidth={fullWidth}
      $error={error}
      placeholder={placeholder}
      {...props}
    />
  );
});