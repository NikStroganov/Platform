declare module "*.svg" {
  import type { ComponentType, SVGProps } from "react";

  const content: ComponentType<SVGProps<SVGSVGElement>>;
  export default content;
}

declare module "*.svg?url" {
  const content: string;
  export default content;
}
