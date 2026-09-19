import type * as React from "react";

import { cn } from "~/lib/utils";

const sizes = {
  default: "max-w-[88rem]",
  narrow: "max-w-7xl",
  prose: "max-w-4xl",
} as const;

type ContainerProps = React.ComponentProps<"div"> & {
  size?: keyof typeof sizes;
};

export function Container({
  className,
  size = "default",
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-4 sm:px-8 lg:px-12",
        sizes[size],
        className,
      )}
      {...props}
    />
  );
}
