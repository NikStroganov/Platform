"use client";

import FormControlLabel from "@mui/material/FormControlLabel";
import Switch, { type SwitchProps } from "@mui/material/Switch";

export type ToggleWithLabelProps = Omit<SwitchProps, "onChange"> & {
  label: string;
  onChange?: (checked: boolean) => void;
};

export function ToggleWithLabel({ label, checked, onChange, sx, ...props }: ToggleWithLabelProps) {
  return (
    <FormControlLabel
      label={label}
      control={
        <Switch
          checked={checked}
          disableRipple
          onChange={(event) => onChange?.(event.target.checked)}
          sx={[
            {
              width: 44,
              height: 22,
              p: 0,
              overflow: "visible",
              "& .MuiSwitch-switchBase": {
                p: "2px",
                transitionDuration: "160ms",
                "&.Mui-checked": {
                  transform: "translateX(22px)",
                  color: "#ffffff",
                  "& + .MuiSwitch-track": {
                    bgcolor: "#3d82ff",
                    opacity: 1,
                  },
                  "&.Mui-disabled + .MuiSwitch-track": {
                    bgcolor: "#c4c2be",
                    opacity: 0.45,
                  },
                },
                "&.Mui-focusVisible .MuiSwitch-thumb": {
                  outline: "2px solid #3d82ff",
                  outlineOffset: 2,
                },
                "&.Mui-disabled .MuiSwitch-thumb": {
                  bgcolor: "#f2f2f2",
                },
              },
              "& .MuiSwitch-thumb": {
                width: 18,
                height: 18,
                bgcolor: "#ffffff",
                boxShadow: "0 2px 4px rgba(0, 35, 11, 0.2)",
              },
              "& .MuiSwitch-track": {
                borderRadius: "16px",
                bgcolor: "#c4c2be",
                opacity: 1,
              },
            },
            ...(Array.isArray(sx) ? sx : [sx]),
          ]}
          {...props}
        />
      }
      sx={{
        m: 0,
        gap: 1.5,
        "& .MuiFormControlLabel-label": {
          fontSize: 16,
          fontWeight: 500,
          color: "#111111",
        },
      }}
    />
  );
}
