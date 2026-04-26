"use client";

import * as React from "react";

import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

export type OtpInputProps = {
  value: string;
  onChange: (value: string) => void;
  length?: number;
  separator?: React.ReactNode;
  disabled?: boolean;
  error?: boolean;
  autoFocus?: boolean;
  "aria-label"?: string;
};

function sanitizeOtpValue(rawValue: string) {
  return rawValue.replace(/\D/g, "");
}

const OtpSlotInput = styled("input")<{ $error?: boolean }>(({ theme, $error }) => ({
  width: 44,
  height: 48,
  padding: 0,
  borderRadius: 12,
  border: `1px solid ${$error ? theme.palette.error.main : "#e6e6e6"}`,
  backgroundColor: "#f8f7fc",
  color: theme.palette.text.primary,
  textAlign: "center",
  fontFamily: "Manrope, var(--font-manrope), sans-serif",
  fontSize: 18,
  fontWeight: 600,
  lineHeight: "24px",
  transition: "border-color 160ms ease",
  outline: "none",
  "&:hover": {
    borderColor: $error ? theme.palette.error.main : "#000000",
  },
  "&:focus": {
    borderColor: $error ? theme.palette.error.main : "#000000",
  },
  "&:disabled": {
    borderColor: "#e6e6e6",
    backgroundColor: "#f3f2f7",
    color: "#c4c2be",
    cursor: "not-allowed",
  },
  "&::selection": {
    backgroundColor: "#bfd9ff",
  },
}));

export function OtpInput({
  value,
  onChange,
  length = 6,
  separator = null,
  disabled = false,
  error = false,
  autoFocus = false,
  "aria-label": ariaLabel = "OTP code input",
}: OtpInputProps) {
  const inputRefs = React.useRef<Array<HTMLInputElement | null>>([]);
  const normalizedValue = sanitizeOtpValue(value).slice(0, length);

  const focusInput = React.useCallback((targetIndex: number) => {
    const target = inputRefs.current[targetIndex];
    if (!target) {
      return;
    }

    target.focus();
    target.select();
  }, []);

  const updateValueAtIndex = React.useCallback(
    (index: number, nextChar: string) => {
      const current = normalizedValue.split("");
      current[index] = nextChar;
      onChange(current.join("").slice(0, length));
    },
    [length, normalizedValue, onChange],
  );

  const fillFromIndex = React.useCallback(
    (startIndex: number, nextChars: string) => {
      if (!nextChars.length) {
        return;
      }

      const current = normalizedValue.split("");
      let cursor = startIndex;

      for (const char of nextChars) {
        if (cursor >= length) {
          break;
        }

        current[cursor] = char;
        cursor += 1;
      }

      onChange(current.join("").slice(0, length));
    },
    [length, normalizedValue, onChange],
  );

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>, currentIndex: number) => {
      switch (event.key) {
        case "ArrowUp":
        case "ArrowDown":
        case " ":
          event.preventDefault();
          return;
        case "ArrowLeft":
          event.preventDefault();
          if (currentIndex > 0) {
            focusInput(currentIndex - 1);
          }
          return;
        case "ArrowRight":
          event.preventDefault();
          if (currentIndex < length - 1) {
            focusInput(currentIndex + 1);
          }
          return;
        case "Delete":
          event.preventDefault();
          onChange(
            normalizedValue.slice(0, currentIndex) +
              normalizedValue.slice(currentIndex + 1),
          );
          return;
        case "Backspace":
          event.preventDefault();
          if (currentIndex > 0) {
            focusInput(currentIndex - 1);
          }
          onChange(
            normalizedValue.slice(0, currentIndex) +
              normalizedValue.slice(currentIndex + 1),
          );
          return;
        default:
          return;
      }
    },
    [focusInput, length, normalizedValue, onChange],
  );

  const handleChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>, currentIndex: number) => {
      const nextValue = sanitizeOtpValue(event.target.value);

      if (!nextValue.length) {
        updateValueAtIndex(currentIndex, "");
        return;
      }

      if (nextValue.length > 1) {
        fillFromIndex(currentIndex, nextValue);
        focusInput(Math.min(currentIndex + nextValue.length, length - 1));
        return;
      }

      updateValueAtIndex(currentIndex, nextValue[0]);
      if (currentIndex < length - 1) {
        focusInput(currentIndex + 1);
      }
    },
    [fillFromIndex, focusInput, length, updateValueAtIndex],
  );

  const handlePaste = React.useCallback(
    (event: React.ClipboardEvent<HTMLInputElement>, currentIndex: number) => {
      event.preventDefault();
      const pastedText = sanitizeOtpValue(event.clipboardData.getData("text/plain"));
      if (!pastedText.length) {
        return;
      }

      fillFromIndex(currentIndex, pastedText);
      focusInput(Math.min(currentIndex + pastedText.length, length - 1));
    },
    [fillFromIndex, focusInput, length],
  );

  return (
    <Box
      role="group"
      aria-label={ariaLabel}
      sx={{ display: "flex", alignItems: "center", gap: 1 }}
    >
      {Array.from({ length }).map((_, index) => (
        <React.Fragment key={index}>
          <OtpSlotInput
            ref={(node) => {
              inputRefs.current[index] = node;
            }}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={1}
            autoComplete={index === 0 ? "one-time-code" : "off"}
            aria-label={`Digit ${index + 1}`}
            value={normalizedValue[index] ?? ""}
            disabled={disabled}
            $error={error}
            autoFocus={autoFocus && index === 0}
            onKeyDown={(event) => handleKeyDown(event, index)}
            onChange={(event) => handleChange(event, index)}
            onPaste={(event) => handlePaste(event, index)}
            onClick={(event) => event.currentTarget.select()}
          />
          {index === length - 1 ? null : separator}
        </React.Fragment>
      ))}
    </Box>
  );
}
