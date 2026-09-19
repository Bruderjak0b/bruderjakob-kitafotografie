import { Container } from "~/components/layout/container";
import { Section, SectionHeader } from "~/components/layout/section";
import { processSteps } from "~/content/process";
import { cn } from "~/lib/utils";

/**
 * The three steps stacked vertically. From the large breakpoint on, the text
 * alternates between the right and the left column, so the eye zigzags down
 * the page instead of running along one edge.
 */
export function ProcessDetailSection() {
  return (
    <Section id="ablauf-im-detail">
      <Container>
        <SectionHeader
          eyebrow="Ablauf"
          title="Euer Weg zu natürlichen Kindergartenfotos"
          align="left"
        />

        <ol className="flex flex-col">
          {processSteps.map((step, index) => {
            const textOnLeft = index % 2 === 1;

            return (
              <li
                key={step.title}
                className="grid items-start gap-6 border-t border-ink-200 py-10 first:border-t-0 first:pt-0 last:pb-0 lg:grid-cols-2 lg:gap-20 lg:py-16"
              >
                <div
                  className={cn(
                    // Sticks while its own paragraph scrolls past, so the step
                    // stays readable next to the text it belongs to.
                    "flex items-baseline gap-5 lg:sticky lg:top-28 lg:self-start",
                    textOnLeft && "lg:order-2",
                  )}
                >
                  <span
                    aria-hidden
                    className="font-heading text-6xl leading-none font-extrabold tracking-tight text-terracotta-200 lg:text-7xl"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-2xl font-extrabold text-terracotta-700 lg:text-h2">
                    {step.title}
                  </h3>
                </div>

                <div className={cn("max-w-2xl", textOnLeft && "lg:order-1")}>
                  <p className="mb-5 text-xl leading-relaxed text-ink-800">
                    {step.summary}
                  </p>
                  <p className="text-lg text-muted-foreground">{step.detail}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </Container>
    </Section>
  );
}
