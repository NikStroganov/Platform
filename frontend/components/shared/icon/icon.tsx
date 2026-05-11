import Box, { type BoxProps } from "@mui/material/Box";
import { type ComponentType, type SVGProps } from "react";

export type SvgIconComponent = ComponentType<SVGProps<SVGSVGElement>>;
type SvgAssetObject = { src: string };
type IconComponentProp = SvgIconComponent | string | SvgAssetObject;

export type IconProps = Omit<BoxProps, "component"> & {
  component: IconComponentProp;
};

export function Icon({ component, sx, ...props }: IconProps) {
  const isSvgComponent = typeof component === "function";
  const iconSource =
    typeof component === "string"
      ? component
      : typeof component === "object" &&
          component !== null &&
          "src" in component &&
          typeof component.src === "string"
        ? component.src
        : undefined;

  return (
    <Box
      component={isSvgComponent ? component : "img"}
      src={isSvgComponent ? undefined : iconSource}
      alt={isSvgComponent ? undefined : ""}
      aria-hidden={isSvgComponent ? undefined : true}
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
