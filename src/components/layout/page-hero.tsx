import type * as React from "react";

import { Container } from "~/components/layout/container";
import { Eyebrow } from "~/components/layout/section";
import { cn } from "~/lib/utils";

type PageHeroProps = {
  eyebrow: string;
  title: React.ReactNode;
  /** Lead paragraph or label below the headline. */
  children?: React.ReactNode;
  className?: string;
};

/** Opening band of a subpage: eyebrow, h1 and an optional lead. */
export function PageHero({
  eyebrow,
  title,
  children,
  className,
}: PageHeroProps) {
  return (
    <section
      className={cn("bg-ink-100 pt-12 pb-16 lg:pt-16 lg:pb-24", className)}
    >
      <Container>
        <Eyebrow className="mb-6">{eyebrow}</Eyebrow>
        <h1 className="max-w-4xl text-4xl leading-[1.06] font-extrabold sm:text-5xl lg:text-h1">
          {title}
        </h1>
        {children && <div className="mt-6 max-w-2xl">{children}</div>}
      </Container>
    </section>
  );
}
