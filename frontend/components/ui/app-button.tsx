"use client";

import Button, { type ButtonProps } from "@mui/material/Button";

export type AppButtonProps = ButtonProps;

export function AppButton({
  variant = "contained",
  color = "primary",
  disableElevation = true,
  disableRipple = true,
  children,
  ...props
}: AppButtonProps) {
  return (
    <Button
      variant={variant}
      color={color}
      disableElevation={disableElevation}
      disableRipple={disableRipple}
      {...props}
    >
      {children}
    </Button>
  );
}
