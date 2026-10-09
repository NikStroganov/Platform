"use client";

import type { ReactNode } from "react";

import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";

import { AppTextField, type AppTextFieldProps } from "@/components/ui/app-text-field";

export type FieldInputProps = AppTextFieldProps & {
  prefixImage?: ReactNode;
  prefixImageAlt?: string;
  prefixImageSrc?: string;
  postfix?: string;
};

export function FieldInput({
  placeholder,
  prefixImage,
  prefixImageAlt = "",
  prefixImageSrc,
  postfix,
  slotProps,
  sx,
  ...props
}: FieldInputProps) {
  const inputSlotProps = typeof slotProps?.input === "function" ? undefined : slotProps?.input;
  const hasPrefixImage = Boolean(prefixImage || prefixImageSrc);
  const hasPostfix = Boolean(postfix);
  const shouldShowPostfixDivider = hasPostfix && hasPrefixImage;

  return (
    <AppTextField
      placeholder={placeholder}
      sx={[
        {
          "& .MuiOutlinedInput-root": {
            height: 64,
            minHeight: 64,
            gap: hasPrefixImage ? 3 : 2,
            alignItems: "center",
            borderRadius: "64px",
            bgcolor: "#ffffff",
            p: "0 24px",
            "& .MuiOutlinedInput-notchedOutline": {
              border: 0,
              borderRadius: "64px",
            },
            "&:hover .MuiOutlinedInput-notchedOutline, &.Mui-focused .MuiOutlinedInput-notchedOutline": {
              border: 0,
            },
            "&.Mui-disabled": {
              bgcolor: "#ffffff",
            },
          },
          "& .MuiInputAdornment-positionStart": {
            width: 32,
            height: 32,
            maxHeight: "none",
            m: 0,
          },
          "& .MuiInputAdornment-positionEnd": {
            alignSelf: "stretch",
            width: "auto",
            height: "auto",
            maxHeight: "none",
            m: 0,
          },
          "& .MuiOutlinedInput-input": {
            alignSelf: "center",
            flex: 1,
            minWidth: 0,
            height: 28,
            p: 0,
            fontFamily: "Manrope, var(--font-manrope), sans-serif",
            fontSize: "20px",
            fontWeight: 500,
            lineHeight: "28px",
            color: "#111111",
            "&::placeholder": {
              color: "#adadad",
              fontFamily: "Manrope, var(--font-manrope), sans-serif",
              fontSize: "20px",
              fontWeight: 500,
              lineHeight: "28px",
              opacity: 1,
            },
            "&:focus::placeholder": {
              opacity: 1,
            },
            "&[type=number]": {
              MozAppearance: "textfield",
            },
            "&[type=number]::-webkit-outer-spin-button, &[type=number]::-webkit-inner-spin-button": {
              WebkitAppearance: "none",
              margin: 0,
            },
          },
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      slotProps={{
        ...slotProps,
        input: {
          ...inputSlotProps,
          startAdornment: hasPrefixImage ? (
            <InputAdornment position="start">
              {prefixImage ? (
                <Box sx={{ display: "inline-flex", width: 32, height: 32, flexShrink: 0 }}>{prefixImage}</Box>
              ) : (
                <Box
                  component="img"
                  src={prefixImageSrc}
                  alt={prefixImageAlt}
                  aria-hidden={prefixImageAlt ? undefined : true}
                  sx={{ display: "block", width: 32, height: 32, flexShrink: 0 }}
                />
              )}
            </InputAdornment>
          ) : (
            inputSlotProps?.startAdornment
          ),
          endAdornment: hasPostfix ? (
            <InputAdornment position="end">
              <Box sx={{ display: "inline-flex", alignItems: "center", height: "100%", gap: shouldShowPostfixDivider ? 3 : 0 }}>
                {shouldShowPostfixDivider ? (
                  <Box sx={{ width: "1px", height: 16, bgcolor: "#e6e6e6", flexShrink: 0 }} />
                ) : null}
                <Box
                  sx={{
                    color: "#111111",
                    fontFamily: "Manrope, var(--font-manrope), sans-serif",
                    fontSize: hasPrefixImage ? "24px" : "20px",
                    fontWeight: hasPrefixImage ? 400 : 500,
                    lineHeight: hasPrefixImage ? "28px" : "24px",
                    whiteSpace: "nowrap",
                  }}
                >
                  {postfix}
                </Box>
              </Box>
            </InputAdornment>
          ) : (
            inputSlotProps?.endAdornment
          ),
        },
      }}
      {...props}
    />
  );
}

