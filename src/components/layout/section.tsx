import type * as React from "react";

import { cn } from "~/lib/utils";

const tones = {
  default: "bg-background",
  warm: "bg-terracotta-100",
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
  align?: "left" | "center";
  className?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  children,
  align = "center",
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "mb-12 flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className="text-3xl font-extrabold lg:text-h2">{title}</h2>
      {children && (
        <div className="max-w-2xl text-muted-foreground">{children}</div>
      )}
    </div>
  );
}

export function Eyebrow({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      className={cn(
        "text-sm font-semibold tracking-wider text-terracotta-600 uppercase",
        className,
      )}
      {...props}
    />
  );
}
