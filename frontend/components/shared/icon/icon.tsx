import Box, { type BoxProps } from "@mui/material/Box";
import { type ComponentType, type SVGProps } from "react";

export type SvgIconComponent = ComponentType<SVGProps<SVGSVGElement>>;

export type IconProps = Omit<BoxProps<SvgIconComponent>, "component"> & {
  component: SvgIconComponent;
};

export function Icon({ component, sx, ...props }: IconProps) {
  return (
    <Box
      component={component}
      sx={[
        {
          width: "1.25rem",
          height: "1.25rem",
          display: "inline-block",
          flexShrink: 0,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...props}
    />
  );
}
