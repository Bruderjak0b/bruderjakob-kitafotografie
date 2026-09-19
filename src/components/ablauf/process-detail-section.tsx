import { Container } from "~/components/layout/container";
import { Section, SectionHeader } from "~/components/layout/section";
import { processSteps } from "~/content/process";

export function ProcessDetailSection() {
  return (
    <Section tone="warm" id="ablauf-im-detail">
      <Container>
        <SectionHeader
          eyebrow="Im Detail"
          title="Ablauf im Detail"
          align="left"
        />

        <ol className="flex flex-col">
          {processSteps.map((step, index) => (
            <li
              key={step.title}
              className="grid gap-4 border-t border-ink-200 py-10 first:border-t-0 first:pt-0 last:pb-0 lg:grid-cols-[minmax(0,16rem)_1fr] lg:gap-12 lg:py-14"
            >
              <h3 className="flex items-baseline gap-4 text-2xl font-extrabold text-terracotta-700 lg:text-h3">
                <span
                  aria-hidden
                  className="font-heading text-base font-extrabold text-terracotta-400"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                {step.title}
              </h3>
              <p className="max-w-3xl text-lg text-muted-foreground">
                {step.detail}
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
