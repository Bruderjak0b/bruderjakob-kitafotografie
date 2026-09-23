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
  /** Heading level of the title. Use "h1" when the section opens a page. */
  as?: "h1" | "h2";
  align?: "left" | "center";
  className?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  children,
  action,
  as: Heading = "h2",
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
        <Heading
          className={cn(
            "max-w-3xl font-extrabold",
            Heading === "h1"
              ? "text-4xl leading-[1.06] sm:text-5xl lg:text-h1"
              : "text-4xl lg:text-h2",
          )}
        >
          {title}
        </Heading>
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
        "text-sm font-semibold tracking-[0.14em] text-terracotta-600 uppercase",
        className,
      )}
      {...props}
    />
  );
}
