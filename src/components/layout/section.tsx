import type * as React from "react";

import { cn } from "~/lib/utils";

const tones = {
  default: "bg-background",
  subtle: "bg-ink-100",
  warm: "bg-terracotta-100",
  accent: "bg-terracotta-600 text-white",
} as const;

type SectionProps = React.ComponentProps<"section"> & {
  tone?: keyof typeof tones;
};

/** Full-width content band with the site's vertical rhythm. */
export function Section({
  className,
  tone = "default",
  ...props
}: SectionProps) {
  return (
    <section
      className={cn("py-20 lg:py-section", tones[tone], className)}
      {...props}
    />
  );
}

type SectionHeaderProps = {
  eyebrow?: string;
  title: React.ReactNode;
  children?: React.ReactNode;
  /** Rendered next to the title on large screens (e.g. a button). */
  action?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  children,
  action,
  align = "center",
  className,
}: SectionHeaderProps) {
  const isCenter = align === "center";

  return (
    <div
      className={cn(
        "mb-12 flex flex-col gap-6 lg:mb-16",
        !isCenter && action && "lg:flex-row lg:items-end lg:justify-between",
        className,
      )}
    >
      <div
        className={cn(
          "flex flex-col gap-5",
          isCenter && "items-center text-center",
        )}
      >
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <h2 className="max-w-3xl text-4xl font-extrabold lg:text-h2">
          {title}
        </h2>
        {children && (
          <div className="max-w-3xl text-lg text-muted-foreground">
            {children}
          </div>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

export function Eyebrow({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      className={cn(
        "inline-flex items-center gap-3 text-sm font-semibold tracking-[0.14em] text-terracotta-600 uppercase before:h-px before:w-8 before:bg-current",
        className,
      )}
      {...props}
    />
  );
}
