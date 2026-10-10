"use client";

import Button, { type ButtonProps } from "@mui/material/Button";

export type AppButtonStyle = "default" | "figma" | "outline-icon";

export type AppButtonProps = ButtonProps & {
  appStyle?: AppButtonStyle;
};

export function AppButton({
  appStyle = "default",
  variant = "contained",
  color = "primary",
  disableElevation = true,
  disableRipple = true,
  children,
  sx,
  ...props
}: AppButtonProps) {
  const styleSx =
    appStyle === "figma"
      ? {
          minHeight: 48,
          borderRadius: "32px",
          px: 2,
          py: 1.75,
        }
      : appStyle === "outline-icon"
        ? {
            minWidth: 64,
            minHeight: 64,
            borderRadius: "32px",
            border: "3px solid",
            borderColor: "primary.main",
            backgroundColor: "#ffffff",
            color: "primary.main",
            p: 2,
            "&:hover": {
              backgroundColor: "rgba(61, 130, 255, 0.08)",
            },
            "&.Mui-disabled": {
              borderColor: "#e6e6e6",
              backgroundColor: "#ffffff",
            },
          }
        : undefined;

  return (
    <Button
      variant={variant}
      color={color}
      disableElevation={disableElevation}
      disableRipple={disableRipple}
      sx={[styleSx, ...(Array.isArray(sx) ? sx : [sx])]}
      {...props}
    >
      {children}
    </Button>
  );
}
