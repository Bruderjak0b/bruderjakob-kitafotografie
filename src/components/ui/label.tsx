"use client";

import { Label as LabelPrimitive } from "radix-ui";
import type * as React from "react";

import { cn } from "~/lib/utils";

function Label({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        "flex items-center gap-2 font-sans text-sm font-semibold tracking-[0.06em] text-terracotta-700 uppercase select-none peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}

export { Label };
