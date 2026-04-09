"use client";

import { useState } from "react";

import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import TextField, { type TextFieldProps } from "@mui/material/TextField";
import Image from "next/image";

export type AppTextFieldProps = TextFieldProps;

function PasswordToggleIcon({ visible }: { visible: boolean }) {
  return (
    <Image
      src={visible ? "/eye-on.svg" : "/eye-off.svg"}
      alt=""
      aria-hidden="true"
    />
  );
}

function ErrorStateIcon() {
  return (
    <Image
      src="/input-error.svg"
      alt=""
      width={16}
      height={16}
      aria-hidden="true"
    />
  );
}

export function AppTextField({
  variant = "outlined",
  fullWidth = true,
  size = "medium",
  type,
  slotProps,
  error,
  ...props
}: AppTextFieldProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const isPasswordField = type === "password";
  const renderedType = isPasswordField
    ? isPasswordVisible
      ? "text"
      : "password"
    : type;
  const inputSlotProps =
    typeof slotProps?.input === "function" ? undefined : slotProps?.input;
  const existingAdornment = inputSlotProps?.endAdornment;

  const generatedAdornment =
    error || isPasswordField ? (
      <InputAdornment position="end">
        <Box sx={{ display: "inline-flex", alignItems: "center", gap: 0.5, flex: "none" }}>
          {existingAdornment}
          {error ? <ErrorStateIcon /> : null}
          {isPasswordField ? (
            <IconButton
              edge="end"
              aria-label={isPasswordVisible ? "Hide password" : "Show password"}
              onClick={() => setIsPasswordVisible((value) => !value)}
              onMouseDown={(event) => event.preventDefault()}
            >
              <PasswordToggleIcon visible={isPasswordVisible} />
            </IconButton>
          ) : null}
        </Box>
      </InputAdornment>
    ) : (
      existingAdornment
    );

  return (
    <TextField
      variant={variant}
      fullWidth={fullWidth}
      size={size}
      type={renderedType}
      error={error}
      slotProps={{
        ...slotProps,
        input: {
          ...inputSlotProps,
          endAdornment: generatedAdornment,
        },
      }}
      {...props}
    />
  );
}
