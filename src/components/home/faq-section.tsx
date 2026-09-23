import type * as React from "react";

import { FaqList } from "~/components/faq/faq-list";
import { Container } from "~/components/layout/container";
import { Section, SectionHeader } from "~/components/layout/section";
import { siteConfig } from "~/config/site";
import { type FaqItem, faqItems } from "~/content/faq";

type FaqSectionProps = {
  items?: FaqItem[];
  /** Rendered below the intro, e.g. a link to the full FAQ. */
  action?: React.ReactNode;
};

export function FaqSection({ items = faqItems, action }: FaqSectionProps) {
  return (
    <Section tone="subtle" id="faq">
      <Container className="grid gap-4 lg:grid-cols-[4fr_7fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeader eyebrow="FAQ" title="Häufige Fragen" align="left">
            <p>
              Deine Frage ist nicht dabei? Schreib mir einfach an{" "}
              <a
                href={`mailto:${siteConfig.email}`}
                className="font-semibold break-words text-terracotta-600 underline-offset-4 transition-colors duration-150 hover:text-terracotta-700 hover:underline focus-visible:underline"
              >
                {siteConfig.email}
              </a>
              .
            </p>
            {action && <div className="mt-4">{action}</div>}
          </SectionHeader>
        </div>
        <FaqList items={items} />
      </Container>
    </Section>
  );
}
