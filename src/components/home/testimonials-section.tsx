import { QuoteIcon } from "lucide-react";

import { Container } from "~/components/layout/container";
import { Section, SectionHeader } from "~/components/layout/section";
import { testimonials } from "~/content/testimonials";
import { cn } from "~/lib/utils";

export function TestimonialsSection() {
  return (
    <Section id="stimmen">
      <Container>
        <SectionHeader eyebrow="Stimmen" title="Das sagen Kitas und Eltern" />

        <ul className="grid gap-6 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <li key={testimonial.author}>
              <figure
                className={cn(
                  "flex h-full flex-col gap-6 rounded-3xl p-8 lg:p-10",
                  index === 1
                    ? "bg-terracotta-100"
                    : "border border-ink-200 bg-ink-100",
                )}
              >
                <QuoteIcon
                  aria-hidden
                  className="size-9 fill-terracotta-500 text-terracotta-500"
                />
                <blockquote className="flex-1 text-lg leading-relaxed text-ink-800">
                  <p>{testimonial.quote}</p>
                </blockquote>
                <figcaption className="flex items-center gap-4">
                  <span
                    aria-hidden
                    className="flex size-12 shrink-0 items-center justify-center rounded-full bg-white font-heading font-extrabold text-terracotta-600"
                  >
                    {initials(testimonial.author)}
                  </span>
                  <span>
                    <span className="block font-heading font-semibold">
                      {testimonial.author}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {testimonial.role}
                    </span>
                  </span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}
